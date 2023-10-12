"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { animated, SpringValue, useSpring } from "react-spring";

const Globe = ({
  scaleProps,
  stop,
}: {
  scaleProps: {
    transform: SpringValue<string>;
  };
  stop: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    let phi = 0;
    let width = 0;
    const onResize = () => currentCanvas && (width = currentCanvas.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(currentCanvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1,
      mapSamples: 32000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [],
      onRender: (state) => {
        if (stop) return;
        if (!pointerInteracting.current) {
          phi += 0.002;
        }
        state.phi = phi + r.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    setTimeout(() => (currentCanvas.style.opacity = "0.6"));
    return () => globe.destroy();
  }, [r]);

  return (
    <animated.div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
        ...scaleProps,
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          if (!canvasRef.current) return;
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          if (!canvasRef.current) return;
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          if (!canvasRef.current) return;
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - (pointerInteracting.current as number);
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 200 });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta =
              e.touches[0].clientX - (pointerInteracting.current as number);
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 100 });
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </animated.div>
  );
};

export default Globe;
