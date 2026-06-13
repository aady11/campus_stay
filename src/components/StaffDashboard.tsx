import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import {
  Wrench,
  History,
  FileMinus,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Mail,
  Calendar,
  Sparkles,
  Bolt,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  PlusCircle,
  X,
  Play,
  Check,
  Package
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const {
    complaints,
    inventory,
    logout,
    resolveComplaint,
    updateInventory,
    reorderItem,
    addLog
  } = useAppState();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskRoom, setNewTaskRoom] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskRoom) return;
    triggerToast(`🔧 Task Created: "${newTaskTitle}" added to Block ${newTaskRoom} work queue.`);
    addLog('Alex Rivera (Staff)', 'staff', 'Created Maintenance Work Order', `${newTaskTitle} (Room ${newTaskRoom})`, 'Success');
    setNewTaskTitle('');
    setNewTaskRoom('');
    setNewTaskDesc('');
    setShowNewTaskModal(false);
  };

  const activeWorkOrders = complaints.filter(c => c.status !== 'Resolved');

  return (
    <div className="bg-slate-50 text-slate-800 antialiased min-h-screen flex font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-amber-900 border border-amber-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Embedded Sidebar Portal */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#131b2e] border-r border-[#1e293b] shadow-xl flex flex-col py-6 px-4 overflow-y-auto z-50">
        <div className="mb-8 px-4">
          <h1 className="font-headline-lg text-[22px] font-extrabold text-white leading-tight flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-500" />
            EduHostel
          </h1>
          <p className="font-label-sm text-amber-500/60 uppercase tracking-widest text-[10px] h-3 mt-1">Staff Portal</p>
        </div>

        <nav className="flex-grow space-y-1">
          <span className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-400 border-l-4 border-amber-500 bg-white/5 font-semibold text-sm transition-all cursor-pointer">
            <FileMinus className="w-5 h-5" />
            <span>Assigned Tasks</span>
          </span>
          <span onClick={() => triggerToast('🔧 Maintenance work-boards retrieved.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <Wrench className="w-5 h-5" />
            <span>Maintenance</span>
          </span>
          <span onClick={() => triggerToast('📜 Historic dispatch cards pulled.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <History className="w-5 h-5" />
            <span>Task History</span>
          </span>
          <span onClick={() => triggerToast('📦 Local equipment inventory loaded.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <Package className="w-5 h-5" />
            <span>Inventory</span>
          </span>
        </nav>

        <div className="mt-auto space-y-2 pt-4 border-t border-white/10">
          <span className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </span>
          <span className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </span>

          <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7cLPhbMUbyPCe-xP89nOS7dLVWnEdCqLNzIkOIQxHbsLxhqtQ1G5TrKlAr91pZppwdu0M_bzWC9O6Bg4DrHaJB2ljuJLnvjj9FrwXJthyLXYNoB7PAVIBhk86oDMku3pVgG4Q4qyrHNsOkFeGC7PJb2peDk70BaXhnyQiFWi007mRbSZMjc40xYs9WZ1KK2xtigGquQqsAqqLwfsc3XS2cbGTgvJ0VWOpaTtO6DSI7nYoMD_fpb6HwiIGGklZBVLFa4uqbIdhfBQ"
              alt="Staff Profile"
              className="w-8 h-8 rounded-full border border-amber-500/10 object-cover"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Alex Rivera</p>
              <p className="text-[9px] text-[#7c839b] truncate">Senior Staff</p>
            </div>
          </div>

          <button onClick={logout} className="w-full bg-[#1e293b] text-amber-400 py-2.5 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all">
            Logout Staff Mode
          </button>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="ml-[260px] w-[calc(100%-260px)] min-h-screen flex flex-col bg-slate-50">
        
        {/* Top Header AppBar */}
        <header className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 px-8 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search orders, rooms..."
                className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs focus:ring-2 focus:ring-amber-500/20 text-slate-700 outline-none w-64 transition-all"
              />
            </div>
            <div className="hidden lg:flex gap-4 text-xs font-bold font-sans">
              <span className="text-amber-600 border-b-2 border-emerald-500 pb-1 cursor-pointer">Overview</span>
              <span onClick={() => triggerToast('Tasks requested filtering.')} className="text-slate-500 hover:text-amber-500 cursor-pointer">Requests</span>
              <span onClick={() => triggerToast('Schedules calendar logs pulling.')} className="text-slate-500 hover:text-amber-500 cursor-pointer">Schedules</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 transition-all text-slate-500">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <button
              onClick={() => {
                triggerToast('🖨️ Compiling dispatch summaries for local team B.');
              }}
              className="bg-amber-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-400 transition-all"
            >
              Generate Reports
            </button>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-8 max-w-[1440px] mx-auto w-full space-y-6 flex-grow overflow-y-auto">
          
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">Good Morning, Alex</h2>
              <p className="text-slate-500 text-sm mt-0.5">
                You have <span className="font-bold text-amber-600">{activeWorkOrders.filter(w => w.category === 'Critical').length} critical</span> requests pending today.
              </p>
            </div>
            <button className="flex items-center gap-1.5 border border-slate-350 px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm">
              <Calendar className="w-4 h-4" /> October 24, 2023
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Tasks</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">{complaints.filter(c => c.status !== 'Resolved').length}</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-3">+2 from yesterday</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-rose-500">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Maintenance</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">{activeWorkOrders.filter(o => o.category === 'Critical').length}</h3>
              <p className="text-[10px] text-rose-600 font-bold mt-3">Urgent dispatch required</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resolved</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">28</h3>
              <p className="text-[10px] text-slate-500 font-semibold mt-3">This Month</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-slate-900 text-white">
              <div className="relative z-10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Today's Work Progress</p>
                <h3 className="text-3xl font-extrabold mt-1">80%</h3>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

          </div>

          {/* Active Work Orders Table container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-500" /> Active Work Orders
              </h3>
              <div className="flex gap-2 text-xs">
                <button className="bg-slate-100 hover:bg-slate-205 border px-3 py-1 rounded-full font-bold">Filter</button>
                <button className="bg-slate-100 hover:bg-slate-205 border px-3 py-1 rounded-full font-bold">Sort</button>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {activeWorkOrders.length === 0 ? (
                <p className="p-12 text-center text-slate-400 text-sm">No pending maintenance orders at this wing.</p>
              ) : (
                activeWorkOrders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-slate-50/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
                    <div className="flex items-start gap-4">
                      {/* Box designation (B, A, C) */}
                      <div className={`p-4 rounded-xl flex flex-col items-center justify-center min-w-[80px] text-center font-bold text-lg ${
                        order.category === 'Critical' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <span>{order.room.charAt(0)}</span>
                        <span className="text-[10px] uppercase font-bold tracking-tighter mt-1">{order.room}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-bold text-slate-900 text-sm">{order.title}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            order.category === 'Critical'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 max-w-xl leading-relaxed">{order.description}</p>
                        <div className="flex items-center gap-4 text-[10px] font-semibold text-slate-400 pt-1">
                          <span>👤 Submitted by {order.studentName}</span>
                          <span>•</span>
                          <span>📅 {order.submittedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-row lg:flex-col gap-2">
                      <button
                        onClick={() => {
                          triggerToast(`🔧 Task marked In-Progress: dispatched local team B.`);
                          addLog('Alex Rivera', 'staff', 'Marked Task In-Progress', `Ticket #${order.ticketId}`, 'Success');
                        }}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5" /> Mark In-Progress
                      </button>
                      <button
                        onClick={() => {
                          resolveComplaint(order.id);
                          triggerToast(`✅ Completed maintenance task: ticket #${order.ticketId} marked resolved.`);
                          addLog('Alex Rivera', 'staff', 'Completed Maintenance Ticket', `Ticket #${order.ticketId}`, 'Success');
                        }}
                        className="border border-slate-250 text-slate-500 hover:bg-slate-100 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Completed
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 bg-slate-50 text-center text-xs">
              <span className="text-amber-700 font-bold cursor-pointer hover:underline">
                View All {activeWorkOrders.length} Assigned Orders
              </span>
            </div>
          </div>

          {/* Maintenance & Inventory Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Inventory Alerts section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-500" /> Inventory Alerts
              </h3>
              
              <div className="space-y-3 flex-grow">
                {inventory.map((item) => (
                  <div key={item.id} className={`p-4 rounded-xl flex items-center justify-between border ${
                    item.status === 'Low' ? 'bg-rose-50/20 border-rose-100/50' : 'bg-slate-50/50 border-slate-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${item.status === 'Low' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {item.icon === 'lightbulb' ? (
                          <Lightbulb className="w-5 h-5" />
                        ) : item.icon === 'plumbing' ? (
                          <Wrench className="w-5 h-5" />
                        ) : (
                          <Package className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-none">{item.name}</p>
                        <span className={`text-[10px] font-bold mt-1.5 block ${
                          item.status === 'Low' ? 'text-rose-600' : 'text-slate-400'
                        }`}>
                          {item.status === 'Low' ? `Only ${item.quantity} units remaining` : `${item.quantity} units in stock`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        reorderItem(item.id);
                        triggerToast(`📦 RESTOCK: Reordered 50 units for "${item.name}".`);
                      }}
                      className="text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 px-4 py-2 border rounded-xl shadow-sm"
                    >
                      Reorder
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Preventive Maintenance grid list */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Bolt className="w-5 h-5 text-amber-500" /> Upcoming Preventive Maintenance
              </h3>
              
              <div className="divide-y divide-slate-100">
                <div onClick={() => triggerToast('AC Filter system checked.')} className="flex items-center justify-between py-3 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <div>
                    <p className="font-bold text-slate-800 text-sm leading-tight">AC Filter Cleaning - Block B</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Scheduled: Oct 26, 09:00 AM</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-350" />
                </div>

                <div onClick={() => triggerToast('Fire extinguisher checklist retrieved.')} className="flex items-center justify-between py-3 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <div>
                    <p className="font-bold text-slate-800 text-sm leading-tight">Fire Extinguisher Inspection</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Scheduled: Oct 28, 11:30 AM</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-350" />
                </div>

                <div onClick={() => triggerToast('Roof drainage checklist retrieved.')} className="flex items-center justify-between py-3 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <div>
                    <p className="font-bold text-slate-800 text-sm leading-tight">Roof Drainage Check</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Scheduled: Oct 30, 08:00 AM</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-350" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Floating Action Button for Staff to create quick task */}
      <button
        onClick={() => setShowNewTaskModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <PlusCircle className="w-6 h-6 transition-transform group-hover:rotate-90" />
      </button>

      {/* NEW TASK QUICK DIALOG MODAL */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-md shadow-2xl relative animate-slide-up">
            <button onClick={() => setShowNewTaskModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900 mb-4">Create Quick Maintenance Task</h3>
            
            <form onSubmit={handleAddNewTask} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Block B corridor fire-alarm battery repair"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Room / Area Designation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Block B Room 305 / Main Lobby / Corridor"
                  value={newTaskRoom}
                  onChange={(e) => setNewTaskRoom(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Short Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Enter details..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#131b2e] hover:bg-amber-500 text-white hover:text-slate-950 py-3 rounded-xl text-xs font-bold transition-all"
              >
                Create Maintenance Dispatch Card
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
