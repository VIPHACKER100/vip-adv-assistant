#!/usr/bin/env python3
"""
TestSprite Test Runner
Runs all test cases for VIP AI Assistant
"""

import asyncio
import sys
import os
import subprocess
from pathlib import Path

# Add tests directory to path
test_dir = Path(__file__).parent
sys.path.insert(0, str(test_dir))

async def run_test_file(test_file):
    """Run a single test file"""
    try:
        print(f"\n{'='*60}")
        print(f"Running: {test_file.name}")
        print(f"{'='*60}")
        
        # Since test files call asyncio.run() themselves, run them in subprocess
        result = subprocess.run(
            [sys.executable, str(test_file)],
            capture_output=True,
            text=True,
            timeout=120,
            cwd=test_file.parent
        )
        
        # Print test output
        if result.stdout:
            print(result.stdout)
        if result.stderr and result.returncode != 0:
            print(result.stderr, file=sys.stderr)
        
        if result.returncode == 0:
            print(f"[PASS] {test_file.name}")
            return True
        else:
            print(f"[FAIL] {test_file.name} - Exit code: {result.returncode}")
            return False
            
    except subprocess.TimeoutExpired:
        print(f"[TIMEOUT] {test_file.name} - Test exceeded 120 second timeout")
        return False
    except Exception as e:
        print(f"[ERROR] {test_file.name} - {e}")
        return False

async def main():
    """Run all test files"""
    test_dir = Path(__file__).parent
    test_files = sorted(test_dir.glob("TC*.py"))
    
    if not test_files:
        print("No test files found!")
        return
    
    print(f"\nTestSprite Test Runner")
    print(f"Found {len(test_files)} test files\n")
    
    results = []
    for test_file in test_files:
        result = await run_test_file(test_file)
        results.append((test_file.name, result))
    
    # Summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}")
    
    passed = sum(1 for _, result in results if result)
    failed = len(results) - passed
    
    for name, result in results:
        status = "[PASS]" if result else "[FAIL]"
        print(f"{status}: {name}")
    
    print(f"\nTotal: {len(results)} | Passed: {passed} | Failed: {failed}")
    print(f"Pass Rate: {(passed/len(results)*100):.1f}%")
    
    sys.exit(0 if failed == 0 else 1)

if __name__ == "__main__":
    asyncio.run(main())
