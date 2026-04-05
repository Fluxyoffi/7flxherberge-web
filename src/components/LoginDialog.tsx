import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      const res = await register(formData.name, formData.email, formData.password);
      if (res.success) onClose();
      else setError(res.error || "Registration failed");
    } else {
      const res = await login(formData.email, formData.password);
      if (res.success) onClose();
      else setError(res.error || "Login failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md glass p-8 rounded-3xl shadow-2xl border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black font-heading mb-2">
            {isRegister ? "Create " : "Welcome "}
            <span className="gradient-text">{isRegister ? "Account" : "Back"}</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            {isRegister 
              ? "Join elite hosting community today." 
              : "Login to access your high-performance services."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {isRegister && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <input
              required
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <input
              required
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-lg text-center font-semibold">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                {isRegister ? "Register Now" : "Sign In"}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary font-bold hover:underline"
            >
              {isRegister ? "Sign In" : "Register"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
