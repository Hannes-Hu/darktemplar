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
  const sparklesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let totalHeight = document.documentElement.scrollHeight;
    
    // Set canvas size to be the full scrollable height
    const resizeCanvas = () => {
      totalHeight = document.documentElement.scrollHeight;
      canvas.width = window.innerWidth;
      canvas.height = totalHeight;
      createInteractionZones();
      createParticles();
    };
    
    // Scroll handling
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    // Create interactive zones at different scroll positions
    const createInteractionZones = () => {
      interactionZonesRef.current = [
        // Top section (visible at start)
        {
          x: canvas.width * 0.2,
          y: 300,
          width: 200,
          height: 120,
          type: 'growth-chart',
          hover: false
        },
        {
          x: canvas.width * 0.7,
          y: 500,
          width: 180,
          height: 100,
          type: 'metrics',
          hover: false
        },
        // Middle section (visible after scrolling ~1000px)
        {
          x: canvas.width * 0.1,
          y: 1200,
          width: 220,
          height: 100,
          type: 'analytics',
          hover: false
        },
        {
          x: canvas.width * 0.6,
          y: 1500,
          width: 200,
          height: 120,
          type: 'performance',
          hover: false
        },
        // Bottom section (visible after scrolling ~2500px)
        {
          x: canvas.width * 0.3,
          y: 2500,
          width: 180,
          height: 100,
          type: 'revenue',
          hover: false
        },
        {
          x: canvas.width * 0.7,
          y: 2800,
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
      const particleCount = 150;
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random();
        let particleConfig;
        
        // Distribute particles throughout the entire canvas height
        const particleY = Math.random() * canvas.height;
        
        if (type < 0.4) {
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
      particlesRef.current = particles;
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
          createSparkles(event.clientX, viewportY, zone.type);
          createParticleBurst(event.clientX, viewportY, zone.type);
        }
      });

      if (!clickedZone) {
        createRipple(event.clientX, viewportY, 'background');
        createExplosion(event.clientX, viewportY, 'background');
        createSparkles(event.clientX, viewportY, 'background');
        createParticleBurst(event.clientX, viewportY, 'background');
        createWaveEffect(event.clientX, viewportY);
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
        life: 1,
        speed: 8 + Math.random() * 4
      });
    };

    // Explosion effect for clicks
    const createExplosion = (x, y, type) => {
      const particleCount = 12;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        
        explosionsRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 5,
          color: getExplosionColor(type),
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2
        });
      }
    };

    // Sparkle effect for clicks
    const createSparkles = (x, y, type) => {
      const sparkleCount = 8;
      for (let i = 0; i < sparkleCount; i++) {
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 20 + Math.random() * 40;
        
        sparklesRef.current.push({
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          startX: x,
          startY: y,
          size: 1 + Math.random() * 3,
          color: getSparkleColor(type),
          life: 1,
          decay: 0.03 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    // Particle burst for background clicks
    const createParticleBurst = (x, y, type) => {
      const burstCount = 15;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        
        particlesRef.current.push({
          x: x,
          y: y + scrollYRef.current,
          size: 1 + Math.random() * 4,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          color: getParticleColor(type),
          type: 'burst',
          pulse: Math.random() * Math.PI * 2,
          life: 1,
          decay: 0.008 + Math.random() * 0.01,
          rotation: Math.random() * Math.PI * 2
        });
      }
    };

    // Wave effect for background clicks
    const createWaveEffect = (x, y) => {
      for (let i = 0; i < 3; i++) {
        ripplesRef.current.push({
          x, y,
          radius: i * 20,
          maxRadius: 200 + i * 50,
          color: `rgba(255, 255, 255, ${0.2 - i * 0.05})`,
          active: true,
          life: 1 - i * 0.2,
          speed: 6 + i * 2
        });
      }
    };

    const getRippleColor = (type) => {
      switch(type) {
        case 'growth-chart': return 'rgba(74, 222, 128, 0.5)';
        case 'metrics': return 'rgba(96, 165, 250, 0.5)';
        case 'analytics': return 'rgba(168, 85, 247, 0.5)';
        case 'performance': return 'rgba(245, 158, 11, 0.5)';
        case 'revenue': return 'rgba(34, 197, 94, 0.5)';
        case 'growth': return 'rgba(139, 92, 246, 0.5)';
        default: return 'rgba(255, 255, 255, 0.4)';
      }
    };

    const getExplosionColor = (type) => {
      switch(type) {
        case 'growth-chart': return 'rgba(74, 222, 128, 0.9)';
        case 'metrics': return 'rgba(96, 165, 250, 0.9)';
        case 'analytics': return 'rgba(168, 85, 247, 0.9)';
        case 'performance': return 'rgba(245, 158, 11, 0.9)';
        case 'revenue': return 'rgba(34, 197, 94, 0.9)';
        case 'growth': return 'rgba(139, 92, 246, 0.9)';
        default: return `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 0.9)`;
      }
    };

    const getSparkleColor = (type) => {
      switch(type) {
        case 'growth-chart': return 'rgba(74, 222, 128, 0.8)';
        case 'metrics': return 'rgba(96, 165, 250, 0.8)';
        case 'analytics': return 'rgba(168, 85, 247, 0.8)';
        case 'performance': return 'rgba(245, 158, 11, 0.8)';
        case 'revenue': return 'rgba(34, 197, 94, 0.8)';
        case 'growth': return 'rgba(139, 92, 246, 0.8)';
        default: return 'rgba(255, 255, 255, 0.8)';
      }
    };

    const getParticleColor = (type) => {
      switch(type) {
        case 'growth-chart': return 'rgba(74, 222, 128, 0.7)';
        case 'metrics': return 'rgba(96, 165, 250, 0.7)';
        case 'analytics': return 'rgba(168, 85, 247, 0.7)';
        case 'performance': return 'rgba(245, 158, 11, 0.7)';
        case 'revenue': return 'rgba(34, 197, 94, 0.7)';
        case 'growth': return 'rgba(139, 92, 246, 0.7)';
        default: return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
      }
    };

    // Drawing functions
    const drawEnhancedGrid = (ctx, canvas) => {
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.1)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawProminentTrendLines = (ctx, canvas, time) => {
      // Multiple trend lines at different heights
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
      ctx.lineWidth = 3;
      ctx.moveTo(-50, 200);
      for (let x = 0; x < canvas.width + 50; x += 15) {
        const y = 200 - Math.sin(x * 0.008 + time) * 40 - x * 0.02;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.25)';
      ctx.lineWidth = 2;
      ctx.moveTo(-30, 1200);
      for (let x = 0; x < canvas.width + 30; x += 12) {
        const y = 1200 + Math.cos(x * 0.01 + time * 1.2) * 80;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
      ctx.lineWidth = 2;
      ctx.moveTo(-20, 2500);
      for (let x = 0; x < canvas.width + 20; x += 10) {
        const y = 2500 + Math.sin(x * 0.015 + time * 0.8) * 60;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawInteractionZones = (ctx) => {
      interactionZonesRef.current.forEach(zone => {
        const zoneViewportY = zone.y - scrollYRef.current;
        
        // Only draw if zone is visible in viewport
        if (zoneViewportY > -zone.height && zoneViewportY < window.innerHeight) {
          ctx.save();
          
          if (zone.hover) {
            ctx.fillStyle = 'rgba(74, 222, 128, 0.2)';
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.8)';
            ctx.lineWidth = 3;
            ctx.shadowColor = 'rgba(74, 222, 128, 0.5)';
            ctx.shadowBlur = 20;
          } else {
            ctx.fillStyle = 'rgba(96, 165, 250, 0.1)';
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 0;
          }
          
          ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
          ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
          
          ctx.fillStyle = zone.hover ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            getZoneLabel(zone.type),
            zone.x + zone.width / 2,
            zone.y + zone.height / 2
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
        case 'revenue': return 'Revenue';
        case 'growth': return 'Growth Stats';
        default: return 'Interactive Zone';
      }
    };

    const drawRipples = (ctx) => {
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        ripple.radius += ripple.speed;
        ripple.life -= 0.015;
        
        if (ripple.radius > ripple.maxRadius || ripple.life <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = ripple.life * (1 - ripple.radius / ripple.maxRadius);
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
        explosion.rotation += explosion.rotationSpeed;
        
        if (explosion.life <= 0) {
          explosionsRef.current.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = explosion.life;
        ctx.translate(explosion.x, explosion.y);
        ctx.rotate(explosion.rotation);
        ctx.fillStyle = explosion.color;
        ctx.fillRect(-explosion.size/2, -explosion.size/2, explosion.size, explosion.size);
        ctx.restore();
      }
    };

    const drawSparkles = (ctx, time) => {
      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        const sparkle = sparklesRef.current[i];
        sparkle.life -= sparkle.decay;
        sparkle.phase += 0.1;
        
        if (sparkle.life <= 0) {
          sparklesRef.current.splice(i, 1);
          continue;
        }
        
        const scale = 1 + Math.sin(sparkle.phase) * 0.5;
        const alpha = sparkle.life * (0.5 + Math.sin(sparkle.phase) * 0.3);
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = sparkle.color;
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawProminentFinanceIndicators = (ctx, canvas, time) => {
      // Indicators at different scroll positions
      const indicators = [
        { text: '+24.8%', y: 150, color: 'rgba(74, 222, 128, 0.8)' },
        { text: '+18.3%', y: 400, color: 'rgba(96, 165, 250, 0.8)' },
        { text: '+32.1%', y: 1300, color: 'rgba(168, 85, 247, 0.8)' },
        { text: '+45.2%', y: 1600, color: 'rgba(245, 158, 11, 0.8)' },
        { text: '+28.7%', y: 2600, color: 'rgba(34, 197, 94, 0.8)' },
        { text: '+51.9%', y: 2900, color: 'rgba(139, 92, 246, 0.8)' }
      ];

      indicators.forEach((indicator, index) => {
        const x = (canvas.width / (indicators.length + 1)) * (index + 1);
        const waveY = indicator.y + Math.sin(time * 2 + index) * 30;
        
        ctx.save();
        ctx.globalAlpha = 0.7 + Math.sin(time * 3 + index) * 0.3;
        ctx.fillStyle = indicator.color;
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(indicator.text, x, waveY);
        ctx.restore();
      });

      // Bar charts at different positions
      const barCharts = [
        { y: 250, count: 6, color: 'rgba(74, 222, 128, 0.6)' },
        { y: 1400, count: 5, color: 'rgba(96, 165, 250, 0.6)' },
        { y: 2700, count: 4, color: 'rgba(168, 85, 247, 0.6)' }
      ];

      barCharts.forEach((chart, chartIndex) => {
        for (let i = 0; i < chart.count; i++) {
          const x = 100 + i * 120;
          const height = 50 + Math.sin(time + i + chartIndex) * 35;
          const isPositive = i % 4 !== 0;
          
          ctx.fillStyle = isPositive ? chart.color : 'rgba(248, 113, 113, 0.6)';
          ctx.fillRect(x, chart.y - height, 40, height);
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = '11px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${Math.round(height)}%`, x + 20, chart.y - height - 10);
        }
      });
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background that spans entire canvas
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.3, '#1e293b');
      gradient.addColorStop(0.7, '#334155');
      gradient.addColorStop(1, '#475569');
      
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
        particle.pulse += 0.05;
        const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;

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

        if (particle.type !== 'data' && particle.type !== 'burst') {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Boundary check for entire canvas
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        }

        if (particle.type === 'burst') {
          particle.life -= particle.decay;
          if (particle.life <= 0) {
            particlesRef.current.splice(index, 1);
            return;
          }
        }

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

      // Draw click effects (viewport-relative)
      drawRipples(ctx);
      drawExplosions(ctx);
      drawSparkles(ctx, time);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    
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
