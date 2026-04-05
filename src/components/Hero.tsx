import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <header
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center pt-[90px] px-4 relative overflow-hidden"
    >
      {/* Background flows */}
      <div className="hero-glow top-[-20%] left-[-10%]" />
      <div className="hero-glow bottom-[-20%] right-[-10%]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-primary text-xs font-bold uppercase tracking-[0.25em] mb-8 shadow-2xl backdrop-blur-md">
          <Sparkles size={14} className="text-white/60" />
          The Future of Digital Hosting
        </div>

        <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-black font-heading mb-8 leading-[0.9] tracking-tighter">
          ELEVATE YOUR <br />
          <span className="gradient-text">DIGITAL WORLD</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/50 max-w-[800px] mx-auto mb-12 font-medium tracking-tight">
          {siteConfig.description}
        </p>

        <div className="flex flex-wrap gap-6 justify-center items-center">
          <button
            onClick={() =>
              document
                .getElementById("explore")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl gradient-silver text-black shadow-22xl hover:scale-105 transition-all duration-500 active:scale-95"
          >
            DISCOVER SERVICES <ArrowRight size={22} strokeWidth={3} />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl glass text-white hover:bg-white/10 transition-all duration-500"
          >
            LEARN MORE
          </button>
        </div>
      </motion.div>
    </header>
  );
}
