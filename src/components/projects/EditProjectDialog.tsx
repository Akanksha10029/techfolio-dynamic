import { useState } from "react";
import { Project } from "@/types/project";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { toast } from "sonner";
import { processTechnologiesArray } from "@/utils/projectUtils";

interface EditProjectDialogProps {
  project: Project;
  onUpdateProject: (project: Project, image: File | null) => Promise<void>;
  onCancel: () => void;
}

const EditProjectDialog = ({ project, onUpdateProject, onCancel }: EditProjectDialogProps) => {
  const [editedProject, setEditedProject] = useState<Project>({...project});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedProject({
      ...editedProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!editedProject.title || !editedProject.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    try {
      // Process technologies using the utility function
      const processedTechnologies = processTechnologiesArray(editedProject.technologies);
      
      await onUpdateProject(
        {
          ...editedProject,
          technologies: processedTechnologies
        },
        selectedImage
      );
      toast.success("Project updated successfully!");
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setIsUploading(false);
    }
  };

  // Helper function to get a string representation of technologies for the input field
  const getTechnologiesString = (): string => {
    const techValue = editedProject.technologies;
    if (Array.isArray(techValue)) {
      return techValue.join(', ');
    }
    if (typeof techValue === 'string') {
      return techValue;
    }
    return '';
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Input
              placeholder="Project Title"
              name="title"
              value={editedProject.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Textarea
              placeholder="Project Description"
              name="description"
              value={editedProject.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              placeholder="Technologies (comma-separated)"
              name="technologies"
              value={getTechnologiesString()}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              placeholder="GitHub Link"
              name="link"
              value={editedProject.link}
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
            {!selectedImage && editedProject.imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-1">Current image:</p>
                <img 
                  src={editedProject.imageUrl} 
                  alt="Current project" 
                  className="h-32 w-auto object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <DialogClose asChild>
            <Button onClick={handleSubmit} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Project'
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
