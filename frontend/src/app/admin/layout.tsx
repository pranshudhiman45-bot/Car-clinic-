import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
