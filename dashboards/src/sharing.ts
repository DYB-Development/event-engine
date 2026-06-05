import type { Dashboard } from "./dashboard";

export type Visibility =
  | "private"
  | "in_account"
  | "account_wide"
  | "external";

export interface Principal {
  userId: string;
  accountId: string;
}

export interface SharedDashboard {
  dashboard: Dashboard;
  owner: Principal;
  visibility: Visibility;
  sharedWith?: string[];
}

export function canView(shared: SharedDashboard, viewer: Principal): boolean {
  return viewer.userId === shared.owner.userId;
}
