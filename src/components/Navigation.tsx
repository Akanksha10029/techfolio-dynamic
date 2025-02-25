
import { Home, User, Briefcase, Mail, Menu, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { session, signOut } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { path: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { path: "/about", icon: <User className="h-5 w-5" />, label: "About" },
    { path: "/projects", icon: <Briefcase className="h-5 w-5" />, label: "Projects" },
    { path: "/contact", icon: <Mail className="h-5 w-5" />, label: "Contact" },
  ];

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center bg-background/80 px-4 backdrop-blur-sm lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-secondary p-2 transition-transform duration-300 hover:scale-110"
          aria-label="Toggle navigation"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <nav
        className={`fixed left-0 top-0 z-40 flex h-full w-64 transform flex-col justify-center bg-background/95 p-6 backdrop-blur-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 lg:w-20 lg:hover:w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center">
          <div className="space-y-8">
            <div className="mb-8 mt-16 lg:mt-0">
              <h2 className="text-2xl font-bold text-primary opacity-100 transition-opacity duration-300 lg:text-center lg:opacity-0 lg:group-hover:opacity-100">
                Portfolio
              </h2>
            </div>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.path} className="group">
                  <Link
                    to={item.path}
                    className={`nav-item relative flex items-center gap-2 overflow-hidden px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary lg:justify-center lg:group-hover:justify-start ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="glass-card mt-auto p-4">
          {session ? (
            <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="group relative w-full overflow-hidden transition-all duration-300 hover:border-primary/50"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <LogOut className="h-5 w-5 animate-bounce text-primary" />
                  </div>
                  <span className="flex items-center justify-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span className="opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                      Logout
                    </span>
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will end your current session.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={signOut}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/auth" className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                    Login as Admin
                  </span>
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground text-center opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                © 2024 Portfolio. All rights reserved.
              </p>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
