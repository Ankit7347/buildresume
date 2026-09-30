"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, List, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * BulletPointsEditor: Provides interactive bullet point management with 🔼 Up, 🔽 Down, and 🗑️ Delete,
 * with seamless keyboard shortcuts (Enter to add next, Backspace to delete empty) and toggle to raw multiline textarea.
 */
export function BulletPointsEditor({
  value = "",
  onChange,
  placeholder = "Add an achievement or responsibility...",
  label = "Responsibilities & Key Achievements",
}) {
  const [isRawMode, setIsRawMode] = useState(false);
  const inputRefs = useRef([]);

  // Helper to split a multiline string into an array of bullets
  const parseStringToBullets = (str) => {
    if (!str || typeof str !== "string") return [""];
    const lines = str
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.replace(/^[•\-\*]\s*/, ""));
    return lines.length > 0 ? lines : [""];
  };

  const [bullets, setBullets] = useState(() => parseStringToBullets(value));
  const lastSerializedRef = useRef(value);

  // Synchronize when value changes externally (e.g. loading template or preset)
  useEffect(() => {
    if (value !== lastSerializedRef.current) {
      setBullets(parseStringToBullets(value));
      lastSerializedRef.current = value;
    }
  }, [value]);

  const emitChange = (newBullets) => {
    setBullets(newBullets);
    const formatted = newBullets
      .map((b) => b.trim())
      .filter(Boolean)
      .map((b) => (b.startsWith("• ") ? b : `• ${b}`))
      .join("\n");
    lastSerializedRef.current = formatted;
    onChange(formatted);
  };

  const handleBulletChange = (idx, text) => {
    const updated = [...bullets];
    updated[idx] = text;
    emitChange(updated);
  };

  const handleAddBullet = (afterIndex) => {
    const insertAt = typeof afterIndex === "number" ? afterIndex + 1 : bullets.length;
    const updated = [...bullets];
    updated.splice(insertAt, 0, "");
    setBullets(updated);

    // Focus the new input on the next animation frame
    setTimeout(() => {
      if (inputRefs.current[insertAt]) {
        inputRefs.current[insertAt].focus();
      }
    }, 30);
  };

  const handleDeleteBullet = (idx) => {
    if (bullets.length <= 1) {
      emitChange([""]);
      setTimeout(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      }, 30);
      return;
    }
    const updated = bullets.filter((_, i) => i !== idx);
    emitChange(updated);

    const nextFocusIdx = Math.max(0, idx - 1);
    setTimeout(() => {
      if (inputRefs.current[nextFocusIdx]) {
        inputRefs.current[nextFocusIdx].focus();
      }
    }, 30);
  };

  const handleMoveBullet = (idx, direction) => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= bullets.length) return;
    const updated = [...bullets];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    emitChange(updated);

    setTimeout(() => {
      if (inputRefs.current[targetIdx]) {
        inputRefs.current[targetIdx].focus();
      }
    }, 30);
  };

  const activeCount = bullets.filter((b) => b.trim().length > 0).length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <span>{label}</span>
          <span className="text-[10px] text-slate-400 font-normal">
            ({activeCount} bullet{activeCount === 1 ? "" : "s"})
          </span>
        </label>
        <button
          type="button"
          onClick={() => setIsRawMode(!isRawMode)}
          className="text-[11px] font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors px-2 py-0.5 rounded-md hover:bg-slate-100 cursor-pointer"
          title={isRawMode ? "Switch to interactive bullet list" : "Switch to plain textarea"}
        >
          {isRawMode ? (
            <>
              <List className="w-3 h-3 text-primary" />
              <span>Interactive Bullets</span>
            </>
          ) : (
            <>
              <AlignLeft className="w-3 h-3" />
              <span>Plain Text Area</span>
            </>
          )}
        </button>
      </div>

      {isRawMode ? (
        <textarea
          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 min-h-[110px] shadow-xs leading-relaxed"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            lastSerializedRef.current = e.target.value;
            onChange(e.target.value);
            setBullets(parseStringToBullets(e.target.value));
          }}
        />
      ) : (
        <div className="space-y-2">
          {bullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200/90 rounded-xl shadow-2xs hover:border-slate-300 transition-all focus-within:ring-2 focus-within:ring-primary/20"
            >
              <span className="text-slate-400 text-xs font-bold pl-2 select-none shrink-0">
                • {idx + 1}
              </span>

              <input
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                className="flex-1 bg-transparent border-none text-xs text-slate-900 px-2 py-1 focus:outline-none placeholder:text-slate-400 min-w-0"
                placeholder={placeholder}
                value={bullet}
                onChange={(e) => handleBulletChange(idx, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBullet(idx);
                  } else if (e.key === "Backspace" && !bullet && bullets.length > 1) {
                    e.preventDefault();
                    handleDeleteBullet(idx);
                  }
                }}
              />

              {/* Move Up 🔼 */}
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => handleMoveBullet(idx, "up")}
                title="Move Bullet Up 🔼"
                className={`w-6 h-6 flex items-center justify-center rounded-md text-[11px] transition-all shrink-0 ${
                  idx === 0
                    ? "opacity-25 cursor-not-allowed filter grayscale"
                    : "hover:bg-slate-100 hover:scale-115 active:scale-75 text-slate-700 cursor-pointer"
                }`}
              >
                🔼
              </button>

              {/* Move Down 🔽 */}
              <button
                type="button"
                disabled={idx === bullets.length - 1}
                onClick={() => handleMoveBullet(idx, "down")}
                title="Move Bullet Down 🔽"
                className={`w-6 h-6 flex items-center justify-center rounded-md text-[11px] transition-all shrink-0 ${
                  idx === bullets.length - 1
                    ? "opacity-25 cursor-not-allowed filter grayscale"
                    : "hover:bg-slate-100 hover:scale-115 active:scale-75 text-slate-700 cursor-pointer"
                }`}
              >
                🔽
              </button>

              {/* Delete 🗑️ */}
              <button
                type="button"
                onClick={() => handleDeleteBullet(idx)}
                title="Delete Bullet 🗑️"
                className="w-6 h-6 flex items-center justify-center rounded-md text-[11px] hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all cursor-pointer shrink-0"
              >
                🗑️
              </button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleAddBullet()}
            className="w-full h-8 text-xs text-slate-600 border-dashed border-slate-300 hover:bg-slate-50 hover:border-slate-400 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add Bullet Point</span>
          </Button>
        </div>
      )}
    </div>
  );
}
