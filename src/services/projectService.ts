
import { supabase } from "@/lib/supabase";
import { Project, ProjectDB } from "@/types/project";
import { dbToProject, processProjectTechnologies } from "@/utils/projectUtils";

// Fetch all projects
export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('porfolio projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return data.map(project => dbToProject(project as ProjectDB));
};

// Upload project image to Supabase storage
export const uploadImage = async (file: File): Promise<string> => {
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

// Add a new project
export const addProject = async (
  projectData: Omit<Project, 'id'>,
  image: File | null
): Promise<Project> => {
  let imageUrl = "/placeholder.svg";
  
  if (image) {
    imageUrl = await uploadImage(image);
  }

  const technologiesString = processProjectTechnologies(projectData.technologies);

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

  return dbToProject(data as ProjectDB);
};

// Update existing project
export const updateProject = async (
  projectData: Project,
  image: File | null
): Promise<void> => {
  let imageUrl = projectData.imageUrl;
  
  if (image) {
    imageUrl = await uploadImage(image);
  }

  const technologiesString = processProjectTechnologies(projectData.technologies);

  const { error } = await supabase
    .from('porfolio projects')
    .update({
      description: projectData.description,
      "technologies used": technologiesString,
      "github link": projectData.link,
      image_url: imageUrl
    })
    .eq('id', parseInt(projectData.id));

  if (error) throw error;
};

// Delete a project
export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('porfolio projects')
    .delete()
    .eq('id', parseInt(id));

  if (error) throw error;
};

// Toggle project featured status
export const toggleProjectFeature = async (
  projectId: string, 
  featured: boolean
): Promise<void> => {
  const { error } = await supabase
    .from('porfolio projects')
    .update({ featured })
    .eq('id', parseInt(projectId));

  if (error) {
    if (error.message.includes('Cannot feature more than 3 projects')) {
      throw new Error('You can only feature up to 3 projects');
    }
    throw error;
  }
};
