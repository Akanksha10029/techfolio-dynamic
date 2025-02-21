
import { Home, User, Briefcase, Mail, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { path: "/about", icon: <User className="h-5 w-5" />, label: "About" },
    { path: "/projects", icon: <Briefcase className="h-5 w-5" />, label: "Projects" },
    { path: "/contact", icon: <Mail className="h-5 w-5" />, label: "Contact" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-full bg-secondary p-2 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <nav
        className={`fixed left-0 top-0 z-40 h-full w-64 transform bg-background/95 p-6 backdrop-blur-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary">Portfolio</h2>
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-item rotate-hover ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
