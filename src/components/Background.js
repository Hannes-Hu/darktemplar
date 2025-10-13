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
    
    // Set canvas size to be the full scrollable height
    const resizeCanvas = () => {
      const totalHeight = document.documentElement.scrollHeight;
      canvas.width = window.innerWidth;
      canvas.height = totalHeight;
      createInteractionZones();
    };
    
    // Scroll handling
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    // Create interactive zones at different scroll positions
    const createInteractionZones = () => {
      const totalHeight = canvas.height;
      interactionZonesRef.current = [
        // Top section
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
        // Middle section
        {
          x: canvas.width * 0.1,
          y: totalHeight * 0.3,
          width: 220,
          height: 100,
          type: 'analytics',
          hover: false
        },
        {
          x: canvas.width * 0.6,
          y: totalHeight * 0.4,
          width: 200,
          height: 120,
          type: 'performance',
          hover: false
        },
        // Bottom section
        {
          x: canvas.width * 0.3,
          y: totalHeight * 0.7,
          width: 180,
          height: 100,
          type: 'revenue',
          hover: false
        },
        {
          x: canvas.width * 0.7,
          y: totalHeight * 0.8,
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
      const particleCount = 200;
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random();
        let particleConfig;
        
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
      return particles;
    };

    // Mouse interactions
    const handleMouseMove = (event) => {
      const absoluteY = event.clientY + scrollYRef.current;
      
      mouseRef.current = {
        x: event.clientX,
        y: absoluteY,
        viewportY: event.clientY,
        isMoving: true
      };

      interactionZonesRef.current.forEach(zone => {
        const zoneViewportY = zone.y - scrollYRef.current;
        const isHovering = 
          event.clientX > zone.x && 
          event.clientX < zone.x + zone.width &&
          event.clientY > zoneViewportY && 
          event.clientY < zoneViewportY + zone.height;
        
        zone.hover = isHovering;
      });
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
      interactionZonesRef.current.forEach(zone => {
        zone.hover = false;
      });
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
      ctx.moveTo(-30, canvas.height * 0.4);
      for (let x = 0; x < canvas.width + 30; x += 12) {
        const y = canvas.height * 0.4 + Math.cos(x * 0.01 + time * 1.2) * 80;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
      ctx.lineWidth = 2;
      ctx.moveTo(-20, canvas.height * 0.7);
      for (let x = 0; x < canvas.width + 20; x += 10) {
        const y = canvas.height * 0.7 + Math.sin(x * 0.015 + time * 0.8) * 60;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawInteractionZones = (ctx) => {
      interactionZonesRef.current.forEach(zone => {
        const zoneViewportY = zone.y - scrollYRef.current;
        
        if (zoneViewportY > -zone.height && zoneViewportY < window.innerHeight) {
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
          
          ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
          ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
          
          ctx.fillStyle = zone.hover ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
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

    const drawProminentFinanceIndicators = (ctx, canvas, time) => {
      // Indicators at different scroll positions
      const indicators = [
        { text: '+24.8%', y: 150, color: 'rgba(74, 222, 128, 0.8)' },
        { text: '+18.3%', y: 400, color: 'rgba(96, 165, 250, 0.8)' },
        { text: '+32.1%', y: canvas.height * 0.3, color: 'rgba(168, 85, 247, 0.8)' },
        { text: '+45.2%', y: canvas.height * 0.5, color: 'rgba(245, 158, 11, 0.8)' },
        { text: '+28.7%', y: canvas.height * 0.7, color: 'rgba(34, 197, 94, 0.8)' },
        { text: '+51.9%', y: canvas.height * 0.9, color: 'rgba(139, 92, 246, 0.8)' }
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
        { y: canvas.height * 0.35, count: 5, color: 'rgba(96, 165, 250, 0.6)' },
        { y: canvas.height * 0.6, count: 4, color: 'rgba(168, 85, 247, 0.6)' },
        { y: canvas.height * 0.85, count: 6, color: 'rgba(245, 158, 11, 0.6)' }
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
      
      // Create gradient background
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

        if (particle.type !== 'data') {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        }

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
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    particlesRef.current = createParticles();
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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
