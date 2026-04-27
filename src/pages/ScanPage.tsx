import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Info, Star, ChevronRight, ArrowLeft, Lightbulb } from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';

export const ScanPage: React.FC = () => {
  const navigate = useNavigate();

  const commonPests = [
    { name: 'Aphids', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXyDqMC17jg94umKNHMERNy6TDWwfSR43kezpKF0yA7g2JQhEUVlOv1pwBRyyDK_Wn_7GSBXZBKilGc6KGUDiYYwL5qCbdByg8xpwMmIQNZIOX1Yx4NCAcJ5mQJyp1wwUWHhWfsHWaBk3nRgWMUgBoNfNA1xz0ANnIuB6e391Sl-cePvTpl8cjjjpknbFHOAPeV9IrXsn4VQAnHc7_2HRfgu5I5_zllC2iGuI25QcrPC0vaM_ieJGvtxKR5vMCT0wgmQyYUuEoJ9fY' },
    { name: 'Locusts', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpjfLaOc1bVrhob4yKWIQN5VkVUuK_YB6JlTU3BmRPAsajkT5_639op1w3pYiENiHPwTUf1aas-ODKq6ajrSVTVPZrxKxr0rJFCnoNZ2dVoShGyjffxD9mgxYF_N4PcPjFUaDDnDENPbjCxtJ08ckArASs1nRre1pxFSWZpCWIRhSrDlUSPVKMMgSZd8q9gNPsajWwjE0hOlzDAo7bcpufvsWit1GgO4Nt09D9PCER8NUAGE5YKm-LQU8BdawxpRR2o_S85vpR62xQ' },
    { name: 'Armyworm', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPZzAYJiRGZviz7sHvql__OykYO2B_a4jYppEgMqSXjabhItD8obGjkgieNQrbWiyLPl-Gb8TrVvojOXe0Huk1RkGzuQp79RzVYl7Vip3Zuhelconu2YytbwOQFTXMmBHDKfIkK2W3vD98TyM3Xaz42q69lH8DtKNp_ZCIhddvhq9ljfwkOLT0KI_uWIf1mTE1GlCUz-LmUV9h1_NAL5JNnWoD24IjvxKQYO5HuiNdoybChk9qe6U_Fqn-PaEyGvTQMMpCx6VMNrrm' }
  ];

  return (
    <div className="pt-20 px-4 flex flex-col gap-8 max-w-2xl mx-auto pb-32">
      <Header title="Identify Pest" showBack />

      {/* Instruction Section */}
      <section className="text-center space-y-2 pt-4">
        <h2 className="text-2xl font-bold text-on-surface leading-tight">Take a photo of the pest to identify it</h2>
        <p className="text-on-surface-variant font-medium opacity-80">Our AI will analyze the image to provide treatment advice.</p>
      </section>

      {/* Camera Viewfinder */}
      <section className="relative aspect-square w-full bg-surface-dim rounded-[32px] overflow-hidden shadow-organic border-4 border-surface-container-lowest">
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {/* Framing corners */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-white opacity-80 rounded-tl-lg"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-white opacity-80 rounded-tr-lg"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-white opacity-80 rounded-bl-lg"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-white opacity-80 rounded-br-lg"></div>
          
          {/* Scanning line */}
          <div className="absolute w-full h-[2px] bg-primary/40 shadow-[0_0_15px_rgba(13,99,27,0.5)] top-1/2 -translate-y-1/2"></div>
        </div>

        <img 
          className="w-full h-full object-cover grayscale-[0.1] contrast-125 transition-all duration-700" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuClVwHNC6PY9rwI4r7GP-dkpb-qZvxds-M5FjmgO1Jd0GRP7n5JIxM3g1-F7ydDb2hBN7EKTnnMA5w_xLycFYAZRMcD-CJeephd1D-GXrr3DAdtlBMLTrCvQCPyiGS6omlVZppoTgHYgJyKqOZdLU-yxarlmFxA4zhqmNNIpnIqF5orfbVOQuHaND7R_FpCF-HvRDG3XMiuzsYyxecvSeKLMRYdvJbfNl5cfDBpUxhwTMxBrpiKghvt1d0uNSUPQBzaHcNmtVvAcEot" 
          alt="Plant Leaf" 
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="px-5 py-2 bg-black/70 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/20">
            <span className="material-symbols-outlined text-[14px]">light_mode</span>
            Good Light
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="grid grid-cols-1 gap-4">
        <Button fullWidth className="h-14 rounded-full shadow-lg">
          <Camera className="w-5 h-5 fill-current" />
          Take Photo
        </Button>
        <Button variant="ghost" fullWidth className="h-14 rounded-full border border-outline-variant bg-surface-container-lowest">
          <Upload className="w-5 h-5" />
          Upload from Gallery
        </Button>
      </section>

      {/* Help Tip */}
      <div className="bg-secondary-container/20 text-on-secondary-container p-6 rounded-[24px] flex gap-4 border border-secondary-container/30">
        <Info className="w-6 h-6 text-secondary shrink-0" />
        <p className="text-sm font-bold leading-relaxed opacity-80 uppercase tracking-tight">
          For better results, ensure the pest is in focus and there is plenty of light. Avoid blurry or dark shots.
        </p>
      </div>

      {/* Common Pests */}
      <section className="pb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xl font-bold text-on-surface">Common Pests</h3>
          <button className="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
          {commonPests.map((pest, i) => (
            <div key={i} className="min-w-[140px] bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container group cursor-pointer transition-all hover:shadow-md active:scale-95">
              <img src={pest.image} alt={pest.name} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-500" />
              <p className="p-3 text-[11px] font-black uppercase tracking-widest text-center text-on-surface opacity-80">{pest.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
