import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  History,
  Settings,
  Bell,
  Mail,
  Search,
  CheckCircle,
  AlertTriangle,
  LogOut,
  Sparkles,
  PieChart,
  Server,
  Zap,
  Trash2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    logs,
    complaints,
    logout,
    addLog
  } = useAppState();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Interactive fake chart monthly stats on hover
  const monthlyRevenue = [
    { name: 'Jan', percent: 60, val: '$18,400' },
    { name: 'Feb', percent: 45, val: '$14,200' },
    { name: 'Mar', percent: 85, val: '$28,800' },
    { name: 'Apr', percent: 65, val: '$22,100' },
    { name: 'May', percent: 95, val: '$32,400' },
    { name: 'Jun', percent: 70, val: '$24,000' }
  ];

  return (
    <div className="bg-[#f8f9fc] text-[#1e293b] antialiased min-h-screen flex font-sans">
      
      {/* Toast Helper */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#0f172a] shadow-xl flex flex-col py-6 px-4 overflow-y-auto border-r border-[#1e293b] z-50">
        <div className="mb-8 px-4 flex items-center gap-2">
          <span className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
            <Server className="w-6 h-6 animate-pulse" />
          </span>
          <div>
            <h1 className="font-headline-lg text-lg font-bold text-white leading-tight">CampusStay</h1>
            <p className="font-label-sm text-slate-400/60 uppercase tracking-widest text-[9px] h-3">SYSTEM ADMIN</p>
          </div>
        </div>

        <nav className="flex-grow space-y-1">
          <span className="flex items-center gap-3 px-4 py-3 rounded-xl text-sky-400 border-l-4 border-sky-500 bg-white/5 font-semibold text-sm transition-all cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </span>
          <span onClick={() => triggerToast('📊 Hostel micro-analytics compiled.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-450 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <BarChart3 className="w-5 h-5" />
            <span>Hostel Analytics</span>
          </span>
          <span onClick={() => triggerToast('💳 Bank transfer integrations online.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-450 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <DollarSign className="w-5 h-5" />
            <span>Financial Control</span>
          </span>
          <span onClick={() => triggerToast('📜 Audit record ledger fully synced.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-450 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <History className="w-5 h-5" />
            <span>Audit Logs</span>
          </span>
        </nav>

        <div className="mt-auto space-y-2 pt-4 border-t border-slate-800">
          <span className="flex items-center gap-3 px-4 py-2 text-slate-450 hover:text-white text-xs font-semibold cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>System Settings</span>
          </span>

          <div className="flex items-center gap-3 px-4 py-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-xs">JD</div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">John Doe</p>
              <p className="text-[9px] text-[#7c839b] truncate">Administrator</p>
            </div>
          </div>

          <button onClick={logout} className="w-full bg-[#1e293b] text-sky-400 py-2.5 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all">
            Logout Admin Mode
          </button>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="ml-[260px] w-[calc(100%-260px)] min-h-screen flex flex-col bg-[#f8f9fc]">
        
        {/* Top Header AppBar */}
        <header className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 px-8 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold font-headline-lg text-[#011a42]">CampusStay Central Panel</h2>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search audit records, users, transactions..."
                className="pl-10 pr-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs focus:ring-2 focus:ring-sky-500/20 text-slate-700 outline-none w-72 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 transition-all text-slate-500">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <button
              onClick={() => {
                triggerToast('🖨️ Compiling global academic registrar archives report PDF...');
                addLog('John Doe (Admin)', 'admin', 'Generated General Report', 'Hostel Global stats', 'Success');
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:shadow-md transition-all active:scale-95"
            >
              Print General Report
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-[1440px] mx-auto w-full space-y-6 flex-grow overflow-y-auto">
          
          <div className="flex bg-[#0f172a] text-white p-6 rounded-2xl border border-[#1e293b] justify-between items-center relative overflow-hidden">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[10px] text-sky-400 font-extrabold uppercase tracking-widest">Security clear</p>
              </div>
              <h3 className="text-lg font-bold">Admin Terminal is online</h3>
              <p className="text-xs text-slate-400">All student nodes and local parent-warden helper triggers are fully reactive.</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-mono font-medium text-slate-300">
              SYS_LATENCY: 4ms
            </div>
          </div>

          {/* Core Stat Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">1,200</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-3">📈 +4.2% from start</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Occupancy Rate</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">88%</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-3">Optimal Capacity</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Revenue</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">$24,000</h3>
              <p className="text-[10px] text-rose-600 font-bold mt-3">📉 -2.1% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-rose-500">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Issues</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">{complaints.filter(c => c.status !== 'Resolved').length}</h3>
              <p className="text-[10px] text-rose-600 font-bold mt-3">Active dispatcher tasks</p>
            </div>

          </div>

          {/* Interactive SVG Graphs row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Revenue Overview (SVG column graph) */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-slate-900">Revenue Overview</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Estimated gross semester payments</p>
                </div>
                {selectedMonth ? (
                  <span className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1 rounded-full border">
                    {selectedMonth} Selected: {monthlyRevenue.find(m => m.name === selectedMonth)?.val}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Hover bars for exact metrics</span>
                )}
              </div>

              {/* Reactive Custom SVG Columns */}
              <div className="flex justify-between items-end h-56 pt-6 px-4">
                {monthlyRevenue.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                    onMouseEnter={() => setSelectedMonth(item.name)}
                    onMouseLeave={() => setSelectedMonth(null)}
                  >
                    {/* SVG cylinder representer */}
                    <div className="w-12 bg-slate-100 rounded-t-lg relative overflow-hidden group-hover:bg-slate-200 transition-colors" style={{ height: '160px' }}>
                      <div
                        className="absolute bottom-0 left-0 w-full bg-slate-900 rounded-t-lg group-hover:bg-sky-500 transition-all duration-300"
                        style={{ height: `${item.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-sky-600 transition-colors">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hostel Utilization (Donut chart representation) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Hostel Utilization</h4>
                <p className="text-xs text-slate-400 mt-0.5">Wing allocation metrics</p>
              </div>

              {/* Custom SVG Donut Dial */}
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center my-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-100 stroke-slate-100" cx="80" cy="80" fill="transparent" r="64" strokeWidth="14"></circle>
                  <circle className="text-sky-500 stroke-sky-500" cx="80" cy="80" fill="transparent" r="64" strokeDasharray="400" strokeDashoffset="48" strokeWidth="14"></circle>
                </svg>
                <div className="absolute text-center">
                  <p className="text-2xl font-black text-slate-900">88%</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Occupancy</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                <div className="p-2 border rounded-xl bg-slate-50">
                  <p className="text-slate-400 text-[10px]">Block A</p>
                  <p className="text-slate-800 font-bold mt-1">92%</p>
                </div>
                <div className="p-2 border rounded-xl bg-slate-50">
                  <p className="text-slate-400 text-[10px]">Block B</p>
                  <p className="text-slate-800 font-bold mt-1">95%</p>
                </div>
                <div className="p-2 border rounded-xl bg-slate-50">
                  <p className="text-slate-400 text-[10px]">Block C</p>
                  <p className="text-slate-800 font-bold mt-1">77%</p>
                </div>
              </div>
            </div>

          </div>

          {/* System Activity Log Table (central dispatcher tracer) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-sky-500" /> System Activity Log
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">Real-time traces of student, warden, parent, and maintenance behaviors</p>
              </div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span> Sync Ledger
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans">
                <thead className="bg-[#eff4ff]/60 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">USER</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">ROLE</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">ACTION PERFORMED</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">ENTITY / SUBJECT</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">STATUS</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            log.status === 'Success' ? 'bg-sky-50 text-sky-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {log.user.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="font-bold text-slate-800">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-600">{log.role}</td>
                      <td className="px-6 py-4 text-slate-600">{log.action}</td>
                      <td className="px-6 py-4 font-mono text-slate-500">{log.entity}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          log.status === 'Success'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {log.status === 'Success' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-semibold">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 text-center text-xs">
              <span className="text-slate-400 font-semibold">
                Displaying active live logs. Run university debugger to flush memory buffers.
              </span>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};
