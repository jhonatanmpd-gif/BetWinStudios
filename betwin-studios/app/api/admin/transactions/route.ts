import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireSession("ADMIN");
    const type = req.nextUrl.searchParams.get("type") || undefined;
    const rows = await db.transaction.findMany({
      where: type ? { type: type as any } : undefined,
      include: { user: { select: { email: true, displayName: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ success: true, transactions: rows.map(t => ({ id:t.id, type:t.type, status:t.status, amount:t.amount.toString(), currency:t.currency, user:t.user, createdAt:t.createdAt, externalId:t.externalId })) });
  } catch { return NextResponse.json({ success:false }, { status:401 }); }
}
