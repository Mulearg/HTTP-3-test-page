/* ---------------------------------------------------------------------------
   Approved copy — transcribed from the FIGMA DESKTOP ARTBOARD (27881:14), not
   from CONTENT-v2.md.

   CONTENT-v2 was the plan; the artboard is what was actually made, and the
   design wins where the two disagree. They disagree a lot — nav links, the
   Where-it-runs heading, the testimonial, the use cases, the comparison rows
   and the footer columns are all different in the design. See FIGMA-DELTA.md
   for the full list.

   Every string below is the artboard's, character for character, including the
   non-breaking hyphen in "0‑RTT" and the en dashes in "2–3 round trips".

   There is deliberately NO pricing section.
--------------------------------------------------------------------------- */

/* --- 1 · Nav (27949:14) -------------------------------------------------- */

export const nav = {
  /** Right-aligned utility band on the warm chrome.band grey. */
  utility: {
    contact: 'Contact Us',
    partners: 'Partners',
    login: 'Log in',
  },
  links: ['Products', 'Pricing', 'Education', 'Culture', 'Solutions'],
  cta: 'Try Proxies Now',
}

/* --- 2 · Hero (27882:14) ------------------------------------------------- */

export const hero = {
  eyebrow: 'HTTP/3 IS LIVE ON RESIDENTIAL',
  /** Breaks as two lines in the design, at width 620. */
  headlineLines: ['HTTP/3 over QUIC,', 'across 40M+ residential IPs'],
  subhead:
    'Tunnelled through SOCKS5 UDP on the same gateway, the same port and the same credentials you already use. No separate account, no per-protocol pricing, and targeting behaves exactly as it does on HTTP.',
  primaryCta: 'Start now',
  secondaryCta: 'Read the protocol docs',
  trustLine:
    'Available on Residential. Rotating ISP and Rotating DC are HTTP and HTTPS only.',
}

/** The hero's stream diagram (27882:28) — the panel that makes the
 *  head-of-line-blocking claim visual rather than asserted.
 *
 *  Each bar row is a list of segments. `lead` is the fixed 92px head segment,
 *  `marker` the fixed 14px packet marker, `tail` the flexible remainder.
 *  Colours are literal because they encode meaning: sky = flowing,
 *  pink = the lost packet, hairline = stalled/empty. */
export const streamDiagram = {
  label: 'STREAM BEHAVIOUR UNDER PACKET LOSS',
  blocks: [
    {
      name: 'HTTP/2 over TCP',
      verdict: 'all streams stall',
      rows: [
        { lead: 'stalled', marker: 'lost', tail: 'empty' },
        { lead: 'stalled', marker: 'empty', tail: 'empty' },
        { lead: 'stalled', marker: 'empty', tail: 'empty' },
      ],
    },
    {
      name: 'HTTP/3 over QUIC',
      verdict: 'one stream waits',
      rows: [
        { lead: 'flowing', marker: 'lost', tail: 'empty' },
        { full: 'flowing' },
        { full: 'flowing' },
      ],
    },
  ],
  caption:
    'A dropped packet blocks only the stream that lost it. The other responses keep arriving.',
} as const

/* --- 3 · Stat band (27883:14) -------------------------------------------- */

export const stats = [
  { value: '40M+', label: 'residential IPs' },
  { value: '2', label: 'live entry points, 2 more coming' },
  { value: '6', label: 'protocols, one credential set' },
  { value: '10+ yrs', label: 'running proxy infrastructure' },
]

/* --- 4 · Why HTTP3 (27883:27) -------------------------------------------- */

export const whyHttp3 = {
  eyebrow: 'WHY IT MATTERS AT SCALE',
  heading: 'Three things change when the transport does',
  cards: [
    {
      icon: 'icon-streams',
      title: 'No head-of-line blocking',
      body: 'QUIC gives every request its own independent stream. A lost packet delays the one response waiting on it — not all of them. That is the failure mode that hurts most when hundreds of concurrent scrapes share a lossy residential route.',
    },
    {
      icon: 'icon-zerortt',
      title: '0‑RTT session resumption',
      body: 'TLS 1.3 is folded into the QUIC handshake instead of layered on top of TCP. A returning client can put its first request in its first packet, rather than paying a TCP round trip plus a TLS round trip before any data moves.',
    },
    {
      icon: 'icon-migrate',
      title: 'Connections survive a network change',
      body: 'QUIC identifies a connection by a connection ID, not by the IP and port four-tuple. A mobile exit moving between carriers keeps its session alive instead of tearing it down and renegotiating from scratch.',
    },
  ],
}

/* --- 5 · Comparison (27884:14) ------------------------------------------- */

export const comparison = {
  heading: 'What actually changes on the wire',
  columns: ['', 'HTTP/1.1', 'HTTP/2', 'HTTP/3'],
  /** `affirmative` marks the HTTP/3 cells the design sets in sky-deep rather
   *  than ink — the accessible affirmative colour, never the CTA green. */
  rows: [
    {
      label: 'Transport',
      cells: ['TCP', 'TCP', 'QUIC over UDP'],
      affirmative: false,
    },
    {
      label: 'Handshake before first byte',
      cells: ['2–3 round trips', '2–3 round trips', '1 round trip, 0 on resume'],
      affirmative: false,
    },
    {
      label: 'Head-of-line blocking',
      cells: ['Per connection', 'At the TCP layer', 'None'],
      affirmative: true,
    },
    {
      label: 'Survives an IP change',
      cells: ['No', 'No', 'Yes, via connection ID'],
      affirmative: true,
    },
    {
      label: 'Encryption',
      cells: ['TLS layered on top', 'TLS layered on top', 'TLS 1.3 built in'],
      affirmative: false,
    },
  ],
  /* Not rendered. The artboard puts this line, plus a [YOUR BENCHMARK NUMBERS]
     chip, under the table; both were removed by request because no published
     figures ever existed to fill the chip. Kept here so the copy is not lost
     if real benchmark data turns up. */
  footnote:
    'Protocol behaviour is fixed; the gain you see is not. Throughput and latency deltas depend on route and packet-loss rate —',
}

/* --- 6 · Protocols and ports (27966:14) ---------------------------------- */

export const protocols = {
  eyebrow: 'ONE GATEWAY',
  heading: 'One credential set, six protocols',
  body: 'There are no separate accounts and no per-protocol pricing. Targeting behaves identically on all of them.',
  rows: [
    { protocol: 'HTTP', port: '8000', notes: '', emphasis: false },
    { protocol: 'HTTPS', port: '8000', notes: 'via CONNECT', emphasis: false },
    { protocol: 'SOCKS5', port: '1080', notes: 'including CONNECT to any port', emphasis: false },
    { protocol: 'SOCKS5 UDP', port: '1080', notes: 'via UDP ASSOCIATE', emphasis: false },
    { protocol: 'HTTP/3 (QUIC)', port: '1080', notes: 'over SOCKS5 UDP ASSOCIATE', emphasis: true },
    { protocol: 'STUN', port: '1080', notes: 'over SOCKS5 UDP ASSOCIATE', emphasis: false },
  ],
  footnote: 'SOCKS5 carries no headers, so targeting options go on the password —',
  footnoteChip: 'PASSWORD-country-US',
}

/* --- 7 · How you connect (27885:14) -------------------------------------- */
/* Replaces the old "It is a flag, not a migration" section, which was false:
   the docs say curl cannot drive HTTP/3 over SOCKS5 UDP at all. */

export const howYouConnect = {
  eyebrow: 'WHAT IT TAKES',
  heading: 'It needs real code, not a flag',
  body: 'HTTP/3 rides inside SOCKS5 UDP ASSOCIATE, so there is no proxy URL that turns it on. curl cannot drive it. You open a SOCKS5 control connection, request an association, then drive a QUIC connection yourself — wrapping each outbound packet in a SOCKS5 UDP header and unwrapping each reply.',
  /** Tokenised so the design's syntax colouring survives — the artboard sets
   *  calls in sky and string literals in pink. `c` = comment, `fn` = call,
   *  `str` = string literal, plain text otherwise. */
  code: [
    [{ c: '# HTTP/3 rides inside SOCKS5 UDP ASSOCIATE.' }],
    [{ c: '# curl cannot drive it — this needs real code.' }],
    [{ t: 'ctrl, relay = ' }, { fn: 'socks5_udp_associate' }, { t: '(' }],
    [{ t: '    ' }, { str: '"us-east.gw.rayobyte.com"' }, { t: ', 1080,' }],
    [{ t: '    ' }, { str: '"USERNAME"' }, { t: ', ' }, { str: '"PASSWORD-country-US"' }],
    [{ t: ')' }],
    [],
    [{ c: '# KEEP ctrl OPEN. RFC 1928 scopes the' }],
    [{ c: '# association to this socket.' }],
    [{ t: 'u.sendto(' }, { fn: 'udp_wrap' }, { t: '(target, 443, quic_packet), relay)' }],
  ],
  rules: [
    'Keep the control connection open — closing it tears down the relay',
    'The relay address is not the proxy address — allow outbound UDP to high ports',
    'One credential set works across every protocol',
  ],
}

/* --- 8 · Where it runs (27967:14) ---------------------------------------- */

export const whereItRuns = {
  eyebrow: 'WHERE IT RUNS',
  heading: 'Live on Residential, from two entry points',
  availability: {
    title: 'AVAILABILITY',
    /* A LIST, not a matrix. `scope` is sky-deep where it is the Residential-only
       fact and ink-secondary for the one that is not. Mobile Proxies are absent
       because the docs' availability table does not cover them — do not add a
       row until that is answered. */
    rows: [
      { protocol: 'HTTP/3 (QUIC)', scope: 'Residential only', residentialOnly: true },
      { protocol: 'SOCKS5', scope: 'Residential only', residentialOnly: true },
      { protocol: 'SOCKS5 UDP', scope: 'Residential only', residentialOnly: true },
      { protocol: 'STUN', scope: 'Residential only', residentialOnly: true },
      { protocol: 'HTTP & HTTPS', scope: 'All three products', residentialOnly: false },
    ],
    note: 'Sending an unsupported option is not an error. It is silently ignored, and the response will not tell you it was dropped.',
  },
  entryPoints: {
    title: 'ENTRY POINTS',
    rows: [
      { region: 'US East', hostname: 'us-east.gw.rayobyte.com', live: true },
      { region: 'Asia Pacific (Southeast)', hostname: 'ap-southeast.gw.rayobyte.com', live: true },
      { region: 'Europe (West)', hostname: 'eu-west.gw.rayobyte.com', live: false },
      { region: 'South America (East)', hostname: 'sa-east.gw.rayobyte.com', live: false },
    ],
    note: 'Ports are the same on every one: 8000 for HTTP and HTTPS, 1080 for SOCKS5 and the UDP protocols.',
  },
  callout: {
    lead: 'Entry point is not exit country.',
    body: 'The entry point shortens your first hop; -country- decides where you come out. la.residential.rayobyte.com still works and is sunset at the end of 2026.',
  },
}

/* --- 9 · Traps (27969:14) ------------------------------------------------ */

export const traps = {
  eyebrow: 'BEFORE YOU BUILD',
  heading: 'Three things that will cost you an afternoon',
  items: [
    {
      num: '01',
      title: 'A request that worked reports a timeout',
      body: 'Some servers send their response headers and body, then leave the QUIC stream open without a FIN. A client waiting on stream_ended sits until its own deadline. Read content-length and finish once you have that many bytes.',
    },
    {
      num: '02',
      title: 'One reply byte, two causes',
      body: 'SOCKS5 has five reply bytes, so conditions share them. 0x01 is bad credentials or a rate limit. 0x05 is a blocked domain or empty targeting. Reproduce over HTTP on port 8000, which returns a specific code.',
    },
    {
      num: '03',
      title: 'Unsupported options fail silently',
      body: 'Send Residential-only targeting to Rotating ISP or Rotating DC and it is ignored, not rejected. You get a normal exit for that product and nothing in the response says the option was dropped.',
    },
  ],
}

/* --- 10 · Proof (27887:14) ----------------------------------------------- */

export const proof = {
  quote:
    'We rely on their good quality IP addresses so much that they simply became our largest provider.',
  attributionName: 'Zoltan Bettenbuk',
  attributionRole: 'CTO, ScraperAPI',
  useCasesEyebrow: 'WHERE HTTP/3 EARNS ITS KEEP',
  useCases: [
    {
      title: 'E-commerce price monitoring',
      body: 'Thousands of small parallel requests, where one stall costs a whole batch.',
    },
    {
      title: 'AI training-data collection',
      body: 'Sustained high-volume pulls over long-haul, lossy international routes.',
    },
    {
      title: 'Ad verification',
      body: 'Mobile exits that move between carriers mid-session.',
    },
    {
      title: 'SERP analysis',
      body: 'Latency-sensitive repeat connections that benefit from 0‑RTT resumption.',
    },
  ],
}

/* --- 11 · Closing CTA (27888:14) ----------------------------------------- */

export const closingCta = {
  heading: 'Turn it on for your next run',
  body: 'HTTP/3 is live on Residential today from two entry points, with two more coming. Same credentials, same gateway, same targeting.',
  primaryCta: 'Start now',
  secondaryCta: 'Talk to us',
}

/* --- 12 · Footer (27953:18) ---------------------------------------------- */

export const footer = {
  copyright: '© Copyright 2026 Rayobyte. All Rights Reserved.',
  legal: ['Privacy Policy', 'TOS and AUP', 'General SLA'],
  awardLine: 'Award-winning proxy provider',
  columns: [
    {
      title: 'PRODUCTS',
      links: [
        'Residential Proxies',
        'Web Unblocker',
        'Static ISP Proxies',
        'Rotating ISP Proxies',
        'Static Data Center IPs',
        'Rotating Data Center IPs',
        'Web Scraping API',
        'Free Tools',
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        'Contact Us',
        'Blog',
        'Knowledge Base',
        'About Us',
        'Affiliates',
        'Ethical Usage & Acquisition',
        'API Documentation',
        'eBooks',
      ],
    },
    {
      title: 'OTHERS',
      links: [
        'Rayobyte Stories',
        'Rayobyte Community',
        'Pricing',
        'Case Studies',
        'Use Cases',
        'Law Enforcement Inquiries',
        'Support Ukraine',
        { label: 'Blog Categories', chevron: true },
        '10th Anniversary',
      ],
    },
  ],
  contact: {
    title: 'Headquarters',
    address: 'Rayobyte, LLC., 233 S. 13th St, Suite 1100, Lincoln, NE 68508, USA',
  },
}
