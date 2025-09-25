import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="text-xl font-semibold tracking-tight">ProTools</div>
          <p className="text-sm text-muted-foreground">
            Premium tools and gear for professionals and serious DIYers.
          </p>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Shop</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/categories/power-tools"
                className="hover:text-foreground"
              >
                Power Tools
              </Link>
            </li>
            <li>
              <Link
                href="/categories/hand-tools"
                className="hover:text-foreground"
              >
                Hand Tools
              </Link>
            </li>
            <li>
              <Link
                href="/categories/accessories"
                className="hover:text-foreground"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link href="/categories/safety" className="hover:text-foreground">
                Safety
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Support</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/help" className="hover:text-foreground">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-foreground">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:text-foreground">
                Warranty
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex items-center justify-between">
          <p>© {new Date().getFullYear()} ProTools. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS, and shadcn/ui</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
