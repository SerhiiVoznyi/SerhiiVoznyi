---
title: Serverless .NET on AWS and the cold-start tax
slug: serverless-dotnet-cold-starts
date: 2026-10-12
summary: Where cold starts actually come from in .NET Lambda functions, and the order I reach for fixes — from cheap configuration to Native AOT.
tags: [aws, dotnet, serverless]
cover: /assets/art/server-hall.webp
---

Cold starts are the first objection anyone raises about .NET on Lambda. They are real, but they are also the most over-optimized problem I see. Most teams reach for the expensive fix before measuring which part of the start is slow.

## Where the time goes

A cold invocation pays for three things in sequence:

- **Init of the runtime** — the managed runtime boots and loads your assemblies.
- **Init of your code** — dependency injection, configuration, SDK clients, connection pools.
- **The first request** — JIT compiling every hot path for the first time.

The second item is the one you control most directly, and it is usually the biggest.

## Fixes, cheapest first

| Fix                          | Effort              | Typical gain |
| ---------------------------- | ------------------- | ------------ |
| More memory (more CPU)       | Config change       | Large        |
| Lazy SDK clients, trimmed DI | Small refactor      | Medium       |
| ReadyToRun compilation       | Build flag          | Medium       |
| SnapStart                    | Config plus testing | Large        |
| Native AOT                   | Real engineering    | Largest      |

Memory is the lever people forget: Lambda allocates CPU proportionally, so doubling memory often halves init time and costs less than you expect, because you also pay for fewer milliseconds.

## Native AOT is a design decision

Native AOT removes JIT entirely and gives the best cold starts .NET can offer. It also removes runtime reflection, which means source-generated serialization, no dynamic proxies, and auditing every dependency.

```csharp
[JsonSerializable(typeof(OrderRequest))]
[JsonSerializable(typeof(OrderResponse))]
internal partial class LambdaJsonContext : JsonSerializerContext;
```

That trade is worth it for latency-sensitive, synchronous APIs. For queue consumers and scheduled jobs, it rarely is — nobody is waiting on that first invocation. Measure first, then decide per function, not per platform.
