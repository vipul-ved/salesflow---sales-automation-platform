import { prisma } from "./prisma";

export async function logAudit({
  organizationId,
  userId,
  action,
  entityType,
  entityId,
  oldData,
  newData,
  ipAddress,
}: {
  organizationId: string;
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  oldData?: any;
  newData?: any;
  ipAddress?: string | null;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        organizationId,
        userId: userId || null,
        action,
        entityType,
        entityId: entityId || null,
        oldData: oldData ? JSON.stringify(oldData) : null,
        newData: newData ? JSON.stringify(newData) : null,
        ipAddress: ipAddress || null,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
