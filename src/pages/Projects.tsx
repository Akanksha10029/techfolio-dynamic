import ProjectCard, { Project } from "@/components/ProjectCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Upload } from "lucide-react";
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
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const Projects = () => {
  const { session } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
    imageUrl: "/placeholder.svg",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('porfolio projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedProjects = data.map(project => ({
        id: String(project.id),
        title: project.title || "",
        description: project.description || "",
        technologies: project["technologies used"] ? project["technologies used"].split(',') : [],
        imageUrl: project.image_url || "/placeholder.svg",
        link: project["github link"] || "",
        featured: project.featured || false
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    }
  };

  const handleToggleFeature = async (projectId: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('porfolio projects')
        .update({ featured })
        .eq('id', parseInt(projectId));

      if (error) {
        if (error.message.includes('Cannot feature more than 3 projects')) {
          toast.error('You can only feature up to 3 projects');
          return;
        }
        throw error;
      }

      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, featured } : project
      ));

      toast.success(
        featured ? "Project added to featured" : "Project removed from featured"
      );
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.technologies) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = "/placeholder.svg";
      
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const { data, error } = await supabase
        .from('porfolio projects')
        .insert([
          {
            title: newProject.title,
            description: newProject.description,
            "technologies used": newProject.technologies,
            "github link": newProject.link,
            image_url: imageUrl,
            featured: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setProjects([
          {
            id: String(data.id),
            title: data.title || "",
            description: data.description || "",
            technologies: data["technologies used"] ? data["technologies used"].split(',') : [],
            imageUrl: data.image_url || "/placeholder.svg",
            link: data["github link"] || "",
            featured: data.featured || false
          },
          ...projects
        ]);
      }

      setNewProject({
        title: "",
        description: "",
        technologies: "",
        link: "",
        imageUrl: "/placeholder.svg",
      });
      setSelectedImage(null);
      toast.success("Project added successfully!");
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to add project');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('porfolio projects')
        .delete()
        .eq('id', parseInt(id));

      if (error) throw error;

      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen animate-fadeIn p-6 pt-20 lg:p-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        {session && (
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
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {selectedImage && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedImage.name}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={addProject} disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Upload className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Add Project'
                    )}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="group relative">
            <ProjectCard 
              project={project} 
              onToggleFeature={session ? handleToggleFeature : undefined}
            />
            {session && (
              <div className="absolute right-2 top-2 z-10">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
