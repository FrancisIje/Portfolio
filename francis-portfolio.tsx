import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Smartphone, Database, Terminal } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const mobileProjects = [
    {
      title: "Meditation App",
      description: "A user-centric mobile application designed to enhance mindfulness and meditation practices. Built with a focus on intuitive UX and calming interface design.",
      tech: ["Flutter", "Dart", "Firebase"],
      link: "#"
    },
    {
      title: "Cross-Platform Mobile App",
      description: "Developed robust iOS and Android applications with seamless performance and native-like user experiences.",
      tech: ["React Native", "JavaScript", "REST APIs"],
      link: "#"
    },
    {
      title: "Native Mobile Solution",
      description: "Built high-performance native applications with smooth animations and optimized resource management.",
      tech: ["Flutter", "Dart", "SQLite"],
      link: "#"
    }
  ];

  const webGLSLProjects = [
    {
      title: "Interactive WebGL Experience",
      description: "Created immersive web experiences using WebGL and custom GLSL shaders for stunning visual effects.",
      tech: ["WebGL", "GLSL", "JavaScript"],
      link: "#"
    },
    {
      title: "Shader Art Gallery",
      description: "Developed a collection of procedural graphics and shader-based animations showcasing creative coding techniques.",
      tech: ["GLSL", "Three.js", "React"],
      link: "#"
    },
    {
      title: "Web Portfolio Projects",
      description: "Built responsive web applications with modern frameworks and interactive user interfaces.",
      tech: ["React", "JavaScript", "CSS"],
      link: "#"
    }
  ];

  const skills = [
    { name: "Dart", icon: <Code2 className="w-5 h-5" />, level: 90 },
    { name: "JavaScript", icon: <Terminal className="w-5 h-5" />, level: 85 },
    { name: "Python", icon: <Database className="w-5 h-5" />, level: 80 },
    { name: "C", icon: <Code2 className="w-5 h-5" />, level: 75 },
    { name: "Mobile Dev", icon: <Smartphone className="w-5 h-5" />, level: 90 }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e8e8e8]" style={{ fontFamily: '"Claude", Charter, system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold tracking-tight">Francis Ije</div>
            <div className="flex gap-8">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-white ${
                    activeSection === section ? 'text-white' : 'text-[#a0a0a0]'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className={`max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            I WRITE CODE
          </h1>
          <div className="text-3xl text-[#b0b0b0] mb-8 font-mono">
            DART + C + JS + TS + PYTHON + GLSL
          </div>
          <p className="text-xl text-[#a0a0a0] mb-12 leading-relaxed">
            Mobile app developer crafting cutting-edge solutions.<br />
            Passionate about creating user-centric applications that elevate experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="mailto:contact@francisije.com" 
               className="p-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 tracking-tight">About Me</h2>
          <div className="space-y-6 text-lg text-[#b0b0b0] leading-relaxed">
            <p>
              Passionate mobile app developer with proven expertise in iOS and Android development. 
              I excel in crafting user-centric applications that elevate user experiences through 
              thoughtful design and robust engineering.
            </p>
            <p>
              Known for my collaborative spirit, tech enthusiasm, and commitment to continuous learning. 
              Currently exploring new technologies and building solutions that make a difference.
            </p>
            <p>
              Beyond coding, I enjoy music and believe in the power of technology to bring people together 
              and solve real-world problems.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <h2 className="text-4xl font-bold mb-16 tracking-tight">Projects</h2>
          
          {/* Mobile Development Projects */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Smartphone className="w-7 h-7 text-[#888]" />
              <h3 className="text-2xl font-semibold">Mobile Development</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileProjects.map((project, idx) => (
                <div key={idx} className="bg-[#2a2a2a] rounded-lg p-6 hover:bg-[#333] transition-all duration-300 border border-[#3a3a3a]">
                  <div className="flex items-start justify-between mb-4">
                    <Smartphone className="w-8 h-8 text-[#888]" />
                    <a href={project.link} className="text-[#888] hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-[#b0b0b0] mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-sm px-3 py-1 bg-[#1a1a1a] rounded-full text-[#a0a0a0]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Web & GLSL Projects */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="w-7 h-7 text-[#888]" />
              <h3 className="text-2xl font-semibold">Web & GLSL</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webGLSLProjects.map((project, idx) => (
                <div key={idx} className="bg-[#2a2a2a] rounded-lg p-6 hover:bg-[#333] transition-all duration-300 border border-[#3a3a3a]">
                  <div className="flex items-start justify-between mb-4">
                    <Code2 className="w-8 h-8 text-[#888]" />
                    <a href={project.link} className="text-[#888] hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-[#b0b0b0] mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-sm px-3 py-1 bg-[#1a1a1a] rounded-full text-[#a0a0a0]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl font-bold mb-12 tracking-tight">Skills</h2>
          <div className="space-y-8">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-3">
                  {skill.icon}
                  <span className="text-lg font-medium">{skill.name}</span>
                </div>
                <div className="w-full bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#555] to-[#888] h-full rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a]">
            <p className="text-lg text-[#b0b0b0] italic">
              "learning new stuff" - Always exploring, always growing
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-8 tracking-tight">Let's Connect</h2>
          <p className="text-xl text-[#b0b0b0] mb-12 leading-relaxed">
            Interested in collaborating or just want to say hi? Feel free to reach out.
          </p>
          <div className="flex flex-col gap-4 items-center">
            <a href="mailto:contact@francisije.com" 
               className="flex items-center gap-3 px-8 py-4 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-all">
              <Mail className="w-5 h-5" />
              <span className="text-lg">Get in Touch</span>
            </a>
            <div className="flex gap-6 mt-6">
              <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer"
                 className="text-[#888] hover:text-white transition-colors flex items-center gap-2">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="text-[#888] hover:text-white transition-colors flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-[#888]">
          <p>© 2025 Francis Ije. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}