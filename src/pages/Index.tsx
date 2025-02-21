
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center px-6 lg:px-20">
      <div className="animate-fadeIn space-y-6">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Hi, I'm <span className="text-primary">Your Name</span>
          <br />
          Full Stack Developer
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          I craft beautiful, functional websites and applications using modern technologies.
          Let's create something amazing together.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/projects" className="group">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
