# MCP Playwright Test Runner 🚀

Automated Playwright test execution via MCP API with auto-opening HTML reports.

## Quick Start

### 1. Start the MCP Server
```bash
cd mcp-server
npm start
# or
npm run start
```
Server will start on `http://localhost:3000`

### 2. Run Tests with Auto-Report Opening

#### Using npm scripts (recommended)
```bash
# Run all tests (chromium + webkit, headless)
npm run test:mcp

# Run chromium only (headless)
npm run test:chromium

# Run chromium in headed mode (browser visible)
npm run test:chromium:headed

# Run all browsers in headed mode
npm run test:headed

# View latest report manually
npm run report
```

#### Using Node.js runner directly
```bash
# Chromium only, headed mode, with auto-report
node run-tests.cjs tests/demoblaze-smoke.spec.js chromium false

# All browsers, headless mode
node run-tests.cjs tests/demoblaze-smoke.spec.js

# Custom test file
node run-tests.cjs tests/amazon-login.spec.js chromium true
```

#### Using curl (raw API)
```bash
# Chromium only, headed mode
curl -X POST http://localhost:3000/api/run-tests \
  -H "Content-Type: application/json" \
  -d '{"test":"tests/demoblaze-smoke.spec.js","browser":"chromium","headless":false}'

# All browsers, headless
curl -X POST http://localhost:3000/api/run-tests \
  -H "Content-Type: application/json" \
  -d '{"test":"tests/demoblaze-smoke.spec.js"}'

# View report
curl http://localhost:3000/report
```

## API Endpoints

### POST `/api/run-tests`
Execute Playwright tests and get HTML report URL

**Request Body:**
```json
{
  "test": "tests/demoblaze-smoke.spec.js",
  "browser": "chromium",              // optional: "chromium", "webkit", "firefox"
  "headless": true,                   // optional: true (default) or false
  "env": {                            // optional: environment variables
    "AMAZON_EMAIL": "test@example.com",
    "AMAZON_PASSWORD": "password123"
  }
}
```

**Response:**
```json
{
  "code": 0,
  "stdout": "test output...",
  "stderr": "",
  "report": {
    "url": "http://localhost:3000/report",
    "path": "/path/to/playwright-report/index.html",
    "message": "📊 Report ready! Open: http://localhost:3000/report"
  }
}
```

### GET `/report`
Serve the latest HTML test report in browser

### GET `/`
Get API documentation and examples

## Examples

### Run DemoBlaze Smoke Tests
```bash
npm run test:chromium:headed
# ✅ Tests run in visible Chromium browser
# ✅ Report auto-opens in new tab
```

### Run Amazon Login Test
```bash
node run-tests.cjs tests/amazon-login.spec.js chromium false
# Browser opens with test execution visible
# Report opens when complete
```

### Run All Tests in All Browsers
```bash
npm run test:mcp
# Runs both chromium and webkit in headless mode
# Report opens when complete
```

## File Structure

```
v2/
├── run-tests.sh           # Shell script version (macOS/Linux)
├── run-tests.cjs          # Node.js runner with auto-report (cross-platform)
├── mcp-server/
│   ├── server.js          # Express API server
│   ├── package.json
│   └── node_modules/
├── tests/
│   ├── demoblaze-smoke.spec.js
│   ├── amazon-login.spec.js
│   └── ... (other test files)
├── playwright-report/     # Generated HTML report
└── package.json
```

## Features

✅ **Auto-Report Opening** - Report opens in browser automatically after tests complete  
✅ **Multiple Browsers** - Run on chromium, webkit, firefox, or all  
✅ **Headless/Headed Modes** - Headless for CI, headed for debugging  
✅ **Environment Variables** - Pass credentials and config via API  
✅ **Streaming Output** - Real-time test output via HTTP streaming  
✅ **HTML Reports** - Beautiful interactive Playwright reports  
✅ **Cross-Platform** - Works on macOS, Linux, Windows  

## Troubleshooting

### Server not responding
```bash
# Check if server is running
curl http://localhost:3000/

# Restart server
pkill -f "node server.js"
cd mcp-server && npm start
```

### Report not opening
The report URL is returned in response: `http://localhost:3000/report`
- Open manually in browser if auto-open fails
- Check browser privacy settings

### Tests timing out
- Increase timeout in `playwright.config.js`
- Use headless mode for faster execution
- Check internet connectivity for remote tests

## Configuration

Edit `playwright.config.js` to customize:
- Test timeout
- Browser configuration
- Report format
- Parallel execution workers

## Contributing

To add new test files:
1. Create test in `tests/` directory
2. Run via `node run-tests.cjs tests/your-test.spec.js`
3. Report auto-opens when complete

---

**Happy Testing! 🎉**
