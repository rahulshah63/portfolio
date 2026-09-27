---
title: What a small Aleo indexer taught me about indexers
description: Starting from what the explorer shows you, parsing Aleo values with a couple of regexes, and the rules I'd keep for any generic indexer.
category: Indexing
date: 2026-09-28T15:00:00Z
illustration: blocks
---

In the middle of 2025 we needed data from a money market on Aleo: reserve state, user positions, the usual things a frontend asks for. On EVM chains I'd reach for Ponder or a subgraph. I wanted something like that for Aleo, so I wrote one. It's open source as [aleo-indexer-service](https://www.npmjs.com/package/aleo-indexer-service) on npm.

## Starting from the explorer

The quickest way to understand a chain's data is to look at it the way the explorer shows it. On Aleo, transition inputs and outputs, and mapping values, come back as strings that look almost like JSON, but aren't:

```
{ owner: aleo1..., amount: 100u64.private, token_id: 5field }
```

Keys aren't quoted, and every value carries its type and visibility. I could have written a proper parser for Aleo's value syntax. Instead I went generic. One regex quotes every bare token, and `JSON.parse` does the rest:

```ts
const json = recordString.replace(/(['"])?([a-z0-9A-Z_.]+)(['"])?/g, '"$2" ');
```

A second pass turns typed literals into real values. `100u64.private` loses its visibility suffix, then `/^(\d+)(u\d+|field)$/` splits the number from its type so it can be converted properly.

It isn't pretty, and it wouldn't survive every corner of the language. But it handled every program we pointed it at, and it meant the indexer never had to know anything about a specific program's structs. That trade was worth it.

## Config, not code

The part I'm happiest with is that you don't write indexing code at all. You describe programs in a config file: which functions to watch, which mappings to track, where each field lives in the RPC response (paths like `transaction.execution.transitions[0].outputs[0].value`), and what type it is. From that, one command generates the Postgres schema, the relations and a GraphQL API with filters, ordering and pagination.

Indexing a new program means editing the config and running `generate` again.

## Rules I'd keep for any indexer

1. **Every write must be safe to repeat.** Indexers crash, retry and reprocess. Raw transactions are inserted with "do nothing on conflict", and mapping state is upserted. One of the fixes in the history is literally "duplicated data on mapping store", which is what happens when one path forgets this.
2. **Order before you apply.** When you rebuild state from events, the order of transactions matters more than anything else. We sort by finalization time before processing a batch.
3. **Checkpoint per source.** Progress is stored per program and function, so one slow or broken function doesn't hold up the others.
4. **Assume the RPC will fail.** Retries with exponential backoff, a cap on pages per cycle, and limited concurrency, so you don't rate-limit yourself.
5. **Keep the raw data.** Every transaction is stored as JSON next to the parsed tables. When you find a parsing bug later, you can re-derive everything without fetching it again.
6. **Let the schema come from config.** The moment people write handler code for each program, the indexer stops being generic.

## What I'd do differently

It indexes by program and function, not by block. That kept it simple, but it means there's no start block and nothing that handles a reorg. For a general tool I'd move to a block cursor from day one. I'd also make retries configurable, and stop hard on a permanent RPC error instead of retrying it forever. Both are still TODOs in the code, and both are the kind of thing you only learn you need after running it for a while.
