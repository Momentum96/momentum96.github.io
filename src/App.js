import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // ===== 1. Lenis Smooth Scroll 설정 =====
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;

    let lastThreeApp = null;

    // Lenis 스크롤 이벤트
    lenis.on('scroll', (e) => {
      if (lastThreeApp && lastThreeApp.group) {
        // 패럴랙스 효과는 선택사항 (현재 비활성화)
      }
    });

    // ===== 2. Three.js 3D 배경 설정 =====
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3D 객체 그룹
    const group = new THREE.Group();
    scene.add(group);

    // Icosahedron 메시 (반투명)
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      roughness: 0.3,
      metalness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    // Wireframe (악센트 컬러)
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xd946ef,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    group.add(wireframe);

    // 조명
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd946ef, 1.5, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x4a90e2, 1.0, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // 마우스 이동
    let mouse = new THREE.Vector2();
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 윈도우 리사이즈
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onWindowResize);

    lastThreeApp = { scene, camera, renderer, group, mouse, mesh, wireframe };

    // ===== 3. 통합 애니메이션 루프 =====
    const clock = new THREE.Clock();

    const animate = (time) => {
      lenis.raf(time);

      const elapsedTime = clock.getElapsedTime();

      mesh.rotation.x = elapsedTime * 0.1;
      mesh.rotation.y = elapsedTime * 0.15;
      wireframe.rotation.x = elapsedTime * 0.1;
      wireframe.rotation.y = elapsedTime * 0.15;

      group.rotation.y += (mouse.x * 0.3 - group.rotation.y) * 0.02;
      group.rotation.x += (-mouse.y * 0.3 - group.rotation.x) * 0.02;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      lenis.destroy();
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="App bg-brand-dark text-white">
      {/* 3D 배경 캔버스 */}
      <canvas id="bg-canvas" ref={canvasRef}></canvas>

      {/* 스크롤 콘텐츠 */}
      <div className="scroll-content">
        {/* 네비게이션 */}
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
            >
              aivil<span className="accent-color">lain</span>
            </button>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-white transition-colors">
                About
              </a>
              <a href="#projects" className="text-gray-700 hover:text-white transition-colors">
                Creations
              </a>
              <a href="#contact" className="text-gray-700 hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <button className="md:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>

        {/* 히어로 섹션 */}
        <header className="h-screen w-full flex items-center justify-center relative text-center px-6">
          <div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4">
              CODE. <span className="accent-color">CREATE.</span>
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter">
              CONQUER.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mt-6">
              Welcome to the nexus of artificial intelligence and digital art.
              I am <span className="text-white font-bold">aivillain</span>, and I build worlds.
            </p>
          </div>
          {/* 스크롤 다운 인디케이터 */}
          <div className="scroll-down absolute bottom-20 left-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-gray-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="bg-brand-light-dark py-20 lg:py-32">
          {/* About 섹션 */}
          <section id="about" className="container mx-auto max-w-6xl px-6 py-20 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  The Mind Behind the <span className="accent-color">Machine</span>.
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                  They call it 'artificial' intelligence. I call it an extension of will.
                  As 'aivillain', I don't just write prompts or train models. I sculpt digital consciousness,
                  weaving intricate algorithms into tangible, awe-inspiring realities.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed mb-6">
                  My work lives at the intersection of chaos and order, logic and art.
                  This isn't just a portfolio; it's a manifesto.
                </p>
                <a
                  href="#projects"
                  className="inline-block accent-bg text-black font-bold py-3 px-8 rounded-lg text-lg hover:opacity-80 transition-all"
                >
                  See My Creations
                </a>
              </div>
              <div className="w-full h-80 rounded-xl bg-brand-dark border border-gray-800 flex items-center justify-center">
                <p className="text-gray-400 text-lg">[Your AI Art Here]</p>
              </div>
            </div>
          </section>

          {/* Projects 섹션 */}
          <section id="projects" className="container mx-auto max-w-6xl px-6 py-20 lg:py-32">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-center mb-16">
              Digital <span className="accent-color">Dominions</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 프로젝트 카드 1 */}
              <div className="project-card bg-brand-dark p-6 rounded-xl border border-gray-800">
                <div className="w-full h-52 bg-gray-900 rounded-lg mb-5 overflow-hidden">
                  <img
                    src="https://placehold.co/600x400/d946ef/black?text=Project+NEBULA"
                    alt="Project Nebula"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Project: NEBULA</h3>
                <p className="text-gray-400 mb-4">
                  A self-evolving generative art system that paints cosmic landscapes based on real-time star data.
                </p>
                <span className="text-sm font-medium accent-color">Generative Art / Real-time Data</span>
              </div>

              {/* 프로젝트 카드 2 */}
              <div className="project-card bg-brand-dark p-6 rounded-xl border border-gray-800">
                <div className="w-full h-52 bg-gray-900 rounded-lg mb-5 overflow-hidden">
                  <img
                    src="https://placehold.co/600x400/d946ef/black?text=Codex+ECHO"
                    alt="Codex ECHO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Codex: ECHO</h3>
                <p className="text-gray-400 mb-4">
                  A neural network trained on ancient texts to generate new, hauntingly familiar mythology.
                </p>
                <span className="text-sm font-medium accent-color">Natural Language / LLM</span>
              </div>

              {/* 프로젝트 카드 3 */}
              <div className="project-card bg-brand-dark p-6 rounded-xl border border-gray-800">
                <div className="w-full h-52 bg-gray-900 rounded-lg mb-5 overflow-hidden">
                  <img
                    src="https://placehold.co/600x400/d946ef/black?text=Project+CHIMERA"
                    alt="Project CHIMERA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Project: CHIMERA</h3>
                <p className="text-gray-400 mb-4">
                  An experimental 3D modeling AI that fuses impossible geometries into stable structures.
                </p>
                <span className="text-sm font-medium accent-color">3D Modeling / AI</span>
              </div>
            </div>
          </section>

          {/* Contact 섹션 */}
          <section id="contact" className="container mx-auto max-w-3xl text-center px-6 py-20 lg:py-32">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Initiate <span className="accent-color">Contact</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
              Have a concept that defies convention? An idea deemed too ambitious?
              Reach out. Let's conspire.
            </p>
            <a
              href="mailto:contact@aivillain.com"
              className="inline-block accent-bg text-black font-bold py-3 px-10 rounded-lg text-lg hover:opacity-80 transition-all"
            >
              Send Signal
            </a>
          </section>
        </main>

        {/* 푸터 */}
        <footer className="bg-brand-dark py-12">
          <div className="container mx-auto max-w-6xl px-6 text-center text-gray-400">
            <p>&copy; 2025 aivillain. All realities reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
