// Class name joiner used by every piece that imports `cn` from "@/lib/utils".
// Copy this file to src/lib/utils.ts in the target site.
// ponytail: joins strings and truthy object keys only. It does not resolve
// conflicting Tailwind classes. If the site already runs clsx + tailwind-merge,
// use its own `cn` instead so a className prop can override a default class.

type ClassValue = string | number | null | undefined | false | Record<string, unknown> | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []
  for (const input of inputs) {
    if (!input) continue
    if (typeof input === "string" || typeof input === "number") out.push(String(input))
    else if (Array.isArray(input)) out.push(cn(...input))
    else for (const [key, on] of Object.entries(input)) if (on) out.push(key)
  }
  return out.filter(Boolean).join(" ")
}
