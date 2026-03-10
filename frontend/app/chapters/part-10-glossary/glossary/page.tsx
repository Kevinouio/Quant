import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-10-glossary";
const chapterSlug = "glossary";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Sections",
    "blocks": [
      {
        "type": "subheading",
        "text": "How to use this glossary"
      },
      {
        "type": "unorderedList",
        "items": [
          "How to use this glossary placeholder for Glossary.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      },
      {
        "type": "subheading",
        "text": "Finance and investing terms"
      },
      {
        "type": "paragraph",
        "text": "**Market**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A market is an organized environment where buyers and sellers exchange goods, services, or financial claims according to a pricing process and a set of rules. It can be physical or digital, but its core function is the same: coordinate exchange and convert competing valuations into observable prices."
      },
      {
        "type": "paragraph",
        "text": "Intuition: A market does not need to be a physical place; it can be a store, exchange, website, or any organized mechanism for trade."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Markets determine who trades, at what price, and under what conditions, so they sit at the center of economic and financial activity."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Price Discovery, Buyers, Sellers, Supply, Demand."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Price Discovery**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Price discovery is the ongoing process through which a market determines the transaction price of an asset from incoming orders, information, and participant behavior. In practice, it reflects how quickly new expectations are absorbed into quoted and traded prices."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Buyers submit willingness to pay and sellers submit willingness to sell; the traded price emerges from that interaction."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: In both investing and trading, every position depends on how quickly and accurately markets incorporate information into price."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Market, Liquidity, Efficiency, Competition."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 31 (Order types and trade lifecycle)."
      },
      {
        "type": "paragraph",
        "text": "**Buyers**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Buyers are participants who demand an item and are willing to exchange cash or other value to obtain it at a given price. Their collective willingness to pay is one side of the force that drives market prices."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Buyers create demand pressure in the market."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Changes in buyer intensity can move prices, tighten supply, and shift short-term and long-term valuations."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Demand, Sellers, Price Discovery."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Sellers**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Sellers are participants who supply an item and are willing to transfer ownership in exchange for value. Their willingness to sell, and at what price, is a key determinant of available market supply and price pressure."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Sellers provide available inventory to the market."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Selling pressure drives price declines, affects liquidity, and influences execution quality."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Supply, Buyers, Price Discovery."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Supply**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Supply is the quantity of a good or asset that sellers are willing and able to offer across possible price levels. Because incentives change with price, supply is usually represented as a schedule rather than one fixed number."
      },
      {
        "type": "paragraph",
        "text": "Intuition: As price rises, supplying the item usually becomes more attractive."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Supply conditions shape scarcity, market depth, and how easily large orders can be absorbed."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Demand, Market Equilibrium, Sellers."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Demand**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Demand is the quantity of a good or asset that buyers are willing and able to purchase across possible price levels. It depends on preferences, affordability, expectations, and available substitutes."
      },
      {
        "type": "paragraph",
        "text": "Intuition: As price falls, demand often increases because the item becomes more attractive or affordable."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Demand pressure is a core driver of price trends and valuation shifts."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Supply, Market Equilibrium, Buyers."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Market Equilibrium**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Market equilibrium is the balancing point where quantity demanded equals quantity supplied at a specific price. It is best understood as a moving tendency, since real markets continuously adjust when information and incentives change."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the temporary balancing point where the market clears."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Even though real markets constantly adjust, equilibrium gives a baseline for understanding price moves."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Supply, Demand, Price Discovery."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Goods Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Goods markets are markets for tangible products, such as food, electronics, vehicles, and raw materials. Pricing in these markets is heavily influenced by production capacity, logistics, inventory, and consumer demand."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The exchanged item is tangible and can be produced, stored, and delivered."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Goods-market pricing affects inflation, input costs, and business profitability."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Service Markets, Commodity Markets."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Service Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Service markets are markets where the exchanged value is labor, expertise, or access rather than a physical product. Examples include healthcare, education, transport, and consulting, where quality and trust often matter as much as price."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The exchanged value is work or access, not a physical object."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Service prices and wage costs strongly influence earnings, household budgets, and economic growth."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Goods Markets, Labor Market."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Labor Market**"
      },
      {
        "type": "paragraph",
        "text": "Definition: The labor market is the system in which workers offer labor and employers demand labor in exchange for wages and benefits. Conditions in this market influence income growth, productivity, inflation pressure, and overall economic activity."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Wages are the price of labor set by supply and demand conditions."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Labor-market conditions feed into inflation, consumer spending, and policy expectations."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Supply, Demand, Service Markets."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 3 (Risk, volatility, and drawdowns)."
      },
      {
        "type": "paragraph",
        "text": "**Financial Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Financial markets are systems for trading financial instruments such as equities, bonds, currencies, and derivatives. They connect savers and borrowers, transfer risk, and help allocate capital across firms, sectors, and economies."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Instead of exchanging physical goods, participants exchange claims on cash flows, risk, and ownership."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Financial markets channel capital from savers to firms and governments and are central to investment outcomes."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Stock, Bonds, Derivatives, Primary Market, Secondary Market."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Real Estate Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Real estate markets involve the buying, selling, and leasing of land and property. Valuation in these markets depends on location, financing conditions, regulation, and local supply-demand dynamics."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Prices reflect local supply constraints, financing conditions, and demand for housing or commercial use."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Real estate cycles affect household wealth, borrowing capacity, and broader economic stability."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Capital, Liquidity, Supply, Demand."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Commodity Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Commodity markets trade standardized raw materials and energy products, including oil, metals, and agricultural goods. Prices are often sensitive to weather, geopolitics, storage constraints, and global growth expectations."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Commodity prices often react quickly to supply shocks, geopolitical risk, and global demand shifts."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Commodity moves feed directly into inflation, margins, and cross-asset performance."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Supply, Demand, Volatility."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 15 (Carry strategies)."
      },
      {
        "type": "paragraph",
        "text": "**Primary Market**"
      },
      {
        "type": "paragraph",
        "text": "Definition: The primary market is where new securities are created and sold by issuers to raise funding. Capital from these transactions flows directly to the issuing company or government, not to prior investors."
      },
      {
        "type": "paragraph",
        "text": "Intuition: In primary issuance, cash goes to the company or government creating the security."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Primary markets finance expansion, research, hiring, and long-term investment."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Secondary Market, Capital, Public Company."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Secondary Market**"
      },
      {
        "type": "paragraph",
        "text": "Definition: The secondary market is where already-issued securities are traded between investors after issuance. Its depth and liquidity are essential because they influence valuation, exit opportunities, and confidence in primary issuance."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Most day-to-day stock exchange activity is secondary-market trading."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Active secondary markets improve liquidity and support continuous price discovery."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Primary Market, Liquidity, Price Discovery."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 31 (Order types and trade lifecycle)."
      },
      {
        "type": "paragraph",
        "text": "**Liquidity**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Liquidity measures how easily an asset can be traded quickly and in size without materially moving its price. High-liquidity markets usually have tighter spreads, deeper order books, and lower execution friction."
      },
      {
        "type": "paragraph",
        "text": "Intuition: A liquid market lets you trade quickly near the quoted price."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Liquidity affects transaction costs, slippage, and risk during both normal and stressed conditions."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Market Makers, Volatility, Bid-Ask Spread."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 32 (Transaction costs and slippage)."
      },
      {
        "type": "paragraph",
        "text": "**Volatility**"
      },
      {
        "type": "paragraph",
        "text": "Aliases: Volatitly"
      },
      {
        "type": "paragraph",
        "text": "Definition: Volatility is the degree and frequency of price movement over time, often measured using return dispersion. It is a central risk dimension because higher volatility increases uncertainty around path, drawdowns, and position sizing."
      },
      {
        "type": "paragraph",
        "text": "Intuition: High volatility means larger and faster swings in price."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Volatility affects position sizing, drawdown risk, and expected return paths."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Risk, Liquidity, Drawdown."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 3 (Risk, volatility, and drawdowns), Chapter 20 (Volatility forecasting and targeting)."
      },
      {
        "type": "paragraph",
        "text": "**Transparency**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Transparency is the extent to which prices, transactions, and market rules are visible and understandable to participants. Higher transparency generally improves trust, market quality, and the fairness of execution."
      },
      {
        "type": "paragraph",
        "text": "Intuition: More transparency means less uncertainty about what is happening in the market."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Transparent markets tend to support trust, better execution, and stronger price discovery."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Efficiency, Competition, Price Discovery."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 34 (Limit order books and market making)."
      },
      {
        "type": "paragraph",
        "text": "**Efficiency**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Market efficiency describes how rapidly and accurately prices reflect available information. In a more efficient market, persistent and obvious mispricings are harder to identify and exploit after costs."
      },
      {
        "type": "paragraph",
        "text": "Intuition: In a more efficient market, clear mispricings are harder to find and exploit consistently."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Strategy design depends on whether inefficiencies are present and persistent."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Transparency, Competition, Price Discovery."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 5 (Stylized facts of returns), Chapter 40 (Comparing investing and trading styles)."
      },
      {
        "type": "paragraph",
        "text": "**Competition**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Competition is the degree to which many participants can transact without any single participant consistently controlling price formation. Strong competition usually supports tighter pricing, better liquidity, and lower intermediation costs."
      },
      {
        "type": "paragraph",
        "text": "Intuition: More competition usually leads to tighter spreads and more reliable pricing."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Competitive structure affects costs, market quality, and the durability of alpha."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Efficiency, Liquidity, Market Makers."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 32 (Transaction costs and slippage)."
      },
      {
        "type": "paragraph",
        "text": "**Auction Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Auction markets match participant bids and offers, and transactions occur when prices are compatible under the matching rules. This structure supports continuous repricing as new orders arrive."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Orders compete in a book and the matching process determines the trade price."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Auction mechanics influence spread behavior, queue priority, and short-horizon price dynamics."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Dealer Markets, Centralized Markets, Price Discovery."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 31 (Order types and trade lifecycle), Chapter 34 (Limit order books and market making)."
      },
      {
        "type": "paragraph",
        "text": "**Dealer Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Dealer markets rely on intermediaries who quote buy and sell prices from inventory and stand ready to transact with clients. Pricing includes compensation for inventory risk, information risk, and balance-sheet usage."
      },
      {
        "type": "paragraph",
        "text": "Intuition: You trade against a quoting intermediary rather than only against another investor order."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Dealer behavior directly affects spreads, liquidity resilience, and execution cost."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Market Makers, Auction Markets, Liquidity."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 31 (Order types and trade lifecycle), Chapter 34 (Limit order books and market making)."
      },
      {
        "type": "paragraph",
        "text": "**Centralized Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Centralized markets concentrate trading activity in a primary venue or matching engine with unified rules. This often improves transparency and benchmark price formation by aggregating order flow in one place."
      },
      {
        "type": "paragraph",
        "text": "Intuition: One central location can make trade information and pricing more unified."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Centralization can improve transparency, standardization, and comparability of quotes."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Decentralized Markets, Auction Markets."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 31 (Order types and trade lifecycle)."
      },
      {
        "type": "paragraph",
        "text": "**Decentralized Markets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Decentralized markets distribute trading across multiple venues, bilateral networks, or counterparties instead of one central book. Fragmentation can improve access but also creates routing and data-consistency challenges."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Liquidity is fragmented across different pools of trading activity."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Fragmentation changes routing quality, observed price consistency, and execution complexity."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Centralized Markets, Dealer Markets, Liquidity."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 31 (Order types and trade lifecycle), Chapter 33 (Optimal execution)."
      },
      {
        "type": "paragraph",
        "text": "**Traders**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Traders are participants who actively buy and sell assets, typically with explicit timing and execution objectives. Their focus is usually on capturing shorter-horizon opportunities while controlling transaction costs and risk."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Traders focus on timing, entry/exit decisions, and execution quality."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Trader behavior contributes to intraday liquidity, volatility bursts, and short-term momentum/reversal patterns."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Investors, Hedgers, Speculators."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 13 (Cross-sectional momentum)."
      },
      {
        "type": "paragraph",
        "text": "**Hedgers**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Hedgers use offsetting positions to reduce exposure to unwanted price risk in assets, rates, or currencies. The objective is risk stabilization rather than maximizing directional return."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Hedging is risk transfer, not pure return seeking."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Hedgers improve risk control for producers, consumers, and portfolios facing uncertain future prices."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Derivatives, Speculators, Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 12 (Portfolio risk management), Chapter 29 (Hedging and replication)."
      },
      {
        "type": "paragraph",
        "text": "**Speculators**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Speculators intentionally take market risk to profit from expected price changes, relative value, or volatility shifts. By accepting risk that others wish to transfer, they can contribute to liquidity and price discovery."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They accept risk others prefer to offload."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Speculation can improve liquidity and price discovery but may amplify short-term volatility."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Traders, Hedgers, Volatility."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 13 (Cross-sectional momentum), Chapter 14 (Time-series momentum and trend following)."
      },
      {
        "type": "paragraph",
        "text": "**Market Makers**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Market makers continuously quote two-sided prices and provide immediacy by standing ready to buy or sell. They support market continuity, but their quotes also reflect adverse-selection and inventory-management risk."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They help keep the market tradable by supplying immediacy."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Market makers are central to spread formation, liquidity depth, and execution reliability."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Dealer Markets, Liquidity, Spread."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 31 (Order types and trade lifecycle), Chapter 34 (Limit order books and market making)."
      },
      {
        "type": "paragraph",
        "text": "**Stock**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A stock is an equity security representing fractional ownership in a corporation and a residual claim on its assets and earnings. The stock price reflects expectations about future cash flows, growth, risk, and discount rates."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Buying stock means buying a small ownership claim on the firm."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Stocks are a primary mechanism for long-term investing and corporate capital formation."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Shares, Equity, Common Stock, Preferred Stock."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Common Stock**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Common stock is the standard class of equity ownership, usually carrying voting rights and residual claims after higher-priority claims are paid. Its long-run return profile is tied to company growth and profitability."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Common shareholders are owners, but they are paid after debt holders and usually after preferred shareholders."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Most equity indexes and systematic equity strategies are built on common-stock returns."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Stock, Preferred Stock, Shares."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Preferred Stock**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Preferred stock is an equity-like security that generally has priority over common equity for dividends and liquidation proceeds. It often behaves between bonds and common stock in terms of income and risk characteristics."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It behaves like a hybrid between equity and fixed-income features."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Preferred shares can provide income characteristics with a different risk/return profile than common shares."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Stock, Common Stock, Dividends."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Assets**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Assets are economic resources controlled by an entity that are expected to provide future benefit, such as cash, receivables, inventory, or property. Asset composition and quality are key inputs in valuation and credit analysis."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Assets are what a firm owns that can generate future benefit."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Asset quality and composition affect valuation, solvency, and long-term return potential."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Liabilities, Equity, Capital."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 36 (Discretionary fundamental investing)."
      },
      {
        "type": "paragraph",
        "text": "**Liabilities**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Liabilities are present obligations to transfer value in the future, including debt, payables, and other commitments. Their size, maturity, and cost structure strongly affect solvency and equity risk."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Liabilities are claims that must be satisfied before residual value belongs to owners."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Liability burden affects default risk, financing flexibility, and equity value stability."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Assets, Equity, Capital Structure."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 36 (Discretionary fundamental investing)."
      },
      {
        "type": "paragraph",
        "text": "**Equity**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Equity is the residual ownership interest in a business after liabilities are subtracted from assets. It represents the portion of firm value attributable to owners and is the accounting foundation of stock ownership."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the owners' claim after all obligations are accounted for."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Equity is the core value concept behind stock ownership and valuation."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Assets, Liabilities, Stock."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 8 (Mean-variance portfolio construction)."
      },
      {
        "type": "paragraph",
        "text": "**Capital**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Capital refers to the financial resources used to fund operations, investment, and growth. It includes equity and debt funding and determines how quickly and efficiently a firm can execute its strategy."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Capital is the fuel that allows firms to invest, hire, and expand."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Access to capital and cost of capital shape growth, resilience, and competitiveness."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Equity, Debt, Primary Market."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Shares**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Shares are units that divide company equity into transferable ownership claims. Share count and share-class structure influence ownership percentage, control rights, dilution, and per-share financial metrics."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Shares determine what fraction of the company each owner holds."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Share count affects ownership percentage, dilution, voting power, and per-share metrics."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Stock, Equity, Common Stock."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 9 (CAPM, beta, and risk budgeting)."
      },
      {
        "type": "paragraph",
        "text": "**Dividends**"
      },
      {
        "type": "paragraph",
        "text": "Aliases: Dividens"
      },
      {
        "type": "paragraph",
        "text": "Definition: Dividends are distributions of corporate earnings to shareholders, typically paid in cash on a scheduled basis. They are a major component of total return for many long-horizon equity strategies."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Dividends are one channel of investor return alongside price appreciation."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Dividend policy affects total return composition, valuation expectations, and income-focused strategies."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Stock, Preferred Stock, Cash Flow."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Private Company**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A private company is a firm whose ownership interests are not listed for broad public trading on an exchange. Ownership is usually concentrated, and reporting, liquidity, and valuation transparency differ from public markets."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Ownership is usually concentrated among founders, employees, and private investors."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Private firms typically have lower liquidity and different disclosure standards than public firms."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Public Company, Primary Market, Liquidity."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Public Company**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A public company is a firm with shares that can be bought and sold by the public in regulated markets. Public listing increases access to capital but also introduces ongoing disclosure, governance, and market-pricing discipline."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Public listing allows broader investor participation and continuous market pricing."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Public-company access and transparency support benchmarking, index construction, and scalable analysis."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Private Company, Stock, Secondary Market."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 36 (Discretionary fundamental investing)."
      },
      {
        "type": "paragraph",
        "text": "**Bonds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A bond is a debt security in which an issuer borrows capital from investors and agrees to repay principal at maturity plus periodic interest payments. Bond pricing depends on credit quality, time to maturity, market rates, and investor risk appetite."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Buying a bond is generally lending money in exchange for scheduled cash flows."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Bonds are foundational for portfolio construction, risk management, and benchmarking because they behave differently from equities across regimes."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Yield, Duration, Credit Risk, Financial Markets."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Capital Appreciation**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Capital appreciation is the increase in the market value of an asset over time, measured as the difference between purchase price and current or sale price. It captures the price-growth component of return before income payments are added."
      },
      {
        "type": "paragraph",
        "text": "Intuition: If you buy at a lower price and later the asset is worth more, that gain is capital appreciation."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Separating appreciation from income helps you evaluate total return, style exposure, and the source of performance."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Returns, Total Return, Dividends, Valuation."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 2 (Returns, compounding, and wealth growth), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Market Capitalization**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Market capitalization is the total market value of a company’s equity, commonly calculated as share price multiplied by shares outstanding. It is a market-based size measure used in indexing, portfolio weighting, and factor analysis."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It answers the question, \"What is the market currently valuing this company’s equity at?\""
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Market cap affects index inclusion, liquidity expectations, risk profile, and style classification (large-cap, mid-cap, small-cap)."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Shares, Stock, Indexes, Liquidity."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 10 (Factor investing and smart beta)."
      },
      {
        "type": "paragraph",
        "text": "**Market Order**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A market order is an instruction to buy or sell immediately at the best currently available price in the market. It prioritizes execution speed over exact price, so final fill price may deviate from the last quote during fast conditions."
      },
      {
        "type": "paragraph",
        "text": "Intuition: You are saying \"fill this now,\" even if the price moves while the order is being executed."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Market orders are simple and fast, but they can increase slippage and transaction cost when liquidity is thin."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Limit Order, Slippage, Liquidity, Bid-Ask Spread."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 31 (Order types and trade lifecycle), Chapter 32 (Transaction costs and slippage)."
      },
      {
        "type": "paragraph",
        "text": "**Bankruptcy**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Bankruptcy is a legal insolvency process used when an individual or company cannot meet debt obligations and must restructure or liquidate under court supervision. In corporate bankruptcies, creditor claims are generally paid before equity holders."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is a formal reset process when liabilities can no longer be serviced under normal operations."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Bankruptcy risk is central to credit analysis, downside protection, and equity valuation under stress scenarios."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Liabilities, Credit Risk, Default, Capital Structure."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 3 (Risk, volatility, and drawdowns), Chapter 36 (Discretionary fundamental investing)."
      },
      {
        "type": "paragraph",
        "text": "**Debt Obligation**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A debt obligation is a legal commitment by a borrower to repay borrowed funds under stated terms, usually including payment dates, interest conditions, and consequences for nonpayment. It defines what is owed, to whom, and when."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is a formal \"you borrowed this, now you must pay it back\" contract."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Most fixed-income instruments are built on debt obligations, so understanding this idea is required for bonds, credit risk, and default analysis."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Bonds, Issuer, Principal, Default."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 12 (Portfolio risk management)."
      },
      {
        "type": "paragraph",
        "text": "**Issuer**"
      },
      {
        "type": "paragraph",
        "text": "Definition: The issuer is the entity that creates and sells a security to raise financing, then must meet the security's contractual terms. In bonds, the issuer is responsible for interest payments and principal repayment."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The issuer is the borrower on the other side of your bond purchase."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Issuer quality is a core driver of credit risk, bond pricing, and default probability."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Bonds, Debt Obligation, Credit Risk, Default."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 36 (Discretionary fundamental investing)."
      },
      {
        "type": "paragraph",
        "text": "**Bondholder**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A bondholder is the investor who owns a bond and therefore holds a contractual claim to the bond's promised coupon payments and principal repayment, subject to issuer solvency and bond terms."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The bondholder is the lender in the borrower-lender relationship."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Bondholder rights, payment priority, and risk exposure differ from stockholder ownership rights."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Bonds, Issuer, Coupon, Principal."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Income Investing**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Income investing is an approach focused on generating regular cash flow from investments, typically through interest or dividends, rather than relying mainly on price appreciation. Bond portfolios are often used for this objective."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The goal is steady payouts, not only asset price growth."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Many portfolio designs separate growth allocations from income allocations to match risk tolerance and spending needs."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Bonds, Dividends, Coupon, Yield."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Face Value**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Face value is the stated amount a bond issuer promises to repay at maturity, regardless of the bond's current market trading price. It is also the base amount used to calculate coupon payments."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the amount written on the bond contract as the final repayment value."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Face value anchors bond cash-flow math and helps interpret premium or discount pricing."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Par Value, Principal, Maturity, Coupon."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Par Value**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Par value is another term for a bond's reference principal amount at issuance and repayment, and is typically equal to face value in standard bond structures."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Par value is the bond's baseline \"book amount\" used for repayment and coupon calculations."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Traders and analysts use par as the comparison point for whether a bond trades at premium or discount."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Face Value, Principal, Premium, Discount."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Principal**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Principal is the core amount borrowed or invested before interest, and in bonds it is the amount repaid at maturity to the bondholder if no default occurs."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Principal is the base amount; interest is paid on top of it."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Principal repayment timing and certainty drive a large share of fixed-income risk and valuation."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Face Value, Par Value, Maturity, Default."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 12 (Portfolio risk management)."
      },
      {
        "type": "paragraph",
        "text": "**Maturity**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Maturity is the endpoint of a bond's life when final contractual repayment of principal is due. It is also used more generally to describe how long until a bond's obligations conclude."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Maturity is the bond's finish date."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Time to maturity strongly influences price sensitivity to rates, risk profile, and expected return behavior."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Maturity Date, Principal, Interest Rate Risk, Yield Curve."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 20 (Volatility forecasting and targeting)."
      },
      {
        "type": "paragraph",
        "text": "**Default**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Default occurs when a borrower fails to meet required debt payments under contract, such as missing coupon payments or failing to repay principal at maturity."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Default means promised debt payments were not made as agreed."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Default risk is central to credit pricing, portfolio downside management, and bond valuation."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Default Risk, Credit Risk, Bankruptcy, Issuer."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 12 (Portfolio risk management)."
      },
      {
        "type": "paragraph",
        "text": "**Coupon**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A coupon is the periodic interest payment promised by a bond issuer, usually expressed as a percentage of face value and paid on a defined schedule."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The coupon is the bond's regular interest paycheck."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Coupon size and frequency shape expected cash flow, yield behavior, and reinvestment needs."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Yield, Current Yield, Principal, Face Value."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Maturity Date**"
      },
      {
        "type": "paragraph",
        "text": "Definition: The maturity date is the specific calendar date when a bond's principal is contractually due to be repaid by the issuer."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the exact date the bond should \"cash out\" principal."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Maturity-date structure affects duration, liability matching, and interest-rate sensitivity."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Maturity, Principal, Face Value, Yield Curve."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 33 (Optimal execution)."
      },
      {
        "type": "paragraph",
        "text": "**Premium**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A bond trades at a premium when its market price is above face value, typically because its coupon is relatively attractive compared with current market interest rates."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Premium means investors pay more than par for stronger cash-flow terms."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Premium pricing affects yield calculations and expected return if held to maturity."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Discount, Face Value, Coupon, Yield to Maturity."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Discount**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A bond trades at a discount when its market price is below face value, often because its coupon is less attractive than prevailing market yields or credit risk is perceived as higher."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Discount means the bond is bought below par and can pull toward par by maturity."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Discount bonds can show different total-return paths and risk signals versus premium bonds."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Premium, Face Value, Yield, Credit Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Yield**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Yield is the rate of return implied by a bond's cash flows relative to its market price, not just the coupon rate printed on the instrument. Different yield measures answer different return questions."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Yield tells you what return you are effectively getting at today's price."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Yield is a central metric for comparing bonds, pricing risk, and evaluating fixed-income opportunity cost."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Coupon, Current Yield, Yield to Maturity, Yield Curve."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Current Yield**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Current yield equals annual coupon income divided by current bond price, giving a quick income-return snapshot but excluding capital gains/losses and reinvestment assumptions."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It shows income return based on today's price, not full total return to maturity."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Current yield is easy to compute, but it can mislead if used as a complete return measure."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Yield, Coupon, Yield to Maturity, Price."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Yield to Maturity**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Yield to maturity is the internal rate of return implied if a bond is purchased at current price, all promised payments are received, and the bond is held to maturity with reinvestment at that rate."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the bond's all-in annualized return estimate if you hold it to the end."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: YTM is a standard benchmark for comparing bonds with different prices, coupons, and maturities."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Yield, Current Yield, Maturity, Discount."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Interest Rate Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Interest rate risk is the risk that bond prices move adversely when market interest rates change, with longer-maturity bonds usually showing larger sensitivity."
      },
      {
        "type": "paragraph",
        "text": "Intuition: If rates rise, existing fixed-coupon bonds usually lose market value."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Interest-rate exposure is one of the largest risk drivers in fixed-income portfolios."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Yield, Maturity, Duration, Yield Curve."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 12 (Portfolio risk management)."
      },
      {
        "type": "paragraph",
        "text": "**Credit Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Credit risk is the risk that a borrower fails to meet debt obligations fully and on time, causing losses through missed payments, restructuring, or default."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the risk that the issuer cannot or does not pay as promised."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Credit risk affects required yield spread, portfolio losses, and diversification decisions."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Default Risk, Default, Issuer, Bankruptcy."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 12 (Portfolio risk management)."
      },
      {
        "type": "paragraph",
        "text": "**Default Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Default risk is the probability and impact of a debt issuer failing to make required contractual payments. It is a specific, severe form of credit deterioration."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Default risk asks, \"What if promised payments stop?\""
      },
      {
        "type": "paragraph",
        "text": "Why it matters: It directly drives pricing, credit spreads, and downside stress outcomes for bond investors."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Credit Risk, Default, Bankruptcy, Issuer."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 12 (Portfolio risk management)."
      },
      {
        "type": "paragraph",
        "text": "**Inflation Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Inflation risk is the risk that rising price levels reduce the real purchasing power of future fixed payments, so nominal cash flows buy less over time."
      },
      {
        "type": "paragraph",
        "text": "Intuition: You may get paid exactly as promised, but your money may be worth less in real terms."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Inflation risk is crucial when evaluating long-duration fixed-income assets and real return targets."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Inflation-Protected Bonds, Yield, Real Return, Interest Rate Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 2 (Returns, compounding, and wealth growth)."
      },
      {
        "type": "paragraph",
        "text": "**Liquidity Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Liquidity risk is the risk that an asset cannot be sold quickly at a fair price without meaningful price concessions, especially during stressed market conditions."
      },
      {
        "type": "paragraph",
        "text": "Intuition: You might need to sell, but the market may not offer a good exit."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Liquidity risk can turn small valuation changes into larger realized losses due to poor execution."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Liquidity, Illiquid, Bid-Ask Spread, Slippage."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 32 (Transaction costs and slippage)."
      },
      {
        "type": "paragraph",
        "text": "**Illiquid**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Illiquid describes an asset or market with limited trading depth, wider spreads, and slower execution, making transactions harder to complete near quoted prices."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Illiquid means hard to trade fast without paying a penalty."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Illiquidity increases transaction costs and can amplify downside during volatility spikes."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Liquidity, Liquidity Risk, Bid-Ask Spread, Market Impact."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 32 (Transaction costs and slippage)."
      },
      {
        "type": "paragraph",
        "text": "**Reinvestment Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Reinvestment risk is the risk that interim cash flows (like coupon payments) can only be reinvested at lower rates than originally expected, reducing realized return versus projected return."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Your cash keeps arriving, but maybe at worse future rates."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: It matters for income-focused bond strategies where compounding assumptions drive outcomes."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Coupon, Yield to Maturity, Interest Rate Risk, Income Investing."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Government Bonds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Government bonds are debt securities issued by national governments to finance spending and manage public debt. Credit quality varies by country, currency, and policy credibility."
      },
      {
        "type": "paragraph",
        "text": "Intuition: You are lending to a government, not a corporation."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Government bonds often serve as benchmark rates, collateral assets, and defensive allocations in portfolios."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Bonds, Issuer, Yield Curve, Credit Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Municipal Bonds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Municipal bonds are debt instruments issued by state and local governments to fund public projects such as infrastructure, schools, and utilities."
      },
      {
        "type": "paragraph",
        "text": "Intuition: You are lending to a city or state for public financing needs."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Municipal bonds play a major role in local public finance and often have distinct tax and credit considerations."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Bonds, Government Bonds, Issuer, Credit Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Corporate Bonds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Corporate bonds are debt securities issued by companies to raise capital for operations, expansion, acquisitions, or refinancing. They usually offer higher yields than government bonds to compensate for higher credit risk."
      },
      {
        "type": "paragraph",
        "text": "Intuition: You are lending to a company in exchange for fixed-income cash flows."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Corporate credit spreads and default trends are key signals for both bond and equity market regimes."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Bonds, Credit Risk, Yield, Issuer."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 36 (Discretionary fundamental investing)."
      },
      {
        "type": "paragraph",
        "text": "**Fixed Coupon**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A fixed coupon is a bond interest rate that remains constant for the life of the bond, producing predictable nominal coupon cash flows."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The coupon rate is locked in and does not reset each period."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Fixed-coupon structures create direct sensitivity to interest-rate changes and inflation expectations."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Coupon, Floating Rate, Interest Rate Risk, Yield."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Floating Rate**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A floating-rate bond has a coupon that resets periodically based on a reference benchmark plus or minus a spread, causing income to adjust with market rate conditions."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The bond's coupon moves with rates instead of staying fixed."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Floating-rate structures can reduce duration-like rate sensitivity compared with fixed-coupon bonds."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Fixed Coupon, Coupon, Interest Rate Risk, Yield."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Zero-Coupon Bond**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A zero-coupon bond pays no periodic coupon and is issued at a discount, with investor return coming from the difference between purchase price and face-value repayment at maturity."
      },
      {
        "type": "paragraph",
        "text": "Intuition: No periodic interest checks; value compounds to par by maturity."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Zeroes have strong duration sensitivity and are useful for liability matching and term-structure analysis."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Discount, Face Value, Maturity, Yield to Maturity."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Callable**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Callable means the issuer has the contractual right to redeem a bond before maturity, typically after a stated protection period and under specified terms."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The issuer can \"take the bond back early\" if conditions favor refinancing."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Callability changes upside/downside asymmetry for investors and affects valuation versus non-callable bonds."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Bonds, Issuer, Interest Rate Risk, Yield."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 12 (Portfolio risk management)."
      },
      {
        "type": "paragraph",
        "text": "**Inflation-Protected Bonds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Inflation-protected bonds are securities whose principal and/or coupon cash flows are adjusted to an inflation index, designed to preserve real purchasing power over time."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Payments rise with inflation so real value erosion is reduced."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: These bonds are key tools for managing inflation risk in long-term portfolios."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Inflation Risk, Real Return, Government Bonds, Yield."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Yield Curve**"
      },
      {
        "type": "paragraph",
        "text": "Definition: The yield curve is the relationship between yields and maturities for comparable bonds, often displayed as a line from short-term to long-term maturities."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the market's \"shape\" of rates across time horizons."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Yield-curve shape influences valuation, discounting, borrowing costs, and macro regime interpretation."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Yield, Maturity, Normal Yield Curve, Flat Yield Curve."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 42 (What should come first for this project)."
      },
      {
        "type": "paragraph",
        "text": "**Normal Yield Curve**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A normal yield curve slopes upward, meaning longer maturities have higher yields than shorter maturities, often reflecting time, inflation uncertainty, and term premium."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Lend longer, usually demand more yield."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: A normal curve is often treated as a baseline market condition in macro and fixed-income analysis."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Yield Curve, Flat Yield Curve, Interest Rate Risk, Inflation Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 40 (Comparing investing and trading styles)."
      },
      {
        "type": "paragraph",
        "text": "**Flat Yield Curve**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A flat yield curve indicates that yields across short and long maturities are close together, suggesting limited term premium differences or transitionary macro expectations."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Short-term and long-term rates look almost the same."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Flat curves can signal shifting growth/inflation expectations and changing fixed-income risk tradeoffs."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Yield Curve, Normal Yield Curve, Yield, Interest Rate Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 40 (Comparing investing and trading styles)."
      },
      {
        "type": "paragraph",
        "text": "**ETF**"
      },
      {
        "type": "paragraph",
        "text": "Definition: An ETF (exchange-traded fund) is a pooled fund whose shares trade on an exchange throughout the day like a stock, while the fund itself holds a basket of underlying assets."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is a fund wrapper with intraday tradability."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: ETFs are a core building block for passive exposure, tactical positioning, and low-friction portfolio implementation."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Mutual Fund, Underlying Portfolio, NAV, Benchmark."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Mutual Fund**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A mutual fund is a pooled investment vehicle where investors buy or redeem shares directly with the fund company, typically at end-of-day NAV instead of intraday market prices."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is a pooled fund designed more for scheduled investing than intraday trading."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Mutual fund structure affects pricing timing, liquidity experience, fees, and long-horizon implementation choices."
      },
      {
        "type": "paragraph",
        "text": "Related terms: ETF, NAV, Expense Ratio, Sales Loads."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Pooled Investment Vehicle**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A pooled investment vehicle combines capital from many investors into one professionally managed portfolio with shared holdings, costs, and return stream."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Many people contribute money into one common basket."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Pooling improves accessibility and diversification for investors who do not want to manage each security directly."
      },
      {
        "type": "paragraph",
        "text": "Related terms: ETF, Mutual Fund, Investment Vehicle, Diversification."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Investment Vehicle**"
      },
      {
        "type": "paragraph",
        "text": "Definition: An investment vehicle is the legal or financial structure used to hold and deploy capital, such as ETFs, mutual funds, trusts, or separate accounts."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the container that carries your strategy into markets."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Vehicle structure determines trading rules, taxation, costs, and operational constraints."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Pooled Investment Vehicle, Vehicle, ETF, Mutual Fund."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 39 (Hybrid workflows)."
      },
      {
        "type": "paragraph",
        "text": "**Vehicle**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Vehicle is shorthand for the structure or wrapper through which an investor accesses an asset class or strategy."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the format you use to invest, not the idea itself."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Two vehicles with similar holdings can still produce different net outcomes due to fees, liquidity, and execution mechanics."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Investment Vehicle, ETF, Mutual Fund, Expense Ratio."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Underlying Portfolio**"
      },
      {
        "type": "paragraph",
        "text": "Definition: The underlying portfolio is the actual set of securities or assets held by a fund, which drives the fund's intrinsic value and risk profile."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is what is inside the fund wrapper."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Fund behavior ultimately comes from underlying holdings, not from the name or marketing label."
      },
      {
        "type": "paragraph",
        "text": "Related terms: ETF, Securities, NAV, Market Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 8 (Mean-variance portfolio construction)."
      },
      {
        "type": "paragraph",
        "text": "**NAV**"
      },
      {
        "type": "paragraph",
        "text": "Aliases: Net Asset Value"
      },
      {
        "type": "paragraph",
        "text": "Definition: NAV is the per-share value of a fund's net assets, calculated as assets minus liabilities divided by shares outstanding."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the accounting value per fund share."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: NAV anchors valuation for pooled funds and helps identify premium/discount behavior in exchange-traded products."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Market Price, ETF, Mutual Fund, Underlying Portfolio."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 31 (Order types and trade lifecycle)."
      },
      {
        "type": "paragraph",
        "text": "**Market Price**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Market price is the actual transaction price formed by supply and demand in open trading, which can differ from model or accounting values."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is what buyers and sellers are willing to pay right now."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Execution and realized returns depend on market price, not theoretical value."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Price Discovery, NAV, Liquidity, Market Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 31 (Order types and trade lifecycle)."
      },
      {
        "type": "paragraph",
        "text": "**Creation and Redemption Mechanism**"
      },
      {
        "type": "paragraph",
        "text": "Definition: The creation and redemption mechanism is the process through which authorized participants exchange baskets of underlying assets for ETF shares (and vice versa), helping align ETF market prices with underlying value."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Large institutions can add or remove ETF shares to keep pricing in line."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: This mechanism is a key reason broad ETFs usually trade close to intrinsic value."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Authorized Participants, Arbitrage, ETF, NAV."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 34 (Limit order books and market making)."
      },
      {
        "type": "paragraph",
        "text": "**Authorized Participants**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Authorized participants are large financial institutions permitted to create and redeem ETF shares directly with the fund sponsor in large blocks."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They are the special intermediaries that connect ETF shares to underlying baskets."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Their activity supports ETF liquidity, tighter pricing, and arbitrage efficiency."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Creation and Redemption Mechanism, Arbitrage, ETF, Liquidity."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 34 (Limit order books and market making)."
      },
      {
        "type": "paragraph",
        "text": "**Arbitrage**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Arbitrage is the practice of exploiting temporary price differences between equivalent or closely linked assets to earn near-risk-neutral profit after costs."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Buy where cheap, sell where expensive, close the gap."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Arbitrage pressure helps keep related markets consistent and improves price efficiency."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Price Discovery, ETF, Authorized Participants, Efficiency."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 18 (Equity statistical arbitrage)."
      },
      {
        "type": "paragraph",
        "text": "**Passive ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Passive ETFs aim to track a specified index or ruleset rather than make discretionary security selections to outperform the market."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They follow a benchmark instead of trying to beat it stock by stock."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Passive ETFs are central to low-cost diversification and broad-market exposure."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Passive Investing, Benchmark, Index, Tracking Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Active ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Active ETFs use manager or model discretion to choose holdings and adjust exposures, rather than strictly replicating an index."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Someone is making ongoing portfolio decisions instead of pure index tracking."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Active ETFs can target alpha or risk control, but usually introduce more discretion and cost."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Actively Managed, Passive ETFs, Manager Risk, Benchmark."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 21 (ML-based forecasting and features)."
      },
      {
        "type": "paragraph",
        "text": "**Passive Investing**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Passive investing is an approach focused on capturing market or factor exposure by tracking predefined indexes or systematic rules with minimal discretionary forecasting."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Own the market exposure consistently instead of predicting every winner."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: It lowers complexity and often lowers fees and turnover for long-horizon strategies."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Passive ETFs, Benchmark, Index, Diversification."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Actively Managed**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Actively managed means portfolio allocations are selected through discretionary or model-driven decisions intended to outperform or reshape risk relative to a benchmark."
      },
      {
        "type": "paragraph",
        "text": "Intuition: A manager or model is making active bets."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Active management can add flexibility but introduces manager skill risk and usually higher costs."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Active ETFs, Passively Managed, Manager Risk, Benchmark."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 36 (Discretionary fundamental investing)."
      },
      {
        "type": "paragraph",
        "text": "**Passively Managed**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Passively managed means a portfolio is run to replicate an index or fixed ruleset with limited discretionary changes."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Follow the rulebook instead of making frequent judgment calls."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Passive implementation improves transparency and cost predictability in many strategies."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Passive Investing, Passive ETFs, Index Mutual Funds, Benchmark."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Benchmark**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A benchmark is a reference standard used to evaluate whether a portfolio's return and risk outcomes are strong, weak, or in line with an appropriate alternative."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the scorecard you compare your strategy against."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Performance numbers are hard to interpret without a relevant benchmark."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Index, Tracking Risk, Passive Investing, Market Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Index**"
      },
      {
        "type": "paragraph",
        "text": "Definition: An index is a rules-based measure representing the performance of a defined market segment through a selected and weighted basket of securities."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is a systematic summary of a market, not one tradable company."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Index design drives benchmark choice, passive strategy implementation, and portfolio diagnostics."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Benchmark, Market-Cap Weighted, Equal Weighted, Price Weighted."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Tracking Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Tracking risk is the risk that a fund's realized return deviates from its target index or benchmark due to fees, implementation frictions, or portfolio construction differences."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Your tracker may not perfectly follow what it is supposed to follow."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: It affects whether passive products deliver the exposure investors expect."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Benchmark, Tracking Error, Passive ETFs, Expense Ratio."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Diversification**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Diversification is the practice of spreading exposure across multiple assets, sectors, or risk drivers to reduce concentration risk in a single position or theme."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Do not rely on one bet to carry the whole portfolio."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Diversification is foundational to risk-adjusted portfolio construction."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Market Risk, Portfolio Design, Equity ETFs, Bond ETFs."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Tradability**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Tradability describes how easily and practically an instrument can be entered or exited in the market, considering timing, depth, and execution constraints."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It measures how usable an instrument is in real trading conditions."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: High tradability improves implementation quality and lowers operational friction."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Liquidity, Flexibility, Market Price, Transaction Costs."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 32 (Transaction costs and slippage)."
      },
      {
        "type": "paragraph",
        "text": "**Flexibility**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Flexibility is the degree to which an instrument can be used across different execution tactics, timing windows, and portfolio objectives."
      },
      {
        "type": "paragraph",
        "text": "Intuition: More flexibility means more ways to deploy or adjust exposure."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Flexibility influences how quickly and efficiently investors can implement risk or return views."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Tradability, Liquidity, ETF, Market Order."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 33 (Optimal execution)."
      },
      {
        "type": "paragraph",
        "text": "**Accessibility**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Accessibility is the ease with which investors can obtain exposure to a strategy or market, considering minimum capital, platform availability, and operational complexity."
      },
      {
        "type": "paragraph",
        "text": "Intuition: How easy it is for regular investors to use the product."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Accessible products broaden participation and speed strategy adoption."
      },
      {
        "type": "paragraph",
        "text": "Related terms: ETF, Mutual Fund, Investment Vehicle, Expense Ratio."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 41 (Matching methods to data and skill level)."
      },
      {
        "type": "paragraph",
        "text": "**Market Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Market risk is the risk of losses caused by broad market movements that affect many securities at once, regardless of individual security specifics."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Even good holdings can drop when the whole market falls."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: It is the base risk layer most diversified portfolios still carry."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Diversification, Benchmark, Volatility, Equity ETFs."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 3 (Risk, volatility, and drawdowns)."
      },
      {
        "type": "paragraph",
        "text": "**Leverage**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Leverage is the use of borrowed capital or derivative exposure to magnify gains and losses relative to invested equity."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It increases exposure beyond your cash base."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Leverage can improve upside but sharply increases downside sensitivity and path risk."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Leveraged ETFs, Derivatives, Market Risk, Volatility."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 11 (Risk parity and equal risk contribution)."
      },
      {
        "type": "paragraph",
        "text": "**Derivatives**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Derivatives are contracts whose value is derived from underlying assets, rates, indexes, or other references, and are used for hedging, speculation, and exposure shaping."
      },
      {
        "type": "paragraph",
        "text": "Intuition: The contract value depends on something else moving."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Derivatives can improve risk control or capital efficiency, but they add complexity and model risk."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Leverage, Hedgers, Speculators, Options."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 27 (Options foundations)."
      },
      {
        "type": "paragraph",
        "text": "**Leveraged ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Leveraged ETFs are ETFs designed to deliver a multiple of the daily return of a reference index, typically through derivatives and daily rebalancing."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They amplify daily moves up and down."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Daily reset effects can cause long-horizon performance to diverge from simple multiple expectations."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Leverage, Derivatives, Inverse ETFs, Volatility."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 30 (Volatility as an asset class)."
      },
      {
        "type": "paragraph",
        "text": "**Inverse ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Inverse ETFs are funds engineered to move opposite to a target index's daily performance, often using derivatives and short exposure."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They are built to rise when the referenced market falls on that day."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Useful for tactical hedging, but path dependence and daily reset mechanics can create unexpected long-run behavior."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Leveraged ETFs, Derivatives, Market Risk, Hedging."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 29 (Hedging and replication)."
      },
      {
        "type": "paragraph",
        "text": "**Equity ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Equity ETFs are ETFs primarily holding stock exposures, often organized by broad markets, sectors, styles, or regions."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They are stock baskets wrapped in an exchange-traded fund."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Equity ETFs are common tools for scalable market exposure and allocation tilts."
      },
      {
        "type": "paragraph",
        "text": "Related terms: ETF, Diversification, Benchmark, Sector and Thematic ETFs."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 10 (Factor investing and smart beta)."
      },
      {
        "type": "paragraph",
        "text": "**Bond ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Bond ETFs are ETFs holding fixed-income securities and offering tradable exposure to duration, credit, and yield profiles."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They deliver bond exposure in a stock-like trading wrapper."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: They simplify fixed-income access while introducing intraday pricing and liquidity considerations."
      },
      {
        "type": "paragraph",
        "text": "Related terms: ETF, Bonds, Yield, Liquidity Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Commodity ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Commodity ETFs provide exposure to commodity markets through physical holdings, futures contracts, or related securities."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They are a liquid wrapper for commodity exposure."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Commodity exposures can diversify macro risk but can have roll, storage, and structure effects."
      },
      {
        "type": "paragraph",
        "text": "Related terms: ETF, Commodity Markets, Derivatives, Market Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 15 (Carry strategies)."
      },
      {
        "type": "paragraph",
        "text": "**International ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: International ETFs hold securities outside the investor's home market and can target global, regional, or single-country exposures."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They let you add non-domestic exposure in one product."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: International allocation changes currency, policy, and regional growth risk in portfolio design."
      },
      {
        "type": "paragraph",
        "text": "Related terms: ETF, Diversification, Equity ETFs, Benchmark."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Sector and Thematic ETFs**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Sector and thematic ETFs concentrate exposure in specific industries or long-horizon themes rather than broad market indexes."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They are targeted ETF bets on a slice of the market."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Concentration can increase potential upside and downside relative to broad-market products."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Equity ETFs, Benchmark, Diversification, Market Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 10 (Factor investing and smart beta)."
      },
      {
        "type": "paragraph",
        "text": "**Securities**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Securities are tradable financial instruments representing ownership claims, debt claims, or contractual rights."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Securities are the core building blocks that funds and portfolios hold."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Understanding security type determines how risk, return, and cash flows should be interpreted."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Stock, Bonds, Derivatives, Underlying Portfolio."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Expense Ratio**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Expense ratio is the annual management and operating cost charged by a fund as a percentage of assets, reducing investor net return."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the ongoing fee drag baked into the fund."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Small fee differences compound meaningfully over long horizons."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Mutual Fund, ETF, Sales Loads, Passive Investing."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Sales Loads**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Sales loads are distribution or transaction charges applied when buying and/or selling certain fund shares."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They are entry or exit tolls on fund transactions."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Loads directly reduce invested capital or realized proceeds."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Front-End Load, Back-End Load, Expense Ratio, Mutual Fund."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Front-End Load**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A front-end load is a sales charge paid when fund shares are purchased, typically as a percentage of the invested amount."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Part of your money is taken as a fee before full investment starts."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: It reduces initial deployed capital and lowers compounding base."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Sales Loads, Back-End Load, Mutual Fund, Expense Ratio."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Back-End Load**"
      },
      {
        "type": "paragraph",
        "text": "Definition: A back-end load is a sales charge paid when fund shares are redeemed or sold, often declining with holding period in certain fee schedules."
      },
      {
        "type": "paragraph",
        "text": "Intuition: You pay a fee when leaving the fund."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Exit charges affect liquidity decisions and realized after-fee returns."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Sales Loads, Front-End Load, Mutual Fund, Liquidity."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "paragraph",
        "text": "**Manager Risk**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Manager risk is the risk that discretionary portfolio decisions underperform the benchmark or intended objective due to poor security selection, timing, or process."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Results depend on decision quality, and decisions can be wrong."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: It is a key tradeoff between active and passive fund structures."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Actively Managed, Benchmark, Active ETFs, Tracking Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 36 (Discretionary fundamental investing)."
      },
      {
        "type": "paragraph",
        "text": "**Index Mutual Funds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Index mutual funds are passively managed mutual funds built to replicate a benchmark index rather than outperform through active selection."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Mutual fund structure plus index-tracking objective."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: They combine simple long-horizon implementation with typically lower management costs."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Mutual Fund, Index, Passively Managed, Passive Investing."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 6 (Passive indexing and benchmarking)."
      },
      {
        "type": "paragraph",
        "text": "**Bond Mutual Funds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Bond mutual funds are mutual funds that primarily invest in fixed-income securities across government, corporate, or municipal segments."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They are pooled bond portfolios in mutual fund format."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: They provide diversified credit and duration exposure but still carry fixed-income risks."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Mutual Fund, Bonds, Interest Rate Risk, Credit Risk."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Balanced Funds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Balanced funds are pooled portfolios combining equities and fixed income in one product to provide mixed growth and income exposure."
      },
      {
        "type": "paragraph",
        "text": "Intuition: One fund contains both stock and bond allocations."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Balanced structures simplify allocation for investors seeking blended risk profiles."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Mutual Fund, Equity ETFs, Bond ETFs, Portfolio Design."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Money Market Mutual Funds**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Money market mutual funds invest in short-term, high-quality debt instruments and prioritize liquidity and capital stability over high return."
      },
      {
        "type": "paragraph",
        "text": "Intuition: They are cash-management style funds, not growth engines."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Useful for cash parking and near-term liquidity management in portfolios."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Mutual Fund, Liquidity, Securities, Yield."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 32 (Transaction costs and slippage)."
      },
      {
        "type": "paragraph",
        "text": "**Portfolio Design**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Portfolio design is the process of choosing asset classes, weights, constraints, and rebalancing rules to align investments with return goals and risk limits."
      },
      {
        "type": "paragraph",
        "text": "Intuition: It is the blueprint for how the portfolio is built and maintained."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Good design usually matters more than single-asset selection in long-horizon outcomes."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Diversification, Strategic Asset Allocation, Benchmark, Rebalancing."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 7 (Strategic asset allocation)."
      },
      {
        "type": "paragraph",
        "text": "**Market-Cap Weighted**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Market-cap weighted means index or portfolio weights are proportional to each constituent's market capitalization."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Bigger companies get bigger weights."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: This is the dominant weighting method in broad passive indexes and strongly shapes concentration risk."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Index, Market Capitalization, Equal Weighted, Price Weighted."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 10 (Factor investing and smart beta)."
      },
      {
        "type": "paragraph",
        "text": "**Equal Weighted**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Equal weighted means each constituent receives the same portfolio weight regardless of company size."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Every name contributes equally at rebalance time."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Equal weighting changes factor exposure, turnover, and concentration relative to cap-weighted indexes."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Index, Market-Cap Weighted, Price Weighted, Rebalancing."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments), Chapter 10 (Factor investing and smart beta)."
      },
      {
        "type": "paragraph",
        "text": "**Price Weighted**"
      },
      {
        "type": "paragraph",
        "text": "Definition: Price weighted means constituents with higher share prices receive greater influence in index movement, regardless of company size."
      },
      {
        "type": "paragraph",
        "text": "Intuition: Higher-priced stocks matter more in index moves."
      },
      {
        "type": "paragraph",
        "text": "Why it matters: Price weighting can create unintuitive exposure compared with cap-weighting."
      },
      {
        "type": "paragraph",
        "text": "Related terms: Index, Market-Cap Weighted, Equal Weighted, Benchmark."
      },
      {
        "type": "paragraph",
        "text": "Chapter references: Chapter 1 (Financial markets and instruments)."
      },
      {
        "type": "subheading",
        "text": "Trading and market microstructure terms"
      },
      {
        "type": "unorderedList",
        "items": [
          "Trading and market microstructure terms placeholder for Glossary.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      },
      {
        "type": "subheading",
        "text": "Math and statistics terms"
      },
      {
        "type": "unorderedList",
        "items": [
          "Math and statistics terms placeholder for Glossary.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      },
      {
        "type": "subheading",
        "text": "Implementation and coding terms"
      },
      {
        "type": "unorderedList",
        "items": [
          "Implementation and coding terms placeholder for Glossary.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      }
    ]
  }
];

export default function Page() {
  const chapter = chapterByRoute(partSlug, chapterSlug);

  if (!chapter) {
    notFound();
  }

  return <ChapterPageLayout chapter={chapter} sectionContent={sectionContent} />;
}
