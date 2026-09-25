import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireSession("ADMIN");
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as any;
    const status = searchParams.get("status") as any;
    const take = Math.min(Math.max(Number(searchParams.get("take") || 100), 1), 200);
    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;
    const payments = await db.paymentIntent.findMany({
      where,
      include:{user:{select:{email:true,displayName:true}}},
      orderBy:{createdAt:"desc"}, take
    });
    return NextResponse.json({ success:true, payments:payments.map(p=>({
      id:p.id,type:p.type,status:p.status,provider:p.provider,amount:p.amount.toString(),
      currency:p.currency,externalId:p.externalId,user:p.user,createdAt:p.createdAt,expiresAt:p.expiresAt
    })) });
  } catch { return NextResponse.json({ success:false }, { status:401 }); }
}
