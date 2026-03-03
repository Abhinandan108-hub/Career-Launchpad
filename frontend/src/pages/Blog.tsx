import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Clock, BookOpen } from "lucide-react";

const categories = ["All", "Interview Prep", "Resume Guide", "Career Tips", "AI Tools", "Industry Insights", "Education"];

const posts = [
  { title: "12 Best Interview Preparation Websites in 2026", category: "Interview Prep", excerpt: "A comprehensive guide to the top platforms for practicing and acing your interviews — from AI mock sessions to peer practice.", date: "Feb 25, 2026", readTime: "8 min", featured: true },
  { title: "How AI is Transforming the Job Search Landscape", category: "AI Tools", excerpt: "Discover how artificial intelligence is revolutionizing resume building, auto-applying, and real-time interview assistance.", date: "Feb 22, 2026", readTime: "6 min" },
  { title: "The Ultimate STAR Method Guide for Behavioral Interviews", category: "Interview Prep", excerpt: "Master the Situation-Task-Action-Result framework and nail any behavioral interview question with confidence.", date: "Feb 20, 2026", readTime: "10 min" },
  { title: "Salary Negotiation: 7 Proven Strategies That Work", category: "Career Tips", excerpt: "Data-backed negotiation tactics that have helped 10,000+ professionals increase their offers by 15-30%.", date: "Feb 18, 2026", readTime: "7 min" },
  { title: "ATS-Optimized Resume Templates for Every Industry", category: "Resume Guide", excerpt: "Free, professionally designed templates that pass every applicant tracking system — tested on 50+ ATS platforms.", date: "Feb 16, 2026", readTime: "5 min" },
  { title: "Remote Work Trends & What They Mean for Your Career", category: "Industry Insights", excerpt: "The latest data on remote, hybrid, and in-office work — and how to position yourself for the future of work.", date: "Feb 14, 2026", readTime: "6 min" },
  { title: "Building a Personal Learning Roadmap for Career Growth", category: "Education", excerpt: "How to identify skill gaps, choose the right courses, and build a structured learning plan that accelerates your career.", date: "Feb 12, 2026", readTime: "8 min" },
  { title: "Technical Interview Prep: Data Structures & Algorithms", category: "Interview Prep", excerpt: "A practical guide to the most commonly asked DSA questions at FAANG companies, with solution patterns.", date: "Feb 10, 2026", readTime: "12 min" },
  { title: "The Psychology of Confidence in Job Interviews", category: "Career Tips", excerpt: "Research-backed techniques to manage anxiety, project confidence, and make a lasting impression on interviewers.", date: "Feb 8, 2026", readTime: "7 min" },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-8 section-padding">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">Blog</span>
            <h1 className="font-display text-display text-foreground mb-5">
              Career <span className="gradient-text">Insights & Guides</span>
            </h1>
            <p className="text-body-lg text-muted-foreground">Expert tips, interview prep guides, and industry insights to level up your career.</p>
          </motion.div>

          {/* Search */}
          <div className="max-w-[520px] mx-auto mb-10">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 shadow-elevation-1 focus:shadow-elevation-2"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-card border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card-hover overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-accent to-muted flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="w-10 h-10 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                    {post.featured && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">Featured</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">{post.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all duration-300">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
