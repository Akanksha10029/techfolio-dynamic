import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ProjectCard, { Project } from "@/components/ProjectCard";
import { supabase } from "@/lib/supabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [showAdminCheck, setShowAdminCheck] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  // Clear localStorage on page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('hasSeenWelcome');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check and show welcome message only if user is not logged in
    if (!session) {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setShowAdminCheck(true);
        localStorage.setItem('hasSeenWelcome', 'true');
      }
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [session]);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      const { data, error } = await supabase
        .from('porfolio projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        const formattedProjects = data.map(project => ({
          id: String(project.id),
          title: project.description || "",
          description: project.description || "",
          technologies: project["technologies used"] ? project["technologies used"].split(',') : [],
          imageUrl: project.image_url || "/placeholder.svg",
          link: project["github link"] || "",
          featured: true
        }));
        setFeaturedProjects(formattedProjects);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const handleAdminChoice = (isAdmin: boolean) => {
    setShowAdminCheck(false);
    if (isAdmin && !session) {
      navigate("/auth");
    }
  };

  return (
    <>
      <AlertDialog open={showAdminCheck} onOpenChange={setShowAdminCheck}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome to my Portfolio</AlertDialogTitle>
            <AlertDialogDescription>
              Are you visiting as an admin?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleAdminChoice(false)}>
              No, just browsing
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAdminChoice(true)}>
              Yes, I'm an admin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen animate-fadeIn space-y-20 p-6 pt-20 lg:p-20">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="space-y-6 text-center">
            <h1 className="space-y-2 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              <div className="typewriter inline-block" style={{ 
                animation: "typing 2s steps(20, end), blink 0.5s step-end infinite",
                animationDelay: "0.5s"
              }}>
                Hi, I'm <span className="text-primary">Your Name</span>
              </div>
              <br />
              <div className="typewriter inline-block" style={{ 
                animation: "typing 2s steps(20, end), blink 0.5s step-end infinite",
                animationDelay: "2.5s"
              }}>
                Full Stack Developer
              </div>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              I craft beautiful, functional websites and applications using modern technologies.
              Let's create something amazing together.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/projects" className="group">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">
              Here are some of my recent works
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
