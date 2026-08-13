"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Eraser } from 'lucide-react';

interface SignaturePadProps {
  onSignatureChange?: (signatureDataUrl: string | null) => void;
}

export function SignaturePad({ onSignatureChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // Resize canvas properly to avoid blurry lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = parent.clientWidth * 2;
        canvas.height = 150 * 2;
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `150px`;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(2, 2);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#1e293b'; // slate-800
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setIsEmpty(false);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    triggerChange();
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      // Clear considering the scaling
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsEmpty(true);
      if (onSignatureChange) {
        onSignatureChange(null);
      }
    }
  };

  const triggerChange = () => {
    if (onSignatureChange && canvasRef.current && !isEmpty) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      onSignatureChange(dataUrl);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full border border-slate-300 rounded-md overflow-hidden bg-white group">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full cursor-crosshair touch-none"
        />
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-slate-400 text-sm italic">Goreskan tanda tangan di sini</span>
          </div>
        )}
      </div>
      
      <button 
        onClick={clearSignature}
        disabled={isEmpty}
        className={`self-end flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded transition-colors ${isEmpty ? 'text-slate-400 cursor-not-allowed' : 'text-red-500 hover:bg-red-50'}`}
      >
        <Eraser className="w-3.5 h-3.5" />
        Hapus
      </button>
    </div>
  );
}
