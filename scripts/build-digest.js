import Anthropic from "@anthropic-ai/sdk";
import Parser from "rss-parser";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { SOURCES } from "./sources.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const parser = new Parser({ timeout: 12000 });

// ── Fetch RSS ────────────────────────────────────────────
async function fetchFeed(url, name, max = 2) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).slice(0, max).map(item => ({
      title:       item.title || "Untitled",
      url:         item.link || item.guid || "",
      content:     item.contentSnippet || item.summary || item.content || "",
      source:      name,
      publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
    }));
  } catch (e) {
    console.warn(`  ⚠ Feed failed: ${name} — ${e.message}`);
    return [];
  }
}

// ── Haiku summary ────────────────────────────────────────
async function summarise(title, content, category) {
  try {
    const res = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 150,
      messages: [{
        role: "user",
        content: `You are a briefing assistant for a senior banking data analytics professional (AVP at Barclays, 12 years, IFRS 9 / ECL / PD/LGD/EAD / PMA expert, Python/SAS). Also an active global equity investor tracking macro, energy, commodities, emerging markets. Builds mobile apps (React Native, Firebase, Node.js).

Category: ${category}
Title: ${title}
Content: ${content}

Write a 2-sentence summary (max 70 words):
- For MACRO/MARKETS: broad market significance, sector themes, global implications — not just specific stocks
- For CREDIT RISK: link to IFRS 9, ECL, regulatory or model implications
- For AI/ML: banking analytics disruption angle
- For BREAKTHROUGHS: investment or industry disruption angle
- For BUILDER: technical relevance to app dev or fintech

Sharp, analytical, no fluff. Only the summary, no preamble.`
      }]
    });
    const block = res.content[0];
    return block.type === "text" ? block.text.trim() : content.slice(0, 200);
  } catch (e) {
    console.warn(`  ⚠ Haiku failed for "${title.slice(0,40)}" — ${e.message}`);
    return content.slice(0, 200) + "...";
  }
}

// ── Main ─────────────────────────────────────────────────
async function main() {
  const today = new Date().toISOString().slice(0, 10);
  console.log(`\n🔄 Building digest for ${today}...\n`);

  const categories = [];

  for (const source of SOURCES) {
    console.log(`📂 ${source.label}`);
    const items = [];

    for (const feed of source.feeds) {
      const raw = await fetchFeed(feed.url, feed.name);
      for (const item of raw) {
        if (!item.url) continue;
        console.log(`  ✦ Summarising: ${item.title.slice(0, 60)}...`);
        const summary = await summarise(item.title, item.content, source.label);
        items.push({ ...item, summary });
      }
    }

    categories.push({
      category:    source.category,
      label:       source.label,
      color:       source.color,
      items:       items.slice(0, 8),
      generatedAt: new Date().toISOString(),
    });
  }

  const digest = {
    date:        today,
    generatedAt: new Date().toISOString(),
    categories,
  };

  // ── Write today's digest ─────────────────────────────
  mkdirSync("docs/digests", { recursive: true });
  writeFileSync(`docs/digests/${today}.json`, JSON.stringify(digest, null, 2));
  console.log(`\n✅ Written: docs/digests/${today}.json`);

  // ── Update index.json (list of all dates, newest first) ─
  const indexPath = "docs/digests/index.json";
  let index = existsSync(indexPath)
    ? JSON.parse(readFileSync(indexPath, "utf8"))
    : [];

  if (!index.includes(today)) {
    index = [today, ...index].sort((a, b) => b.localeCompare(a));
    writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`✅ Updated: digests/index.json (${index.length} days)`);
  }

  // ── Summary stats ────────────────────────────────────
  const total = categories.reduce((n, c) => n + c.items.length, 0);
  console.log(`\n📊 ${total} stories across ${categories.length} categories`);
  console.log(`💰 Estimated Haiku cost: ~$${(total * 0.00003).toFixed(4)}\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
