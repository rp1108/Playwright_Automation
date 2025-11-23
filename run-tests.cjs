#!/usr/bin/env node

const http = require('http');
const { exec } = require('child_process');

// Parse CLI arguments
const testFile = process.argv[2] || '';
const browser = process.argv[3] || '';
const headless = process.argv[4] !== 'false';

// Build payload
const payload = {
  test: testFile,
  browser: browser,
  headless: headless
};

console.log("🚀 Sending request to MCP server...");
console.log(`📝 Test: ${testFile}`);
console.log(`🌐 Browser: ${browser || "all"}`);
console.log(`👁️ Headed: ${headless ? "no" : "yes"}`);
console.log("");

// POST → MCP Server
const req = http.request(
  {
    hostname: 'localhost',
    port: 3000,
    path: '/api/run-tests',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  res => {
    let data = '';

    res.on('data', chunk => (data += chunk.toString()));

    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log(JSON.stringify(json, null, 2));

        if (json.report?.url) {
          console.log(`\n📊 Report ready at: ${json.report.url}\n`);
          exec(`open "${json.report.url}"`, () => {});
        }
      } catch (err) {
        console.error("❌ Invalid JSON response from server");
        console.error(data);
      }
    });
  }
);

req.write(JSON.stringify(payload));
req.end();
