import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight font-heading">
                Spark <span className="text-primary">CRM</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs mb-6">
              The lightweight, AI-powered CRM designed specifically for the modern digital agency.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Image
                  src="https://www.svgrepo.com/show/473600/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Image
                  src="https://www.svgrepo.com/show/494278/linkedin-round.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Image
                  src="https://www.svgrepo.com/show/394174/github.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#pipeline" className="text-muted-foreground hover:text-primary transition-colors">Pipeline</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/changelog" className="text-muted-foreground hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Agency Blog</Link></li>
              <li><Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Spark CRM. All rights reserved.</p>
          <p>Built with ❤️ for Agencies.</p>
        </div>
      </div>
    </footer>
  );
}
