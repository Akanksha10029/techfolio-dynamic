
import ContactForm from "@/components/ContactForm";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen animate-fadeIn space-y-12 p-6 lg:p-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Contact Me</h1>
        <p className="text-lg text-muted-foreground">
          Let's discuss your project or just say hello!
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="glass-card space-y-6 p-6">
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">your.email@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">City, Country</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-4 font-medium">Connect with me</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-full bg-secondary p-2 transition-colors hover:bg-primary"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="rounded-full bg-secondary p-2 transition-colors hover:bg-primary"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="mb-6 text-2xl font-semibold">Send Me a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
