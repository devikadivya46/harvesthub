import React, { useState } from 'react';
import { Leaf, Lightbulb, Calendar, BrainCircuit, Droplets } from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';

export const CropSuggestionPage: React.FC = () => {
  const [ph, setPh] = useState(6.5);
  const [soilType, setSoilType] = useState('loamy');
  const [hasBorewell, setHasBorewell] = useState(false);

  return (
    <div className="pt-20 px-4 flex flex-col gap-6 max-w-2xl mx-auto pb-32">
      <Header title="Crop Suggestion" showBack />

      {/* Hero Section */}
      <section className="mb-2">
        <div className="relative rounded-xl overflow-hidden h-40 shadow-sm">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI32WvjnkyX7rZCyRBIOBs4NofItpLUIJmfYPYE9-81kMvO9AskKGa9vk9Q8V8oD18l70mFQ-_n2zs2A5XaJ9RPlssj6xOLqUDWpJpyTqXBst8H83EvaVMP-CvUBElw8xemhIkpQsa5fhCIk06v1GbYppFjgQ3HH1aDeL2n8F7uOna6QP2paGWx4eh35YFAJ3LJuCIVvkJP0M3syWHiJhbznMb6-mhKjOg6i_WG5sd-WjVzib_rw3eEBGvM9BDlcpZww7Hx0KbRsyQ" 
            alt="Agricultural Field" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold">Find Your Perfect Crop</h2>
            <p className="text-white/90 text-xs uppercase tracking-wider font-semibold">Smart suggestions based on soil health</p>
          </div>
        </div>
      </section>

      {/* Soil Analysis Form */}
      <section className="space-y-4">
        <Card>
          <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
            <BrainCircuit className="w-6 h-6" />
            Soil Analysis
          </h3>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* pH Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="font-bold text-on-surface-variant">Soil pH Level</label>
                <span className="text-2xl font-bold text-primary">{ph}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="14" 
                step="0.1" 
                value={ph} 
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant px-1 font-bold uppercase">
                <span>Acidic (0)</span>
                <span>Neutral (7)</span>
                <span>Alkaline (14)</span>
              </div>
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <label className="font-bold text-on-surface-variant px-1">Soil Type</label>
              <div className="relative">
                <select 
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full h-12 bg-surface-container-lowest border border-outline-variant rounded-lg px-4 appearance-none focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-semibold transition-all"
                >
                  <option value="loamy">Loamy Soil</option>
                  <option value="black">Black Soil</option>
                  <option value="red">Red Soil</option>
                  <option value="sandy">Sandy Soil</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Borewell Toggle */}
            <div className="flex justify-between items-center py-4 border-t border-surface-container-high">
              <div className="flex flex-col">
                <p className="font-bold text-on-surface-variant">Borewell Availability</p>
                <p className="text-xs text-outline font-semibold uppercase tracking-tight">Consistent water source for irrigation</p>
              </div>
              <button 
                type="button"
                onClick={() => setHasBorewell(!hasBorewell)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${hasBorewell ? 'bg-primary' : 'bg-surface-container-highest'}`}
              >
                <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-all duration-200 ${hasBorewell ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            <Button fullWidth className="h-14">
              Suggest Crops
              <span className="material-symbols-outlined">psychology</span>
            </Button>
          </form>
        </Card>
      </section>

      {/* Recommended Crops */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-bold text-on-background">Recommended Crops</h3>
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full">Top Matches</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Leaf className="w-8 h-8 fill-primary/20" />
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-outline tracking-wider">Suitability</span>
                <p className="text-primary font-bold text-xl">98%</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold">Soybean</h4>
              <p className="text-xs text-on-surface-variant opacity-80 font-semibold mb-3">Optimal for Loamy soil with 6.5 pH</p>
            </div>
            <div className="pt-3 border-t border-surface-container flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold text-secondary uppercase tracking-tight">Sowing: June - July</span>
            </div>
          </Card>

          <Card className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">grass</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-outline tracking-wider">Suitability</span>
                <p className="text-primary font-bold text-xl">85%</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold">Pigeon Pea</h4>
              <p className="text-xs text-on-surface-variant opacity-80 font-semibold mb-3">Grows well in stable neutral soil</p>
            </div>
            <div className="pt-3 border-t border-surface-container flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold text-secondary uppercase tracking-tight">Sowing: May - June</span>
            </div>
          </Card>

          {/* Expert Tip */}
          <div className="md:col-span-2 bg-tertiary-container text-on-tertiary-container p-6 rounded-xl flex items-center gap-4 shadow-organic">
            <div className="p-3 bg-white/20 rounded-full shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight mb-1">Expert Tip</h4>
              <p className="text-sm opacity-90 leading-relaxed font-medium">Adding organic compost can improve your Loamy soil's yield for Soybean by 15%.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
