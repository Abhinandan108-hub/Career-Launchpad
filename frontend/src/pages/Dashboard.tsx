import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, Briefcase, Send, Mic, Radio, Settings,
  Search, Bell, ChevronRight, TrendingUp, Users, Target, BarChart3, Menu, Zap, X, ArrowUpRight, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: FileText, label: "Resume Builder", path: "/dashboard/resume" },
  { icon: Briefcase, label: "Job Feed", path: "/dashboard/jobs" },
  { icon: Send, label: "Applications", path: "/dashboard/applications" },
  { icon: Mic, label: "Interview Practice", path: "/dashboard/interview-practice" },
  { icon: Radio, label: "Interview Live", path: "/dashboard/interview-live" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const stats = [
  { label: "Applications Sent", value: "142", change: "+12 this week", icon: Send, color: "bg-primary" },
  { label: "Interview Invites", value: "8", change: "+3 new", icon: Users, color: "bg-success" },
  { label: "Resume Score", value: "94", change: "Top 5%", icon: Target, color: "bg-warning" },
  { label: "Job Matches", value: "256", change: "24 new today", icon: TrendingUp, color: "bg-info" },
];

const recentApps = [
  { company: "Google", role: "Senior Frontend Engineer", status: "Interview Scheduled", statusColor: "bg-success", date: "Feb 28" },
  { company: "Meta", role: "Product Designer", status: "Under Review", statusColor: "bg-warning", date: "Feb 27" },
  { company: "Stripe", role: "Full Stack Developer", status: "Applied", statusColor: "bg-info", date: "Feb 26" },
  { company: "Netflix", role: "Data Scientist", status: "Interview Scheduled", statusColor: "bg-success", date: "Feb 25" },
  { company: "Airbnb", role: "UX Researcher", status: "Applied", statusColor: "bg-info", date: "Feb 24" },
];

const upcomingInterviews = [
  { company: "Google", role: "Senior Frontend Engineer", date: "Mar 3", time: "10:00 AM PST" },
  { company: "Netflix", role: "Data Scientist", date: "Mar 5", time: "2:00 PM PST" },
];

const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dashboard flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-[260px] bg-card border-r border-border/30 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-border/30">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">Career<span className="text-primary">Copilot</span></span>
          </Link>
          <button className="lg:hidden ml-auto p-1.5 rounded-lg hover:bg-muted" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-auto">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}>
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? "" : ""}`} />
                {item.label}
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/30">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-sm">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border/30 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors active:scale-95" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search jobs, applications..." className="h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-[280px] transition-all focus:w-[320px]" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-muted transition-all duration-300 active:scale-95 group">
              <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive animate-pulse" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-sm cursor-pointer hover:scale-110 hover:shadow-glow transition-all duration-300">JD</div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-h2 md:text-h1 text-foreground mb-1">Welcome back, John 👋</h1>
            <p className="text-muted-foreground mb-6">Here's your job search overview for today.</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border/30 p-5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm text-muted-foreground">{stat.label}</span>
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center shadow-elevation-1 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <p className="text-h2 text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="lg:col-span-2 bg-card rounded-2xl border border-border/30 p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Applications</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">View All <ChevronRight className="w-4 h-4 ml-1" /></Button>
              </div>
              <div className="space-y-2">
                {recentApps.map((app) => (
                  <div key={app.company + app.role} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary font-bold text-sm group-hover:scale-105 group-hover:shadow-glow transition-all flex-shrink-0">{app.company[0]}</div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{app.role}</p>
                        <p className="text-xs text-muted-foreground">{app.company} · {app.date}</p>
                      </div>
                    </div>
                    <span className={`hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-medium text-primary-foreground ${app.statusColor} flex-shrink-0`}>{app.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Interviews */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="bg-card rounded-2xl border border-border/30 p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Upcoming</h3>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.company} className="p-4 rounded-xl bg-accent/30 border border-primary/10 group hover:bg-accent/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">{interview.company[0]}</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{interview.company}</p>
                        <p className="text-xs text-muted-foreground">{interview.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{interview.date} · {interview.time}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl border-dashed border-border/40 hover:border-primary/30 text-sm" asChild>
                  <Link to="/dashboard/interview-practice">Practice Now</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
