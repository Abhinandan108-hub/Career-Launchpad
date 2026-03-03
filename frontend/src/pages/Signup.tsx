import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle, Shield } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { http, API_URL, extractErrorMessage } from "@/lib/api";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const signupMutation = useMutation({
    mutationFn: async (payload: { name: string; email: string; password: string }) => {
      await http.post("/api/auth/register", payload);
    },
    onSuccess: () => {
      setSuccessMessage("Account created! Please check your email to verify your account.");
      setTimeout(() => navigate("/dashboard"), 1500);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    signupMutation.mutate({ name, email, password });
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — branding */}
      <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-btn" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-primary-foreground/[0.04] blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-[420px] relative z-10 px-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-primary-foreground/10">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-h1 mb-4">Start Your Journey</h2>
          <p className="text-body-lg opacity-75 mb-8">
            Join 50,000+ professionals using AI to land their dream jobs faster than ever.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm opacity-70">
            {[
              { value: "96%", label: "Success Rate" },
              { value: "50K+", label: "Users" },
              { value: "7,200+", label: "Interviews Aced" },
              { value: "1,500+", label: "Offers Landed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl bg-primary-foreground/5 backdrop-blur-sm">
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          <Link to="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Career<span className="text-primary">Copilot</span></span>
          </Link>

          <h1 className="font-display text-h1 text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Start your free 14-day trial. No credit card needed.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300"
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full h-14 pl-12 pr-12 rounded-xl bg-card border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {signupMutation.error && (
              <p className="text-sm text-destructive text-center">
                {extractErrorMessage(signupMutation.error)}
              </p>
            )}
            {successMessage && (
              <p className="text-sm text-success text-center">{successMessage}</p>
            )}

            <Button
              variant="hero"
              className="w-full h-14 rounded-xl text-base"
              type="submit"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Creating Account..." : "Create Account"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
              <Shield className="w-3 h-3" /> Your data is encrypted and never shared
            </p>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40" /></div>
              <div className="relative flex justify-center"><span className="px-4 bg-background text-sm text-muted-foreground">or continue with</span></div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-14 rounded-xl gap-3 border-border/40 hover:bg-accent/50"
              onClick={handleGoogleSignUp}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
