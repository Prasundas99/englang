import { tokenize } from "./lexer.js";
import { parse } from "./parser.js";

/**
 * @typedef {object} Logger
 * @property {(...values: any[]) => void} log
 */

/**
 * @typedef {object} RuntimeOptions
 * @property {(promptText: string) => any} [ask]
 */

/**
 * @typedef {object} RuntimeState
 * @property {Record<string, any>} variables
 * @property {Record<string, any>} functions
 * @property {string[]} output
 * @property {(promptText: string) => any | undefined} ask
 * @property {Logger} logger
 */

/**
 * @typedef {object} StatementControlResult
 * @property {"BREAK"} control
 */

/**
 * @param {any} expressionNode
 * @param {RuntimeState} runtimeState
 * @returns {any}
 */
function evaluateExpression(expressionNode, runtimeState) {
  if (expressionNode.type === "StringLiteral") {
    return expressionNode.value;
  }

  if (expressionNode.type === "NumberLiteral") {
    return expressionNode.value;
  }

  if (expressionNode.type === "BooleanLiteral") {
    return expressionNode.value;
  }

  if (expressionNode.type === "Identifier") {
    const variableName = expressionNode.name;
    const variableExists = Object.prototype.hasOwnProperty.call(runtimeState.variables, variableName);

    if (!variableExists) {
      throw new Error(`Unknown variable: ${variableName}`);
    }

    return runtimeState.variables[variableName];
  }

  if (expressionNode.type === "AskExpression") {
    const promptText = String(evaluateExpression(expressionNode.prompt, runtimeState));

    if (typeof runtimeState.ask !== "function") {
      return "";
    }

    return runtimeState.ask(promptText);
  }

  if (expressionNode.type === "FunctionCallExpression") {
    return runFunctionCallExpression(expressionNode, runtimeState);
  }

  if (expressionNode.type === "BinaryExpression") {
    return evaluateBinaryExpression(expressionNode, runtimeState);
  }

  if (expressionNode.type === "ComparisonExpression") {
    return evaluateComparisonExpression(expressionNode, runtimeState);
  }

  if (expressionNode.type === "LogicalExpression") {
    return evaluateLogicalExpression(expressionNode, runtimeState);
  }

  throw new Error(`Unsupported expression type: ${expressionNode.type}`);
}

/**
 * @param {any} binaryExpressionNode
 * @param {RuntimeState} runtimeState
 * @returns {any}
 */
function evaluateBinaryExpression(binaryExpressionNode, runtimeState) {
  const leftValue = evaluateExpression(binaryExpressionNode.left, runtimeState);
  const rightValue = evaluateExpression(binaryExpressionNode.right, runtimeState);

  if (binaryExpressionNode.operator === "PLUS") {
    return leftValue + rightValue;
  }

  if (binaryExpressionNode.operator === "MINUS") {
    return leftValue - rightValue;
  }

  if (binaryExpressionNode.operator === "TIMES") {
    return leftValue * rightValue;
  }

  if (binaryExpressionNode.operator === "DIVIDED_BY") {
    return leftValue / rightValue;
  }

  throw new Error(`Unsupported binary operator: ${binaryExpressionNode.operator}`);
}

/**
 * @param {any} comparisonExpressionNode
 * @param {RuntimeState} runtimeState
 * @returns {boolean}
 */
function evaluateComparisonExpression(comparisonExpressionNode, runtimeState) {
  const leftValue = evaluateExpression(comparisonExpressionNode.left, runtimeState);
  const rightValue = comparisonExpressionNode.right
    ? evaluateExpression(comparisonExpressionNode.right, runtimeState)
    : null;

  if (comparisonExpressionNode.operator === "GREATER_THAN") {
    return leftValue > rightValue;
  }

  if (comparisonExpressionNode.operator === "LESS_THAN") {
    return leftValue < rightValue;
  }

  if (comparisonExpressionNode.operator === "EQUAL_TO") {
    return leftValue == rightValue;
  }

  if (comparisonExpressionNode.operator === "NOT_EQUAL_TO") {
    return leftValue != rightValue;
  }

  if (comparisonExpressionNode.operator === "GREATER_THAN_OR_EQUAL_TO") {
    return leftValue >= rightValue;
  }

  if (comparisonExpressionNode.operator === "LESS_THAN_OR_EQUAL_TO") {
    return leftValue <= rightValue;
  }

  if (comparisonExpressionNode.operator === "IS_DIVISIBLE_BY") {
    return leftValue % rightValue === 0;
  }

  if (comparisonExpressionNode.operator === "IS_EVEN") {
    return leftValue % 2 === 0;
  }

  if (comparisonExpressionNode.operator === "IS_ODD") {
    return leftValue % 2 !== 0;
  }

  throw new Error(`Unsupported comparison operator: ${comparisonExpressionNode.operator}`);
}

/**
 * @param {any} logicalExpressionNode
 * @param {RuntimeState} runtimeState
 * @returns {boolean}
 */
function evaluateLogicalExpression(logicalExpressionNode, runtimeState) {
  const leftConditionValue = evaluateExpression(logicalExpressionNode.left, runtimeState);

  if (logicalExpressionNode.operator === "AND") {
    const rightConditionValue = evaluateExpression(logicalExpressionNode.right, runtimeState);
    return leftConditionValue && rightConditionValue;
  }

  if (logicalExpressionNode.operator === "OR") {
    const rightConditionValue = evaluateExpression(logicalExpressionNode.right, runtimeState);
    return leftConditionValue || rightConditionValue;
  }

  throw new Error(`Unsupported logical operator: ${logicalExpressionNode.operator}`);
}

/**
 * @param {any} functionCallExpressionNode
 * @param {RuntimeState} runtimeState
 * @returns {any}
 */
function runFunctionCallExpression(functionCallExpressionNode, runtimeState) {
  const functionName = functionCallExpressionNode.name;
  const functionDefinitionNode = runtimeState.functions[functionName];

  if (!functionDefinitionNode) {
    throw new Error(`Unknown function: ${functionName}`);
  }

  const argumentValues = [];
  for (const argumentExpressionNode of functionCallExpressionNode.args) {
    const argumentValue = evaluateExpression(argumentExpressionNode, runtimeState);
    argumentValues.push(argumentValue);
  }

  const previousScopeVariables = runtimeState.variables;
  // Local scope inherits from outer scope so read access works without copying every variable.
  const functionLocalVariables = Object.create(previousScopeVariables);

  for (let parameterIndex = 0; parameterIndex < functionDefinitionNode.params.length; parameterIndex++) {
    const parameterName = functionDefinitionNode.params[parameterIndex];
    const passedValue = argumentValues[parameterIndex];
    functionLocalVariables[parameterName] = passedValue;
  }

  runtimeState.variables = functionLocalVariables;

  for (const functionStatementNode of functionDefinitionNode.body) {
    const functionStatementResult = runStatement(functionStatementNode, runtimeState, runtimeState.logger);

    if (functionStatementResult && functionStatementResult.control === "BREAK") {
      break;
    }
  }

  runtimeState.variables = previousScopeVariables;
  return null;
}

/**
 * @param {any} statementNode
 * @param {RuntimeState} runtimeState
 * @param {Logger} logger
 * @returns {StatementControlResult | null}
 */
function runStatement(statementNode, runtimeState, logger) {
  if (statementNode.type === "BreakStatement") {
    return { control: "BREAK" };
  }

  if (statementNode.type === "FunctionDefinition") {
    const functionName = statementNode.name;
    runtimeState.functions[functionName] = statementNode;
    return null;
  }

  if (statementNode.type === "FunctionCallStatement") {
    runFunctionCallExpression(statementNode.call, runtimeState);
    return null;
  }

  if (statementNode.type === "SetStatement") {
    const variableName = statementNode.name;
    const variableValue = evaluateExpression(statementNode.value, runtimeState);
    runtimeState.variables[variableName] = variableValue;
    return null;
  }

  if (statementNode.type === "PrintStatement") {
    const evaluatedValues = [];

    for (const valueExpressionNode of statementNode.values) {
      const value = evaluateExpression(valueExpressionNode, runtimeState);
      evaluatedValues.push(value);
    }

    const outputLine = evaluatedValues.join(" ");
    runtimeState.output.push(outputLine);
    logger.log(...evaluatedValues);
    return null;
  }

  if (statementNode.type === "IfStatement") {
    const conditionValue = evaluateExpression(statementNode.condition, runtimeState);
    const selectedBody = conditionValue ? statementNode.thenBody : statementNode.elseBody;

    for (const nestedStatementNode of selectedBody) {
      const nestedStatementResult = runStatement(nestedStatementNode, runtimeState, logger);

      // Break from inside nested blocks must be returned upward so loops can stop correctly.
      if (nestedStatementResult && nestedStatementResult.control === "BREAK") {
        return nestedStatementResult;
      }
    }

    return null;
  }

  if (statementNode.type === "WhileStatement") {
    while (evaluateExpression(statementNode.condition, runtimeState)) {
      for (const nestedStatementNode of statementNode.body) {
        const nestedStatementResult = runStatement(nestedStatementNode, runtimeState, logger);

        if (nestedStatementResult && nestedStatementResult.control === "BREAK") {
          return null;
        }
      }
    }

    return null;
  }

  if (statementNode.type === "ForEachStatement") {
    const startValue = evaluateExpression(statementNode.start, runtimeState);
    const endValue = evaluateExpression(statementNode.end, runtimeState);

    for (let currentLoopValue = startValue; currentLoopValue <= endValue; currentLoopValue++) {
      runtimeState.variables[statementNode.variableName] = currentLoopValue;

      for (const nestedStatementNode of statementNode.body) {
        const nestedStatementResult = runStatement(nestedStatementNode, runtimeState, logger);

        if (nestedStatementResult && nestedStatementResult.control === "BREAK") {
          return null;
        }
      }
    }

    return null;
  }

  if (statementNode.type === "RepeatStatement") {
    const repeatCount = evaluateExpression(statementNode.count, runtimeState);

    for (let repeatIndex = 0; repeatIndex < repeatCount; repeatIndex++) {
      for (const nestedStatementNode of statementNode.body) {
        const nestedStatementResult = runStatement(nestedStatementNode, runtimeState, logger);

        if (nestedStatementResult && nestedStatementResult.control === "BREAK") {
          return null;
        }
      }
    }

    return null;
  }

  throw new Error(`Unsupported statement type: ${statementNode.type}`);
}

/**
 * @param {{ type: string, body: any[] }} programNode
 * @param {Logger} logger
 * @param {RuntimeOptions} options
 * @returns {RuntimeState}
 */
function runProgram(programNode, logger, options) {
  const runtimeState = {
    variables: {},
    functions: {},
    output: [],
    ask: options.ask,
    logger,
  };

  for (const statementNode of programNode.body) {
    runStatement(statementNode, runtimeState, logger);
  }

  return runtimeState;
}

/**
 * @param {string} sourceCode
 * @param {Logger} [logger=console]
 * @param {RuntimeOptions} [options={}]
 * @returns {RuntimeState}
 */
export function runEnglang(sourceCode, logger = console, options = {}) {
  const tokenList = tokenize(sourceCode);
  const parsedProgram = parse(tokenList);
  return runProgram(parsedProgram, logger, options);
}

/**
 *
 * @param {string} sourceCode Englang program text.
 * @param {Logger} logger Logger object used by print statements.
 * @param {RuntimeOptions} options Runtime options.
 * @param {(promptText: string) => any} [options.ask] Input provider used by ask("...").
 * Return value of this function becomes the value of ask(...).
 *
 * Example:
 * run(sourceCode, console, {
 *   ask(promptText) {
 *     if (promptText === "What is your name?") {
 *       return "Alice";
 *     }
 *     return "";
 *   }
 * });
 * @returns {RuntimeState}
 */
export function run(sourceCode, logger = console, options = {}) {
  return runEnglang(sourceCode, logger, options);
}
