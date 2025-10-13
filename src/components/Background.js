import React, { useEffect, useRef } from 'react';
import '../styles/components.css';

const Background = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const interactionZonesRef = useRef([]);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to be larger than viewport
    const resizeCanvas = () => {
      // Make canvas 3x the viewport height to allow for scrolling
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Triple the height for scrolling content
      createInteractionZones();
    };
    
    // Update scroll position
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    // Create interactive zones at different scroll positions
    const createInteractionZones = () => {
      interactionZonesRef.current = [
        // Top section zones
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.1, // Near top
          width: 200,
          height: 120,
          type: 'growth-chart',
          hover: false
        },
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.15, // Near top
          width: 180,
          height: 100,
          type: 'metrics',
          hover: false
        },
        // Middle section zones
        {
          x: canvas.width * 0.1,
          y: canvas.height * 0.5, // Middle
          width: 220,
          height: 100,
          type: 'analytics',
          hover: false
        },
        {
          x: canvas.width * 0.6,
          y: canvas.height * 0.6, // Middle
          width: 200,
          height: 120,
          type: 'performance',
          hover: false
        },
        // Bottom section zones
        {
          x: canvas.width * 0.3,
          y: canvas.height * 0.85, // Bottom
          width: 180,
          height: 100,
          type: 'revenue',
          hover: false
        },
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.9, // Bottom
          width: 200,
          height: 120,
          type: 'growth',
          hover: false
        }
      ];
    };

    // Create finance-themed particles distributed throughout the canvas
    const createParticles = () => {
      const particles = [];
      const particleCount = 200; // Increased for larger canvas
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random();
        let particleConfig;
        
        // Distribute particles throughout the entire canvas height
        const particleY = Math.random() * canvas.height;
        
        if (type < 0.4) {
          // Data points
          particleConfig = {
            x: Math.random() * canvas.width,
            y: particleY,
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
            y: particleY,
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
            y: particleY,
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

    // Mouse interactions with scroll offset
    const handleMouseMove = (event) => {
      // Adjust mouse position for scroll
      const adjustedY = event.clientY + scrollYRef.current;
      
      mouseRef.current = {
        x: event.clientX,
        y: adjustedY,
        rawY: event.clientY,
        isMoving: true
      };

      // Check interaction zones with scroll adjustment
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
      const adjustedY = event.clientY + scrollYRef.current;
      
      interactionZonesRef.current.forEach(zone => {
        const isClicking = 
          event.clientX > zone.x && 
          event.clientX < zone.x + zone.width &&
          adjustedY > zone.y && 
          adjustedY < zone.y + zone.height;
        
        if (isClicking) {
          createRipple(event.clientX, adjustedY, zone.type);
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
        color: getRippleColor(type),
        active: true
      });
    };

    const getRippleColor = (type) => {
      switch(type) {
        case 'growth-chart': return 'rgba(74, 222, 128, 0.3)';
        case 'metrics': return 'rgba(96, 165, 250, 0.3)';
        case 'analytics': return 'rgba(168, 85, 247, 0.3)';
        case 'performance': return 'rgba(245, 158, 11, 0.3)';
        case 'revenue': return 'rgba(34, 197, 94, 0.3)';
        case 'growth': return 'rgba(139, 92, 246, 0.3)';
        default: return 'rgba(96, 165, 250, 0.3)';
      }
    };

    // Drawing functions
    const drawEnhancedGrid = (ctx, canvas) => {
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
      ctx.lineWidth = 1;
      
      // Vertical lines throughout entire canvas
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines throughout entire canvas
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawProminentTrendLines = (ctx, canvas) => {
      const time = Date.now() * 0.001;
      
      // Multiple trend lines at different heights
      
      // Top section trend line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.4)';
      ctx.lineWidth = 3;
      ctx.moveTo(-50, canvas.height * 0.1);
      for (let x = 0; x < canvas.width + 50; x += 15) {
        const y = canvas.height * 0.1 - Math.sin(x * 0.008 + time) * 40 - x * 0.02;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Middle section trend line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
      ctx.lineWidth = 2;
      ctx.moveTo(-30, canvas.height * 0.4);
      for (let x = 0; x < canvas.width + 30; x += 12) {
        const y = canvas.height * 0.4 + Math.cos(x * 0.01 + time * 1.2) * 80;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Bottom section trend line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.lineWidth = 2;
      ctx.moveTo(-20, canvas.height * 0.75);
      for (let x = 0; x < canvas.width + 20; x += 10) {
        const y = canvas.height * 0.75 + Math.sin(x * 0.015 + time * 0.8) * 60;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawInteractionZones = (ctx) => {
      interactionZonesRef.current.forEach(zone => {
        ctx.save();
        
        if (zone.hover) {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.15)';
          ctx.strokeStyle = 'rgba(74, 222, 128, 0.6)';
          ctx.lineWidth = 3;
        } else {
          ctx.fillStyle = 'rgba(96, 165, 250, 0.08)';
          ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
          ctx.lineWidth = 2;
        }
        
        ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
        ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
        
        // Zone label
        ctx.fillStyle = zone.hover ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          getZoneLabel(zone.type),
          zone.x + zone.width / 2,
          zone.y + zone.height / 2
        );
        
        ctx.restore();
      });
    };

    const getZoneLabel = (type) => {
      switch(type) {
        case 'growth-chart': return 'Growth Chart';
        case 'metrics': return 'Key Metrics';
        case 'analytics': return 'Analytics';
        case 'performance': return 'Performance';
        case 'revenue': return 'Revenue';
        case 'growth': return 'Growth Stats';
        default: return 'Interactive Zone';
      }
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
      // Indicators at different scroll positions
      
      // Top section indicators
      const topPercentages = ['+24.8%', '+18.3%', '+32.1%'];
      topPercentages.forEach((percent, index) => {
        const x = (canvas.width / (topPercentages.length + 1)) * (index + 1);
        const y = canvas.height * 0.05 + Math.sin(time * 0.8 + index) * 30;
        
        ctx.save();
        ctx.globalAlpha = 0.7 + Math.sin(time + index) * 0.3;
        ctx.fillStyle = 'rgba(74, 222, 128, 0.8)';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(percent, x, y);
        ctx.restore();
      });

      // Middle section indicators
      const middlePercentages = ['+45.2%', '+28.7%', '+51.9%'];
      middlePercentages.forEach((percent, index) => {
        const x = (canvas.width / (middlePercentages.length + 1)) * (index + 1);
        const y = canvas.height * 0.45 + Math.cos(time * 1.2 + index) * 40;
        
        ctx.save();
        ctx.globalAlpha = 0.7 + Math.cos(time * 1.5 + index) * 0.3;
        ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(percent, x, y);
        ctx.restore();
      });

      // Bottom section indicators
      const bottomPercentages = ['+67.3%', '+42.8%', '+58.1%'];
      bottomPercentages.forEach((percent, index) => {
        const x = (canvas.width / (bottomPercentages.length + 1)) * (index + 1);
        const y = canvas.height * 0.8 + Math.sin(time * 0.6 + index) * 50;
        
        ctx.save();
        ctx.globalAlpha = 0.7 + Math.sin(time * 2 + index) * 0.3;
        ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(percent, x, y);
        ctx.restore();
      });

      // Bar charts at different positions
      drawBarChart(ctx, canvas, time, 0.2, 6, 'rgba(74, 222, 128, 0.6)'); // Top
      drawBarChart(ctx, canvas, time, 0.55, 5, 'rgba(96, 165, 250, 0.6)'); // Middle
      drawBarChart(ctx, canvas, time, 0.85, 4, 'rgba(168, 85, 247, 0.6)'); // Bottom
    };

    const drawBarChart = (ctx, canvas, time, verticalPosition, barCount, color) => {
      const baseY = canvas.height * verticalPosition;
      
      for (let i = 0; i < barCount; i++) {
        const x = 100 + i * 120;
        const height = 50 + Math.sin(time * 1.5 + i + verticalPosition * 10) * 35;
        const isPositive = i % 4 !== 0;
        
        ctx.fillStyle = isPositive ? color : 'rgba(248, 113, 113, 0.6)';
        ctx.fillRect(x, baseY - height, 40, height);
        
        // Bar value
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(height)}%`, x + 20, baseY - height - 10);
      }
    };

    // Animation with scroll consideration
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create vibrant finance gradient background that spans entire canvas
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.33, '#1e293b');
      gradient.addColorStop(0.66, '#334155');
      gradient.addColorStop(1, '#475569');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw enhanced grid
      drawEnhancedGrid(ctx, canvas);
      
      // Draw prominent trend lines
      drawProminentTrendLines(ctx, canvas);

      // Draw interactive zones
      drawInteractionZones(ctx);

      // Update and draw particles
      const time = Date.now() * 0.001;
      
      particlesRef.current.forEach((particle, index) => {
        // Pulsing effect
        particle.pulse += 0.05;
        const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;

        // Mouse attraction for some particles (adjusted for scroll)
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

          // Boundary check for entire canvas
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        }

        // Draw particle
        ctx.save();
        
        if (particle.type === 'currency') {
          ctx.font = `${particle.size * 4 * pulseScale}px Arial`;
          ctx.fillStyle = particle.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.symbol, particle.x, particle.y);
        } else {
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
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '300vh', // This ensures the canvas covers the scrollable area
          pointerEvents: 'none'
        }}
      />
      <div className="background-overlay"></div>
    </div>
  );
};

export default Background;
