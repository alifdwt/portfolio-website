"use client";

import { Twitter as XIcon, Instagram, Github, Music } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface LinkItem {
  title: string;
  href: string;
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export default function UltraModernLinksPage() {
  const t = useTranslations("links");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Links data
  const links: LinkItem[] = [
    {
      title: t("links.portfolio"),
      href: "https://alifdwt.com",
    },
    {
      title: "LyricsTranslate",
      href: "https://lyricstranslate.com/en/translator/alif-putra-dewantara",
    },
    {
      title: t("links.insandunia"),
      href: "https://insandunia.com",
    },
  ];

  // Social links data
  const socialLinks: SocialLink[] = [
    {
      icon: XIcon,
      href: "https://x.com/alifdwt",
      label: "X (Twitter)",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/alifdwt/",
      label: "Instagram",
    },
    {
      icon: Music,
      href: "https://open.spotify.com/user/alifpd?si=a744e18e9a704f2a",
      label: "Spotify",
    },
    {
      icon: Github,
      href: "https://github.com/alifdwt",
      label: "GitHub",
    },
  ];

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 15}, 70%, 60%)`, // Orange to yellow spectrum
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
              ctx.save();
              ctx.globalAlpha = 0.1;
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mousePos]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Multi-layer Background Effects */}
      <div className="absolute inset-0 z-10">
        {/* Base gradient mesh */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, hsla(25, 90%, 65%, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, hsla(45, 85%, 70%, 0.6) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, hsla(15, 95%, 60%, 0.7) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, hsla(35, 90%, 65%, 0.5) 0%, transparent 50%),
              linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ff4757 50%, #ff6b35 75%, #f39c12 100%)
            `,
            backgroundSize: "400% 400%",
            animation: "gradientFlow 20s ease infinite",
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animation: `floatShape ${15 + i * 2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 p-4">
        <div className="mx-auto max-w-md">
          {/* Ultra Modern Glass Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl">
            {/* Card glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-50" />

            {/* Profile Section */}
            <div className="relative px-8 pt-12 pb-8 text-center">
              <div className="relative inline-block">
                <Avatar className="relative z-10 mx-auto mb-6 h-24 w-24 shadow-2xl ring-4 ring-white/30 backdrop-blur-sm">
                  <AvatarImage
                    src="https://lh3.googleusercontent.com/a/ACg8ocJn0LtCtdqBeDCVrCnbcCfX0n3VGhKBCbNcmNLf2GpeTNfUANTS=s288-c-no"
                    alt="Alif Dewantara"
                  />
                  <AvatarFallback className="bg-white/20 text-xl font-semibold text-white backdrop-blur-sm">
                    AD
                  </AvatarFallback>
                </Avatar>

                {/* Multi-layer glow behind avatar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-28 w-28 animate-pulse rounded-full bg-yellow-400/30 blur-2xl" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 animate-pulse rounded-full bg-orange-400/20 blur-3xl delay-1000" />
                </div>
              </div>

              <h1 className="mb-2 text-2xl font-bold text-white drop-shadow-lg">
                Alif Dewantara
              </h1>

              <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/90 drop-shadow-sm">
                {t("bio")}
              </p>
            </div>

            {/* Links Section */}
            <div className="space-y-4 px-6 pb-2">
              {links.map((link, index) => (
                <div key={index} className="group relative">
                  <Button
                    asChild
                    variant="ghost"
                    className="relative h-14 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 text-base font-medium text-white/90 backdrop-blur-md transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-orange-500/25 hover:border-white/40 hover:bg-white/20"
                  >
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10">{link.title}</span>
                      {/* Multi-layer hover effects */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Social Links Section */}
            <div className="px-8 pt-6 pb-12">
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/20 hover:text-white hover:shadow-xl"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-white/90 drop-shadow-lg">
              {t("footer")}
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientFlow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }

        @keyframes floatShape {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(0px) rotate(180deg);
          }
          75% {
            transform: translateY(20px) rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
}
