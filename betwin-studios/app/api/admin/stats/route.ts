import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireSession("ADMIN");
    const [users, active, blocked, transactions, balance, pendingDeposits, depositsToday] = await Promise.all([
      db.user.count(),
      db.user.count({ where: { status: "ACTIVE" } }),
      db.user.count({ where: { status: "BLOCKED" } }),
      db.transaction.count(),
      db.wallet.aggregate({ _sum: { balance: true } }),
      db.paymentIntent.aggregate({ where: { type: "DEPOSIT", status: "PENDING" }, _sum: { amount: true }, _count: { _all: true } }),
      db.transaction.aggregate({ where: { type: "DEPOSIT", status: "COMPLETED", createdAt: { gte: new Date(new Date().setHours(0,0,0,0)) } }, _sum: { amount: true } }),
    ]);
    return NextResponse.json({ success: true, stats: {
      users, active, blocked, transactions,
      totalBalance: balance._sum.balance?.toString() ?? "0.00",
      pendingDeposits: pendingDeposits._count._all,
      pendingDepositAmount: pendingDeposits._sum.amount?.toString() ?? "0.00",
      depositsToday: depositsToday._sum.amount?.toString() ?? "0.00",
    }});
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
