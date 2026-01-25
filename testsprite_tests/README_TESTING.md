# TestSprite Test Suite

## Overview
This directory contains automated test cases for the VIP AI Assistant using Playwright and TestSprite.

## Prerequisites

1. **Python 3.7+** installed
2. **Playwright** installed:
   ```bash
   pip install playwright
   playwright install chromium
   ```

3. **Local Server Running**:
   ```bash
   # From project root
   python -m http.server 8000
   ```

## Running Tests

### Run All Tests
```bash
python run_all_tests.py
```

### Run Individual Test
```bash
python TC003_Keyboard_shortcut_default_behaviors.py
```

## Test Cases

- **TC001**: Execute each of the 65+ simulated functions
- **TC002**: Voice command recognition and execution
- **TC003**: Keyboard shortcut default behaviors ✅
- **TC004**: Custom keyboard shortcuts editing
- **TC005**: Fuzzy search functionality
- **TC006**: Favorites system
- **TC007**: Theme manager
- **TC008**: Export and import backup
- **TC009**: Performance monitor
- **TC010**: Recent functions history
- **TC011**: Real device monitoring panel
- **TC012**: Automation builder
- **TC013**: Offline PWA support
- **TC014**: No critical errors or console warnings

## Test Results

Previous test run results are available in:
- `testsprite-mcp-test-report.md` - Markdown report
- `testsprite-mcp-test-report.html` - HTML report

## Notes

- Tests require the app to be running on `http://localhost:8000`
- Some tests may fail in headless environments (e.g., voice commands require microphone access)
- UI interaction tests may be affected by CSS glassmorphism effects in test runners
