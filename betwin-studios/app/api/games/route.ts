import { NextRequest, NextResponse } from "next/server";
import { listGames, BigBangApiError } from "@/lib/bigbang";

export async function GET(req:NextRequest){
  const sp=req.nextUrl.searchParams;
  const limit=Math.min(100,Math.max(1,Number(sp.get("limit")??30)||30));
  const offset=Math.max(0,Number(sp.get("offset")??0)||0);
  try{
    const result=await listGames({
      category:sp.get("category")??undefined,
      provider:sp.get("provider")??undefined,
      search:sp.get("search")??undefined,
      type:(sp.get("type") as "standard"|"premium"|null)??undefined,
      limit,offset,
    });
    return NextResponse.json(result,{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=900"}});
  }catch(err){
    if(err instanceof BigBangApiError) return NextResponse.json({success:false,error:{code:err.code??err.status,message:err.message}},{status:err.status});
    return NextResponse.json({success:false,error:{code:500,message:"Falha ao buscar o catálogo."}},{status:500});
  }
}
