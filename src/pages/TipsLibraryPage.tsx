import React from 'react';
import { Search, ChevronRight, Volume2, Star, Clock } from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';
import { cn } from '../lib/utils';

export const TipsLibraryPage: React.FC = () => {
  const articles = [
    { title: 'Natural Fertilizer Prep', time: '5 min read', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDM0xvK6jVBquQBnDzeLx-M1Z-LWilaaQXKFTqic1Or4O8TAWwTeUyESTq3kpopwh4UWt1J4KO-JeP9ndQg_ilmFvoXuAW3PJn-UQzGhWH7j-fnqe58BojhzJ077iIAqpJJI9psoLuZVWIWxbDdaQcgzmHeak4fZvOLBjlzo0WN3tQtIa_ZkiVbsyRtndAZCPZ3nT8yw2Aq5uAwPPGSeK2t7AjZ7nbLLZWk2E2maY6tYDq7mIQ637KVOcQG98puWrIdDenroOl0iOZ' },
    { title: 'Drip Irrigation Basics', time: '8 min read', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRYJm3ZOs1OFZ1JZPhixqeiaYmHba_gSGadgkHoPA62IkNE4XYB94dy8e1N7ie3TVUwzh1Yo8NB3Bs9yePaEfuFhzVHjLzyy1Am6RdyMQPahP1i-Ld0I0msutbDuEmUl_A4VQIW_YeZ9c1IFa_oPd-DgysHtV9PA3onWHtlRhwNwkcyb-WqdcK5SKluDG0Jw1n2M-aV41DjnAxbkuEe6eZeFEjQqlZOxaN5oMYh5WyCe-0ZK52ikZe2tsukzdJNpq2lQO-eUjPpsJV' },
    { title: 'Companion Planting', time: '6 min read', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkyj0p4gMKjBLwEB-JxnLt7CrUMLk_LzNs0Xvke6PXByT5sq-m5Scy4Ozq0QWZbML-5_Wm02SaLhnkJ4KIRQkReJSZAamcxRZhB21JAge7Wa37BA2fuPU8gBQ94lnfqu0bkAJsrEJA9qEs9xurqUYUyBT9YlcAmKwplkF-Mufk9aSf6_aS3_Ps5toBgLwGsYqSRqSA7MTdqiNeLfp-xfkoUNhYLlkS533roYsUL7AqIEqpC-c4L6wZYn1mR-zhmcfuKj7MuV5UCbht' }
  ];

  return (
    <div className="pt-20 px-4 flex flex-col gap-6 max-w-2xl mx-auto pb-32">
      <Header title="Tips Library" showBack />

      {/* Search Bar */}
      <section>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for farming tips..." 
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-semibold outline-none shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
        </div>
      </section>

      {/* Category Chips */}
      <section className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-bold text-sm shadow-sm whitespace-nowrap">All</button>
        <button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-bold text-sm hover:bg-surface-variant transition-colors whitespace-nowrap">Organic</button>
        <button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-bold text-sm hover:bg-surface-variant transition-colors whitespace-nowrap">Soil Health</button>
        <button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-bold text-sm hover:bg-surface-variant transition-colors whitespace-nowrap">Pest Control</button>
        <button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-bold text-sm hover:bg-surface-variant transition-colors whitespace-nowrap">Irrigation</button>
      </section>

      {/* Tip of the Day */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
           <Star className="w-5 h-5 text-primary fill-primary" />
           Tip of the Day
        </h2>
        <Card padded={false} className="shadow-organic border-primary/10">
          <img 
            className="w-full h-48 object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGsgjxgFblrY2Xt-B_Q3s6hW_jPBJKbyPf0e2jY09Sax00KCMmeiKjsuNMLm6-v3kpw9hbc5Z5mjsLZXR1K53d3RilV-RWtQxuf0znEcU_WYGyxte6BSA9uaBkxmfNJlRYMKp3a-AqHpoK5gflkRMKyjNRhu1u9oHFf-rbhgXI-XmollnITG2ss2VNZ1KVp9D3UTXuwoHE73xTviD2GTtBNaQ5xfxa8qRSRCOsttn2347Q4dh3fbBsK2CVIRzBRZlBlHFF5-ioulng" 
            alt="Watering seedlings" 
          />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">Expert Recommendation</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Optimize Morning Watering</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-medium">Watering your crops before 9:00 AM reduces evaporation and prevents fungal growth by allowing leaves to dry during the day.</p>
          </div>
        </Card>
      </section>

      {/* Educational Articles */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Educational Articles</h2>
        {articles.map((article, i) => (
          <Card key={i} className="flex gap-4 p-4 items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer border-transparent hover:border-primary/20">
            <img src={article.image} alt={article.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-grow min-w-0">
              <h4 className="text-lg font-bold text-on-surface mb-2 truncate leading-tight">{article.title}</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-tight">{article.time}</span>
                </div>
                <button className="flex items-center gap-1 text-primary font-bold text-sm">
                  <Volume2 className="w-4 h-4 fill-primary/20" />
                  Listen
                </button>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-outline shrink-0" />
          </Card>
        ))}
      </section>
    </div>
  );
};
