import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Hand } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function CylinderPhoneCarousel() {
  const { t } = useLang();
  const phoneList = t.mockup.phoneList;
  const count = phoneList.length;

  // Start with index 1 (Sunday Service Pastor Hero) front-and-center, flanked by Youth on left & Kids on right
  const [position, setPosition] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // References for drag calculation & spring animation
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; pos: number; time: number }>({
    x: 0,
    pos: 1,
    time: 0,
  });
  const velocityRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const targetPosRef = useRef(1);
  const didDragMoveRef = useRef(false);

  // Active integer index wrapped in [0, count - 1]
  const normalizedIndex = ((Math.round(position) % count) + count) % count;

  // Smooth spring animator towards a target position
  const animateTo = useCallback((target: number) => {
    targetPosRef.current = target;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const step = () => {
      setPosition((prev) => {
        const diff = targetPosRef.current - prev;
        if (Math.abs(diff) < 0.001) {
          return targetPosRef.current;
        }
        const next = prev + diff * 0.15;
        animFrameRef.current = requestAnimationFrame(step);
        return next;
      });
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ── Drag & Swipe Handlers (Universal Mouse + Touch Pointer Events) ──
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    setIsDragging(true);
    didDragMoveRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      pos: position,
      time: performance.now(),
    };
    velocityRef.current = 0;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    if (Math.abs(dx) > 5) {
      didDragMoveRef.current = true;
      if (!hasInteracted) setHasInteracted(true);
    }

    const now = performance.now();
    const dt = Math.max(1, now - dragStartRef.current.time);
    velocityRef.current = dx / dt;

    // Responsive drag sensitivity: 1 card unit per ~130px on mobile, ~155px on desktop
    const pxPerCard = window.innerWidth < 640 ? 130 : 155;
    setPosition(dragStartRef.current.pos - dx / pxPerCard);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }

    // Momentum fling physics
    const flickThreshold = 0.22;
    let target = Math.round(position);

    if (velocityRef.current < -flickThreshold) {
      target = Math.ceil(
        position + Math.min(2, Math.abs(velocityRef.current) * 0.3),
      );
    } else if (velocityRef.current > flickThreshold) {
      target = Math.floor(
        position - Math.min(2, Math.abs(velocityRef.current) * 0.3),
      );
    }

    animateTo(target);
  };

  const handleCardClick = (idx: number) => {
    if (didDragMoveRef.current) return;
    if (!hasInteracted) setHasInteracted(true);

    let diff = idx - (position % count);
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    animateTo(Math.round(position + diff));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (!hasInteracted) setHasInteracted(true);
      animateTo(Math.round(position - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (!hasInteracted) setHasInteracted(true);
      animateTo(Math.round(position + 1));
    }
  };

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      onKeyDown={handleKeyDown}
    >
      {/* ── 3D Viewport with Perspective & Curved Cylinder Physics ── */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full h-[355px] sm:h-[395px] flex items-center justify-center overflow-hidden touch-pan-y ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          perspective: 1000,
          perspectiveOrigin: "center 48%",
        }}
      >
        {/* Static Drag / Swipe Cue Badge (Disappears on first interaction, no endless loop per R-19) */}
        <AnimatePresence>
          {!hasInteracted && !isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full bg-charcoal/90 border border-brass px-3.5 py-2 shadow-xl text-white"
            >
              <Hand className="w-4 h-4 text-brass shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold text-white tracking-wide whitespace-nowrap">
                {t.mockup.dragHint}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 3D Cylinder Container ── */}
        <div
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {phoneList.map((phone, idx) => {
            let d = (idx - (position % count)) % count;
            if (d > count / 2) d -= count;
            if (d < -count / 2) d += count;

            if (Math.abs(d) > 2.2) return null;

            const angleDeg = d * 26;
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 310;

            const x = Math.sin(angleRad) * radius;
            const z = (Math.cos(angleRad) - 1) * 160;
            const rotateY = -angleDeg;
            const scale = Math.max(0.76, 1.0 - Math.abs(d) * 0.09);
            const opacity = Math.max(0.45, 1 - Math.abs(d) * 0.28);
            const zIndex = Math.round((2.5 - Math.abs(d)) * 30 + 10);
            const isCenter = Math.abs(d) < 0.45;

            return (
              <button
                key={phone.id}
                type="button"
                onClick={() => handleCardClick(idx)}
                aria-label={`${t.mockup.goToPhone}: ${phone.category} · ${phone.badge}`}
                aria-pressed={isCenter}
                className={`pointer-events-auto absolute w-[166px] sm:w-[190px] aspect-[251/490] rounded-[28px] overflow-hidden p-0 border-0 bg-transparent transition-shadow cursor-pointer ${
                  isCenter
                    ? "shadow-2xl ring-2 ring-brass/80"
                    : "shadow-md hover:brightness-105"
                }`}
                style={{
                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transformOrigin: "center center",
                  opacity,
                  zIndex,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <img
                  src={phone.image}
                  alt={`${phone.category} · ${phone.title}`}
                  width={251}
                  height={490}
                  fetchPriority={idx === 1 ? "high" : "auto"}
                  draggable={false}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Controls & Category Navigation Bar (44x44px touch targets per R-03) ── */}
      <div className="flex items-center justify-between gap-2 w-full px-1 pt-1">
        <button
          type="button"
          onClick={() => {
            if (!hasInteracted) setHasInteracted(true);
            animateTo(Math.round(position - 1));
          }}
          aria-label={t.mockup.prevPhone}
          className="w-11 h-11 rounded-xl bg-sand hover:bg-sand-border active:bg-sand-border flex items-center justify-center transition-colors cursor-pointer text-charcoal shrink-0"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Current Active Phone Category Pill + Navigation Dots */}
        <div className="flex flex-col items-center gap-0.5 min-w-0">
          <span className="font-mono text-xs font-bold text-charcoal truncate max-w-full">
            {phoneList[normalizedIndex].category} ·{" "}
            <span className="text-terracotta">
              {phoneList[normalizedIndex].badge}
            </span>
          </span>

          {/* Navigation Dots with tall touch area */}
          <div className="flex items-center gap-1">
            {phoneList.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  if (!hasInteracted) setHasInteracted(true);
                  let diff = i - (position % count);
                  if (diff > count / 2) diff -= count;
                  if (diff < -count / 2) diff += count;
                  animateTo(Math.round(position + diff));
                }}
                aria-label={`${t.mockup.goToPhone} ${i + 1}: ${p.category}`}
                aria-current={i === normalizedIndex ? "true" : undefined}
                className="min-h-8 px-1 flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === normalizedIndex
                      ? "w-5 bg-terracotta"
                      : "w-2 bg-sand-border hover:bg-slate"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!hasInteracted) setHasInteracted(true);
            animateTo(Math.round(position + 1));
          }}
          aria-label={t.mockup.nextPhone}
          className="w-11 h-11 rounded-xl bg-sand hover:bg-sand-border active:bg-sand-border flex items-center justify-center transition-colors cursor-pointer text-charcoal shrink-0"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
