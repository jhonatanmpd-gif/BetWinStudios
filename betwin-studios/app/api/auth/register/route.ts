import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, setSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const displayName = String(body.displayName ?? "").trim().slice(0, 80) || null;
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return NextResponse.json({ success:false, error:{message:"Informe um e-mail válido e uma senha com pelo menos 8 caracteres."}}, {status:400});
    const exists = await db.user.findUnique({ where:{email} });
    if (exists) return NextResponse.json({ success:false, error:{message:"Este e-mail já está cadastrado."}}, {status:409});
    const user = await db.user.create({ data:{email, displayName, passwordHash:hashPassword(password), wallet:{create:{balance:0}}}, select:{id:true,email:true,displayName:true,role:true,status:true} });
    await setSession({userId:user.id, role:user.role});
    return NextResponse.json({success:true,user});
  } catch { return NextResponse.json({success:false,error:{message:"Não foi possível criar a conta."}}, {status:500}); }
}
