import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Explorer from "@/components/Explorer";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import LoginDialog from "@/components/LoginDialog";
import { useState } from "react";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-radial-glow">
      <Navbar onLoginOpen={() => setIsLoginOpen(true)} />
      <Hero />
      <Explorer />
      <About />
      <Footer />
      <CartSidebar onLoginOpen={() => setIsLoginOpen(true)} />
      <LoginDialog isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default Index;
