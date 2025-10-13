import React, { useEffect, useRef } from 'react';
import '../styles/components.css';

const Background = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
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
    
    // Scroll handling for parallax effects
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    // Create finance-themed particles
    const createParticles = () => {
      const particles = [];
      const particleCount = 150;
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random();
        let particleConfig;
        
        if (type < 0.4) {
          particleConfig = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 2,
            speedX: 0,
            speedY: 0,
            color: `rgba(74, 222, 128, ${Math.random() * 0.5 + 0.3})`,
            type: 'data',
            pulse: Math.random() * Math.PI * 2,
            scrollSpeed: 0.3
          };
        } else if (type < 0.7) {
          particleConfig = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            color: `rgba(96, 165, 250, ${Math.random() * 0.4 + 0.2})`,
            type: 'indicator',
            pulse: Math.random() * Math.PI * 2,
            scrollSpeed: 0.5
          };
        } else {
          particleConfig = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            color: `rgba(248, 113, 113, ${Math.random() * 0.4 + 0.2})`,
            type: 'currency',
            symbol: ['$', '€', '£', '¥', '₿'][Math.floor(Math.random() * 5)],
            pulse: Math.random() * Math.PI * 2,
            scrollSpeed: 0.7
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
    };

    const handleMouseClick = (event) => {
      createRipple(event.clientX, event.clientY, 'background');
      createExplosion(event.clientX, event.clientY, 'background');
      createParticleBurst(event.clientX, event.clientY);
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
    };

    // Ripple effect for clicks
    const createRipple = (x, y, type) => {
      ripplesRef.current.push({
        x, y,
        radius: 0,
        maxRadius: 120,
        color: 'rgba(255, 255, 255, 0.3)',
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
          color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`,
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
          x: x,
          y: y,
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

    // Drawing functions
    const drawEnhancedGrid = (ctx, canvas) => {
      const scrollY = scrollYRef.current;
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.1)';
      ctx.lineWidth = 1;
      
      // Apply parallax to grid
      const gridOffsetY = scrollY * 0.1;
      
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, -gridOffsetY);
        ctx.lineTo(x, canvas.height - gridOffsetY);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y - gridOffsetY);
        ctx.lineTo(canvas.width, y - gridOffsetY);
        ctx.stroke();
      }
    };

    const drawProminentTrendLines = (ctx, canvas, time) => {
      const scrollY = scrollYRef.current;
      const viewportHeight = canvas.height;
      
      // Multiple trend lines spread across the ENTIRE scrollable area
      const trendLines = [
        // Hero Section
        { baseY: 100, color: 'rgba(74, 222, 128, 0.3)', speed: 0.2, amplitude: 30 },
        { baseY: viewportHeight * 0.8, color: 'rgba(96, 165, 250, 0.25)', speed: 0.4, amplitude: 50 },
        
        // About Section
        { baseY: viewportHeight * 1.5, color: 'rgba(168, 85, 247, 0.25)', speed: 0.3, amplitude: 40 },
        { baseY: viewportHeight * 2.2, color: 'rgba(245, 158, 11, 0.25)', speed: 0.5, amplitude: 60 },
        
        // Experience Section
        { baseY: viewportHeight * 2.8, color: 'rgba(34, 197, 94, 0.2)', speed: 0.6, amplitude: 45 },
        { baseY: viewportHeight * 3.5, color: 'rgba(139, 92, 246, 0.2)', speed: 0.4, amplitude: 55 },
        
        // Skills Section
        { baseY: viewportHeight * 4.2, color: 'rgba(239, 68, 68, 0.2)', speed: 0.3, amplitude: 35 },
        { baseY: viewportHeight * 4.8, color: 'rgba(14, 165, 233, 0.2)', speed: 0.5, amplitude: 48 },
        
        // Voluntary Activities Section
        { baseY: viewportHeight * 5.5, color: 'rgba(236, 72, 153, 0.2)', speed: 0.4, amplitude: 42 },
        { baseY: viewportHeight * 6.2, color: 'rgba(20, 184, 166, 0.2)', speed: 0.6, amplitude: 38 },
        
        // Contact Section
        { baseY: viewportHeight * 6.8, color: 'rgba(249, 115, 22, 0.2)', speed: 0.3, amplitude: 52 },
        { baseY: viewportHeight * 7.5, color: 'rgba(139, 92, 246, 0.2)', speed: 0.5, amplitude: 45 }
      ];

      trendLines.forEach((line, index) => {
        const parallaxY = line.baseY - (scrollY * line.speed);
        
        // Only draw if line is in or near viewport
        if (parallaxY > -200 && parallaxY < viewportHeight + 200) {
          ctx.beginPath();
          ctx.strokeStyle = line.color;
          ctx.lineWidth = index % 2 === 0 ? 3 : 2;
          ctx.moveTo(-50, parallaxY);
          
          for (let x = 0; x < canvas.width + 50; x += 15) {
            const y = parallaxY + Math.sin(x * 0.01 + time * (0.5 + index * 0.2)) * line.amplitude;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      });
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
      const scrollY = scrollYRef.current;
      const viewportHeight = canvas.height;
      
      // Indicators spread across ALL sections
      const indicators = [
        // Hero Section
        { text: '+24.8%', baseY: 80, color: 'rgba(74, 222, 128, 0.8)', speed: 0.2 },
        { text: '+18.3%', baseY: 350, color: 'rgba(96, 165, 250, 0.8)', speed: 0.4 },
        
        // About Section
        { text: '+32.1%', baseY: viewportHeight * 1.3, color: 'rgba(168, 85, 247, 0.8)', speed: 0.5 },
        { text: '+45.2%', baseY: viewportHeight * 1.8, color: 'rgba(245, 158, 11, 0.8)', speed: 0.6 },
        
        // Experience Section
        { text: '+28.7%', baseY: viewportHeight * 2.5, color: 'rgba(34, 197, 94, 0.8)', speed: 0.3 },
        { text: '+51.9%', baseY: viewportHeight * 3.1, color: 'rgba(139, 92, 246, 0.8)', speed: 0.7 },
        
        // Skills Section
        { text: '+36.4%', baseY: viewportHeight * 3.8, color: 'rgba(239, 68, 68, 0.8)', speed: 0.4 },
        { text: '+42.6%', baseY: viewportHeight * 4.4, color: 'rgba(14, 165, 233, 0.8)', speed: 0.5 },
        
        // Voluntary Activities Section
        { text: '+29.8%', baseY: viewportHeight * 5.2, color: 'rgba(236, 72, 153, 0.8)', speed: 0.6 },
        { text: '+47.3%', baseY: viewportHeight * 5.8, color: 'rgba(20, 184, 166, 0.8)', speed: 0.3 },
        
        // Contact Section
        { text: '+33.5%', baseY: viewportHeight * 6.5, color: 'rgba(249, 115, 22, 0.8)', speed: 0.4 },
        { text: '+55.1%', baseY: viewportHeight * 7.2, color: 'rgba(59, 130, 246, 0.8)', speed: 0.5 }
      ];

      indicators.forEach((indicator, index) => {
        // Apply parallax effect based on scroll
        const parallaxY = indicator.baseY - (scrollY * indicator.speed);
        const waveY = parallaxY + Math.sin(time * 2 + index) * 25;
        
        // Only draw if element is in or near viewport
        if (waveY > -100 && waveY < viewportHeight + 100) {
          const x = (canvas.width / (indicators.length + 1)) * (index + 1);
          
          ctx.save();
          ctx.globalAlpha = 0.7 + Math.sin(time * 3 + index) * 0.3;
          ctx.fillStyle = indicator.color;
          ctx.font = 'bold 18px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(indicator.text, x, waveY);
          ctx.restore();
        }
      });

      // Bar charts spread across ALL sections
      const barCharts = [
        // Hero Section
        { baseY: 200, count: 5, color: 'rgba(74, 222, 128, 0.6)', speed: 0.3 },
        { baseY: viewportHeight * 0.6, count: 4, color: 'rgba(96, 165, 250, 0.6)', speed: 0.5 },
        
        // About Section
        { baseY: viewportHeight * 1.4, count: 6, color: 'rgba(168, 85, 247, 0.6)', speed: 0.4 },
        { baseY: viewportHeight * 2.0, count: 5, color: 'rgba(245, 158, 11, 0.6)', speed: 0.6 },
        
        // Experience Section
        { baseY: viewportHeight * 2.7, count: 4, color: 'rgba(34, 197, 94, 0.6)', speed: 0.4 },
        { baseY: viewportHeight * 3.3, count: 6, color: 'rgba(139, 92, 246, 0.6)', speed: 0.5 },
        
        // Skills Section
        { baseY: viewportHeight * 4.0, count: 5, color: 'rgba(239, 68, 68, 0.6)', speed: 0.3 },
        { baseY: viewportHeight * 4.6, count: 4, color: 'rgba(14, 165, 233, 0.6)', speed: 0.6 },
        
        // Voluntary Activities Section
        { baseY: viewportHeight * 5.4, count: 6, color: 'rgba(236, 72, 153, 0.6)', speed: 0.4 },
        { baseY: viewportHeight * 6.0, count: 5, color: 'rgba(20, 184, 166, 0.6)', speed: 0.5 },
        
        // Contact Section
        { baseY: viewportHeight * 6.7, count: 4, color: 'rgba(249, 115, 22, 0.6)', speed: 0.3 },
        { baseY: viewportHeight * 7.4, count: 6, color: 'rgba(59, 130, 246, 0.6)', speed: 0.4 }
      ];

      barCharts.forEach((chart, chartIndex) => {
        const parallaxY = chart.baseY - (scrollY * chart.speed);
        
        // Only draw if chart is in or near viewport
        if (parallaxY > -200 && parallaxY < viewportHeight + 200) {
          const startX = 50 + (chartIndex % 2) * (canvas.width / 2);
          const barWidth = 25;
          const barSpacing = 70;
          
          for (let i = 0; i < chart.count; i++) {
            const x = startX + i * barSpacing;
            const height = 35 + Math.sin(time + i + chartIndex) * 20;
            const isPositive = Math.sin(time * 0.5 + i + chartIndex) > 0;
            
            ctx.fillStyle = isPositive ? chart.color : 'rgba(248, 113, 113, 0.6)';
            ctx.fillRect(x, parallaxY - height, barWidth, height);
            
            // Only show percentage text for larger bars to avoid clutter
            if (height > 40) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
              ctx.font = '9px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(`${Math.round(height)}%`, x + barWidth/2, parallaxY - height - 6);
            }
          }
        }
      });

      // Additional financial elements - pie chart indicators spread across ALL sections
      const pieCharts = [
        // About Section
        { baseY: viewportHeight * 1.1, speed: 0.4, size: 35 },
        { baseY: viewportHeight * 1.7, speed: 0.6, size: 30 },
        
        // Experience Section
        { baseY: viewportHeight * 2.4, speed: 0.3, size: 40 },
        { baseY: viewportHeight * 3.0, speed: 0.5, size: 32 },
        
        // Skills Section
        { baseY: viewportHeight * 3.7, speed: 0.4, size: 38 },
        { baseY: viewportHeight * 4.3, speed: 0.6, size: 34 },
        
        // Voluntary Activities Section
        { baseY: viewportHeight * 5.1, speed: 0.3, size: 36 },
        { baseY: viewportHeight * 5.7, speed: 0.5, size: 39 },
        
        // Contact Section
        { baseY: viewportHeight * 6.4, speed: 0.4, size: 33 },
        { baseY: viewportHeight * 7.1, speed: 0.6, size: 37 }
      ];

      pieCharts.forEach((pie, index) => {
        const parallaxY = pie.baseY - (scrollY * pie.speed);
        
        if (parallaxY > -100 && parallaxY < viewportHeight + 100) {
          const x = canvas.width * 0.8 + Math.sin(time + index) * 40;
          
          ctx.save();
          ctx.globalAlpha = 0.5;
          
          // Draw pie chart segments
          const segments = 4;
          for (let i = 0; i < segments; i++) {
            const startAngle = (i / segments) * Math.PI * 2;
            const endAngle = ((i + 1) / segments) * Math.PI * 2;
            const segmentColors = ['rgba(74, 222, 128, 0.6)', 'rgba(96, 165, 250, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(245, 158, 11, 0.6)'];
            
            ctx.beginPath();
            ctx.moveTo(x, parallaxY);
            ctx.arc(x, parallaxY, pie.size, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = segmentColors[i];
            ctx.fill();
          }
          
          ctx.restore();
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

      // Draw elements with parallax
      drawEnhancedGrid(ctx, canvas);
      drawProminentTrendLines(ctx, canvas, time);
      drawProminentFinanceIndicators(ctx, canvas, time);

      // Update and draw particles with parallax
      particlesRef.current.forEach((particle, index) => {
        particle.pulse += 0.05;
        const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;

        // Apply parallax to particles
        const particleY = particle.y - (scrollYRef.current * (particle.scrollSpeed || 0.5));

        if (particle.type === 'indicator' && mouseRef.current.isMoving) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particleY - mouseRef.current.y;
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

        // Only draw particles that are in or near viewport
        if (particleY > -100 && particleY < canvas.height + 100) {
          ctx.save();
          if (particle.type === 'burst') {
            ctx.globalAlpha = particle.life;
          }
          
          if (particle.type === 'currency') {
            ctx.font = `${particle.size * 4 * pulseScale}px Arial`;
            ctx.fillStyle = particle.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(particle.symbol, particle.x, particleY);
          } else {
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 10 * pulseScale;
            ctx.fillStyle = particle.color;
            
            if (particle.type === 'data' || particle.type === 'burst') {
              ctx.beginPath();
              ctx.arc(particle.x, particleY, particle.size * pulseScale, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillRect(
                particle.x - particle.size * pulseScale / 2,
                particleY - particle.size * pulseScale / 2,
                particle.size * pulseScale,
                particle.size * pulseScale
              );
            }
          }
          
          ctx.restore();
        }
      });

      drawRipples(ctx);
      drawExplosions(ctx);
      
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
      />
      <div className="background-overlay"></div>
    </div>
  );
};

export default Background;
