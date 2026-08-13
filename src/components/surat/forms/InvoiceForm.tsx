import { useState } from "react";
import { ChevronDown, Building, User, ShoppingCart, CreditCard, FileText, Plus, Trash2, Image as ImageIcon, UploadCloud } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface InvoiceFormProps {
  formData: any;
  handleFormChange: (field: string, value: string) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
}

export function InvoiceForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
}: InvoiceFormProps) {
  const [expandedSection, setExpandedSection] = useState('perusahaan');

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

  const items = formData.invoiceItems ? JSON.parse(formData.invoiceItems) : [{ id: 1, name: '', quantity: 1, price: 0 }];

  const updateItem = (id: number, field: string, value: any) => {
    const newItems = items.map((item: any) => 
      item.id === id ? { ...item, [field]: value } : item
    );
    handleFormChange('invoiceItems', JSON.stringify(newItems));
  };

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((i: any) => i.id)) + 1 : 1;
    const newItems = [...items, { id: newId, name: '', quantity: 1, price: 0 }];
    handleFormChange('invoiceItems', JSON.stringify(newItems));
  };

  const removeItem = (id: number) => {
    const newItems = items.filter((item: any) => item.id !== id);
    handleFormChange('invoiceItems', JSON.stringify(newItems));
  };

  return (
    <div className="flex-1 flex flex-col p-4 gap-4 pb-32">
      
      {/* Section: Informasi Perusahaan */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'perusahaan' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button onClick={() => toggleSection('perusahaan')} className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'perusahaan' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <Building className={`w-4 h-4 ${expandedSection === 'perusahaan' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'perusahaan' ? 'text-white' : 'text-slate-700'}`}>Informasi Perusahaan</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'perusahaan' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'perusahaan' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 mb-2">
              <label className="text-[13px] font-medium text-slate-600">Logo Perusahaan (Opsional)</label>
              <div className="border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4 bg-white">
                <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 flex-shrink-0 overflow-hidden">
                  {formData.logoData ? (
                    <img src={formData.logoData} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-full p-1.5 shadow-sm">
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full items-center sm:items-start">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <ImageUpload 
                      onUploadSuccess={(url) => handleFormChange('logoData', url)}
                      customTrigger={
                        <Button size="sm" type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 font-medium">
                          <UploadCloud size={14} /> Pilih Foto
                        </Button>
                      }
                    />
                    <Button size="sm" type="button" variant="outline" onClick={() => handleFormChange('logoData', '')} className="text-red-500 border-red-200 bg-red-50 hover:bg-red-100 gap-1.5 font-medium">
                      <Trash2 size={14} /> Hapus
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight text-center sm:text-left">Format JPG atau PNG. Maksimum 5MB. Tarik & lepas atau klik untuk unggah.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Nama Perusahaan / Studio</label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: PT. Bintang Jaya" value={formData.companyName || ''} onChange={(e) => handleFormChange('companyName', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Telepon / Kontak</label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: 0812 3456 7890" value={formData.companyPhone || ''} onChange={(e) => handleFormChange('companyPhone', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Tanggal Invoice</label>
              <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.invoiceDate || ''} onChange={(e) => handleFormChange('invoiceDate', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Informasi Klien (Bill To) */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'klien' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button onClick={() => toggleSection('klien')} className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'klien' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <User className={`w-4 h-4 ${expandedSection === 'klien' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'klien' ? 'text-white' : 'text-slate-700'}`}>Informasi Klien (Bill To)</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'klien' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'klien' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Nama Klien</label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: Daniel Gallego" value={formData.clientName || ''} onChange={(e) => handleFormChange('clientName', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Alamat Klien</label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[60px] resize-none" placeholder="Alamat lengkap klien" value={formData.clientAddress || ''} onChange={(e) => handleFormChange('clientAddress', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Telepon Klien</label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: 0123 4567 8901" value={formData.clientPhone || ''} onChange={(e) => handleFormChange('clientPhone', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Daftar Produk/Item */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'items' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button onClick={() => toggleSection('items')} className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'items' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <ShoppingCart className={`w-4 h-4 ${expandedSection === 'items' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'items' ? 'text-white' : 'text-slate-700'}`}>Daftar Produk / Layanan</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'items' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'items' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 pb-2 border-b border-slate-100">
              <label className="text-[13px] font-medium text-slate-600">Mata Uang</label>
              <select value={formData.currency || 'IDR'} onChange={(e) => handleFormChange('currency', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                <option value="IDR">Rupiah (Rp)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">Poundsterling (£)</option>
                <option value="SGD">Singapore Dollar (S$)</option>
              </select>
            </div>
            {items.map((item: any, index: number) => (
              <div key={item.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50 relative flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Item #{index + 1}</span>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-slate-600">Nama Produk</label>
                  <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: Social Media Design" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-slate-600">Kuantitas</label>
                    <input type="number" className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} min="1" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-slate-600">Harga (Satuan)</label>
                    <input type="number" className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: 150000" value={item.price} onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)} min="0" />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addItem} variant="outline" className="w-full mt-2 flex items-center justify-center gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
              <Plus className="w-4 h-4" /> Tambah Item
            </Button>
          </div>
        )}
      </div>

      {/* Section: Metode Pembayaran */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'pembayaran' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button onClick={() => toggleSection('pembayaran')} className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'pembayaran' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <CreditCard className={`w-4 h-4 ${expandedSection === 'pembayaran' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'pembayaran' ? 'text-white' : 'text-slate-700'}`}>Metode Pembayaran</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'pembayaran' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'pembayaran' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Nama Bank / E-Wallet</label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: Bank BCA" value={formData.paymentBank || ''} onChange={(e) => handleFormChange('paymentBank', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Nama Pemilik Rekening</label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: Benjamin Shah" value={formData.paymentName || ''} onChange={(e) => handleFormChange('paymentName', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Nomor Rekening</label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh: 0123 4567 8901" value={formData.paymentNumber || ''} onChange={(e) => handleFormChange('paymentNumber', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Pajak & Tanda Tangan */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'pajak' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button onClick={() => toggleSection('pajak')} className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'pajak' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <FileText className={`w-4 h-4 ${expandedSection === 'pajak' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'pajak' ? 'text-white' : 'text-slate-700'}`}>Pajak & Tanda Tangan</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'pajak' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'pajak' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Pajak (Tax)</label>
              <input type="number" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Nominal pajak (misal: 5)" value={formData.taxAmount || ''} onChange={(e) => handleFormChange('taxAmount', e.target.value)} />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[13px] font-medium text-slate-600">Tanda Tangan</label>
              <SignaturePad onSignatureChange={setSignatureData} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">Nama Penanda Tangan (Opsional)</label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Kosongkan jika sama dengan nama perusahaan" value={formData.signatureName || ''} onChange={(e) => handleFormChange('signatureName', e.target.value)} />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
