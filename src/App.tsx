/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Heart, 
  Leaf, 
  ShieldCheck, 
  Zap, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Beaker,
  Menu,
  X,
  Instagram,
  Facebook,
} from 'lucide-react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

const BRAND_COLORS = {
  deepGreen: '#1f4d1b',
  midGreen: '#377532',
  brightGreen: '#97BF20',
  paleGreen: '#eef7e8',
  cream: '#f8faf6',
  ink: '#0d1f09',
  muted: '#6b7e65',
};

// ── Inline 3D Tea Box Mesh ──
function TeaBoxMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const frontTexture = useLoader(THREE.TextureLoader, '/ash-tea.png');

  useMemo(() => {
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.wrapS = THREE.ClampToEdgeWrapping;
    frontTexture.wrapT = THREE.ClampToEdgeWrapping;
    frontTexture.needsUpdate = true;
  }, [frontTexture]);

  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ color: '#377532', roughness: 0.4, metalness: 0.08 }), // right  (+X)
    new THREE.MeshStandardMaterial({ color: '#377532', roughness: 0.4, metalness: 0.08 }), // left   (-X)
    new THREE.MeshStandardMaterial({ color: '#c8c8be', roughness: 0.5, metalness: 0.05 }), // top    (+Y)
    new THREE.MeshStandardMaterial({ color: '#377532', roughness: 0.5, metalness: 0.05 }), // bottom (-Y)
    new THREE.MeshStandardMaterial({ map: frontTexture, roughness: 0.25, metalness: 0.05 }), // front (+Z) ← ash-tea.png
    new THREE.MeshStandardMaterial({ color: '#377532', roughness: 0.4, metalness: 0.08 }), // back   (-Z)
  ], [frontTexture]);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.004;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh ref={meshRef} castShadow receiveShadow material={materials}>
        <boxGeometry args={[2, 3, 1]} />
      </mesh>
    </Float>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity  = useTransform(scrollY, [0, 380], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.currentTarget);
    try {
      await fetch('https://formsubmit.co/ajax/nmachiwellnesstea@gmail.com', {
        method: 'POST',
        body: formData,
      });
      setFormStatus('success');
    } catch (error) {
      console.error('Form submission error', error);
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", background: BRAND_COLORS.cream, color: BRAND_COLORS.ink }}>

      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        ::selection { background: rgba(151,191,32,0.28); }

        /* Grain overlay */
        #grain {
          position: fixed; inset: 0; z-index: 9998; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px 200px; opacity: 0.35;
        }

        /* Glass card */
        .glass-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 2px 32px rgba(31,77,27,0.05), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        /* Animated gradient text */
        .grad-text {
          background: linear-gradient(120deg, #377532 0%, #97BF20 45%, #4d9e42 100%);
          background-size: 220% 220%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gspin 5s ease infinite;
        }
        @keyframes gspin { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        /* Primary CTA button */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: ${BRAND_COLORS.deepGreen}; color: white;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 16px; font-weight: 700; letter-spacing: -0.01em;
          padding: 17px 36px; border-radius: 999px; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent, rgba(151,191,32,0.22));
          opacity: 0; transition: opacity 0.3s;
        }
        .btn-primary:hover { transform: translateY(-2px) scale(1.025); box-shadow: 0 16px 48px rgba(31,77,27,0.3); }
        .btn-primary:hover::after { opacity: 1; }

        /* Pill badge */
        .pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: ${BRAND_COLORS.paleGreen}; color: ${BRAND_COLORS.midGreen};
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase;
          padding: 7px 16px; border-radius: 999px;
          border: 1px solid rgba(55,117,50,0.18);
        }

        /* Lift card */
        .lift-card { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease; }
        .lift-card:hover { transform: translateY(-8px); box-shadow: 0 28px 64px rgba(31,77,27,0.13); }

        /* Scrolling ticker */
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker { display:flex; gap:0; animation:ticker 30s linear infinite; width:max-content; }
        .ticker:hover { animation-play-state: paused; }

        /* Section label */
        .sec-label {
          font-family: 'DM Sans', sans-serif; display: block;
          font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: ${BRAND_COLORS.muted}; margin-bottom: 14px;
        }

        /* Large ghost number */
        .ghost-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 72px; font-weight: 800; letter-spacing: -0.06em;
          line-height: 1; color: ${BRAND_COLORS.brightGreen}; opacity: 0.15;
          position: absolute; top: 10px; right: 18px; user-select: none;
        }

        /* Benefit row */
        .benefit-row {
          display: flex; gap: 20px; align-items: flex-start;
          padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: padding-left 0.28s ease;
        }
        .benefit-row:hover { padding-left: 8px; }
        .benefit-row:last-child { border-bottom: none; }

        /* Form field */
        .field {
          width: 100%; padding: 15px 18px;
          background: white; border: 1.5px solid #d8ecd2;
          border-radius: 14px; font-size: 15px; color: ${BRAND_COLORS.ink};
          font-family: 'DM Sans', sans-serif; font-weight: 400; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field:focus { border-color: ${BRAND_COLORS.brightGreen}; box-shadow: 0 0 0 4px rgba(151,191,32,0.13); }

        /* Nav link */
        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: ${BRAND_COLORS.muted}; text-decoration: none; font-weight: 400;
          transition: color 0.2s;
        }
        .nav-link:hover { color: ${BRAND_COLORS.midGreen}; }

        @media (max-width: 768px) {
          .desk-only { display: none !important; }
          .mob-only  { display: flex !important; }
          .two-col   { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .swap-1    { order: 1 !important; }
          .swap-2    { order: 2 !important; }
        }
        @media (min-width: 769px) {
          .mob-only { display: none !important; }
        }
      `}</style>

      <div id="grain" />

      {/* ══════ NAV ══════ */}
      <motion.nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 68, padding: '0 44px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(248,250,246,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(55,117,50,0.1)' : '1px solid transparent',
          transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <img src="/logo.png" alt="NmaChi" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
</div>

        <div className="desk-only" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#about"      className="nav-link">About</a>
          <a href="#technology" className="nav-link">Technology</a>
          <a href="#benefits"   className="nav-link">Benefits</a>
          <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
            Join Waitlist
          </button>
        </div>

        <button className="mob-only" onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: BRAND_COLORS.ink, display: 'flex' }}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: BRAND_COLORS.cream, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
            {['about', 'technology', 'benefits'].map(l => (
              <a key={l} href={`#${l}`} onClick={() => setIsMenuOpen(false)}
                style={{ fontFamily: 'Bricolage Grotesque', fontSize: 40, fontWeight: 800, color: BRAND_COLORS.ink, textDecoration: 'none', letterSpacing: '-0.04em', textTransform: 'capitalize' }}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </a>
            ))}
            <button className="btn-primary" onClick={() => { setIsMenuOpen(false); document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Join Waitlist <ArrowRight size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ HERO ══════ */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 68, position: 'relative', overflow: 'hidden' }}>
        {/* BG elements */}
        <div style={{ position: 'absolute', top: '6%', right: '4%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(151,191,32,0.11) 0%, transparent 68%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '12%', left: '0%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(55,117,50,0.08) 0%, transparent 68%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(55,117,50,0.11) 1px, transparent 1px)', backgroundSize: '34px 34px', pointerEvents: 'none', WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 40%, transparent 100%)', maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 40%, transparent 100%)' }} />

        <motion.div style={{ y: heroParallax, opacity: heroOpacity, position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 880, padding: '0 24px', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <span className="pill"><Globe size={11} /> UK Innovation 🇬🇧</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.75 }}
            style={{ fontFamily: 'Bricolage Grotesque', fontSize: 'clamp(46px, 8vw, 96px)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.045em', color: BRAND_COLORS.ink, marginTop: 26, marginBottom: 8 }}
          >
            Revolutionizing Wellness,{' '}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
            className="grad-text"
            style={{ fontFamily: 'Bricolage Grotesque', fontSize: 'clamp(46px, 8vw, 96px)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.045em', marginBottom: 28, display: 'block' }}
          >
            One Cup at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
            style={{ fontFamily: 'DM Sans', fontSize: 18, color: BRAND_COLORS.muted, lineHeight: 1.72, maxWidth: 520, margin: '0 auto 44px', fontWeight: 300 }}
          >
            Advanced botanical extraction designed to support cardiovascular health. 
            Experience the future of natural wellness.
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <button className="btn-primary" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
              Join the Waitlist
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 60, flexWrap: 'wrap' }}
          >
            {[{ n: '98%', l: 'Extraction Rate' }, { n: '0', l: 'Synthetics' }, { n: '100%', l: 'Plant-Based' }].map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: '14px 28px', borderRadius: 16, textAlign: 'center', minWidth: 110 }}>
                <p style={{ fontFamily: 'Bricolage Grotesque', fontSize: 28, fontWeight: 800, color: BRAND_COLORS.midGreen, letterSpacing: '-0.05em', lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontFamily: 'DM Sans', fontSize: 11, color: BRAND_COLORS.muted, marginTop: 5, fontWeight: 400 }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════ TICKER ══════ */}
      <div style={{ background: BRAND_COLORS.deepGreen, padding: '13px 0', overflow: 'hidden', borderTop: '1px solid rgba(151,191,32,0.18)', borderBottom: '1px solid rgba(151,191,32,0.18)' }}>
        <div className="ticker">
          {[...Array(2)].map((_, rep) =>
            ['Oleophilic Mesh Technology','98% Extraction Rate','African Botanicals','UK Engineered','Cardiovascular Support','Lab Tested','Plant-Based Formula','100% Natural'].map((item, i) => (
              <span key={`${rep}-${i}`} style={{ fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.82)', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0 36px', whiteSpace: 'nowrap' }}>
                {item}&nbsp;&nbsp;<span style={{ color: BRAND_COLORS.brightGreen, opacity: 0.65 }}>✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══════ 3D PRODUCT ══════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div style={{ position: 'absolute', top: '50%', right: '-100px', transform: 'translateY(-50%)', width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(151,191,32,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', right: '-40px', transform: 'translateY(-50%)', width: 260, height: 260, borderRadius: '50%', border: '1px solid rgba(151,191,32,0.16)', pointerEvents: 'none' }} />

        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="order-2 md:order-1 swap-2"
          >
            <span className="sec-label">Proprietary Technology</span>
            <h2 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 'clamp(30px,4vw,54px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.07, color: BRAND_COLORS.ink, marginBottom: 20 }}>
              Engineered for <br />
              <span style={{ color: BRAND_COLORS.brightGreen }}>Maximum Extraction</span>
            </h2>
            <p style={{ fontFamily: 'DM Sans', fontSize: 16, color: BRAND_COLORS.muted, lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>
              Our proprietary oleophilic mesh technology ensures that every drop of essential oil is captured,
              delivering a potency far superior to standard tea bags.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
              {['Oleophilic mesh technology', 'Full essential oil preservation', 'Optimised surface area for infusion', 'Sustainable botanical sourcing'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircle2 size={17} color={BRAND_COLORS.brightGreen} style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: 'DM Sans', fontSize: 15, color: '#2e2e2e', fontWeight: 400 }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.75 }}
            className="order-1 md:order-2 relative swap-1"
          >
            <div style={{ position: 'absolute', inset: '5%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(151,191,32,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div className="w-full h-[420px] md:h-[620px] cursor-grab active:cursor-grabbing" style={{ userSelect: 'none' }}>
              <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
                <directionalLight position={[4, 6, 5]}   intensity={1.6} color="#fffef5" castShadow />
                <directionalLight position={[-4, 2, 3]}  intensity={0.6} color="#e8f5e9" />
                <directionalLight position={[0, -3, -6]} intensity={0.35} color="#97bf20" />
                <ambientLight intensity={0.4} color="#f5f5f0" />
                <PresentationControls
                  global
                  config={{ mass: 2, tension: 480 }}
                  snap={{ mass: 4, tension: 1400 }}
                  rotation={[0.08, 0.35, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 1.6, Math.PI / 1.6]}
                >
                  <Suspense fallback={null}>
                    <TeaBoxMesh />
                  </Suspense>
                </PresentationControls>
                <ContactShadows position={[0, -2.6, 0]} opacity={0.38} scale={10} blur={2.4} far={5} color="#2e4a1e" />
                <Environment preset="studio" />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      <section id="about" style={{ padding: '100px 6%', background: BRAND_COLORS.paleGreen, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'white', clipPath: 'polygon(0 0,100% 0,100% 0%,0 100%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="sec-label">Our Story</span>
            <h2 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, letterSpacing: '-0.04em', color: BRAND_COLORS.ink, lineHeight: 1.1 }}>The NmaChi Story</h2>
            <p style={{ fontFamily: 'DM Sans', fontSize: 16, color: BRAND_COLORS.muted, maxWidth: 500, margin: '16px auto 0', lineHeight: 1.7, fontWeight: 300 }}>
              Born in the UK and inspired by centuries of African botanical wisdom, 
              NmaChi Wellness Ltd is bridging the gap between traditional herbalism and modern science.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="three-col">
            {[
              { icon: <Globe size={26} color={BRAND_COLORS.midGreen} />, title: 'UK Innovation 🇬🇧', desc: 'Designed and engineered in the United Kingdom for global quality standards.' },
              { icon: <Leaf   size={26} color={BRAND_COLORS.midGreen} />, title: 'African Botanicals 🌿', desc: 'Sourcing the most potent, naturally occurring herbs from the heart of Africa.' },
              { icon: <Heart  size={26} color={BRAND_COLORS.midGreen} />, title: 'Cardio Support ❤️', desc: 'Specifically formulated to support a healthy heart and vascular system.' },
            ].map((f, i) => (
              <motion.div key={i} className="glass-card lift-card"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ borderRadius: 24, padding: '36px 30px', textAlign: 'center' }}
              >
                <div style={{ width: 56, height: 56, background: 'white', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 4px 16px rgba(55,117,50,0.1)' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 19, fontWeight: 700, color: BRAND_COLORS.ink, marginBottom: 10, letterSpacing: '-0.025em' }}>{f.title}</h3>
                <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: BRAND_COLORS.muted, lineHeight: 1.68, fontWeight: 300 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TECHNOLOGY ══════ */}
      <section id="technology" className="py-24 bg-white">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 6%' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="sec-label">The Science</span>
            <h2 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, letterSpacing: '-0.04em', color: BRAND_COLORS.ink, lineHeight: 1.1 }}>Why Our Tea is Different</h2>
            <div style={{ width: 52, height: 3, background: `linear-gradient(90deg, ${BRAND_COLORS.midGreen}, ${BRAND_COLORS.brightGreen})`, borderRadius: 999, margin: '20px auto 0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26 }} className="three-col">
            {[
              { icon: <Zap size={28} />, num: '01', title: 'Oleophilic Mesh', desc: 'Our specialised mesh attracts and holds essential oils, preventing them from being trapped in the bag fibres.' },
              { icon: <Beaker size={28} />, num: '02', title: 'Full Extraction', desc: 'Unlike standard paper bags, our technology allows for a 98% extraction rate of bioactive botanical compounds.' },
              { icon: <ShieldCheck size={28} />, num: '03', title: 'Superior Quality', desc: 'Every batch is tested for purity and potency, ensuring you get the maximum wellness benefit in every cup.' },
            ].map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                style={{ position: 'relative', background: BRAND_COLORS.paleGreen, borderRadius: 24, padding: '40px 30px', overflow: 'hidden', border: '1px solid rgba(55,117,50,0.1)' }}
              >
                <div className="ghost-num">{t.num}</div>
                <div style={{ width: 52, height: 52, background: 'white', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND_COLORS.midGreen, marginBottom: 20, boxShadow: '0 4px 12px rgba(55,117,50,0.1)' }}>
                  {t.icon}
                </div>
                <h3 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 20, fontWeight: 700, color: BRAND_COLORS.ink, marginBottom: 12, letterSpacing: '-0.025em' }}>{t.title}</h3>
                <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: BRAND_COLORS.muted, lineHeight: 1.72, fontWeight: 300 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ BENEFITS ══════ */}
      <section id="benefits" style={{ padding: '100px 6%', background: BRAND_COLORS.deepGreen, color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(151,191,32,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="two-col">
          <div>
            <span className="sec-label" style={{ color: 'rgba(255,255,255,0.35)' }}>Pure Benefits</span>
            <h2 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 'clamp(30px,4.5vw,58px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.04, marginBottom: 40 }}>
              Pure Benefits. <br />
              <span style={{ color: BRAND_COLORS.brightGreen }}>No Compromise.</span>
            </h2>
            <div>
              {[
                { icon: <Heart size={20} />, title: 'Cardiovascular Health', desc: 'Supports healthy blood flow and heart function.' },
                { icon: <Zap size={20} />, title: 'Rich in Essential Oils', desc: 'Maximum bioavailability of natural plant oils.' },
                { icon: <Leaf size={20} />, title: '100% Plant-Based', desc: 'No synthetic additives, just pure African botanicals.' },
                { icon: <CheckCircle2 size={20} />, title: 'Easy Daily Ritual', desc: 'Seamlessly fits into your morning or evening routine.' },
              ].map((b, i) => (
                <motion.div key={i} className="benefit-row"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                >
                  <div style={{ color: BRAND_COLORS.brightGreen, flexShrink: 0, marginTop: 3 }}>{b.icon}</div>
                  <div>
                    <h4 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 16, fontWeight: 700, marginBottom: 5, letterSpacing: '-0.015em' }}>{b.title}</h4>
                    <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontWeight: 300 }}>{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated teabag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 340, height: 340 }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 900, height: 350, background: 'rgba(151,191,32,0.14)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(151,191,32,0.28)', backdropFilter: 'blur(8px)' }}>
                  <img
                    src="/wtea.png"
                    alt="Wtea"
                    style={{ width: 600, height: 400, objectFit: 'contain' }}
                    className="animate-pulse"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SCIENCE & TRUST ══════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div className="glass-card"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ borderRadius: 32, padding: '56px 52px', maxWidth: 900, margin: '0 auto', border: '1px solid rgba(55,117,50,0.1)' }}
          >
            <div style={{ width: 64, height: 64, background: BRAND_COLORS.paleGreen, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: BRAND_COLORS.brightGreen }}>
              <Beaker size={30} />
            </div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 32, fontWeight: 800, color: BRAND_COLORS.ink, marginBottom: 16, letterSpacing: '-0.04em' }}>Backed by Science</h2>
            <p style={{ fontFamily: 'DM Sans', fontSize: 17, color: BRAND_COLORS.muted, lineHeight: 1.75, fontStyle: 'italic', maxWidth: 580, margin: '0 auto 40px', fontWeight: 300 }}>
              "Our formulation principles are rooted in the 2022 Oxford Nutrition Reviews, 
              focusing on the synergistic effects of botanical polyphenols on vascular health."
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
              {['Research-backed', 'Premium quality', 'Natural ingredients', 'Lab tested'].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldCheck size={15} color={BRAND_COLORS.brightGreen} />
                  <span style={{ fontFamily: 'DM Sans', fontSize: 12, fontWeight: 600, color: BRAND_COLORS.midGreen, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ WAITLIST ══════ */}
      <section id="waitlist" style={{ padding: '100px 6%', background: BRAND_COLORS.paleGreen, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'white', clipPath: 'polygon(0 0,100% 0,100% 100%,0 0)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(151,191,32,0.14) 0%, transparent 68%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="pill" style={{ marginBottom: 20, display: 'inline-flex' }}>Early Access</span>
            <h2 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 'clamp(30px,5vw,58px)', fontWeight: 800, letterSpacing: '-0.04em', color: BRAND_COLORS.ink, lineHeight: 1.05, marginBottom: 16 }}>
              Join the Revolution
            </h2>
            <p style={{ fontFamily: 'DM Sans', fontSize: 16, color: BRAND_COLORS.muted, fontWeight: 300, lineHeight: 1.7 }}>
              Be the first to experience NmaChi Wellness Tea. Limited early access spots available.
            </p>
          </div>

          <motion.div className="glass-card"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ borderRadius: 28, padding: '44px 40px' }}
          >
            {formStatus === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '28px 0' }}>
                <div style={{ width: 68, height: 68, background: BRAND_COLORS.paleGreen, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={32} color={BRAND_COLORS.midGreen} />
                </div>
                <h3 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 26, fontWeight: 800, color: BRAND_COLORS.ink, marginBottom: 8, letterSpacing: '-0.03em' }}>You're on the list!</h3>
                <p style={{ fontFamily: 'DM Sans', fontSize: 15, color: BRAND_COLORS.muted, fontWeight: 300 }}>Early access coming soon. Check your inbox for updates.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <input type="hidden" name="_subject" value="New Waitlist Signup - NmaChi Wellness Tea" />
                <input type="hidden" name="_captcha" value="false" />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="two-col">
                  <div>
                    <label style={{ fontFamily: 'DM Sans', display: 'block', fontSize: 10, fontWeight: 700, color: BRAND_COLORS.midGreen, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>Full Name</label>
                    <input required name="name" type="text" placeholder="John Doe" className="field" />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'DM Sans', display: 'block', fontSize: 10, fontWeight: 700, color: BRAND_COLORS.midGreen, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>Email Address</label>
                    <input required name="email" type="email" placeholder="john@example.com" className="field" />
                  </div>
                </div>

                <button type="submit" disabled={formStatus === 'submitting'} className="btn-primary"
                  style={{ justifyContent: 'center', borderRadius: 14, padding: '18px', opacity: formStatus === 'submitting' ? 0.7 : 1 }}>
                  {formStatus === 'submitting' ? 'Joining…' : 'Join Waitlist'}
                  <Mail size={18} />
                </button>

                <p style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 12, color: 'rgba(0,0,0,0.3)', fontWeight: 300 }}>
                  By joining, you agree to receive updates from NmaChi Wellness Tea. We respect your privacy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer style={{ background: BRAND_COLORS.ink, padding: '64px 6%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 48 }}>
            <div>
             <div style={{ marginBottom: 14 }}>
  <img src="/logo white.png" alt="NmaChi" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
</div>
              <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.32)', maxWidth: 240, lineHeight: 1.65, fontWeight: 300 }}>
                NmaChi Wellness Ltd.<br />Revolutionizing cardiovascular wellness through botanical innovation.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
 <div style={{ display: 'flex', gap: 10 }}>
  {[
    { icon: <Instagram size={16} />, href: 'https://www.instagram.com/nmachiorganicslimited?igsh=MTB4ZXltZzNvbGZ2Yg==' },
    { icon: <Facebook size={16} />, href: 'https://www.facebook.com/share/1B3x5K4r4C/' },
  ].map((item, i) => (
    <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
      style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'all 0.2s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(151,191,32,0.15)'; el.style.color = BRAND_COLORS.brightGreen; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.06)'; el.style.color = 'rgba(255,255,255,0.4)'; }}
    >{item.icon}</a>
  ))}
</div>
              <a href="mailto:nmachiwellnesstea@gmail.com" style={{ fontFamily: 'DM Sans', fontSize: 13, color: BRAND_COLORS.brightGreen, textDecoration: 'none' }}>
                nmachiwellnesstea@gmail.com
              </a>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>© 2026 NmaChi Wellness Ltd. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontWeight: 300 }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}