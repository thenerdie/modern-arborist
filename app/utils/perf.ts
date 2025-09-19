// Simple heuristics to detect a potentially low-performance environment.
// We intentionally keep this lightweight and only evaluate once on mount.
// Consumers can also force the mode via localStorage.setItem('forceLowPerf','1').
// Likewise, force disable with localStorage.setItem('forceLowPerf','0').

import { useEffect, useState } from "react";

export function detectLowPerf(): boolean {
  if (typeof window === "undefined") return false; // SSR: assume normal perf
  try {
    const forced = localStorage.getItem("forceLowPerf");
    if (forced === "1") return true;
    if (forced === "0") return false;
  } catch {}

  // Heuristics
  const nav: any = navigator;
  const deviceMemory: number | undefined = nav.deviceMemory; // e.g. 0.5, 1, 2, 4, 8
  const cores = navigator.hardwareConcurrency || 4;
  const conn: any = nav.connection || nav.mozConnection || nav.webkitConnection;
  const saveData = !!conn?.saveData;
  const downlink = conn?.downlink; // Mbps
  const ua = navigator.userAgent;
  const isOldAndroid = /Android\s(5|6|7|8)\./i.test(ua);
  const isLowIOS = /iPhone\s(6|7|8|SE)/i.test(ua);

  const lowMem = deviceMemory !== undefined && deviceMemory <= 2;
  const lowCores = cores <= 4; // many budget phones
  const slowNet = saveData || (downlink && downlink < 1.5);
  const mobile = /Mobi|Android|iPhone/i.test(ua);

  return lowMem || (mobile && lowCores) || slowNet || isOldAndroid || isLowIOS;
}

export function useLowPerfMode(): boolean {
  const [low, setLow] = useState(false);
  useEffect(() => {
    setInterval(() => setLow(detectLowPerf()), 1000);
  }, []);
  return low;
}
