
## Price column — equal width

Reported alongside the button alignment: the price gutters read as ragged.

**Cause.** `.priceCol` sized itself to its content, so it ranged from 33px
("From $1/IP") to 64px ("As low as $0.50/GB"). The divider sits immediately
before that column, so the rule landed at a different x in every card —
offsets spread from 275 to 306.

**Fix.** Pin `.priceCol` to 64px, the widest real content. Every divider now
sits at the same offset and the labels centre in a consistent column.

| | Before | After |
| --- | --- | --- |
| Column widths | 33–64px (7 distinct) | 64px (all nine) |
| Divider offsets | 275–306 | 275 (274 in the third group) |

The 1px in the third group is sub-pixel grid rounding — its column computes to
332.x against 333 — not a layout difference. "Get Custom Pricing" has no price
and so no divider, matching live.
