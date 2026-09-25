import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireSession("ADMIN");
    const settlements = await db.platformSettlement.findMany({orderBy:{createdAt:"desc"}, take:100});
    return NextResponse.json({success:true, settlements: settlements.map(x=>({...x, amount:x.amount.toString()}))});
  } catch { return NextResponse.json({success:false},{status:401}); }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession("ADMIN");
    const body = await req.json();
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0 || amount > 100000000) {
      return NextResponse.json({success:false,error:{message:"Valor inválido."}},{status:400});
    }
    const settlement = await db.platformSettlement.create({
      data:{
        amount,
        currency:"BRL",
        provider:"PENDING_GATEWAY",
        destination: typeof body.destination === "string" ? body.destination.slice(0,160) : null,
        requestedBy: session.userId,
        metadata:{requiresProviderIntegration:true}
      }
    });
    await db.adminAudit.create({data:{
      adminId:session.userId,
      action:"PLATFORM_SETTLEMENT_REQUESTED",
      metadata:{settlementId:settlement.id,amount:amount.toFixed(2)}
    }});
    return NextResponse.json({success:true,settlement:{...settlement,amount:settlement.amount.toString()}},{status:201});
  } catch { return NextResponse.json({success:false,error:{message:"Não foi possível criar a solicitação."}},{status:500}); }
}
