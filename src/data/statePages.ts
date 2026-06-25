export interface StatePageData {
  slug: string;
  state: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    badge: string;
    headline: string;
    highlightedText: string;
    subtitle: string;
  };
  struggles: { emoji: string; title: string; desc: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const statePages: Record<string, StatePageData> = {
  illinois: {
    slug: "illinois",
    state: "Illinois",
    seo: {
      title: "Owner Operator Jobs Illinois | 80% Linehaul Revenue | XXII Century",
      description: "High-paying owner operator trucking jobs in Illinois. Earn 80% linehaul revenue, Fortune 500 contracts, weekly pay. Chicago-based carrier hiring now. Apply today!",
      keywords: "owner operator jobs Illinois, trucking jobs Chicago, CDL-A driver Illinois, owner operator Chicago, dry van trucking Illinois",
    },
    hero: {
      badge: "⚠️ Tired of inconsistency & high-mile runs eating into your profits?",
      headline: "Join XXII Century – High-Paying",
      highlightedText: "Owner Operator Jobs Illinois",
      subtitle: "Our Fortune 500 contracts guarantee premium rates. Protecting you from market volatility, greedy brokers, while keeping your truck in better condition and your income predictable.",
    },
    struggles: [
      { emoji: "💸", title: "Low Freight Rates", desc: "Fighting for $2/mile scraps on Illinois lanes while brokers pocket more from your work than you do" },
      { emoji: "🔧", title: "Equipment WEARING", desc: "Long hauls on I-80 and I-55 destroying your truck with high maintenance costs eating your profits" },
      { emoji: "📉", title: "Income UNCERTAINTY", desc: "Not knowing if you'll have Chicago-area freight next week to pay your bills and support your family" },
      { emoji: "⏰", title: "Payment DELAYS", desc: "Wondering IF and WHEN you'll get paid for loads already delivered from Illinois weeks ago" },
      { emoji: "🛣️", title: "Empty Miles NIGHTMARES", desc: "Driving hundreds of unpaid miles because the good Illinois freight is always somewhere else" },
    ],
    benefits: [
      "Earn $2.50-$4+/mile vs spot market scraps",
      "Keep 80% of gross while we handle logistics",
      "Freight guarantee to stop you hunting loads",
      "Shorter Average Runs at better rates",
      "Money hits your account Friday morning",
      "Exclusive Fortune 500 Contract Security",
      "24/7 Professional Dispatch Support",
      "AI fuel/routing to maximize profits",
      "Earn $1,000 per qualified driver referred",
    ],
    faqs: [
      {
        question: "What percentage do owner operators earn in Illinois?",
        answer: "Owner operators at XXII Century in Illinois earn competitive linehaul rates with 80% of gross revenue. Our Fortune 500 contracts mean consistent premium rates on Illinois lanes, not spot market scraps.",
      },
      {
        question: "Do I need my own trailer to drive in Illinois?",
        answer: "No. XXII Century provides trailer access through our fleet network including dry vans. You can use our trailers or bring your own for Illinois routes.",
      },
      {
        question: "What fuel discounts are available for Illinois drivers?",
        answer: "We provide large fleet volume fuel discounts at major truck stops across Illinois and nationwide. Our AI-powered fuel management tool finds the cheapest fuel on your route, saving you money on every trip.",
      },
      {
        question: "Can I choose my own routes as an Illinois owner operator?",
        answer: "Yes. We offer flexible scheduling with both dedicated Illinois lanes and open-board freight. Whether you prefer local Chicago-area runs or regional Midwest lanes, we match loads to your preferences.",
      },
      {
        question: "Is there a referral bonus for Illinois owner operators?",
        answer: "Yes - we offer an unlimited referral bonus program. Refer qualified drivers in Illinois and earn $1,000 per referral with no cap.",
      },
      {
        question: "How quickly can I start driving in Illinois?",
        answer: "Most qualified owner operators can start within 48 hours of completing orientation. Our streamlined onboarding process gets you on the road fast with Illinois freight ready to haul.",
      },
      {
        question: "What types of freight are available in Illinois?",
        answer: "We haul Fortune 500 freight including dry van loads. Illinois is a major freight hub with consistent volume from Chicago-area shippers and distribution centers.",
      },
      {
        question: "Does XXII Century offer detention pay in Illinois?",
        answer: "Yes. Our AI detention tracking tool ensures you're compensated for wait times at Illinois shippers and receivers. We fight for your time because your time is money.",
      },
      {
        question: "What support does XXII Century provide Illinois drivers?",
        answer: "You get 24/7 professional dispatch support, AI-powered fuel management, detention tracking, in-house maintenance access, and a dedicated team that treats you like a partner, not a number.",
      },
    ],
  },
  iowa: {
    slug: "iowa",
    state: "Iowa",
    seo: {
      title: "Owner Operator Jobs Iowa | Premium Freight Rates | XXII Century",
      description: "Owner operator trucking jobs in Iowa with premium rates. Fortune 500 contracts, weekly pay, 24/7 dispatch support. Midwest carrier hiring CDL-A drivers. Apply now!",
      keywords: "owner operator jobs Iowa, trucking jobs Iowa, CDL-A driver Iowa, owner operator Midwest, dry van trucking Iowa",
    },
    hero: {
      badge: "⚠️ Iowa drivers: tired of low rates and long empty miles?",
      headline: "Join XXII Century – Premium",
      highlightedText: "Owner Operator Jobs Iowa",
      subtitle: "Stop gambling on spot market loads from Iowa. Our Fortune 500 contracts guarantee premium rates and consistent freight so you can focus on driving, not hunting loads.",
    },
    struggles: [
      { emoji: "💸", title: "Spot Market GAMBLING", desc: "Fighting for scraps on Iowa freight boards while brokers profit more from your work than you do" },
      { emoji: "🔧", title: "Maintenance COSTS", desc: "Long Midwest hauls destroying your truck with expensive repairs eating into your Iowa earnings" },
      { emoji: "📉", title: "Inconsistent FREIGHT", desc: "Not knowing if Iowa will have enough loads next week to cover your bills and truck payment" },
      { emoji: "⏰", title: "Payment DELAYS", desc: "Waiting weeks to get paid for loads you already hauled out of Iowa distribution centers" },
      { emoji: "🛣️", title: "Empty Miles WASTE", desc: "Deadheading hundreds of unpaid miles across Iowa because the profitable loads are always elsewhere" },
    ],
    benefits: [
      "Earn $2.50-$4+/mile vs spot market scraps",
      "Keep 80% of gross while we handle logistics",
      "Guaranteed freight – no load hunting",
      "Shorter runs with better per-mile rates",
      "Weekly pay every Friday morning",
      "Fortune 500 contract stability",
      "24/7 Professional Dispatch Support",
      "AI fuel optimization saves hundreds monthly",
      "Earn $1,000 per qualified driver referred",
    ],
    faqs: [
      {
        question: "What can Iowa owner operators earn with XXII Century?",
        answer: "Iowa owner operators earn $2.50-$4+ per mile with 80% of gross revenue. Our Fortune 500 contracts provide consistent premium rates on Iowa and Midwest lanes.",
      },
      {
        question: "Do Iowa drivers need their own trailer?",
        answer: "No. We provide trailer access including dry vans. Iowa drivers can use our equipment or bring their own - your choice.",
      },
      {
        question: "What fuel discounts are available for Iowa drivers?",
        answer: "We provide fleet-level fuel discounts at major stops across Iowa and nationwide. Our AI fuel manager finds the cheapest fuel on your route automatically.",
      },
      {
        question: "Can Iowa owner operators choose their routes?",
        answer: "Yes. We offer dedicated Midwest lanes and open-board freight. Whether you want Iowa-regional runs or longer hauls, we match loads to your preference.",
      },
      {
        question: "Is there a referral bonus for Iowa drivers?",
        answer: "Yes - earn $1,000 per qualified driver referred with no cap. Refer fellow Iowa drivers and build additional income on top of your hauling revenue.",
      },
      {
        question: "How fast can I start driving from Iowa?",
        answer: "Most qualified owner operators start within 48 hours of completing orientation. We have Iowa freight ready and waiting for reliable drivers.",
      },
      {
        question: "What freight is available from Iowa?",
        answer: "Iowa is a strong agricultural and manufacturing freight market. We haul Fortune 500 loads including dry van freight from Iowa shippers.",
      },
      {
        question: "Does XXII Century pay detention for Iowa loads?",
        answer: "Yes. Our AI detention tool tracks your wait times at Iowa facilities and ensures you're compensated fairly. Your time is your money.",
      },
      {
        question: "What support do Iowa drivers receive?",
        answer: "24/7 dispatch support, AI fuel management, detention tracking, maintenance resources, and a team that treats Iowa drivers as partners, not numbers.",
      },
    ],
  },
  kentucky: {
    slug: "kentucky",
    state: "Kentucky",
    seo: {
      title: "Owner Operator Jobs Kentucky | High-Paying Freight | XXII Century",
      description: "Owner operator trucking jobs in Kentucky with top pay. Fortune 500 contracts, 80% gross revenue, weekly settlements. Apply for Kentucky CDL-A positions today!",
      keywords: "owner operator jobs Kentucky, trucking jobs Kentucky, CDL-A driver Kentucky, owner operator Louisville, dry van trucking Kentucky",
    },
    hero: {
      badge: "⚠️ Kentucky drivers: stop settling for low-pay loads and broker games",
      headline: "Join XXII Century – Top-Paying",
      highlightedText: "Owner Operator Jobs Kentucky",
      subtitle: "Kentucky's freight market deserves better than spot market gambles. Our Fortune 500 contracts lock in premium rates so your income stays predictable and your truck stays profitable.",
    },
    struggles: [
      { emoji: "💸", title: "Low-Pay LOADS", desc: "Kentucky lanes paying bottom dollar while brokers skim the best margins off your hard work" },
      { emoji: "🔧", title: "Truck BREAKDOWNS", desc: "Running I-75 and I-65 corridors wearing down your equipment faster than your earnings can keep up" },
      { emoji: "📉", title: "Freight DROUGHTS", desc: "Kentucky market drying up seasonally, leaving you scrambling for loads to cover monthly expenses" },
      { emoji: "⏰", title: "Slow PAYMENTS", desc: "Hauling loads from Louisville and Lexington but waiting weeks before seeing a dime in your account" },
      { emoji: "🛣️", title: "Deadhead MILES", desc: "Running empty across Kentucky to chase loads that barely cover fuel costs once you arrive" },
    ],
    benefits: [
      "Earn $2.50-$4+/mile on Kentucky lanes",
      "Keep 80% of gross – transparent settlements",
      "Guaranteed freight from Fortune 500 shippers",
      "Shorter runs with higher per-mile earnings",
      "Friday weekly pay – no delays, no excuses",
      "Exclusive contract security and stability",
      "24/7 Dispatch and driver support",
      "AI tools to cut fuel costs and track detention",
      "$1,000 referral bonus – unlimited",
    ],
    faqs: [
      {
        question: "What do Kentucky owner operators earn at XXII Century?",
        answer: "Kentucky owner operators earn $2.50-$4+ per mile with 80% of gross revenue. Fortune 500 contracts mean stable, premium rates on Kentucky freight lanes.",
      },
      {
        question: "Do Kentucky drivers need their own trailer?",
        answer: "No. We offer trailer access including dry vans for Kentucky-based drivers. Use ours or bring your own.",
      },
      {
        question: "Are there fuel discounts for Kentucky owner operators?",
        answer: "Yes. Fleet-level fuel discounts at major stops across Kentucky and nationwide, plus our AI fuel manager finds the cheapest fuel on every route.",
      },
      {
        question: "Can I pick my own Kentucky routes?",
        answer: "Absolutely. We offer dedicated Kentucky lanes and flexible open-board options. Choose regional Southeastern runs or longer hauls based on your preference.",
      },
      {
        question: "Is there a referral bonus for Kentucky drivers?",
        answer: "Yes - $1,000 per qualified driver referred with no cap. Build extra income by referring fellow Kentucky truckers.",
      },
      {
        question: "How soon can Kentucky drivers start?",
        answer: "Most qualified owner operators start within days. Our Kentucky freight pipeline is active and ready for reliable drivers.",
      },
      {
        question: "What freight moves through Kentucky?",
        answer: "Kentucky sits at a major logistics crossroads. We haul Fortune 500 freight including automotive, manufacturing, and consumer goods through Louisville, Lexington, and I-75/I-65 corridors.",
      },
      {
        question: "Does XXII Century pay detention in Kentucky?",
        answer: "Yes. AI detention tracking ensures you're paid for wait times at Kentucky shippers and receivers. We value your time.",
      },
      {
        question: "What driver support is available in Kentucky?",
        answer: "24/7 dispatch, AI-powered fuel and detention tools, maintenance resources, and a dedicated team focused on Kentucky driver success.",
      },
    ],
  },
  ohio: {
    slug: "ohio",
    state: "Ohio",
    seo: {
      title: "Owner Operator Jobs Ohio | Premium Rates & Weekly Pay | XXII Century",
      description: "Owner operator trucking jobs in Ohio paying top rates. Fortune 500 freight, 80% gross revenue, Friday pay. Hiring CDL-A drivers in Columbus, Cleveland, Cincinnati. Apply!",
      keywords: "owner operator jobs Ohio, trucking jobs Ohio, CDL-A driver Ohio, owner operator Columbus, dry van trucking Ohio",
    },
    hero: {
      badge: "⚠️ Ohio drivers: your work is worth more than spot market scraps",
      headline: "Join XXII Century – Premium",
      highlightedText: "Owner Operator Jobs Ohio",
      subtitle: "Ohio is one of the biggest freight markets in the country. Stop leaving money on the table with broker boards. Our Fortune 500 contracts deliver rates that match the value you bring.",
    },
    struggles: [
      { emoji: "💸", title: "Rate COMPRESSION", desc: "Ohio's massive freight market should mean big pay, but brokers squeeze your rates to minimum margins" },
      { emoji: "🔧", title: "Equipment WEAR", desc: "Running Ohio's I-70, I-71, and I-77 corridors puts brutal wear on your truck and your wallet" },
      { emoji: "📉", title: "Market SWINGS", desc: "Ohio freight volumes fluctuate wildly, leaving you guessing whether next week covers your bills" },
      { emoji: "⏰", title: "Payment WAITING", desc: "Delivering loads from Columbus, Cleveland, and Cincinnati but waiting weeks to see your money" },
      { emoji: "🛣️", title: "Empty BACKHAULS", desc: "Running empty across Ohio to chase the next load that barely pays enough to cover fuel and tolls" },
    ],
    benefits: [
      "Earn $2.50-$4+/mile on Ohio freight",
      "Keep 80% of gross – no hidden deductions",
      "Fortune 500 guaranteed freight volume",
      "Shorter, more profitable Ohio runs",
      "Weekly Friday settlements – guaranteed",
      "Contract stability beats spot market chaos",
      "24/7 Professional Dispatch Support",
      "AI fuel savings and detention tracking",
      "$1,000 driver referral bonus – no limit",
    ],
    faqs: [
      {
        question: "What can Ohio owner operators earn with XXII Century?",
        answer: "Ohio owner operators earn $2.50-$4+ per mile with 80% of gross revenue. Fortune 500 contracts mean premium, stable rates across Ohio's major freight corridors.",
      },
      {
        question: "Do Ohio drivers need their own trailer?",
        answer: "No. We provide trailer access including dry vans for Ohio-based drivers. Use our equipment or haul with your own.",
      },
      {
        question: "What fuel discounts do Ohio drivers get?",
        answer: "Fleet-level fuel discounts across Ohio and nationwide, plus AI-powered fuel management that automatically finds the cheapest fuel on your route.",
      },
      {
        question: "Can Ohio owner operators choose their lanes?",
        answer: "Yes. We offer dedicated Ohio lanes from Columbus, Cleveland, and Cincinnati plus flexible open-board options for regional or long-haul preferences.",
      },
      {
        question: "Is there a referral program for Ohio drivers?",
        answer: "Yes - $1,000 per qualified referral with no cap. Ohio drivers can earn substantial bonus income by referring fellow truckers.",
      },
      {
        question: "How quickly can Ohio drivers get started?",
        answer: "Most qualified Ohio owner operators start within days of orientation. We have active Ohio freight lanes ready for reliable drivers.",
      },
      {
        question: "What types of freight move through Ohio?",
        answer: "Ohio is a top-5 freight state. We haul Fortune 500 loads including automotive, retail, manufacturing, and consumer goods through all major Ohio corridors.",
      },
      {
        question: "Does XXII Century pay for detention time in Ohio?",
        answer: "Yes. Our AI detention tool tracks wait times at Ohio shippers and receivers to ensure you're compensated for every minute of your time.",
      },
      {
        question: "What support does XXII Century offer Ohio drivers?",
        answer: "24/7 dispatch, AI fuel and detention management, maintenance resources, and a dedicated team committed to Ohio driver profitability.",
      },
    ],
  },
  mississippi: {
    slug: "mississippi",
    state: "Mississippi",
    seo: {
      title: "Owner Operator Jobs Mississippi | Top Pay & Benefits | XXII Century",
      description: "Owner operator trucking jobs in Mississippi with premium pay. Fortune 500 contracts, 80% gross, weekly settlements, 24/7 support. Apply for Mississippi CDL-A positions!",
      keywords: "owner operator jobs Mississippi, trucking jobs Mississippi, CDL-A driver Mississippi, owner operator Jackson MS, dry van trucking Mississippi",
    },
    hero: {
      badge: "⚠️ Mississippi drivers: you deserve better than bottom-dollar freight rates",
      headline: "Join XXII Century – Top-Paying",
      highlightedText: "Owner Operator Jobs Mississippi",
      subtitle: "Mississippi drivers work hard but often get the short end on rates. Our Fortune 500 contracts deliver premium pay that reflects the value of your work and keeps your business profitable.",
    },
    struggles: [
      { emoji: "💸", title: "Bottom-Dollar RATES", desc: "Mississippi freight often pays the lowest rates in the country while brokers take their cut first" },
      { emoji: "🔧", title: "Maintenance DRAIN", desc: "Running I-20 and I-55 through Mississippi heat puts extra strain on your truck and repair budget" },
      { emoji: "📉", title: "Load SCARCITY", desc: "Mississippi's smaller freight market means fewer loads and more competition for the ones that exist" },
      { emoji: "⏰", title: "Delayed SETTLEMENTS", desc: "Hauling freight from Jackson and Gulfport but waiting too long before money hits your account" },
      { emoji: "🛣️", title: "Long DEADHEADS", desc: "Empty miles across Mississippi add up fast when the next paying load is states away" },
    ],
    benefits: [
      "Earn $2.50-$4+/mile – beat Mississippi averages",
      "Keep 80% of gross with zero hidden fees",
      "Guaranteed Fortune 500 freight access",
      "Shorter, higher-paying route options",
      "Weekly Friday pay – never wonder when",
      "Stable contracts beat market gambling",
      "24/7 Dispatch and operations support",
      "AI fuel savings across Southern routes",
      "$1,000 referral bonus – no cap",
    ],
    faqs: [
      {
        question: "What do Mississippi owner operators earn at XXII Century?",
        answer: "Mississippi owner operators earn $2.50-$4+ per mile with 80% of gross revenue. Our Fortune 500 contracts provide rates well above typical Mississippi freight market averages.",
      },
      {
        question: "Do Mississippi drivers need their own trailer?",
        answer: "No. We offer trailer access including dry vans for Mississippi-based drivers. Bring your own or use ours.",
      },
      {
        question: "What fuel discounts are available in Mississippi?",
        answer: "Fleet-level fuel discounts at major stops across Mississippi and the Southeast, plus AI fuel management to find the cheapest fuel on every route.",
      },
      {
        question: "Can Mississippi drivers choose their own routes?",
        answer: "Yes. We offer dedicated Southern lanes and flexible open-board freight. Choose regional runs or longer hauls based on what works for your schedule.",
      },
      {
        question: "Is there a referral bonus for Mississippi drivers?",
        answer: "Yes - $1,000 per qualified referral with no cap. Refer Mississippi drivers and earn bonus income on top of your hauling revenue.",
      },
      {
        question: "How fast can Mississippi drivers start?",
        answer: "Most qualified owner operators start within days of orientation. We have freight ready for Mississippi-area drivers.",
      },
      {
        question: "What freight is available from Mississippi?",
        answer: "We haul Fortune 500 freight including manufacturing, agricultural, and consumer goods through Mississippi's I-20 and I-55 corridors and Gulf Coast lanes.",
      },
      {
        question: "Does XXII Century pay detention for Mississippi loads?",
        answer: "Yes. AI detention tracking ensures Mississippi drivers are compensated for wait times at shippers and receivers across the state.",
      },
      {
        question: "What support do Mississippi drivers get?",
        answer: "24/7 dispatch support, AI-powered fuel and detention tools, maintenance access, and a team dedicated to Mississippi driver success.",
      },
    ],
  },
  "south-dakota": {
    slug: "south-dakota",
    state: "South Dakota",
    seo: {
      title: "Owner Operator Jobs South Dakota | Premium Freight | XXII Century",
      description: "Owner operator trucking jobs in South Dakota with premium rates. Fortune 500 contracts, weekly pay, full support. Hiring CDL-A drivers from South Dakota. Apply now!",
      keywords: "owner operator jobs South Dakota, trucking jobs South Dakota, CDL-A driver South Dakota, owner operator Sioux Falls, dry van trucking South Dakota",
    },
    hero: {
      badge: "⚠️ South Dakota drivers: stop settling for low rates on long empty miles",
      headline: "Join XXII Century – Premium",
      highlightedText: "Owner Operator Jobs South Dakota",
      subtitle: "South Dakota drivers cover big miles but often see small paychecks. Our Fortune 500 contracts guarantee the premium rates your hard work deserves, with consistent freight and weekly pay.",
    },
    struggles: [
      { emoji: "💸", title: "Low Rate REALITY", desc: "South Dakota's remote freight market often means accepting low rates just to stay loaded and moving" },
      { emoji: "🔧", title: "Harsh Weather WEAR", desc: "South Dakota winters and long-distance runs accelerate truck wear and drive up maintenance costs" },
      { emoji: "📉", title: "Freight GAPS", desc: "South Dakota's smaller market creates gaps between loads that eat into your weekly revenue" },
      { emoji: "⏰", title: "Payment DELAYS", desc: "Hauling loads from Sioux Falls and Rapid City but waiting too long before settlements arrive" },
      { emoji: "🛣️", title: "Extreme DEADHEADS", desc: "South Dakota's geography means long empty miles to reach the next paying load in another state" },
    ],
    benefits: [
      "Earn $2.50-$4+/mile – premium South Dakota rates",
      "Keep 80% of gross with transparent settlements",
      "Guaranteed freight – no hunting loads",
      "Optimized routes to minimize empty miles",
      "Friday weekly pay – every single week",
      "Fortune 500 contract stability and security",
      "24/7 Dispatch Support – even in blizzards",
      "AI fuel savings across Great Plains routes",
      "$1,000 referral bonus with no cap",
    ],
    faqs: [
      {
        question: "What can South Dakota owner operators earn?",
        answer: "South Dakota owner operators earn $2.50-$4+ per mile with 80% of gross revenue. Our Fortune 500 contracts provide rates that beat typical South Dakota freight market pricing.",
      },
      {
        question: "Do South Dakota drivers need their own trailer?",
        answer: "No. We provide trailer access including dry vans. South Dakota drivers can use our equipment or bring their own.",
      },
      {
        question: "What fuel discounts are available for South Dakota drivers?",
        answer: "Fleet-level fuel discounts at major stops across the Great Plains and nationwide, plus AI fuel management to minimize fuel costs on every South Dakota route.",
      },
      {
        question: "Can South Dakota drivers choose their lanes?",
        answer: "Yes. We offer customer lanes and flexible options. Whether you prefer regional Great Plains runs or longer cross-country hauls from South Dakota, we match your preference.",
      },
      {
        question: "Is there a referral program for South Dakota drivers?",
        answer: "Yes - $1,000 per qualified referral with no cap. Refer fellow South Dakota truckers and earn bonus income.",
      },
      {
        question: "How quickly can South Dakota drivers start?",
        answer: "Most qualified owner operators start within 48 hours of completing orientation. We have freight pipelines ready for South Dakota drivers.",
      },
      {
        question: "What freight is available from South Dakota?",
        answer: "We haul Fortune 500 freight including agricultural products, manufacturing goods, and consumer items through South Dakota and Great Plains corridors.",
      },
      {
        question: "Does XXII Century pay detention for South Dakota loads?",
        answer: "Yes. Our AI detention tool ensures South Dakota drivers are paid for wait times at every shipper and receiver facility.",
      },
      {
        question: "What support do South Dakota drivers receive?",
        answer: "24/7 dispatch support (even during Dakota blizzards), AI fuel management, detention tracking, maintenance resources, and a team that values South Dakota drivers.",
      },
    ],
  },
  "west-virginia": {
    slug: "west-virginia",
    state: "West Virginia",
    seo: {
      title: "Owner Operator Jobs West Virginia | Top Pay | XXII Century",
      description: "Owner operator trucking jobs in West Virginia with top rates. Fortune 500 contracts, 80% gross revenue, weekly pay. Hiring CDL-A drivers in WV. Apply today!",
      keywords: "owner operator jobs West Virginia, trucking jobs West Virginia, CDL-A driver WV, owner operator Charleston WV, dry van trucking West Virginia",
    },
    hero: {
      badge: "⚠️ West Virginia drivers: mountain roads deserve mountain-sized paychecks",
      headline: "Join XXII Century – Top-Paying",
      highlightedText: "Owner Operator Jobs West Virginia",
      subtitle: "West Virginia's challenging terrain demands skilled drivers. Our Fortune 500 contracts reward that skill with premium rates, consistent freight, and the support you need to stay profitable.",
    },
    struggles: [
      { emoji: "💸", title: "Underpaid SKILLS", desc: "West Virginia's mountain driving demands expertise but freight rates rarely reflect the difficulty" },
      { emoji: "🔧", title: "Mountain WEAR", desc: "Steep grades and winding roads through West Virginia put extreme stress on brakes, transmissions, and tires" },
      { emoji: "📉", title: "Limited FREIGHT", desc: "West Virginia's smaller economy means fewer loads and tougher competition for the freight that exists" },
      { emoji: "⏰", title: "Slow PAYMENTS", desc: "Hauling challenging loads through WV mountains but waiting weeks for settlements to clear" },
      { emoji: "🛣️", title: "Geographic ISOLATION", desc: "West Virginia's location between major markets means long deadheads to reach profitable freight lanes" },
    ],
    benefits: [
      "Earn $2.50-$4+/mile – premium WV rates",
      "Keep 80% of gross – transparent, no hidden fees",
      "Guaranteed freight from Fortune 500 shippers",
      "Optimized routes for Appalachian corridors",
      "Weekly Friday pay – consistently on time",
      "Stable contracts vs unpredictable spot market",
      "24/7 Professional Dispatch Support",
      "AI fuel management for mountain routes",
      "$1,000 driver referral bonus – unlimited",
    ],
    faqs: [
      {
        question: "What do West Virginia owner operators earn?",
        answer: "West Virginia owner operators earn $2.50-$4+ per mile with 80% of gross revenue. Our Fortune 500 contracts provide premium rates that respect the skill mountain driving demands.",
      },
      {
        question: "Do WV drivers need their own trailer?",
        answer: "No. We provide trailer access including dry vans for West Virginia-based drivers. Use ours or bring your own.",
      },
      {
        question: "What fuel discounts are available for WV drivers?",
        answer: "Fleet-level fuel discounts across West Virginia and nationwide, plus AI fuel management that optimizes fueling stops on mountain routes to save you money.",
      },
      {
        question: "Can West Virginia drivers pick their routes?",
        answer: "Yes. We offer dedicated Appalachian corridor lanes and flexible options. Choose regional runs or longer hauls based on your preference and home time needs.",
      },
      {
        question: "Is there a referral bonus for WV drivers?",
        answer: "Yes - $1,000 per qualified referral with no cap. Refer West Virginia drivers and earn bonus income on top of your hauling revenue.",
      },
      {
        question: "How fast can WV drivers get started?",
        answer: "Most qualified owner operators start within days. We have freight ready and waiting for experienced West Virginia drivers.",
      },
      {
        question: "What freight moves through West Virginia?",
        answer: "We haul Fortune 500 freight including coal country manufacturing, chemical industry loads, and consumer goods through WV's I-64, I-77, and I-79 corridors.",
      },
      {
        question: "Does XXII Century pay WV detention time?",
        answer: "Yes. Our AI detention tool tracks wait times at West Virginia facilities and ensures drivers are compensated for every delay.",
      },
      {
        question: "What support is available for WV drivers?",
        answer: "24/7 dispatch, AI-powered fuel and detention management, maintenance resources, and a dedicated team that understands the unique challenges of West Virginia trucking.",
      },
    ],
  },
};
