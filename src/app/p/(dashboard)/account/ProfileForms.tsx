"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfileData } from "@/app/actions/profile";
import { useUI } from "@/components/ui/UIProvider";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function ProfilePersonalForm({ data, onSave, onCancel }: { data: any, onSave: (d: any) => void, onCancel: () => void }) {
  const [form, setForm] = useState({
    fullName: data?.fullName || data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    dateOfBirth: data?.dateOfBirth || "",
    nationality: data?.nationality || "",
    gender: data?.gender || "",
    address: data?.address || ""
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useUI();

  const handleSave = async () => {
    setLoading(true);
    const fName = form.fullName.trim().split(' ')[0] || '';
    const lName = form.fullName.trim().split(' ').slice(1).join(' ') || '';
    
    const mergedData = { 
      ...data, 
      ...form,
      name: form.fullName,       // For compatibility with builders
      firstName: fName,
      lastName: lName
    };
    const res = await updateProfileData('personal', mergedData);
    setLoading(false);
    if (res.success) {
      showToast("Data Personal berhasil disimpan!");
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('dashboard_cv_cache');
        sessionStorage.removeItem('storefront_sections');
      }
      onSave(mergedData);
    } else {
      showToast("Gagal menyimpan data: " + res.error, "error");
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-slate-200 rounded-xl p-5 bg-slate-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Nama Lengkap</label>
          <Input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder="Masukkan nama" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Email</label>
          <Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Masukkan email" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Nomor Telepon</label>
          <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Contoh: 0812..." />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Tanggal Lahir</label>
          <Input value={form.dateOfBirth} onChange={e => setForm({...form, dateOfBirth: e.target.value})} placeholder="Contoh: Jakarta, 1 Januari 2000" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Kewarganegaraan</label>
          <Input value={form.nationality} onChange={e => setForm({...form, nationality: e.target.value})} placeholder="WNI / WNA" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Jenis Kelamin</label>
          <select 
            value={form.gender} 
            onChange={e => setForm({...form, gender: e.target.value})}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white"
          >
            <option value="">Pilih...</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Alamat</label>
          <Input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Alamat lengkap" />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200">
        <Button variant="outline" onClick={onCancel}>Batal</Button>
        <Button onClick={handleSave} disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</Button>
      </div>
    </div>
  );
}

export function ProfileEducationForm({ items, onSave, onCancel }: { items: any[], onSave: (d: any[]) => void, onCancel: () => void }) {
  const [list, setList] = useState<any[]>(items || []);
  const [loading, setLoading] = useState(false);
  const { showToast } = useUI();

  const handleSave = async () => {
    setLoading(true);
    const res = await updateProfileData('education', list);
    setLoading(false);
    if (res.success) {
      showToast("Data Pendidikan berhasil disimpan!");
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('dashboard_cv_cache');
        sessionStorage.removeItem('storefront_sections');
      }
      onSave(list);
    } else {
      showToast("Gagal menyimpan data: " + res.error, "error");
    }
  };

  const addItem = () => {
    setList([...list, { school: "", degree: "", startDate: "", endDate: "", description: "" }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newList = [...list];
    newList[index] = { ...newList[index], [field]: value };
    setList(newList);
  };

  const removeItem = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4 border border-slate-200 rounded-xl p-5 bg-slate-50">
      {list.map((item, index) => (
        <div key={index} className="flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-lg relative">
          <button onClick={() => removeItem(index)} className="absolute top-3 right-3 text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Institusi / Sekolah</label>
              <Input value={item.school} onChange={e => updateItem(index, 'school', e.target.value)} placeholder="Nama institusi" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Gelar / Jurusan</label>
              <Input value={item.degree} onChange={e => updateItem(index, 'degree', e.target.value)} placeholder="Gelar/Jurusan" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Tanggal Mulai</label>
              <Input value={item.startDate} onChange={e => updateItem(index, 'startDate', e.target.value)} placeholder="Contoh: Jul 2018" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Tanggal Selesai</label>
              <Input value={item.endDate} onChange={e => updateItem(index, 'endDate', e.target.value)} placeholder="Contoh: Agu 2022" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Deskripsi (Opsional)</label>
              <Textarea value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} placeholder="Deskripsi atau pencapaian" className="min-h-[80px]" />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="border-dashed" onClick={addItem}>
        <Plus className="w-4 h-4 mr-2" /> Tambah Pendidikan
      </Button>
      
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200">
        <Button variant="outline" onClick={onCancel}>Batal</Button>
        <Button onClick={handleSave} disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</Button>
      </div>
    </div>
  );
}

export function ProfileExperienceForm({ items, onSave, onCancel }: { items: any[], onSave: (d: any[]) => void, onCancel: () => void }) {
  const [list, setList] = useState<any[]>(items || []);
  const [loading, setLoading] = useState(false);
  const { showToast } = useUI();

  const handleSave = async () => {
    setLoading(true);
    const res = await updateProfileData('experience', list);
    setLoading(false);
    if (res.success) {
      showToast("Data Pengalaman berhasil disimpan!");
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('dashboard_cv_cache');
        sessionStorage.removeItem('storefront_sections');
      }
      onSave(list);
    } else {
      showToast("Gagal menyimpan data: " + res.error, "error");
    }
  };

  const addItem = () => {
    setList([...list, { company: "", position: "", startDate: "", endDate: "", description: "" }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newList = [...list];
    newList[index] = { ...newList[index], [field]: value };
    setList(newList);
  };

  const removeItem = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4 border border-slate-200 rounded-xl p-5 bg-slate-50">
      {list.map((item, index) => (
        <div key={index} className="flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-lg relative">
          <button onClick={() => removeItem(index)} className="absolute top-3 right-3 text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Posisi / Jabatan</label>
              <Input value={item.position} onChange={e => updateItem(index, 'position', e.target.value)} placeholder="Contoh: Software Engineer" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Nama Perusahaan</label>
              <Input value={item.company} onChange={e => updateItem(index, 'company', e.target.value)} placeholder="Nama perusahaan" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Tanggal Mulai</label>
              <Input value={item.startDate} onChange={e => updateItem(index, 'startDate', e.target.value)} placeholder="Contoh: Jan 2021" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Tanggal Selesai</label>
              <Input value={item.endDate} onChange={e => updateItem(index, 'endDate', e.target.value)} placeholder="Contoh: Saat ini" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Deskripsi Tugas</label>
              <Textarea value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} placeholder="Jelaskan tanggung jawab dan pencapaian" className="min-h-[80px]" />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="border-dashed" onClick={addItem}>
        <Plus className="w-4 h-4 mr-2" /> Tambah Pengalaman
      </Button>
      
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200">
        <Button variant="outline" onClick={onCancel}>Batal</Button>
        <Button onClick={handleSave} disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</Button>
      </div>
    </div>
  );
}
