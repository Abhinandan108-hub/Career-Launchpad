import { Link } from "react-router-dom";
import { Zap, Twitter, Linkedin, Github, Mail, ArrowUpRight, Heart, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const footerLinks = {
  Product: [
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Resources", path: "/resources" },
    { label: "Interview Practice", path: "/dashboard/interview-practice" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Changelog", path: "/changelog" },
    { label: "Contact", path: "/contact" },
    { label: "Careers", path: "#" },
  ],
  Support: [
    { label: "Help Center", path: "#" },
    { label: "Community", path: "#" },
    { label: "Status", path: "#" },
    { label: "API Docs", path: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Service", path: "#" },
    { label: "Cookie Policy", path: "#" },
    { label: "GDPR", path: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/[0.02] blur-[100px]" />

      <div className="container-wide relative z-10 pt-20 pb-8">
        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16 p-8 md:p-12 rounded-3xl bg-background/[0.04] border border-background/[0.06] backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-h2 font-display font-bold mb-2">Stay Ahead in Your Career</h3>
              <p className="text-background/50 text-sm">Get weekly interview tips, resume hacks, and career insights — no spam, ever.</p>
            </div>
            <div>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm text-success font-medium flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" /> You're subscribed! Check your inbox.
                </motion.p>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 h-12 px-4 rounded-xl bg-background/[0.06] border border-background/10 text-background placeholder:text-background/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-sm"
                  />
                  <button
                    type="submit"
                    className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    Subscribe <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Career<span className="text-primary">Copilot</span>
              </span>
            </Link>
            <p className="text-background/50 text-sm leading-relaxed mb-6 max-w-[300px]">
              AI-powered career platform that helps you prepare for interviews, build better resumes, and land your dream job — faster than ever.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-background/[0.06] flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 group border border-background/[0.05]"
                >
                  <Icon className="w-4 h-4 text-background/60 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm text-background/80 mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-background/40 hover:text-background transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/30">
            © 2026 CareerCopilot. All rights reserved.
          </p>
          <p className="text-sm text-background/30 flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-destructive fill-destructive animate-pulse" /> for ambitious professionals
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
