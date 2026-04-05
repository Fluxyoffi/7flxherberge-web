import { motion } from "framer-motion";
import { Cpu, Shield, Headset, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";

const features = [
  { icon: Cpu, label: "Bare-Metal Performance Hardware" },
  { icon: Shield, label: "Enterprise-Grade DDoS Protection" },
  { icon: Headset, label: "24/7 Priority VIP Support" },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-10 sm:p-16">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full border border-primary/20 bg-primary/[0.08] text-primary text-sm font-bold uppercase tracking-[0.15em] mb-6">
                Why Choose {siteConfig.shortName}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-6">
                Unmatched Quality In{" "}
                <span className="gradient-text">Every Byte</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-lg">
                We don't just provide services; we deliver peak performance and
                99.9% uptime. Our team of experts ensures your digital assets are
                always at their absolute best.
              </p>

              <div className="grid gap-5 mb-10">
                {features.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 font-semibold text-base"
                  >
                    <Icon className="text-secondary w-5 h-5 flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  document
                    .getElementById("explore")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold bg-gradient-to-br from-primary to-[hsl(240,70%,55%)] text-primary-foreground shadow-[0_20px_40px_hsl(var(--accent-glow))] hover:-translate-y-1 transition-all duration-300"
              >
                Secure Your Service <Zap size={18} />
              </button>
            </div>

            {/* Visual panel */}
            <div className="hidden lg:flex items-center justify-center relative bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="w-[300px] h-[300px] rounded-full bg-primary/20 blur-[120px] animate-float" />
              <span className="absolute text-[12rem] font-black text-foreground/[0.03] select-none">
                {siteConfig.shortName}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
