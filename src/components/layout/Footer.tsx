import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-8 border-t border-border/60">
      <div className="container py-8 pb-24 md:pb-8 text-sm flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6">
        <p className="text-muted-foreground text-center md:text-left">© {new Date().getFullYear()} IJTIMA.SITE</p>
        <nav className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-4">
          <Link to="/archive" className="hover:text-accent-foreground text-muted-foreground">Search</Link>
          <a href="#" className="hover:text-accent-foreground text-muted-foreground">Stats</a>
          <Link to="/views" className="hover:text-accent-foreground text-muted-foreground">Views</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
