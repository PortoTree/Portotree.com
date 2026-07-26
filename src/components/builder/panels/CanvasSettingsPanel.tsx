import React from "react";
import { Palette, X } from "lucide-react";
import { useBuilderState } from "../useBuilderState";

export function CanvasSettingsPanel({ state }: { state: any }) {
  const { sections, setSections, theme, setActivePanel } = state;

  // Temukan atau buat konfigurasi global-settings
  const globalSettingsIndex = sections.findIndex((s: any) => s.id === 'global-settings');
  const globalSettings = globalSettingsIndex >= 0 ? sections[globalSettingsIndex] : null;

  // Default values
  const config = globalSettings?.config || {
    bgType: 'solid',
    bgColor: '#F3F0EC',
    bgGradientType: 'linear',
    bgGradientAngle: 180,
    bgGradientColor1: '#ffffff',
    bgGradientLoc1: 0,
    bgGradientColor2: '#e83a65',
    bgGradientLoc2: 100,
    bgGradientRadialPos: 'center center'
  };

  const updateConfig = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    const newSection = {
      id: 'global-settings',
      type: 'CANVAS_SETTINGS' as any,
      config: newConfig,
      order: -1,
      isActive: true
    };

    if (globalSettingsIndex >= 0) {
      const newSections = [...sections];
      newSections[globalSettingsIndex] = newSection;
      setSections(newSections);
    } else {
      setSections([newSection, ...sections]);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Panel */}
      <div className={`p-4 shrink-0 flex items-center justify-between border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-500" />
          <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Canvas Settings</h2>
        </div>
        <button
          onClick={() => setActivePanel('library')}
          className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
          title="Tutup Pengaturan (Kembali ke Library)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 custom-scrollbar">
        {/* Tipe Background */}
        <div>
          <label className={`block text-[11px] font-bold mb-3 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>Tipe Background</label>
          <div className={`flex p-1 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'}`}>
            <button
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${config.bgType === 'solid' || !config.bgType ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm') : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-700')}`}
              onClick={() => updateConfig('bgType', 'solid')}
            >
              Solid Color
            </button>
            <button
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${config.bgType === 'gradient' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm') : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-700')}`}
              onClick={() => updateConfig('bgType', 'gradient')}
            >
              Gradient
            </button>
          </div>
        </div>

        {config.bgType === 'gradient' ? (
          <>
            {/* Gradient Type */}
            <div>
              <label className={`block text-[11px] font-bold mb-3 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>Tipe Gradient</label>
              <div className={`flex p-1 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                <button
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${config.bgGradientType === 'linear' || !config.bgGradientType ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm') : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-700')}`}
                  onClick={() => updateConfig('bgGradientType', 'linear')}
                >
                  Linear
                </button>
                <button
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${config.bgGradientType === 'radial' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm') : (theme === 'dark' ? 'text-zinc-400 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-700')}`}
                  onClick={() => updateConfig('bgGradientType', 'radial')}
                >
                  Radial
                </button>
              </div>
            </div>

            {config.bgGradientType === 'linear' || !config.bgGradientType ? (
              <div>
                <label className={`block text-[11px] font-bold mb-3 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>Sudut (Derajat)</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={config.bgGradientAngle ?? 180}
                    onChange={(e) => updateConfig('bgGradientAngle', parseInt(e.target.value))}
                    className="flex-1 accent-blue-600"
                  />
                  <div className={`text-xs font-mono w-10 text-right ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-600'}`}>{config.bgGradientAngle ?? 180}°</div>
                </div>
              </div>
            ) : (
              <div>
                <label className={`block text-[11px] font-bold mb-3 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>Posisi Pusat (Radial)</label>
                <select
                  value={config.bgGradientRadialPos || 'center center'}
                  onChange={(e) => updateConfig('bgGradientRadialPos', e.target.value)}
                  className={`w-full text-sm rounded-lg border px-3 py-2 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white focus:border-blue-500' : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'} focus:ring-1 focus:ring-blue-500 outline-none transition-all`}
                >
                  <option value="center center">Tengah</option>
                  <option value="top left">Kiri Atas</option>
                  <option value="top right">Kanan Atas</option>
                  <option value="bottom left">Kiri Bawah</option>
                  <option value="bottom right">Kanan Bawah</option>
                  <option value="center top">Tengah Atas</option>
                  <option value="center bottom">Tengah Bawah</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-[11px] font-bold mb-3 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>Warna 1</label>
                <input type="color" value={config.bgGradientColor1 || '#ffffff'} onChange={(e) => updateConfig('bgGradientColor1', e.target.value)} className="w-full h-10 rounded cursor-pointer" />
              </div>
              <div>
                <label className={`block text-[11px] font-bold mb-3 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>Warna 2</label>
                <input type="color" value={config.bgGradientColor2 || '#e83a65'} onChange={(e) => updateConfig('bgGradientColor2', e.target.value)} className="w-full h-10 rounded cursor-pointer" />
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className={`block text-[11px] font-bold mb-3 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>Warna Background</label>
            <input type="color" value={config.bgColor || '#F3F0EC'} onChange={(e) => updateConfig('bgColor', e.target.value)} className="w-full h-10 rounded cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
}
