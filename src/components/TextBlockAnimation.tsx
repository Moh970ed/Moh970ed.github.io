import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface Props {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
}

export default function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "hsl(262 83% 68%)",
  stagger = 0.08,
  duration = 0.55,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const split = new SplitText(containerRef.current, {
        type: "lines",
        linesClass: "block-line",
      });

      const lines = split.lines;
      const blocks: HTMLDivElement[] = [];

      lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = "position:relative;display:block;overflow:hidden;";

        const block = document.createElement("div");
        block.style.cssText = `
          position:absolute;top:0;left:0;width:100%;height:100%;
          background-color:${blockColor};z-index:2;
          transform:scaleX(0);transform-origin:left center;
        `;

        line.parentNode!.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        wrapper.appendChild(block);

        gsap.set(line, { opacity: 0 });
        blocks.push(block);
      });

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        scrollTrigger: animateOnScroll
          ? {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          : undefined,
        delay,
      });

      tl.to(blocks, { scaleX: 1, duration, stagger, transformOrigin: "left center" })
        .set(lines, { opacity: 1, stagger }, `<${duration / 2}`)
        .to(blocks, { scaleX: 0, duration, stagger, transformOrigin: "right center" }, `<${duration * 0.4}`);
    }, containerRef);

    return () => ctx.revert();
  }, [animateOnScroll, delay, blockColor, stagger, duration]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
