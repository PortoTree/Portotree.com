import { getAllAnnouncements } from "@/app/actions/announcements";
import BroadcastClient from "./BroadcastClient";

export default async function BroadcastPage() {
  const { data: initialData = [] } = await getAllAnnouncements();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Broadcast Info</h1>
        <p className="text-slate-500 text-sm mt-1">
          Kelola pengumuman, promo, dan fitur baru yang akan tampil di Dashboard seluruh User.
        </p>
      </div>

      <BroadcastClient initialData={initialData} />
    </div>
  );
}
