
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  onToggleFeature?: (projectId: string, featured: boolean) => Promise<void>;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="glass-card group h-full overflow-hidden transition-all duration-300 hover:scale-105">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Admin action buttons will be added by the parent component */}
        </div>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-12rem)] min-h-[16rem] flex-col p-6">
        <CardTitle className="mb-2 text-xl">{project.title}</CardTitle>
        <CardDescription className="mb-4 flex-grow">{project.description}</CardDescription>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          {project.link && (
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => window.open(project.link, "_blank")}
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
