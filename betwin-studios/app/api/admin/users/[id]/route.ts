import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireSession("ADMIN");
    const { id } = await params;
    const body = await req.json();
    const status = body.status === "BLOCKED" ? "BLOCKED" : body.status === "ACTIVE" ? "ACTIVE" : null;
    if (!status) return NextResponse.json({ success: false, error: { message: "Status inválido." } }, { status: 400 });
    const target = await db.user.findUnique({ where: { id } });
    if (!target) return NextResponse.json({ success: false, error: { message: "Usuário não encontrado." } }, { status: 404 });
    const user = await db.user.update({ where: { id }, data: { status } });
    await db.adminAudit.create({ data: { adminId: admin.userId, targetId: id, action: status === "BLOCKED" ? "USER_BLOCKED" : "USER_UNBLOCKED", metadata: { previousStatus: target.status } } });
    return NextResponse.json({ success: true, user: { id: user.id, status: user.status } });
  } catch {
    return NextResponse.json({ success: false, error: { message: "Não autorizado." } }, { status: 401 });
  }
}
