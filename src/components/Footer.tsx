import React, { useEffect, useRef, useState } from "react";

const WORDS = [
  "Success",
  "Growth",
  "Performance",
  "Revenue",
  "Opportunities",
  "Results",
  "Achievement",
];

// Each vertical word component
function VerticalText({
  text,
  highlighted,
}: {
  text: string;
  highlighted: boolean;
}) {
  return (
    <span
      className={`font-sans select-none transition-colors duration-500 font-medium block`}
      style={{
        color: highlighted ? "#fff" : "#666",
        fontSize: highlighted ? 32 : 28,
        fontWeight: highlighted ? 600 : 500,
        writingMode: "vertical-lr",
        textOrientation: "mixed",
        letterSpacing: "2px",
        textShadow: highlighted
          ? "0 2px 16px #fff8"
          : "none",
        transition: "color 0.3s, font-size 0.3s",
        margin: 0,
        padding: 0,
      }}
    >
      {text}
    </span>
  );
}

const ITEM_GAP = 8; // DENSE: Reduced gap px between each word

const FooterCarousel: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [wordWidth, setWordWidth] = useState(0);

  // Repeat enough words to fill screen multiple times for fake "infinite" carousel effect
  const MIN_WORDS_SHOWN = 50;
  const repeatedWords = Array(Math.ceil(MIN_WORDS_SHOWN / WORDS.length) + 2)
    .fill(WORDS)
    .flat();

  // Carousel Reference for width
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);

  // Measure vertical word real width
  useEffect(() => {
    if (wordRef.current) {
      setWordWidth(wordRef.current.offsetWidth + ITEM_GAP);
    }
  }, []);

  // Animate the offset to the left, loop when it passes one word's width
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % (wordWidth * 3));
    }, 50);

    return () => clearInterval(interval);
  }, [offset, wordWidth]);

  return (
    <div
      className="w-full flex items-center justify-center relative overflow-x-hidden"
      style={{
        height: 220,
        background: "transparent",
        zIndex: 2, // above curve
        marginTop: "-32px", // pull up to fill curve area but not under it
        pointerEvents: "none", // Make sure not clickable over links
      }}
    >
      <div
        className="flex items-end transition-none"
        style={{
          gap: ITEM_GAP,
          transform: `translateX(-${offset}px)`,
          willChange: "transform",
          minWidth: "100vw",
        }}
        ref={containerRef}
      >
        {repeatedWords.map((word, idx) => {
          // Only one highlight: Highlight the word that's closest to the center.
          let highlight = false;
          // Calculate the left position of this word in pixels (approximate)
          const left = idx * wordWidth - offset;
          // Get viewport center:
          const center = typeof window !== "undefined" ? window.innerWidth / 2 : 400;
          // We want to highlight the word whose center is closest to window center
          if (wordWidth) {
            const wordCenter = left + wordWidth / 2;
            if (Math.abs(wordCenter - center) < wordWidth / 2) {
              highlight = true;
            }
          }
          return (
            <div
              key={idx}
              ref={idx === 0 ? wordRef : undefined}
              className="flex flex-col items-center"
              style={{
                minWidth: 32,
                userSelect: "none",
              }}
            >
              <VerticalText text={word} highlighted={highlight} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Footer curve remains unchanged
function FooterCurve({ children }: { children: React.ReactNode }) {
  return (
    <div className="footer-curve relative overflow-hidden bg-black">
      {/* The SVG creates the top curve */}
      <svg
        className="absolute top-0 left-0 w-full h-[22vw] min-h-[150px] max-h-[320px] -translate-y-1 pointer-events-none z-10"
        viewBox="0 0 1920 320"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,320 C600,0 1320,0 1920,320 L1920,0 L0,0 Z"
          fill="black"
        />
      </svg>
      <div className="relative pt-[9vw] pb-8 flex flex-col items-center z-20">
        {children}
      </div>
    </div>
  );
}

export const Footer = () => {
  return (
    <footer className="relative bg-black text-white overflow-x-clip">
      <FooterCurve>
        {/* Center "logo": use a placeholder icon, replace with your SVG if needed */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center shadow-2xl">
            {/* Example fallback, swap with real logo */}
            <span className="block w-7 h-7 bg-white rounded-[6px] shadow-xl" />
          </div>
        </div>
        {/* Footer text and links */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="text-sm text-zinc-300 font-sans mb-1">
            © 2025 SalesKat. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-xs text-zinc-400">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Support</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </FooterCurve>
      {/* Curve border rides above carousel */}
      {/* Place under curve but above very bottom */}
      <FooterCarousel />
    </footer>
  );
};