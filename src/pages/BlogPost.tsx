import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import dedicatedOwnerOperator from "@/assets/blog/dedicated-owner-operator.jpg";
import localOwnerOperator from "@/assets/blog/local-owner-operator.jpg";
import ownerOperatorGuide from "@/assets/blog/owner-operator-guide.png";

const blogPostsData: Record<string, {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  content: string[];
}> = {
  "dedicated-owner-operator-jobs": {
    image: dedicatedOwnerOperator,
    title: "Dedicated Owner Operator Jobs: Pros and Cons",
    excerpt: "If you're an owner operator, you've probably heard the term dedicated lanes thrown around more times than you can count. This post is designed to help you cut through the hype.",
    date: "December 22, 2025",
    readTime: "8 min read",
    category: "Owner Operators",
    author: "XXII Century Team",
    content: [
      "If you're an owner operator, you've probably heard the term dedicated lanes thrown around more times than you can count. Maybe it came up while talking to another driver at a truck stop, or maybe you saw it listed while browsing job boards late at night, wondering if there's a better setup out there. That curiosity is exactly why dedicated owner operator jobs have become such a hot topic in the trucking world.",
      
      "At a glance, these jobs sound almost too good to be true: predictable routes, steady freight, and more consistent pay compared to the ups and downs of the spot market. For many drivers, that kind of stability can be a game changer—especially if you're tired of constantly chasing loads or juggling unpredictable schedules. But like any trucking opportunity, dedicated work isn't perfect for everyone.",
      
      "This post is designed to help you cut through the hype. We'll break down what dedicated owner operator jobs really look like in the real world, not just on paper. You'll learn the biggest advantages, the potential drawbacks, and how these roles compare to other options, including regional and local work.",
      
      "## What Are Dedicated Owner Operator Jobs?",
      
      "At their core, dedicated owner operator jobs are all about consistency. Instead of bouncing between random loads and constantly hunting for the next shipment, you're assigned to a specific customer, route, or set of lanes. That means you're hauling similar freight, following a familiar schedule, and often working with the same dispatch team day in and day out.",
      
      "In a dedicated setup, a carrier secures long-term freight from a customer and assigns owner operators to handle those loads on a regular basis. You might run the same lane every week, deliver to the same distribution centers, or service the same region consistently. While you're still running your own truck and managing your business, the freight side of things becomes much more stable.",
      
      "### Dedicated vs Other Owner Operator Options",
      
      "The biggest difference between dedicated work and other owner operator roles comes down to predictability. With OTR or spot-market hauling, pay and miles can swing widely from week to week. Dedicated routes, on the other hand, are usually built around set expectations. That can make it easier to budget for fuel, maintenance, and recurring expenses like owner operator semi truck insurance.",
      
      "### Why Dedicated Jobs Are Growing in Popularity",
      
      "As shipping demands increase and customers push for reliability, carriers are leaning more heavily on dedicated freight. For owner operators, this trend has opened the door to more consistent opportunities that still allow independence. Dedicated owner operator jobs aren't about giving up freedom—they're about trading constant uncertainty for a more structured, business-friendly way of operating.",
      
      "## The Pros of Dedicated Owner Operator Jobs",
      
      "One of the biggest reasons drivers start looking into dedicated owner operator jobs is simple: life gets a lot easier when you know what your workweek is going to look like. While no trucking job is completely stress-free, dedicated freight removes many of the unknowns that make owner operating feel overwhelming at times.",
      
      "### Predictable Routes and Schedules",
      
      "Running dedicated lanes means fewer surprises. You're often hauling the same freight on the same routes, which makes trip planning more straightforward. Instead of constantly adjusting to new pickup locations or last-minute changes, you can settle into a rhythm. That predictability also makes it easier to plan personal time, whether that means scheduling home days or lining up maintenance without scrambling.",
      
      "### More Consistent Paychecks",
      
      "Another major advantage of dedicated work is income stability. While spot-market rates can spike one week and drop the next, dedicated freight tends to be priced more steadily. That doesn't always mean higher pay every single week, but it does mean fewer dramatic swings. Many owner operators appreciate being able to forecast earnings and manage cash flow without constantly reacting to market changes.",
      
      "### Better Work-Life Balance",
      
      "Dedicated owner operator jobs often come with more reliable home time, especially compared to long-haul OTR work. While not all dedicated lanes are local, many follow predictable patterns that allow drivers to be home on the same days each week. For owner operators who value routine or have family commitments, that kind of balance can be just as important as pay.",
      
      "### Easier Long-Term Planning",
      
      "When your routes and income are more predictable, running your business becomes less reactive. Dedicated freight allows owner operators to plan ahead, whether that's setting aside money for repairs, upgrading equipment, or negotiating better insurance terms over time.",
      
      "## The Cons of Dedicated Owner Operator Jobs",
      
      "As appealing as stability sounds, dedicated owner operator jobs aren't a perfect fit for everyone. Just like any business decision, there are trade-offs to consider, and understanding the downsides upfront can save you from frustration later on.",
      
      "### Less Flexibility to Chase Higher Rates",
      
      "One of the biggest drawbacks of dedicated work is reduced flexibility. When you're locked into a specific customer or lane, you're not free to jump on high-paying spot loads when the market heats up. While this trade-off brings consistency, it can feel limiting for drivers who enjoy shopping rates or capitalizing on short-term demand spikes.",
      
      "### Income Can Have a Ceiling",
      
      "Dedicated freight is often priced for stability, not maximum upside. That means your weekly earnings may level out at a certain point, even during strong freight seasons. While the paycheck is more reliable, there's usually less room for dramatic increases unless the contract is renegotiated.",
      
      "### Dependence on a Single Customer or Contract",
      
      "Another risk with dedicated work is putting most of your eggs in one basket. If the customer downsizes, changes carriers, or adjusts shipping volumes, your miles can disappear quickly. While reputable carriers work to reassign drivers, there's often a transition period that can affect income.",
      
      "### Not Always Ideal for Local-Only Drivers",
      
      "Although dedicated routes can offer more home time, they aren't always truly local. Drivers searching strictly for local owner operator jobs may find that some dedicated lanes still require overnight runs or regional travel.",
      
      "## Dedicated Owner Operator Jobs vs Other Driving Options",
      
      "Choosing between dedicated work and other owner operator paths often comes down to what kind of business you want to run and how much unpredictability you're comfortable with.",
      
      "### Dedicated vs OTR Owner Operator Work",
      
      "Traditional OTR work gives you maximum freedom to chase loads and routes across the country, but that freedom comes with constant decision-making and income swings. Dedicated lanes, by comparison, trade some flexibility for consistency. You're not constantly searching for freight or adjusting plans, which can make long-term planning much easier.",
      
      "### Dedicated vs Local Owner Operator Jobs",
      
      "Drivers searching for local owner operator jobs are often focused on daily home time. Dedicated work doesn't always guarantee that, but it frequently offers predictable schedules and regular days off. In many cases, dedicated lanes provide a balance between local comfort and regional earning potential.",
      
      "## Are Dedicated Owner Operator Jobs the Right Move?",
      
      "When it comes down to it, dedicated owner operator jobs are all about finding the right balance. Throughout this guide, we've looked at how dedicated work offers consistency, predictable routes, and steadier income, while also acknowledging the trade-offs, like reduced flexibility and reliance on specific customers.",
      
      "Dedicated work isn't a shortcut or a guaranteed win. It's a business decision. The right setup can make managing expenses, planning home time, and covering ongoing costs far less stressful. The wrong one can feel limiting or underpaid. That's why choosing the right carrier, understanding contract details, and knowing your personal goals are so important before committing.",
      
      "Dedicated owner operator jobs aren't for everyone—but for the right driver, they can offer a more sustainable, predictable way to keep your business moving forward."
    ]
  },
  "local-owner-operator-jobs": {
    image: localOwnerOperator,
    title: "Local Owner Operator Jobs Near Me: Chicago Tips",
    excerpt: "If you've ever typed 'local owner operator jobs near me' into a search bar and found yourself overwhelmed by options—especially in a busy market like Chicago—you're not alone.",
    date: "December 15, 2025",
    readTime: "10 min read",
    category: "Local Jobs",
    author: "XXII Century Team",
    content: [
      "If you've ever typed \"local owner operator jobs near me\" into a search bar and found yourself overwhelmed by options—especially in a busy market like Chicago—you're not alone. The city is a major freight powerhouse, buzzing with opportunities for drivers who want steady loads, good pay, and the chance to stay close to home.",
      
      "That's where this guide comes in. Whether you're a seasoned owner operator looking to maximize your earnings or you're new to the Chicago logistics scene, this post breaks down everything you need to know to navigate the market confidently.",
      
      "## Chicago's Freight Economy: A Goldmine for Local Owner Operators",
      
      "When people think of Chicago, they picture skyscrapers, deep-dish pizza, and Lake Michigan—but for truck drivers, the city represents something even better: opportunity. Chicago sits right in the middle of one of the busiest freight networks in the country, which is exactly why so many drivers searching for local owner operator jobs end up pointing their wheels toward the Windy City.",
      
      "What makes Chicago so unique? It's the combination of highways, rail yards, distribution centers, and major industries all packed into one region. O'Hare moves a massive amount of cargo every day, rail hubs connect coast to coast, and warehouses stretch from Joliet to the North Side. That means freight is constantly moving—short hauls, day routes, night routes, and plenty of dedicated lanes for anyone wanting predictable schedules.",
      
      "Another big advantage is the variety of industries here. Food and beverage companies, construction suppliers, manufacturing plants, e-commerce fulfillment centers, and retail distributors are always looking for reliable drivers.",
      
      "## How to Evaluate a Trucking Company in Chicago Before Signing On",
      
      "With so many carriers based in and around the city, choosing the right trucking company Chicago has to offer can feel a little overwhelming. But the truth is, finding the right fit can make or break your experience as an owner operator.",
      
      "### Take a Close Look at the Pay Structure",
      
      "Before signing any contract, make sure you fully understand how you'll be paid. Is it percentage-based? Per mile? Flat rate per load? Chicago has a mix of intermodal, dry van, reefer, and short-haul runs, and each tends to pay differently.",
      
      "### Watch Out for Hidden or Extra Costs",
      
      "Operating in and around Chicago has its own set of financial realities—tolls, parking, higher fuel prices in certain areas, and heavy traffic that can affect your productivity. Some companies build extra charges into their contracts, and others leave more responsibility on the driver.",
      
      "### Understand the Insurance Expectations",
      
      "Every carrier has its own insurance requirements, so be sure you know what you're responsible for. Expenses like owner operator semi truck insurance can vary widely depending on your equipment, driving record, and the type of freight you plan to haul.",
      
      "### Check Reputation and Stability",
      
      "In a city full of opportunity, reputation matters. A great way to narrow your choices is to look at reviews from other drivers, ask about turnover rates, and check safety scores.",
      
      "### Know the Red Flags",
      
      "If a company avoids direct answers, brushes off your questions, or promises \"unlimited freight\" without showing any proof—proceed with caution. Clear contracts, transparent communication, and realistic expectations are your best friends in this industry.",
      
      "## Where to Find the Best Dedicated Owner Operator Jobs in Chicago",
      
      "If there's one thing Chicago does well, it's keeping freight moving around the clock. And for many drivers, the real sweet spot lies in dedicated owner operator jobs—the kind of work that gives you predictable lanes, consistent income, and a routine you can actually plan your life around.",
      
      "### Why Dedicated Routes Are So Popular in Chicago",
      
      "Chicago's industries rely on precise and consistent deliveries. Grocery chains need daily stock, manufacturing plants depend on just-in-time shipments, and retail distribution centers operate with tight schedules. All of this creates repeatable freight lanes that are ideal for owner operators seeking reliability.",
      
      "### Industries Offering the Most Consistent Dedicated Freight",
      
      "In Chicago, owner operators can find dependable dedicated lanes in several high-demand sectors: Grocery and food distribution, Retail and e-commerce fulfillment, Manufacturing and industrial supplies, and Intermodal freight connected to the city's major rail yards.",
      
      "## Chicago-Specific Strategies to Increase Profit as an Owner Operator",
      
      "Being an owner operator in Chicago has its advantages, but truly maximizing your earnings takes more than just landing steady work. With so much freight flowing in and out of the city every day, the drivers who get ahead are the ones who understand the rhythm of the market.",
      
      "### Master Chicago's Traffic and Freight Timing",
      
      "Chicago traffic has a personality of its own, but once you learn how the city moves, you can use that to increase your productivity. Planning your routes around peak congestion on I-90, I-94, and I-290 will save you hours over the course of a month.",
      
      "### Cut Operating Costs Without Cutting Quality",
      
      "Running a trucking business in a major city comes with expenses that add up quickly, but small adjustments can make a big difference. Many drivers fuel up in the suburbs where prices tend to be lower, especially during busy seasons.",
      
      "### Build Strong Relationships With Local Brokers and Shippers",
      
      "One of the biggest advantages of operating in Chicago is the access you have to people who can directly impact your workflow. Brokers, dispatchers, and local shippers are everywhere, and building genuine relationships with them can open the door to higher-paying freight and consistent load opportunities.",
      
      "### Make Smart Insurance Decisions",
      
      "Insurance may not be the most exciting topic, but choosing the right coverage is one of the best financial decisions an owner operator can make. A well-chosen owner operator semi truck insurance policy can protect your revenue and help you get back on the road quickly if something unexpected happens.",
      
      "### Use Technology to Stay Efficient and Competitive",
      
      "Technology has become a silent partner for many successful drivers. Route-planning apps can help you avoid standstill traffic, while digital freight platforms make it easier to find loads that match your preferred schedule.",
      
      "## Finding Your Best Path as a Chicago Owner Operator",
      
      "Chicago is a city built on movement—freight, people, opportunity—and for owner operators, it offers one of the richest markets in the country. Whether you're exploring local owner operator jobs, comparing trucking companies, or looking for dedicated routes that offer stability, the key to success is understanding how to navigate this unique landscape.",
      
      "If there's one thing to take away, it's this: Chicago gives owner operators a rare combination of opportunity and flexibility—but the drivers who thrive are the ones who approach it with intention."
    ]
  },
  "owner-operator-guide": {
    image: ownerOperatorGuide,
    title: "Owner Operator Guide: Insurance, Jobs and Carriers",
    excerpt: "Thinking about becoming an owner operator—or looking to level up your current setup? You're in the right place. This comprehensive guide covers everything you need to know.",
    date: "December 3, 2025",
    readTime: "12 min read",
    category: "Guides",
    author: "XXII Century Team",
    content: [
      "Thinking about becoming an owner operator—or looking to level up your current setup? You're in the right place. Today's trucking world is full of opportunities, but it also comes with its share of challenges, especially when it comes to finding steady work, choosing the right carriers, and securing the right owner operator semi truck insurance to protect your business.",
      
      "Whether you're just starting out or already hauling loads across the country, navigating this industry can feel overwhelming. There are countless job listings, endless carrier options, and so many insurance policies that all claim to be \"the best.\" It's a lot—and that's exactly why this guide exists.",
      
      "## Understanding Owner Operator Insurance: What You Really Need",
      
      "When you're an owner operator, whether you run general freight or take on dedicated owner operator jobs, your truck isn't just a vehicle—it's your business, your income, and your daily livelihood. That's exactly why having the right insurance isn't optional. It's the foundation that protects everything you've worked for.",
      
      "### Why Insurance Matters More Than Ever",
      
      "The trucking industry is more fast-paced and unpredictable than it's ever been. One accident, breakdown, or cargo mishap can create huge financial setbacks if you're not properly covered. The right owner operator semi truck insurance makes sure one bad day doesn't turn into a long-term crisis.",
      
      "Beyond that, most carriers and brokers require specific insurance limits before they'll even work with you. So having solid coverage isn't just smart—it's your ticket to better-paying loads and long-term stability.",
      
      "### The Core Types of Insurance Every Owner Operator Should Have",
      
      "**Primary Liability:** This is the big one. It covers bodily injury or property damage if you're involved in an accident. Carriers usually require it, and without it, you simply can't operate legally.",
      
      "**Physical Damage:** Think of this as coverage for your truck itself. Accidents, theft, vandalism, weather damage—this protects the equipment you rely on to earn a living.",
      
      "**Cargo Insurance:** If the freight you're hauling gets damaged, spoiled, or lost, cargo insurance helps cover the loss. It's especially important if you're hauling high-value or time-sensitive goods.",
      
      "**Bobtail/Non-Trucking Liability:** When you're driving without a load or outside of dispatch, this policy steps in. It protects you during all those \"in-between\" miles that still carry risk.",
      
      "**Occupational Accident Insurance:** This helps cover injuries or accidents that happen on the job. It's especially vital if you're not under a workers' comp plan.",
      
      "### How to Choose the Right Insurance Provider",
      
      "Shopping for insurance shouldn't feel like you're signing away your life. Look for: Clear coverage options without confusing fine print, fair deductibles that won't empty your wallet, strong claims support especially during emergencies, flexible policies if your routes or freight types change, and experience with owner operators, not general auto customers.",
      
      "### What Affects Your Insurance Costs?",
      
      "Your rates can be influenced by: Your driving history (clean records save money), type of freight you haul, how far and where you drive, age and condition of your truck, and your home base, especially if you operate out of a major hub like Chicago.",
      
      "## Finding the Best Job Opportunities: Local, Dedicated & High-Paying",
      
      "Now that you have a solid understanding of insurance, it's time to talk about the part every owner operator cares about most: the work. The trucking job market has changed a lot in the last few years. Freight demand has shifted, new carriers have entered the scene, and more companies than ever are leaning on independent drivers.",
      
      "### The Job Market for Owner Operators in Today's Industry",
      
      "Many regions are experiencing steady freight movement, and carriers continue to look for dependable owner operators who can help them keep shipments moving on time. This creates a mix of options, from long-haul runs to short, local deliveries, giving you the flexibility to pick work that matches your lifestyle.",
      
      "### Dedicated Owner Operator Jobs: Pros, Cons and What to Expect",
      
      "Dedicated routes have become especially appealing for owner operators who want consistency. Instead of constantly searching for your next load, you get predictable lanes, steady freight, and regular income. These jobs often pair you with the same shipper or route, which means you'll know the pickup and delivery routine like the back of your hand.",
      
      "### Local Owner Operator Jobs Near Me: Finding Reliable Daily or Regional Work",
      
      "If being home every night or staying close to your base is important, then local opportunities should be on your radar. These local or regional jobs can be great for reducing fuel expenses and cutting down on overnight stays.",
      
      "### Red Flags to Watch Out For Before Accepting a Job",
      
      "Pay attention to listings that promise unusually high rates with vague details—they may include forced dispatch or unstable freight. Jobs that lack transparent load information or have confusing payout terms should also raise a red flag.",
      
      "## Working with the Right Carriers: What Owner Operators Should Look For",
      
      "Landing good freight is important, but choosing the right carrier to partner with can completely shape your experience as an owner operator. A carrier isn't just a company that sends you loads—they're the team you rely on for steady work, fair rates, and clear communication.",
      
      "### What Makes a Carrier \"Owner Operator Friendly\"?",
      
      "A good carrier feels like a partner, not a boss. They respect the fact that you're running your own business, and they structure their system in a way that helps you profit. Pay that's delivered on time, consistent freight, reasonable expectations, and dispatchers who treat you like a human being—these are all signs you're dealing with an owner-operator-friendly carrier.",
      
      "### How to Evaluate a Trucking Company",
      
      "If you're operating out of a major freight market like Chicago, you'll have many options available. Check how long the company has been in business, whether drivers tend to stick around, and what their reputation is like in the community.",
      
      "### Carrier Contract Terms You Must Understand",
      
      "Your contract is one of the most important documents in your business. It spells out how you get paid, what expenses you're responsible for, and how disputes are handled. Take time to understand whether the carrier requires escrow accounts or chargebacks, and check if you're responsible for certain types of maintenance or insurance costs.",
      
      "## Building a Successful Future as an Owner Operator",
      
      "Being an owner operator isn't just about driving a truck—it's about running a business, managing risks, and choosing the right opportunities to grow. From understanding the importance of solid owner operator semi truck insurance, to finding dedicated or local jobs, to choosing a dependable trucking company, every decision you make helps shape your long-term success on the road.",
      
      "With the right foundation, attentive planning, and smart choices, you can build a profitable and sustainable career that gives you both freedom and stability."
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = Object.entries(blogPostsData)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, value]) => ({ slug: key, ...value }));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                {post.category}
              </span>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                // Handle paragraphs with bold text
                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {parts.map((part, partIndex) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={partIndex} className="text-foreground font-semibold">
                            {part.replace(/\*\*/g, "")}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })}

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 rounded-2xl border border-border">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join XXII Century and discover opportunities that match your goals. We're always looking for passionate people to be a part of our team.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/owner-operators">Owner Operators</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/company-drivers">Company Drivers</Link>
                  </Button>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Share & Save */}
              <div className="p-6 bg-card rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-4">Share This Article</h4>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="flex-1">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Related Posts */}
              <div className="p-6 bg-card rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-4">Related Articles</h4>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-2">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h5 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h5>
                      <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-6 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest industry news delivered to your inbox.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/contact">Subscribe</Link>
                </Button>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
