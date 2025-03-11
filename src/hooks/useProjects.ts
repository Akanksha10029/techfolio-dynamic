
import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { toast } from 'sonner';
import { 
  fetchProjects as fetchProjectsService,
  addProject as addProjectService,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
  toggleProjectFeature as toggleProjectFeatureService
} from '@/services/projectService';
import { processTechnologiesArray } from '@/utils/projectUtils';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const data = await fetchProjectsService();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    }
  };

  const addProject = async (
    projectData: Omit<Project, 'id'>,
    image: File | null
  ) => {
    try {
      const newProject = await addProjectService(projectData, image);
      setProjects([newProject, ...projects]);
      toast.success("Project added successfully!");
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to add project');
      throw error;
    }
  };

  const updateProject = async (
    projectData: Project,
    image: File | null
  ) => {
    try {
      await updateProjectService(projectData, image);
      
      // Process technologies for the state update
      const processedTechnologies = processTechnologiesArray(projectData.technologies);

      // Update local state
      setProjects(projects.map(project => 
        project.id === projectData.id 
          ? {
              ...projectData,
              technologies: processedTechnologies
            } 
          : project
      ));

      toast.success("Project updated successfully!");
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteProjectService(id);
      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const toggleProjectFeature = async (projectId: string, featured: boolean) => {
    try {
      await toggleProjectFeatureService(projectId, featured);
      
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, featured } : project
      ));

      toast.success(
        featured ? "Project added to featured" : "Project removed from featured"
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes('You can only feature up to 3 projects')) {
        toast.error('You can only feature up to 3 projects');
        return;
      }
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    addProject,
    deleteProject,
    toggleProjectFeature,
    updateProject
  };
};
