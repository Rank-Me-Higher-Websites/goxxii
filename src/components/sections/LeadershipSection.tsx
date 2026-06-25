import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import davidMolo from "@/assets/team/david-molo.jpg";
import paulKruzinauskas from "@/assets/team/paul-kruzinauskas.jpg";
import andrewMolo from "@/assets/team/andrew-molo.jpg";
import artBialopetrovic from "@/assets/team/art-bialopetrovic.jpg";
import ozzyIdas from "@/assets/team/ozzy-idas.jpg";
import aprilRay from "@/assets/team/april-ray.png";

const leaders = [
  {
    name: "David Molo",
    title: "CEO",
    email: "David@goxxii.com",
    image: davidMolo,
  },
  {
    name: "Paul Kruzinauskas",
    title: "President",
    email: "Paul@goxxii.com",
    image: paulKruzinauskas,
  },
  {
    name: "Andrew Molo",
    title: "Accounting Manager",
    email: "Accounting@goxxii.com",
    image: andrewMolo,
  },
  {
    name: "Art Bialopetrovic",
    title: "Operations Manager",
    email: "Art@goxxii.com",
    image: artBialopetrovic,
  },
  {
    name: "Ozzy Idas",
    title: "Maintenance Manager",
    email: "Ozzy@goxxii.com",
    image: ozzyIdas,
  },
  {
    name: "April Ray",
    title: "Safety Manager",
    email: "Safety@goxxii.com",
    image: aprilRay,
  },
];

const LeaderCard = ({ leader }: { leader: typeof leaders[number] }) => (
  <>
    <div className="aspect-[4/5] overflow-hidden">
      <img
        src={leader.image}
        alt={leader.name}
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-xl font-display font-bold text-foreground mb-1">
        {leader.name}
      </h3>
      <p className="text-primary font-medium text-sm mb-3">
        {leader.title}
      </p>
      <a
        href={`mailto:${leader.email}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Mail className="w-4 h-4" />
        {leader.email}
      </a>
    </div>
  </>
);

export const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="label-tag mx-auto mb-4 inline-flex">Our Team</span>
          <h2 className="heading-section text-foreground mb-4">
            XXII Century Leadership Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            XXII Century's leadership brings together decades of logistics
            experience, united by a shared mission-supporting carriers, drivers,
            and partners.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <LeaderCard leader={leader} />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="sm:hidden">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3">
              {leaders.map((leader) => (
                <CarouselItem key={leader.name} className="pl-3 basis-[85%]">
                  <div className="group relative bg-card rounded-2xl overflow-hidden border border-border/50">
                    <LeaderCard leader={leader} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
