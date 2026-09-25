import { NextRequest, NextResponse } from "next/server";
import { launchGame, BigBangApiError } from "@/lib/bigbang";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  let body:{game_id?:number;language?:string};
  try{body=await req.json();}catch{return NextResponse.json({success:false,error:{code:400,message:"Corpo da requisição inválido."}},{status:400});}
  const gameId=Number(body.game_id);
  if(!Number.isInteger(gameId)||gameId<=0)return NextResponse.json({success:false,error:{code:400,message:"game_id é obrigatório."}},{status:400});
  try{
    const session=await getSession();
    const result=await launchGame({game_id:gameId,demo:process.env.BIGBANG_DEMO_MODE !== "false",language:body.language??"pt"});
    if(session){await db.gameSession.create({data:{userId:session.userId,gameId,externalSession:result.session_id??undefined,launchUrl:result.game_url,status:"OPEN"}}).catch(()=>null);}
    return NextResponse.json(result,{headers:{"Cache-Control":"no-store"}});
  }catch(err){if(err instanceof BigBangApiError)return NextResponse.json({success:false,error:{code:err.code??err.status,message:err.message}},{status:err.status});return NextResponse.json({success:false,error:{code:500,message:"Falha ao iniciar o jogo."}},{status:500});}
}
