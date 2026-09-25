/**
 * Cliente server-side da BigBang Casino.
 * A chave nunca deve ser exposta ao navegador.
 */

const BASE_URL = "https://api.bigbangcasino.bet/api/v1";

function getApiKey(): string {
  const key = process.env.BIGBANG_API_KEY;
  if (!key) throw new Error("BIGBANG_API_KEY não configurada. Defina a variável de ambiente no servidor.");
  return key;
}

export function isSandboxKey() {
  return (process.env.BIGBANG_API_KEY ?? "").startsWith("ek_test_");
}

export class BigBangApiError extends Error {
  status: number;
  code?: number;
  constructor(message:string,status:number,code?:number){super(message);this.name="BigBangApiError";this.status=status;this.code=code;}
}

async function bigbangFetch<T>(path:string, init?:RequestInit & {searchParams?:Record<string,string|number|undefined>}):Promise<T>{
  const url=new URL(BASE_URL+path);
  for(const [k,v] of Object.entries(init?.searchParams??{})) if(v!==undefined&&v!==null&&v!=="") url.searchParams.set(k,String(v));
  const res=await fetch(url.toString(),{
    ...init,
    headers:{"X-API-Key":getApiKey(),"Content-Type":"application/json",...(init?.headers??{})},
    next:{revalidate:path.startsWith("/games")?300:600},
  });
  let body:any;
  try{body=await res.json();}catch{throw new BigBangApiError("Resposta inválida do provedor de jogos.",res.status);}
  if(!res.ok||body?.success===false) throw new BigBangApiError(body?.error?.message??`Erro ${res.status} no provedor de jogos.`,res.status,body?.error?.code);
  return body;
}

export type GameType="slot"|"live"|"crash";
export interface BigBangGame{
  id:number; name:string; title:string; provider:string; category:string; category_title:string;
  thumbnail:string|null; mode:"standard"|"premium"; is_premium:boolean; game_type:GameType; is_demo?:boolean;
}
export interface BigBangCategory{id:number;name:string;slug:string;premium:boolean}
export interface LaunchResponse{success:true;game_url:string;session_id?:string;game_id:number;game_name:string;demo?:boolean;provider?:string}

export async function listGames(params:{
  category?:string;provider?:string;search?:string;type?:"standard"|"premium";limit?:number;offset?:number;
}){
  const limit=Math.min(100,Math.max(1,Number(params.limit??30)));
  const offset=Math.max(0,Number(params.offset??0));
  return bigbangFetch<{success:true;data:BigBangGame[];pagination:{total:number;limit:number;offset:number}}>("/games",{searchParams:{...params,limit,offset}});
}
export async function listCategories(){return bigbangFetch<{success:true;data:BigBangCategory[]}>("/categories");}
export async function launchGame(params:{game_id:number;user_token?:string;demo?:boolean;language?:string;return_url?:string}){
  return bigbangFetch<LaunchResponse>("/games/launch",{method:"POST",body:JSON.stringify(params)});
}
