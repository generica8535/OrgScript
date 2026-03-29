function toMarkdownSummary(model) {
  const sections = model.body
    .map((node) => renderTopLevelNode(node))
    .filter(Boolean);

  if (sections.length === 0) {
    throw new Error("No Markdown-exportable blocks found.");
  }

  return `${sections.join("\n\n")}\n`;
}

function renderTopLevelNode(node) {
  if (node.type === "process") {
    return renderProcess(node);
  }

  if (node.type === "stateflow") {
    return renderStateflow(node);
  }

  if (node.type === "rule") {
    return renderRule(node);
  }

  if (node.type === "role") {
    return renderRole(node);
  }

  if (node.type === "policy") {
    return renderPolicy(node);
  }

  if (node.type === "event") {
    return renderEvent(node);
  }

  if (node.type === "metric") {
    return renderMetric(node);
  }

  return null;
}

function renderProcess(node) {
  const triggers = (node.body || []).filter((statement) => statement.type === "when");
  const statements = (node.body || []).filter((statement) => statement.type !== "when");
  const summary = summarizeStatementSequence(statements);
  const lines = [`# Process: ${node.name}`, "", "## Trigger"];

  if (triggers.length === 0) {
    lines.push("- None explicitly declared.");
  } else {
    for (const trigger of triggers) {
      lines.push(`- \`${trigger.trigger || "unknown"}\``);
    }
  }

  lines.push("");
  lines.push("## Summary");

  if (summary.length === 0) {
    lines.push("- No operational statements are defined.");
  } else {
    for (const bullet of summary) {
      lines.push(`- ${bullet}`);
    }
  }

  return lines.join("\n");
}

function renderStateflow(node) {
  const lines = [`# Stateflow: ${node.name}`, "", "## States"];

  if ((node.states || []).length === 0) {
    lines.push("- None defined.");
  } else {
    for (const state of node.states) {
      lines.push(`- ${state}`);
    }
  }

  lines.push("");
  lines.push("## Allowed transitions");

  if ((node.transitions || []).length === 0) {
    lines.push("- None defined.");
  } else {
    for (const edge of node.transitions) {
      lines.push(`- \`${edge.from} -> ${edge.to}\``);
    }
  }

  return lines.join("\n");
}

function renderRule(node) {
  const lines = [`# Rule: ${node.name}`];

  if (node.appliesTo) {
    lines.push("");
    lines.push("## Scope");
    lines.push(`- \`${node.appliesTo}\``);
  }

  lines.push("");
  lines.push("## Summary");

  const summary = summarizeStatementSequence(node.body || []);
  if (summary.length === 0) {
    lines.push("- No rule behavior is defined.");
  } else {
    for (const bullet of summary) {
      lines.push(`- ${bullet}`);
    }
  }

  return lines.join("\n");
}

function renderRole(node) {
  const lines = [`# Role: ${node.name}`, "", "## Can"];

  if ((node.can || []).length === 0) {
    lines.push("- None.");
  } else {
    for (const permission of node.can) {
      lines.push(`- \`${permission}\``);
    }
  }

  lines.push("");
  lines.push("## Cannot");

  if ((node.cannot || []).length === 0) {
    lines.push("- None.");
  } else {
    for (const permission of node.cannot) {
      lines.push(`- \`${permission}\``);
    }
  }

  return lines.join("\n");
}

function renderPolicy(node) {
  const lines = [`# Policy: ${node.name}`, "", "## Clauses"];

  if ((node.clauses || []).length === 0) {
    lines.push("- No clauses are defined.");
    return lines.join("\n");
  }

  for (const clause of node.clauses) {
    lines.push(
      `- When ${formatConditionCode(clause.condition)}, ${formatStatementSequenceInline(
        clause.then || []
      )}.`
    );
  }

  return lines.join("\n");
}

function renderEvent(node) {
  const lines = [`# Event: ${node.name}`, "", "## Reactions"];

  if ((node.body || []).length === 0) {
    lines.push("- No reactions are defined.");
  } else {
    for (const bullet of summarizeStatementSequence(node.body || [])) {
      lines.push(`- ${bullet}`);
    }
  }

  return lines.join("\n");
}

function renderMetric(node) {
  const lines = [`# Metric: ${node.name}`];

  lines.push("");
  lines.push("## Formula");
  lines.push(node.formula ? `- \`${node.formula}\`` : "- None defined.");

  lines.push("");
  lines.push("## Owner");
  lines.push(node.owner ? `- \`${node.owner}\`` : "- None defined.");

  lines.push("");
  lines.push("## Target");
  lines.push(node.target ? `- \`${node.target}\`` : "- None defined.");

  return lines.join("\n");
}

function summarizeStatementSequence(statements) {
  const bullets = [];
  let buffer = [];

  function flushBufferedActions() {
    if (buffer.length === 0) {
      return;
    }

    const prefix = bullets.length === 0 ? "" : "Then ";
    bullets.push(`${prefix}${formatActionGroup(buffer)}.`);
    buffer = [];
  }

  for (const statement of statements) {
    if (statement.type === "if") {
      flushBufferedActions();
      bullets.push(...formatIfBullets(statement));
      continue;
    }

    buffer.push(statement);
  }

  flushBufferedActions();
  return bullets;
}

function formatIfBullets(statement) {
  const bullets = [];
  bullets.push(
    `If ${formatConditionCode(statement.condition)}, ${formatStatementSequenceInline(
      statement.then || []
    )}.`
  );

  for (const branch of statement.elseIf || []) {
    bullets.push(
      `Else if ${formatConditionCode(branch.condition)}, ${formatStatementSequenceInline(
        branch.then || []
      )}.`
    );
  }

  if (statement.else && statement.else.length !== 0) {
    bullets.push(`Else, ${formatStatementSequenceInline(statement.else)}.`);
  }

  return bullets;
}

function formatStatementSequenceInline(statements) {
  const parts = [];

  for (const statement of statements) {
    if (statement.type === "if") {
      parts.push(...formatIfInlineParts(statement));
      continue;
    }

    parts.push(formatActionPhrase(statement));
  }

  if (parts.length === 0) {
    return "no actions are defined";
  }

  return joinParts(parts);
}

function formatIfInlineParts(statement) {
  const parts = [
    `if ${formatConditionCode(statement.condition)}, ${formatStatementSequenceInline(
      statement.then || []
    )}`,
  ];

  for (const branch of statement.elseIf || []) {
    parts.push(
      `else if ${formatConditionCode(branch.condition)}, ${formatStatementSequenceInline(
        branch.then || []
      )}`
    );
  }

  if (statement.else && statement.else.length !== 0) {
    parts.push(`else, ${formatStatementSequenceInline(statement.else)}`);
  }

  return parts;
}

function formatActionGroup(statements) {
  return joinParts(statements.map((statement) => formatActionPhrase(statement)));
}

function formatActionPhrase(statement) {
  if (statement.type === "assign") {
    return `assign \`${statement.target || "?"}\` to ${formatExpressionCode(statement.value)}`;
  }

  if (statement.type === "transition") {
    return `transition \`${statement.target || "?"}\` to ${formatExpressionCode(statement.value)}`;
  }

  if (statement.type === "notify") {
    return `notify \`${statement.target}\` with ${formatStringLiteral(statement.message)}`;
  }

  if (statement.type === "create") {
    return `create \`${statement.entity}\``;
  }

  if (statement.type === "update") {
    return `update \`${statement.target || "?"}\` to ${formatExpressionCode(statement.value)}`;
  }

  if (statement.type === "require") {
    return `require \`${statement.requirement}\``;
  }

  if (statement.type === "when") {
    return `trigger on \`${statement.trigger || "unknown"}\``;
  }

  if (statement.type === "stop") {
    return "stop the branch";
  }

  return `encounter unsupported statement type \`${statement.type}\``;
}

function formatConditionCode(condition) {
  return `\`${formatCondition(condition)}\``;
}

function formatCondition(condition) {
  if (!condition) {
    return "unknown condition";
  }

  if (condition.type === "logical") {
    return condition.conditions.map((entry) => formatCondition(entry)).join(` ${condition.operator} `);
  }

  return `${formatExpression(condition.left)} ${condition.operator} ${formatExpression(
    condition.right
  )}`;
}

function formatExpressionCode(expression) {
  return `\`${formatExpression(expression)}\``;
}

function formatExpression(expression) {
  if (!expression) {
    return "?";
  }

  if (expression.type === "field") {
    return expression.path;
  }

  if (expression.type === "identifier") {
    return expression.value;
  }

  if (expression.type === "string") {
    return `"${expression.value}"`;
  }

  if (expression.type === "boolean") {
    return expression.value ? "true" : "false";
  }

  return String(expression.value);
}

function formatStringLiteral(value) {
  return `\`${JSON.stringify(value)}\``;
}

function joinParts(parts) {
  if (parts.length === 0) {
    return "";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  if (parts.length === 2) {
    return `${parts[0]} and ${parts[1]}`;
  }

  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

module.exports = {
  toMarkdownSummary,
};
