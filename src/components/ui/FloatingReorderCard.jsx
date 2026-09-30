"use client";

import React from "react";

/**
 * Floating reorder action card with 🔼 Up, 🔽 Down, and 🗑️ Delete buttons
 */
export function FloatingReorderCard({
  index,
  total,
  onMoveUp,
  onMoveDown,
  onDelete,
  emoji = "📄",
  className = "",
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 px-2.5 py-1 rounded-full shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
      data-floating-reorder-card="true"
    >
      {/* Position Badge with Emoji */}
      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1 select-none pr-0.5">
        <span className="text-xs">{emoji}</span>
        <span>#{index + 1}</span>
      </span>

      <div className="h-3 w-px bg-slate-200" />

      {/* Move Up 🔼 Button */}
      <button
        type="button"
        disabled={isFirst}
        onClick={(e) => {
          e.stopPropagation();
          onMoveUp();
        }}
        title={isFirst ? "Already at top" : "Move Up 🔼"}
        aria-label="Move Up"
        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs transition-all ${
          isFirst
            ? "opacity-25 cursor-not-allowed filter grayscale"
            : "hover:bg-slate-100 hover:scale-115 active:scale-75 cursor-pointer text-slate-700"
        }`}
      >
        <span>🔼</span>
      </button>

      {/* Move Down 🔽 Button */}
      <button
        type="button"
        disabled={isLast}
        onClick={(e) => {
          e.stopPropagation();
          onMoveDown();
        }}
        title={isLast ? "Already at bottom" : "Move Down 🔽"}
        aria-label="Move Down"
        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs transition-all ${
          isLast
            ? "opacity-25 cursor-not-allowed filter grayscale"
            : "hover:bg-slate-100 hover:scale-115 active:scale-75 cursor-pointer text-slate-700"
        }`}
      >
        <span>🔽</span>
      </button>

      <div className="h-3 w-px bg-slate-200" />

      {/* Delete 🗑️ Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete item 🗑️"
        aria-label="Delete item"
        className="w-6 h-6 flex items-center justify-center rounded-full text-xs hover:bg-red-50 hover:scale-115 active:scale-75 transition-all cursor-pointer text-slate-400 hover:text-red-600"
      >
        <span>🗑️</span>
      </button>
    </div>
  );
}
