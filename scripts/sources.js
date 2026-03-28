export const SOURCES = [
  {
    category: "credit_risk",
    label: "Credit Risk & Regulatory",
    color: "#e8c547",
    feeds: [
      { name: "Risk.net",       url: "https://www.risk.net/rss/latest" },
      { name: "BIS Research",   url: "https://www.bis.org/rss/wpapers.rss" },
      { name: "Bank of England",url: "https://www.bankofengland.co.uk/rss/publications" },
    ]
  },
  {
    category: "ai_research",
    label: "AI & ML Research",
    color: "#5e8aff",
    feeds: [
      { name: "Hugging Face",   url: "https://huggingface.co/blog/feed.xml" },
      { name: "DeepMind",       url: "https://deepmind.google/blog/rss.xml" },
      { name: "MIT Tech Review",url: "https://www.technologyreview.com/feed/" },
    ]
  },
  {
    category: "macro",
    label: "Macro & Markets",
    color: "#3dd6c8",
    feeds: [
      { name: "FT Markets",     url: "https://www.ft.com/markets?format=rss" },
      { name: "Reuters",        url: "https://feeds.reuters.com/reuters/businessNews" },
      { name: "The Economist",  url: "https://www.economist.com/finance-and-economics/rss.xml" },
      { name: "Seeking Alpha",  url: "https://seekingalpha.com/market_currents.xml" },
      { name: "ET Markets",     url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms" },
    ]
  },
  {
    category: "breakthroughs",
    label: "Science Breakthroughs",
    color: "#ff6b6b",
    feeds: [
      { name: "Nature",         url: "https://www.nature.com/nature.rss" },
      { name: "Science Daily",  url: "https://www.sciencedaily.com/rss/all.xml" },
      { name: "Ars Technica",   url: "https://feeds.arstechnica.com/arstechnica/science" },
    ]
  },
  {
    category: "builder",
    label: "Builder & Product",
    color: "#c084fc",
    feeds: [
      { name: "Hacker News",    url: "https://hnrss.org/frontpage" },
      { name: "a16z",           url: "https://a16z.com/feed/" },
      { name: "TechCrunch",     url: "https://techcrunch.com/feed/" },
    ]
  }
]
