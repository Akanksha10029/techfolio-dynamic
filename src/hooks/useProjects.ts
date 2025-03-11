
import { useState, useEffect } from 'react';
import { Project } from '@/components/ProjectCard';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('porfolio projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProjects = data.map(project => ({
        id: String(project.id),
        title: project.description || "",  // Use description as title since there's no title field
        description: project.description || "",
        technologies: project["technologies used"] ? project["technologies used"].split(',').map(tech => tech.trim()) : [],
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

  const addProject = async (
    projectData: Omit<Project, 'id'>,
    image: File | null
  ) => {
    try {
      let imageUrl = "/placeholder.svg";
      
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // Process technologies based on its type to ensure we're always saving a string
      const technologiesString = Array.isArray(projectData.technologies) 
        ? projectData.technologies.join(',') 
        : typeof projectData.technologies === 'string'
          ? projectData.technologies
          : "";

      const { data, error } = await supabase
        .from('porfolio projects')
        .insert([
          {
            description: projectData.description, // Use description for both title and description
            "technologies used": technologiesString,
            "github link": projectData.link,
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
            title: data.description || "",  // Use description as title
            description: data.description || "",
            technologies: data["technologies used"] ? data["technologies used"].split(',').map(tech => tech.trim()) : [],
            imageUrl: data.image_url || "/placeholder.svg",
            link: data["github link"] || "",
            featured: data.featured || false
          },
          ...projects
        ]);
      }

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
      let imageUrl = projectData.imageUrl;
      
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // Process technologies based on its type to ensure we're always saving a string
      const technologiesString = Array.isArray(projectData.technologies) 
        ? projectData.technologies.join(',') 
        : typeof projectData.technologies === 'string'
          ? projectData.technologies
          : "";

      const { error } = await supabase
        .from('porfolio projects')
        .update({
          description: projectData.description, // Save description to database
          "technologies used": technologiesString,
          "github link": projectData.link,
          image_url: imageUrl
        })
        .eq('id', parseInt(projectData.id));

      if (error) throw error;

      // Process technologies for the state update
      const processedTechnologies = Array.isArray(projectData.technologies) 
        ? projectData.technologies
        : typeof projectData.technologies === 'string'
          ? projectData.technologies.split(',').map(tech => tech.trim())
          : [];

      setProjects(projects.map(project => 
        project.id === projectData.id 
          ? {
              ...projectData,
              imageUrl: imageUrl,
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

  const toggleProjectFeature = async (projectId: string, featured: boolean) => {
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
