import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm">
          {siteConfig.copyright}
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
