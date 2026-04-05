import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, ShoppingCart, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Navbar({ onLoginOpen }: { onLoginOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "h-20 bg-background/85 backdrop-blur-xl border-b border-border"
          : "h-[90px]"
      }`}
    >
      <div className="container h-full flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 text-2xl font-black font-heading group"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("home");
          }}
        >
          <img 
            src={siteConfig.logoUrl} 
            alt={siteConfig.name} 
            className="w-9 h-9 object-contain transition-transform duration-300 group-hover:rotate-[10deg] group-hover:scale-110" 
          />
          <div className="flex">
            {siteConfig.shortName}<span className="gradient-text">{siteConfig.name.replace(siteConfig.shortName, "")}</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => scrollTo("home")}
            className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo("explore")}
            className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>

          <div className="flex items-center gap-4 border-l border-border pl-8 ml-2">
            <button
               onClick={() => setIsOpen(true)}
               className="relative text-muted-foreground hover:text-foreground transition-colors mr-2"
             >
               <ShoppingCart size={22} />
               {itemCount > 0 && (
                 <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                   {itemCount}
                 </span>
               )}
             </button>

             {user ? (
               <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10 ml-2">
                 <div className="flex flex-col items-end">
                   <span className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">Authenticated</span>
                   <span className="text-xs font-black truncate max-w-[100px] leading-none">{user.name}</span>
                 </div>
                 <button 
                   onClick={logout}
                   className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-all"
                   title="Logout"
                 >
                   <LogOut size={14} />
                 </button>
               </div>
             ) : (
               <button
                 onClick={onLoginOpen}
                 className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg"
               >
                 <LogIn size={16} /> Login
               </button>
             )}
           </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute top-full left-0 w-full p-6 flex flex-col gap-4"
        >
          <button onClick={() => scrollTo("home")} className="text-left font-semibold py-2">
            Home
          </button>
          <button onClick={() => scrollTo("explore")} className="text-left font-semibold py-2">
            Explore
          </button>
          <button onClick={() => scrollTo("about")} className="text-left font-semibold py-2">
            About
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              setIsOpen(true);
            }}
            className="flex items-center gap-2 font-semibold py-2"
          >
            <ShoppingCart size={18} /> Cart ({itemCount})
          </button>
        </motion.div>
      )}
    </nav>
  );
}
