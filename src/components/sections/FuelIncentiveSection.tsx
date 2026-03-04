import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Fuel, Trophy, BarChart3, Users, DollarSign } from "lucide-react";

const howItWorks = [
  {
    icon: BarChart3,
    title: "Weekly Leaderboard",
    description: "See who's leading in fuel efficiency each week. Track your MPG and compete with fellow drivers right here on our site.",
  },
  {
    icon: DollarSign,
    title: "Monthly Rewards",
    description: "Every driver finishing the month at 7+ MPG earns 1¢/mile. Hit 8+ MPG and earn 2¢/mile on all miles driven that month.",
  },
  {
    icon: Trophy,
    title: "Annual Top Driver",
    description: "The driver with the best annual average MPG will be crowned Top Driver of the Year and awarded an exclusive prize!",
  },
];

const earningsExamples = [
  { miles: "10,000", mpg: "7+", bonus: "$100" },
  { miles: "8,000", mpg: "7+", bonus: "$80" },
  { miles: "6,500", mpg: "7+", bonus: "$65" },
  { miles: "10,000", mpg: "8+", bonus: "$200" },
];

export const FuelIncentiveSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 md:mb-14"
        >
          <span className="label-tag mb-4 mx-auto flex justify-center">Fuel Incentive Program</span>
          <h2 className="heading-section text-foreground mb-4">
            Save Fuel. <span className="text-gradient">Get Rewarded.</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            We've launched a program to reward great driving! This program recognizes drivers who focus on fuel efficiency, reducing idling time, and overall smart driving.
          </p>
        </motion.div>

        {/* How It Works — 3 Cards */}
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
          {howItWorks.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="glass rounded-xl p-6 text-center hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="heading-card text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Reward Criteria + Earnings Table */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Criteria */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6 md:p-8"
          >
            <h3 className="heading-card text-foreground mb-4 flex items-center gap-2">
              <Fuel className="w-5 h-5 text-accent" />
              Monthly Reward Criteria
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                <span className="font-display font-bold text-accent text-lg mt-0.5">7+</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">MPG → 1¢ per mile</p>
                  <p className="text-xs text-muted-foreground">Earn a reward of 1 cent per mile driven during that month</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <span className="font-display font-bold text-primary text-lg mt-0.5">8+</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">MPG → 2¢ per mile</p>
                  <p className="text-xs text-muted-foreground">Earn a bonus reward of 2 cents per mile driven during that month</p>
                </div>
              </div>
            </div>

            {/* Team driving note */}
            <div className="mt-5 flex items-start gap-2 p-3 rounded-lg bg-muted border border-border">
              <Users className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Team drivers:</strong> If you share a truck, your fuel bonus is calculated based on combined average MPG and total miles driven by both drivers.
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Note: Bonuses are paid on the first payroll of the following month.
            </p>
          </motion.div>

          {/* Earnings Examples */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6 md:p-8"
          >
            <h3 className="heading-card text-foreground mb-4">Earnings Examples</h3>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Miles</th>
                    <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg MPG</th>
                    <th className="text-right p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {earningsExamples.map((row, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-3 text-foreground">{row.miles}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                          row.mpg === "8+" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                        }`}>
                          {row.mpg}
                        </span>
                      </td>
                      <td className="p-3 text-right font-bold text-foreground">{row.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              The higher your MPG average, the more you earn. Drive steady at 67 mph — many drivers now qualify for bonuses consistently by losing just 2 mph in speed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
