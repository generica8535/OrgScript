function toPlantuml(model) {
  const sections = [];
  const skipped = [];

  for (const node of model.body || []) {
    if (node.type === "process") {
      sections.push(renderProcess(node));
      continue;
    }

    if (node.type === "stateflow") {
      sections.push(renderStateflow(node));
      continue;
    }

    skipped.push(`${toKindLabel(node.type)} ${node.name}`);
  }

  if (sections.length === 0) {
    throw new Error(
      "No PlantUML-exportable blocks found. Supported block types: process, stateflow."
    );
  }

  const lines = [];
  sections.forEach((section, index) => {
    if (index > 0) {
      lines.push("");
    }
    lines.push(...section);
  });

  if (skipped.length > 0) {
    lines.push("");
    lines.push(
      `' Note: PlantUML export supports only process and stateflow blocks. Skipped: ${skipped.join(
        ", "
      )}.`
    );
  }

  return `${lines.join("\n")}\n`;
}

function renderProcess(node) {
  const lines = ["@startuml", `title Process: ${escapeText(node.name)}`, "start"];
  lines.push(...renderStatements(node.body || [], 0));
  lines.push("end", "@enduml");
  return lines;
}

function renderStateflow(node) {
  const lines = ["@startuml", `title Stateflow: ${escapeText(node.name)}`];
  const states = node.states || [];
  const transitions = node.transitions || [];

  if (states.length > 0) {
    lines.push(`[*] --> ${sanitizeState(states[0])}`);
    states.forEach((state) => {
      lines.push(`state ${sanitizeState(state)}`);
    });
  }

  transitions.forEach((edge) => {
    lines.push(`${sanitizeState(edge.from)} --> ${sanitizeState(edge.to)}`);
  });

  lines.push("@enduml");
  return lines;
}

function renderStatements(statements, indent) {
  const lines = [];
  const prefix = "  ".repeat(indent);

  for (const statement of statements) {
    if (statement.type === "when") {
      lines.push(`${prefix}:when ${escapeText(statement.trigger || "unknown")};`);
      continue;
    }

    if (statement.type === "if") {
      lines.push(`${prefix}if (${escapeText(formatCondition(statement.condition))}) then (yes)`);
      lines.push(...renderStatements(statement.then || [], indent + 1));

      for (const branch of statement.elseIf || []) {
        lines.push(`${prefix}elseif (${escapeText(formatCondition(branch.condition))}) then (yes)`);
        lines.push(...renderStatements(branch.then || [], indent + 1));
      }

      if (statement.else && (statement.else.body || []).length > 0) {
        lines.push(`${prefix}else (no)`);
        lines.push(...renderStatements(statement.else.body || [], indent + 1));
      } else {
        lines.push(`${prefix}else (no)`);
      }

      lines.push(`${prefix}endif`);
      continue;
    }

    if (statement.type === "stop") {
      lines.push(`${prefix}stop`);
      continue;
    }

    lines.push(`${prefix}:${escapeText(formatAction(statement))};`);
  }

  return lines;
}

function formatAction(statement) {
  if (statement.type === "assign") {
    return `assign ${statement.target || "?"} = ${formatExpression(statement.value)}`;
  }

  if (statement.type === "transition") {
    return `transition ${statement.target || "?"} to ${formatExpression(statement.value)}`;
  }

  if (statement.type === "notify") {
    return `notify ${statement.target} "${statement.message}"`;
  }

  if (statement.type === "create") {
    return `create ${statement.entity}`;
  }

  if (statement.type === "update") {
    return `update ${statement.target || "?"} = ${formatExpression(statement.value)}`;
  }

  if (statement.type === "require") {
    return `require ${statement.requirement}`;
  }

  return statement.type;
}

function formatCondition(condition) {
  if (!condition) {
    return "unknown condition";
  }

  if (condition.type === "logical") {
    return condition.conditions.map(formatCondition).join(` ${condition.operator} `);
  }

  return `${formatExpression(condition.left)} ${condition.operator} ${formatExpression(condition.right)}`;
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

function sanitizeState(state) {
  return String(state).replace(/[^A-Za-z0-9_]/g, "_");
}

function escapeText(value) {
  return String(value).replace(/\r?\n/g, " ");
}

function toKindLabel(type) {
  return type.replace(/Node$/, "").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

module.exports = {
  toPlantuml,
};
