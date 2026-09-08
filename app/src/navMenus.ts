/* ---------------------------------------------------------------------------
   Nav mega-menu contents, read from the LIVE SITE (https://rayobyte.com) on
   2026-09-01, not from the Figma artboard.

   The artboard draws the nav bar with five labelled items and a chevron on
   each, but does not draw the panels those chevrons open. The live site is
   therefore the only source for this, and everything below — copy, hrefs,
   grouping, icon assets and the per-item rail tints — is measured from it.

   ONE PALETTE CAVEAT, flagged rather than silently normalised: the icon rail
   tints are eight pastels that appear nowhere in rayobyte.tokens.json. They
   are not on the retired list either, so nothing here is forbidden — but they
   do widen the palette. Reproduced because matching the live site was the
   brief; centralised in RAIL below so they are one edit to re-map.

   Icons live in public/assets/nav/, downloaded from the site's CDN so the
   build does not hotlink.
--------------------------------------------------------------------------- */

/** The eight icon-rail tints used on the live site. */
export const RAIL = {
  peach: '#FFECD4',
  blue: '#DEF0FF',
  violet: '#F0E9FF',
  coral: '#FFE1DD',
  rose: '#FFE7E7',
  green: '#D0FAD1',
  mint: '#D8FFF3',
  lilac: '#EAE9FE',
} as const

export type Rail = keyof typeof RAIL

export type MenuItem = {
  title: string
  desc?: string
  href: string
  icon?: string
  rail: Rail
  /** Pricing menu only. */
  priceLabel?: string
  price?: string
  /** Culture only — renders as a 300x300 image tile instead of a rail card. */
  image?: string
}

export type MenuGroup = {
  heading?: string
  /** Column count of the group's own grid, per the live layout. */
  columns: 1 | 2 | 3
  items: MenuItem[]
}

export type Menu = {
  /** 'pricing' cards are wider (333 vs 298), have a narrower rail and carry a
   *  divided price column on the right. */
  variant?: 'default' | 'pricing' | 'education' | 'culture'
  groups: MenuGroup[]
  /** The outlined pill at the foot. Tone matches the live site's border. */
  seeAll?: { label: string; href: string; tone: 'pink' | 'sky' }
}

const proxyProducts: MenuItem[] = [
  {
    title: 'Residential Proxies',
    desc: 'Ethical residential proxies for all of your data needs.',
    href: 'https://rayobyte.com/products/residential-proxies/',
    icon: 'residential',
    rail: 'peach',
  },
  {
    title: 'Static ISP Proxies',
    desc: 'The authority of residential meets the speed of data center.',
    href: 'https://rayobyte.com/products/isp-proxies/',
    icon: 'static-isp',
    rail: 'blue',
  },
  {
    title: 'Static Data Center Proxies',
    desc: 'Unlimited Bandwidth & Unlimited Connections.',
    href: 'https://rayobyte.com/products/datacenter-ips/',
    icon: 'static-dc',
    rail: 'violet',
  },
  {
    title: 'Rotating ISP Proxies',
    desc: 'The same ISP proxies you love in a large, rotating pool.',
    href: 'https://rayobyte.com/products/rotating-isp-proxies/',
    icon: 'rotating-isp',
    rail: 'coral',
  },
  {
    title: 'Rotating Data Center Proxies',
    desc: 'The same data center proxies you love in a large, rotating pool.',
    href: 'https://rayobyte.com/products/rotating-proxies/',
    icon: 'rotating-dc',
    rail: 'rose',
  },
  {
    title: 'Mobile Proxies',
    desc: 'Get the best rotating mobile proxies for web scraping!',
    href: 'https://rayobyte.com/products/mobile-proxies/',
    icon: 'mobile',
    rail: 'green',
  },
]

const scrapingProducts: MenuItem[] = [
  {
    title: 'Web Unblocker',
    desc: 'A hybrid scraping tool that lets you mimic real traffic with ease.',
    href: 'https://rayobyte.com/products/web-unblocker/',
    icon: 'web-unblocker',
    rail: 'mint',
  },
  {
    title: 'Web Scraping API',
    desc: 'Scrape websites into JSON with ease!',
    href: 'https://rayobyte.com/products/web-scraping-api/',
    icon: 'scraping-api',
    rail: 'lilac',
  },
  {
    title: 'rayobrowse',
    desc: 'A self-hosted Chromium browser built for large-scale web scraping.',
    href: 'https://rayobyte.com/products/chromium-stealth-browser-lp/',
    icon: 'rayobrowse',
    rail: 'blue',
  },
]

/** Same products as Products, with the live site's published rates attached. */
const proxyPricing: MenuItem[] = [
  { ...proxyProducts[0], href: 'https://rayobyte.com/products/residential-proxies#pricing', priceLabel: 'As low as', price: '$0.50/GB' },
  { ...proxyProducts[1], href: 'https://rayobyte.com/products/isp-proxies#pricing', priceLabel: 'From', price: '$4.60/IP' },
  { ...proxyProducts[2], href: 'https://rayobyte.com/products/datacenter-ips#dc_pricing', priceLabel: 'From', price: '$1/IP' },
  { ...proxyProducts[3], href: 'https://rayobyte.com/products/rotating-isp-proxies#pricing', priceLabel: 'From', price: '$3.75/GB' },
  { ...proxyProducts[4], href: 'https://rayobyte.com/products/rotating-proxies#pricing', priceLabel: 'From', price: '$0.30/GB' },
  { ...proxyProducts[5], href: 'https://rayobyte.com/products/mobile-proxies#pricing', priceLabel: 'As low as', price: '$0.50/GB' },
]

const scrapingPricing: MenuItem[] = [
  { ...scrapingProducts[0], href: 'https://rayobyte.com/products/web-unblocker#pricing', priceLabel: 'From', price: '$2.50/GB' },
  { ...scrapingProducts[1], href: 'https://rayobyte.com/products/web-scraper-api/#pricing', priceLabel: 'Free', price: 'Scrapes' },
  {
    title: 'Get Custom Pricing',
    desc: 'Connect with our sales team to find a price that works for you!',
    href: 'https://rayobyte.com/contact-us/',
    icon: 'custom-pricing',
    rail: 'coral',
  },
]

export const navMenus: Record<string, Menu> = {
  Products: {
    groups: [
      { heading: 'Proxy Solutions', columns: 2, items: proxyProducts },
      { heading: 'Scraping Solutions', columns: 1, items: scrapingProducts },
    ],
    seeAll: { label: 'See All Products', href: 'https://rayobyte.com/products/', tone: 'pink' },
  },

  Pricing: {
    variant: 'pricing',
    groups: [
      { heading: 'Proxy Solutions', columns: 2, items: proxyPricing },
      { heading: 'Scraping Solutions', columns: 1, items: scrapingPricing },
    ],
    seeAll: { label: 'See All Pricing', href: 'https://rayobyte.com/pricing/', tone: 'sky' },
  },

  /* Education and Solutions are a flat 3-across grid with no group headings. */
  Education: {
    variant: 'education',
    groups: [
      {
        columns: 3,
        items: [
          { title: 'Blog', desc: 'A leading source of proxy and scraping information.', href: 'https://rayobyte.com/blog/', icon: 'blog', rail: 'violet' },
          { title: 'Rayobyte Community', desc: 'Get involved with the Rayobyte community and read what expert developers are writing on the site.', href: 'https://rayobyte.com/our-community/', icon: 'community', rail: 'peach' },
          { title: 'Rayobyte University', desc: 'Our signature certification course teaches you about scraping through videos, text, and a free codebase.', href: 'https://rayobyte.com/university/', icon: 'university', rail: 'rose' },
          { title: 'Knowledge Base', desc: 'Learn the ins and outs of Rayobyte proxies.', href: 'https://portal.rayobyte.com/en/support/home', icon: 'knowledge-base', rail: 'mint' },
          { title: 'Case Studies', desc: 'See how teams succeed with real-world solutions.', href: 'https://rayobyte.com/case-studies/', icon: 'case-studies', rail: 'blue' },
        ],
      },
    ],
  },

  Culture: {
    variant: 'culture',
    groups: [
      {
        columns: 2,
        items: [
          { title: 'About Us', desc: 'Why we do what we do.', href: 'https://rayobyte.com/about/', icon: 'about-us', rail: 'violet' },
          { title: 'Rayobyte Stories', desc: 'See how Rayobyte customers and employees are bringing great ideas to life!', href: 'https://rayobyte.com/stories/', icon: 'stories', rail: 'green' },
          { title: 'Team', desc: 'Meet the men and women working tirelessly to bring you great products.', href: 'https://rayobyte.com/about/people/', icon: 'team', rail: 'rose' },
          { title: 'Careers', desc: 'See open roles and help us bring great ideas to life!', href: 'https://rayobyte.com/about/people/careers/', icon: 'careers', rail: 'peach' },
          // No icon on the live site — the rail carries the colour alone.
          { title: 'Support Ukraine', desc: 'Ukraine Support Campaign 2024', href: 'https://rayobyte.com/about/support-ukraine/', rail: 'violet' },
        ],
      },
      {
        heading: 'Latest Rayobyte Stories',
        columns: 1,
        items: [
          { title: 'Building New Products with Max Gutchenko', href: 'https://rayobyte.com/stories/building-new-products-with-max', rail: 'blue', image: 'story-max.avif' },
        ],
      },
    ],
  },

  Solutions: {
    groups: [
      {
        columns: 3,
        items: [
          { title: 'Social Media', desc: 'Manage accounts, gain regional insights and monitor the competition.', href: 'https://rayobyte.com/cases/social-media/', icon: 'social-media', rail: 'violet' },
          { title: 'E-commerce Data Extraction', desc: 'Monitor trends and prices to excel your brand.', href: 'https://rayobyte.com/cases/ecommerce-data-scraping-services/', icon: 'ecommerce', rail: 'peach' },
          { title: 'SEO Monitoring', desc: 'View local search results for maximum SERP insights.', href: 'https://rayobyte.com/cases/seo-monitoring/', icon: 'seo', rail: 'rose' },
          { title: 'Proxies for Ad Verification', desc: 'Protect your brand and ensure ad compliance from anywhere.', href: 'https://rayobyte.com/cases/proxies-for-ad-verification/', icon: 'ad-verification', rail: 'blue' },
          { title: 'Review Monitoring', desc: 'Learn how people feel about your brand for informed decisions.', href: 'https://rayobyte.com/cases/review-monitoring/', icon: 'review-monitoring', rail: 'mint' },
        ],
      },
    ],
    seeAll: { label: 'See All Use Cases', href: 'https://rayobyte.com/cases/', tone: 'sky' },
  },
}

/** The two utility-bar dropdowns, also read from the live site. */
export const utilityMenus: Record<string, { label: string; href: string }[]> = {
  Partners: [
    { label: 'Resell', href: 'https://rayobyte.com/resell-proxies/' },
    { label: 'Affiliates', href: 'https://rayobyte.com/affiliates/' },
  ],
  'Log in': [
    { label: 'Residential Dashboard', href: 'https://app.rayobyte.com/auth/login' },
    { label: 'Data Center & ISP Dashboard', href: 'https://rayobyte.com/proxy/dashboard/login-type' },
  ],
}
