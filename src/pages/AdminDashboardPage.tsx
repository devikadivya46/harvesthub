import React from 'react';
import { 
  Users, CreditCard, LayoutDashboard, History, CheckCircle, 
  Trash2, ChevronRight, PlusCircle, Info, Image as ImageIcon
} from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto space-y-8 pb-32">
      <Header title="Admin Console" />

      {/* Stats Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col gap-1 border-primary/10">
          <div className="flex items-center gap-2 text-primary">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Users</span>
          </div>
          <div className="flex items-baseline gap-3">
             <h2 className="text-4xl font-bold text-primary">12,840</h2>
             <span className="text-[10px] font-bold text-primary uppercase">+12% vs last month</span>
          </div>
        </Card>

        <Card className="flex flex-col gap-1 border-tertiary/10">
          <div className="flex items-center gap-2 text-tertiary">
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Total volume</span>
          </div>
          <div className="flex items-baseline gap-3">
             <h2 className="text-4xl font-bold text-tertiary">₹4.82L</h2>
             <span className="text-[10px] font-bold text-tertiary uppercase flex items-center gap-1">
               <CheckCircle className="w-3 h-3" /> Razorpay Active
             </span>
          </div>
        </Card>

        <Card className="flex flex-col gap-1 border-secondary/10">
          <div className="flex items-center gap-2 text-secondary">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Active Cards</span>
          </div>
          <div className="flex items-baseline gap-3">
             <h2 className="text-4xl font-bold text-secondary">42</h2>
             <span className="text-[10px] font-bold text-secondary uppercase">5 Updated today</span>
          </div>
        </Card>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management & Transactions */}
        <div className="lg:col-span-2 space-y-8">
          {/* User Management */}
          <Card padded={false} className="shadow-organic">
            <div className="p-6 border-b border-surface-container flex justify-between items-center">
              <h3 className="text-xl font-bold">User Management</h3>
              <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-colors border border-primary/20">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Farmer</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {[
                    { name: 'Rajesh Mishra', id: '#KS-9201', loc: 'Nagpur, MH', date: 'Oct 12, 2023', initials: 'RM', color: 'primary' },
                    { name: 'Suresh Kumar', id: '#KS-8842', loc: 'Ludhiana, PB', date: 'Nov 04, 2023', initials: 'SK', color: 'secondary' }
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-${user.color}-fixed flex items-center justify-center text-on-${user.color}-fixed font-bold text-sm shadow-sm`}>{user.initials}</div>
                        <div>
                          <p className="font-bold text-sm">{user.name}</p>
                          <p className="text-[10px] font-bold text-outline uppercase">{user.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-on-surface-variant">{user.loc}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-on-surface-variant">{user.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-error hover:bg-error/5 p-2 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5 opacity-60" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Transaction History */}
          <Card padded={false} className="shadow-organic">
            <div className="p-6 border-b border-surface-container flex items-center gap-3">
              <History className="w-5 h-5 text-tertiary" />
              <h3 className="text-xl font-bold">Recent Payments</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { id: 'pay_NZ82jks921', type: 'Crop Analysis Premium', amount: '499.00' },
                { id: 'pay_OA91mzn204', type: 'Market Listing Fee', amount: '1,200.00' }
              ].map((pay, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl border border-surface-container">
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-container-lowest p-3 rounded-lg shadow-sm">
                      <CreditCard className="w-5 h-5 text-tertiary" />
                    </div>
                    <div>
                      <p className="font-mono text-sm font-bold text-on-surface">{pay.id}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tight">{pay.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{pay.amount}</p>
                    <span className="text-[9px] font-black uppercase bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Captured</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Creation Form */}
        <aside className="space-y-8">
          <Card className="sticky top-24 shadow-organic border-primary/20">
            <h3 className="text-xl font-bold mb-8">Deploy Crop Card</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Crop Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Basmati Rice" 
                  className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Price (₹ / Quintal)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold">₹</span>
                  <input 
                    type="number" 
                    placeholder="2,400" 
                    className="w-full bg-surface-container-low border-none rounded-lg pl-8 pr-4 py-3 focus:ring-2 focus:ring-primary text-sm font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Market Status</label>
                <select className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-sm font-bold appearance-none">
                  <option>Steady</option>
                  <option>Rising</option>
                  <option>Falling</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input 
                    type="url" 
                    placeholder="https://image-source..." 
                    className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary text-sm font-bold"
                  />
                </div>
              </div>
              <Button fullWidth className="h-14 mt-4">
                <PlusCircle className="w-5 h-5" />
                Deploy New Card
              </Button>
            </form>
            <div className="mt-8 p-4 bg-secondary-container/10 rounded-xl border border-secondary-container/20 flex gap-3">
              <Info className="w-5 h-5 text-secondary shrink-0" />
              <p className="text-[10px] font-bold text-on-secondary-container uppercase leading-relaxed">
                Adding a card will notify all subscribers in this category.
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};
