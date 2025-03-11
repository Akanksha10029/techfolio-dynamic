
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
        title: project.title || project.description || "",
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

      const { data, error } = await supabase
        .from('porfolio projects')
        .insert([
          {
            title: projectData.title,
            description: projectData.description,
            "technologies used": projectData.technologies.join(','),
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
            title: data.title || data.description || "",
            description: data.description || "",
            technologies: data["technologies used"] ? data["technologies used"].split(',') : [],
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

      const { error } = await supabase
        .from('porfolio projects')
        .update({
          title: projectData.title,
          description: projectData.description,
          "technologies used": Array.isArray(projectData.technologies) 
            ? projectData.technologies.join(',')
            : projectData.technologies,
          "github link": projectData.link,
          image_url: imageUrl
        })
        .eq('id', parseInt(projectData.id));

      if (error) throw error;

      setProjects(projects.map(project => 
        project.id === projectData.id 
          ? {
              ...projectData,
              imageUrl: imageUrl,
              technologies: Array.isArray(projectData.technologies) 
                ? projectData.technologies
                : projectData.technologies.split(',').map(tech => tech.trim())
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
