import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Info, Loader2, Lightbulb, CheckCircle2, X } from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

export const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleCaptureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      processImage(file);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (file: File) => {
    setScanning(true);
    setResult(null);

    try {
      const base64 = await fileToBase64(file);
      const mimeType = file.type;

      const response = await fetch('/api/ai/identify-pest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: base64.split(',')[1], // Remove the data:image/png;base64, part
          mimeType 
        }),
      });
      
      const data = await response.json();
      setResult(data.analysis);
    } catch (err) {
      console.error('Scan error:', err);
      setResult("### ⚠️ Connection Error\nUnable to reach the AI diagnostics server. Please check your internet connection and try again.");
    } finally {
      setScanning(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const commonPests = [
    { name: 'Aphids', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=300' },
    { name: 'Locusts', image: 'https://images.unsplash.com/photo-1545129139-1beb780af307?auto=format&fit=crop&q=80&w=300' },
    { name: 'Whitefly', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=300' }
  ];

  return (
    <div className="min-h-screen pt-20 px-6 flex flex-col gap-8 max-w-2xl mx-auto pb-40">
      <Header title="Diagnostics" showBack />

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
      />

      {/* Header Info */}
      <section className="flex flex-col gap-2">
         <h2 className="text-3xl font-display font-black text-agri-primary tracking-tighter uppercase">Visual Diagnosis</h2>
         <p className="text-sm font-medium text-zinc-500 uppercase tracking-tight">Point your camera at the affected area for instant AI identification.</p>
      </section>

      {/* Viewfinder Module */}
      <section className="relative aspect-square w-full bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10 group">
        <div className="absolute inset-0 z-10 p-8 flex flex-col pointer-events-none">
          {/* HUD Brackets */}
          <div className="flex-1 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-3xl m-4 transition-all group-hover:scale-105" />
          <div className="flex-1 border-t-2 border-r-2 border-emerald-500/40 rounded-tr-3xl m-4 absolute top-8 right-8 w-24 h-24" />
          <div className="flex-1 border-b-2 border-l-2 border-emerald-500/40 rounded-bl-3xl m-4 absolute bottom-8 left-8 w-24 h-24" />
          <div className="flex-1 border-b-2 border-r-2 border-emerald-500/40 rounded-br-3xl m-4 absolute bottom-8 right-8 w-24 h-24" />
          
          {/* Scanning Effect */}
          {scanning && (
            <div className="absolute inset-x-0 top-0 h-[3px] bg-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,1)] animate-scan z-20" />
          )}
          
          {/* Status Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
             {!scanning && !result && !previewUrl && (
               <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               </div>
             )}
          </div>
        </div>

        <img 
          className={cn(
            "w-full h-full object-cover transition-all duration-700", 
            !previewUrl && "grayscale opacity-60",
            scanning && "blur-sm scale-110"
          )} 
          src={previewUrl || "https://images.unsplash.com/photo-1597362871122-391307457ef6?auto=format&fit=crop&q=80&w=1000"} 
          alt="Plant diagnostic" 
        />

        {/* Floating Controls */}
        <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10">
           <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none">Diagnostic Link</span>
              <span className="text-xs font-bold text-white uppercase">{scanning ? 'Analyzing Sequence...' : previewUrl ? 'Image Captured' : 'Live Feed Ready'}</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-black text-white uppercase">HD</span>
           </div>
        </div>

        {/* Results Overlay */}
        {result && (
          <div className="absolute inset-0 bg-agri-primary/95 backdrop-blur-3xl z-30 p-8 flex flex-col pt-12 text-white">
            <button 
              onClick={() => {
                setResult(null);
                setPreviewUrl(null);
              }}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 shadow-xl ring-1 ring-white/20">
                 <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-black uppercase tracking-tight">Diagnosis Report</h3>
              <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Scientific AI Analysis</p>
            </div>
            
            <div className="flex-1 bg-black/20 p-6 rounded-3xl border border-white/10 overflow-y-auto text-sm font-medium leading-relaxed scrollbar-hide">
              <div className="markdown-body prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </div>

            <Button 
              onClick={() => {
                setResult(null);
                setPreviewUrl(null);
                handleCaptureClick();
              }}
              className="mt-6 bg-white text-agri-primary h-14 uppercase tracking-widest font-black"
            >
              Scan New Area
            </Button>
          </div>
        )}
      </section>

      {/* Main Trigger */}
      {!result && (
        <section className="flex flex-col gap-4">
          <button 
            disabled={scanning}
            onClick={handleCaptureClick}
            className="w-full h-20 bg-agri-primary text-white rounded-3xl flex items-center justify-center gap-4 shadow-xl shadow-agri-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
             {scanning ? (
               <Loader2 className="w-6 h-6 animate-spin" />
             ) : (
               <>
                <Camera className="w-8 h-8" />
                <div className="text-left">
                   <p className="text-xs font-black uppercase tracking-widest leading-none mb-1 opacity-60">Run Full Scan</p>
                   <p className="text-lg font-display font-black uppercase tracking-tighter">Capture Frame</p>
                </div>
               </>
             )}
          </button>
          
          <button 
            onClick={handleCaptureClick}
            className="w-full h-14 bg-white border border-agri-border rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-500 hover:bg-agri-surface active:scale-95 transition-all"
          >
             <Upload className="w-5 h-5" />
             Import Laboratory Image
          </button>
        </section>
      )}

      {/* Reference Library */}
      <section className="flex flex-col gap-4 pb-12">
        <div className="flex justify-between items-end px-1">
           <h3 className="text-base font-black text-zinc-800 tracking-tight">Regional Pests</h3>
           <button className="text-[10px] font-black text-agri-primary uppercase tracking-widest">Global Library</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {commonPests.map((pest, i) => (
            <div key={i} className="group bg-white border border-agri-border rounded-3xl p-3 flex items-center gap-3 hover:border-agri-primary transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0">
                 <img src={pest.image} alt={pest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="min-w-0">
                 <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Reference</p>
                 <p className="text-xs font-black text-zinc-800 uppercase tracking-tighter truncate">{pest.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
