
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
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="glass-card group overflow-hidden transition-all duration-300 hover:scale-105">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="mb-2 text-xl">{project.title}</CardTitle>
        <CardDescription className="mb-4">{project.description}</CardDescription>
        <div className="mb-4 flex flex-wrap gap-2">
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
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
