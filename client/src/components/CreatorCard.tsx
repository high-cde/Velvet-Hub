/* Velvet Salon: creator cards evoke a private archive through photographic texture, metadata and one clear action. */
import { Link } from "wouter";
import { ArrowUpRight, Bookmark, CheckCircle2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useVelvet } from "@/contexts/VelvetContext";
import type { Creator } from "@/lib/mockData";

export default function CreatorCard({ creator }: { creator: Creator }) {
  const { isSaved, toggleSaved } = useVelvet();
  const saved = isSaved(creator.id);
  const handleSave = () => { toggleSaved(creator.id); toast(saved ? "Rimosso dai salvati" : "Salvato nella tua selezione", { description: saved ? creator.name : "Lo ritroverai nel tuo spazio personale." }); };
  return <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#120b19] transition duration-300 hover:-translate-y-1 hover:border-[#d7b46a]/30 hover:shadow-[0_16px_50px_rgba(0,0,0,.18)]">
    <div className={`relative flex min-h-44 items-end overflow-hidden bg-gradient-to-br ${creator.accent} p-5`}>
      {creator.image && <img src={creator.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-screen transition duration-700 group-hover:scale-105 group-hover:opacity-65" />}
      <div className="absolute inset-0 bg-gradient-to-t from-[#120b19] via-[#120b19]/25 to-transparent" /><div className="absolute -right-8 -top-12 h-36 w-36 rounded-full border border-white/20" /><div className="absolute right-6 top-6 h-20 w-20 rounded-full border border-white/10" />
      <span className="display-font relative z-10 text-6xl text-white/90">{creator.initials}</span>
      <button type="button" aria-label={saved ? `Rimuovi ${creator.name} dai salvati` : `Salva ${creator.name}`} onClick={handleSave} className={`absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border transition ${saved ? "border-[#d7b46a]/60 bg-[#6f5220] text-[#ffe7ef]" : "border-white/20 bg-black/10 text-white hover:border-white/40"}`}><Bookmark size={15} fill={saved ? "currentColor" : "none"} /></button>
      <span className="absolute bottom-4 right-4 z-10 rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-white/85">{creator.availability}</span>
    </div>
    <div className="flex flex-1 flex-col p-5"><div className="flex items-start justify-between gap-3"><div><Link href={`/creator/${creator.handle}`} className="flex items-center gap-1.5 text-lg font-extrabold text-white hover:text-[#f1d58f]">{creator.name}{creator.verified && <CheckCircle2 size={15} className="text-[#d7b46a]" />}</Link><p className="mt-1 text-xs text-[#988a99]">@{creator.handle}</p></div><ArrowUpRight size={17} className="mt-1 text-[#8d7d8b] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#d7b46a]" /></div><p className="mt-4 line-clamp-3 text-sm leading-6 text-[#c0b1bd]">{creator.bio}</p><div className="mt-auto flex flex-wrap items-center gap-2 pt-5 text-[11px] text-[#a899a7]"><span className="flex items-center gap-1"><MapPin size={13} /> {creator.location}</span><span className="h-1 w-1 rounded-full bg-[#6f5220]" /><span>{creator.category}</span></div><div className="mt-4 flex flex-wrap gap-1.5">{creator.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[.055] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#cbbac6]">{tag}</span>)}</div></div>
  </article>;
}
