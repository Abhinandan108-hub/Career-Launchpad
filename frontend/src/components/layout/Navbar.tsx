import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgress from "./ScrollProgress";

const navLinks = [
  { label: "Features", path: "/features" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Pricing", path: "/pricing" },
  {
    label: "Resources", path: "/resources",
    children: [
      { label: "Blog", path: "/blog" },
      { label: "Tools", path: "/resources" },
      { label: "Changelog", path: "/changelog" },
    ],
  },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  return (
    <>
      <ScrollProgress />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-card/80 backdrop-blur-2xl shadow-elevation-2 border-b border-border/30"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Career<span className="text-primary">Copilot</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.children && setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={link.children ? "#" : link.path}
                  onClick={(e) => link.children && e.preventDefault()}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group flex items-center gap-1 ${
                    location.pathname === link.path || link.children?.some((c) => location.pathname === c.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen === link.label ? "rotate-180" : ""}`} />}
                  {(location.pathname === link.path || link.children?.some((c) => location.pathname === c.path)) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-accent rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-1/2" />
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && dropdownOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 py-2 bg-card/95 backdrop-blur-2xl rounded-xl border border-border/40 shadow-elevation-3"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-4 py-2.5 text-sm transition-all duration-200 hover:bg-accent/50 ${
                            location.pathname === child.path ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button variant="hero" size="default" className="px-6 py-2.5 text-sm rounded-xl" asChild>
              <Link to="/signup">Start Free →</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-muted transition-all duration-300 active:scale-95"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden bg-card/95 backdrop-blur-2xl border-b border-border/40 shadow-elevation-3 overflow-hidden"
            >
              <div className="container-wide py-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.children ? (
                      <div>
                        <button
                          onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === link.label ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {dropdownOpen === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-6"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  onClick={() => setMobileOpen(false)}
                                  className="block px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          location.pathname === link.path
                            ? "bg-accent text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/40">
                  <Button variant="ghost" asChild>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>Log In</Link>
                  </Button>
                  <Button variant="hero" asChild>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>Start Free →</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
