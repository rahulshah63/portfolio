---
title: Your keys, our schedule
description: Why I think smart wallets are underrated, and how Elitra runs your recurring buys without ever holding your money.
category: Smart wallets
date: 2026-09-28T18:00:00Z
illustration: chart
---

For a long time, "automated" in crypto meant one of two things. Either you handed your funds to a platform and trusted it, or you signed every transaction yourself. The first is custody with extra steps. The second isn't automation.

Smart accounts are a third option, and I don't think most people have noticed how big that is.

## What a smart account changes

A normal wallet is one key that can do anything. A smart account, like ZeroDev's Kernel, is a contract that decides who is allowed to do what. Your key stays the owner. But you can install extra validators on the account, like a second key that may only call certain contracts, with certain functions, up to certain amounts.

That second key is a session key, and the rules around it are policies. The account checks every transaction against them. If the session key tries anything outside the rules, the transaction simply fails.

## How Elitra uses it

Elitra's recurring buys, which we call AutoBuy, are built on this:

1. You get a Kernel smart account. Its owner is your own embedded wallet, which signs in your browser.
2. When you set up a plan, our server creates a fresh session key for it. In your browser, you sign a permission that lets only that key act, and only inside the plan's policy.
3. On schedule, our worker uses the session key to send the buy as a user operation. Your account checks it against the policy, runs the swap, and the tokens land back in your account.
4. When you stop the plan, you sign one more transaction that uninstalls the permission. From that moment the session key can't do anything.

<figure class="diagram">
<svg viewBox="0 0 720 360" class="sketch" role="img" aria-label="Your wallet owns the smart account and signs the permission. Elitra's worker holds only a session key, which the smart account checks against the permission before swapping through the DEX router and sending tokens back to your account." style="--fill-delay: 1840ms">
<g filter="url(#rough)">
<path class="f" d="M429 124 H451 V142 H429 Z"/>
<path class="s" d="M34 40 H166 Q180 40 180 54 V116 Q180 130 166 130 H34 Q20 130 20 116 V54 Q20 40 34 40 Z" pathLength="1" style="--delay: 0ms"/>
<path class="s" d="M264 30 H476 Q490 30 490 44 V316 Q490 330 476 330 H264 Q250 330 250 316 V44 Q250 30 264 30 Z" pathLength="1" style="--delay: 110ms"/>
<path class="s" d="M280 108 H460 Q470 108 470 118 V302 Q470 312 460 312 H280 Q270 312 270 302 V118 Q270 108 280 108 Z" pathLength="1" style="--delay: 220ms"/>
<path class="s" d="M574 40 H686 Q700 40 700 54 V116 Q700 130 686 130 H574 Q560 130 560 116 V54 Q560 40 574 40 Z" pathLength="1" style="--delay: 330ms"/>
<path class="s" d="M574 240 H686 Q700 240 700 254 V316 Q700 330 686 330 H574 Q560 330 560 316 V254 Q560 240 574 240 Z" pathLength="1" style="--delay: 440ms"/>
<path class="s" d="M182 85 H246" pathLength="1" style="--delay: 550ms"/>
<path class="s" d="M236 77 L248 85 L236 93" pathLength="1" style="--delay: 660ms"/>
<path class="s" d="M558 85 H494" pathLength="1" style="--delay: 770ms"/>
<path class="s" d="M504 77 L492 85 L504 93" pathLength="1" style="--delay: 880ms"/>
<path class="s" d="M492 270 H556" pathLength="1" style="--delay: 990ms"/>
<path class="s" d="M546 262 L558 270 L546 278" pathLength="1" style="--delay: 1100ms"/>
<path class="s" d="M558 305 H494" pathLength="1" style="--delay: 1210ms"/>
<path class="s" d="M504 297 L492 305 L504 313" pathLength="1" style="--delay: 1320ms"/>
<path class="s" d="M433 124 V117 Q440 107 447 117 V124" pathLength="1" style="--delay: 1430ms"/>
</g>
<text x="100" y="76" text-anchor="middle" class="strong">You</text>
<text x="100" y="100" text-anchor="middle">owner key, in your</text>
<text x="100" y="118" text-anchor="middle">browser; can revoke</text>
<text x="370" y="60" text-anchor="middle" class="strong">Your smart account</text>
<text x="370" y="84" text-anchor="middle">holds your funds</text>
<text x="370" y="142" text-anchor="middle" class="strong">Permission</text>
<text x="370" y="178" text-anchor="middle">USDC approve, capped</text>
<text x="370" y="206" text-anchor="middle">fee only to treasury</text>
<text x="370" y="234" text-anchor="middle">swap listed tokens only</text>
<text x="370" y="262" text-anchor="middle">output back to you</text>
<text x="370" y="290" text-anchor="middle">you can revoke it</text>
<text x="630" y="76" text-anchor="middle" class="strong">Elitra worker</text>
<text x="630" y="100" text-anchor="middle">runs your schedule</text>
<text x="630" y="118" text-anchor="middle">holds a session key</text>
<text x="630" y="280" text-anchor="middle" class="strong">DEX router</text>
<text x="630" y="304" text-anchor="middle">swaps USDC</text>
</svg>
<figcaption>Elitra can act inside the permission you signed. It can never move your money anywhere else.</figcaption>
</figure>

The policy is where it gets concrete. For a buy, the session key may:

- approve USDC to one spender, up to a cap
- send a fee only to our treasury, up to the fee amount
- call the router's swap only for tokens on an allowlist, only with your account as the recipient, and only up to the amount you set

That last rule is the one I like most. Even if someone stole the session key, the most it could do is buy an allowed token with a capped amount of your money and send it to you.

Some routes go through LI.FI, and those didn't fit neatly into a call policy. For them the limits live in an on-chain hook instead: a maximum spend per trade, a cooldown, a budget per time window and an expiry date. The comment at the top of that contract sums up its job: it "can only ever cause a userOp to revert."

## What we do hold

I want to be precise here, because "non-custodial" gets thrown around a lot. We do hold something: the session key, encrypted, on our servers. We have to, or nothing could run at 3am on a Tuesday. What we never hold is your owner key or your funds. Your money sits in your account the whole time, and our key can only follow the rules you signed.

That's the distinction I care about. Custody is about who can move your money anywhere. A permission is about who can do one specific thing. Smart accounts let you give the second without giving the first, and that's the unlock. Once it clicks, a lot of products that used to need "trust us" don't anymore.

## Where this goes

Recurring buys are the obvious first use. The same pattern works for rebalancing, stop losses, subscriptions, or an AI agent that can trade for you but only inside limits you can read. The hard part isn't the cryptography anymore. It's writing policies that are strict enough to be safe and loose enough to be useful, and showing them to people in a way they understand before they sign.

That's the part I find most interesting right now.
