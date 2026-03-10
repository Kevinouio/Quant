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
