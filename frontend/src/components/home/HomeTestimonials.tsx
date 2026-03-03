import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "Software Engineer → Google", text: "I was struggling to get callbacks for months. CareerCopilot optimized my resume, and within 2 weeks I had 6 interviews lined up. The live copilot during my Google interview was unbelievable — I got the offer.", avatar: "SC", rating: 5 },
  { name: "Marcus Johnson", role: "Product Manager → Meta", text: "The auto-apply feature saved me 25+ hours a week. I was applying to 100 jobs a day without lifting a finger. Went from unemployment to multiple offers in just 3 weeks.", avatar: "MJ", rating: 5 },
  { name: "Priya Patel", role: "Data Scientist → Netflix", text: "Interview practice mode completely changed my confidence level. The STAR method coaching was spot on. I aced every behavioral question in my Netflix interview.", avatar: "PP", rating: 5 },
  { name: "David Kim", role: "Frontend Dev → Stripe", text: "The resume builder alone is worth it. My ATS score went from 45 to 94. But the real magic is the interview copilot — it's like having a career coach whispering in your ear.", avatar: "DK", rating: 5 },
  { name: "Lisa Wang", role: "UX Designer → Airbnb", text: "I tried 5 other platforms before CareerCopilot. Nothing comes close. The AI suggestions during my live interview were incredibly relevant and natural-sounding.", avatar: "LW", rating: 5 },
  { name: "Alex Rivera", role: "Backend Engineer → Amazon", text: "Went from 0 interviews to 8 in my first week using CareerCopilot. The job matching algorithm found roles I never would have discovered on my own. Absolutely game-changing.", avatar: "AR", rating: 5 },
];

const HomeTestimonials = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 dot-pattern opacity-20" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.02] blur-[120px]" />
    
    <div className="container-wide relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Testimonials</span>
        <h2 className="font-display text-h1 md:text-display-sm text-foreground mb-5">
          Real People, <span className="gradient-text">Real Results</span>
        </h2>
        <p className="text-body-lg text-muted-foreground">Don't take our word for it — hear from professionals who landed their dream jobs.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-7 relative group"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/[0.06] group-hover:text-primary/15 transition-colors duration-500" />
            
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            
            <p className="text-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
            
            <div className="flex items-center gap-3 pt-4 border-t border-border/30">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-sm shadow-inner-soft group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                {t.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeTestimonials;
