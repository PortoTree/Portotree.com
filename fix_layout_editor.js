const fs = require('fs');
let text = fs.readFileSync('C:/PortoTree/src/components/builder/panels/editor/LayoutTabEditor.tsx', 'utf8');

// Insert BUTTON Action Type
const buttonSettingsSearch = `{/* Baris Teks (Khusus BUTTON) */}`;
const buttonSettingsReplace = `
                                    {/* Action Type (WhatsApp / Gmail) */}
                                    <div className="flex flex-col gap-1.5">
                                      <label className="text-[11px] font-medium text-zinc-400">Tipe Aksi Tombol</label>
                                      <select
                                        className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500/50 transition-colors"
                                        value={activeElement.config.actionType || 'link'}
                                        onChange={(e) => updateElement(activeElement.id, { actionType: e.target.value })}
                                      >
                                        <option value="link">Link Biasa</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="gmail">Gmail</option>
                                      </select>
                                    </div>

                                    {/* Validasi Link */}
                                    {activeElement.config.actionType === 'gmail' && (!activeElement.config.link || !activeElement.config.link.includes('@')) && (
                                      <div className="text-[10px] text-red-400 mt-1">
                                        Email tidak valid. Wajib mengandung '@'.
                                      </div>
                                    )}
                                    {activeElement.config.actionType === 'whatsapp' && (
                                      <div className="text-[10px] text-amber-400 mt-1">
                                        Masukkan nomor telepon saja (contoh: 628123456789). Sistem akan mengarahkan ke wa.me.
                                      </div>
                                    )}
                                    
                                    {/* Baris Teks (Khusus BUTTON) */}`;
text = text.replace(buttonSettingsSearch, buttonSettingsReplace);

// Insert NAVIGATION specific controls
const gallerySearch = `{/* GALLERY Layouts */}`;
const navigationReplace = `
                                  {/* NAVIGATION Tata Letak */}
                                  {activeElement.type === 'NAVIGATION' && (
                                    <div className="space-y-4 text-zinc-300 mt-4 border-t border-zinc-800/50 pt-4">
                                      <div className="flex items-center justify-between">
                                        <label className="text-[11px] font-medium text-zinc-400">Tampilkan Navigasi</label>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                          <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={activeElement.config.showNavigation !== false}
                                            onChange={(e) => updateElement(activeElement.id, { showNavigation: e.target.checked })}
                                          />
                                          <div className="w-7 h-4 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-500"></div>
                                        </label>
                                      </div>
                                      <div className="text-[10px] text-zinc-500">
                                        Navigasi akan otomatis mendeteksi semua section di kanvas yang aktif.
                                      </div>
                                    </div>
                                  )}

                                  {/* GALLERY Layouts */}`;
text = text.replace(gallerySearch, navigationReplace);

fs.writeFileSync('C:/PortoTree/src/components/builder/panels/editor/LayoutTabEditor.tsx', text);
