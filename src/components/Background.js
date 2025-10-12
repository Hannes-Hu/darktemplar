import React, { useEffect, useRef } from 'react';
import '../styles/components.css';

const Background = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; 
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      const particles = [];
      const particleCount = Math.min(150, Math.floor((window.innerWidth * window.innerHeight) / 10000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 255}, ${Math.random() * 0.3 + 0.1})`,
          orbitRadius: Math.random() * 50 + 20,
          orbitSpeed: (Math.random() - 0.5) * 0.02,
          angle: Math.random() * Math.PI * 2,
          type: Math.random() > 0.8 ? 'star' : 'particle'
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    // Mouse move interaction
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(10, 15, 40, 0.95)'); // Darker for better contrast
      gradient.addColorStop(0.5, 'rgba(20, 25, 60, 0.9)');
      gradient.addColorStop(1, 'rgba(30, 35, 80, 0.85)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x += (dx / distance) * force * 2;
          particle.y += (dy / distance) * force * 2;
        }

        // Orbital motion for some particles
        if (particle.type === 'star') {
          particle.angle += particle.orbitSpeed;
          particle.x += Math.cos(particle.angle) * 0.3;
          particle.y += Math.sin(particle.angle) * 0.3;
        }

        // Regular movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary check with wrap-around
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        // Draw particle
        ctx.beginPath();
        
        if (particle.type === 'star') {
          // Draw stars with glow effect
          const glow = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          glow.addColorStop(0, particle.color);
          glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = glow;
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main particle
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections between nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      // Add floating financial elements
      drawFloatingElements(ctx, canvas);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const drawFloatingElements = (ctx, canvas) => {
      const time = Date.now() * 0.001;
      
      // Floating currency symbols
      const symbols = ['$', '€', '£', '¥', '₿'];
      symbols.forEach((symbol, index) => {
        const x = (canvas.width / (symbols.length + 1)) * (index + 1);
        const y = canvas.height / 2 + Math.sin(time * 0.5 + index) * 100;
        const size = 20 + Math.sin(time + index) * 5;
        
        ctx.save();
        ctx.globalAlpha = 0.15 + Math.sin(time + index) * 0.1;
        ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
        ctx.font = `${size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol, x, y);
        ctx.restore();
      });

      // Animated wave lines (stock chart-like)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(80, 180, 255, 0.1)';
      ctx.lineWidth = 2;
      
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 3 + Math.sin(x * 0.01 + time * 2) * 30;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Second wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(180, 80, 255, 0.1)';
      ctx.lineWidth = 2;
      
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height * 2/3 + Math.cos(x * 0.008 + time * 1.5) * 40;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    animate();

    // Scroll parallax effect - make it more subtle
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.2; // Slower for better effect
      if (canvasRef.current) {
        canvasRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.05)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="background-container">
      <canvas 
        ref={canvasRef} 
        className="space-background"
      />
      <div className="background-overlay"></div>
    </div>
  );
};

export default Background;

