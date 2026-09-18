/* Velvet Salon: the oxblood-to-pink rail is the structural signature that orients every public chapter. */
import type { ReactNode } from "react";

export default function VelvetRail({ label, children, className = "" }: { label?: string; children: ReactNode; className?: string }) {
  return <div className={`border-l-2 border-[#6f5220] pl-5 ${className}`}><div className="relative before:absolute before:-left-[22px] before:top-0 before:h-2 before:w-2 before:rounded-full before:bg-[#d7b46a] before:shadow-[0_0_0_4px_#08060b]">{label && <p className="section-kicker mb-3">{label}</p>}{children}</div></div>;
}
