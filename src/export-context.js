const { analyzeDocument } = require("./analyze");
const { toMarkdownSummary } = require("./export-markdown");

function toAiContext(model, diagnostics = []) {
  return {
    version: "0.1",
    timestamp: new Date().toISOString(),
    source: {
      model: model,
      analysis: analyzeDocument(model),
      diagnostics: diagnostics,
    },
    summaries: {
      markdown: toMarkdownSummary(model),
    }
  };
}

module.exports = {
  toAiContext,
};
