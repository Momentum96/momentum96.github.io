import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Three.js Scene Setup
    const container = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xff0080,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create torus
    const torusGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    camera.position.z = 2;

    // Mouse move effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      particlesMesh.rotation.y += 0.001;

      camera.position.x = mouseX * 0.1;
      camera.position.y = mouseY * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Scroll handler
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    e.target.reset();
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav>
        <div className="logo">AIVILLAIN</div>
        <ul className="nav-links">
          <li><a onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a onClick={() => scrollToSection('about')}>About</a></li>
          <li><a onClick={() => scrollToSection('services')}>Services</a></li>
          <li><a onClick={() => scrollToSection('portfolio')}>Portfolio</a></li>
          <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div ref={canvasRef} id="canvas-container"></div>
        <div className="floating-shape shape-1" style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
        <div className="floating-shape shape-2" style={{ transform: `translateY(${scrollY * 1}px)` }}></div>
        <div className="floating-shape shape-3" style={{ transform: `translateY(${scrollY * 1.5}px)` }}></div>
        <div className="hero-content">
          <h1>AIVILLAIN</h1>
          <p>CREATIVE AI STUDIO</p>
          <button className="cta-button" onClick={() => scrollToSection('portfolio')}>
            Explore My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="about-image"></div>
        <div className="about-content">
          <h2>About AIVillain</h2>
          <p>
            We are a cutting-edge creative AI studio pushing the boundaries of
            digital artistry and innovation.
          </p>
          <p>
            Specializing in AI-generated content, 3D visualizations, and
            immersive digital experiences, we transform ideas into stunning
            realities.
          </p>
          <p>
            Our mission is to redefine creativity through the power of
            artificial intelligence.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services">
        <h2 className="section-title">Services</h2>
        <div className="services-grid">
          {[
            { icon: '🎨', title: 'AI Art Generation', desc: 'Creating breathtaking visual content using state-of-the-art AI models and creative direction.' },
            { icon: '🎬', title: '3D Animation', desc: 'Stunning 3D animations and motion graphics that bring your vision to life.' },
            { icon: '💻', title: 'Web Experiences', desc: 'Interactive web experiences with cutting-edge technologies and smooth animations.' },
            { icon: '🎭', title: 'Brand Identity', desc: 'Complete brand identity solutions powered by AI creativity and human expertise.' },
            { icon: '🚀', title: 'Digital Strategy', desc: 'Strategic consulting to help your brand thrive in the digital landscape.' },
            { icon: '⚡', title: 'Innovation Labs', desc: 'Experimental projects exploring the future of AI and creative technology.' }
          ].map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section">
        <h2 className="section-title">Portfolio</h2>
        <div className="portfolio-grid">
          {[
            { title: 'Neural Dreams', subtitle: 'AI Art Collection' },
            { title: 'Cyber Visions', subtitle: '3D Animation Series' },
            { title: 'Digital Odyssey', subtitle: 'Interactive Experience' },
            { title: 'Future Brands', subtitle: 'Brand Identity Suite' }
          ].map((item, index) => (
            <div key={index} className="portfolio-item">
              <div className="portfolio-content">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <h2>Let's Create Together</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit" className="cta-button">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <div className="social-links">
          <a href="#">𝕏</a>
          <a href="#">in</a>
          <a href="#">IG</a>
          <a href="#">YT</a>
        </div>
        <p>&copy; 2025 AIVillain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;