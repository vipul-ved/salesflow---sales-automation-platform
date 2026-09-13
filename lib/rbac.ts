// Role-Based Access Control (RBAC) matrix for SalesFlow AI
// Roles: OWNER > ADMIN > MANAGER > SALES_AGENT > VIEWER

export type Role = "OWNER" | "ADMIN" | "MANAGER" | "SALES_AGENT" | "VIEWER";

const ROLE_RANK: Record<Role, number> = {
  OWNER: 5,
  ADMIN: 4,
  MANAGER: 3,
  SALES_AGENT: 2,
  VIEWER: 1,
};

export function hasPermission(userRole: string, requiredRole: Role): boolean {
  const userRank = ROLE_RANK[userRole as Role] || 0;
  const requiredRank = ROLE_RANK[requiredRole];
  return userRank >= requiredRank;
}

export function canManageUsers(userRole: string): boolean {
  return hasPermission(userRole, "ADMIN");
}

export function canManageBilling(userRole: string): boolean {
  return hasPermission(userRole, "OWNER");
}

export function canManageWorkflows(userRole: string): boolean {
  return hasPermission(userRole, "MANAGER");
}

export function canEditRecord(userRole: string, recordOwnerId?: string | null, currentUserId?: string): boolean {
  if (hasPermission(userRole, "MANAGER")) return true; // Managers+ can edit any record in org
  if (userRole === "SALES_AGENT" && recordOwnerId === currentUserId) return true;
  return false;
}

export function canDeleteRecord(userRole: string): boolean {
  return hasPermission(userRole, "MANAGER");
}
