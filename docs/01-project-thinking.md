# Project Thinking

## Current Code Status

### Already Done

- Project uses ES modules (`"type": "module"`).
- A basic V1 interpreter exists for `start`, `set`, and `print`.
- Basic string/number handling and variable lookup are working in the current runtime flow.

### Partially Done

- Parser/lexer/token layers are not separated yet; behavior is implemented in one file (`index.js`).
- Scripts are now standardized (`npm start`, `npm test`), but broader story coverage is still pending.

### Not Done Yet

- `tokens.js` is not created.
- `lexer.js` is not created.
- `parser.js` is not created.
- If/else is not implemented.
- Loops are not implemented.
- Functions are not implemented.
- Input (`ask`) is not implemented.
