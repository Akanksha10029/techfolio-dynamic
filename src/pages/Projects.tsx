
import { useState } from "react";
import ProjectCard, { Project } from "@/components/ProjectCard";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import AddProjectDialog from "@/components/projects/AddProjectDialog";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";
import EditProjectDialog from "@/components/projects/EditProjectDialog";

const Projects = () => {
  const { session } = useAuth();
  const { projects, addProject, deleteProject, toggleProjectFeature, updateProject } = useProjects();
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
  };

  const handleUpdateProject = async (updatedProject: Project, image: File | null) => {
    await updateProject(updatedProject, image);
    setProjectToEdit(null);
  };

  return (
    <div className="min-h-screen animate-fadeIn p-6 pt-20 lg:p-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        {session && <AddProjectDialog onAddProject={addProject} />}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="group relative">
            <ProjectCard 
              project={project} 
              onToggleFeature={session ? toggleProjectFeature : undefined}
              onEdit={session ? handleEditProject : undefined}
            />
            {session && (
              <DeleteProjectDialog 
                onDelete={() => deleteProject(project.id)} 
              />
            )}
          </div>
        ))}
      </div>
      
      {projectToEdit && (
        <EditProjectDialog
          project={projectToEdit}
          onUpdateProject={handleUpdateProject}
          onCancel={() => setProjectToEdit(null)}
        />
      )}
    </div>
  );
};

export default Projects;
