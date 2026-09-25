import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
export async function GET(){ const s=await getSession(); if(!s)return NextResponse.json({authenticated:false}); const user=await db.user.findUnique({where:{id:s.userId},include:{wallet:true}}); if(!user)return NextResponse.json({authenticated:false}); return NextResponse.json({authenticated:true,user:{id:user.id,email:user.email,displayName:user.displayName,role:user.role,status:user.status},wallet:{balance:user.wallet?.balance.toString()??"0.00",currency:user.wallet?.currency??"BRL"}}); }
