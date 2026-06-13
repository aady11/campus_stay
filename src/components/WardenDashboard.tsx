import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  AlertTriangle,
  BarChart3,
  Bed,
  UserPlus,
  Megaphone,
  Settings,
  Bell,
  Search,
  Check,
  X,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  LogOut,
  Send
} from 'lucide-react';

export const WardenDashboard: React.FC = () => {
  const {
    leaves,
    complaints,
    notices,
    approveLeave,
    rejectLeave,
    assignComplaint,
    createNotice,
    wingBHeatmap,
    toggleHeatmapRoom,
    logout
  } = useAppState();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'mess' | 'power' | 'sports' | 'general'>('general');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const pendingLeaves = leaves.filter(l => l.status === 'PENDING');
  const criticalComplaints = complaints.filter(c => c.category === 'Critical' && c.status !== 'Resolved');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;
    createNotice(noticeTitle, noticeContent, noticeCategory);
    setNoticeTitle('');
    setNoticeContent('');
    setShowNoticeModal(false);
    triggerToast('📣 Broadcast alert published globally. Syncing dashboard terminals.');
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased min-h-screen flex font-sans">
      
      {/* Toast Helper */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-indigo-900 border border-indigo-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-indigo-300" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#131b2e] border-r border-[#1e293b] shadow-xl flex flex-col py-6 px-4 overflow-y-auto z-50">
        <div className="mb-8 px-4">
          <h1 className="font-headline-lg text-[22px] font-bold text-white leading-tight flex items-center gap-2">
            <Bed className="w-5 h-5 text-indigo-400" />
            CampusStay
          </h1>
          <p className="font-label-sm text-indigo-400/60 uppercase tracking-widest text-[10px] h-3">Warden Portal</p>
        </div>

        <nav className="flex-grow space-y-1">
          <span className="flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-300 border-l-4 border-indigo-500 bg-white/5 font-semibold text-sm transition-all cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </span>
          <span onClick={() => triggerToast('📋 Filtered pending leaves on Wing A roster.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <CalendarCheck className="w-5 h-5" />
            <span>Approve Leave</span>
          </span>
          <span onClick={() => triggerToast('🚨 Pulling operational complaints tracker.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <AlertTriangle className="w-5 h-5" />
            <span>Manage Complaints</span>
          </span>
          <span onClick={() => triggerToast('📊 Pulling Wing B / Wing C capacity index...')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <BarChart3 className="w-5 h-5" />
            <span>Occupancy Stats</span>
          </span>
          <span onClick={() => triggerToast('🛏️ Structural bed allocator is online.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <Bed className="w-5 h-5" />
            <span>Room Management</span>
          </span>
          <span onClick={() => triggerToast('🚪 Open 2 pending visitor check-ins.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <UserPlus className="w-5 h-5" />
            <span>Visitor Requests</span>
          </span>
          <span onClick={() => setShowNoticeModal(true)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <Megaphone className="w-5 h-5" />
            <span>Publish Notice</span>
          </span>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4 space-y-2">
          <span className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </span>
          
          <div className="flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs select-none">WA</div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Admin Warden</p>
              <p className="text-[9px] text-[#7c839b] truncate">Main Wing A</p>
            </div>
          </div>

          <button onClick={logout} className="w-full bg-[#1e293b] text-indigo-300 py-2.5 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all">
            Logout Warden Mode
          </button>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="ml-[260px] w-[calc(100%-260px)] min-h-screen flex flex-col bg-slate-50">
        
        {/* Top Header AppBar */}
        <header className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 px-8 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold font-headline-lg text-[#011a42]">Warden Dashboard</h2>
            <div className="relative hidden md:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search students, rooms, leave..."
                className="pl-10 pr-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs focus:ring-2 focus:ring-indigo-500/20 text-slate-700 outline-none w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 transition-all text-slate-500">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                triggerToast('🖨️ Compiling occupancy reports... Saved matching stats.');
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all"
            >
              Generate Reports
            </button>
          </div>
        </header>

        {/* Content wrapper */}
        <div className="p-8 max-w-[1440px] mx-auto w-full space-y-6 flex-grow overflow-y-auto">
          
          {/* Bento Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <LayoutDashboard className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">+2% from last month</span>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Students</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">450</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-rose-500">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2.5 bg-rose-50 rounded-xl text-rose-600">
                  <AlertCircleIcon className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">{criticalComplaints.length} Critical</span>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Complaints</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">{complaints.filter(c => c.status !== 'Resolved').length}</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                  <CalendarCheck className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">Review required</span>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Leaves</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">{pendingLeaves.length}</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2.5 bg-[#eff4ff] rounded-xl text-indigo-600">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 px-2.5 py-0.5 rounded-full">Optimal Capacity</span>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Occupancy Rate</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">95%</h3>
              <div className="absolute bottom-0 left-0 h-1.5 bg-indigo-600" style={{ width: '95%' }}></div>
            </div>

          </div>

          {/* Asymmetric Core grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Pending Approvals Table (2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Pending Approvals</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Leave requests awaiting your signature</p>
                </div>
                <span onClick={() => triggerToast('📂 Pulling archives...')} className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">View All</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans">
                  <thead className="bg-[#eff4ff]/50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase">Student</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase">Duration</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase">Reason</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pendingLeaves.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm">
                          🎉 All leaves are settled and approved! Good job.
                        </td>
                      </tr>
                    ) : (
                      pendingLeaves.map((request) => (
                        <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                                {request.studentName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-sm">{request.studentName}</p>
                                <p className="text-[10px] text-slate-400 font-semibold">{request.room}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-xs">
                              <p className="font-bold text-slate-800">{request.dateRange}</p>
                              <p className="text-slate-400 italic mt-0.5">{request.type}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium">
                            <span className="px-2.5 py-1 bg-slate-100 rounded text-slate-600">
                              {request.purpose}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  rejectLeave(request.id);
                                  triggerToast(`❌ Leave rejected for ${request.studentName}`);
                                }}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  approveLeave(request.id);
                                  triggerToast(`✅ Leave approved for ${request.studentName}`);
                                }}
                                className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Complaint Center Action Side block */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                <h4 className="font-bold text-slate-900">Complaint Center</h4>
                <p className="text-slate-400 text-xs mt-0.5">Urgency breakdown & active tickets</p>
              </div>

              <div className="p-6 space-y-4 flex-grow">
                {complaints.filter(c => c.status !== 'Resolved').slice(0, 2).map((item) => (
                  <div key={item.id} className={`p-4 rounded-xl border-l-4 ${
                    item.category === 'Critical' ? 'border-rose-500 bg-rose-50/20' : 'border-indigo-500 bg-slate-50'
                  } flex gap-3 text-xs`}>
                    <div className={item.category === 'Critical' ? 'text-rose-600' : 'text-indigo-600'}>
                      <AlertOctagon className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <div className="flex justify-between items-start font-bold uppercase tracking-wider text-[10px]">
                        <span className={item.category === 'Critical' ? 'text-rose-700' : 'text-indigo-700'}>
                          {item.category}
                        </span>
                        <span className="text-slate-400">10m ago</span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm leading-tight">{item.title}</p>
                      <p className="text-slate-500 leading-normal">{item.description}</p>
                      
                      {item.status === 'PENDING' ? (
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => {
                              assignComplaint(item.id, 'Plumbing Team');
                              triggerToast('🔧 Dispatched plumbing team to Room B-204!');
                            }}
                            className="bg-indigo-600 text-white font-semibold px-3 py-1 rounded hover:bg-indigo-500 text-[10px]"
                          >
                            Assign Plumber
                          </button>
                          <button
                            onClick={() => triggerToast(`Report: ${item.description}`)}
                            className="border border-slate-300 text-slate-500 px-3 py-1 rounded text-[10px]"
                          >
                            Details
                          </button>
                        </div>
                      ) : (
                        <div className="pt-2 text-[10px] text-indigo-700 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Dispatched team: {item.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button onClick={() => triggerToast('No other complaints pending warden review.')} className="w-full py-2.5 border border-dashed border-slate-200 text-slate-400 text-xs rounded-xl hover:bg-slate-50 transition-colors">
                  View all complaints
                </button>
              </div>
            </div>

          </div>

          {/* Floor grid heatmap & notices */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Heatmap (3 cols) */}
            <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-slate-900">Wing B Status Heatmap</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Click rooms to toggle occupied check-in status</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-indigo-500"></div>
                    <span className="text-slate-400">Occupied</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-slate-200"></div>
                    <span className="text-slate-400">Empty</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-10 gap-2">
                {wingBHeatmap.map((occupied, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      toggleHeatmapRoom(index);
                      triggerToast(`Room ${201 + index} checked ${occupied ? 'OUT' : 'IN'}.`);
                    }}
                    className={`aspect-square rounded-lg opacity-90 hover:opacity-100 hover:scale-110 cursor-pointer transition-all flex items-center justify-center text-[10px] font-bold ${
                      occupied ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                    title={`Room ${201 + index}`}
                  >
                    {201 + index}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Broadcaster / Notices sidebar (1 col) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Active Notices</h4>
                <ul className="space-y-4">
                  {notices.slice(0, 2).map((notice) => (
                    <li key={notice.id} className="flex gap-3 text-xs leading-relaxed">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold flex-shrink-0">
                        🔔
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{notice.title}</p>
                        <p className="text-slate-400 mt-0.5">{notice.content.slice(0, 45)}...</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setShowNoticeModal(true)}
                className="w-full mt-6 bg-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-xs"
              >
                New Broadcast
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* DETAILED BROADCAST NOTICE BOARD DIALOG */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-md shadow-2xl relative animate-slide-up">
            <button onClick={() => setShowNoticeModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="font-bold text-lg text-slate-[#131b2e] mb-4">Publish Broadcast Bulletin</h3>
            
            <form onSubmit={handleBroadcast} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notice Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {['mess', 'power', 'sports', 'general'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setNoticeCategory(item as any)}
                      className={`py-1.5 rounded-xl text-center text-[10px] font-bold border uppercase tracking-wider ${
                        noticeCategory === item
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bulletin Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mandatory Block meeting at 06:00 PM"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Details / Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide all notice detail instructions..."
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#131b2e] hover:bg-indigo-600 text-white py-3 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> BROADCAST ALERT
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// Quick helper
const AlertCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
