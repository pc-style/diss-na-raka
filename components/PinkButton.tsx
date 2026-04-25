"use client";

import { useEffect, useState } from "react";

export function PinkButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Wiadomość dla Wojtka"
        style={{ color: "#ff1493" }}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-pink-100 px-4 py-2 text-sm font-extrabold shadow-lg shadow-pink-500/40 ring-2 ring-pink-300 transition hover:bg-pink-200 active:scale-95 sm:bottom-6 sm:right-6 sm:px-5 sm:py-2.5"
      >
        :)
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-pink-100 p-6 text-center text-ink shadow-2xl ring-4 ring-pink-300"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Zamknij"
              className="absolute right-2 top-2 rounded-full px-2 py-1 text-pink-700 hover:bg-pink-200"
            >
              ×
            </button>
            <p
              style={{ color: "#ff1493" }}
              className="mt-2 text-base font-extrabold sm:text-lg"
            >
              wojtek bednarek pomaga w walce z rakiem. a adam nie klamie :3
            </p>
          </div>
        </div>
      )}
    </>
  );
}
