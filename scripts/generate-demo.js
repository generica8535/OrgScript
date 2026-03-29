#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { buildModel } = require("../src/validate");
const { toCanonicalModel } = require("../src/export-json");
const { toMarkdownSummary } = require("../src/export-markdown");
const { toMermaidMarkdown } = require("../src/export-mermaid");

const repoRoot = path.resolve(__dirname, "..");
const mermaidOutputDir = path.join(repoRoot, "docs", "demos", "mermaid");
const markdownOutputDir = path.join(repoRoot, "docs", "demos", "markdown");

const demos = [
  {
    slug: "lead-qualification",
    title: "Lead qualification process",
    source: path.join(repoRoot, "examples", "lead-qualification.orgs"),
    description:
      "A compact process example that shows trigger, branching, assignment, notification, and state transition.",
  },
  {
    slug: "order-approval",
    title: "Order approval stateflow",
    source: path.join(repoRoot, "examples", "order-approval.orgs"),
    description:
      "A stateflow-focused example that also demonstrates how Mermaid export skips unsupported blocks while still producing useful output.",
  },
];

function main() {
  fs.mkdirSync(mermaidOutputDir, { recursive: true });
  fs.mkdirSync(markdownOutputDir, { recursive: true });

  for (const demo of demos) {
    const result = buildModel(demo.source);

    if (!result.ok) {
      throw new Error(`Cannot generate demo for ${demo.slug}: source file is invalid.`);
    }

    const markdown = toMermaidMarkdown(toCanonicalModel(result.ast));
    const rawMermaid = extractFirstMermaidBlock(markdown);

    fs.writeFileSync(path.join(mermaidOutputDir, `${demo.slug}.mermaid.md`), markdown, "utf8");
    fs.writeFileSync(path.join(mermaidOutputDir, `${demo.slug}.mmd`), `${rawMermaid}\n`, "utf8");
    fs.writeFileSync(
      path.join(markdownOutputDir, `${demo.slug}.summary.md`),
      toMarkdownSummary(toCanonicalModel(result.ast)),
      "utf8"
    );
  }

  fs.writeFileSync(path.join(mermaidOutputDir, "README.md"), renderMermaidReadme(), "utf8");
  fs.writeFileSync(path.join(markdownOutputDir, "README.md"), renderMarkdownReadme(), "utf8");
}

function extractFirstMermaidBlock(markdown) {
  const match = markdown.match(/```mermaid\r?\n([\s\S]*?)\r?\n```/);

  if (!match) {
    throw new Error("Expected Mermaid export to contain at least one Mermaid code block.");
  }

  return match[1];
}

function renderMermaidReadme() {
  const lines = [
    "# Mermaid demos",
    "",
    "This folder shows the shortest useful path from OrgScript source to generated diagram artifacts.",
    "",
    "Each demo keeps the source file in `examples/` and generates two downstream artifacts here:",
    "",
    "- `*.mermaid.md`: a Markdown document ready for GitHub rendering",
    "- `*.mmd`: the first extracted Mermaid diagram block for direct Mermaid tooling use",
    "",
    "## Generate",
    "",
    "```text",
    "npm run demo:generate",
    "```",
    "",
    "## Demos",
    "",
    "| Demo | Source | Markdown artifact | Mermaid artifact |",
    "| --- | --- | --- | --- |",
  ];

  for (const demo of demos) {
    const sourceRelative = path.relative(mermaidOutputDir, demo.source).replace(/\\/g, "/");
    lines.push(
      `| ${demo.title} | [${path.basename(demo.source)}](${sourceRelative}) | [${demo.slug}.mermaid.md](./${demo.slug}.mermaid.md) | [${demo.slug}.mmd](./${demo.slug}.mmd) |`
    );
    lines.push(`|  |  |  | ${demo.description} |`);
  }

  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push("- These artifacts are generated from the current exporter implementation.");
  lines.push(
    "- `order-approval` intentionally demonstrates the current behavior where unsupported blocks are skipped and called out in the generated Markdown."
  );
  lines.push(
    "- If you change Mermaid export behavior, regenerate this folder with `npm run demo:generate` and review the diffs."
  );
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function renderMarkdownReadme() {
  const lines = [
    "# Markdown summary demos",
    "",
    "This folder shows the shortest path from OrgScript source to human-readable Markdown summaries.",
    "",
    "Each demo keeps the source file in `examples/` and generates one downstream artifact here:",
    "",
    "- `*.summary.md`: a concise Markdown summary of the modeled logic",
    "",
    "## Generate",
    "",
    "```text",
    "npm run demo:generate",
    "```",
    "",
    "## Demos",
    "",
    "| Demo | Source | Markdown summary |",
    "| --- | --- | --- |",
  ];

  for (const demo of demos) {
    const sourceRelative = path.relative(markdownOutputDir, demo.source).replace(/\\/g, "/");
    lines.push(
      `| ${demo.title} | [${path.basename(demo.source)}](${sourceRelative}) | [${demo.slug}.summary.md](./${demo.slug}.summary.md) |`
    );
    lines.push(`|  |  | ${demo.description} |`);
  }

  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push("- These artifacts are generated from the current Markdown summary exporter.");
  lines.push(
    "- The summaries are intentionally concise and deterministic rather than prose-heavy."
  );
  lines.push(
    "- If you change Markdown export behavior, regenerate this folder with `npm run demo:generate` and review the diffs."
  );
  lines.push("");

  return `${lines.join("\n")}\n`;
}

main();
