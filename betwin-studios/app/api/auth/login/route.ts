import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { setSession, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body=await req.json(); const email=String(body.email??"").trim().toLowerCase(); const password=String(body.password??"");
    const user=await db.user.findUnique({where:{email}});
    if(!user || !verifyPassword(password,user.passwordHash)) return NextResponse.json({success:false,error:{message:"E-mail ou senha inválidos."}}, {status:401});
    if(user.status !== "ACTIVE") return NextResponse.json({success:false,error:{message:"Esta conta está bloqueada."}}, {status:403});
    await db.user.update({where:{id:user.id},data:{lastLoginAt:new Date()}});
    await setSession({userId:user.id,role:user.role});
    return NextResponse.json({success:true,user:{id:user.id,email:user.email,displayName:user.displayName,role:user.role}});
  } catch { return NextResponse.json({success:false,error:{message:"Não foi possível entrar."}}, {status:500}); }
}
