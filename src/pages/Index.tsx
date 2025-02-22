
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard, { Project } from "@/components/ProjectCard";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        throw error;
      }

      const formattedProjects = data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        imageUrl: project.image_url,
        link: project.link
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animate-fadeIn space-y-20 p-6 pt-20 lg:p-20">
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="space-y-6 text-center">
          <h1 className="space-y-2 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            <div className="typewriter inline-block">
              Hi, I'm <span className="text-primary">Your Name</span>
            </div>
            <br />
            <div className="typewriter inline-block" style={{ animationDelay: "2.5s" }}>
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
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">
            Here are some of my recent works
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No projects found. Add some projects from the Projects page!</p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button asChild variant="secondary">
              <Link to="/projects" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
