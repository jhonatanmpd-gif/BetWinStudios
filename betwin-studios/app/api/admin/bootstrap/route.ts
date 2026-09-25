import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, setSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const setupKey = String(body.setupKey ?? "");
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY) return NextResponse.json({success:false,error:{message:"Chave de configuração inválida."}},{status:403});
    const admins = await db.user.count({where:{role:"ADMIN"}});
    if (admins > 0) return NextResponse.json({success:false,error:{message:"O administrador inicial já foi criado."}},{status:409});
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 10) return NextResponse.json({success:false,error:{message:"Use um e-mail válido e uma senha com pelo menos 10 caracteres."}},{status:400});
    const user = await db.user.create({data:{email,passwordHash:hashPassword(password),displayName:"Administrador",role:"ADMIN",wallet:{create:{balance:0}}},select:{id:true,email:true,role:true,status:true}});
    await setSession({userId:user.id,role:"ADMIN"});
    return NextResponse.json({success:true,user});
  } catch { return NextResponse.json({success:false,error:{message:"Não foi possível criar o administrador."}},{status:500}); }
}
