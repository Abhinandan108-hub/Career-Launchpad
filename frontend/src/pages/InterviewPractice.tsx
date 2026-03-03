import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic, MicOff, Clock, RotateCcw, Play, MessageSquare, Star, BookOpen, Sparkles, Trophy, Target } from "lucide-react";

const categories = ["Behavioral", "Technical", "System Design", "Product", "Leadership", "Case Study"];

const sampleQuestions = [
  "Tell me about a time you had to deal with a difficult team member and how you resolved the conflict.",
  "Describe a project where you had to learn a completely new technology stack under a tight deadline.",
  "How do you prioritize tasks when you have multiple competing deadlines from different stakeholders?",
  "Walk me through a time you failed at something and what you learned from the experience.",
];

const InterviewPractice = () => {
  const [recording, setRecording] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Behavioral");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [seconds, setSeconds] = useState(0);

  return (
    <div className="min-h-screen bg-dashboard">
      <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border/30 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild><Link to="/dashboard"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Link></Button>
          <h1 className="text-lg font-semibold text-foreground hidden sm:block">Interview Practice</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/30 text-muted-foreground text-sm shadow-elevation-1">
            <Clock className="w-4 h-4" /> 02:30
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent border border-primary/10 text-sm">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-accent-foreground font-medium">Study Mode</span>
          </div>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto p-4 md:p-6 space-y-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); setShowFeedback(false); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat ? "bg-primary text-primary-foreground shadow-glow" : "bg-card border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}>{cat}</button>
          ))}
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion + selectedCategory}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="bg-card rounded-2xl border border-border/30 p-6 md:p-8 text-center shadow-card relative overflow-hidden"
          >
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Question {currentQuestion + 1} · {selectedCategory}</p>
              <p className="text-lg md:text-h3 text-foreground max-w-[600px] mx-auto leading-relaxed">
                {sampleQuestions[currentQuestion % sampleQuestions.length]}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setRecording(!recording); if (recording) setShowFeedback(true); }}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
              recording
                ? "bg-destructive text-destructive-foreground animate-pulse-glow shadow-elevation-3"
                : "bg-primary text-primary-foreground hover:scale-105 shadow-glow"
            }`}>
            {recording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </motion.button>
          <p className="text-sm text-muted-foreground">{recording ? "Recording... Click to stop & get feedback" : "Click to start recording your answer"}</p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="rounded-xl border-border/40" onClick={() => { setCurrentQuestion(currentQuestion + 1); setShowFeedback(false); }}>
              <RotateCcw className="w-4 h-4 mr-1" /> Next Question
            </Button>
            <Button variant="hero" size="sm" className="rounded-xl"><Play className="w-4 h-4 mr-1" /> New Session</Button>
          </div>
        </div>

        {/* AI Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              className="bg-card rounded-2xl border border-border/30 p-6 space-y-5 shadow-card overflow-hidden"
            >
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> AI Feedback
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { label: "Content", score: 85, icon: Target },
                  { label: "Delivery", score: 72, icon: Mic },
                  { label: "Structure", score: 90, icon: Trophy },
                ].map((m) => (
                  <div key={m.label} className="text-center p-3 sm:p-4 rounded-xl bg-muted/30 border border-border/20">
                    <m.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-2">{m.label}</p>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${m.score}%` }} transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full rounded-full ${m.score >= 80 ? "bg-success" : m.score >= 60 ? "bg-warning" : "bg-destructive"}`} />
                    </div>
                    <p className="text-lg font-bold text-foreground mt-2">{m.score}%</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-accent/30 border border-primary/10">
                <p className="text-sm text-foreground leading-relaxed">
                  <strong>Great structure!</strong> Your STAR method usage was solid. Consider adding more specific metrics and quantifiable outcomes. Your delivery was confident — try slowing down slightly during key points for emphasis. Overall, a strong response that would impress most interviewers.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InterviewPractice;
