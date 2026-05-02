"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * useScrollPosition — Custom hook for scroll-based UI changes
 * Returns current Y position and whether user has scrolled past threshold.
 */
export function useScrollPosition(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrollY(y);
    setScrolled(y > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { scrolled, scrollY };
}
