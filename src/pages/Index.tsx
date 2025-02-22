
import { useEffect, useState } from "react";
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
        .order('created_at', { ascending: false });

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
    <div className="min-h-screen animate-fadeIn p-6 pt-20 lg:p-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-lg text-muted-foreground">
          Check out some of my recent projects below
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
    </div>
  );
};

export default Index;
