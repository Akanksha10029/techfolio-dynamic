
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen animate-fadeIn space-y-20 p-6 pt-20 lg:p-20">
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="space-y-6 text-center">
          <h1 className="space-y-2 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            <div className="typewriter inline-block" style={{ 
              animation: "typing 2s steps(20, end), blink 0.5s step-end infinite",
              animationDelay: "0.5s"
            }}>
              Hi, I'm <span className="text-primary">Your Name</span>
            </div>
            <br />
            <div className="typewriter inline-block" style={{ 
              animation: "typing 2s steps(20, end), blink 0.5s step-end infinite",
              animationDelay: "2.5s"
            }}>
              Full Stack Developer
            </div>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            I craft beautiful, functional websites and applications using modern technologies.
            Let's create something amazing together.
          </p>
          <div className="flex justify-center gap-4">
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

      <div>
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">
            Here are some of my recent works
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
