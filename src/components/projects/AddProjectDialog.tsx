
import { useState } from "react";
import { Project } from "../ProjectCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PlusCircle, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { toast } from "sonner";

interface AddProjectDialogProps {
  onAddProject: (project: Omit<Project, 'id'>, image: File | null) => Promise<void>;
}

const AddProjectDialog = ({ onAddProject }: AddProjectDialogProps) => {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
    imageUrl: "/placeholder.svg",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleSubmit = async () => {
    if (!newProject.title || !newProject.description || !newProject.technologies) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    try {
      await onAddProject(
        {
          ...newProject,
          technologies: newProject.technologies.split(',').map(tech => tech.trim()),
          featured: false,
        },
        selectedImage
      );

      setNewProject({
        title: "",
        description: "",
        technologies: "",
        link: "",
        imageUrl: "/placeholder.svg",
      });
      setSelectedImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
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
            <Button onClick={handleSubmit} disabled={isUploading}>
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
  );
};

export default AddProjectDialog;
