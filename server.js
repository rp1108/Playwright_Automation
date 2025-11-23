// server.js
import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

let runInProgress = false;

// Store last run output
let lastRunSummary = "⚠️ No test executed yet.";
let lastReportUrl = null;

/**
 * HOME — show last test run summary
 */
app.get('/', (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(lastRunSummary + (lastReportUrl ? `\n\n📈 Report: ${lastReportUrl}` : ""));
});

/**
 * HEALTH CHECK
 */
app.get('/api/status', (req, res) => res.json({ status: 'ok', message: 'Server healthy' }));

/**
 * MAIN TEST RUN ENDPOINT
 */
app.post('/api/run-tests', async (req, res) => {
  if (runInProgress) {
    return res.status(409).json({ error: 'A test run is already in progress. Try again later.' });
  }

  runInProgress = true;

  try {
    const body = req.body ?? {};
    let rawTest = body.test ?? body.path ?? 'tests';
    const browser = body.browser || '';
    const headless = typeof body.headless === 'boolean' ? body.headless : true;
    const headed = !headless;

    if (rawTest === 'all') rawTest = 'tests';

    // Format CLI header (this must return!)
    const header =
`📝 Test: ${rawTest}
🌐 Browser: ${browser || "all"}
👁️ Headed: ${headed ? "yes" : "no"}`;

    console.log(header);

    // Build environment for Playwright config
    const playEnv = { ...process.env };
    if (rawTest !== 'tests') playEnv.PW_TEST = rawTest; else delete playEnv.PW_TEST;
    if (browser) playEnv.BROWSER = browser; else delete playEnv.BROWSER;
    playEnv.HEADLESS = headless ? 'true' : 'false';

    // Build CLI args
    const args = ['playwright', 'test'];
    if (rawTest) args.push(rawTest);
    if (browser) args.push(`--project=${browser}`);
    if (headed) args.push('--headed');
    args.push('--reporter=html');

    console.log('▶ Running command:', ['npx', ...args].join(' '));

    const testProcess = spawn('npx', args, {
      cwd: path.resolve('./'),
      env: playEnv,
      shell: false
    });

    let fullOutput = header + "\n\n";

    testProcess.stdout.on('data', d => {
      const s = d.toString();
      fullOutput += s;
      process.stdout.write(s);
    });

    testProcess.stderr.on('data', d => {
      const s = d.toString();
      fullOutput += s;
      process.stdout.write(s);
    });

    testProcess.on('error', err => {
      runInProgress = false;
      return res.status(500).json({ error: err.message });
    });

    testProcess.on('close', code => {
      const reportDir = path.join(process.cwd(), 'playwright-report');
      const indexFile = path.join(reportDir, 'index.html');

      if (fs.existsSync(indexFile)) {
        lastReportUrl = `http://localhost:3000/report`;
        fullOutput += `\n\n📊 Report ready!\n${lastReportUrl}\n`;
      } else {
        lastReportUrl = null;
      }

      // Save result for homepage
      lastRunSummary = fullOutput.trim();

      // Respond to frontend
      res.json({
        code,
        message: "📊 Report ready!",
        report: lastReportUrl ? { url: lastReportUrl } : null
      });

      runInProgress = false;
    });

  } catch (err) {
    runInProgress = false;
    res.status(500).json({ error: String(err) });
  }
});

// Serve HTML report
app.use('/report', express.static(path.join(process.cwd(), 'playwright-report')));

app.listen(3000, () => {
  console.log("🔥 MCP Server running at http://localhost:3000");
});
