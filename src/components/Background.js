import React, { useEffect, useRef } from 'react';
import '../styles/components.css';

const Background = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const interactionZonesRef = useRef([]);
  const scrollYRef = useRef(0);
  const ripplesRef = useRef([]);
  const explosionsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Scroll handling
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    // Create interactive zones at different absolute positions
    const createInteractionZones = () => {
      interactionZonesRef.current = [
        // Zones positioned at different scroll positions
        {
          x: canvas.width * 0.2,
          y: 800, // Will appear when scrolled to 800px
          width: 200,
          height: 120,
          type: 'growth-chart',
          hover: false
        },
        {
          x: canvas.width * 0.7,
          y: 1000, // Will appear when scrolled to 1000px
          width: 180,
          height: 100,
          type: 'metrics',
          hover: false
        },
        {
          x: canvas.width * 0.1,
          y: 1800, // Further down the page
          width: 220,
          height: 100,
          type: 'analytics',
          hover: false
        },
        {
          x: canvas.width * 0.6,
          y: 2200, // Even further down
          width: 200,
          height: 120,
          type: 'performance',
          hover: false
        }
      ];
    };

    // Create finance-themed particles
    const createParticles = () => {
      const particles = [];
      const particleCount = 80; // Reduced for better performance
      
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
      const viewportY = event.clientY;
      const absoluteY = viewportY + scrollYRef.current;
      
      mouseRef.current = {
        x: event.clientX,
        y: absoluteY,
        viewportY: viewportY,
        isMoving: true
      };

      // Check interaction zones (adjust for scroll)
      interactionZonesRef.current.forEach(zone => {
        const zoneViewportY = zone.y - scrollYRef.current;
        const isHovering = 
          event.clientX > zone.x && 
          event.clientX < zone.x + zone.width &&
          viewportY > zoneViewportY && 
          viewportY < zoneViewportY + zone.height;
        
        zone.hover = isHovering;
      });
    };

    const handleMouseClick = (event) => {
      const viewportY = event.clientY;
      
      // Check if clicking on interaction zones
      let clickedZone = false;
      interactionZonesRef.current.forEach(zone => {
        const zoneViewportY = zone.y - scrollYRef.current;
        const isClicking = 
          event.clientX > zone.x && 
          event.clientX < zone.x + zone.width &&
          viewportY > zoneViewportY && 
          viewportY < zoneViewportY + zone.height;
        
        if (isClicking) {
          clickedZone = true;
          createRipple(event.clientX, viewportY, zone.type);
          createExplosion(event.clientX, viewportY, zone.type);
        }
      });

      // If not clicking on a zone, create background click effects
      if (!clickedZone) {
        createRipple(event.clientX, viewportY, 'background');
        createExplosion(event.clientX, viewportY, 'background');
        createParticleBurst(event.clientX, viewportY);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
      interactionZonesRef.current.forEach(zone => {
        zone.hover = false;
      });
    };

    // Ripple effect for clicks
    const createRipple = (x, y, type) => {
      ripplesRef.current.push({
        x, y,
        radius: 0,
        maxRadius: 120,
        color: getRippleColor(type),
        active: true,
        life: 1
      });
    };

    // Explosion effect for clicks
    const createExplosion = (x, y, type) => {
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        
        explosionsRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 4,
          color: getExplosionColor(type),
          life: 1,
          decay: 0.02 + Math.random() * 0.02
        });
      }
    };

    // Particle burst for background clicks
    const createParticleBurst = (x, y) => {
      const burstCount = 12;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        
        particlesRef.current.push({
          x, y,
          size: 2 + Math.random() * 3,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`,
          type: 'burst',
          pulse: Math.random() * Math.PI * 2,
          life: 1,
          decay: 0.01
        });
      }
    };

    const getRippleColor = (type) => {
      switch(type) {
        case 'growth-chart': return 'rgba(74, 222, 128, 0.4)';
        case 'metrics': return 'rgba(96, 165, 250, 0.4)';
        case 'analytics': return 'rgba(168, 85, 247, 0.4)';
        case 'performance': return 'rgba(245, 158, 11, 0.4)';
        default: return 'rgba(255, 255, 255, 0.3)';
      }
    };

    const getExplosionColor = (type) => {
      switch(type) {
        case 'growth-chart': return 'rgba(74, 222, 128, 0.8)';
        case 'metrics': return 'rgba(96, 165, 250, 0.8)';
        case 'analytics': return 'rgba(168, 85, 247, 0.8)';
        case 'performance': return 'rgba(245, 158, 11, 0.8)';
        default: return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
      }
    };

    // Drawing functions
    const drawEnhancedGrid = (ctx, canvas) => {
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.1)';
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

    const drawProminentTrendLines = (ctx, canvas, time) => {
      // Single trend line that moves with scroll
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
      ctx.lineWidth = 3;
      ctx.moveTo(-50, 100 - (scrollYRef.current * 0.3));
      for (let x = 0; x < canvas.width + 50; x += 15) {
        const y = 100 - Math.sin(x * 0.008 + time) * 40 - x * 0.02 - (scrollYRef.current * 0.3);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawInteractionZones = (ctx) => {
      interactionZonesRef.current.forEach(zone => {
        const zoneViewportY = zone.y - scrollYRef.current;
        
        // Only draw if zone is visible in viewport
        if (zoneViewportY > -zone.height && zoneViewportY < canvas.height) {
          ctx.save();
          
          if (zone.hover) {
            ctx.fillStyle = 'rgba(74, 222, 128, 0.2)';
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.8)';
            ctx.lineWidth = 3;
          } else {
            ctx.fillStyle = 'rgba(96, 165, 250, 0.1)';
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
            ctx.lineWidth = 2;
          }
          
          ctx.fillRect(zone.x, zoneViewportY, zone.width, zone.height);
          ctx.strokeRect(zone.x, zoneViewportY, zone.width, zone.height);
          
          // Zone label
          ctx.fillStyle = zone.hover ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            getZoneLabel(zone.type),
            zone.x + zone.width / 2,
            zoneViewportY + zone.height / 2
          );
          
          ctx.restore();
        }
      });
    };

    const getZoneLabel = (type) => {
      switch(type) {
        case 'growth-chart': return 'Growth Chart';
        case 'metrics': return 'Key Metrics';
        case 'analytics': return 'Analytics';
        case 'performance': return 'Performance';
        default: return 'Interactive Zone';
      }
    };

    const drawRipples = (ctx) => {
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        ripple.radius += 8;
        ripple.life -= 0.02;
        
        if (ripple.radius > ripple.maxRadius || ripple.life <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = ripple.life;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawExplosions = (ctx) => {
      for (let i = explosionsRef.current.length - 1; i >= 0; i--) {
        const explosion = explosionsRef.current[i];
        explosion.x += explosion.vx;
        explosion.y += explosion.vy;
        explosion.life -= explosion.decay;
        
        if (explosion.life <= 0) {
          explosionsRef.current.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = explosion.life;
        ctx.fillStyle = explosion.color;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawProminentFinanceIndicators = (ctx, canvas, time) => {
      // Indicators at different scroll positions
      const indicators = [
        { text: '+24.8%', y: 200, color: 'rgba(74, 222, 128, 0.8)' },
        { text: '+18.3%', y: 600, color: 'rgba(96, 165, 250, 0.8)' },
        { text: '+32.1%', y: 1200, color: 'rgba(168, 85, 247, 0.8)' },
        { text: '+45.2%', y: 1800, color: 'rgba(245, 158, 11, 0.8)' },
        { text: '+28.7%', y: 2400, color: 'rgba(34, 197, 94, 0.8)' },
        { text: '+51.9%', y: 3000, color: 'rgba(139, 92, 246, 0.8)' }
      ];

      indicators.forEach((indicator, index) => {
        const viewportY = indicator.y - scrollYRef.current;
        
        // Only draw if indicator is visible in viewport
        if (viewportY > -50 && viewportY < canvas.height + 50) {
          const x = canvas.width * 0.5 + Math.sin(time + index) * 100;
          const waveY = viewportY + Math.sin(time * 2 + index) * 20;
          
          ctx.save();
          ctx.globalAlpha = 0.7 + Math.sin(time * 3 + index) * 0.3;
          ctx.fillStyle = indicator.color;
          ctx.font = 'bold 24px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(indicator.text, x, waveY);
          ctx.restore();
        }
      });

      // Bar charts at different scroll positions
      const barCharts = [
        { y: 400, count: 6, color: 'rgba(74, 222, 128, 0.6)' },
        { y: 1000, count: 5, color: 'rgba(96, 165, 250, 0.6)' },
        { y: 1600, count: 4, color: 'rgba(168, 85, 247, 0.6)' },
        { y: 2200, count: 6, color: 'rgba(245, 158, 11, 0.6)' },
        { y: 2800, count: 5, color: 'rgba(34, 197, 94, 0.6)' }
      ];

      barCharts.forEach((chart, chartIndex) => {
        const viewportY = chart.y - scrollYRef.current;
        
        // Only draw if bar chart is visible in viewport
        if (viewportY > -100 && viewportY < canvas.height + 100) {
          for (let i = 0; i < chart.count; i++) {
            const x = 100 + i * 120;
            const height = 50 + Math.sin(time + i + chartIndex) * 35;
            const isPositive = i % 4 !== 0;
            
            ctx.fillStyle = isPositive ? chart.color : 'rgba(248, 113, 113, 0.6)';
            ctx.fillRect(x, viewportY - height, 40, height);
            
            // Bar value
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = '11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${Math.round(height)}%`, x + 20, viewportY - height - 10);
          }
        }
      });
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

      const time = Date.now() * 0.001;

      // Draw elements
      drawEnhancedGrid(ctx, canvas);
      drawProminentTrendLines(ctx, canvas, time);
      drawInteractionZones(ctx);
      drawProminentFinanceIndicators(ctx, canvas, time);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Pulsing effect
        particle.pulse += 0.05;
        const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;

        // Mouse attraction
        if (particle.type === 'indicator' && mouseRef.current.isMoving) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.viewportY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.x += (dx / distance) * force * 2;
            particle.y += (dy / distance) * force * 2;
          }
        }

        // Movement for non-data particles
        if (particle.type !== 'data' && particle.type !== 'burst') {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Boundary check
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        }

        // Life decay for burst particles
        if (particle.type === 'burst') {
          particle.life -= particle.decay;
          if (particle.life <= 0) {
            particlesRef.current.splice(index, 1);
            return;
          }
        }

        // Draw particle
        ctx.save();
        if (particle.type === 'burst') {
          ctx.globalAlpha = particle.life;
        }
        
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
          
          if (particle.type === 'data' || particle.type === 'burst') {
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
      });

      // Draw click effects
      drawRipples(ctx);
      drawExplosions(ctx);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    createInteractionZones();
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
      />
      <div className="background-overlay"></div>
    </div>
  );
};

export default Background;
