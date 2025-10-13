import React, { useEffect, useRef } from 'react';
import '../styles/components.css';

const Background = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const interactionZonesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createInteractionZones();
    };
    
    // Create interactive zones (clickable chart areas)
    const createInteractionZones = () => {
      interactionZonesRef.current = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.3,
          width: 200,
          height: 120,
          type: 'growth-chart',
          hover: false
        },
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.4,
          width: 180,
          height: 100,
          type: 'metrics',
          hover: false
        }
      ];
    };

    // Create finance-themed particles
    const createParticles = () => {
      const particles = [];
      const particleCount = 120;
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random();
        let particleConfig;
        
        if (type < 0.4) {
          // Data points
          particleConfig = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 2,
            speedX: 0,
            speedY: 0,
            color: `rgba(74, 222, 128, ${Math.random() * 0.5 + 0.3})`,
            type: 'data',
            pulse: Math.random() * Math.PI * 2
          };
        } else if (type < 0.7) {
          // Floating indicators
          particleConfig = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            color: `rgba(96, 165, 250, ${Math.random() * 0.4 + 0.2})`,
            type: 'indicator',
            pulse: Math.random() * Math.PI * 2
          };
        } else {
          // Currency symbols
          particleConfig = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            color: `rgba(248, 113, 113, ${Math.random() * 0.4 + 0.2})`,
            type: 'currency',
            symbol: ['$', '€', '£', '¥', '₿'][Math.floor(Math.random() * 5)],
            pulse: Math.random() * Math.PI * 2
          };
        }
        
        particles.push(particleConfig);
      }
      return particles;
    };

    // Mouse interactions
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
        isMoving: true
      };

      // Check interaction zones
      interactionZonesRef.current.forEach(zone => {
        const isHovering = 
          mouseRef.current.x > zone.x && 
          mouseRef.current.x < zone.x + zone.width &&
          mouseRef.current.y > zone.y && 
          mouseRef.current.y < zone.y + zone.height;
        
        zone.hover = isHovering;
      });
    };

    const handleMouseClick = (event) => {
      interactionZonesRef.current.forEach(zone => {
        const isClicking = 
          event.clientX > zone.x && 
          event.clientX < zone.x + zone.width &&
          event.clientY > zone.y && 
          event.clientY < zone.y + zone.height;
        
        if (isClicking) {
          createRipple(event.clientX, event.clientY, zone.type);
        }
      });
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
      interactionZonesRef.current.forEach(zone => {
        zone.hover = false;
      });
    };

    // Ripple effect for clicks
    const ripples = [];
    const createRipple = (x, y, type) => {
      ripples.push({
        x, y,
        radius: 0,
        maxRadius: 150,
        color: type === 'growth-chart' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(96, 165, 250, 0.3)',
        active: true
      });
    };

    // Drawing functions
    const drawEnhancedGrid = (ctx, canvas) => {
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawProminentTrendLines = (ctx, canvas) => {
      const time = Date.now() * 0.001;
      
      // Strong upward trend (green)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.4)';
      ctx.lineWidth = 3;
      ctx.moveTo(-50, canvas.height * 0.6);
      for (let x = 0; x < canvas.width + 50; x += 15) {
        const y = canvas.height * 0.6 - Math.sin(x * 0.008 + time) * 80 - x * 0.03;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Market fluctuation line (blue)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
      ctx.lineWidth = 2;
      ctx.moveTo(-30, canvas.height * 0.3);
      for (let x = 0; x < canvas.width + 30; x += 12) {
        const y = canvas.height * 0.3 + Math.cos(x * 0.01 + time * 1.2) * 60;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawInteractionZones = (ctx) => {
      interactionZonesRef.current.forEach(zone => {
        ctx.save();
        
        if (zone.hover) {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.1)';
          ctx.strokeStyle = 'rgba(74, 222, 128, 0.5)';
          ctx.lineWidth = 2;
        } else {
          ctx.fillStyle = 'rgba(96, 165, 250, 0.05)';
          ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
          ctx.lineWidth = 1;
        }
        
        ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
        ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
        
        // Zone label
        ctx.fillStyle = zone.hover ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          zone.type === 'growth-chart' ? 'Growth Analysis' : 'Key Metrics',
          zone.x + zone.width / 2,
          zone.y + zone.height / 2
        );
        
        ctx.restore();
      });
    };

    const drawRipples = (ctx) => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 4;
        
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawProminentFinanceIndicators = (ctx, canvas, time) => {
      // Large percentage indicators
      const percentages = ['+24.8%', '+18.3%', '+32.1%', '+41.5%'];
      percentages.forEach((percent, index) => {
        const x = (canvas.width / (percentages.length + 1)) * (index + 1);
        const y = canvas.height * 0.2 + Math.sin(time * 0.8 + index) * 60;
        
        ctx.save();
        ctx.globalAlpha = 0.6 + Math.sin(time + index) * 0.3;
        ctx.fillStyle = 'rgba(74, 222, 128, 0.7)';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(percent, x, y);
        ctx.restore();
      });

      // Prominent bar chart
      for (let i = 0; i < 6; i++) {
        const x = 150 + i * 100;
        const height = 40 + Math.sin(time * 1.5 + i) * 25;
        const isPositive = i % 4 !== 0;
        
        ctx.fillStyle = isPositive 
          ? 'rgba(74, 222, 128, 0.6)' 
          : 'rgba(248, 113, 113, 0.6)';
        ctx.fillRect(x, canvas.height - 150 - height, 40, height);
        
        // Bar value
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(height)}%`, x + 20, canvas.height - 155 - height);
      }
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create vibrant finance gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e293b');
      gradient.addColorStop(1, '#334155');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw enhanced grid
      drawEnhancedGrid(ctx, canvas);
      
      // Draw prominent trend lines
      drawProminentTrendLines(ctx, canvas);

      // Draw interactive zones
      drawInteractionZones(ctx);

      // Update and draw particles with enhanced effects
      const time = Date.now() * 0.001;
      
      particlesRef.current.forEach((particle, index) => {
        // Pulsing effect
        particle.pulse += 0.05;
        const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;

        // Mouse attraction for some particles
        if (particle.type === 'indicator' && mouseRef.current.isMoving) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.x += (dx / distance) * force * 2;
            particle.y += (dy / distance) * force * 2;
          }
        }

        // Movement
        if (particle.type !== 'data') {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Boundary check
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        }

        // Draw particle with enhanced effects
        ctx.save();
        
        if (particle.type === 'currency') {
          // Currency symbols
          ctx.font = `${particle.size * 4 * pulseScale}px Arial`;
          ctx.fillStyle = particle.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.symbol, particle.x, particle.y);
        } else {
          // Shapes with glow
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 10 * pulseScale;
          ctx.fillStyle = particle.color;
          
          if (particle.type === 'data') {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * pulseScale, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(
              particle.x - particle.size * pulseScale / 2,
              particle.y - particle.size * pulseScale / 2,
              particle.size * pulseScale,
              particle.size * pulseScale
            );
          }
        }
        
        ctx.restore();

        // Enhanced connections
        if (particle.type === 'data') {
          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex && otherParticle.type === 'data') {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(74, 222, 128, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
              }
            }
          });
        }
      });

      // Update and draw ripples
      drawRipples(ctx);

      // Add prominent finance indicators
      drawProminentFinanceIndicators(ctx, canvas, time);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    particlesRef.current = createParticles();
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="background-container">
      <canvas 
        ref={canvasRef} 
        className="finance-background"
      />
      <div className="background-overlay"></div>
    </div>
  );
};

export default Background;
