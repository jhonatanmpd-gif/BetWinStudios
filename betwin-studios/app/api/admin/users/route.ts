import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
export async function GET(req:NextRequest){try{await requireSession("ADMIN"); const q=req.nextUrl.searchParams.get("q")?.trim()||""; const users=await db.user.findMany({where:q?{OR:[{email:{contains:q,mode:"insensitive"}},{displayName:{contains:q,mode:"insensitive"}}]}:undefined,include:{wallet:true},orderBy:{createdAt:"desc"},take:100}); return NextResponse.json({success:true,users:users.map(u=>({id:u.id,email:u.email,displayName:u.displayName,role:u.role,status:u.status,balance:u.wallet?.balance.toString()??"0.00",createdAt:u.createdAt,lastLoginAt:u.lastLoginAt}))});}catch{return NextResponse.json({success:false},{status:401});}}
