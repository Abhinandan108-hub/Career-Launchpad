import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Download, Layout, GripVertical, User, Briefcase, GraduationCap, Award, Plus, Eye, CheckCircle } from "lucide-react";
import { useState } from "react";

const templates = ["Professional", "Modern", "Creative", "Minimal"];
const sections = [
  { icon: User, label: "Personal Info", fields: ["Full Name", "Job Title"] },
  { icon: Briefcase, label: "Experience", fields: ["Company", "Role"] },
  { icon: GraduationCap, label: "Education", fields: ["University", "Degree"] },
  { icon: Award, label: "Skills", fields: ["Add skills"] },
];

const ResumeBuilder = () => {
  const [activeTemplate, setActiveTemplate] = useState("Professional");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-dashboard">
      <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border/30 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild><Link to="/dashboard"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Link></Button>
          <h1 className="text-lg font-semibold text-foreground hidden sm:block">Resume Builder</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="sm" className="lg:hidden rounded-xl" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-4 h-4 mr-1" /> {showPreview ? "Edit" : "Preview"}
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-border/40 hidden sm:flex"><Sparkles className="w-4 h-4 mr-1 text-primary" /> AI Improve</Button>
          <Button variant="hero" size="sm" className="rounded-xl"><Download className="w-4 h-4 mr-1" /> <span className="hidden sm:inline">Download</span> PDF</Button>
        </div>
      </header>

      <div className="flex flex-1 h-[calc(100vh-64px)]">
        {/* Left — Form */}
        <div className={`w-full lg:w-1/2 overflow-auto p-4 md:p-6 space-y-5 ${showPreview ? "hidden lg:block" : ""}`}>
          {/* ATS Score */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border/30 p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">ATS Score</span>
              <span className="text-sm font-bold text-success flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 94/100</span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "94%" }} transition={{ duration: 1.5, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary to-success rounded-full" />
            </div>
          </motion.div>

          {/* Template */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2"><Layout className="w-4 h-4 text-primary" /> Template</label>
            <div className="flex flex-wrap gap-2">
              {templates.map((t) => (
                <button key={t} onClick={() => setActiveTemplate(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeTemplate === t ? "bg-primary text-primary-foreground shadow-glow" : "bg-card border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/20"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {sections.map((section, i) => (
            <motion.div key={section.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border/30 p-5 shadow-card hover:shadow-card-hover transition-all duration-500 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab active:cursor-grabbing" />
                  <section.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{section.label}</h3>
                </div>
              </div>
              <div className="space-y-3">
                {section.fields.map((field) => (
                  <input key={field} type="text" placeholder={field}
                    className="w-full h-12 px-4 rounded-xl bg-muted/30 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
                ))}
                <textarea placeholder="Add details..." rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none transition-all" />
              </div>
            </motion.div>
          ))}

          <Button variant="outline" className="w-full rounded-xl border-dashed border-border/40 hover:border-primary/30 hover:bg-accent/30">
            <Plus className="w-4 h-4 mr-1" /> Add Section
          </Button>
        </div>

        {/* Right — Preview */}
        <div className={`flex-1 items-start justify-center p-4 md:p-6 bg-muted/20 overflow-auto ${showPreview ? "flex" : "hidden lg:flex"}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[595px] bg-card rounded-2xl shadow-card-lg border border-border/30" style={{ aspectRatio: "1/1.414" }}
          >
            <div className="p-6 sm:p-10">
              <div className="border-b-2 border-primary pb-4 mb-6">
                <h2 className="text-h2 text-foreground">John Doe</h2>
                <p className="text-muted-foreground">Senior Software Engineer</p>
                <p className="text-sm text-muted-foreground mt-1">john@example.com · San Francisco, CA</p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Experience</h3>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted/50 rounded w-3/4" />
                    <div className="h-3 bg-muted/50 rounded w-full" />
                    <div className="h-3 bg-muted/50 rounded w-5/6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Education</h3>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted/50 rounded w-2/3" />
                    <div className="h-3 bg-muted/50 rounded w-1/2" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "Python", "AWS"].map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
