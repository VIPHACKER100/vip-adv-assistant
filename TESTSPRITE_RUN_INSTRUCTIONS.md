# Running Tests with TestSprite

## ✅ Current Setup Status

1. **TestSprite MCP**: ✅ Installed and configured
2. **API Key**: ✅ Added to `.cursor/mcp.json`
3. **Server**: ✅ Running on port 8000
4. **Playwright**: ⚠️ Browsers installing (in progress)

## 🚀 Option 1: Using TestSprite MCP (Recommended)

### Steps:

1. **Restart Cursor IDE** (Required!)
   - Close and reopen Cursor to load the MCP configuration
   - The TestSprite MCP server will connect automatically

2. **Verify Connection**:
   - After restart, TestSprite MCP should be available
   - You can check in Cursor's MCP panel (if available)

3. **Run Tests**:
   - In Cursor chat, simply say: **"Run tests using TestSprite"**
   - TestSprite will:
     - Analyze your project structure
     - Execute all 14 test cases
     - Generate comprehensive reports
     - Provide detailed results

### What TestSprite MCP Does:

- ✅ Automatically discovers test files
- ✅ Runs tests in cloud infrastructure
- ✅ Generates detailed HTML reports
- ✅ Provides actionable insights
- ✅ Can auto-fix issues found

## 🔧 Option 2: Direct Test Execution

If TestSprite MCP isn't available yet, you can run tests directly:

### Prerequisites:

```powershell
# Install Playwright browsers (if not done)
python -m playwright install chromium
```

### Run Tests:

```powershell
# Navigate to test directory
cd testsprite_tests

# Run all tests
python run_all_tests.py

# Or run individual test
python TC003_Keyboard_shortcut_default_behaviors.py
```

## 📋 Available Test Cases

1. **TC001** - Execute 75+ simulated functions
2. **TC002** - Voice command recognition
3. **TC003** - Keyboard shortcuts (✅ Simplest)
4. **TC004** - Custom keyboard shortcuts
5. **TC005** - Fuzzy search functionality
6. **TC006** - Favorites system
7. **TC007** - Theme manager
8. **TC008** - Export/Import backup
9. **TC009** - Performance monitor
10. **TC010** - Recent functions history
11. **TC011** - Device monitoring panel
12. **TC012** - Automation builder
13. **TC013** - Offline PWA support
14. **TC014** - No critical errors

## 🎯 Quick Start

### For TestSprite MCP:

1. ✅ API key is already configured
2. **Restart Cursor IDE** ← Important!
3. Ensure server is running: `python -m http.server 8000`
4. In Cursor chat: **"Run tests using TestSprite"**

### For Direct Execution:

1. Wait for Playwright browsers to finish installing
2. Run: `cd testsprite_tests && python run_all_tests.py`

## 📊 Expected Results

When using TestSprite MCP, you'll get:

- **Test Execution Report** - Pass/fail status for each test
- **Coverage Analysis** - What was tested
- **Performance Metrics** - Execution times
- **Error Details** - Specific failure reasons
- **Recommendations** - How to fix issues

## 🔍 Troubleshooting

**TestSprite MCP not appearing?**

- ✅ API key is configured correctly
- ⚠️ **Restart Cursor IDE** (most common issue)
- Check `.cursor/mcp.json` syntax is valid JSON

**Tests not running?**

- Verify server is running: `netstat -ano | findstr :8000`
- Check Playwright browsers: `python -m playwright install chromium`
- Ensure test files exist in `testsprite_tests/`

**API Key issues?**

- Key is configured in `.cursor/mcp.json`
- Format: `"TESTSPRITE_API_KEY": "your-key-here"` (no ${})
- Restart Cursor after any config changes

## 📝 Next Steps

1. **Restart Cursor IDE** to activate TestSprite MCP
2. **Wait for Playwright browsers** to finish installing (if using direct
   execution)
3. **Run tests** using either method above
4. **Review results** and address any issues found

---

**Status**: ✅ Ready to test **API Key**: ✅ Configured **Server**: ✅ Running
**Action Required**: Restart Cursor IDE to activate TestSprite MCP
