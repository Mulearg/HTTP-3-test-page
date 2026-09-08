# HTTP/3 landing page — content v2

Source: https://docs.rayobyte.com/proxies/ (Protocols, Feature availability, Entry points).
Docs last updated 21–23 Aug 2026. Pricing section removed per request.

---

## Two corrections the docs force

**1. "It is a flag, not a migration" is false — and it is currently the page's biggest claim.**

The page says you add `--http3` to a curl command and you are done. The docs say the
opposite, in as many words:

> "SOCKS5 UDP, HTTP/3 and STUN all run over SOCKS5 UDP ASSOCIATE (RFC 1928 command 0x03).
> **curl cannot drive any of them, so these need real code.**"

HTTP/3 is not a transport you switch on at the gateway. It is tunnelled inside SOCKS5
UDP, and the client has to drive a QUIC connection itself — install `aioquic`, wrap every
outbound QUIC packet in a SOCKS5 UDP header, unwrap every inbound one. That section has to
be rewritten, not tweaked.

**2. HTTP/3 is Residential-only.**

| Protocol | Residential | Rotating ISP | Rotating DC |
|---|---|---|---|
| HTTP & HTTPS | ✓ | ✓ | ✓ |
| SOCKS5 | ✓ | — | — |
| SOCKS5 UDP | ✓ | — | — |
| **HTTP/3 (QUIC)** | **✓** | **—** | **—** |
| STUN | ✓ | — | — |

The old pricing section advertised "HTTP/3 included" on Residential, Rotating ISP **and**
Mobile. Two of those three were wrong. Removing pricing fixes it, but the availability
fact should be stated positively somewhere on the page.

---

## Section plan

Removed: **Pricing**. Everything else is kept, corrected, or added.

| # | Section | Status |
|---|---|---|
| 1 | Nav | keep (matches live site) |
| 2 | Hero | revise |
| 3 | Stat band | revise — one stat swapped |
| 4 | Why HTTP/3 | keep (protocol facts still hold) |
| 5 | What changes on the wire | keep |
| 6 | **Protocols & ports** | **new** |
| 7 | How you actually connect | **replaces "It is a flag"** |
| 8 | **Where it runs** (availability + entry points) | **new** |
| 9 | **Traps** | **new** |
| 10 | Proof + use cases | keep |
| 11 | Closing CTA | revise |
| 12 | Footer | keep (matches live site) |

---

## 2 · Hero

**Eyebrow:** HTTP/3 IS LIVE ON RESIDENTIAL

**Headline:** HTTP/3 over QUIC, across 40M+ residential IPs

**Subhead:** Tunnelled through SOCKS5 UDP on the same gateway, the same port and the same
credentials you already use. No separate account, no per-protocol pricing, and targeting
behaves exactly as it does on HTTP.

**Primary CTA:** Start now  ·  **Secondary:** Read the protocol docs

**Trust line:** Available on Residential. Rotating ISP and Rotating DC are HTTP and HTTPS only.

> Changed from "HTTP/3 proxies, across 40M+ residential IPs". The old line implied the whole
> network speaks HTTP/3. It does not.

---

## 3 · Stat band

| Value | Label |
|---|---|
| 40M+ | residential IPs |
| 2 | live entry points, 2 more coming |
| 6 | protocols, one credential set |
| 10+ yrs | running proxy infrastructure |

> Swaps "400K+ static IPs" and "20+ PB processed monthly" — neither says anything about
> HTTP/3, and static IPs cannot run it at all. The two replacements are doc-sourced.

---

## 4 · Why HTTP/3 — unchanged

The three mechanism cards are properties of QUIC itself and remain accurate:
no head-of-line blocking · 0‑RTT session resumption · connections survive a network change.

---

## 5 · What changes on the wire — unchanged

The HTTP/1.1 vs HTTP/2 vs HTTP/3 table is generic protocol education and still correct.
`[YOUR BENCHMARK NUMBERS]` stays a placeholder — the docs publish no performance figures.

---

## 6 · Protocols & ports  (NEW)

**Heading:** One credential set, six protocols

**Body:** There are no separate accounts and no per-protocol pricing. Targeting behaves
identically on all of them.

| Protocol | Port | Notes |
|---|---|---|
| HTTP | 8000 | |
| HTTPS | 8000 | via CONNECT |
| SOCKS5 | 1080 | including CONNECT to any port |
| SOCKS5 UDP | 1080 | via UDP ASSOCIATE |
| **HTTP/3 (QUIC)** | **1080** | over SOCKS5 UDP ASSOCIATE |
| STUN | 1080 | over SOCKS5 UDP ASSOCIATE |

**Footnote:** SOCKS5 carries no headers, so targeting options go on the password:
`PASSWORD-country-US`.

---

## 7 · How you actually connect  (REPLACES "It is a flag, not a migration")

**Eyebrow:** WHAT IT TAKES

**Heading:** It needs real code, not a flag

**Body:** HTTP/3 rides inside SOCKS5 UDP ASSOCIATE, so there is no proxy URL that turns it
on. curl cannot drive it. You open a SOCKS5 control connection, request an association,
then drive a QUIC connection yourself — wrapping each outbound packet in a SOCKS5 UDP
header and unwrapping each reply.

**Code block** — real values, no placeholders:

```python
# HTTP/3 rides inside SOCKS5 UDP ASSOCIATE. curl cannot drive it.
ctrl, relay = socks5_udp_associate(
    "us-east.gw.rayobyte.com", 1080, "USERNAME", "PASSWORD-country-US"
)
# KEEP ctrl OPEN. RFC 1928 scopes the association to this socket.
# Then drive aioquic's QuicConnection, wrapping each datagram:
u.sendto(udp_wrap(target, 443, quic_packet), relay)
```

**Two rules, as checkmarks:**
- Keep the control connection open — closing it tears down the relay
- The relay address is not the proxy address — allow outbound UDP to high ports
- One credential set works across every protocol

> The three old checkmarks — "No new credentials or endpoints", "Automatic fallback to
> HTTP/2", "Same per-GB price as HTTP/2 traffic" — are removed. The first is half-true, the
> second is invented (the docs describe no fallback), the third belongs to pricing.

---

## 8 · Where it runs  (NEW)

**Heading:** Where it runs

**Left — Availability:** HTTP/3, SOCKS5, SOCKS5 UDP and STUN are Residential features.
Rotating ISP and Rotating DC do country targeting, sessions, HTTP and HTTPS.
*Sending an unsupported option is not an error — it is silently ignored, and the response
will not tell you it was dropped.*

**Right — Entry points:**

| Region | Hostname | Status |
|---|---|---|
| US East | us-east.gw.rayobyte.com | Live |
| Asia Pacific (Southeast) | ap-southeast.gw.rayobyte.com | Live |
| Europe (West) | eu-west.gw.rayobyte.com | Coming soon |
| South America (East) | sa-east.gw.rayobyte.com | Coming soon |

**Callout:** Entry point is not exit country. The entry point shortens your first hop;
`-country-US` decides where you come out. `la.residential.rayobyte.com` still works and is
sunset at the end of 2026.

---

## 9 · Traps  (NEW)

**Heading:** Three things that will cost you an afternoon

1. **A request that worked reports a timeout.** Some servers send headers and body, then
   leave the QUIC stream open without a FIN. Read `content-length` and finish once you have
   that many bytes instead of waiting for `stream_ended`.
2. **One reply byte, two causes.** SOCKS5 has five reply bytes, so conditions share them.
   `0x01` is bad credentials *or* a rate limit; `0x05` is a blocked domain *or* empty
   targeting. Reproduce over HTTP on 8000, which returns a specific code.
3. **Unsupported options fail silently.** Send Residential-only targeting to Rotating DC
   and it is ignored, not rejected. You get a normal exit and no warning.

---

## 10 · Proof + use cases — unchanged

ScraperAPI quote stays. Use-case list stays; all four are plausible on Residential, which
is the tier that has HTTP/3.

---

## 11 · Closing CTA

**Heading:** Turn it on for your next run
**Body:** HTTP/3 is live on Residential today from two entry points, with two more coming.
Same credentials, same gateway, same targeting.
**CTAs:** Start now · Read the protocol docs

> "50+ full-time support staff who have actually read the RFC" is dropped — cute, but the
> page now quotes RFC 1928 and RFC 5389 directly, so the joke competes with real content.

---

## Open questions

1. **Benchmark numbers** — still no published figures. `[YOUR BENCHMARK NUMBERS]` stays
   unless you have data.
2. **Mobile Proxies** — the old pricing section listed Mobile. The docs' availability table
   covers only Residential / Rotating ISP / Rotating DC. Does Mobile support HTTP/3?
3. **Python in the hero-adjacent code block** — the docs' examples are Python. Confirm that
   suits the audience; the previous block was shell.
