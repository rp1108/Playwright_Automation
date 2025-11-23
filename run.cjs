const { spawn } = require("child_process");

const test = process.argv[2];
const browser = process.argv[3] || "";
const headedArg = process.argv[4] || "false";
const headed = headedArg === "true";

if (!test) {
  console.error("❌ Please provide a test file");
  process.exit(1);
}

console.log("📝 Test:", test);
console.log("🌐 Browser:", browser || "all");
console.log("👁️  Headed:", headed ? "yes" : "no");

const args = ["playwright", "test", test];

if (browser) args.push(`--project=${browser}`);
if (headed) args.push("--headed");

args.push("--reporter=html");

console.log("▶ Running command:", ["npx", ...args].join(" "));

const run = spawn("npx", args, { stdio: "inherit", shell: true });

run.on("close", (code) => {
  console.log(`\n🏁 DONE: Exit code ${code}`);
});
