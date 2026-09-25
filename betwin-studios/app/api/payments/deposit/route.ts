import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, error: { message: "Faça login para continuar." } }, { status: 401 });
    const body = await req.json();
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
      return NextResponse.json({ success: false, error: { message: "Valor de depósito inválido." } }, { status: 400 });
    }
    const payment = await db.paymentIntent.create({
      data: { userId: session.userId, amount, type: "DEPOSIT", status: "PENDING", provider: "PENDING_GATEWAY", metadata: { integrationReady: true } },
    });
    return NextResponse.json({ success: true, payment: { id: payment.id, amount: payment.amount.toString(), status: payment.status, provider: payment.provider } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: { message: "Não foi possível criar a solicitação." } }, { status: 500 });
  }
}
