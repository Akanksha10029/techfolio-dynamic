import { Home, User, Briefcase, Mail, Menu, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {
    session,
    signOut
  } = useAuth();
  const navItems = [{
    path: "/",
    icon: <Home className="h-5 w-5" />,
    label: "Home"
  }, {
    path: "/about",
    icon: <User className="h-5 w-5" />,
    label: "About"
  }, {
    path: "/projects",
    icon: <Briefcase className="h-5 w-5" />,
    label: "Projects"
  }, {
    path: "/contact",
    icon: <Mail className="h-5 w-5" />,
    label: "Contact"
  }];
  return <>
      <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center backdrop-blur-sm lg:hidden my-[9px] py-[19px] px-0 mx-[25px] bg-black">
        <button onClick={() => setIsOpen(!isOpen)} className="rounded-full bg-secondary p-2 transition-transform duration-300 hover:scale-110" aria-label="Toggle navigation">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <nav className={`fixed left-0 top-0 z-40 flex h-full w-64 transform flex-col justify-center bg-background/95 p-6 backdrop-blur-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col justify-center">
          <div className="space-y-8">
            <div className="mb-8 mt-16 lg:mt-0">
              <h2 className="text-2xl font-bold text-primary">Portfolio</h2>
            </div>
            <ul className="space-y-4">
              {navItems.map(item => <li key={item.path}>
                  <Link to={item.path} className={`nav-item rotate-hover ${location.pathname === item.path ? "active" : ""}`} onClick={() => setIsOpen(false)}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>
        <div className="glass-card mt-auto p-4">
          {session ? <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will end your current session.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={signOut}>Confirm Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> : <div className="space-y-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/auth">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login as Admin
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                © 2024 Portfolio. All rights reserved.
              </p>
            </div>}
        </div>
      </nav>
    </>;
};
export default Navigation;