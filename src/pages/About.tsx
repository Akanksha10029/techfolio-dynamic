import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
const skills = ["React", "TypeScript", "Node.js", "Next.js", "TailwindCSS", "PostgreSQL", "GraphQL", "Docker"];
const About = () => {
  return <div className="min-h-screen animate-fadeIn space-y-12 p-6 lg:p-20 mx-[7px] my-[62px] px-[29px]">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">About Me</h1>
        <div className="glass-card max-w-3xl space-y-4 p-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a passionate Full Stack Developer with experience in building modern web
            applications. I love turning complex problems into simple, beautiful, and
            intuitive solutions.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            When I'm not coding, you can find me exploring new technologies, contributing
            to open source projects, or sharing my knowledge through blog posts and
            mentoring.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Skills & Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => <Badge key={skill} variant="secondary" className="text-base">
              {skill}
            </Badge>)}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Experience</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Senior Developer</h3>
              <p className="mb-2 text-primary">Tech Company • 2020 - Present</p>
              <p className="text-muted-foreground">
                Led development of multiple web applications, mentored junior developers,
                and implemented best practices.
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Full Stack Developer</h3>
              <p className="mb-2 text-primary">Another Company • 2018 - 2020</p>
              <p className="text-muted-foreground">
                Developed and maintained various web applications using React and Node.js.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>;
};
export default About;