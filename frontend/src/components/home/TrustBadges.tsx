import { motion } from "framer-motion";

const companies = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Spotify", "Stripe", "Coinbase", "Airbnb", "Uber", "Shopify"
];

const TrustBadges = () => (
  <section className="py-14 border-y border-border/30 bg-card/30 overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-card/50 via-transparent to-card/50 z-[1]" />
    <div className="container-wide relative z-[2]">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-sm font-medium text-muted-foreground mb-8 tracking-wide uppercase"
      >
        Trusted by professionals who got hired at
      </motion.p>
    </div>
    
    {/* Double marquee for seamless loop */}
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card/80 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card/80 to-transparent z-10" />
      
      <div className="flex gap-12 animate-marquee">
        {[...companies, ...companies, ...companies].map((company, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center justify-center h-14 px-8 rounded-xl hover-color hover:bg-accent/30 transition-all duration-500 cursor-default group"
          >
            <span className="text-lg font-bold text-foreground/30 group-hover:text-foreground/70 whitespace-nowrap tracking-tight transition-all duration-500 group-hover:scale-110">{company}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
