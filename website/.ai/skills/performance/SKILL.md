---
id: performance
name: Performance
version: 0.1.0
summary: Measure first, then optimize the actual bottleneck with a reproducible benchmark.
when_to_use:
  - A performance regression is reported
  - A user-facing interaction feels slow
  - Bundle size or memory grows unexpectedly
inputs:
  - A scenario describing "slow"
  - The ability to run it deterministically
outputs:
  - Baseline measurement, bottleneck named, optimized measurement, delta
tools:
  - read
  - search
  - edit
  - shell_read
related_skills:
  - debugging
  - testing
related_rules:
  - rules/engineering.md
---

# Performance

## Purpose

Make informed speed/size trade-offs with evidence, not intuition.

## When to use

- The user perceives slowness.
- A metric (bundle size, memory, latency) regressed.
- A loop, render, or request volume is likely to scale poorly.

## Procedure

1. Define the scenario precisely: input size, environment, what counts as "done".
2. Measure a baseline — at least three runs, report median and spread.
3. Profile to find the actual bottleneck. Do not guess.
4. Apply the smallest optimization that addresses the bottleneck.
5. Re-measure with the same method. Report the delta.
6. Check for regressions elsewhere (correctness, readability, bundle size).

## Quality bar

- [ ] Baseline and post-change measurements use identical methodology.
- [ ] Bottleneck is named with evidence (profile, metric).
- [ ] Optimization is scoped to the bottleneck.
- [ ] No correctness regressions.

## Anti-patterns

- Micro-optimizing without a profile.
- Caching by default instead of when measured.
- Introducing complexity for unmeasured gains.

## References

- [`../../rules/engineering.md`](../../rules/engineering.md)
