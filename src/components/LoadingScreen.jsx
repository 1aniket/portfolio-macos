// LoadingScreen.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onFinish }) {
  const loaderRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" }
    });

    // Fade in entire screen
    tl.fromTo(loaderRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });

    // Animate loading bar
    tl.fromTo(
      barRef.current,
      { width: "0%" },
      { width: "70%", duration: 1.8, ease: "power2.inOut" }
    );

    // Fill to 100% at the end
    tl.to(barRef.current, {
      width: "100%",
      duration: 0.8,
      ease: "power1.out"
    });

    // Fade-out loader, reveal app
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: onFinish
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[99999]"
      style={{ pointerEvents: "none" }}
    >
      {/* Apple Logo */}
      <img
        src="/apple.svg"
        alt="apple"
        className="w-20 h-20 mb-8 select-none"
        draggable="false"
      />

      {/* Loading Bar Container */}
      <div className="w-64 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gray-300 rounded-full"
        />
      </div>
    </div>
  );
}
