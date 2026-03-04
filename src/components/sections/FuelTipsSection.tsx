import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tips = [
  {
    title: "Drive Smoothly",
    details: [
      "Accelerate gently — avoid sudden or rapid acceleration. Gradually press the gas pedal for a smooth takeoff.",
      "Brake gradually — anticipate stops and slow down gradually to avoid hard braking. This saves fuel and reduces brake wear.",
      "Use cruise control on highways to maintain a steady speed and avoid unnecessary speed fluctuations.",
    ],
  },
  {
    title: "Maintain a Steady Speed",
    details: [
      "Drive steady at 67 mph — that's the sweet spot. Many drivers now drive 67 mph consistently and always qualify for bonuses.",
      "They only lose 2 miles per hour in speed, but at the end of the month they earn up to 66¢ per mile because of how much fuel they save.",
    ],
  },
  {
    title: "Reduce Idling",
    details: [
      "Avoid idling — idling burns nearly 1 gallon per hour.",
      "Turn off the engine during long stops: if you're stopped for more than 5 minutes, shut down your engine. Idling for more than 10 seconds uses more fuel than restarting.",
      "Use idle reduction systems (APU): if your truck has an Auxiliary Power Unit or bunk heater, use it instead of idling the main engine.",
    ],
  },
  {
    title: "Check Tire Pressure",
    details: [
      "Keep tires inflated to the manufacturer's recommended pressure. Under-inflated tires can reduce fuel efficiency by 1–2%.",
      "Low tire pressure = more drag = more fuel burn. Check weekly.",
    ],
  },
  {
    title: "Improve Driving Technique",
    details: [
      "Shift gears early — shift to a higher gear as soon as the engine allows to reduce strain and improve fuel economy.",
      "Coast when possible — if you know you'll be stopping soon, take your foot off the gas early and coast to a stop.",
      "Use engine braking — whenever possible, use engine braking instead of relying heavily on the brake pedal. This saves fuel and reduces brake wear.",
    ],
  },
  {
    title: "Keep a Tight Gap Between Truck and Trailer",
    details: [
      "A smaller gap reduces wind drag.",
      "Always slide the 5th wheel close if allowed.",
    ],
  },
  {
    title: "Use Trailer Side Skirts and Tails",
    details: [
      "Trailer side skirts and tails cut down air resistance and improve MPG.",
    ],
  },
  {
    title: "Watch Your Load Distribution",
    details: [
      "A well-balanced load reduces strain on the engine and improves fuel efficiency.",
    ],
  },
  {
    title: "Avoid Headwind — Pay Attention to Weather",
    details: [
      "Adjust to road conditions: in windy or rainy conditions, reduce speed to avoid excessive fuel consumption.",
      "Wind against you increases fuel usage. If it's strong, consider adjusting route or speed.",
    ],
  },
  {
    title: "Plan Ahead",
    details: [
      "Avoid unnecessary stops, traffic, and wrong turns. Time = fuel.",
    ],
  },
  {
    title: "Stay Engaged",
    details: [
      "Ask for feedback: regularly check your performance reports to see where you can improve and make adjustments based on feedback.",
    ],
  },
];

export const FuelTipsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 md:mb-10"
        >
          <span className="label-tag mb-4 mx-auto flex justify-center">
            <Lightbulb className="w-3.5 h-3.5" />
            Driver Tips
          </span>
          <h2 className="heading-section text-foreground mb-3">
            Tips to Improve MPG & Reduce Idling
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Small changes in driving habits can add up to big savings — and bigger bonuses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {tips.map((tip, index) => (
              <AccordionItem
                key={index}
                value={`tip-${index}`}
                className="rounded-lg border border-border bg-card px-4 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline py-3">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    {tip.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">
                  <ul className="space-y-2 pl-9">
                    {tip.details.map((detail, j) => (
                      <li key={j} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/40">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
