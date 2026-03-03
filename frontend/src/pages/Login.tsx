import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { http, API_URL, extractErrorMessage } from "@/lib/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      await http.post("/api/auth/login", payload);
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — branding */}
      <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-btn" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-primary-foreground/[0.05] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-foreground/[0.03] blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-[420px] relative z-10 px-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-primary-foreground/10">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-h1 mb-4 text-balance">Welcome Back</h2>
          <p className="text-body-lg opacity-75 mb-8">
            Continue your journey to landing your dream job with AI-powered tools.
          </p>
          <div className="space-y-3">
            {["Resume optimization", "Interview practice", "Real-time copilot"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm opacity-70">
                <CheckCircle className="w-4 h-4" />
                <span>{item}</span>
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

          <h1 className="font-display text-h1 text-foreground mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-8">Enter your credentials to access your dashboard.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                placeholder="Password"
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

            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>

            {loginMutation.error && (
              <p className="text-sm text-destructive text-center">
                {extractErrorMessage(loginMutation.error)}
              </p>
            )}

            <Button
              variant="hero"
              className="w-full h-14 rounded-xl text-base"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40" /></div>
              <div className="relative flex justify-center"><span className="px-4 bg-background text-sm text-muted-foreground">or continue with</span></div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-14 rounded-xl gap-3 border-border/40 hover:bg-accent/50"
              onClick={handleGoogleSignIn}
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">Sign up free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
