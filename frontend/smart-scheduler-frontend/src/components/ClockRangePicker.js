import { useEffect, useMemo, useRef, useState } from "react";
import "./ClockRangePicker.css"
/**
 * ClockRangePicker (independent)
 * - Free handle movement (can move over unavailable)
 * - Arc-drag to move the entire selection
 * - Seam-safe at 12 o’clock (no “jump”)
 * - Supports overnight ranges (e.g., from 21:00 to 03:00)
 * - All validation (zero-length, overlap with unavailable) is handled internally
 * - Editable HH:MM inputs for From/To (24h). Arrow keys adjust by stepMinutes.
 *
 * Props:
 *  - value: { fromTime: number, toTime: number }   // minutes since midnight [0..1440)
 *  - onChange?: (range: { fromTime, toTime }) => void
 *  - onValidityChange?: (isValid: boolean) => void // notified on mount/changes
 *  - unavailable?: Array<{ start: number, end: number }>
 *  - size?: number (default 280)
 *  - stepMinutes?: number (default 5)
 *  - showReadout?: boolean (default true)  // shows the editable inputs
 */
export default function ClockRangePicker({
  value,
  onChange,
  onValidityChange,
  unavailable = [],
  size = 280,
  stepMinutes = 5,
  showReadout = true,
  primaryColor = "#273A4C",
}) {
  // ----- constants/helpers -----
  const FULL_DAY = 1440;
  const DEG_PER_MIN = 360 / FULL_DAY;
  const R = 110;
  const CENTER = size / 2;
  const HANDLE_HIT_PX = 18;
  const ARC_HIT_BAND = [R - 16, R + 16];

  const modDay = (m) => ((m % FULL_DAY) + FULL_DAY) % FULL_DAY;

  const quantizeMinutes = (mins) => {
    let q = Math.round(mins / stepMinutes) * stepMinutes;
    if (q >= FULL_DAY) q = 0;
    if (q < 0) q = 0;
    return q;
  };
  const clampToStep = (mins) => modDay(Math.round(mins / stepMinutes) * stepMinutes);

  // snap near 24:00 to exactly 0 to avoid jitter at 12 o’clock
  const SEAM_DEADBAND = stepMinutes * 2;
  const seamSnapWide = (m) => (m >= FULL_DAY - SEAM_DEADBAND ? 0 : m);

  const minutesToAngle = (mins) => mins * DEG_PER_MIN - 90; // 0 at 12 o’clock
  const angleToMinutes = (deg) => {
    let unit = (deg + 90) / 360; // (-0.5 .. 0.5]
    unit = ((unit % 1) + 1) % 1; // [0..1)
    return quantizeMinutes(unit * FULL_DAY);
  };
  const shortestAngle = (d) => ((d + 540) % 360) - 180; // [-180,180)

  const minutesToLabel = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  // Parse flexible HH:MM (also accepts "730" -> 07:30, "7" -> 07:00)
  const parseTimeText = (txt) => {
    if (!txt) return null;
    let s = txt.trim().replace(/[^\d:]/g, "");
    if (!s) return null;

    let h = 0, m = 0;
    if (s.includes(":")) {
      const [hs, ms = "0"] = s.split(":");
      if (hs === "" || isNaN(hs) || isNaN(ms)) return null;
      h = Number(hs);
      m = Number(ms);
    } else {
      // no colon; last two digits are minutes
      const digits = s.replace(/\D/g, "");
      if (!digits) return null;
      if (digits.length <= 2) {
        h = Number(digits);
        m = 0;
      } else {
        h = Number(digits.slice(0, digits.length - 2));
        m = Number(digits.slice(-2));
      }
    }
    if (h < 0 || h > 23 || m < 0 || m > 59) return null;

    const mins = h * 60 + m;
    // round to nearest step and seam snap
    return seamSnapWide(quantizeMinutes(mins));
  };

  // ----- validation (internal) -----
  const overlaps = (aStart, aEnd, bStart, bEnd) =>
    Math.max(aStart, bStart) < Math.min(aEnd, bEnd);

  const normalizeBlocks = (blocks) => {
    const arr = (blocks || [])
      .map((b) => ({
        start: Math.max(0, b.start | 0),
        end: Math.min(FULL_DAY, b.end | 0),
      }))
      .filter((b) => b.end > b.start)
      .sort((a, b) => a.start - b.start);

    const merged = [];
    for (const b of arr) {
      const last = merged[merged.length - 1];
      if (last && b.start <= last.end) last.end = Math.max(last.end, b.end);
      else merged.push({ ...b });
    }
    return merged;
  };

  // wrap-aware intersection & zero-length check
  const intersectsUnavailable = (from, to, blocks) => {
    const merged = normalizeBlocks(blocks);
    if (from === to) return true; // zero-length invalid
    if (from < to) {
      return merged.some((b) => overlaps(from, to, b.start, b.end));
    }
    // wrap: [from..1440) ∪ [0..to)
    return (
      merged.some((b) => overlaps(from, FULL_DAY, b.start, b.end)) ||
      merged.some((b) => overlaps(0, to, b.start, b.end))
    );
  };

  // ----- draw helpers -----
  const toXY = (mins, radius = R) => {
    const rad = (minutesToAngle(mins) * Math.PI) / 180;
    return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
  };

  const arcPath = (fromMin, toMin, radius) => {
    const start = toXY(fromMin, radius);
    const safeTo = toMin >= FULL_DAY ? FULL_DAY - 0.01 : toMin; // avoid exactly 1440
    const end = toXY(safeTo, radius);
    const spanMin = Math.max(0, safeTo - fromMin);
    const spanDeg = spanMin * DEG_PER_MIN;
    const largeArc = spanDeg > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const isOnHandle = (mx, my, handleMin) => {
    const { x, y } = toXY(handleMin, R);
    const dx = mx - x,
      dy = my - y;
    return Math.hypot(dx, dy) <= HANDLE_HIT_PX;
  };

  const angleFromXY = (mx, my) =>
    (Math.atan2(my - CENTER, mx - CENTER) * 180) / Math.PI;

  const isOnArc = (mx, my) => {
    const r = Math.hypot(mx - CENTER, my - CENTER);
    if (r < ARC_HIT_BAND[0] || r > ARC_HIT_BAND[1]) return false;
    const m = seamSnapWide(angleToMinutes(angleFromXY(mx, my)));
    const wrap = value.fromTime > value.toTime;
    if (!wrap) return value.fromTime <= m && m <= value.toTime;
    return m >= value.fromTime || m <= value.toTime; // wrap membership
  };

  // ----- drag state -----
  const svgRef = useRef(null);
  const [active, setActive] = useState(null); // "from" | "to" | "range" | null
  const dragRef = useRef(null); // { startFrom, startTo, prevAngleDeg, mode, duration }

  // ----- inputs (editable) -----
  const [fromText, setFromText] = useState(minutesToLabel(value.fromTime));
  const [toText, setToText] = useState(minutesToLabel(value.toTime));
  const [fromErr, setFromErr] = useState(false);
  const [toErr, setToErr] = useState(false);

  // sync inputs when external value changes
  useEffect(() => {
    setFromText(minutesToLabel(value.fromTime));
    setToText(minutesToLabel(value.toTime));
  }, [value.fromTime, value.toTime]);

  // validity
  const isInvalid = intersectsUnavailable(value.fromTime, value.toTime, unavailable);
  useEffect(() => {
    if (typeof onValidityChange === "function") onValidityChange(!isInvalid);
  }, [isInvalid, onValidityChange]);

  // ----- pointer handlers -----
  const onPointerDown = (e) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let mode = null;
    if (isOnHandle(mx, my, value.fromTime)) mode = "from";
    else if (isOnHandle(mx, my, value.toTime)) mode = "to";
    else if (isOnArc(mx, my)) mode = "range";
    else {
      // empty dial — choose nearest handle to start moving
      const m = seamSnapWide(angleToMinutes(angleFromXY(mx, my)));
      const dFrom = Math.abs(m - value.fromTime);
      const dTo = Math.abs(m - value.toTime);
      mode = dFrom <= dTo ? "from" : "to";
    }

    const duration = modDay(value.toTime - value.fromTime); // wrap-safe duration
    dragRef.current = {
      startFrom: value.fromTime,
      startTo: value.toTime,
      prevAngleDeg: angleFromXY(mx, my),
      mode,
      duration,
    };

    setActive(mode);
    svg.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!active || !dragRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const { startFrom, startTo, prevAngleDeg, mode, duration } = dragRef.current;
    const currAngle = angleFromXY(mx, my);

    if (mode === "range") {
      // move both ends by deltaStep (wrap-friendly)
      const deltaDeg = shortestAngle(currAngle - prevAngleDeg);
      const rawMin = deltaDeg / DEG_PER_MIN;
      const deltaStep = Math.round(rawMin / stepMinutes) * stepMinutes;

      const newFrom = seamSnapWide(clampToStep(startFrom + deltaStep));
      const newTo = seamSnapWide(clampToStep(newFrom + duration));

      onChange?.({ fromTime: newFrom, toTime: newTo });
      dragRef.current.prevAngleDeg = currAngle;
      return;
    }

    // Single handle drag — free movement, allow wrap
    const mins = seamSnapWide(angleToMinutes(currAngle));

    if (mode === "from") {
      const candidate = seamSnapWide(clampToStep(mins));
      onChange?.({ fromTime: candidate, toTime: value.toTime });
      dragRef.current.prevAngleDeg = currAngle;
      return;
    }

    if (mode === "to") {
      const candidate = seamSnapWide(clampToStep(mins));
      onChange?.({ fromTime: value.fromTime, toTime: candidate });
      dragRef.current.prevAngleDeg = currAngle;
    }
  };

  const onPointerUp = (e) => {
    if (!active) return;
    svgRef.current?.releasePointerCapture(e.pointerId);
    setActive(null);
    dragRef.current = null;
  };

  // ----- ticks -----
  const ticks = useMemo(() => {
    return Array.from({ length: 24 }, (_, h) => {
      const m = h * 60;
      const p1 = toXY(m, R);
      const p2 = toXY(m, R - 10);
      const labelPos = toXY(m, R - 24);
      return { h, p1, p2, labelPos };
    });
  }, []);

  // wrap-aware selected arc(s)
  const wrap = value.fromTime > value.toTime;

  // ----- input handlers -----
  const commitFrom = () => {
    const parsed = parseTimeText(fromText);
    if (parsed == null) {
      setFromErr(true);
      setFromText(minutesToLabel(value.fromTime));
      return;
    }
    setFromErr(false);
    onChange?.({ fromTime: parsed, toTime: value.toTime });
  };

  const commitTo = () => {
    const parsed = parseTimeText(toText);
    if (parsed == null) {
      setToErr(true);
      setToText(minutesToLabel(value.toTime));
      return;
    }
    setToErr(false);
    onChange?.({ fromTime: value.fromTime, toTime: parsed });
  };

  const nudge = (which, dir) => {
    const delta = dir * stepMinutes;
    if (which === "from") {
      const next = seamSnapWide(clampToStep(value.fromTime + delta));
      onChange?.({ fromTime: next, toTime: value.toTime });
    } else {
      const next = seamSnapWide(clampToStep(value.toTime + delta));
      onChange?.({ fromTime: value.fromTime, toTime: next });
    }
  };

  const onKeyDownTime = (e, which) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      nudge(which, +1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nudge(which, -1);
    } else if (e.key === "Enter") {
      if (which === "from") commitFrom();
      else commitTo();
    }
  };

  return (
    <div className="clock-range" style={{ "--clock-primary": primaryColor }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ touchAction: "none", userSelect: "none" }}
      >
        {/* Dial */}
        <circle cx={CENTER} cy={CENTER} r={R} className="clock-bg" />

        {/* Unavailable (gray) */}
        {normalizeBlocks(unavailable).map((b, i) => (
          <path key={`blk-${i}`} d={arcPath(b.start, b.end, R)} className="clock-unavailable" />
        ))}

        {/* Selected range (single arc or two arcs if wrapping) */}
        {!wrap ? (
          <path
            d={arcPath(value.fromTime, value.toTime, R)}
            className={`clock-selected ${isInvalid ? "invalid" : ""}`}
          />
        ) : (
          <>
            <path
              d={arcPath(value.fromTime, FULL_DAY, R)}
              className={`clock-selected ${isInvalid ? "invalid" : ""}`}
            />
            <path
              d={arcPath(0, value.toTime, R)}
              className={`clock-selected ${isInvalid ? "invalid" : ""}`}
            />
          </>
        )}

        {/* Hour ticks & labels */}
        {ticks.map(({ h, p1, p2, labelPos }) => (
          <g key={h}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="clock-tick" />
            {h % 3 === 0 && (
              <text
                x={labelPos.x}
                y={labelPos.y}
                className="clock-label"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {h}
              </text>
            )}
          </g>
        ))}

        {/* Handles with large hit areas */}
        {[{ which: "from", m: value.fromTime }, { which: "to", m: value.toTime }].map(({ which, m }) => {
          const { x, y } = toXY(m, R);
          return (
            <g key={which}>
              <circle cx={x} cy={y} r={9} className={`clock-handle ${active === which ? "active" : ""}`} />
              <circle cx={x} cy={y} r={HANDLE_HIT_PX} className="clock-handle-hit" />
            </g>
          );
        })}
      </svg>

      {showReadout && (
        <div className="clock-readout inputs">
          <label className={`field ${fromErr ? "error" : ""}`}>
            <span>From</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="^\d{1,2}(:\d{1,2})?$"
              placeholder="HH:MM"
              value={fromText}
              onChange={(e) => {
                setFromText(e.target.value);
                if (fromErr) setFromErr(false);
              }}
              onBlur={commitFrom}
              onKeyDown={(e) => onKeyDownTime(e, "from")}
              aria-invalid={fromErr || undefined}
              aria-label="From time"
            />
          </label>

          <label className={`field ${toErr ? "error" : ""}`}>
            <span>To</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="^\d{1,2}(:\d{1,2})?$"
              placeholder="HH:MM"
              value={toText}
              onChange={(e) => {
                setToText(e.target.value);
                if (toErr) setToErr(false);
              }}
              onBlur={commitTo}
              onKeyDown={(e) => onKeyDownTime(e, "to")}
              aria-invalid={toErr || undefined}
              aria-label="To time"
            />
          </label>
        </div>
      )}

      {/* Styles kept inside for independence */}
      <style>{`
        .clock-range { display:flex; flex-direction:column; align-items:center; gap:10px; }
        .clock-bg { fill: #0f172a; opacity: 0.06; }
        .clock-unavailable { fill:none; stroke:#9ca3af; stroke-opacity:.35; stroke-width:12; stroke-linecap:round; }
        .clock-selected { fill:none; stroke:#3b82f6; stroke-width:12; stroke-linecap:round; transition: d .08s linear; filter: drop-shadow(0 2px 6px rgba(59,130,246,.35)); }
        .clock-selected.invalid { stroke:#ef4444; filter:none; }
        .clock-tick { stroke:#64748b; stroke-width:1.5; opacity:.6; }
        .clock-label { font: 12px/1 system-ui, sans-serif; fill:#475569; }
        .clock-handle { fill:#fff; stroke:#3b82f6; stroke-width:3; transition: transform .12s ease, filter .12s ease; }
        .clock-handle.active { transform: scale(1.08); filter: drop-shadow(0 1px 3px rgba(0,0,0,.25)); }
        .clock-handle-hit { fill: transparent; pointer-events: all; }

        .clock-readout.inputs { display:flex; gap:16px; margin-top:6px; }
        .clock-readout .field { display:flex; align-items:center; gap:8px; font: 12px/1 system-ui, sans-serif; color:#64748b; }
        .clock-readout .field > span { min-width:34px; text-align:right; }
        .clock-readout .field input {
          width: 76px; padding:8px 10px; border-radius:8px; border:1px solid #cbd5e1; 
          font: 14px/1.2 system-ui, sans-serif; color:#0f172a; outline:none;
        }
        .clock-readout .field input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
        .clock-readout .field.error input { border-color:#ef4444; box-shadow:0 0 0 3px rgba(239,68,68,.15); }
      `}</style>
    </div>
  );
}
