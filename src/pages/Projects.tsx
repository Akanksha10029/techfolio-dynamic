
import ProjectCard, { Project } from "@/components/ProjectCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner";

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
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
    imageUrl: "/placeholder.svg",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const addProject = () => {
    if (!newProject.title || !newProject.description || !newProject.technologies) {
      toast.error("Please fill in all fields");
      return;
    }

    const projectToAdd: Project = {
      id: String(projects.length + 1),
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(",").map((tech) => tech.trim()),
      imageUrl: newProject.imageUrl,
      link: newProject.link,
    };

    setProjects([...projects, projectToAdd]);
    setNewProject({
      title: "",
      description: "",
      technologies: "",
      link: "",
      imageUrl: "/placeholder.svg",
    });
    toast.success("Project added successfully!");
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
    toast.success("Project deleted successfully!");
  };

  return (
    <div className="min-h-screen animate-fadeIn p-6 pt-20 lg:p-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="group">
              <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Input
                  placeholder="Project Title"
                  name="title"
                  value={newProject.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Project Description"
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  placeholder="Technologies (comma-separated)"
                  name="technologies"
                  value={newProject.technologies}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  placeholder="GitHub Link"
                  name="link"
                  value={newProject.link}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={addProject}>Add Project</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="group relative">
            <ProjectCard project={project} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 z-10 scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the project.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteProject(project.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
