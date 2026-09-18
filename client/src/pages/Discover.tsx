/* Velvet Salon: discovery is an index, not an infinite feed—filters stay legible and saved work is one tap away. */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Bookmark, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import VelvetNav from "@/components/VelvetNav";
import VelvetRail from "@/components/VelvetRail";
import CreatorCard from "@/components/CreatorCard";
import { Button } from "@/components/ui/button";
import { creators, spaces } from "@/lib/mockData";
import { useVelvet } from "@/contexts/VelvetContext";

const categories = ["Tutto", "Fotografia", "Audio", "Set design", "Scrittura", "Motion", "Ceramica"];

export default function Discover() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tutto");
  const [savedOnly, setSavedOnly] = useState(false);
  const { savedIds } = useVelvet();
  const filtered = useMemo(() => creators.filter((creator) => {
    const text = `${creator.name} ${creator.handle} ${creator.category} ${creator.tags.join(" ")}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase().trim());
    const matchesCategory = category === "Tutto" || text.includes(category.toLowerCase());
    const matchesSaved = !savedOnly || savedIds.includes(creator.id);
    return matchesQuery && matchesCategory && matchesSaved;
  }), [category, query, savedIds, savedOnly]);

  return <div className="velvet-shell"><VelvetNav /><main className="container py-12 md:py-16"><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-end">      <VelvetRail label="Discovery / 01" className="rise-in"><h1 className="display-font text-6xl leading-[.94] text-white md:text-7xl">Trova il tuo<br /><span className="text-[#d7b46a]">angolo.</span></h1></VelvetRail>
<div className="max-w-xl rise-in delay-1"><p className="text-lg leading-8 text-[#c8bdc8]">Creator, processi e voci da seguire con attenzione. Cerca per atmosfera, non solo per categoria.</p><div className="mt-6 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[.14em] text-[#9c8c9b]"><span><strong className="text-[#f5e9ef]">{creators.length}</strong> spazi curati</span><span className="h-4 w-px bg-white/15" /><span><strong className="text-[#f5e9ef]">{savedIds.length}</strong> nella tua selezione</span></div></div></div>

      <section className="mt-16 grid gap-4 md:grid-cols-3">{spaces.map((space, index) => <Link key={space.id} href={`/discover?space=${space.id}`} className={`group relative min-h-44 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${space.gradient} p-5 ${index === 1 ? "md:translate-y-6" : ""}`}><img src={space.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 transition duration-500 group-hover:scale-105 group-hover:opacity-40" /><div className="absolute inset-0 bg-[#08060b]/30" /><div className="relative flex h-full min-h-36 flex-col justify-between"><span className="section-kicker text-[#f6c6d7]">{space.eyebrow}</span><div><p className="display-font text-2xl text-white">{space.title}</p><p className="mt-1 max-w-[15rem] text-xs leading-5 text-[#decbd5]">{space.description}</p></div></div><ArrowRight size={16} className="absolute right-5 top-5 text-white opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" /></Link>)}</section>

      <section className="mt-28"><div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end"><div><p className="section-kicker">Indice dei creator</p><h2 className="display-font mt-3 text-4xl text-white">Segui una traccia.</h2></div><button type="button" onClick={() => setSavedOnly((value) => !value)} className={`flex items-center gap-2 self-start rounded-full border px-4 py-2.5 text-xs font-extrabold ${savedOnly ? "border-[#d7b46a]/50 bg-[#6f5220]/40 text-[#f3c7d6]" : "border-white/15 text-[#b9afba] hover:border-white/30 hover:text-white"}`}><Bookmark size={14} fill={savedOnly ? "currentColor" : "none"} /> {savedOnly ? "Solo salvati" : "I miei salvati"}</button></div><div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><label className="relative block max-w-md flex-1"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8f7d8e]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cerca creator, tag o atmosfera" className="h-12 w-full rounded-full border border-white/10 bg-white/[.04] pl-11 pr-4 text-sm text-white placeholder:text-[#887a88] focus:border-[#d7b46a]/50 focus:outline-none" /></label><div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[.1em] ${category === item ? "border-[#d7b46a]/50 bg-[#6f5220] text-[#ffe8ef]" : "border-white/10 text-[#aa9ba8] hover:border-white/25 hover:text-white"}`}>{item}</button>)}</div><Button variant="outline" className="hidden shrink-0 border-white/15 bg-transparent text-[#b9afba] hover:bg-white/10 hover:text-white lg:flex"><SlidersHorizontal size={15} /> Affina</Button></div><div className="mt-8 grid gap-4 md:grid-cols-12">{filtered.map((creator, index) => <div key={creator.id} className={`rise-in md:col-span-6 ${index % 3 === 1 ? "xl:col-span-5" : index % 3 === 2 ? "xl:col-span-3" : "xl:col-span-4"} ${index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}`}><CreatorCard creator={creator} /></div>)}</div>{filtered.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[.025] px-6 py-14 text-center"><Sparkles className="mx-auto text-[#d7b46a]" size={20} /><h3 className="display-font mt-4 text-3xl text-white">Nessuna traccia qui, per ora.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#a99daa]">Prova a togliere un filtro o a cercare un termine più morbido.</p><button type="button" onClick={() => { setQuery(""); setCategory("Tutto"); setSavedOnly(false); }} className="mt-5 text-xs font-extrabold uppercase tracking-[.12em] text-[#d7b46a] hover:text-white">Azzera filtri</button></div>}</section></main><footer className="container flex flex-col justify-between gap-3 border-t border-white/10 py-8 text-xs text-[#897d89] sm:flex-row"><span>Discovery curata da Velvet Hub</span><span>Le selezioni cambiano, i tuoi confini restano tuoi.</span></footer></div>;
}
