---
title: Strangling the monolith without stopping the city
slug: strangling-the-monolith
date: 2026-11-06
summary: Legacy modernization is a traffic problem, not a rewrite problem. Notes on moving a live .NET platform to services one route at a time.
tags: [architecture, dotnet, modernization]
cover: /assets/art/city-plate-night.webp
---

Every legacy platform I have worked on had the same property: it was making money while everyone complained about it. That is the constraint that shapes modernization. You do not get to stop the city to rebuild the roads.

## Start at the edge, not the core

The strangler fig pattern works because it moves the decision point to the edge of the system. Put a routing layer in front of the monolith first — a reverse proxy, an API gateway, YARP inside an ASP.NET Core host — and make it boring. It should forward every request unchanged.

Only once that layer has run in production for a while do you start carving:

1. Pick a route with clear ownership and low coupling.
2. Build the new service behind the same contract.
3. Shift a percentage of traffic, compare responses, then cut over.
4. Delete the old code path. This step is the one teams skip.

> A migration that never deletes anything is not a migration. It is a second system you now have to run.

## Data is the real monolith

Splitting code is the easy half. The hard half is the shared database that six modules quietly write to. Before extracting a service, map who writes which tables. If two modules write the same rows, you have found a domain boundary that does not exist yet — and you need to design it before you move anything.

A pattern that has held up for me:

```csharp
public sealed class OrderPlacedHandler(IOutbox outbox) : INotificationHandler<OrderPlaced>
{
    public Task Handle(OrderPlaced e, CancellationToken ct) =>
        outbox.Enqueue(new OrderPlacedV1(e.OrderId, e.Total, e.PlacedAt), ct);
}
```

The monolith keeps owning the write, but publishes an integration event through an outbox in the same transaction. The new service builds its own read model from those events. Ownership moves later, once the new side has proven it can keep up.

## Measure the boring things

Track three numbers through the whole migration: error rate per route, p95 latency per route, and the count of lines still served by the legacy path. The first two keep you honest. The third keeps you moving.
