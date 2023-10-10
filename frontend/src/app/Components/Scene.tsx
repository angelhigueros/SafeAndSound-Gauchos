"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const Scene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let mouseX = 0, mouseY = 0;
  let windowHalfX = 0, windowHalfY = 0;

  if (typeof window !== 'undefined') {
    // These calculations require access to window
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
  }

  function onPointerMove(event: any) {
    if (event.isPrimary === false) return;
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      document.body.addEventListener("pointermove", onPointerMove);

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

      // The rest of your code remains the same...

      const animate = () => {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.00005;

        if (typeof window !== 'undefined') {
          // These calculations require access to window
          camera.position.x += (mouseX - camera.position.x) * 0.05;
          camera.position.y += (-mouseY - camera.position.y) * 0.05;
        }

        camera.lookAt(scene.position);

        const h = (360 * (1.0 + time) % 360) / 360;

        renderer.render(scene, camera);
      };

      animate();
    }
  }, []);

  return <canvas className="flex min-h-screen" ref={canvasRef} />;
};

export default Scene;
