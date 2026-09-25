"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type LaunchState = {status:"loading"}|{status:"ready";url:string;gameName:string}|{status:"error";message:string};

export default function PlayPage() {
  const params=useParams<{id:string}>();
  const [state,setState]=useState<LaunchState>({status:"loading"});

  useEffect(()=>{let cancelled=false;
    async function launch(){
      setState({status:"loading"});
      try{
        const res=await fetch("/api/launch",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({game_id:Number(params.id),language:"pt"})});
        const body=await res.json();
        if(cancelled)return;
        if(!res.ok||!body.success){setState({status:"error",message:body?.error?.message??"Não foi possível abrir este jogo agora."});return;}
        setState({status:"ready",url:body.game_url,gameName:body.game_name});
      }catch{if(!cancelled)setState({status:"error",message:"Falha de conexão ao iniciar o jogo. Tente novamente."});}
    }
    launch(); return()=>{cancelled=true};
  },[params.id]);

  return <div className="container-page py-6 sm:py-8">
    <div className="mb-4 flex items-center justify-between gap-3">
      <Link href="/games" className="text-sm font-semibold text-ink-muted hover:text-gold">← Voltar ao catálogo</Link>
      <span className="rounded-full border border-base-line bg-base-surface px-3 py-1 text-xs font-medium text-ink-muted">BETWIN STUDIOS</span>
    </div>
    <div className="overflow-hidden rounded-2xl border border-base-line bg-black shadow-2xl shadow-black/30">
      <div className="aspect-video min-h-[520px] w-full">
        {state.status==="loading" && <div className="flex h-full flex-col items-center justify-center gap-3 text-ink-muted"><span className="h-9 w-9 animate-spin rounded-full border-2 border-base-line border-t-gold"/><p className="text-sm">Abrindo o jogo…</p></div>}
        {state.status==="error" && <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center"><p className="font-display text-xl text-ink">Não foi possível abrir</p><p className="max-w-md text-sm text-ink-muted">{state.message}</p><Link href="/games" className="mt-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-base">Voltar aos jogos</Link></div>}
        {state.status==="ready" && <iframe src={state.url} title={state.gameName} allow="autoplay; fullscreen; gamepad" className="h-full w-full border-0"/>}
      </div>
    </div>
  </div>;
}
