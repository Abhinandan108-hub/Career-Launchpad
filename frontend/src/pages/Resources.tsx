import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Languages, Linkedin, MessageSquare, DollarSign, BookOpen, ArrowRight, Sparkles } from "lucide-react";

const tools = [
  { icon: FileText, title: "Resume Builder", desc: "Create ATS-optimized resumes with AI assistance, multiple templates, and real-time scoring.", link: "/dashboard/resume", color: "from-primary/8 to-primary/3" },
  { icon: Languages, title: "Resume Translator", desc: "Translate your resume into 50+ languages while preserving professional formatting and context.", link: "/signup", color: "from-success/8 to-success/3" },
  { icon: Linkedin, title: "LinkedIn Optimizer", desc: "Optimize your LinkedIn profile headline, summary, and experience to attract more recruiters.", link: "/signup", color: "from-info/8 to-info/3" },
  { icon: MessageSquare, title: "Interview Q Generator", desc: "Generate role-specific interview questions with model answers for thorough preparation.", link: "/dashboard/interview-practice", color: "from-warning/8 to-warning/3" },
  { icon: DollarSign, title: "Salary Estimator", desc: "Get accurate salary estimates based on role, location, experience level, and industry data.", link: "/signup", color: "from-destructive/8 to-destructive/3" },
  { icon: BookOpen, title: "Career Learning Hub", desc: "Access curated courses, guides, and reading materials to upskill and stay competitive.", link: "/blog", color: "from-primary/8 to-primary/3" },
];

const Resources = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    
    <section className="pt-32 section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      <div className="container-wide relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Free Tools</span>
          <h1 className="font-display text-display text-foreground mb-5 text-balance">
            AI Career <span className="gradient-text">Tools & Resources</span>
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-[520px] mx-auto">
            Powerful tools to prepare, practice, and land your dream job — many are free to use.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={tool.link}
                className="block glass-card-hover p-8 text-center group relative overflow-hidden h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow">
                    <tool.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-h3 text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{tool.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{tool.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Try Tool <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    
    {/* CTA */}
    <section className="section-padding bg-muted/30">
      <div className="container-wide text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/10 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">Unlock all tools with a free account</span>
          </div>
          <h2 className="font-display text-h1 text-foreground mb-5">Want the Full Experience?</h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-[500px] mx-auto">Sign up for free and get access to all AI career tools, interview practice, and more.</p>
          <Button variant="hero" size="lg" className="px-10 py-6 rounded-xl text-base" asChild>
            <Link to="/signup">Get Started Free <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
    
    <Footer />
  </div>
);

export default Resources;
