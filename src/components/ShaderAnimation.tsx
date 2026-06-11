import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function CssFallback() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: "#000" }}>
      <style>{`
        @keyframes ring-pulse {
          0%   { transform: scale(0.4); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.4);
          animation: ring-pulse 3s ease-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
      {Array.from({ length: 18 }).map((_, i) => {
        const size = 80 + i * 40;
        const delay = (i * 0.22).toFixed(2);
        const channel = i % 3;
        const color = channel === 0 ? "rgba(255,80,80,0.7)"
                    : channel === 1 ? "rgba(80,255,180,0.7)"
                    : "rgba(80,140,255,0.7)";
        return (
          <div
            key={i}
            className="ring"
            style={{
              width: size,
              height: size,
              borderColor: color,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              animationDelay: `${delay}s`,
              animationDuration: `${2.4 + (i % 4) * 0.3}s`,
              top: "50%",
              left: "50%",
            }}
          />
        );
      })}
    </div>
  );
}

function WebGLShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    uniforms: { time: { value: number }; resolution: { value: THREE.Vector2 } };
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const vertexShader = `void main() { gl_Position = vec4(position, 1.0); }`;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            color[j] += lineWidth * float(i * i) / abs(
              fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0
              - length(uv)
              + mod(uv.x + uv.y, 0.2)
            );
          }
        }
        gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };
    onResize();
    window.addEventListener("resize", onResize, false);

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
      if (sceneRef.current) sceneRef.current.animationId = animationId;
    };

    sceneRef.current = { renderer, uniforms, animationId: 0 };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ background: "#000", overflow: "hidden" }} />
  );
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function ShaderAnimation() {
  const [webgl] = useState(() => isWebGLAvailable());
  return webgl ? <WebGLShader /> : <CssFallback />;
}
