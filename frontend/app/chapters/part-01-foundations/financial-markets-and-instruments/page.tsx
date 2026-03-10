import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { MarketTimeseriesChart } from "../../../../components/interactive/MarketTimeseriesChart";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-01-foundations";
const chapterSlug = "financial-markets-and-instruments";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "What is a Market?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Now we actually begin with our starting topic of just a broad view of finance and investing."
      },
      {
        "type": "paragraph",
        "text": "The most important thing when discussing finance is how a \"market\" moves or just in general how a market works. What is a Market you ask? Well we can define a market as multiple different things. At the most high level description of what a market is, it is a place or system to which buyers and sellers interact to exchange something in value. An example of this that you can see in your day to day like is at a supermarket like Walmart where the seller is the store and us the people are the buyer."
      },
      {
        "type": "paragraph",
        "text": "That is more just a general description to what a market is. For what we are interested in, a market can also be like eBay, the New York Stock Exchange, or even Kalshi/PolyMarket. Let us observe an example stock of NVIDIA."
      },
      {
        "type": "codeBlock",
        "language": "python",
        "code": "import yfinance as yf\nfrom datetime import datetime\nclose = (\n    yf.Ticker(\"NVDA\")\n    .history(period=\"1d\", interval=\"1m\", prepost=True, auto_adjust=False)[\"Close\"]\n    .dropna()\n)\nax = close.plot(figsize=(12, 4), color=\"#76B900\", linewidth=1.6, grid=True, title=f\"NVDA Intraday Price ({datetime.now().date()})\")\nax.set_xlabel(\"Time\")\nax.set_ylabel(\"Price (USD)\")"
      },
      {
        "type": "paragraph",
        "text": "A better understanding to what we will be working for the majority of the time in the notebooks are markets like the NVDA stock. In the context of a given stock, the buyer is esentially us investing the money into a company and the seller is the company intself to which we invest into the given company. The main goal to which we are trying to accomplish is to answer the question, \"How can I choose the best market to invest in so that my money such that I can make the most profit.\" If this question was already answered, then I wouldn't even be making this whole website as if anyone can figure that out, then anyone can already be a millionare."
      },
      {
        "type": "paragraph",
        "text": "So why is this an unsolved problem? Well that is because as every market is, it is *Stochastic*. Stochastic in the simplest defnintion means that a given thing is random moving. With a given market being random, it leads to uncertanty to when to invest and sell back a product to a seller."
      },
      {
        "type": "subheading",
        "text": "Why does the market move?"
      },
      {
        "type": "paragraph",
        "text": "Well this can come from many different factors. A high level reason to why it moves is because of a general opinion to how valuable a product is due to current information."
      }
    ]
  },
  {
    "title": "Stocks, bonds, ETFs, mutual funds",
    "blocks": [
      {
        "type": "unorderedList",
        "items": [
          "Stocks, bonds, ETFs, mutual funds placeholder for Financial markets and instruments.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      },
      {
        "type": "subheading",
        "text": "Indexes and benchmarks"
      },
      {
        "type": "unorderedList",
        "items": [
          "Indexes and benchmarks placeholder for Financial markets and instruments.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      },
      {
        "type": "subheading",
        "text": "Derivatives at a high level"
      },
      {
        "type": "unorderedList",
        "items": [
          "Derivatives at a high level placeholder for Financial markets and instruments.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      },
      {
        "type": "subheading",
        "text": "Exchanges, brokers, and market participants"
      },
      {
        "type": "unorderedList",
        "items": [
          "Exchanges, brokers, and market participants placeholder for Financial markets and instruments.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      }
    ]
  }
];

const sectionExtras = {
  "What is a Market?": <MarketTimeseriesChart defaultSymbol="NVDA" />
};

export default function Page() {
  const chapter = chapterByRoute(partSlug, chapterSlug);

  if (!chapter) {
    notFound();
  }

  return <ChapterPageLayout chapter={chapter} sectionContent={sectionContent} sectionExtras={sectionExtras} />;
}
