import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-8 border-t border-border/60">
      <div className="container py-6 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground">© {new Date().getFullYear()} Ijtima Collection</p>
        <nav className="flex items-center gap-4">
          <Link to="/archive" className="hover:text-accent-foreground text-muted-foreground">Archive</Link>
          <a href="#" className="hover:text-accent-foreground text-muted-foreground">Stats</a>
          <a href="#" className="hover:text-accent-foreground text-muted-foreground">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
