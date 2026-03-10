import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { MarketTimeseriesChart } from "../../../../components/interactive/MarketTimeseriesChart";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-01-foundations";
const chapterSlug = "financial-markets-and-instruments";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Markets",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Now we actually begin with our starting topic of just a broad view of finance and investing."
      },
      {
        "type": "paragraph",
        "text": "In economics and finance, the word [[market|market]] refers to any arrangement in which [[buyers|buyers]] and [[sellers|sellers]] come together to exchange goods, services, or financial assets. A market doesn't need to be a physical location as it can represent many different things. It could represent a store, a stock exchange, a website, or even an information system of trade between individuals or companies. What makes something a market just depends on the interaction between [[supply|supply]] and [[demand|demand]] of a given asset."
      },
      {
        "type": "paragraph",
        "text": "At its core, a market is just a mechanism for organizing trade. It helps determine who gets what at what price and under what conditions. Because of this, it becomes the central foundations of economic life. They influence not only just prices, but also the production, consumption, wages, investment, and the allocation of resources across society."
      },
      {
        "type": "paragraph",
        "text": "A more formal definition of a market can be defined as:"
      },
      {
        "type": "paragraph",
        "text": "**A system or institution in which exchange takes place and in which prices are formed through the interaction of buyers and sellers.**"
      },
      {
        "type": "paragraph",
        "text": "Some more proper examples of a market are"
      },
      {
        "type": "unorderedList",
        "items": [
          "A farmers market allows people to buy and sell produce.",
          "A housing market allows people to buy, sell, or rent homes.",
          "A labor market allows workers to offer labor and employers to hire them.",
          "A stock market allows investors to buy and sell shares of ownership in companies."
        ]
      },
      {
        "type": "subheading",
        "text": "Functions of a Market"
      },
      {
        "type": "paragraph",
        "text": "A market performs several important functions that explains why they are vital in economics and finance."
      },
      {
        "type": "paragraph",
        "text": "**(A)** Facilitate Exchange"
      },
      {
        "type": "paragraph",
        "text": "The most obvious role of a market is to allow trade to even occur. Without markets, individuals would have great difficulty finding others who are willing to exchange with this. Markets essentially reduce this difficulty by bringing together participants with opposite needs or preferences."
      },
      {
        "type": "paragraph",
        "text": "An instance of this is suppose a person has extra wheat and wants to sell that extra for some money or something of value. Another person then wants some wheat. Then a market would help facilitate and provide the setting to which this exchange can happen."
      },
      {
        "type": "paragraph",
        "text": "**(B)** Determining Prices"
      },
      {
        "type": "paragraph",
        "text": "The price of a given good isn't given arbitrarily. In markets that are more dependent on the individuals, it more depends on the interactions between how much buyers are willing to pay and how much sellers are willing to accept. This general process is known as [[price discovery|price discovery]]."
      },
      {
        "type": "paragraph",
        "text": "If many buyers compete for a scarce good, the price tends to rise. If sellers are eager to get rid of an item but buyers are scarce, the price tends to fall. The market is therefore the institution through which value is translated into an actual transaction price."
      },
      {
        "type": "paragraph",
        "text": "**(C)** Allocating Resources"
      },
      {
        "type": "paragraph",
        "text": "Markets help direct resources toward their most valued uses. If consumers strongly demand a certain product, its price may rise, encouraging firms to produce more of it. If demand falls, production may decline. In this way, markets send signals about what should be produced, how much should be produced, and where resources should be directed."
      },
      {
        "type": "paragraph",
        "text": "This is one reason markets are important in large economies. They help coordinate countless individual decisions without requiring a single central authority to plan every exchange."
      },
      {
        "type": "paragraph",
        "text": "**(D)** Conveying Information"
      },
      {
        "type": "paragraph",
        "text": "Prices in markets often contain information. A rising price may indicate scarcity, increasing demand, or positive expectations about the future. A falling price may indicate the opposite. In financial markets especially, prices reflect the beliefs, expectations, and reactions of many participants."
      },
      {
        "type": "paragraph",
        "text": "Because of this, economists often say that markets aggregate information. Each participant may have only a small piece of knowledge, but market prices reflect the combined effect of many decisions made by many people."
      },
      {
        "type": "paragraph",
        "text": "*Note before moving on: There are going to be more financial jargon moving forward and for words that you are unfamiliar with. Refer to the Glossary for any words that you are unfamiliar with. *"
      },
      {
        "type": "subheading",
        "text": "How are prices Formed?"
      },
      {
        "type": "paragraph",
        "text": "The price of somethign ina market reflects on the balance between the willingness of buyers to purchase and willingness of sellers to sell. However, in real markets, price formation is often more complicated than a simple supply and demand curve."
      },
      {
        "type": "paragraph",
        "text": "In [[financial markets|financial markets]], this can be influenced by:"
      },
      {
        "type": "unorderedList",
        "items": [
          "expectations about future profits",
          "interest rates",
          "news and announcements",
          "investor sentiment",
          "[[liquidity]] conditions",
          "algorithmic trading",
          "risk preferences",
          "regulation and policy"
        ]
      }
    ]
  },
  {
    "title": "Stocks",
    "blocks": [
      {
        "type": "paragraph",
        "text": "So there exists other different markets than the ones that I just listed. The main one that mostly everyone know about is a stock. A [[stock|stock]] is a small piece of ownership of a company. When a person decides to buy a stock, they become a shareholder as they own a part of the company. Stocks are one of the primary ways for companies to raise their [[capital|capital]] and one of the primary ways in which investors participate in the growth and profitability in a business. Because a stock represents the ownership of a company rather than a loan, the value of a stock depends on the companies performance and perceived worth of their company."
      },
      {
        "type": "paragraph",
        "text": "A stock and also be referred to as [[equity|equity]], a claim on the residual value of a company after its obligations have been satisfied. ######## Equities can also be defined as $$ Assets - Liabilities = Equity$$ Assets things that a person or company own that have a value and liabilities is what the company owes or the amount in \"debt\" they are in."
      },
      {
        "type": "subheading",
        "text": "Why do we have Stocks?"
      },
      {
        "type": "paragraph",
        "text": "Companies allow people to buy stocks of their companies for many reasons. But altogether, the reason why they want to is in raise their **capital**. They want people to buy the stock to properly"
      },
      {
        "type": "unorderedList",
        "items": [
          "Do research",
          "Develop products",
          "Hire employees",
          "etc."
        ]
      },
      {
        "type": "paragraph",
        "text": "When a company sells stock, it receives funds from investors in exchange for partial ownership of the business. Unlike debt financing, equity financing does not require the company to make fixed interest payments. However, it does require the company to share ownership and future profits with shareholders."
      },
      {
        "type": "paragraph",
        "text": "So from this perspective of the company, issuing stock can be attractive because it provides capital without creating mandatory repayment obligations. From the perspective of an investor, purchasing a stock is beneficial as they can benefit from the successes from the business."
      },
      {
        "type": "subheading",
        "text": "Private vs Public Companies"
      },
      {
        "type": "paragraph",
        "text": "Not all companies are free to be invested in by the public. These companies are called private companies. A *private company* is a company where it limit the people who can invest in the company (e.g. founders, individuals, private equity firms, or employees). This is the area for companies like Citadel, Two Sigma, and other private firms mostly do their work in. An example of a private company would be SpaceX as if you try and search their current stock value, it will become apparent that it is not public information."
      },
      {
        "type": "paragraph",
        "text": "Now for a public company, it is a company whose shares are made public for people to buy and invest in. Companies that are typically considered to be a public company fall into the New York Stock Exchange or Nasdaq."
      },
      {
        "type": "subheading",
        "text": "Different Kinds of Stocks"
      },
      {
        "type": "paragraph",
        "text": "Although you can just throw the word stock around as just some \"share\" of a company, there are two distinct kinds of stocks that you could be talking about."
      },
      {
        "type": "paragraph",
        "text": "A [[common stock|common stock]] is the standard form of corporate ownership. Shareholders typically have:"
      },
      {
        "type": "paragraph",
        "text": "-voting rights in corporate matters, -a claim on company profits through [[dividends|dividends]] if dividends are declared, -the potential to benefit from appreciation in the company’s share price."
      },
      {
        "type": "paragraph",
        "text": "However, common shareholders are also the lowest in priority if the company is liquidated or goes bankrupt. They are paid only after criditors and preferred shareholders have been satisfied."
      },
      {
        "type": "paragraph",
        "text": "A [[preferred stock|preferred stock]] generally provides shareholders with priority over common shareholders in receiving dividends and in liquidation. In many cases, preferred stock pays a fixed dividend, making it resemble a hybrid between stock and debt."
      },
      {
        "type": "paragraph",
        "text": "However, preferred shareholders often have limited voting rights or none at all. Preferred stock is less central to beginner investing discussions, but it remains important in corporate finance."
      },
      {
        "type": "paragraph",
        "text": "The value of owning stock comes from the fact that shareholders participate in the company’s long-term financial life. If the business grows, becomes more profitable, or is viewed more favorably by investors, the stock may increase in value. If the business struggles, loses profitability, or faces uncertainty, the stock may decline. Because of this, a stock is not just a number moving on a screen. It is a market-priced claim on the future of a business."
      },
      {
        "type": "subheading",
        "text": "How do you earn?"
      },
      {
        "type": "paragraph",
        "text": "Investors generally earn returns from stocks in two main ways: capital appreciation and dividends. Capital appreciation occurs when the stock’s market price rises over time. Dividends are cash payments that some companies distribute to shareholders out of their earnings. Not every company pays dividends, since many prefer to reinvest profits back into growth, but both appreciation and dividends are central to why stocks are attractive as investments."
      },
      {
        "type": "paragraph",
        "text": "A stock’s price is determined in the market by the interaction of buyers and sellers. That price reflects what investors believe the company is worth today based on what they expect it to do in the future. For that reason, stock prices are heavily influenced by expectations about revenue, earnings, competition, innovation, leadership, and overall economic conditions. In practice, this means that a stock price often moves not simply because of what a company is now, but because of what investors think it will become."
      },
      {
        "type": "paragraph",
        "text": "It is also important to distinguish the stock’s price from the size of the company. A higher share price does not necessarily mean a company is larger or more valuable. What matters more is [[market capitalization|market capitalization]], which measures the total value of all the company’s outstanding shares. This gives a more complete picture of the market’s valuation of the company as a whole."
      },
      {
        "type": "subheading",
        "text": "Technicality of Trading"
      },
      {
        "type": "paragraph",
        "text": "Stocks trade in two main settings: the [[primary market|primary market]] and the [[secondary market|secondary market]]. In the primary market, the company itself issues shares to raise money. In the secondary market, investors trade shares with one another after those shares have already been issued. Most of the stock buying and selling people see through brokerage apps happens in the secondary market."
      },
      {
        "type": "paragraph",
        "text": "When investors trade stock, they do so by submitting orders. A [[market order|market order]] executes immediately at the best available price, while a limit order only executes at a specified price or better. At any moment, the bid represents what buyers are willing to pay, the ask represents what sellers are willing to accept, and the spread is the gap between those two prices. These details matter because they show that stock trading is not only about value, but also about market mechanics."
      },
      {
        "type": "paragraph",
        "text": "Another important feature of stocks is liquidity. Liquidity refers to how easily a stock can be bought or sold without causing a large movement in price. Stocks that trade heavily are usually more liquid, making them easier and cheaper to enter or exit. Less liquid stocks can be more difficult to trade efficiently and may carry additional practical risk beyond the company’s business fundamentals."
      },
      {
        "type": "paragraph",
        "text": "Although stocks offer meaningful upside, they also involve real risk. Since stockholders are owners rather than lenders, they stand lower in priority if a company fails. In [[bankruptcy|bankruptcy]], creditors and [[bonds|bondholders]] are generally paid before common shareholders. This means stockholders benefit greatly when a company succeeds, but they also bear substantial risk when it does not."
      }
    ]
  },
  {
    "title": "Bonds",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A bond is a financial instrument that represens a [[debt obligation|debt obligation]]. When an investor buys a bond, the investor is not purchasing ownership ina company or institution. Instead the investor is lending money to the issur of the bond. In return, the issuer promises to make future payments according to teh terms of the bond agreement. These payments usually include periodic interest and the repayment of the original amound borrowed at a specified future date."
      },
      {
        "type": "paragraph",
        "text": "Bonds are one of th eprimary ways that governments, corporations , and other institutions raise money. A national government may issue bonds to finance public spending, a city may issue bonds to fund infrastructure, and a corporation may issue bonds to expand operations or refinance existing debt. Because of this, bonds play a central role in both financial markets and the broader economy."
      },
      {
        "type": "subheading",
        "text": "What a Bond is"
      },
      {
        "type": "paragraph",
        "text": "At it's core, a bond is a formal promise. The [[issuer|issuer]] promises to repay borrowed money, and the [[bondholder|bondholder]] has a legal claim to those promised payments. This make bonds fundamentally different from [[stock|stocks]] since stocks are more not gurenteed to give an investor a gurenteed way to earn money."
      },
      {
        "type": "paragraph",
        "text": "Because bondholders are lenders rather than owners, their return usually comes from interest and repayment of principal rather than from direct participation in profits. This is why bonds are often associated with [[income investing|income investing]] and capital preservation, while stocks are more often associated with growth and equity ownership."
      },
      {
        "type": "paragraph",
        "text": "The contractual nature of bonds are one of their defining characteristics. Each bond comes with specific terms that describe how much is borrowed, how much interest is paid, how often payments are made, and when then debt must must be repaid. These terms make bonds more stucture and predictable than many other assets, though market value and risk still remain important."
      },
      {
        "type": "subheading",
        "text": "Components of a Bond"
      },
      {
        "type": "paragraph",
        "text": "There are different thigns about a bond before you should consider when buying/investing in a bond."
      },
      {
        "type": "paragraph",
        "text": "The [[face value|face value]], also called the [[par value|par value]] or [[principal|principal]], is the amount the issuer promises to repay at the end of the bond’s life. A bond might have a face value of $1,000, meaning that if the bond is held to [[maturity|maturity]] and the issuer does not [[default|default]], the bondholder will receive $1,000 at the maturity date."
      },
      {
        "type": "paragraph",
        "text": "The [[coupon|coupon]] is the interest payment promised by the bond. If a $1,000 bond has a 5% annual coupon, then it pays $50 per year in interest. In practice, many bonds make coupon payments semiannually, so that $50 annual coupon would be paid as two $25 payments over the year."
      },
      {
        "type": "paragraph",
        "text": "The [[maturity date|maturity date]] is the date on which the issuer repays the principal. Some bonds mature in a few months, while others mature in 10, 20, or even 30 years. The time remaining until repayment is often called the bond’s term to maturity."
      },
      {
        "type": "paragraph",
        "text": "These three ideas work together to describe the bond’s promised cash flows. A bondholder typically receives a stream of coupon payments over time and then receives the final principal repayment at maturity. That flow of future payments is what gives the bond its value."
      },
      {
        "type": "subheading",
        "text": "Bond Prices and Yields"
      },
      {
        "type": "paragraph",
        "text": "Even though a bond has a face value, its market price does not have to equal that face value at every moment. Bonds are bought and sold in financial markets, and the price investors are willing to pay depends on the attractiveness of the bond's promised cash flws relative to current market conditions."
      },
      {
        "type": "paragraph",
        "text": "A bond's price is the amount an investor must pay to acquire it in the market. This price may be equal ot face value, above face value, or below face value. When a bond sells above face value, it is said to trade at a [[premium|premium]]. When it sells below face value, it is said to trade at a [[discount|discount]]."
      },
      {
        "type": "paragraph",
        "text": "Closely related to the price is the concept of [[yield|yield]], which refers to the return an investor receives from the bond relative to the price paid for it. One common yield measure is the [[current yield|current yield]], which compares the annual coupon payment to the current market price. A more complete measure is the [[yield to maturity|yield to maturity]], which is the return an investor would earn if the bond were purchased at its current price and help until maturity, assuming all promised payments are made."
      },
      {
        "type": "paragraph",
        "text": "The distinction between coupon and yield is very important as the coupon is fixed by the bond contract, but the yield changes as the bond’s market price changes. This means a bond may continue to pay the same coupon amount even while its yield moves up or down in the market."
      },
      {
        "type": "subheading",
        "text": "Why Bond Prices move"
      },
      {
        "type": "paragraph",
        "text": "One of the most important facts in bond investing is that bond prices and market interest rates move in opposite directions. This inverse relationship is central to understanding the bond market."
      },
      {
        "type": "paragraph",
        "text": "#Add a graph lkater for this"
      },
      {
        "type": "paragraph",
        "text": "Suppose an investor owns a bond that pays a 4% coupon. If newly issued bonds begin offering 6% coupons because market interest rates have risen, the older 4% bond becomes less attractive. To compensate for its lower coupon, its market price must fall so that new buyers can still earn a competitive return. Conversely, if market interest rates fall and new bonds only offer 2%, then the older 4% bond becomes more attractive, and its market price rises. (TRY AND GIVE A BETTER EXAMPLE HERE LATER)"
      },
      {
        "type": "paragraph",
        "text": "This relationship exists because a bond’s value comes from its future cash flows. Investors compare those cash flows with what they could earn elsewhere in the market. If current rates rise, old fixed payments are worth less. If current rates fall, old fixed payments become more valuable."
      },
      {
        "type": "paragraph",
        "text": "Time to maturity also matters. In general, long-term bonds are more sensitive to changes in interest rates than short-term bonds because their payments are spread farther into the future. This is why interest rate changes can have a larger effect on the prices of long-maturity bonds."
      },
      {
        "type": "subheading",
        "text": "Risks of Bonds"
      },
      {
        "type": "paragraph",
        "text": "Although bonds are often described as safer than stocks, they still involve several important risks."
      },
      {
        "type": "paragraph",
        "text": "The first is [[interest rate risk|interest rate risk]]. Since bond prices fall when interest rates rise, an investor who needs to sell a bond before maturity may experience a loss if rates have increased since the bond was purchased."
      },
      {
        "type": "paragraph",
        "text": "The second is [[credit risk|credit risk]], also called [[default risk|default risk]]. This is the risk that the issuer may fail to make promised interest payments or may fail to repay principal at maturity. Bonds issued by financially strong governments or corporations usually have lower credit risk, while bonds issued by weaker or heavily indebted entities usually have higher credit risk."
      },
      {
        "type": "paragraph",
        "text": "A third risk is [[inflation risk|inflation risk]]. If a bond pays fixed dollar amounts over time, inflation can reduce the real purchasing power of those payments. Even if the bondholder receives every promised payment, the money may buy less in the future than it would have at the time the bond was purchased."
      },
      {
        "type": "paragraph",
        "text": "Another important risk is [[liquidity risk|liquidity risk]]. Some bonds trade in highly active markets and can be sold easily, while others trade infrequently. If a bond is [[illiquid|illiquid]], an investor may have difficulty selling it quickly without accepting a lower price."
      },
      {
        "type": "paragraph",
        "text": "There is also [[reinvestment risk|reinvestment risk]], which arises when coupon payments received from a bond must be reinvested at lower interest rates than expected. This matters especially for investors who rely on a bond’s coupon income as part of a long-term strategy."
      },
      {
        "type": "paragraph",
        "text": "Together, these risks show that bonds should not simply be thought of as “safe money.” Their safety depends on the issuer, the maturity, the market environment, and the investor’s time horizon."
      },
      {
        "type": "subheading",
        "text": "Types of Bonds"
      },
      {
        "type": "paragraph",
        "text": "There are many different kinds of bonds, and understanding their differences is important."
      },
      {
        "type": "paragraph",
        "text": "[[Government bonds|Government bonds]] are issued by national governments. These are often viewed as among the safest bonds when issued by financially stable countries, since governments generally have stronger taxation and monetary powers than private firms."
      },
      {
        "type": "paragraph",
        "text": "[[Municipal bonds|Municipal bonds]] are issued by states, cities, and local governments. They are often used to finance public projects such as schools, roads, or water systems."
      },
      {
        "type": "paragraph",
        "text": "[[Corporate bonds|Corporate bonds]] are issued by companies. These generally carry more credit risk than government bonds, but they often offer higher yields in return."
      },
      {
        "type": "paragraph",
        "text": "Some bonds pay a [[fixed coupon|fixed coupon]], meaning the interest rate stays constant over the life of the bond. Others have a [[floating rate|floating rate]], where the coupon changes according to a benchmark interest rate."
      },
      {
        "type": "paragraph",
        "text": "A [[zero-coupon bond|zero-coupon bond]] does not make periodic interest payments. Instead, it is sold at a discount to face value and pays the full face value at maturity. The investor’s return comes from the difference between the purchase price and the final repayment."
      },
      {
        "type": "paragraph",
        "text": "Some bonds are [[callable|callable]], meaning the issuer has the right to repay the bond early. This benefits the issuer when rates fall, but it can be disadvantageous for investors because it limits the upside from falling interest rates."
      },
      {
        "type": "paragraph",
        "text": "There are also [[inflation-protected bonds|inflation-protected bonds]], whose payments are adjusted to reflect inflation. These are designed to help preserve the real purchasing power of the investor’s money."
      },
      {
        "type": "paragraph",
        "text": "Because bonds can be structured in many ways, investors must look carefully at the specific terms of each issue rather than assuming all bonds work identically."
      },
      {
        "type": "subheading",
        "text": "The Yield Curve and Interest Rates"
      },
      {
        "type": "paragraph",
        "text": "Bonds are not only individual investment instruments; they also help describe the broader structure of interest rates in the economy. One of the most important ideas here is the [[yield curve|yield curve]]."
      },
      {
        "type": "paragraph",
        "text": "(INSERT AN EXAMPLE YIELD CURVE HERE)"
      },
      {
        "type": "paragraph",
        "text": "The yield curve is a graph showing the relationship between interest rates and time to maturity for bonds of similar credit quality. For example, one may compare the yields on short-term, medium-term, and long-term government bonds."
      },
      {
        "type": "paragraph",
        "text": "A [[normal yield curve|normal yield curve]] slopes upward, meaning long-term bonds have higher yields than short-term bonds. This often reflects the idea that investors usually demand more compensation for lending money over longer periods."
      },
      {
        "type": "paragraph",
        "text": "A [[flat yield curve|flat yield curve]] suggests that short-term and long-term yields are close to each other. An inverted yield curve occurs when short-term yields are higher than long-term yields. This attracts a great deal of attention because it may indicate that investors expect slower economic growth or lower future interest rates."
      },
      {
        "type": "paragraph",
        "text": "The yield curve matters because it influences borrowing costs, investment decisions, and financial modeling. In finance, future cash flows are often discounted using interest rates that reflect time and risk, and bonds provide much of the information used to determine those discount rates."
      },
      {
        "type": "paragraph",
        "text": "This is one reason bonds are so important beyond simple investing. They are foundational to the mathematics of valuation, fixed-income analysis, and financial theory more broadly."
      },
      {
        "type": "subheading",
        "text": "Why Bonds Matter"
      },
      {
        "type": "paragraph",
        "text": "Bonds matter because they connect individual investing with large-scale economic activity. They allow borrowers to obtain funding, give investors a way to earn income, and provide information about interest rates, inflation expectations, and credit conditions."
      },
      {
        "type": "paragraph",
        "text": "For beginners, bonds are often introduced as straightforward loans. That description is correct, but it is only the beginning. In practice, bonds are instruments with defined cash flows, market prices, interest rate sensitivity, credit exposure, and a central place in modern finance."
      }
    ]
  },
  {
    "title": "Exchange-Traded Funds (ETFs)",
    "blocks": [
      {
        "type": "paragraph",
        "text": "ETFs are one of the most important modern investment vehicles because they combine two ideas that are very attractive to investors. First, they provide [[diversification|diversification]], since one ETF can hold many different assets. Second, they provide [[tradability|tradability]], since ETF shares can be bought and sold throughout the trading day just like [[common stock|common stock]]. Because of this combination, ETFs are often used by both beginners and professionals for long-term investing, short-term trading, hedging, and portfolio construction."
      },
      {
        "type": "paragraph",
        "text": "Although ETFs can appear simple at first glance, they involve several important concepts. To understand ETFs well, one must look at what they are, how they are structured, how they trade, what kinds of ETFs exist, and what risks they carry."
      },
      {
        "type": "subheading",
        "text": "What is an ETF?"
      },
      {
        "type": "paragraph",
        "text": "At its core, an [[ETF|ETF]] is a [[pooled investment vehicle|pooled investment vehicle]]. Many investors place money into the fund, and the fund uses that capital to buy a portfolio of assets according to a stated strategy. Each share of the ETF represents a proportional claim on that portfolio."
      },
      {
        "type": "paragraph",
        "text": "This makes an ETF similar in some ways to a [[mutual fund|mutual fund]], since both pool money from many investors into a single basket of assets. However, ETFs differ from mutual funds in one major way: ETF shares trade on an exchange during the day, while mutual fund shares are generally bought or redeemed at the end of the trading day at a single calculated price."
      },
      {
        "type": "paragraph",
        "text": "This exchange-traded structure gives ETFs flexibility. An investor can buy ETF shares in the morning, sell them later that day, place limit orders, or use them in more advanced trading strategies. Because of this, ETFs sit in an interesting position between long-term investment funds and actively traded securities."
      },
      {
        "type": "subheading",
        "text": "How ETFs Hold Assets"
      },
      {
        "type": "paragraph",
        "text": "An ETF is defined not only by the fact that it trades on an exchange, but also by the assets it holds. Some ETFs hold hundreds or even thousands of stocks. Others hold bonds from governments or corporations. Some track commodities such as gold, while others may hold foreign securities, sector-specific stocks, or a carefully designed portfolio based on some investment theme."
      },
      {
        "type": "paragraph",
        "text": "The collection of assets held by the ETF is often called its [[underlying portfolio|underlying portfolio]]. The value of the ETF ultimately comes from the value of these underlying holdings. If the assets inside the ETF rise in value, the ETF should generally rise as well. If the assets fall, the ETF should generally fall."
      },
      {
        "type": "paragraph",
        "text": "Because of this structure, ETFs are often used as a simple way to obtain exposure to a broad market or a specific segment of the economy. Rather than buying many individual stocks one by one, an investor can buy a single ETF that already contains a diversified basket."
      },
      {
        "type": "subheading",
        "text": "Net Asset Value and Market Price"
      },
      {
        "type": "paragraph",
        "text": "One of the most important things to understand about ETFs is that they have both an underlying value and a market price."
      },
      {
        "type": "paragraph",
        "text": "The underlying value is often described through the [[net asset value|net asset value]], or [[NAV|NAV]]. This is the total value of the assets held by the fund, minus liabilities, divided by the number of ETF shares outstanding. In other words, NAV represents the approximate per-share value of the assets inside the ETF."
      },
      {
        "type": "paragraph",
        "text": "At the same time, ETF shares trade in the market like stocks, which means they also have a [[market price|market price]] determined by supply and demand. Ideally, the market price stays close to the NAV, but the two are not always exactly identical at every moment."
      },
      {
        "type": "paragraph",
        "text": "This distinction is important. An investor does not buy ETF shares directly at the exact value of the underlying portfolio in the same way one might think of buying a simple basket at cost. Instead, the investor buys shares in an open market, where price can move slightly above or below the value of the underlying assets."
      },
      {
        "type": "subheading",
        "text": "Creation and Redemption"
      },
      {
        "type": "paragraph",
        "text": "One of the key reasons ETF prices usually remain close to NAV is the [[creation and redemption mechanism|creation and redemption mechanism]]. This is one of the most important structural features of ETFs."
      },
      {
        "type": "paragraph",
        "text": "Large financial institutions, often called [[authorized participants|authorized participants]], can create new ETF shares or redeem existing ETF shares in large blocks. If the ETF market price rises too far above the value of the underlying assets, these institutions can buy the underlying assets, deliver them to the fund, receive newly created ETF shares, and then sell those shares in the market. This tends to push the ETF price back down toward its underlying value."
      },
      {
        "type": "paragraph",
        "text": "Similarly, if the ETF market price falls too far below the value of the underlying assets, authorized participants can buy ETF shares in the market, redeem them with the fund for the underlying assets, and then sell those assets. This tends to push the ETF price back up."
      },
      {
        "type": "paragraph",
        "text": "This [[arbitrage|arbitrage]] process helps keep ETF prices close to the value of their holdings. It is one of the main features that distinguishes ETFs from other investment vehicles and helps explain why they function so efficiently in liquid markets."
      },
      {
        "type": "subheading",
        "text": "Passive and Active ETFs"
      },
      {
        "type": "paragraph",
        "text": "Many ETFs are designed to follow a specific [[index|index]]. These are often called [[passive ETFs|passive ETFs]]. A passive ETF does not try to outperform the market through constant security selection. Instead, it attempts to track the performance of some benchmark, such as a broad stock market index, a bond index, or a sector index."
      },
      {
        "type": "paragraph",
        "text": "For example, a passive ETF may try to replicate the performance of a large-cap stock index by holding the same companies in similar proportions. These ETFs are popular because they are usually transparent, diversified, and often have lower fees than more actively managed investment products."
      },
      {
        "type": "paragraph",
        "text": "However, not all ETFs are passive. Some are [[active ETFs|active ETFs]], meaning that managers choose the holdings according to a strategy rather than simply following an index. An active ETF may attempt to outperform the market, reduce risk, or focus on some specific investment theme. This is what more quant firms mostly try and do when you invest in the respective company."
      },
      {
        "type": "paragraph",
        "text": "This distinction matters because passive ETFs are generally designed for tracking and broad exposure, while active ETFs involve greater managerial discretion and often higher costs."
      },
      {
        "type": "subheading",
        "text": "Benefits of ETFs"
      },
      {
        "type": "paragraph",
        "text": "One of the biggest benefits of ETFs is [[diversification|diversification]]. Since a single ETF may hold many securities, investors can spread risk across many assets with one purchase. This is especially useful for investors who do not want to research and manage dozens of individual positions."
      },
      {
        "type": "paragraph",
        "text": "Another major benefit is [[liquidity|liquidity]] and [[flexibility|flexibility]]. Because ETF shares trade on exchanges, investors can buy and sell them throughout the day. This makes them more flexible than traditional mutual funds for many kinds of market participation."
      },
      {
        "type": "paragraph",
        "text": "ETFs are also often valued for their [[accessibility|accessibility]]. They allow investors to gain exposure to entire markets, industries, or strategies without having to buy every asset individually. A single ETF can provide exposure to U.S. stocks, international stocks, government bonds, energy companies, or even specific investing styles such as growth or value."
      },
      {
        "type": "paragraph",
        "text": "In many cases, ETFs also have relatively low expense ratios, especially those that simply track broad market indexes. This has made them central to long-term investing strategies such as passive indexing."
      },
      {
        "type": "subheading",
        "text": "Risks of ETFs"
      },
      {
        "type": "paragraph",
        "text": "Although ETFs are often efficient and convenient, they are not risk-free."
      },
      {
        "type": "paragraph",
        "text": "The most obvious risk is [[market risk|market risk]]. If the assets held by the ETF decline in value, then the ETF will usually decline as well. An ETF that tracks the stock market will still lose value when the market falls."
      },
      {
        "type": "paragraph",
        "text": "There is also [[tracking risk|tracking risk]], sometimes called tracking error. This is the risk that the ETF does not perfectly match the performance of the index or benchmark it is trying to follow. Small differences can arise because of fees, trading costs, cash holdings, or imperfect replication of the index."
      },
      {
        "type": "paragraph",
        "text": "Some ETFs face [[liquidity risk|liquidity risk]]. Even if the underlying idea of the ETF is attractive, the ETF shares themselves may not trade heavily, which can make them harder to buy or sell at favorable prices. In addition, if the assets inside the ETF are themselves illiquid, market stress can create pricing difficulties."
      },
      {
        "type": "paragraph",
        "text": "There are also more specialized risks. Some ETFs use [[leverage|leverage]], meaning they attempt to amplify returns. Others use [[derivatives|derivatives]], which can introduce additional complexity and risk. These funds may behave very differently from simple broad-market ETFs and are generally not the same kind of long-term holding that basic index ETFs are often intended to be."
      },
      {
        "type": "paragraph",
        "text": "So while ETFs are often presented as straightforward tools, the details of the specific ETF matter greatly."
      },
      {
        "type": "subheading",
        "text": "Types of ETFs"
      },
      {
        "type": "paragraph",
        "text": "There are many different kinds of ETFs, and understanding their categories is important."
      },
      {
        "type": "paragraph",
        "text": "[[Equity ETFs|Equity ETFs]] hold stocks and are among the most common. They may track a broad market index, a sector such as technology or energy, or a style such as growth, value, or small-cap stocks."
      },
      {
        "type": "paragraph",
        "text": "[[Bond ETFs|Bond ETFs]] hold fixed-income securities such as government bonds, corporate bonds, or municipal bonds. These allow investors to gain bond exposure through a traded fund structure rather than by purchasing individual bonds."
      },
      {
        "type": "paragraph",
        "text": "[[Commodity ETFs|Commodity ETFs]] provide exposure to commodities such as gold, silver, oil, or agricultural products. Some hold the physical commodity directly, while others gain exposure through futures contracts or related securities."
      },
      {
        "type": "paragraph",
        "text": "[[International ETFs|International ETFs]] hold securities from countries outside the investor’s home market. These can be broad global funds or funds focused on a particular country or region."
      },
      {
        "type": "paragraph",
        "text": "[[Sector and thematic ETFs|Sector and thematic ETFs]] focus on narrow parts of the economy or on investment themes. For example, one ETF may focus specifically on semiconductor companies, while another may target clean energy or artificial intelligence."
      },
      {
        "type": "paragraph",
        "text": "There are also [[leveraged ETFs|leveraged ETFs]] and [[inverse ETFs|inverse ETFs]], which are more specialized products. Leveraged ETFs try to magnify daily returns, while inverse ETFs attempt to move opposite to the performance of some benchmark. These are more complex and are generally very different from ordinary long-term investment ETFs."
      },
      {
        "type": "paragraph",
        "text": "ETFs and Portfolio Construction"
      },
      {
        "type": "paragraph",
        "text": "ETFs are especially important because of how easily they fit into [[portfolio design|portfolio design]]. Since they provide diversified exposure in a single security, they are often used as building blocks for larger investment strategies."
      },
      {
        "type": "paragraph",
        "text": "A long-term investor may use a few broad ETFs to build exposure to domestic stocks, international stocks, and bonds. A more active investor may use sector ETFs to tilt a portfolio toward certain industries. A trader may use ETFs to quickly gain or reduce market exposure without buying large numbers of individual securities."
      },
      {
        "type": "paragraph",
        "text": "This makes ETFs useful not just as individual products, but as flexible tools for implementing broader investment ideas. In many modern portfolios, ETFs serve as the main way investors translate theory into actual market positions."
      }
    ]
  },
  {
    "title": "Mutual Funds",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A [[mutual fund|mutual fund]] is an investment fund that pools money from many investors and uses that money to buy a portfolio of [[securities|securities]]. Like an ETF, a mutual fund gives investors exposure to many assets through a single [[investment vehicle|investment vehicle]]. However, mutual funds are structured and traded differently, and those differences are what matter most."
      },
      {
        "type": "paragraph",
        "text": "Mutual funds have historically been one of the main ways ordinary investors participate in financial markets, especially through retirement accounts and long-term savings plans. They are commonly used to invest in stocks, bonds, or a mixture of both, and they are often chosen for their convenience, professional management, and suitability for gradual long-term investing."
      },
      {
        "type": "subheading",
        "text": "How Mutual Funds Work"
      },
      {
        "type": "paragraph",
        "text": "The defining feature of a mutual fund is that investors do not trade its shares with each other on an exchange throughout the day. Instead, shares are bought from or redeemed with the fund company itself. Because of this, mutual funds are typically priced only once per day, after the market closes."
      },
      {
        "type": "paragraph",
        "text": "That daily price is called the [[net asset value|net asset value]], or [[NAV|NAV]]. The NAV is calculated by taking the total value of the fund’s assets, subtracting its liabilities, and dividing by the number of shares outstanding. All purchase and redemption orders made during the day are usually carried out at that same end-of-day NAV. (ADD DISPLAY NOTATION FOR CALCULATING THE NAV) $$ $$"
      },
      {
        "type": "paragraph",
        "text": "This is one of the main differences between mutual funds and ETFs. ETFs trade continuously during market hours, while mutual funds are transacted only at the day’s closing NAV. As a result, mutual funds are generally designed more for steady investing than for intraday trading."
      },
      {
        "type": "subheading",
        "text": "Active and Passive Mutual Funds"
      },
      {
        "type": "paragraph",
        "text": "Many mutual funds are [[actively managed|actively managed]], meaning professional managers choose the securities in the portfolio according to a specific strategy. Their goal may be to outperform a benchmark, generate income, reduce volatility, or pursue some other investment objective. In an active mutual fund, the success of the fund depends in part on the judgment and decisions of the manager."
      },
      {
        "type": "paragraph",
        "text": "Other mutual funds are [[passively managed|passively managed]]. These are often called index funds because they are designed to track the performance of a market index rather than trying to beat it. Instead of selecting securities based on ongoing research and judgment, a passive mutual fund attempts to replicate the composition of its benchmark as closely as possible."
      },
      {
        "type": "paragraph",
        "text": "This distinction is important because active and passive mutual funds differ not only in strategy, but often in cost. Passive funds usually have lower fees, while active funds typically charge more because they rely on research, trading, and managerial oversight."
      },
      {
        "type": "subheading",
        "text": "Why Investors Use Mutual Funds"
      },
      {
        "type": "paragraph",
        "text": "Mutual funds are especially useful for investors who want a structured and relatively hands-off way to invest over time. Since purchases and redemptions occur at end-of-day NAV rather than through continuous exchange trading, mutual funds are often well suited to regular contribution plans such as retirement investing."
      },
      {
        "type": "paragraph",
        "text": "They are also commonly used in employer-sponsored retirement accounts, college savings plans, and other long-term investment settings. In these contexts, the mutual fund structure is often less about trading flexibility and more about consistency, simplicity, and long-run portfolio growth."
      },
      {
        "type": "paragraph",
        "text": "Another reason mutual funds became so important is that they allow investors to access professional portfolio management without having to select and monitor every individual security themselves."
      },
      {
        "type": "subheading",
        "text": "Fees and Expenses"
      },
      {
        "type": "paragraph",
        "text": "One of the most important things to understand about mutual funds is cost. Most mutual funds charge an [[expense ratio|expense ratio]], which is an annual fee deducted from the fund’s assets to cover management and operating expenses. Although this fee may appear small, it reduces investor returns over time and can make a large difference over long horizons."
      },
      {
        "type": "paragraph",
        "text": "Some mutual funds may also charge [[sales loads|sales loads]]. A [[front-end load|front-end load]] is paid when shares are purchased, while a [[back-end load|back-end load]] is paid when shares are sold or redeemed. These charges do not apply to every fund, but they are important because they directly reduce the amount of money invested or ultimately received."
      },
      {
        "type": "paragraph",
        "text": "Because of this, two mutual funds with similar objectives can still produce meaningfully different outcomes if one has much higher fees than the other."
      },
      {
        "type": "subheading",
        "text": "Risks of Mutual Funds"
      },
      {
        "type": "paragraph",
        "text": "The risks of a mutual fund depend largely on what it owns. A stock mutual fund is exposed to market declines, while a bond mutual fund is exposed to interest rate changes, credit risk, and other fixed-income risks. So although the mutual fund structure can make investing more convenient, it does not eliminate the risks of the underlying assets."
      },
      {
        "type": "paragraph",
        "text": "Actively managed mutual funds also carry [[manager risk|manager risk]], which is the possibility that the manager’s decisions will perform poorly relative to the market or to the fund’s benchmark. Even when a fund is diversified, it can still lose value if the overall asset class or market segment it invests in performs badly."
      },
      {
        "type": "paragraph",
        "text": "So mutual funds should not be thought of as automatically safe. Their actual risk depends on their holdings, strategy, and management style."
      },
      {
        "type": "subheading",
        "text": "Types of Mutual Funds"
      },
      {
        "type": "paragraph",
        "text": "Mutual funds come in many forms. Equity mutual funds invest primarily in stocks. [[Bond mutual funds|Bond mutual funds]] invest in fixed-income securities. [[Balanced funds|Balanced funds]] combine stocks and bonds into one portfolio. [[Money market mutual funds|Money market mutual funds]] focus on short-term debt instruments and are generally used for stability and liquidity rather than high growth."
      },
      {
        "type": "paragraph",
        "text": "There are also [[index mutual funds|index mutual funds]], which track benchmarks, and more specialized funds that focus on specific sectors, geographic regions, or investment themes. Because of this variety, the term “mutual fund” refers mainly to the structure of the [[vehicle|vehicle]] rather than to one single investment style."
      },
      {
        "type": "subheading",
        "text": "Mutual Funds Compared to ETFs"
      },
      {
        "type": "paragraph",
        "text": "Mutual funds and ETFs are similar in that both give investors access to a portfolio through one fund. The main difference is in how they trade and how investors interact with them."
      },
      {
        "type": "paragraph",
        "text": "A mutual fund is priced once per day at NAV and is usually purchased directly from the fund company. An ETF trades on an exchange throughout the day, so its market price changes continuously like a stock. Because of that, ETFs are often preferred for trading flexibility, while mutual funds are often preferred for regular contributions and long-term investment plans."
      }
    ]
  },
  {
    "title": "Indexes and benchmarks",
    "blocks": [
      {
        "type": "subheading",
        "text": "Indexes and Benchmarks"
      },
      {
        "type": "paragraph",
        "text": "An [[index|index]] is a rule-based measure designed to represent the performance of a particular market, market segment, or asset class. Rather than being a single security, an index is usually a constructed portfolio or statistical measure whose value changes as the prices of its components change. In practice, indexes help investors summarize large and complex markets into a single reference point. For example, the S&P 500 is commonly used to represent large-cap U.S. equities, while the Russell 2000 is often used to represent small-cap U.S. equities. In fixed income markets, broad bond indexes are used to summarize the performance of groups of bonds with similar characteristics."
      },
      {
        "type": "paragraph",
        "text": "A [[benchmark|benchmark]] is a standard against which the performance of a portfolio, fund, or strategy is evaluated. In many cases, the benchmark is an index. For example, a large-cap U.S. equity fund may be judged relative to the S&P 500, while an investment-grade bond fund may be compared against a broad bond index. The benchmark provides context: a portfolio return by itself says little unless it is compared to an appropriate alternative. A return of 8% may be strong in one market environment and weak in another. Benchmarks give investors a reference for judging whether performance reflects general market movement or something distinctive about the portfolio itself."
      },
      {
        "type": "subheading",
        "text": "Why They Matter"
      },
      {
        "type": "paragraph",
        "text": "Indexes play a central role in [[passive investing|passive investing]]. A passive strategy usually does not attempt to predict which individual securities will outperform. Instead, it aims to track the performance of a chosen index as closely as possible. In this sense, the index becomes both the investment target and the standard of evaluation. This approach offers several advantages. First, it provides broad diversification by spreading exposure across many securities. Second, because index rules are usually transparent, investors can understand what the strategy is trying to capture. Third, passive strategies often involve lower turnover and lower management costs than active strategies, making them attractive for long-horizon investing."
      },
      {
        "type": "paragraph",
        "text": "The behavior of an index depends on how it is constructed. Index providers must decide which securities are eligible for inclusion, how large each position should be, and how often the index is updated. Some indexes are [[market-cap weighted|market-cap weighted]], meaning that larger companies receive larger weights. Others are [[equal weighted|equal weighted]], giving each constituent the same weight, or [[price weighted|price weighted]], where higher-priced securities have greater influence. These choices matter because they affect concentration, diversification, turnover, and overall performance. Two indexes that cover the “same” market can behave differently if they use different weighting and rebalancing rules."
      },
      {
        "type": "paragraph",
        "text": "Benchmarks are useful because they help separate broad market exposure from manager skill. If a portfolio earns 10% in a year when its benchmark earns 12%, then the manager underperformed the relevant market even though the portfolio had a positive return. On the other hand, if the benchmark earned 6%, then the same 10% return would represent outperformance. For passive funds, the benchmark defines the portfolio’s objective. For active funds, the benchmark provides a standard against which excess return can be measured. In both cases, the benchmark helps make performance evaluation more meaningful."
      },
      {
        "type": "subheading",
        "text": "Limitations"
      },
      {
        "type": "paragraph",
        "text": "At the same time, indexes and benchmarks have limitations. An index is not usually something an investor can hold directly; it is a reference portfolio rather than a tradable asset. Real-world funds face expenses, trading frictions, taxes, and operational constraints that can cause returns to differ from the index. In addition, the choice of benchmark is crucial. A poor benchmark can make a strategy appear better or worse than it truly is. A portfolio concentrated in small technology firms should not be evaluated against the same benchmark as a broadly diversified large-cap value fund. For this reason, understanding what a benchmark actually represents is just as important as understanding the portfolio itself."
      },
      {
        "type": "paragraph",
        "text": "In passive investing, then, indexes and benchmarks do more than provide summary statistics. They define the target, organize how performance is measured, and shape how investors think about diversification, cost, and long-run market exposure. I will go more in depth on this topic in Part 2 with a futher explanaiton of definitions and special topics that you should know for indexes."
      }
    ]
  },
  {
    "title": "Derivatives at a high level",
    "blocks": [
      {
        "type": "unorderedList",
        "items": [
          "Derivatives at a high level placeholder for Financial markets and instruments.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      }
    ]
  },
  {
    "title": "Exchanges, brokers, and market participants",
    "blocks": [
      {
        "type": "unorderedList",
        "items": [
          "Exchanges, brokers, and market participants placeholder for Financial markets and instruments.",
          "Add concrete definitions, formulas, and implementation notes in a later pass."
        ]
      }
    ]
  },
  {
    "title": "TODOs (author notes)",
    "blocks": [
      {
        "type": "unorderedList",
        "items": [
          "[ ] [graph] Add NVDA intraday line chart (1d, 1m)",
          "[ ] [graph] Add supply vs demand diagram",
          "[ ] [code] Replace Bonds placeholder with real example"
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
