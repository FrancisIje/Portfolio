// SAMPLE 1 : BACKGROUND WITH PROCEDURAL GRAYSCALE FLOWING SHADER

// import React, { useState, useEffect, useRef } from 'react';
// import { Github, Linkedin, Mail, ExternalLink, Code2, Smartphone, Database, Terminal } from 'lucide-react';

// function ShaderBackground() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const gl = canvas.getContext('webgl');
//     if (!gl) return;

//     // Set canvas size
//     const setSize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       gl.viewport(0, 0, canvas.width, canvas.height);
//     };
//     setSize();
//     window.addEventListener('resize', setSize);

//     // Vertex shader
//     const vertexShaderSource = `
//       attribute vec2 position;
//       void main() {
//         gl_Position = vec4(position, 0.0, 1.0);
//       }
//     `;

//     // Fragment shader with flowing gradients
//     const fragmentShaderSource = `
//       precision mediump float;
//       uniform float u_time;
//       uniform vec2 u_resolution;
//       uniform vec2 u_mouse;

//       vec3 palette(float t) {
//         // Pure grayscale palette - black to white
//         float gray = 0.5 + 0.5 * cos(6.28318 * t);
//         return vec3(gray);
//       }

//       void main() {
//         vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y;
//         vec2 uv0 = uv;
//         vec3 finalColor = vec3(0.0);

//         for (float i = 0.0; i < 4.0; i++) {
//           uv = fract(uv * 1.5) - 0.5;

//           float d = length(uv) * exp(-length(uv0));
//           vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);

//           d = sin(d * 8.0 + u_time) / 8.0;
//           d = abs(d);
//           d = pow(0.01 / d, 1.2);

//           finalColor += col * d;
//         }

//         // Mix with mouse position for interactivity
//         float mouseInfluence = length(uv - u_mouse * 2.0);
//         finalColor *= 0.8 + 0.2 * sin(mouseInfluence * 3.0 - u_time);

//         gl_FragColor = vec4(finalColor * 0.03, 1.0);
//       }
//     `;

//     // Compile shader
//     function createShader(gl, type, source) {
//       const shader = gl.createShader(type);
//       gl.shaderSource(shader, source);
//       gl.compileShader(shader);
//       if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         console.error(gl.getShaderInfoLog(shader));
//         gl.deleteShader(shader);
//         return null;
//       }
//       return shader;
//     }

//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
//     const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//     if (!vertexShader || !fragmentShader) {
//       console.error('Failed to create shaders');
//       return;
//     }

//     // Create program
//     const program = gl.createProgram();
//     if (!program) {
//       console.error('Failed to create program');
//       return;
//     }

//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);

//     if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//       console.error('Program link error:', gl.getProgramInfoLog(program));
//       gl.deleteProgram(program);
//       return;
//     }

//     // Validate program
//     gl.validateProgram(program);
//     if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
//       console.error('Program validation error:', gl.getProgramInfoLog(program));
//     }

//     gl.useProgram(program);

//     // Setup geometry
//     const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
//     const buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//     gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

//     const positionLocation = gl.getAttribLocation(program, 'position');
//     gl.enableVertexAttribArray(positionLocation);
//     gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

//     // Get uniform locations
//     const timeLocation = gl.getUniformLocation(program, 'u_time');
//     const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
//     const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

//     let mouseX = 0.5;
//     let mouseY = 0.5;

//     const handleMouseMove = (e) => {
//       mouseX = e.clientX / window.innerWidth;
//       mouseY = 1.0 - e.clientY / window.innerHeight;
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     // Animation loop
//     let startTime = Date.now();
//     function render() {
//       const currentTime = (Date.now() - startTime) * 0.001;

//       // Ensure the program is still bound
//       gl.useProgram(program);

//       // Only set uniforms if their locations are valid
//       if (timeLocation !== null) {
//         gl.uniform1f(timeLocation, currentTime);
//       }
//       if (resolutionLocation !== null) {
//         gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
//       }
//       if (mouseLocation !== null) {
//         gl.uniform2f(mouseLocation, mouseX, mouseY);
//       }

//       gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
//       requestAnimationFrame(render);
//     }
//     render();

//     return () => {
//       window.removeEventListener('resize', setSize);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 w-full h-full"
//       style={{ zIndex: 0, opacity: 0.3 }}
//     />
//   );
// }

// export default function Portfolio() {
//   const [activeSection, setActiveSection] = useState('home');
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const mobileProjects = [
//     {
//       title: "Meditation App",
//       description: "A user-centric mobile application designed to enhance mindfulness and meditation practices. Built with a focus on intuitive UX and calming interface design.",
//       tech: ["Flutter", "Dart", "Firebase"],
//       link: "#"
//     },
//     {
//       title: "Cross-Platform Mobile App",
//       description: "Developed robust iOS and Android applications with seamless performance and native-like user experiences.",
//       tech: ["React Native", "JavaScript", "REST APIs"],
//       link: "#"
//     },
//     {
//       title: "Native Mobile Solution",
//       description: "Built high-performance native applications with smooth animations and optimized resource management.",
//       tech: ["Flutter", "Dart", "SQLite"],
//       link: "#"
//     }
//   ];

//   const webGLSLProjects = [
//     {
//       title: "Interactive WebGL Experience",
//       description: "Created immersive web experiences using WebGL and custom GLSL shaders for stunning visual effects.",
//       tech: ["WebGL", "GLSL", "JavaScript"],
//       link: "#"
//     },
//     {
//       title: "Shader Art Gallery",
//       description: "Developed a collection of procedural graphics and shader-based animations showcasing creative coding techniques.",
//       tech: ["GLSL", "Three.js", "React"],
//       link: "#"
//     },
//     {
//       title: "Web Portfolio Projects",
//       description: "Built responsive web applications with modern frameworks and interactive user interfaces.",
//       tech: ["React", "JavaScript", "CSS"],
//       link: "#"
//     }
//   ];

//   const skills = [
//     { name: "Dart", icon: <Code2 className="w-5 h-5" />, level: 90 },
//     { name: "JavaScript", icon: <Terminal className="w-5 h-5" />, level: 85 },
//     { name: "Python", icon: <Database className="w-5 h-5" />, level: 80 },
//     { name: "C", icon: <Code2 className="w-5 h-5" />, level: 75 },
//     { name: "Mobile Dev", icon: <Smartphone className="w-5 h-5" />, level: 90 }
//   ];

//   const scrollToSection = (section) => {
//     setActiveSection(section);
//     document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white relative" style={{ fontFamily: '"Claude", Charter, system-ui, -apple-system, sans-serif' }}>
//       {/* WebGL Shader Background */}
//       <ShaderBackground />

//       {/* Content wrapper */}
//       <div className="relative z-10">
//         {/* Navigation */}
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#2a2a2a]">
//           <div className="max-w-6xl mx-auto px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="text-xl font-semibold tracking-tight hidden md:block">Francis Ije</div>
//               <div className="flex gap-8">
//                 {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
//                   <button
//                     key={section}
//                     onClick={() => scrollToSection(section)}
//                     className={`capitalize transition-colors hover:text-white ${
//                       activeSection === section ? 'text-white' : 'text-[#a0a0a0]'
//                     }`}
//                   >
//                     {section}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
//           <div className={`max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <h1 className="text-6xl font-bold mb-6 tracking-tight">
//               Francis Ijenebe
//             </h1>
//             <div className="text-3xl text-[#b0b0b0] mb-8 font-mono">
//               MOBILE + WEB + GLSL
//             </div>
//             <p className="text-xl text-[#a0a0a0] mb-12 leading-relaxed">
//               Building performant, shader-driven experiences that blend art with utility.
//             </p>
//             <div className="flex gap-4 justify-center">
//               <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer" 
//                  className="p-3 rounded-full bg-[#2a2a2a]/60 backdrop-blur-sm hover:bg-[#3a3a3a] transition-colors">
//                 <Github className="w-6 h-6" />
//               </a>
//               <a href="mailto:contact@francisije.com" 
//                  className="p-3 rounded-full bg-[#2a2a2a]/60 backdrop-blur-sm hover:bg-[#3a3a3a] transition-colors">
//                 <Mail className="w-6 h-6" />
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
//                  className="p-3 rounded-full bg-[#2a2a2a]/60 backdrop-blur-sm hover:bg-[#3a3a3a] transition-colors">
//                 <Linkedin className="w-6 h-6" />
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* About Section */}
//         <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
//           <div className="max-w-4xl w-full">
//             <h2 className="text-4xl font-bold mb-12 tracking-tight">About Me</h2>
//             <div className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-lg p-8 border border-[#3a3a3a]">
//               <div className="space-y-6 text-lg text-[#b0b0b0] leading-relaxed">
//                 <p>
//                  I’m a developer who sits at the intersection of graphics and product: shipping mobile and web apps while building custom GLSL shaders and interactive visuals. I focus on performance, polished UX, and creative code — turning ideas into responsive, memorable experiences. Whether it’s a production mobile app or a shader-driven web demo, I love solving hard engineering problems and making interfaces sing.
//                 </p>
//                 <p>
//                   Known for my collaborative spirit, tech enthusiasm, and commitment to continuous learning. 
//                   Currently exploring new technologies and building solutions that make a difference.
//                 </p>
//                 <p>
//                   Beyond coding, I enjoy music and believe in the power of technology to bring people together 
//                   and solve real-world problems.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Projects Section */}
//         <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
//           <div className="max-w-6xl w-full">
//             <h2 className="text-4xl font-bold mb-16 tracking-tight">Projects</h2>
            
//             {/* Mobile Development Projects */}
//             <div className="mb-16">
//               <div className="flex items-center gap-3 mb-8">
//                 <Smartphone className="w-7 h-7 text-[#888]" />
//                 <h3 className="text-2xl font-semibold">Mobile Development</h3>
//               </div>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {mobileProjects.map((project, idx) => (
//                   <div key={idx} className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-lg p-6 hover:bg-[#2a2a2a]/60 transition-all duration-300 border border-[#3a3a3a]">
//                     <div className="flex items-start justify-between mb-4">
//                       <Smartphone className="w-8 h-8 text-[#888]" />
//                       <a href={project.link} className="text-[#888] hover:text-white transition-colors">
//                         <ExternalLink className="w-5 h-5" />
//                       </a>
//                     </div>
//                     <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
//                     <p className="text-[#b0b0b0] mb-4 leading-relaxed">{project.description}</p>
//                     <div className="flex flex-wrap gap-2">
//                       {project.tech.map((tech, i) => (
//                         <span key={i} className="text-sm px-3 py-1 bg-[#0a0a0a]/60 rounded-full text-[#a0a0a0]">
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Web & GLSL Projects */}
//             <div>
//               <div className="flex items-center gap-3 mb-8">
//                 <Code2 className="w-7 h-7 text-[#888]" />
//                 <h3 className="text-2xl font-semibold">Web & GLSL</h3>
//               </div>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {webGLSLProjects.map((project, idx) => (
//                   <div key={idx} className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-lg p-6 hover:bg-[#2a2a2a]/60 transition-all duration-300 border border-[#3a3a3a]">
//                     <div className="flex items-start justify-between mb-4">
//                       <Code2 className="w-8 h-8 text-[#888]" />
//                       <a href={project.link} className="text-[#888] hover:text-white transition-colors">
//                         <ExternalLink className="w-5 h-5" />
//                       </a>
//                     </div>
//                     <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
//                     <p className="text-[#b0b0b0] mb-4 leading-relaxed">{project.description}</p>
//                     <div className="flex flex-wrap gap-2">
//                       {project.tech.map((tech, i) => (
//                         <span key={i} className="text-sm px-3 py-1 bg-[#0a0a0a]/60 rounded-full text-[#a0a0a0]">
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Skills Section */}
//         <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20">
//           <div className="max-w-4xl w-full">
//             <h2 className="text-4xl font-bold mb-12 tracking-tight">Skills</h2>
//             <div className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-lg p-8 border border-[#3a3a3a]">
//               <div className="space-y-6">
//                 {skills.map((skill, idx) => (
//                   <div key={idx} className="flex items-center gap-3">
//                     {skill.icon}
//                     <span className="text-lg font-medium">{skill.name}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-8 p-6 bg-[#0a0a0a]/60 rounded-lg border border-[#2a2a2a]">
//                 <p className="text-lg text-[#b0b0b0] italic">
//                   "learning new stuff" - Always exploring, always growing
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Contact Section */}
//         <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
//           <div className="max-w-2xl text-center">
//             <h2 className="text-4xl font-bold mb-8 tracking-tight">Let's Connect</h2>
//             <p className="text-xl text-[#b0b0b0] mb-12 leading-relaxed">
//               Interested in collaborating or just want to say hi? Feel free to reach out.
//             </p>
//             <div className="flex flex-col gap-4 items-center">
//               <a href="mailto:contact@francisije.com" 
//                  className="flex items-center gap-3 px-8 py-4 bg-[#2a2a2a]/60 backdrop-blur-sm hover:bg-[#3a3a3a] rounded-lg transition-all">
//                 <Mail className="w-5 h-5" />
//                 <span className="text-lg">Get in Touch</span>
//               </a>
//               <div className="flex gap-6 mt-6">
//                 <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer"
//                    className="text-[#888] hover:text-white transition-colors flex items-center gap-2">
//                   <Github className="w-5 h-5" />
//                   <span>GitHub</span>
//                 </a>
//                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
//                    className="text-[#888] hover:text-white transition-colors flex items-center gap-2">
//                   <Linkedin className="w-5 h-5" />
//                   <span>LinkedIn</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="border-t border-[#2a2a2a] py-8 px-6">
//           <div className="max-w-6xl mx-auto text-center text-[#888]">
//             <p>© 2025 Francis Ije. Built with React.</p>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }



// SAMPLE 2 : BACKGROUND WITH ORGANIC MOVING BLOBS SHADER

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Smartphone, ArrowUpRight } from 'lucide-react';

function ImageWithLoader({ src, alt, className }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    // Add artificial delay in development to see the loading animation
    const isDev = process.env.NODE_ENV === 'development';
    const delay = isDev ? 2000 : 0; // 2 second delay in dev mode
    
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="loader" width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            {/* Outer rotating hexagon */}
            <polygon 
              className="loader-hex-outer" 
              points="60,10 95,32.5 95,77.5 60,100 25,77.5 25,32.5" 
              fill="none" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="2"
            />
            
            {/* Middle rotating triangle */}
            <polygon 
              className="loader-triangle" 
              points="60,35 80,70 40,70" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="2"
            />
            
            {/* Inner pulsing circle */}
            <circle 
              className="loader-circle-inner" 
              cx="60" 
              cy="60" 
              r="8" 
              fill="rgba(255,255,255,0.6)"
            />
            
            {/* Animated dots around */}
            <circle className="loader-dot loader-dot-1" cx="60" cy="20" r="3" fill="rgba(255,255,255,0.8)" />
            <circle className="loader-dot loader-dot-2" cx="88" cy="40" r="3" fill="rgba(255,255,255,0.8)" />
            <circle className="loader-dot loader-dot-3" cx="88" cy="80" r="3" fill="rgba(255,255,255,0.8)" />
            <circle className="loader-dot loader-dot-4" cx="60" cy="100" r="3" fill="rgba(255,255,255,0.8)" />
            <circle className="loader-dot loader-dot-5" cx="32" cy="80" r="3" fill="rgba(255,255,255,0.8)" />
            <circle className="loader-dot loader-dot-6" cx="32" cy="40" r="3" fill="rgba(255,255,255,0.8)" />
          </svg>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        onLoad={handleLoad}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50">
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  );
}

function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Noise function for organic movement
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      // Metaball/blob function
      float metaball(vec2 p, vec2 center, float radius) {
        float dist = length(p - center);
        return radius / (dist * dist);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Mouse position with smooth random movement when no mouse input
        vec2 mousePos = u_mouse;
        float autoMoveSpeed = 0.3;
        vec2 autoMove = vec2(
          sin(u_time * autoMoveSpeed + 1.5) * 0.3,
          cos(u_time * autoMoveSpeed * 0.8) * 0.3
        );
        
        // Blend between mouse and automatic movement
        float mouseInfluence = length(u_mouse - vec2(0.5));
        mouseInfluence = smoothstep(0.0, 0.1, mouseInfluence);
        vec2 targetPos = mix(autoMove, (mousePos - 0.5) * 2.0, mouseInfluence);
        
        // Create multiple organic blobs
        float blob = 0.0;
        
        // Main blob following target (reduced size)
        blob += metaball(p, targetPos, 0.3);
        
        // Additional organic blobs with slow movement (also reduced)
        blob += metaball(p, 
          vec2(sin(u_time * 0.4) * 0.5, cos(u_time * 0.3) * 0.4),
          0.15
        );
        
        blob += metaball(p,
          vec2(cos(u_time * 0.5 + 2.0) * 0.6, sin(u_time * 0.4 + 1.0) * 0.5),
          0.12
        );
        
        blob += metaball(p,
          vec2(sin(u_time * 0.35 + 4.0) * 0.4, cos(u_time * 0.45 + 3.0) * 0.6),
          0.1
        );
        
        // Add noise for organic feel
        float n = smoothNoise(p * 3.0 + u_time * 0.1);
        blob += n * 0.1;
        
        // Create smooth falloff
        float intensity = smoothstep(0.3, 1.5, blob);
        
        // Subtle color variation
        vec3 color = vec3(intensity * 0.15);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      console.error('Failed to create shaders');
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    let mouseX = 0.5;
    let mouseY = 0.5;
    let lastMouseMove = Date.now();

    const handleMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = 1.0 - e.clientY / window.innerHeight;
      lastMouseMove = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);

    let startTime = Date.now();
    function render() {
      const currentTime = (Date.now() - startTime) * 0.001;
      
      gl.useProgram(program);
      
      if (timeLocation !== null) {
        gl.uniform1f(timeLocation, currentTime);
      }
      if (resolutionLocation !== null) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
      if (mouseLocation !== null) {
        gl.uniform2f(mouseLocation, mouseX, mouseY);
      }
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    }
    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }} />;
}

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [currentFont, setCurrentFont] = useState(0);
  const aboutRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const fonts = [
    { family: '"Didot", "Bodoni MT", "Times New Roman", serif', weight: '700' },
    { family: '"Futura", "Century Gothic", "AppleGothic", sans-serif', weight: '700' },
    { family: '"Rockwell", "Courier Bold", "Courier", monospace', weight: '700' },
    { family: '"Copperplate", "Copperplate Gothic Light", fantasy', weight: '700' },
    { family: '"Optima", "Candara", "Calibri", sans-serif', weight: '600' },
    { family: '"Garamond", "Baskerville", "Hoefler Text", serif', weight: '700' },
    { family: '"Avenir Next", "Avenir", "Century Gothic", sans-serif', weight: '700' },
    { family: '"Palatino", "Palatino Linotype", "Book Antiqua", serif', weight: '700' },
    { family: '"Gill Sans", "Gill Sans MT", "Trebuchet MS", sans-serif', weight: '700' },
    { family: '"Franklin Gothic", "Arial Black", "Impact", sans-serif', weight: '900' },
    { family: '"Helvetica Neue", "Helvetica", "Arial", sans-serif', weight: '700' },
    { family: '"Bodoni MT", "Didot", "Georgia", serif', weight: '700' },
    { family: '"Century Schoolbook", "Century", "Times", serif', weight: '700' },
    { family: '"Trebuchet MS", "Lucida Grande", "Lucida Sans", sans-serif', weight: '700' },
    { family: '"Consolas", "Monaco", "Courier New", monospace', weight: '900' },
  ];

  useEffect(() => {
    setIsVisible(true);

    // Cycle through fonts - faster now (1 second)
    const fontInterval = setInterval(() => {
      setCurrentFont((prev) => (prev + 1) % fonts.length);
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Stagger child animations
            const staggerItems = entry.target.querySelectorAll('.stagger-item');
            staggerItems.forEach((item, idx) => {
              setTimeout(() => {
                item.classList.add('animate-in');
              }, idx * 100);
            });
          } else {
            // Remove animation classes when scrolling away
            entry.target.classList.remove('animate-in');
            const staggerItems = entry.target.querySelectorAll('.stagger-item');
            staggerItems.forEach((item) => {
              item.classList.remove('animate-in');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    if (capabilitiesRef.current) {
      observer.observe(capabilitiesRef.current);
    }
    if (workRef.current) {
      observer.observe(workRef.current);
    }
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    // Track active section
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mobileProjects = [
    {
      title: "Bookaleap",
      description: "Easily find and book top personal trainers, nutrition coaches, physiotherapists, and more wellness professionals with just a few clicks.",
      tech: ["Flutter", "Dart", "Firebase", "REST APIs"],
      link: "#",
      year: "2024",
      isLive: true,
      image: "/bookaleap.png",
      appStoreLink: "https://apps.apple.com/tr/app/bookaleap/id6447549852?platform=iphone",
      playStoreLink: "https://play.google.com/store/apps/details?id=com.vebbuilders.bookleap&hl=en_US"
    },
    {
      title: "Deeply Dating App",
      description: "A full-featured mobile dating application with real-time messaging, profile matching, and media storage capabilities.",
      tech: ["Flutter", "WebSockets", "Node.js", "MongoDB", "Azure Storage"],
      link: "https://drive.google.com/file/d/1RwmrTLIgRK6eUPNO9wGL_7vjRrexRFFJ/view",
      year: "2024",
      image: "/dating-app.png"
    },
    {
      title: "SpeakUp",
      description: "An AI-powered language coach using ChatGPT API with voice recording, transcribing, and pronunciation assessment features to help users improve their language skills.",
      tech: ["Flutter", "ChatGPT API", "Firebase", "Speech Recognition", "AI/ML"],
      link: "https://drive.google.com/file/d/13bxZW8b5wFYTXoJLsIQQJRh-1YZa2dvT/view",
      year: "2024",
      image: "/speakup banner.png"
    },
    // {
    //   title: "Meditation App",
    //   description: "A user-centric mobile application designed to enhance mindfulness and meditation practices.",
    //   tech: ["Flutter", "Dart", "Firebase"],
    //   link: "#",
    //   year: "2024"
    // },
    // {
    //   title: "Cross-Platform Mobile",
    //   description: "Robust iOS and Android applications with seamless performance and native experiences.",
    //   tech: ["React Native", "JavaScript", "REST APIs"],
    //   link: "#",
    //   year: "2024"
    // },
    // {
    //   title: "Native Mobile Solution",
    //   description: "High-performance native applications with smooth animations and optimized resources.",
    //   tech: ["Flutter", "Dart", "SQLite"],
    //   link: "#",
    //   year: "2023"
    // }
  ];

  const webGLSLProjects = [
    {
      title: "WebGL Experience",
      description: "Immersive web experiences using WebGL and custom GLSL shaders.",
      tech: ["WebGL", "GLSL", "JavaScript"],
      link: "#",
      year: "2024"
    },
    {
      title: "Shader Art Gallery",
      description: "Procedural graphics and shader-based animations showcasing creative coding.",
      tech: ["GLSL", "Three.js", "React"],
      link: "#",
      year: "2023"
    },
    {
      title: "Web Applications",
      description: "Modern web applications with interactive interfaces and smooth experiences.",
      tech: ["React", "JavaScript", "CSS"],
      link: "#",
      year: "2024"
    }
  ];

  const skills = [
    "Dart", "JavaScript", "Python", "Go", "C",
    "Flutter", "React Native", "React", "Node.js",
    "PostgreSQL", "MongoDB", "WebSockets", "REST APIs",
    "AWS", "Firebase", "Vercel", "Azure Storage",
    "Mobile Development", "Web Development", "Full-Stack",
    "WebGL", "GLSL Shaders", "UI/UX Design",
    "iOS Development", "Android Development", "CI/CD"
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
      <ShaderBackground />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold tracking-tight" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>FrancisIje</div>
              <img src="/favicon.svg" alt="FI" className="h-6 w-6" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" 
                 className={`text-sm uppercase tracking-wider transition-colors ${activeSection === 'home' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                Home
              </a>
              <a href="#work" 
                 className={`text-sm uppercase tracking-wider transition-colors ${activeSection === 'work' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                Work
              </a>
              <a href="#about" 
                 className={`text-sm uppercase tracking-wider transition-colors ${activeSection === 'about' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                About
              </a>
              <a href="#contact" 
                 className={`text-sm uppercase tracking-wider transition-colors ${activeSection === 'contact' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                Contact
              </a>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer" 
                 className="hover:opacity-70 transition-opacity">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:ijenebefrancis@gmail.com" 
                 className="hover:opacity-70 transition-opacity">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/francis-ijenebe/" target="_blank" rel="noopener noreferrer"
                 className="hover:opacity-70 transition-opacity">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-semibold mb-8 tracking-tight leading-none" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
              Francis Ijenebe
            </h1>
            <div className="text-xl md:text-2xl text-white/60 mb-8 tracking-wider" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
              Software Developer • Fullstack Mobile & Web
            </div>
            <p className="text-center text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Crafting scalable, robust and maintainable software solutions for mobile and web platforms.
            </p>
          </div>
        </section> 

        {/* Projects Section */}
        <section id="work" ref={workRef} className="section-animate py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="stagger-item">
              <span className="text-sm uppercase tracking-widest text-white/60 mb-8 block">Selected Work</span>
            </div>
            
            {/* Mobile Development */}
            <div className="mb-20">
              <div className="stagger-item flex items-baseline gap-4 mb-10">
                <Smartphone className="w-6 h-6 text-white/60" />
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>Mobile Development</h3>
              </div>
              <div className="space-y-4">
                {mobileProjects.map((project, idx) => (
                  <div key={idx} 
                     className="stagger-item group block p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                    {project.image && (
                      <div className="mb-6 overflow-hidden rounded-xl bg-white/5 flex items-center justify-center p-4">
                        <ImageWithLoader
                          src={project.image} 
                          alt={project.title}
                          className="max-w-full max-h-96 object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="text-2xl font-bold">{project.title}</h4>
                          {project.isLive && (
                            <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                              LIVE
                            </span>
                          )}
                          <span className="text-sm text-white/50">{project.year}</span>
                        </div>
                        <p className="text-white/70 leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="text-xs px-3 py-1 bg-black/60 border border-white/10 rounded-full text-white/60">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {(project.appStoreLink || project.playStoreLink) && (
                          <div className="flex gap-3 mt-4">
                            {project.appStoreLink && (
                              <a 
                                href={project.appStoreLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all flex items-center gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>App Store</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            )}
                            {project.playStoreLink && (
                              <a 
                                href={project.playStoreLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all flex items-center gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Play Store</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )}
                        {project.link && !project.appStoreLink && !project.playStoreLink && project.link !== "#" && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mt-4 transition-colors"
                          >
                            <span>View Project</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Web & GLSL */}
            <div>
              <div className="stagger-item flex items-baseline gap-4 mb-10">
                <Code2 className="w-6 h-6 text-white/60" />
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>Web & GLSL</h3>
              </div>
              <div className="space-y-4">
                {webGLSLProjects.map((project, idx) => (
                  <a key={idx} href={project.link}
                     className="stagger-item group block p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="text-2xl font-bold">{project.title}</h4>
                          <span className="text-sm text-white/50">{project.year}</span>
                        </div>
                        <p className="text-white/70 leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="text-xs px-3 py-1 bg-black/60 border border-white/10 rounded-full text-white/60">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="section-animate min-h-screen flex items-center px-6 md:px-12 py-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="stagger-item">
                <span className="text-sm uppercase tracking-widest text-white/60 mb-6 block">About</span>
                <h2 className="text-4xl md:text-6xl font-semibold mb-8 tracking-tight leading-tight" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                  Building software that solves real problems
                </h2>
              </div>
              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p className="stagger-item">
                  I'm a software developer who builds and ships apps for both mobile and web. I create smooth user interfaces with Flutter and React, and I handle the backend too—using whatever fits best, whether that's Node.js, Dart, Python, or Go.
                </p>
                <p className="stagger-item">
                  I work with all sorts of databases, from SQL options like PostgreSQL to NoSQL ones like MongoDB, and I love adding real-time features with WebSockets.
                </p>
                <p className="stagger-item">
                  Plus, I don't just build apps—I get them out into the world. I've published mobile apps on the Apple App Store and Google Play Store, and I deploy web apps using platforms like AWS, Firebase, and Vercel.
                </p>
                <p className="stagger-item">
                  Passionate about continuous learning and staying current with industry best practices. I thrive in collaborative environments and enjoy tackling complex technical challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section ref={capabilitiesRef} className="section-animate py-24 px-6 md:px-12 border-y border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="stagger-item">
              <span className="text-sm uppercase tracking-widest text-white/60 mb-8 block">Capabilities</span>
              <h2 className="text-3xl md:text-5xl font-semibold mb-12 tracking-tight" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                Technical skills and expertise
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <div key={idx} 
                     className="stagger-item px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-all">
                  <span className="text-sm uppercase tracking-wider">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" ref={contactRef} className="section-animate py-32 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="stagger-item text-4xl md:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight leading-tight" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
              Let's work on your<br />next project together
            </h2>
            <p className="stagger-item text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Open to new opportunities and collaborations. Let's discuss how I can contribute to your team or project.
            </p>
            <a href="mailto:ijenebefrancis@gmail.com" 
               className="stagger-item inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all text-lg group">
              <span>Get in Touch</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/60">© 2025 Francis Ije. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer"
                 className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/francis-ijenebe/" target="_blank" rel="noopener noreferrer"
                 className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider">
                LinkedIn
              </a>
              <a href="mailto:ijenebefrancis@gmail.com"
                 className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider">
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .loader {
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.1));
        }

        .loader-hex-outer {
          animation: rotate-slow 4s linear infinite;
          transform-origin: center;
        }

        .loader-triangle {
          animation: rotate-reverse 3s linear infinite;
          transform-origin: center;
        }

        .loader-circle-inner {
          animation: pulse 2s ease-in-out infinite;
        }

        .loader-dot {
          animation: fade-pulse 1.5s ease-in-out infinite;
        }

        .loader-dot-1 { animation-delay: 0s; }
        .loader-dot-2 { animation-delay: 0.25s; }
        .loader-dot-3 { animation-delay: 0.5s; }
        .loader-dot-4 { animation-delay: 0.75s; }
        .loader-dot-5 { animation-delay: 1s; }
        .loader-dot-6 { animation-delay: 1.25s; }

        @keyframes rotate-slow {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-reverse {
          100% {
            transform: rotate(-360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        @keyframes fade-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
}