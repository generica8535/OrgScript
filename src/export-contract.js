function toContractJson(model) {
  const processes = (model.body || []).filter((node) => node.type === "process");
  const stateflows = (model.body || []).filter((node) => node.type === "stateflow");

  if (processes.length === 0 && stateflows.length === 0) {
    throw new Error(
      "No contract-exportable blocks found. Supported block types: process, stateflow."
    );
  }

  const contract = {
    version: "0.1",
    type: "contract",
    processes: processes.map(toProcessContract),
    stateflows: stateflows.map(toStateflowContract),
  };

  return `${JSON.stringify(contract, null, 2)}\n`;
}

function toProcessContract(processNode) {
  const triggers = (processNode.body || [])
    .filter((statement) => statement.type === "when")
    .map((statement) => statement.trigger || "unknown");

  const steps = flattenStatements(processNode.body || []);

  return {
    name: processNode.name,
    triggers,
    steps: steps.map((step) => ({
      kind: step.kind,
      label: step.label,
      condition: step.condition || null,
    })),
  };
}

function toStateflowContract(stateflow) {
  return {
    name: stateflow.name,
    states: stateflow.states || [],
    transitions: (stateflow.transitions || []).map((edge) => ({
      from: edge.from,
      to: edge.to,
    })),
  };
}

function flattenStatements(statements) {
  const steps = [];

  for (const statement of statements) {
    if (statement.type === "when") {
      steps.push({
        kind: "when",
        label: `when ${statement.trigger || "unknown"}`,
      });
      continue;
    }

    if (statement.type === "if") {
      const condition = formatCondition(statement.condition);
      steps.push({
        kind: "if",
        label: `if ${condition}`,
        condition,
      });
      steps.push(...flattenStatements(statement.then || []));
      for (const branch of statement.elseIf || []) {
        const branchCondition = formatCondition(branch.condition);
        steps.push({
          kind: "else-if",
          label: `else if ${branchCondition}`,
          condition: branchCondition,
        });
        steps.push(...flattenStatements(branch.then || []));
      }
      if (statement.else && (statement.else.body || []).length > 0) {
        steps.push({ kind: "else", label: "else", condition: null });
        steps.push(...flattenStatements(statement.else.body || []));
      }
      continue;
    }

    steps.push({
      kind: statement.type,
      label: formatAction(statement),
    });
  }

  return steps;
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

  if (statement.type === "stop") {
    return "stop";
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

module.exports = {
  toContractJson,
};
