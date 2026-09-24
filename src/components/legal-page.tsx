import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";

// Renders content/legal/<file>.md. Both documents are drafts made from
// Legal/templates-draft/tos_web.md and have not been reviewed by an attorney.
export default function LegalPage({ file }: { file: "terms" | "privacy" }) {
  const source = fs.readFileSync(path.join(process.cwd(), "content", "legal", `${file}.md`), "utf-8");
  return (
    <article className="pt-28 lg:pt-32 pb-20 px-4 md:px-10 max-w-[760px] mx-auto">
      <p
        role="note"
        className="mb-8 rounded border border-gold bg-gold-tint px-5 py-4 font-display text-[15px] font-semibold text-ink"
      >
        Draft. This page has not been reviewed by an attorney and is not in effect.
      </p>
      <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-p:text-body prose-li:text-body prose-a:text-blue">
        <MDXRemote source={source} />
      </div>
    </article>
  );
}
