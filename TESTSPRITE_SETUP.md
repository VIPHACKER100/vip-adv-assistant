# TestSprite MCP Setup Guide

## ✅ Installation Complete

TestSprite MCP has been installed globally. Now you need to configure it with
your API key.

## 🔑 Getting Your TestSprite API Key

1. **Sign up/Login** to TestSprite:
   - Visit: https://testsprite.com
   - Create an account or login

2. **Get Your API Key**:
   - Navigate to your account settings
   - Find the API Key section
   - Copy your API key

## ⚙️ Configuration Steps

### Option 1: Environment Variable (Recommended)

1. **Windows (PowerShell)**:

   ```powershell
   [System.Environment]::SetEnvironmentVariable('TESTSPRITE_API_KEY', 'your-api-key-here', 'User')
   ```

2. **Windows (Command Prompt)**:

   ```cmd
   setx TESTSPRITE_API_KEY "your-api-key-here"
   ```

3. **Restart Cursor IDE** after setting the environment variable

### Option 2: Direct Configuration

Edit `.cursor/mcp.json` and replace `${TESTSPRITE_API_KEY}` with your actual API
key:

```json
{
  "mcpServers": {
    "testsprite": {
      "command": "npx",
      "args": ["-y", "@testsprite/testsprite-mcp@latest"],
      "env": {
        "TESTSPRITE_API_KEY": "your-actual-api-key-here"
      }
    }
  }
}
```

## 🚀 Using TestSprite MCP

Once configured, you can use TestSprite in Cursor by:

1. **Starting your app**:

   ```bash
   python -m http.server 8000
   ```

2. **In Cursor chat**, use commands like:
   - "Run tests using TestSprite"
   - "Test my application with TestSprite"
   - "Generate test report"

3. **TestSprite will**:
   - Analyze your project
   - Run existing tests in `testsprite_tests/`
   - Generate comprehensive test reports
   - Provide detailed results

## 📋 Existing Test Files

Your project already has test files in `testsprite_tests/`:

- 14 test cases covering all major features
- Test plan: `testsprite_frontend_test_plan.json`
- Previous report: `testsprite-mcp-test-report.md`

## 🔍 Verification

To verify TestSprite MCP is working:

1. Restart Cursor IDE
2. Open the MCP panel (if available)
3. Check that "testsprite" server is listed
4. Try asking: "Run tests using TestSprite"

## 📚 Resources

- TestSprite Docs: https://docs.testsprite.com
- MCP Documentation: https://cursor.com/docs/context/mcp
- Test Plan: `testsprite_tests/testsprite_frontend_test_plan.json`

## 🐛 Troubleshooting

**Issue**: TestSprite not appearing in Cursor

- **Solution**: Restart Cursor IDE after setting environment variable

**Issue**: API Key not working

- **Solution**: Verify API key is correct and account is active

**Issue**: Tests not running

- **Solution**: Ensure local server is running on port 8000

**Issue**: MCP server connection failed

- **Solution**: Check Node.js version (requires >= 22) and npm installation

## 📝 Next Steps

1. Get your TestSprite API key
2. Set it as environment variable or in `.cursor/mcp.json`
3. Restart Cursor IDE
4. Start your app: `python -m http.server 8000`
5. Ask Cursor: "Run tests using TestSprite"

---

**Status**: ✅ TestSprite MCP installed **Configuration**: ✅ `.cursor/mcp.json`
created **Next**: Set your API key and restart Cursor para v5.0.0
