import gsap from "gsap";
import React, { useRef, useEffect } from "react";

const FONT_WEIGHTS = {
  subTitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className + " inline-block"}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    letters.forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();
      const center =
        letterRect.left - rect.left + letterRect.width / 2;

      const dist = Math.abs(mouseX - center);
      const falloff = Math.max(0, 1 - dist / 200); // smaller radius = sharper fluid

      const newWeight = base + (max - base) * falloff;

      animateLetter(letter, newWeight);
    });
  }; 

  const resetWeights = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.4));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", resetWeights);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", resetWeights);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);

  useEffect(() => {
    const c1 = setupTextHover(titleRef.current, "title");
    const c2 = setupTextHover(subTitleRef.current, "subTitle");
    return () => {
      c1 && c1();
      c2 && c2();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subTitleRef}>
        {renderText(
          "Hey, I'm Aniket! Welcome to my",
          "text-3xl font-georama tracking-tight text-gray-200",
          150
        )}
      </p>

      <h1 ref={titleRef} className="mt-7">
        {renderText(
          "portfolio",
          "text-9xl italic font-georama text-gray-50 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]",
          400
        )}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is designed for desktop/Tablet screens only</p>
      </div>
    </section>
  );
};

export default Welcome;
