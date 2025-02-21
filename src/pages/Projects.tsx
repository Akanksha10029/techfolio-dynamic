
import ProjectCard, { Project } from "@/components/ProjectCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with React and Node.js",
    technologies: ["React", "Node.js", "PostgreSQL"],
    imageUrl: "/placeholder.svg",
    link: "#",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    imageUrl: "/placeholder.svg",
    link: "#",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = () => {
    const newProject: Project = {
      id: String(projects.length + 1),
      title: `New Project ${projects.length + 1}`,
      description: "Description for the new project",
      technologies: ["React", "TypeScript"],
      imageUrl: "/placeholder.svg",
      link: "#",
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="min-h-screen animate-fadeIn space-y-8 p-6 lg:p-20">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Projects</h1>
        <Button onClick={addProject} className="group">
          <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Project
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
