---
title: What a small Aleo indexer taught me about indexers
description: Starting from what the explorer shows you, parsing Aleo values with a couple of regexes, and the rules I'd keep for any generic indexer.
category: Indexing
date: 2026-09-28T15:00:00Z
illustration: blocks
---

In the middle of 2025 we needed data from a money market on Aleo: reserve state, user positions, the usual things a frontend asks for. On EVM chains I'd reach for Ponder or a subgraph. I wanted something like that for Aleo, so I wrote one. It's open source as [aleo-indexer-service](https://www.npmjs.com/package/aleo-indexer-service) on npm.

## Why new chains are always behind on this

On EVM, indexing is mostly a solved problem, and the reason is the ABI. Every contract ships a machine-readable description of its functions and events, so a tool like The Graph can decode logs automatically. You point it at an address and an ABI, and it already knows the shape of everything it will see.

> On a new chain, the tooling is often late, but the need is there from the beginning.

The indexing tools, the hosted services and the conventions tend to arrive a year or two after launch, once the ecosystem is big enough to be worth supporting. The first money market, the first DEX and the first game on a chain all need queryable data before anyone has built the tools to give it to them.

So on a new chain you either wait, or you build something generic enough to work without that tooling. We couldn't wait.

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

<figure class="diagram">
<svg viewBox="0 0 720 340" class="sketch" role="img" aria-label="A config file drives both halves of the indexer. At build time, generate turns it into a Postgres schema and a GraphQL API. At run time, transactions from the Aleo RPC go through a regex parser into Postgres, which the GraphQL API reads." style="--fill-delay: 2200ms">
<g filter="url(#rough)">
<path class="f" d="M168 30 L196 58 H168 Z"/>
<path class="s" d="M34 30 H168 L196 58 V148 Q196 160 184 160 H34 Q22 160 22 148 V42 Q22 30 34 30 Z" pathLength="1" style="--delay: 0ms"/>
<path class="s" d="M168 30 V58 H196" pathLength="1" style="--delay: 100ms"/>
<path class="s" d="M284 40 H436 Q450 40 450 54 V136 Q450 150 436 150 H284 Q270 150 270 136 V54 Q270 40 284 40 Z" pathLength="1" style="--delay: 200ms"/>
<path class="s" d="M534 40 H686 Q700 40 700 54 V136 Q700 150 686 150 H534 Q520 150 520 136 V54 Q520 40 534 40 Z" pathLength="1" style="--delay: 300ms"/>
<path class="s" d="M36 220 H182 Q196 220 196 234 V306 Q196 320 182 320 H36 Q22 320 22 306 V234 Q22 220 36 220 Z" pathLength="1" style="--delay: 400ms"/>
<path class="s" d="M284 220 H436 Q450 220 450 234 V306 Q450 320 436 320 H284 Q270 320 270 306 V234 Q270 220 284 220 Z" pathLength="1" style="--delay: 500ms"/>
<path class="s" d="M534 220 H686 Q700 220 700 234 V306 Q700 320 686 320 H534 Q520 320 520 306 V234 Q520 220 534 220 Z" pathLength="1" style="--delay: 600ms"/>
<path class="s" d="M198 95 H264" pathLength="1" style="--delay: 700ms"/>
<path class="s" d="M254 87 L266 95 L254 103" pathLength="1" style="--delay: 800ms"/>
<path class="s" d="M452 95 H514" pathLength="1" style="--delay: 900ms"/>
<path class="s" d="M504 87 L516 95 L504 103" pathLength="1" style="--delay: 1000ms"/>
<path class="s" d="M198 270 H264" pathLength="1" style="--delay: 1100ms"/>
<path class="s" d="M254 262 L266 270 L254 278" pathLength="1" style="--delay: 1200ms"/>
<path class="s" d="M452 270 H514" pathLength="1" style="--delay: 1300ms"/>
<path class="s" d="M504 262 L516 270 L504 278" pathLength="1" style="--delay: 1400ms"/>
<path class="s" d="M610 218 V156" pathLength="1" style="--delay: 1500ms"/>
<path class="s" d="M602 166 L610 154 L618 166" pathLength="1" style="--delay: 1600ms"/>
<path class="s" d="M110 162 C110 196 360 180 360 214" pathLength="1" style="--delay: 1700ms"/>
<path class="s" d="M350 205 L360 216 L369 204" pathLength="1" style="--delay: 1800ms"/>
</g>
<text x="109" y="82" text-anchor="middle" class="strong">indexer.config.ts</text>
<text x="109" y="106" text-anchor="middle">programs, functions,</text>
<text x="109" y="124" text-anchor="middle">mappings, field paths</text>
<text x="360" y="84" text-anchor="middle" class="strong">Postgres schema</text>
<text x="360" y="108" text-anchor="middle">one table per function</text>
<text x="360" y="126" text-anchor="middle">and per mapping</text>
<text x="610" y="84" text-anchor="middle" class="strong">GraphQL API</text>
<text x="610" y="108" text-anchor="middle">filters, ordering,</text>
<text x="610" y="126" text-anchor="middle">pagination</text>
<text x="109" y="262" text-anchor="middle" class="strong">Aleo RPC</text>
<text x="109" y="286" text-anchor="middle">transactions and</text>
<text x="109" y="304" text-anchor="middle">mapping values</text>
<text x="360" y="262" text-anchor="middle" class="strong">Parser</text>
<text x="360" y="286" text-anchor="middle">regex to JSON, then</text>
<text x="360" y="304" text-anchor="middle">typed literals</text>
<text x="610" y="262" text-anchor="middle" class="strong">Postgres</text>
<text x="610" y="286" text-anchor="middle">idempotent writes,</text>
<text x="610" y="304" text-anchor="middle">raw JSON kept</text>
<text x="231" y="84" text-anchor="middle">generate</text>
<text x="231" y="258" text-anchor="middle">poll</text>
</svg>
<figcaption>One config file drives both halves: what gets generated, and what the parser looks for.</figcaption>
</figure>

## Rules I'd keep for any indexer

1. **Every write must be safe to repeat.** Indexers crash, retry and reprocess. Raw transactions are inserted with "do nothing on conflict", and mapping state is upserted. One of the fixes in the history is literally "duplicated data on mapping store", which is what happens when one path forgets this.
2. **Order before you apply.** When you rebuild state from events, the order of transactions matters more than anything else. We sort by finalization time before processing a batch.
3. **Checkpoint per source.** Progress is stored per program and function, so one slow or broken function doesn't hold up the others.
4. **Assume the RPC will fail.** Retries with exponential backoff, a cap on pages per cycle, and limited concurrency, so you don't rate-limit yourself.
5. **Keep the raw data.** Every transaction is stored as JSON next to the parsed tables. When you find a parsing bug later, you can re-derive everything without fetching it again.
6. **Let the schema come from config.** The moment people write handler code for each program, the indexer stops being generic.
