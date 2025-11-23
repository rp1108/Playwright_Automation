#!/bin/bash

# MCP Test Runner - Clean Version
# Usage:
#   ./run-tests.sh tests/file.spec.js chromium false
#   ./run-tests.sh tests/file.spec.js
#   ./run-tests.sh

TEST_FILE="${1:-tests/demoblaze-smoke.spec.js}"
BROWSER="${2:-}"
HEADLESS="${3:-true}"

# Build JSON
if [ -z "$BROWSER" ]; then
  PAYLOAD="{\"test\":\"$TEST_FILE\",\"headless\":$HEADLESS}"
else
  PAYLOAD="{\"test\":\"$TEST_FILE\",\"browser\":\"$BROWSER\",\"headless\":$HEADLESS}"
fi

echo ""
echo "🚀 Running Playwright tests..."
echo "📝 Test: $TEST_FILE"
echo "🌐 Browser: ${BROWSER:-all}"
echo "👁️ Headless: $HEADLESS"
echo ""

# Send request
RESPONSE=$(curl -s -X POST http://localhost:3000/api/run-tests \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

# Get exit code
EXIT_CODE=$(echo "$RESPONSE" | grep -o '"code":[0-9]*' | cut -d: -f2)

# Print summary only
if [ "$EXIT_CODE" = "0" ]; then
  echo "✅ Tests Passed!"
else
  echo "❌ Tests Failed (Exit Code: $EXIT_CODE)"
fi

# Always open report
echo ""
echo "📊 Opening report..."
if command -v open &> /dev/null; then
  open http://localhost:3000/report
elif command -v xdg-open &> /dev/null; then
  xdg-open http://localhost:3000/report
elif command -v start &> /dev/null; then
  start http://localhost:3000/report
fi

echo ""
echo "📈 Report URL: http://localhost:3000/report"

exit $EXIT_CODE
