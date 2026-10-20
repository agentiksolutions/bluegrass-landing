# Bluegrass Advisory Group Kentucky mark: PORTRAIT (1080x1920) 150-frame camera flight for phones.
# Run: blender -b -P ky_flight_portrait.py -f 1      (test frame)
#      blender -b -P ky_flight_portrait.py -a        (full sequence)
# Reads mark-geometry.ts and ky-counties.ts from the same folder as this script.
# Same scene as ky_flight.py; only the camera path, resolution and a bloom pass differ.
import ast, math, os, re
import bpy
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "frames", "p_")

def read(name):
    with open(os.path.join(HERE, name), encoding="utf-8") as f:
        return f.read()

MARK = ast.literal_eval(re.search(r"MARK = (\{.*\}) as const", read("mark-geometry.ts"), re.S).group(1))
ARCS = ast.literal_eval(re.search(r"COUNTY_ARCS: number\[\]\[\] = (\[.*?\n\]);", read("ky-counties.ts"), re.S).group(1))

S = 100.0  # drawing units per Blender unit -> state is 9.8 x 4.4
def P(x, y):
    return ((x - 490.0) / S, -(y - 220.0) / S)

def path_pts(d):
    return [P(float(a), float(b)) for a, b in re.findall(r"(-?\d+\.?\d*),(-?\d+\.?\d*)", d)]

# ---------- reset ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def srgb(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def hexlin(h):
    return tuple(srgb(int(h[i:i + 2], 16) / 255.0) for i in (0, 2, 4)) + (1.0,)

# ---------- materials ----------
def mat_slab():
    m = bpy.data.materials.new("InkGlass")
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = hexlin("0C1A45")  # #0A1430 pushed toward #0033A0
    b.inputs["Roughness"].default_value = 0.45
    b.inputs["Coat Weight"].default_value = 0.4
    b.inputs["Coat Roughness"].default_value = 0.18
    b.inputs["Coat Tint"].default_value = hexlin("8FA8E8")
    return m

def mat_emit(name, color, strength):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.remove(nt.nodes["Principled BSDF"])
    e = nt.nodes.new("ShaderNodeEmission")
    e.inputs["Color"].default_value = color
    e.inputs["Strength"].default_value = strength
    nt.links.new(e.outputs[0], nt.nodes["Material Output"].inputs["Surface"])
    return m

SLAB = mat_slab()
NODE = mat_emit("Node", (0.82, 0.88, 1.0, 1.0), 0.85)
STAR = mat_emit("Star", (1.0, 1.0, 1.0, 1.0), 8.0)
COUNTY = mat_emit("County", hexlin("3A4F80"), 0.35)

# ---------- geometry ----------
def curve_obj(name, splines, closed, mat, extrude=0.0, bevel=0.0, fill=False, z=0.0, res=2):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "2D" if fill else "3D"
    if fill:
        cu.fill_mode = "BOTH"
    cu.extrude = extrude
    cu.bevel_depth = bevel
    cu.bevel_resolution = res
    for pts in splines:
        sp = cu.splines.new("POLY")
        sp.points.add(len(pts) - 1)
        for p, (x, y) in zip(sp.points, pts):
            p.co = (x, y, 0.0, 1.0)
        sp.use_cyclic_u = closed
    ob = bpy.data.objects.new(name, cu)
    ob.location.z = z
    ob.data.materials.append(mat)
    scene.collection.objects.link(ob)
    return ob

DEPTH = 9.8 * 0.04            # slab thickness, 4% of width
BEV = 0.03
EXT = DEPTH / 2 - BEV
curve_obj("State", [path_pts(MARK["state"])], True, SLAB, extrude=EXT, bevel=BEV, fill=True, res=3)
TOP = EXT + BEV               # top face height

curve_obj("Counties", [[P(a[i], a[i + 1]) for i in range(0, len(a), 2)] for a in ARCS],
          False, COUNTY, bevel=0.0035, z=TOP + 0.002, res=1)
curve_obj("Lines", [[P(l[0], l[1]), P(l[2], l[3])] for l in MARK["lines"]],
          False, NODE, bevel=0.007, z=TOP + 0.02, res=2)
for i, (x, y, r) in enumerate(MARK["circles"]):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.055, location=(*P(x, y), TOP + 0.03), segments=24, ring_count=12)
    o = bpy.context.active_object
    o.data.materials.append(NODE)
    bpy.ops.object.shade_smooth()
star = curve_obj("Star", [path_pts(MARK["star"])], True, STAR, extrude=0.015, bevel=0.004, fill=True, z=TOP + 0.045)
SX, SY = P(647.09, 183.35)    # Lexington: star centre, all hub lines meet here

# ---------- world + lights ----------
w = bpy.data.worlds.new("Ink")
w.use_nodes = True
w.node_tree.nodes["Background"].inputs["Color"].default_value = hexlin("161B22")
scene.world = w

def area(name, loc, size, energy, color, target=(0, 0, 0)):
    ld = bpy.data.lights.new(name, "AREA")
    ld.size = size
    ld.energy = energy
    ld.color = color
    o = bpy.data.objects.new(name, ld)
    o.location = loc
    o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    scene.collection.objects.link(o)
    return o

key = area("Key", (-6.0, 1.0, 8.0), 12.0, 1300.0, (1.0, 0.97, 0.93))
key.visible_glossy = False    # its mirror image on the clearcoat blew out whole regions; rim does the edge catches
area("Rim", (5.0, 8.0, 1.6), 2.0, 320.0, (0.55, 0.72, 1.0))

# ---------- camera ----------
cam_d = bpy.data.cameras.new("Cam")
cam_d.lens = 35
cam_d.clip_start = 0.05
cam = bpy.data.objects.new("Cam", cam_d)
scene.collection.objects.link(cam)
scene.camera = cam
tgt = bpy.data.objects.new("Target", None)
scene.collection.objects.link(tgt)
c = cam.constraints.new("TRACK_TO")
c.target = tgt
c.track_axis = "TRACK_NEGATIVE_Z"
c.up_axis = "UP_Y"

# Portrait: start high over the southwest so the state runs diagonally up the tall frame,
# then descend toward Lexington and end close, looking down at the star.
KEYS = [
    (1,   (-8.0, -9.5, 9.0), (-0.4, -0.5, 0.0)),
    (75,  (-2.4, -5.6, 5.4), (1.0, 0.3, TOP)),
    (150, (SX - 0.15, SY - 1.1, 3.4), (SX, SY, TOP)),
]
for f, loc, look in KEYS:
    cam.location = loc
    cam.keyframe_insert("location", frame=f)
    tgt.location = look
    tgt.keyframe_insert("location", frame=f)
# ponytail: Blender's default keyframes are already BEZIER + AUTO_CLAMPED (smooth, eased ends).

# ---------- render ----------
scene.frame_start, scene.frame_end = 1, 150
scene.render.fps = 30
scene.render.engine = "CYCLES"
prefs = bpy.context.preferences.addons["cycles"].preferences
prefs.compute_device_type = "METAL"
prefs.get_devices()
for d in prefs.devices:
    d.use = True
scene.cycles.device = "GPU"
scene.cycles.samples = int(os.environ.get("KY_SAMPLES", "64"))
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 6
scene.render.resolution_x, scene.render.resolution_y = 1080, 1920
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = "Standard"   # background renders exactly #161B22
scene.view_settings.look = "None"
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.filepath = OUT

# ---------- bloom: only pixels above 1.0 glow (the star at strength 8); background and nodes stay put ----------
ng = bpy.data.node_groups.new("Comp", "CompositorNodeTree")
ng.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
rl = ng.nodes.new("CompositorNodeRLayers")
gl = ng.nodes.new("CompositorNodeGlare")
gl.inputs["Type"].default_value = "Bloom"
gl.inputs["Threshold"].default_value = 1.0
gl.inputs["Strength"].default_value = float(os.environ.get("KY_BLOOM", "0.25"))
gl.inputs["Size"].default_value = 0.35
out = ng.nodes.new("NodeGroupOutput")
ng.links.new(rl.outputs["Image"], gl.inputs["Image"])
ng.links.new(gl.outputs["Image"], out.inputs[0])
scene.compositing_node_group = ng
scene.render.use_compositing = True
