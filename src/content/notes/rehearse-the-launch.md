---
title: Rehearse the launch you can't move
description: Launching a DEX on the day Story's mainnet went live, and why we ran the launch several times before doing it for real.
category: Shipping
date: 2026-09-28T12:00:00Z
illustration: swap
---

Most launches have some give. If something breaks, you move the date and tell people. Storyhunt didn't have that. We were building a DEX on Story, backed by Story Foundation, and Story's mainnet and its IP token went live on 13 February 2025. People would arrive with new tokens and expect to trade them that day. The date belonged to the foundation and to everyone launching with it, not to us.

When the date isn't yours, the only thing you control is how ready you are. So we launched several times before we launched.

## A copy of production we were allowed to break

We ran a mainnet test environment next to production: same code, same configuration, its own deployment. In the repo it shows up as a `story-mainnet-test` branch that got merged into the production branch and back, again and again, over the ten days around launch. Each round was a full rehearsal.

A rehearsal meant doing the real steps in the real order:

- deploy the contracts
- create the first pools and initialize them with their starting prices
- point the frontend, subgraph and backend at the new addresses
- make real swaps and add real liquidity from real wallets
- time all of it, and agree on who does what, and when

## Pool initialization is the step you can't undo

In a Uniswap v3-style DEX, a pool's first price is written once, when the pool is initialized, as `sqrtPriceX96`. If that number is wrong, the first person to notice trades against it, and the liquidity you seeded pays for the mistake. There's no edit button.

One detail makes it easy to get wrong. A pool orders its two tokens by address. If a token's address sorts below WIP, the wrapped IP token, it becomes `token0` and the price has to be inverted. We hit exactly this with new pools a few days after launch. Because the test environment was still running, we could reproduce it, fix it and check the fix on a copy of mainnet before touching production.

## The team is part of the system

The code was maybe half of it. The other half was people. On launch day the whole team was in sync: contracts, backend, indexing, frontend, and whoever was talking to the foundation. Every rehearsal made the handoffs shorter, until the real launch felt like one more run.

The same setup carried the next launch too. When farming moved to a new contract a week later, it went through the same test branch first.

## If you're launching into someone else's ecosystem

- If a foundation or a chain owns the date, assume it won't move, and plan backwards from it.
- Build a copy of production you're allowed to break, and keep it after launch.
- Rehearse the irreversible steps most: deployments, pool initialization, anything that sets a price.
- Rehearse the people, not just the scripts. The timing between teams fails more often than the code does.
- Remember that your launch is part of theirs. A broken DEX on day one makes the whole ecosystem look worse.
