"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, ChevronDown, RotateCcw, Table as TableIcon, Search, X, ChevronUp } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className = "" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showAlign, setShowAlign] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const selectionRef = useRef<Range | null>(null);

  const [hasSelection, setHasSelection] = useState(false);
  const [hasFormatting, setHasFormatting] = useState(false);
  
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync value when changed externally (e.g. opening different items or resetting form)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      // Only overwrite if the editor is not currently focused to prevent cursor jumping while typing
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (
        selection && 
        selection.rangeCount > 0 && 
        !selection.isCollapsed && 
        editorRef.current?.contains(selection.anchorNode)
      ) {
        setHasSelection(true);
      } else {
        setHasSelection(false);
      }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const exec = (command: string, val: string | undefined = undefined) => {
    editorRef.current?.focus();
    
    let success = document.execCommand(command, false, val);
    
    if (!success && command === 'formatBlock' && val) {
      success = document.execCommand('formatBlock', false, `<${val.toUpperCase()}>`);
      if (!success) {
        success = document.execCommand('formatBlock', false, val.toUpperCase());
      }
    }

    // MANUAL FALLBACK: Jika formatBlock masih gagal atau browser aneh
    if (command === 'formatBlock' && val) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let node = selection.anchorNode;
        let blockFound = false;
        
        // Cari blok terdekat
        while (node && node !== editorRef.current) {
          if (node.nodeType === 1) { // Element Node
            const el = node as HTMLElement;
            const tag = el.tagName.toLowerCase();
            // Jika elemen adalah block
            if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'].includes(tag)) {
              blockFound = true;
              if (tag !== val.toLowerCase()) {
                const newEl = document.createElement(val);
                newEl.innerHTML = el.innerHTML;
                el.parentNode?.replaceChild(newEl, el);
                
                const newRange = document.createRange();
                newRange.selectNodeContents(newEl);
                selection.removeAllRanges();
                selection.addRange(newRange);
              }
              break;
            }
          }
          node = node.parentNode;
        }

        // Jika tidak ada block sama sekali (misal raw text), bungkus text node tersebut!
        if (!blockFound && selection.anchorNode) {
          const rawNode = selection.anchorNode;
          const newEl = document.createElement(val);
          // Kalau dia text node, kita ambil parent element (misal <b> atau langsung editor)
          const targetToWrap = rawNode.nodeType === 3 ? rawNode.parentElement : rawNode;
          
          if (targetToWrap === editorRef.current) {
             // Berarti raw text di dalam root editor
             newEl.textContent = rawNode.textContent;
             if (editorRef.current) {
               editorRef.current.replaceChild(newEl, rawNode);
             }
          } else if (targetToWrap) {
             // Bungkus elemen tersebut
             newEl.innerHTML = targetToWrap.innerHTML;
             targetToWrap.parentNode?.replaceChild(newEl, targetToWrap);
          }
        }
      }
    }

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      checkFormatting(html);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const text = e.clipboardData.getData('text/plain');
    
    // Auto-Format AI/Markdown to HTML
    let html = text;

    // Escape basic HTML to prevent XSS
    html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Headings
    html = html.replace(/^\s*###\s+(.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^\s*##\s+(.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^\s*#\s+(.*$)/gim, '<h1>$1</h1>');

    // LaTeX / Symbols
    html = html.replace(/\$\s*\\rightarrow\s*\$/g, '→');
    html = html.replace(/\$\s*\\leftarrow\s*\$/g, '←');
    html = html.replace(/\$\s*\\leftrightarrow\s*\$/g, '↔');
    html = html.replace(/\\rightarrow/g, '→');
    html = html.replace(/\\leftarrow/g, '←');

    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');
    html = html.replace(/__(.*?)__/g, '<b>$1</b>');
    html = html.replace(/_(.*?)_/g, '<i>$1</i>');

    // Code inline
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 rounded text-sm text-pink-600">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline">$1</a>');

    // Parse line by line for Lists and Tables
    const lines = html.split('\n');
    let inTable = false;
    let listType: 'ul' | 'ol' | null = null;
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Table parsing
      if (line.startsWith('|') && line.endsWith('|')) {
        if (listType) { result.push(`</${listType}>`); listType = null; }
        
        if (!inTable) {
          result.push('<table class="w-full border-collapse border border-slate-300 my-4"><tbody>');
          inTable = true;
        }
        // Skip separator row
        if (line.match(/^\|[\s-:]+\|/)) continue;
        
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        const cellHtml = cells.map(c => `<td class="border border-slate-300 p-2">${c}</td>`).join('');
        result.push(`<tr>${cellHtml}</tr>`);
        continue;
      } else if (inTable) {
        result.push('</tbody></table>');
        inTable = false;
      }

      // Unordered list
      if (line.match(/^[-*]\s+(.*)/)) {
        if (listType !== 'ul') {
          if (listType) result.push(`</${listType}>`);
          result.push('<ul class="list-disc pl-5 my-2">');
          listType = 'ul';
        }
        const textStr = line.replace(/^[-*]\s+(.*)/, '$1');
        result.push(`<li>${textStr}</li>`);
        continue;
      } 
      // Ordered list
      else if (line.match(/^\d+\.\s+(.*)/)) {
        if (listType !== 'ol') {
          if (listType) result.push(`</${listType}>`);
          result.push('<ol class="list-decimal pl-5 my-2">');
          listType = 'ol';
        }
        const textStr = line.replace(/^\d+\.\s+(.*)/, '$1');
        result.push(`<li>${textStr}</li>`);
        continue;
      }
      else if (listType) {
        result.push(`</${listType}>`);
        listType = null;
      }

      // Paragraphs
      if (line === '') {
        continue;
      } else if (!line.startsWith('<h') && !line.startsWith('<t') && !line.startsWith('<u') && !line.startsWith('<o')) {
        result.push(`<p>${line}</p>`);
      } else {
        result.push(line);
      }
    }

    if (inTable) result.push('</tbody></table>');
    if (listType) result.push(`</${listType}>`);

    const finalHtml = result.join('');
    document.execCommand('insertHTML', false, finalHtml);
  };

  const checkFormatting = (html: string) => {
    // Check if there are any formatting tags (b, i, a, or inline styles for alignment)
    const formatted = /<(b|i|a|u|strike|font|span|div style)[^>]*>/i.test(html) || /style="/i.test(html);
    setHasFormatting(formatted);
  };

  // Check formatting on mount/initial value
  useEffect(() => {
    checkFormatting(value || '');
  }, [value]);

  const handleReset = () => {
    if (editorRef.current) {
      if (hasSelection) {
        document.execCommand('removeFormat', false, undefined);
      } else {
        // Strip all HTML and keep plain text
        const text = editorRef.current.innerText || '';
        editorRef.current.innerHTML = '';
        document.execCommand('insertText', false, text);
        // Fallback if insertText fails (sometimes it does in older environments, but works in chrome)
        if (editorRef.current.innerHTML === '') {
          editorRef.current.innerText = text;
        }
      }
      const html = editorRef.current.innerHTML;
      onChange(html);
      checkFormatting(html);
      editorRef.current.focus();
    }
  };

  const handleOpenLinkModal = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedSelection(range);
      setLinkText(selection.toString());
    } else {
      setSavedSelection(null);
      setLinkText('');
    }
    setLinkUrl('https://');
    setShowLinkModal(true);
  };

  const handleAddLink = () => {
    if (!linkUrl || linkUrl === 'https://') {
      setShowLinkModal(false);
      return;
    }

    // Restore selection
    if (savedSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);
      }
    } else {
      editorRef.current?.focus();
    }

    if (linkText && savedSelection && savedSelection.toString() !== linkText) {
      const html = `<a href="${linkUrl}">${linkText}</a>`;
      exec('insertHTML', html);
    } else if (!savedSelection || savedSelection.toString() === '') {
      const html = `<a href="${linkUrl}">${linkText || linkUrl}</a>`;
      exec('insertHTML', html);
    } else {
      exec('createLink', linkUrl);
    }

    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handleSearch = (backward = false) => {
    if (!searchQuery) return;
    window.find(searchQuery, false, backward, true, false, false, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Auto-Format / Text Replacement (e.g., -> becomes →, $\rightarrow$ becomes →)
    if (e.key === ' ' || e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection && selection.focusNode && selection.focusNode.nodeType === Node.TEXT_NODE) {
        const node = selection.focusNode;
        const offset = selection.focusOffset;
        const text = node.textContent || '';
        const textBefore = text.slice(0, offset);
        
        const replacements: Record<string, string> = {
          '$\\rightarrow$': '→',
          '->': '→',
          '<-': '←',
          '<->': '↔',
          '=>': '⇒',
          '$\\leftarrow$': '←',
          '$\\leftrightarrow$': '↔',
        };
        
        for (const [key, value] of Object.entries(replacements)) {
          if (textBefore.endsWith(key)) {
            e.preventDefault(); // Mencegah spasi/enter default
            
            // Ubah text di dalam text node langsung
            node.textContent = textBefore.slice(0, -key.length) + value + text.slice(offset);
            
            // Perbaiki posisi kursor tepat setelah karakter yang diganti
            const newOffset = offset - key.length + value.length;
            const range = document.createRange();
            range.setStart(node, newOffset);
            range.setEnd(node, newOffset);
            selection.removeAllRanges();
            selection.addRange(range);
            
            // Lalu masukkan karakter pemicunya (spasi atau enter)
            if (e.key === ' ') {
              document.execCommand('insertText', false, ' ');
            } else if (e.key === 'Enter') {
              document.execCommand('insertParagraph', false);
            }
            
            if (editorRef.current) onChange(editorRef.current.innerHTML);
            return; // Hentikan eksekusi setelah melakukan auto-format
          }
        }
      }
    }

    if (e.ctrlKey || e.metaKey) {
      // Shortcuts for formatting block (Headings & Paragraph)
      if (e.altKey && e.key >= '0' && e.key <= '6') {
        e.preventDefault();
        const blockType = e.key === '0' ? 'p' : `h${e.key}`;
        exec('formatBlock', blockType);
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          if (hasSelection) exec('bold');
          break;
        case 'i':
          e.preventDefault();
          if (hasSelection) exec('italic');
          break;
        case 'k':
          e.preventDefault();
          if (hasSelection) handleOpenLinkModal();
          break;
        case 'f':
          e.preventDefault();
          setShowSearch(true);
          break;
      }
    }
  };

  return (
    <div className={`border border-slate-300 rounded-xl focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-shadow bg-white relative ${className}`}>
      <style>{`
        .rich-text-editor h1 { font-size: 2.25rem !important; line-height: 2.5rem !important; font-weight: 800 !important; margin-top: 2rem !important; margin-bottom: 1rem !important; }
        .rich-text-editor h2 { font-size: 1.875rem !important; line-height: 2.25rem !important; font-weight: 700 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important; }
        .rich-text-editor h3 { font-size: 1.5rem !important; line-height: 2rem !important; font-weight: 700 !important; margin-top: 1.5rem !important; margin-bottom: 0.5rem !important; }
        .rich-text-editor p { margin-top: 1rem !important; margin-bottom: 1rem !important; line-height: 1.75 !important; }
        .rich-text-editor:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block;
        }
      `}</style>
      <div className="flex items-center gap-1 border-b border-slate-200 p-2 text-slate-500 bg-slate-50/90 backdrop-blur flex-wrap sticky top-0 z-20 rounded-t-xl">
        <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', 'h1')} className="px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded transition-colors" title="Heading 1">H1</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', 'h2')} className="px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded transition-colors" title="Heading 2">H2</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', 'h3')} className="px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded transition-colors" title="Heading 3">H3</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', 'p')} className="px-2 py-1 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded transition-colors" title="Normal Text (Paragraph)">P</button>
        </div>
        
        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>

        <button type="button" disabled={!hasSelection} onClick={() => exec('bold')} className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" title="Bold (Ctrl+B)">
          <Bold size={16} />
        </button>
        <button type="button" disabled={!hasSelection} onClick={() => exec('italic')} className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" title="Italic (Ctrl+I)">
          <Italic size={16} />
        </button>
        
        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
        
        <button type="button" disabled={!hasSelection} onClick={handleOpenLinkModal} className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" title="Link (Ctrl+K)">
          <LinkIcon size={16} />
        </button>
        
        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
        
        <div className="relative">
          <button 
            type="button" 
            disabled={!hasSelection}
            onClick={() => setShowAlign(!showAlign)} 
            onBlur={() => setTimeout(() => setShowAlign(false), 200)}
            className="flex items-center gap-0.5 p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" 
            title="Text Alignment"
          >
            <AlignLeft size={16} />
            <ChevronDown size={14} className="opacity-50" />
          </button>
          
          {showAlign && (
            <div className="absolute top-full mt-1 bg-white border border-slate-200 shadow-md rounded-lg p-1 flex flex-col gap-1 z-10 w-10">
              <button type="button" onClick={() => exec('justifyLeft')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 flex items-center justify-center">
                <AlignLeft size={16} />
              </button>
              <button type="button" onClick={() => exec('justifyCenter')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 flex items-center justify-center">
                <AlignCenter size={16} />
              </button>
              <button type="button" onClick={() => exec('justifyRight')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 flex items-center justify-center">
                <AlignRight size={16} />
              </button>
              <button type="button" onClick={() => exec('justifyFull')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 flex items-center justify-center">
                <AlignJustify size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>

        <button type="button" disabled={!hasFormatting} onClick={handleReset} className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" title="Reset Format">
          <RotateCcw size={16} />
        </button>
        
        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>

        <button 
          type="button" 
          onClick={() => {
            const tableHTML = `<table class="w-full border-collapse border border-slate-300 my-4"><tbody><tr><td class="border border-slate-300 p-2">Kolom 1</td><td class="border border-slate-300 p-2">Kolom 2</td></tr><tr><td class="border border-slate-300 p-2">Data 1</td><td class="border border-slate-300 p-2">Data 2</td></tr></tbody></table><p><br></p>`;
            exec('insertHTML', tableHTML);
          }} 
          className="p-1.5 hover:bg-slate-200 rounded transition-colors text-slate-600" 
          title="Sisipkan Tabel"
        >
          <TableIcon size={16} />
        </button>

        <button 
          type="button" 
          onClick={() => setShowSearch(!showSearch)} 
          className={`p-1.5 rounded transition-colors text-slate-600 ml-auto ${showSearch ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-slate-200'}`} 
          title="Cari (Ctrl+F)"
        >
          <Search size={16} />
        </button>
      </div>

      {/* Search Bar UI */}
      {showSearch && (
        <div className="flex items-center gap-2 p-2 border-b border-slate-200 bg-emerald-50/50 text-sm animate-in fade-in slide-in-from-top-2">
          <Search className="w-4 h-4 text-emerald-600 ml-1" />
          <input 
            autoFocus
            type="text" 
            placeholder="Ketik untuk mencari kata..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Opsional: auto cari saat ngetik bisa pakai debounce, tapi manual tekan enter lebih aman di contenteditable
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(e.shiftKey);
              }
              if (e.key === 'Escape') {
                setShowSearch(false);
              }
            }}
            className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium px-2"
          />
          <div className="flex items-center gap-1 mr-1">
            <button type="button" onClick={() => handleSearch(true)} className="p-1.5 hover:bg-white hover:shadow-sm rounded text-slate-600 transition-all" title="Cari Sebelumnya (Shift+Enter)">
              <ChevronUp size={16} />
            </button>
            <button type="button" onClick={() => handleSearch(false)} className="p-1.5 hover:bg-white hover:shadow-sm rounded text-slate-600 transition-all" title="Cari Selanjutnya (Enter)">
              <ChevronDown size={16} />
            </button>
            <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
            <button type="button" onClick={() => setShowSearch(false)} className="p-1.5 hover:bg-red-100 hover:text-red-600 rounded text-slate-500 transition-colors" title="Tutup Pencarian (Esc)">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        className="rich-text-editor prose prose-slate max-w-none p-4 min-h-[120px] outline-none
          prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900
          prose-p:leading-relaxed prose-p:text-slate-600
          prose-li:text-slate-600
          prose-img:rounded-2xl prose-img:shadow-lg
          prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
          prose-li:marker:text-emerald-500
          prose-a:text-emerald-600 prose-a:underline prose-a:decoration-emerald-600/30 prose-a:underline-offset-4 prose-a:font-bold hover:prose-a:text-emerald-800 hover:prose-a:decoration-emerald-800"
        data-placeholder={placeholder}
      />
      
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">Tambah Link</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600">Teks Link</label>
                <input 
                  type="text" 
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddLink();
                    }
                  }}
                  className="w-full border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 outline-none text-slate-700 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600">URL</label>
                <input 
                  type="url" 
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddLink();
                    }
                  }}
                  className="w-full border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 outline-none text-slate-700 text-sm"
                />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
              <button 
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium"
              >
                Batal
              </button>
              <button 
                type="button"
                onClick={handleAddLink}
                className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
              >
                Tambah Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
