# Cursor MCP Configuration

This directory contains MCP (Model Context Protocol) server configurations for Cursor IDE.

## Current Configuration

### TestSprite MCP
- **Status**: ✅ Installed and configured
- **Config File**: `mcp.json`
- **Package**: `@testsprite/testsprite-mcp@latest`
- **API Key**: Set via `TESTSPRITE_API_KEY` environment variable

## Setup

1. **Set API Key** (choose one method):
   - Run `setup_testsprite.ps1` script
   - Or manually set: `[System.Environment]::SetEnvironmentVariable('TESTSPRITE_API_KEY', 'your-key', 'User')`

2. **Restart Cursor IDE**

3. **Verify**: Check MCP servers in Cursor settings

## Usage

Once configured, you can use TestSprite in Cursor chat:
- "Run tests using TestSprite"
- "Test my application"
- "Generate test report"

## Requirements

- ✅ Node.js >= 22 (Current: v22.20.0)
- ✅ TestSprite MCP installed globally
- ✅ API Key configured
- ✅ Local server running on port 8000
