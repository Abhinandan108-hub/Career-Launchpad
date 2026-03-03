import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, Clock, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@careercopilot.ai", href: "mailto:hello@careercopilot.ai" },
  { icon: MapPin, label: "Office", value: "San Francisco, CA", href: "#" },
  { icon: Phone, label: "Phone", value: "+1 (415) 555-0123", href: "tel:+14155550123" },
  { icon: Clock, label: "Hours", value: "Mon-Fri, 9am-6pm PST", href: "#" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 section-padding relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />

        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Contact</span>
            <h1 className="font-display text-display text-foreground mb-5 text-balance">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-[520px] mx-auto">
              Have a question, feedback, or just want to say hi? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-[1100px] mx-auto">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="font-display text-h2 text-foreground mb-2">Let's Connect</h2>
              <p className="text-muted-foreground mb-8">Reach out through any of these channels or fill out the form.</p>

              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 p-4 rounded-2xl glass-card-hover group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                      <c.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
                      <p className="text-sm font-medium text-foreground">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-display text-h2 text-foreground mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">We'll get back to you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-xl">Send Another</Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="glass-card p-8 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full h-14 px-4 rounded-xl bg-muted/30 border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        className="w-full h-14 px-4 rounded-xl bg-muted/30 border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help?"
                      className="w-full h-14 px-4 rounded-xl bg-muted/30 border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us more..."
                      className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 resize-none"
                    />
                  </div>
                  <Button variant="hero" className="w-full h-14 rounded-xl text-base">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
