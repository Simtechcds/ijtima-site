import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const nav = [
    { to: "/", label: "Home" },
    { to: "/south-africa", label: "South Africa" },
    { to: "/international", label: "International" },
    { to: "https://ijtima.mixlr.com/", label: "Live" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="w-full border-b border-border/60 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/lovable-uploads/c098dab8-8102-4ef1-aaaf-2c1af1046773.png" alt="IJTIMA.SITE logo" className="w-9 h-9 rounded-full" decoding="async" />
          <span className="font-semibold tracking-tight">IJTIMA.SITE</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {nav.map((n) => (
              n.to.startsWith('http') ? (
                <a
                  key={n.to}
                  href={n.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-foreground transition-colors text-muted-foreground"
                >
                  {n.label}
                </a>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `hover:text-accent-foreground transition-colors ${isActive ? "text-accent-foreground" : "text-muted-foreground"}`
                  }
                >
                  {n.label}
                </NavLink>
              )
            ))}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outlineBright" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="mt-6">
                  <ul className="grid gap-1">
                    {nav.map((n) => (
                      <li key={n.to}>
                        {n.to.startsWith('http') ? (
                          <a
                            href={n.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-md px-3 py-2 text-muted-foreground hover:bg-accent/40 hover:text-accent-foreground transition-colors"
                          >
                            {n.label}
                          </a>
                        ) : (
                          <SheetClose asChild>
                            <NavLink
                              to={n.to}
                              className={({ isActive }) =>
                                `block rounded-md px-3 py-2 transition-colors ${isActive ? "bg-accent/40 text-accent-foreground" : "text-muted-foreground hover:bg-accent/40 hover:text-accent-foreground"}`
                              }
                            >
                              {n.label}
                            </NavLink>
                          </SheetClose>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
