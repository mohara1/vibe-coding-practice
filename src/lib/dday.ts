export function getDaysRemaining(applyEnd: string | null): number | null {
  if (!applyEnd) return null;

  const end = new Date(`${applyEnd}T23:59:59`);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();

  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
