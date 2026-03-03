import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How does the Auto Apply feature work?", a: "Our AI matches your profile against thousands of job listings daily, customizes your resume and cover letter for each role, and submits applications on your behalf. You can review and approve applications before they go out, or let the AI handle everything automatically." },
  { q: "Is the Real-Time Interview Copilot detectable?", a: "CareerCopilot uses discreet audio processing that runs locally on your device. Suggestions appear via a subtle overlay that only you can see — it's designed to be completely invisible to interviewers on video calls." },
  { q: "Can I cancel my subscription anytime?", a: "Absolutely. You can cancel at any time with zero hassle. You'll keep access until your billing period ends, and we offer a full 30-day money-back guarantee on all paid plans — no questions asked." },
  { q: "What ATS systems does the Resume Builder support?", a: "Our AI is trained on 50+ major ATS platforms including Workday, Greenhouse, Lever, iCIMS, Taleo, and many more. We optimize formatting, keywords, and structure for maximum compatibility and higher screening rates." },
  { q: "How accurate is the Interview Practice AI feedback?", a: "Our AI evaluates your responses using the same criteria that top interviewers at Fortune 500 companies use — analyzing content quality, delivery confidence, and answer structure. Users report a 40%+ improvement in interview performance." },
  { q: "Is my data secure and private?", a: "100%. We use enterprise-grade AES-256 encryption, never share your data with third parties, and comply with GDPR, SOC 2, and CCPA standards. Your resume, interview data, and personal information are never used for training." },
];

const HomeFAQ = () => (
  <section className="section-padding">
    <div className="container-wide max-w-[800px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">FAQ</span>
        <h2 className="font-display text-h1 text-foreground mb-4">
          Got <span className="gradient-text">Questions?</span>
        </h2>
        <p className="text-body-lg text-muted-foreground">Everything you need to know about CareerCopilot.</p>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <AccordionItem
              value={`faq-${i}`}
              className="bg-card rounded-2xl px-6 border border-border/30 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-300 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-sm md:text-base [&[data-state=open]>svg]:rotate-180">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </section>
);

export default HomeFAQ;
