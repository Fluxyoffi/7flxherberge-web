import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Network, Bot, Box, Car } from "lucide-react";
import { allProducts, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const iconMap: Record<string, React.ElementType> = {
  Zap, Network, Bot, Box, Car,
};

const categories = [
  { key: "all", label: "All Services" },
  { key: "tweaks", label: "Tweaks & Code" },
  { key: "bots", label: "Bot Hosting" },
  { key: "games", label: "Game Hosting" },
] as const;

export default function Explorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const { addToCart } = useCart();

  const filtered =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  const showBilling =
    activeCategory === "all" ||
    activeCategory === "bots" ||
    activeCategory === "games";

  return (
    <section id="explore" className="py-24 sm:py-32 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-5 py-2.5 rounded-full border border-primary/20 bg-primary/[0.08] text-primary text-sm font-bold uppercase tracking-[0.15em] mb-6">
            Our Marketplace
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-black mb-4">
            Explore <span className="gradient-text">Premium</span> Services
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Select a category to discover tailored solutions designed for maximum
            performance and reliability.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl border border-border bg-muted/30 gap-1.5 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-[0_10px_30px_hsl(var(--accent-glow))]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Billing toggle */}
        {showBilling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-6 p-1.5 glass rounded-2xl shadow-2xl">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-8 py-3 rounded-xl font-black text-xs tracking-widest transition-all duration-500 ${
                  billing === "monthly"
                    ? "gradient-silver text-black shadow-xl scale-105"
                    : "text-white/40 hover:text-white"
                }`}
              >
                MONTHLY
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-8 py-3 rounded-xl font-black text-xs tracking-widest transition-all duration-500 ${
                  billing === "yearly"
                    ? "gradient-silver text-black shadow-xl scale-105"
                    : "text-white/40 hover:text-white"
                }`}
              >
                YEARLY <span className="ml-1 opacity-60 text-[10px]">(-20%)</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                billing={billing}
                onAdd={addToCart}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  billing,
  onAdd,
}: {
  product: Product;
  billing: "monthly" | "yearly";
  onAdd: (item: any) => void;
}) {
  const [selectedVersion, setSelectedVersion] = useState(
    product.versions?.[0] || ""
  );

  const Icon = iconMap[product.icon] || Zap;

  const price = product.isSubscription
    ? product.hasVersions
      ? billing === "monthly"
        ? product.versionMonthlyPrices?.[selectedVersion] ?? 0
        : product.versionYearlyPrices?.[selectedVersion] ?? 0
      : billing === "monthly"
      ? product.monthly ?? 0
      : product.yearly ?? 0
    : product.hasVersions
    ? product.versionPrices?.[selectedVersion] ?? 0
    : product.price ?? 0;

  const interval = product.isSubscription
    ? billing === "monthly"
      ? "/mo"
      : "/yr"
    : "";

  const handleAdd = () => {
    let cartId = product.id;
    let name = product.name;

    if (product.hasVersions) {
      cartId = `${product.id}-${selectedVersion}`;
      name = `${product.name} (${selectedVersion})`;
    }
    if (product.isSubscription) {
      cartId = `${product.id}-${billing}`;
      name = `${product.name} (${billing})`;
    }

    onAdd({ cartId, name, price, interval, quantity: 1 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`glass p-10 flex flex-col relative overflow-hidden group ${
        product.isComingSoon
          ? "opacity-50 grayscale cursor-not-allowed border-white/5"
          : "hover:shadow-22xl"
      }`}
    >
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 relative">
          <Icon className="w-8 h-8 text-white/80" />
          
          {product.badge && !product.isComingSoon && (
            <span className="absolute -top-3 -right-3 px-3 py-1 rounded-lg border border-white/20 bg-black text-[9px] font-black tracking-widest text-white/60 uppercase shadow-2xl">
              {product.badge}
            </span>
          )}
        </div>

        {product.isComingSoon && (
          <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[10px] font-black tracking-widest text-white/40 uppercase">
            TBA
          </span>
        )}
      </div>

      <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-white transition-colors relative z-10 uppercase">
        {product.name}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow font-medium relative z-10">
        {product.description}
      </p>

      {product.isComingSoon && (
        <div className="mb-6 relative z-10 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
          <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/40">
            Available Soon
          </span>
        </div>
      )}

      {product.hasVersions && (
        <div className="mb-8 relative z-10">
          <label className="text-[10px] font-black text-white/30 tracking-widest uppercase mb-3 block">
            Select Configuration
          </label>
          <div className="grid grid-cols-2 gap-2">
            {product.versions?.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVersion(v)}
                className={`px-4 py-2.5 rounded-xl text-[11px] font-bold border transition-all duration-300 ${
                  selectedVersion === v
                    ? "border-white/40 bg-white/10 text-white"
                    : "border-white/5 bg-transparent text-white/40 hover:border-white/20"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {!product.isComingSoon ? (
        <div className="flex items-baseline gap-1 mb-8 relative z-10">
          <span className="text-3xl font-black tracking-tighter">
            €{price.toFixed(2)}
          </span>
          <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] ml-1">
            {interval}
          </span>
        </div>
      ) : (
        <div className="mb-8 py-4 relative z-10">
          <div className="h-px w-12 bg-white/10" />
        </div>
      )}

      <div className="mt-auto relative z-10">
        <button
          disabled={product.isComingSoon}
          onClick={handleAdd}
          className={`w-full py-5 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-500 ${
            product.isComingSoon
              ? "bg-white/5 text-white/10 border border-white/5"
              : "gradient-silver text-black hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
          }`}
        >
          {product.isComingSoon ? "COMING SOON" : "ADD TO CART"}
        </button>
      </div>
    </motion.div>
  );
}
