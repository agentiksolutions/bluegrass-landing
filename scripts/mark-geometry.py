"""Turn public/brand/mark.svg into src/lib/mark-geometry.ts so the mark can draw itself in.

Run from the repo root after the logo changes:  python scripts/mark-geometry.py
"""
import json, pathlib, re

SRC = pathlib.Path("public/brand/mark.svg")
DST = pathlib.Path("src/lib/mark-geometry.ts")

svg = SRC.read_text(encoding="utf-8")
body = svg[svg.index("</defs>"):]
paths = re.findall(r'<path[^>]*\sd="([^"]+)"', body)
lines = re.findall(r'<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"', body)
circles = re.findall(r'<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"', body)
assert paths and lines and circles, "mark.svg did not parse: check its structure before shipping"

data = {
    "viewBox": re.search(r'viewBox="([^"]+)"', svg).group(1),
    "state": paths[0],
    "star": paths[1] if len(paths) > 1 else "",
    "lines": [[float(v) for v in t] for t in lines],
    "circles": [[float(v) for v in t] for t in circles],
}
DST.write_text(
    "// Generated from public/brand/mark.svg so the mark can draw itself in.\n"
    "// Regenerate with scripts/mark-geometry.py after the logo changes.\n"
    "export const MARK = " + json.dumps(data, separators=(",", ":")) + " as const;\n",
    encoding="utf-8", newline="\n")
print(f"{DST}: {len(data['lines'])} lines, {len(data['circles'])} nodes")
