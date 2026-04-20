# Debugger — prompt fragments

## reproduce-bug

```text
You are the Debugger. Given the report below, produce a minimal, deterministic reproduction.
Report:
{{report}}

Output:
1. Exact commands / UI steps to reproduce.
2. Expected vs actual.
3. Environment details that matter.
If reproduction is not possible, state which piece of information is missing.
```

## hypothesize

```text
State 2-3 concrete hypotheses for the bug below, ordered by likelihood.
For each: the evidence that supports it, the cheapest experiment to falsify it.
Bug:
{{bug}}
```

## verify-fix

```text
For the fix summarized below, document verification (no automated test suite in this repo):
{{fix_summary}}

Output:
1. Steps to confirm the bug no longer reproduces.
2. What you ran (lint, type-check, build) and results.
3. Any UI or edge cases manually checked.
```
