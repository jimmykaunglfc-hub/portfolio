/** RAF timestamps may precede a synchronous render in the same frame. */
export function advanceEngineTime(elapsed: number, stamp: number, previous: number): number {
  return elapsed + Math.max(0, Math.min((stamp - previous) / 1000, .08));
}
