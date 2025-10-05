import { TOKEN_TYPES } from "./constants/tokens.js";
import { isStatementTerminator } from "./utils/syntax.js";

export function parse(tokens) {
  const parsedStatementsResult = parseStatements(tokens, 0, []);
  return { type: "Program", body: parsedStatementsResult.statements };
}

function parseStatements(tokens, startPosition, stopTypes) {
  let position = startPosition;
  const statements = [];

  while (position < tokens.length) {
    const token = tokens[position];
    if (!token || stopTypes.includes(token.type)) {
      break;
    }

    if (token.type === TOKEN_TYPES.START) {
      position++;
      continue;
    }

    if (token.type === TOKEN_TYPES.PRINT) {
      const parsedPrintStatement = parsePrintStatement(tokens, position);
      statements.push(parsedPrintStatement.statement);
      position = parsedPrintStatement.nextPosition;
      continue;
    }

    if (token.type === TOKEN_TYPES.SET) {
      const parsedSetStatement = parseSetStatement(tokens, position);
      statements.push(parsedSetStatement.statement);
      position = parsedSetStatement.nextPosition;
      continue;
    }

    if (token.type === TOKEN_TYPES.IF) {
      const parsedIfStatement = parseIfStatement(tokens, position);
      statements.push(parsedIfStatement.statement);
      position = parsedIfStatement.nextPosition;
      continue;
    }

    if (token.type === TOKEN_TYPES.WHILE) {
      const parsedWhileStatement = parseWhileStatement(tokens, position);
      statements.push(parsedWhileStatement.statement);
      position = parsedWhileStatement.nextPosition;
      continue;
    }

    if (token.type === TOKEN_TYPES.FOR) {
      const parsedForEachStatement = parseForEachStatement(tokens, position);
      statements.push(parsedForEachStatement.statement);
      position = parsedForEachStatement.nextPosition;
      continue;
    }

    if (token.type === TOKEN_TYPES.REPEAT) {
      const parsedRepeatStatement = parseRepeatStatement(tokens, position);
      statements.push(parsedRepeatStatement.statement);
      position = parsedRepeatStatement.nextPosition;
      continue;
    }

    if (token.type === TOKEN_TYPES.BREAK) {
      const parsedBreakStatement = parseBreakStatement(tokens, position);
      statements.push(parsedBreakStatement.statement);
      position = parsedBreakStatement.nextPosition;
      continue;
    }

    if (token.type === TOKEN_TYPES.FUNCTION) {
      const parsedFunctionDefinition = parseFunctionDefinition(tokens, position);
      statements.push(parsedFunctionDefinition.statement);
      position = parsedFunctionDefinition.nextPosition;
      continue;
    }

    if (token.type === TOKEN_TYPES.IDENTIFIER && tokens[position + 1] && tokens[position + 1].type === TOKEN_TYPES.LEFT_PAREN) {
      const parsedFunctionCallStatement = parseFunctionCallStatement(tokens, position);
      statements.push(parsedFunctionCallStatement.statement);
      position = parsedFunctionCallStatement.nextPosition;
      continue;
    }

    throw new Error(`Unknown statement near token: ${token.value}`);
  }

  return { statements, nextPosition: position };
}

function parseFunctionDefinition(tokens, position) {
  const nameToken = tokens[position + 1];
  if (!nameToken || nameToken.type !== TOKEN_TYPES.IDENTIFIER) {
    throw new Error("Expected function name after function.");
  }

  let current = position + 2;
  const params = [];
  if (tokens[current] && tokens[current].type === TOKEN_TYPES.LEFT_PAREN) {
    current++;
    while (tokens[current] && tokens[current].type !== TOKEN_TYPES.RIGHT_PAREN) {
      if (tokens[current].type === TOKEN_TYPES.IDENTIFIER) {
        params.push(tokens[current].value);
        current++;
        if (tokens[current] && tokens[current].type === TOKEN_TYPES.COMMA) {
          current++;
        }
        continue;
      }
      throw new Error("Invalid function parameter list.");
    }
    if (!tokens[current] || tokens[current].type !== TOKEN_TYPES.RIGHT_PAREN) {
      throw new Error("Expected ')' after function parameters.");
    }
    current++;
  }

  if (tokens[current] && tokens[current].type === TOKEN_TYPES.COLON) {
    current++;
  }

  const bodyBlock = parseStatements(tokens, current, [TOKEN_TYPES.END, TOKEN_TYPES.RIGHT_BRACE]);
  const endToken = tokens[bodyBlock.nextPosition];
  if (!endToken || (endToken.type !== TOKEN_TYPES.END && endToken.type !== TOKEN_TYPES.RIGHT_BRACE)) {
    throw new Error("Expected end of function body.");
  }

  return {
    statement: {
      type: "FunctionDefinition",
      name: nameToken.value,
      params,
      body: bodyBlock.statements,
    },
    nextPosition: bodyBlock.nextPosition + 1,
  };
}

function parseFunctionCallStatement(tokens, position) {
  const parsedCall = parseCallExpression(tokens, position);
  const endToken = tokens[parsedCall.nextPosition];
  if (!endToken || !isStatementTerminator(endToken.type)) {
    throw new Error("Expected statement terminator after function call.");
  }
  return {
    statement: { type: "FunctionCallStatement", call: parsedCall.expression },
    nextPosition: parsedCall.nextPosition + 1,
  };
}

function parseBreakStatement(tokens, position) {
  const endToken = tokens[position + 1];
  if (!endToken || !isStatementTerminator(endToken.type)) {
    throw new Error("Expected statement terminator after break.");
  }
  return { statement: { type: "BreakStatement" }, nextPosition: position + 2 };
}

function parseRepeatStatement(tokens, position) {
  const count = parseExpression(tokens, position + 1, [TOKEN_TYPES.TIMES_WORD]);
  if (!tokens[count.nextPosition] || tokens[count.nextPosition].type !== TOKEN_TYPES.TIMES_WORD) {
    throw new Error("Expected 'times' in repeat statement.");
  }
  let current = count.nextPosition + 1;
  if (tokens[current] && tokens[current].type === TOKEN_TYPES.COLON) {
    current++;
  }

  const body = parseStatements(tokens, current, [TOKEN_TYPES.END, TOKEN_TYPES.RIGHT_BRACE]);
  const end = tokens[body.nextPosition];
  if (!end || (end.type !== TOKEN_TYPES.END && end.type !== TOKEN_TYPES.RIGHT_BRACE)) {
    throw new Error("Expected end after repeat block.");
  }

  return {
    statement: { type: "RepeatStatement", count: count.expression, body: body.statements },
    nextPosition: body.nextPosition + 1,
  };
}

function parseForEachStatement(tokens, position) {
  if (!tokens[position + 1] || tokens[position + 1].type !== TOKEN_TYPES.EACH) {
    throw new Error("Expected each after for.");
  }

  let current = position + 2;
  const variable = tokens[current];
  if (!variable || variable.type !== TOKEN_TYPES.IDENTIFIER) {
    throw new Error("Expected loop variable in for each.");
  }
  current++;

  const fromToken = tokens[current];
  if (!fromToken || (fromToken.type !== TOKEN_TYPES.FROM && !(fromToken.type === TOKEN_TYPES.SYMBOL_OPERATOR && fromToken.value === "="))) {
    throw new Error("Expected from (or =) in for loop.");
  }
  current++;

  const start = parseExpression(tokens, current, [TOKEN_TYPES.TO]);
  current = start.nextPosition;
  if (!tokens[current] || tokens[current].type !== TOKEN_TYPES.TO) {
    throw new Error("Expected to in for statement.");
  }
  current++;

  const end = parseExpression(tokens, current, [TOKEN_TYPES.COLON, TOKEN_TYPES.LEFT_BRACE, TOKEN_TYPES.PRINT, TOKEN_TYPES.SET, TOKEN_TYPES.IF]);
  current = end.nextPosition;
  if (tokens[current] && tokens[current].type === TOKEN_TYPES.COLON) {
    current++;
  }
  if (tokens[current] && tokens[current].type === TOKEN_TYPES.LEFT_BRACE) {
    current++;
  }

  const body = parseStatements(tokens, current, [TOKEN_TYPES.END, TOKEN_TYPES.RIGHT_BRACE]);
  const endToken = tokens[body.nextPosition];
  if (!endToken || (endToken.type !== TOKEN_TYPES.END && endToken.type !== TOKEN_TYPES.RIGHT_BRACE)) {
    throw new Error("Expected end after for block.");
  }

  return {
    statement: {
      type: "ForEachStatement",
      variableName: variable.value,
      start: start.expression,
      end: end.expression,
      body: body.statements,
    },
    nextPosition: body.nextPosition + 1,
  };
}

function parseWhileStatement(tokens, position) {
  const condition = parseConditionExpression(tokens, position + 1, [TOKEN_TYPES.COLON, TOKEN_TYPES.LEFT_BRACE]);
  let current = condition.nextPosition;
  if (tokens[current] && (tokens[current].type === TOKEN_TYPES.COLON || tokens[current].type === TOKEN_TYPES.LEFT_BRACE)) {
    current++;
  }

  const body = parseStatements(tokens, current, [TOKEN_TYPES.END, TOKEN_TYPES.RIGHT_BRACE]);
  const end = tokens[body.nextPosition];
  if (!end || (end.type !== TOKEN_TYPES.END && end.type !== TOKEN_TYPES.RIGHT_BRACE)) {
    throw new Error("Expected end after while block.");
  }

  return {
    statement: { type: "WhileStatement", condition: condition.expression, body: body.statements },
    nextPosition: body.nextPosition + 1,
  };
}

function parseIfStatement(tokens, position) {
  const condition = parseConditionExpression(tokens, position + 1, [TOKEN_TYPES.THEN, TOKEN_TYPES.LEFT_BRACE]);
  let current = condition.nextPosition;
  if (tokens[current] && tokens[current].type === TOKEN_TYPES.THEN) {
    current++;
  }
  if (tokens[current] && (tokens[current].type === TOKEN_TYPES.BEGIN || tokens[current].type === TOKEN_TYPES.LEFT_BRACE)) {
    current++;
  }

  const thenBody = parseStatements(tokens, current, [TOKEN_TYPES.ELSE, TOKEN_TYPES.END, TOKEN_TYPES.RIGHT_BRACE]);
  current = thenBody.nextPosition;
  if (tokens[current] && tokens[current].type === TOKEN_TYPES.RIGHT_BRACE) {
    current++;
  }
  let elseBody = [];

  if (tokens[current] && tokens[current].type === TOKEN_TYPES.ELSE) {
    if (tokens[current + 1] && tokens[current + 1].type === TOKEN_TYPES.IF) {
      const nested = parseIfStatement(tokens, current + 1);
      elseBody = [nested.statement];
      return {
        statement: { type: "IfStatement", condition: condition.expression, thenBody: thenBody.statements, elseBody },
        nextPosition: nested.nextPosition,
      };
    }

    current++;
    if (tokens[current] && (tokens[current].type === TOKEN_TYPES.BEGIN || tokens[current].type === TOKEN_TYPES.LEFT_BRACE)) {
      current++;
    }
    const elseBlock = parseStatements(tokens, current, [TOKEN_TYPES.END, TOKEN_TYPES.RIGHT_BRACE]);
    elseBody = elseBlock.statements;
    current = elseBlock.nextPosition;
    if (tokens[current] && tokens[current].type === TOKEN_TYPES.RIGHT_BRACE) {
      current++;
      return {
        statement: { type: "IfStatement", condition: condition.expression, thenBody: thenBody.statements, elseBody },
        nextPosition: current,
      };
    }
  }

  const endToken = tokens[current];
  if (!endToken || (endToken.type !== TOKEN_TYPES.END && endToken.type !== TOKEN_TYPES.RIGHT_BRACE)) {
    throw new Error("Expected end after if block.");
  }

  return {
    statement: { type: "IfStatement", condition: condition.expression, thenBody: thenBody.statements, elseBody },
    nextPosition: current + 1,
  };
}

function parseConditionExpression(tokens, startPosition, stopTokenTypes) {
  const state = { position: startPosition, stopTokenTypes };
  const expression = parseConditionOr(tokens, state);
  return { expression, nextPosition: state.position };
}

function parseConditionOr(tokens, state) {
  let left = parseConditionAnd(tokens, state);
  while (tokens[state.position] && tokens[state.position].type === TOKEN_TYPES.OR) {
    state.position++;
    const right = parseConditionAnd(tokens, state);
    left = { type: "LogicalExpression", operator: "OR", left, right };
  }
  return left;
}

function parseConditionAnd(tokens, state) {
  let left = parseConditionTerm(tokens, state);
  while (tokens[state.position] && tokens[state.position].type === TOKEN_TYPES.AND) {
    state.position++;
    const right = parseConditionTerm(tokens, state);
    left = { type: "LogicalExpression", operator: "AND", left, right };
  }
  return left;
}

function parseConditionTerm(tokens, state) {
  const left = parseExpression(tokens, state.position, [TOKEN_TYPES.IS, TOKEN_TYPES.AND, TOKEN_TYPES.OR, ...state.stopTokenTypes]);
  state.position = left.nextPosition;

  const next = tokens[state.position];
  if (next && next.type === TOKEN_TYPES.SYMBOL_OPERATOR) {
    const op = mapSymbolComparison(next.value);
    if (!op) {
      throw new Error(`Unsupported symbol comparison: ${next.value}`);
    }
    state.position++;
    const right = parseExpression(tokens, state.position, [TOKEN_TYPES.AND, TOKEN_TYPES.OR, ...state.stopTokenTypes]);
    state.position = right.nextPosition;
    return { type: "ComparisonExpression", operator: op, left: left.expression, right: right.expression };
  }

  if (!next || next.type !== TOKEN_TYPES.IS) {
    throw new Error("Expected condition operator.");
  }
  state.position++;

  const comparison = parseWordComparison(tokens, state.position);
  state.position = comparison.nextPosition;

  if (comparison.operator === "IS_EVEN" || comparison.operator === "IS_ODD") {
    return { type: "ComparisonExpression", operator: comparison.operator, left: left.expression, right: null };
  }

  const right = parseExpression(tokens, state.position, [TOKEN_TYPES.AND, TOKEN_TYPES.OR, ...state.stopTokenTypes]);
  state.position = right.nextPosition;
  return { type: "ComparisonExpression", operator: comparison.operator, left: left.expression, right: right.expression };
}

function mapSymbolComparison(symbolOperatorValue) {
  if (symbolOperatorValue === ">") return "GREATER_THAN";
  if (symbolOperatorValue === "<") return "LESS_THAN";
  if (symbolOperatorValue === "==") return "EQUAL_TO";
  if (symbolOperatorValue === "!=") return "NOT_EQUAL_TO";
  if (symbolOperatorValue === ">=") return "GREATER_THAN_OR_EQUAL_TO";
  if (symbolOperatorValue === "<=") return "LESS_THAN_OR_EQUAL_TO";
  return null;
}

function parseWordComparison(tokens, position) {
  const firstToken = tokens[position];
  const secondToken = tokens[position + 1];
  const thirdToken = tokens[position + 2];
  const fourthToken = tokens[position + 3];
  const fifthToken = tokens[position + 4];

  if (firstToken && firstToken.type === TOKEN_TYPES.NOT && secondToken && secondToken.type === TOKEN_TYPES.EQUAL && thirdToken && thirdToken.type === TOKEN_TYPES.TO) {
    return { operator: "NOT_EQUAL_TO", nextPosition: position + 3 };
  }
  if (firstToken && firstToken.type === TOKEN_TYPES.EQUAL && secondToken && secondToken.type === TOKEN_TYPES.TO) {
    return { operator: "EQUAL_TO", nextPosition: position + 2 };
  }
  if (
    firstToken &&
    firstToken.type === TOKEN_TYPES.GREATER &&
    secondToken &&
    secondToken.type === TOKEN_TYPES.IDENTIFIER &&
    secondToken.value === "than" &&
    thirdToken &&
    thirdToken.type === TOKEN_TYPES.OR &&
    fourthToken &&
    fourthToken.type === TOKEN_TYPES.EQUAL &&
    fifthToken &&
    fifthToken.type === TOKEN_TYPES.TO
  ) {
    return { operator: "GREATER_THAN_OR_EQUAL_TO", nextPosition: position + 5 };
  }
  if (firstToken && firstToken.type === TOKEN_TYPES.GREATER && secondToken && secondToken.type === TOKEN_TYPES.IDENTIFIER && secondToken.value === "than") {
    return { operator: "GREATER_THAN", nextPosition: position + 2 };
  }
  if (
    firstToken &&
    firstToken.type === TOKEN_TYPES.LESS &&
    secondToken &&
    secondToken.type === TOKEN_TYPES.IDENTIFIER &&
    secondToken.value === "than" &&
    thirdToken &&
    thirdToken.type === TOKEN_TYPES.OR &&
    fourthToken &&
    fourthToken.type === TOKEN_TYPES.EQUAL &&
    fifthToken &&
    fifthToken.type === TOKEN_TYPES.TO
  ) {
    return { operator: "LESS_THAN_OR_EQUAL_TO", nextPosition: position + 5 };
  }
  if (firstToken && firstToken.type === TOKEN_TYPES.LESS && secondToken && secondToken.type === TOKEN_TYPES.IDENTIFIER && secondToken.value === "than") {
    return { operator: "LESS_THAN", nextPosition: position + 2 };
  }
  if (firstToken && firstToken.type === TOKEN_TYPES.IDENTIFIER && firstToken.value === "divisible" && secondToken && secondToken.type === TOKEN_TYPES.IDENTIFIER && secondToken.value === "by") {
    return { operator: "IS_DIVISIBLE_BY", nextPosition: position + 2 };
  }
  if (firstToken && firstToken.type === TOKEN_TYPES.IDENTIFIER && firstToken.value === "even") {
    return { operator: "IS_EVEN", nextPosition: position + 1 };
  }
  if (firstToken && firstToken.type === TOKEN_TYPES.IDENTIFIER && firstToken.value === "odd") {
    return { operator: "IS_ODD", nextPosition: position + 1 };
  }
  throw new Error(`Unsupported comparison near: ${firstToken ? firstToken.value : "end"}`);
}

function parseSetStatement(tokens, position) {
  const variable = tokens[position + 1];
  const toToken = tokens[position + 2];
  if (!variable || variable.type !== TOKEN_TYPES.IDENTIFIER) {
    throw new Error("Expected variable name after set.");
  }
  if (!toToken || !(toToken.type === TOKEN_TYPES.TO || (toToken.type === TOKEN_TYPES.SYMBOL_OPERATOR && toToken.value === "="))) {
    throw new Error("Expected to (or =) in set statement.");
  }

  const value = parseExpression(tokens, position + 3, [TOKEN_TYPES.DOT, TOKEN_TYPES.SEMICOLON]);
  const endToken = tokens[value.nextPosition];
  if (!endToken || !isStatementTerminator(endToken.type)) {
    throw new Error("Expected statement terminator after set.");
  }

  return {
    statement: { type: "SetStatement", name: variable.value, value: value.expression },
    nextPosition: value.nextPosition + 1,
  };
}

function parsePrintStatement(tokens, position) {
  let current = position + 1;
  if (tokens[current] && tokens[current].type === TOKEN_TYPES.LEFT_PAREN) {
    current++;
  }

  const values = [];
  while (current < tokens.length) {
    const token = tokens[current];
    if (isStatementTerminator(token.type) || token.type === TOKEN_TYPES.RIGHT_PAREN) {
      if (token.type === TOKEN_TYPES.RIGHT_PAREN) {
        current++;
        if (!tokens[current] || !isStatementTerminator(tokens[current].type)) {
          throw new Error("Expected statement terminator after print(...).");
        }
      }
      return { statement: { type: "PrintStatement", values }, nextPosition: current + 1 };
    }

    const value = parseExpression(tokens, current, [TOKEN_TYPES.COMMA, TOKEN_TYPES.RIGHT_PAREN, TOKEN_TYPES.DOT, TOKEN_TYPES.SEMICOLON]);
    values.push(value.expression);
    current = value.nextPosition;
    if (tokens[current] && tokens[current].type === TOKEN_TYPES.COMMA) {
      current++;
    }
  }

  throw new Error("Expected statement terminator after print statement.");
}

function parseExpression(tokens, startPosition, stopTokenTypes) {
  const state = { position: startPosition, stopTokenTypes };
  const expression = parseAddSubtract(tokens, state);
  return { expression, nextPosition: state.position };
}

function parseAddSubtract(tokens, state) {
  let left = parseMultiplyDivide(tokens, state);
  while (state.position < tokens.length) {
    const token = tokens[state.position];
    if (!token || isStopToken(token, state.stopTokenTypes)) {
      break;
    }

    const plus = token.type === TOKEN_TYPES.PLUS_WORD || (token.type === TOKEN_TYPES.SYMBOL_OPERATOR && token.value === "+");
    const minus = token.type === TOKEN_TYPES.MINUS_WORD || (token.type === TOKEN_TYPES.SYMBOL_OPERATOR && token.value === "-");
    if (!plus && !minus) {
      break;
    }
    state.position++;
    const right = parseMultiplyDivide(tokens, state);
    left = { type: "BinaryExpression", operator: plus ? "PLUS" : "MINUS", left, right };
  }
  return left;
}

function parseMultiplyDivide(tokens, state) {
  let left = parsePrimary(tokens, state);
  while (state.position < tokens.length) {
    const token = tokens[state.position];
    if (!token || isStopToken(token, state.stopTokenTypes)) {
      break;
    }
    const times =
      token.type === TOKEN_TYPES.MULTIPLY_WORD ||
      token.type === TOKEN_TYPES.TIMES_WORD ||
      (token.type === TOKEN_TYPES.SYMBOL_OPERATOR && token.value === "*");
    const divide = token.type === TOKEN_TYPES.DIVIDE_WORD || (token.type === TOKEN_TYPES.SYMBOL_OPERATOR && token.value === "/");
    if (!times && !divide) {
      break;
    }
    state.position++;
    if (divide && tokens[state.position] && tokens[state.position].type === TOKEN_TYPES.IDENTIFIER && tokens[state.position].value.toLowerCase() === "by") {
      state.position++;
    }
    const right = parsePrimary(tokens, state);
    left = { type: "BinaryExpression", operator: times ? "TIMES" : "DIVIDED_BY", left, right };
  }
  return left;
}

function parsePrimary(tokens, state) {
  const token = tokens[state.position];
  if (!token) {
    throw new Error("Expected value but found end of input.");
  }

  if (token.type === TOKEN_TYPES.LEFT_PAREN) {
    const inner = parseExpression(tokens, state.position + 1, [TOKEN_TYPES.RIGHT_PAREN]);
    if (!tokens[inner.nextPosition] || tokens[inner.nextPosition].type !== TOKEN_TYPES.RIGHT_PAREN) {
      throw new Error("Expected ')' to close expression.");
    }
    state.position = inner.nextPosition + 1;
    return inner.expression;
  }

  if (token.type === TOKEN_TYPES.ASK) {
    const askExpr = parseAskExpression(tokens, state.position);
    state.position = askExpr.nextPosition;
    return askExpr.expression;
  }

  if (token.type === TOKEN_TYPES.IDENTIFIER && tokens[state.position + 1] && tokens[state.position + 1].type === TOKEN_TYPES.LEFT_PAREN) {
    const call = parseCallExpression(tokens, state.position);
    state.position = call.nextPosition;
    return call.expression;
  }

  const valueNode = parseValueToken(token);
  state.position++;
  return valueNode;
}

function parseAskExpression(tokens, position) {
  if (!tokens[position + 1] || tokens[position + 1].type !== TOKEN_TYPES.LEFT_PAREN) {
    throw new Error("Expected '(' after ask.");
  }
  const argument = parseExpression(tokens, position + 2, [TOKEN_TYPES.RIGHT_PAREN]);
  if (!tokens[argument.nextPosition] || tokens[argument.nextPosition].type !== TOKEN_TYPES.RIGHT_PAREN) {
    throw new Error("Expected ')' after ask argument.");
  }
  return {
    expression: { type: "AskExpression", prompt: argument.expression },
    nextPosition: argument.nextPosition + 1,
  };
}

function parseCallExpression(tokens, position) {
  const nameToken = tokens[position];
  let current = position + 2;
  const args = [];
  while (tokens[current] && tokens[current].type !== TOKEN_TYPES.RIGHT_PAREN) {
    const arg = parseExpression(tokens, current, [TOKEN_TYPES.COMMA, TOKEN_TYPES.RIGHT_PAREN]);
    args.push(arg.expression);
    current = arg.nextPosition;
    if (tokens[current] && tokens[current].type === TOKEN_TYPES.COMMA) {
      current++;
    }
  }
  if (!tokens[current] || tokens[current].type !== TOKEN_TYPES.RIGHT_PAREN) {
    throw new Error("Expected ')' after function call arguments.");
  }

  return {
    expression: { type: "FunctionCallExpression", name: nameToken.value, args },
    nextPosition: current + 1,
  };
}

function parseValueToken(token) {
  if (token.type === TOKEN_TYPES.STRING) return { type: "StringLiteral", value: token.value };
  if (token.type === TOKEN_TYPES.NUMBER) return { type: "NumberLiteral", value: Number(token.value) };
  if (token.type === TOKEN_TYPES.BOOLEAN) return { type: "BooleanLiteral", value: token.value === "true" };
  if (token.type === TOKEN_TYPES.IDENTIFIER) return { type: "Identifier", name: token.value };
  throw new Error(`Unsupported value in expression: ${token.value}`);
}

function isStopToken(token, stopTokenTypes) {
  return stopTokenTypes.includes(token.type);
}
