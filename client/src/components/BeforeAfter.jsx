import { useEffect, useRef, useState } from 'react';

// Drag (or use arrow keys) to compare a dull "before" with the finished paint.
// The "before" here is the same photo with a grime treatment; swap in the
// client's real before/after shots when they supply them.
export default function BeforeAfter({ src, alt, beforeSrc }) {
  const [pos, setPos] = useState(18);
  const frameRef = useRef(null);
  const dragging = useRef(false);

  // One sweep on load so visitors see that the image can be dragged.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPos(50);
      return;
    }
    let raf;
    const start = performance.now() + 500;
    const from = 18;
    const to = 58;
    const duration = 1400;
    const tick = (now) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (!dragging.current) setPos(from + (to - from) * eased);
      if (t < 1 && !dragging.current) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const moveTo = (clientX) => {
    const rect = frameRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e) => {
    if (dragging.current) moveTo(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <figure className="compare">
      <div
        className="compare__frame"
        ref={frameRef}
        style={{ '--pos': `${pos}%` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img className="compare__img" src={src} alt={alt} draggable="false" />
        <div className="compare__before" aria-hidden="true">
          <img
            className={`compare__img ${beforeSrc ? '' : 'compare__img--grimy'}`}
            src={beforeSrc || src}
            alt=""
            draggable="false"
          />
          {!beforeSrc && <span className="compare__film" />}
        </div>
        <span className="compare__tag compare__tag--before">Before</span>
        <span className="compare__tag compare__tag--after">After</span>
        <span className="compare__handle" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <input
          className="compare__range"
          type="range"
          min="0"
          max="100"
          step="1"
          value={Math.round(pos)}
          onChange={(e) => {
            dragging.current = true;
            setPos(Number(e.target.value));
          }}
          aria-label="Compare before and after. Slide to reveal more of the before photo."
        />
      </div>
      <figcaption>Drag the line to compare. Grey sedan after a one-step polish and sealant.</figcaption>
    </figure>
  );
}
