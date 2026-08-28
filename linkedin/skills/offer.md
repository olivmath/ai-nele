---
name: offer
description: >-
  Build or audit product offers. Two modes: BUILD constructs an offer from scratch
  (value equation, anatomy, bonus stack, guarantee, scarcity, naming, pricing).
  AUDIT scores an existing offer against Hormozi's $100M Offers framework (value
  equation 1-10, Grand Slam components). Use when the user wants to create, improve,
  evaluate, or score an offer, pricing page, or sales pitch. Triggers on: "offer",
  "build an offer", "grand slam offer", "irresistible offer", "value stack", "bonus
  stack", "guarantee", "risk reversal", "scarcity", "score this offer", "why isn't
  my offer converting".
metadata:
  version: 2.0.0
---

# Offer Design & Audit

Two modes — **BUILD** constructs an offer from scratch, **AUDIT** scores an existing one. Both use the same value equation and anatomy.

## Before Starting

If `.agents/product-marketing.md` or `.claude/product-marketing.md` exists, read it first. Only ask for info not already covered.

---

## The Value Equation

```
              Dream Outcome  ×  Perceived Likelihood of Achievement
  Value  =  ─────────────────────────────────────────────────────────
              Time Delay     ×   Effort & Sacrifice
```

| Lever | What it means | How to increase value |
|---|---|---|
| **Dream outcome** ↑ | What the customer actually wants | Connect to the bigger goal. Specify and name it. |
| **Perceived likelihood** ↑ | Do they believe they'll get it | Proof, guarantees, methodology specificity |
| **Time delay** ↓ | How long until result | Faster onboarding, faster first win |
| **Effort & sacrifice** ↓ | What it costs them besides money | Done-for-you, simpler process, fewer decisions |

Most "lower the price" requests are actually "raise the numerator or lower the denominator" requests.

---

## Offer Anatomy (6 Components)

| # | Component | Question it answers |
|---|---|---|
| 1 | **Core deliverable** | What do they get? |
| 2 | **Bonus stack** | What else makes the core feel undervalued? |
| 3 | **Guarantee** | What happens if it doesn't work? |
| 4 | **Scarcity / urgency** | Why now, not later? |
| 5 | **Name** | What is this thing called? |
| 6 | **Price + payment structure** | What do they pay and how? |

Most weak offers fail on bonuses (none), guarantees (none), or scarcity (none/fake).

---

# MODE: BUILD

Use when constructing or improving an offer.

## Diagnostic Loop

1. **Identify business type** — service, course, coaching, info product, SaaS, agency, B2B
2. **State current offer in plain language** — name, price, what they get, guarantee, deadline
3. **Run the value equation** — score each lever 1-10. The lowest is the binding constraint.
4. **Audit the anatomy** — which of the 6 components is missing or weak?
5. **Pick one lever to fix this iteration** — don't rebuild everything
6. **Draft the changed component** — new bonus, guarantee, scarcity, name, payment plan
7. **Project the lift honestly** — most single-component changes deliver 10-40% lift

## Build Output

```
# Offer — [Name]

## ICP / Avatar
[Specific audience]

## Value Equation Assessment
| Lever | Current (1-10) | Target | Change |
|---|---|---|---|

## Offer Anatomy
| Component | Status | Detail |
|---|---|---|
| Core deliverable | ... | ... |
| Bonus stack | ... | ... |
| Guarantee | ... | ... |
| Scarcity/urgency | ... | ... |
| Name | ... | ... |
| Price + payment | ... | ... |

## Complete Offer (final draft)
[The constructed offer, specific, quantified, time-bound, risk-reversed, named]
```

---

# MODE: AUDIT

Use when scoring/grading an existing offer (landing page, pitch, pricing page).

## What to Read

1. Landing page / sales page — headline, subheadline, CTA, hero copy
2. Pricing page — tiers, prices, feature bullets
3. Guarantee, refund policy, terms
4. Bonuses, what's included
5. Time-bound elements — launch pricing, cohort deadlines
6. Testimonials and outcome claims

## Scoring

### Value Equation (1-10 per lever)

| Score | Meaning |
|---|---|
| 10 | Quantified, vivid, named outcome |
| 5 | Generic but real |
| 1 | Abstract / aspirational |

### Grand Slam Components

Mark each as **Present / Weak / Absent** with evidence:

- **Naming** — contains its promise? ("12-Week Sleep Reset" > "Premium Plan")
- **Bonuses** — itemized, each with dollar value, tied to objection?
- **Guarantee** — risk reversed unexpectedly?
- **Scarcity** — real constraint (cohort, seats, deadline)?
- **Urgency** — real reason to act now?
- **Price anchor** — contrasted against value stack or cost of inaction?

## Audit Output

```
# $100M Offers Audit — [Offer Name]

## Offer in Scope
- Pages reviewed: [list]
- Headline (verbatim): "[quote]"
- Price(s): [quote]
- ICP (verbatim or "not stated"): [quote]

## Value Equation Scores
| Lever | Score (1-10) | Evidence | Fix |
|---|---|---|---|
| Dream Outcome | X | "[quote]" | [specific change] |
| Perceived Likelihood | X | "[quote]" | [specific change] |
| Time Delay | X | "[quote]" | [specific change] |
| Effort & Sacrifice | X | "[quote]" | [specific change] |

Total: X/40

## Grand Slam Components
| Component | Status | Evidence | Fix |
|---|---|---|---|
| Naming | P/W/A | "[quote]" | [fix] |
| Bonuses | P/W/A | "[quote]" | [fix] |
| Guarantee | P/W/A | "[quote]" | [fix] |
| Scarcity | P/W/A | "[quote]" | [fix] |
| Urgency | P/W/A | "[quote]" | [fix] |
| Price anchor | P/W/A | "[quote]" | [fix] |

## Weakest Link
[Single component with highest leverage. 2-3 sentences why.]

## Rewritten Offer (~150 words)
[As Hormozi would write it. Only real features, no invention.]

## One 7-Day Test
- Audience: [specific]
- Channel: [specific]
- Binary metric: [specific]
- Sample size: [number]
- Decision rule: [threshold]
```

---

## Hard Rules

- Do not flatter. If it's 12/40, say 12/40.
- Do not invent features, bonuses, or guarantees not actually built.
- Do not recommend "raise the price" unless every lever is already 8+/10.
- Do not pad with theory. Stay on the specific offer.
- Specificity beats superlatives. Use numbers, names, concrete outcomes.

## Banned Vocabulary

"Game-changing", "revolutionary", "disruptive", "next-level", "10x", "secret", "hidden", "limited time" (without actual limit), "worth $X" (without comparable), "100% guaranteed" (without conditions).

## When NOT to Use Offer Tactics

- **Fake scarcity** — countdown timers, "only 3 spots" lies → trust collapse
- **Over-promising guarantees** — refund risk eats margin
- **Bonus inflation** — $50K of "bonuses" on $497 product → sophisticated buyers see through
- **Discounting to acquire** — discount-askers churn at ~2x rate

## Related Skills

- `landing-page-copy` — page that presents the offer
- `cro-methodology` — optimizing the conversion path
- `landing-page-generator` — structure and build of the LP
- `landing-page-design` — visual system for the LP
