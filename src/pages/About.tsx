import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const skills = ["React", "TypeScript", "Node.js", "Next.js", "TailwindCSS", "PostgreSQL", "GraphQL", "Docker"];

const education = [
  {
    school: "Chandigarh University",
    location: "Mohali, Punjab, IN",
    degree: "Bachelor of Engineering",
    specialization: "Computer science with business systems",
    grade: "8.50 CGPA",
    period: "Aug. 2022 – May 2026"
  },
  {
    school: "Kendriya Vidyalaya No. 3",
    location: "Ambala Cantt, HR, IN",
    degree: "Intermediate (12th CBSE)",
    grade: "91.6%",
    period: "April 2021 – March 2022"
  },
  {
    school: "Kendriya Vidyalaya No. 3",
    location: "Ambala Cantt, HR, IN",
    degree: "Intermediate (10th CBSE)",
    grade: "93%",
    period: "April 2019 – March 2020"
  }
];

const About = () => {
  return (
    <div className="min-h-screen animate-fadeIn space-y-12 p-6 lg:p-20 mx-[7px] my-[62px] px-[29px]">
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
        <h2 className="text-2xl font-bold">Education</h2>
        <div className="grid gap-6">
          {education.map((edu, index) => (
            <Card key={index} className="glass-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.school}</h3>
                    <p className="text-primary">{edu.degree}</p>
                    {edu.specialization && (
                      <p className="text-muted-foreground">{edu.specialization}</p>
                    )}
                    <p className="text-muted-foreground">{edu.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{edu.location}</p>
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Experience</h2>
        <div className="grid gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Event Coordinator</h3>
                  <p className="text-primary">Hackoverflow Society</p>
                  <p className="text-muted-foreground mt-2">
                    Orchestrated the planning, promotion, and execution of successful events within a six-month period, 
                    enhancing attendee satisfaction scores by collecting feedback for continuous improvement initiatives 
                    following each activity
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Jan 2024 – July 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
