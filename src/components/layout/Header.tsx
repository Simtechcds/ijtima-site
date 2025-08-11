import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const nav = [
    { to: "/", label: "Home" },
    { to: "/south-africa", label: "South Africa" },
    { to: "/international", label: "International" },
    { to: "/live", label: "Live" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="w-full border-b border-border/60 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/lovable-uploads/82f80df7-e56d-4b4a-8a87-06bbe9c95483.png" alt="IJTIMA logo" className="w-9 h-9 rounded-full" />
          <span className="font-semibold tracking-tight">IJTIMA Collection</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `hover:text-accent-foreground transition-colors ${isActive ? "text-accent-foreground" : "text-muted-foreground"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
