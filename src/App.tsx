import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Download, Mail, ChevronDown, Linkedin, ArrowRight, ExternalLink, Github } from "lucide-react";
import StickyTabs from "./components/StickyTabs";
import { ShaderAnimation } from "./components/ShaderAnimation";
import TextBlockAnimation from "./components/TextBlockAnimation";
import { SiGithub, SiItchdotio, SiPython, SiCplusplus, SiJavascript, SiPhp, SiMysql, SiHtml5, SiGodotengine, SiGnubash, SiLinux, SiGit } from "react-icons/si";

function NeonCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* dot */}
      <motion.div className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[200] pointer-events-none hidden md:block"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/60 z-[200] pointer-events-none hidden md:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 48 : 32, height: hovering ? 48 : 32, borderColor: hovering ? 'hsl(187 96% 43%)' : 'hsl(262 83% 68% / 0.6)' }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"show" | "fadeout">("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Hold the shader for 2.2s then start fade
    const holdTimer = setTimeout(() => setPhase("fadeout"), 2200);
    return () => {
      clearTimeout(holdTimer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (phase === "fadeout") {
          document.body.style.overflow = "unset";
          onComplete();
        }
      }}
    >
      {/* Shader fills the screen */}
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      {/* Name overlay centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-white/60 mb-3"
        >
          Loading Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl md:text-7xl font-black uppercase tracking-widest text-white"
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", textShadow: "0 0 40px rgba(0,0,0,0.8)" }}
        >
          MOHAMMED EL-SAYED
        </motion.h1>
      </div>
    </motion.div>
  );
}

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: {x: number, y: number, radius: number, vx: number, vy: number, alpha: number}[] = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random()
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        
        // Parallax effect
        const dx = (mouseX - width/2) * 0.005;
        const dy = (mouseY - height/2) * 0.005;

        let displayX = star.x - dx;
        let displayY = star.y - dy;

        if (displayX < 0) star.x = width + dx;
        if (displayX > width) star.x = 0 + dx;
        if (displayY < 0) star.y = height + dy;
        if (displayY > height) star.y = 0 + dy;

        ctx.beginPath();
        ctx.arc(displayX, displayY, star.radius, 0, Math.PI * 2);
        const color = Math.random() > 0.6 ? "rgba(6, 182, 212," : "rgba(255, 255, 255,";
        ctx.fillStyle = `${color} ${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-70" />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-[0_1px_20px_hsl(262_83%_68%/0.15)]' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="font-bold text-display text-xl tracking-wider text-white hover:text-neon-purple transition-colors">
          M.ELSAYED
        </a>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-muted-foreground uppercase">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-green-500">Available</span>
          </div>
          
          <a
            href="/CV_Mohammed_ElSayed.pdf"
            download
            className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/50 text-primary rounded-sm font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-primary-hover"
          >
            <span>CV</span>
            <Download size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Game Developer", "Full-Stack Developer", "Cybersecurity Enthusiast"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-[100dvh] flex items-center px-6 md:px-12 pt-20 overflow-hidden z-10">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="text-[25vw] font-display font-black whitespace-nowrap tracking-tighter text-primary/20 opacity-[0.04]">
          MOHAMMED
        </h1>
      </div>

      <div className="absolute top-10 left-10 w-16 h-16 border-t-4 border-l-4 border-primary/50 opacity-50 z-0"></div>

      <div className="container mx-auto flex h-full z-10">
        {/* Left sidebar icons */}
        <div className="hidden md:flex flex-col items-center justify-center gap-6 pr-12 border-r border-white/10">
          <div className="w-[1px] h-24 bg-white/20"></div>
          <a href="https://github.com/Moh970ed" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><SiGithub size={20} /></a>
          <a href="https://www.linkedin.com/in/mohammed-el-sayed-3a8a62331/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
          <a href="mailto:mohammed.elsayed.m.970@gmail.com" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={20} /></a>
          <a href="https://moh970ed.itch.io/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><SiItchdotio size={20} /></a>
          <div className="w-[1px] h-24 bg-white/20"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center py-20 relative">
          <div className="absolute inset-0 flex items-center justify-start pointer-events-none z-[-1]"><div className="w-[600px] h-[400px] rounded-full bg-primary/10 blur-[100px] -translate-x-1/4" /></div>
          <div className="max-w-3xl">
            <TextBlockAnimation
              animateOnScroll={false}
              delay={0.1}
              blockColor="hsl(262 83% 68%)"
              duration={0.6}
              stagger={0.12}
            >
              <h1 className="text-5xl md:text-8xl font-black text-display tracking-tighter text-white leading-none mb-6">
                <span className="text-neon-purple">MOHAMMED</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-500 to-accent">EL-SAYED</span>
              </h1>
            </TextBlockAnimation>
            
            <div className="h-12 overflow-hidden mb-6 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl md:text-3xl font-mono text-accent"
                >
                  &gt; {roles[roleIndex]}_
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12"
            >
              Software Engineering student based in Giza, Egypt. Building immersive digital experiences and secure systems.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="/CV_Mohammed_ElSayed.pdf"
                download
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-white hover:text-primary transition-all duration-300 glow-primary-hover"
              >
                <span>Download CV</span>
                <Download size={18} />
              </a>
            </motion.div>
          </div>
          
          {/* Decorative floating element */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-64 h-80 border border-primary/30 bg-card/40 backdrop-blur-sm p-6 glow-primary"
          >
            <div className="text-xs font-mono text-primary/70 mb-4 border-b border-primary/20 pb-2">SYS.INIT //</div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-primary/20 rounded"></div>
              <div className="h-2 w-3/4 bg-primary/20 rounded"></div>
              <div className="h-2 w-5/6 bg-primary/20 rounded"></div>
            </div>
            <div className="mt-auto absolute bottom-6 right-6">
              <div className="w-12 h-12 border-2 border-accent rounded-full animate-[spin_4s_linear_infinite] border-t-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="w-full relative z-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="w-full bg-card/90 backdrop-blur-md border-y border-primary/30 py-4 overflow-hidden z-10 relative shadow-[0_0_20px_hsl(262_83%_68%/0.15)]">
        <motion.div
          className="flex gap-8 items-center text-display text-xl uppercase tracking-widest font-bold text-white whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <React.Fragment key={i}>
              <span>GAME DEVELOPER</span>
              <span className="text-accent text-sm">✦</span>
              <span>FULL-STACK</span>
              <span className="text-accent text-sm">✦</span>
              <span>CYBERSECURITY</span>
              <span className="text-accent text-sm">✦</span>
              <span>GODOT</span>
              <span className="text-accent text-sm">✦</span>
              <span>PYTHON</span>
              <span className="text-accent text-sm">✦</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function SectionHeading({ title, num }: { title: string; num: string }) {
  return (
    <div className="mb-16 md:mb-24 flex items-end gap-6 border-b border-white/10 pb-6 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-display text-6xl md:text-8xl font-black text-white/5 leading-none absolute -left-4 -bottom-4 pointer-events-none"
      >
        {num}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter uppercase flex items-center gap-4">
          <span className="text-primary text-xl">/</span> {title}
        </h2>
      </motion.div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 container mx-auto relative z-10">
      <SectionHeading title="ABOUT_ME" num="01" />
      
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-4xl text-display font-bold leading-tight tracking-tight text-white mb-6">
            Building robust systems, crafting immersive games, and breaking digital fortresses.
          </p>
          <div className="w-16 h-1 bg-accent glow-accent"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-10"
        >
          <div className="prose prose-invert text-lg text-muted-foreground">
            <p>
              My expertise spans the entire stack, from frontend interfaces to deep backend architectures and game engines. I approach engineering not just as code, but as a medium for interactive experiences and secure infrastructures. 
            </p>
          </div>

          <div className="relative border border-primary/30 bg-primary/5 p-8 glow-primary rounded-sm overflow-hidden group clip-corner scanlines">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary animate-pulse glow-primary"></span>
              Education Base
            </h3>
            <p className="text-2xl font-bold text-white mb-1">Matrouh University</p>
            <p className="text-muted-foreground mb-6">Faculty of Computers & Artificial Intelligence</p>
            <div className="inline-flex px-3 py-1 bg-primary/20 text-primary font-mono text-sm border border-primary/30">
              2024 &mdash; 2028
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const projects = [
  {
    num: "01",
    title: "AnderMagic",
    desc: "A challenging 2D platformer built for precision and skill. Every level is hand-crafted to push the player's limits. Solo developed from concept to launch.",
    longDesc: "Designed all mechanics, levels, and artwork as a solo developer using the Godot 4.6 engine and GDScript. Published and available on GitHub.",
    tags: ["Godot 4.6", "GDScript", "2D Platformer", "Solo Dev"],
    accentClass: "text-primary",
    borderClass: "border-primary/40",
    glowClass: "glow-primary",
    link: "https://github.com/Moh970ed",
    linkLabel: "View on GitHub",
    linkIcon: "github",
    year: "2024",
    type: "Game Development",
  },
  {
    num: "02",
    title: "Hide and Sink",
    desc: "A multiplayer game of strategy and deception. Players must outwit each other using misdirection, positioning, and timing.",
    longDesc: "Co-developed with a partner, built for real-time multiplayer. Published and live on Itch.io for players to enjoy.",
    tags: ["Multiplayer", "Co-Dev", "Game Design", "Itch.io"],
    accentClass: "text-accent",
    borderClass: "border-accent/40",
    glowClass: "glow-accent",
    link: "https://moh970ed.itch.io/",
    linkLabel: "Play on Itch.io",
    linkIcon: "external",
    year: "2024",
    type: "Game Development",
  },
  {
    num: "03",
    title: "Car-Wash Booking",
    desc: "A full-stack reservation system — customers book slots, staff manage schedules, and the system keeps it all running.",
    longDesc: "Built with PHP, JavaScript, and MySQL. Handles authentication, booking logic, slot availability, and a full admin panel for staff management.",
    tags: ["PHP", "JavaScript", "MySQL", "HTML/CSS"],
    accentClass: "text-pink-400",
    borderClass: "border-pink-500/40",
    glowClass: "glow-pink",
    link: "https://github.com/Moh970ed",
    linkLabel: "View on GitHub",
    linkIcon: "github",
    year: "2024",
    type: "Full-Stack Web",
  },
];

function ProjectContent({ p }: { p: typeof projects[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid md:grid-cols-2 gap-12 md:gap-20 items-start"
    >
      {/* Left — big number + description */}
      <div>
        <div className={`text-[120px] md:text-[160px] font-black font-display leading-none tracking-tighter opacity-10 ${p.accentClass} -ml-2 mb-2 select-none`}>
          {p.num}
        </div>
        <p className="text-2xl md:text-3xl font-display font-bold text-white leading-snug mb-6">
          {p.desc}
        </p>
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          {p.longDesc}
        </p>
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-3 px-6 py-3 border ${p.borderClass} ${p.accentClass} font-mono text-sm uppercase tracking-widest hover:bg-white/5 transition-all duration-300 ${p.glowClass} clip-corner`}
        >
          {p.linkIcon === "github" ? <Github size={16} /> : <ExternalLink size={16} />}
          {p.linkLabel}
        </a>
      </div>

      {/* Right — meta + tags */}
      <div className="flex flex-col gap-8">
        <div className={`border ${p.borderClass} bg-card/40 backdrop-blur-sm p-8 clip-corner ${p.glowClass} relative overflow-hidden`}>
          <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent ${p.accentClass} opacity-40`} />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">Year</p>
              <p className={`font-bold text-lg ${p.accentClass}`}>{p.year}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">Type</p>
              <p className="font-bold text-lg text-white">{p.type}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-3">
            {p.tags.map((t, j) => (
              <span
                key={j}
                className={`px-4 py-2 bg-background border ${p.borderClass} ${p.accentClass} font-mono text-xs uppercase tracking-wider`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative z-10">
      <div className="py-24 px-6 md:px-12 container mx-auto">
        <SectionHeading title="PROJECTS" num="02" />
      </div>

      <StickyTabs navHeight="72px">
        {projects.map((p) => (
          <StickyTabs.Item
            key={p.num}
            id={p.num}
            title={p.title}
            num={p.num}
            accentClass={p.accentClass}
            borderClass={p.borderClass}
            glowClass={p.glowClass}
          >
            <ProjectContent p={p} />
          </StickyTabs.Item>
        ))}
      </StickyTabs>
    </section>
  );
}

const skillCategories = [
  {
    id: "languages",
    cat: "Programming Languages",
    accentClass: "text-primary",
    borderClass: "border-primary/40",
    glowClass: "glow-primary",
    hoverBorder: "hover:border-primary",
    hoverBg: "hover:bg-primary/10",
    hoverText: "group-hover:text-primary",
    hoverGlow: "group-hover:[filter:drop-shadow(0_0_8px_hsl(262_83%_68%/0.8))]",
    items: [
      { name: "Python", icon: SiPython },
      { name: "C++", icon: SiCplusplus },
      { name: "JavaScript", icon: SiJavascript },
      { name: "PHP", icon: SiPhp },
      { name: "MySQL", icon: SiMysql },
      { name: "HTML/CSS", icon: SiHtml5 },
      { name: "GDScript", icon: SiGodotengine },
      { name: "Bash", icon: SiGnubash },
      { name: "Java", icon: null },
    ],
  },
  {
    id: "tools",
    cat: "Tools & Engines",
    accentClass: "text-accent",
    borderClass: "border-accent/40",
    glowClass: "glow-accent",
    hoverBorder: "hover:border-accent",
    hoverBg: "hover:bg-accent/10",
    hoverText: "group-hover:text-accent",
    hoverGlow: "group-hover:[filter:drop-shadow(0_0_8px_hsl(187_96%_43%/0.8))]",
    items: [
      { name: "Godot Engine", icon: SiGodotengine },
      { name: "Git", icon: SiGit },
      { name: "Linux", icon: SiLinux },
      { name: "Kali Linux", icon: SiLinux },
    ],
  },
  {
    id: "security",
    cat: "Cybersecurity",
    accentClass: "text-pink-400",
    borderClass: "border-pink-500/40",
    glowClass: "glow-pink",
    hoverBorder: "hover:border-pink-400",
    hoverBg: "hover:bg-pink-500/10",
    hoverText: "group-hover:text-pink-400",
    hoverGlow: "group-hover:[filter:drop-shadow(0_0_8px_hsl(330_81%_60%/0.8))]",
    items: [
      { name: "Penetration Testing", icon: null },
      { name: "Nmap", icon: null },
      { name: "Burp Suite", icon: null },
      { name: "Metasploit", icon: null },
    ],
  },
];

function SkillGrid({ category }: { category: typeof skillCategories[0] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {category.items.map((skill, j) => {
        const Icon = skill.icon;
        return (
          <motion.div
            key={j}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: j * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className={`flex flex-col items-center justify-center p-6 border border-border bg-card/30 backdrop-blur-sm ${category.hoverBorder} ${category.hoverBg} transition-all duration-300 group cursor-default`}
          >
            {Icon
              ? <Icon className={`text-4xl text-muted-foreground transition-colors mb-4 ${category.hoverText} ${category.hoverGlow}`} />
              : <div className={`text-4xl text-muted-foreground font-black mb-4 flex items-center justify-center ${category.hoverText}`}>{skill.name.charAt(0)}</div>
            }
            <span className={`text-sm font-medium text-white text-center tracking-wider ${category.hoverText}`}>
              {skill.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative z-10">
      <div className="py-24 px-6 md:px-12 container mx-auto">
        <SectionHeading title="SYSTEM_SKILLS" num="03" />
      </div>

      <StickyTabs navHeight="72px">
        {skillCategories.map((cat) => (
          <StickyTabs.Item
            key={cat.id}
            id={cat.id}
            title={cat.cat}
            accentClass={cat.accentClass}
            borderClass={cat.borderClass}
            glowClass={cat.glowClass}
          >
            <SkillGrid category={cat} />
          </StickyTabs.Item>
        ))}
      </StickyTabs>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="pt-32 pb-12 px-6 md:px-12 container mx-auto relative z-10 border-t border-border mt-20">
      <div className="flex flex-col items-center text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl lg:text-[10vw] font-black text-display uppercase tracking-tighter leading-none mb-12 text-white"
        >
          <span className="text-neon-purple">LET'S BUILD</span> <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">THE FUTURE</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a 
            href="mailto:mohammed.elsayed.m.970@gmail.com" 
            className="text-xl md:text-3xl font-mono text-white hover:text-accent transition-colors pb-2 border-b border-accent inline-block mb-16 glow-accent-hover hover:border-accent shadow-[0_4px_15px_-3px_hsl(187_96%_43%/0.4)]"
          >
            mohammed.elsayed.m.970@gmail.com
          </a>
        </motion.div>

        <div className="flex gap-8 mb-16">
          <a href="https://github.com/Moh970ed" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 glow-primary-hover">
            <SiGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/mohammed-el-sayed-3a8a62331/" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 glow-accent-hover">
            <Linkedin size={24} />
          </a>
          <a href="https://moh970ed.itch.io/" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 glow-pink-hover">
            <SiItchdotio size={24} />
          </a>
        </div>
        
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <span>SYS.OFFLINE</span>
          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
          <span>&copy; {new Date().getFullYear()} Mohammed El-Sayed</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // Prevent browser scroll restoration from jumping mid-page
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // When intro finishes, guarantee we're at the top
  useEffect(() => {
    if (introDone) window.scrollTo({ top: 0, behavior: "instant" });
  }, [introDone]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground relative selection:bg-primary selection:text-white">
      <NeonCursor />
      <AnimatePresence>
        {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <Starfield />
      <Navbar />
      
      <main className="overflow-hidden">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
      </main>
      
      <Footer />
    </div>
  );
}
