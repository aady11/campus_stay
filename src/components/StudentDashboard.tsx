import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import {
  LayoutDashboard,
  Bed,
  LogOut,
  AlertTriangle,
  UserPlus,
  CreditCard,
  Megaphone,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Mail,
  DoorOpen,
  CheckCircle2,
  Clock,
  Droplet,
  Wifi,
  Lightbulb,
  Utensils,
  Zap,
  Trophy,
  PlusCircle,
  Send,
  X,
  Sparkles,
  CalendarDays
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    leaves,
    complaints,
    notices,
    submitLeave,
    submitComplaint,
    logout
  } = useAppState();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'leave' | 'complaint' | 'fees'>('dashboard');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState<'leave' | 'complaint' | null>(null);

  // Leave Form States
  const [leaveType, setLeaveType] = useState<'Weekend' | 'Local' | 'Holiday'>('Weekend');
  const [leaveDates, setLeaveDates] = useState('');
  const [leavePurpose, setLeavePurpose] = useState('');

  // Complaint Form States
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [complaintCategory, setComplaintCategory] = useState<'Critical' | 'Maintenance' | 'Security'>('Maintenance');

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Calculate dynamic stats
  const pendingRequestsCount = leaves.filter(l => l.studentId === 'alex_johnson' && l.status === 'PENDING').length;
  const studentComplaints = complaints.filter(c => c.studentId === 'alex_johnson');

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveDates || !leavePurpose) return;
    submitLeave(leaveType, leaveDates, leavePurpose);
    setLeaveDates('');
    setLeavePurpose('');
    setShowRequestModal(false);
    setRequestType(null);
    triggerNotification('🛫 Leave request submitted successfully! Pending Warden approval.');
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintTitle || !complaintDesc) return;
    submitComplaint(complaintTitle, complaintDesc, complaintCategory);
    setComplaintTitle('');
    setComplaintDesc('');
    setShowRequestModal(false);
    setRequestType(null);
    triggerNotification('🔧 Maintenance ticket raised! Placed in Active Work queue.');
  };

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 4000);
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased min-h-screen flex font-sans">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold">{notificationMsg}</span>
        </div>
      )}

      {/* Side Navigation Bar */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#131b2e] flex flex-col py-6 px-4 overflow-y-auto border-r border-[#1e293b] shadow-xl z-50">
        <div className="mb-8 px-4">
          <h1 className="font-headline-lg text-2xl font-bold text-white tracking-widest flex items-center gap-2">
            <DoorOpen className="w-6 h-6 text-blue-500" />
            EduHostel
          </h1>
          <p className="text-xs text-sky-400/60 uppercase tracking-widest font-semibold mt-1">CampusStay Student</p>
        </div>

        <nav className="flex-1 space-y-1.5 px-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              activeTab === 'dashboard'
                ? 'text-white border-l-4 border-blue-500 bg-slate-800'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </button>

          <button
            onClick={() => {
              setRequestType('leave');
              setShowRequestModal(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all font-medium"
          >
            <CalendarDays className="w-5 h-5" />
            <span className="text-sm">Apply for Leave</span>
          </button>

          <button
            onClick={() => {
              setRequestType('complaint');
              setShowRequestModal(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all font-medium"
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">Submit Complaint</span>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              activeTab === 'fees'
                ? 'text-white border-l-4 border-blue-500 bg-slate-800'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-sm">Fee Status</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800 px-1 space-y-1">
          <span className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Settings className="w-5 h-5" />
            <span className="text-xs font-semibold">Settings</span>
          </span>
          <span className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-semibold">Support</span>
          </span>
          
          {/* Quick Logout Button */}
          <button
            onClick={logout}
            className="w-full mt-4 flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="sticky top-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 flex justify-between items-center z-40 shadow-sm">
          <div className="flex items-center bg-slate-100 px-4 py-2 rounded-full border border-slate-200 w-96 group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources, notices, schedules..."
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 outline-none text-slate-700"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-full hover:bg-slate-100 transition-all">
                <Bell className="w-5 h-5 text-slate-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-slate-100 transition-all">
                <Mail className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{currentUser?.name || 'Alex Johnson'}</p>
                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                  {currentUser?.extra || 'B.Tech CS • Year 3'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC48reJZ3MOJffEcsVU7BSVp_VrRzedKc9jrE3HOCzD7KbrfYEbj1kRS7ExCdFAYQlfgFjkwzhZv6y4jFfPRGX8n718Ihdnxn3Ma9mgVOMISXMmU991QefwpAkmGXSDW3ow_PrENMM-NMzrj9HtzO-pMn2Zea6pUB3PZlqpOIvFV6qHUgxe9Sj7cys9MeDrw_z8x7f3_V2pCr2WwZsN31VwCqcAyGpNZ8Jk8CynWBwE5eMOCk86UwH-811pPvGet9VXA4YKErAKIvg"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas Wrapper */}
        <main className="p-8 flex-grow overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Summary Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Room Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="p-3 bg-blue-50 rounded-xl text-blue-600">
                      <Bed className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">Primary</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Room Number</p>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">B-204</h2>
                  </div>
                </div>

                {/* Fee Status Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">On Time</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fee Status</p>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Paid</h2>
                  </div>
                </div>

                {/* Pending Requests */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="p-3 bg-amber-50 rounded-xl text-amber-600">
                      <Clock className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">Queue</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Requests</p>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">{pendingRequestsCount}</h2>
                  </div>
                </div>

                {/* Notifications Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="p-3 bg-rose-50 rounded-xl text-rose-600">
                      <Bell className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">Unread</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Notifications</p>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">3</h2>
                  </div>
                </div>

              </div>

              {/* Asymmetric Core Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Asymmetric Block: Complaint Tracker (8 cols) */}
                <section className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6 text-blue-600" />
                      <h3 className="font-title-md text-lg font-bold text-slate-900">Complaint Tracker</h3>
                    </div>
                    <button
                      onClick={() => {
                        setRequestType('complaint');
                        setShowRequestModal(true);
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      + File Support Ticket
                    </button>
                  </div>

                  <div className="space-y-3">
                    {studentComplaints.length === 0 ? (
                      <p className="text-center text-slate-400 py-8 text-sm">No maintenance tickets registered to B-204.</p>
                    ) : (
                      studentComplaints.map((item) => (
                        <div key={item.id} className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                              {item.title.toLowerCase().includes('water') ? (
                                <Droplet className="w-6 h-6 text-blue-500" />
                              ) : item.title.toLowerCase().includes('wifi') || item.title.toLowerCase().includes('internet') ? (
                                <Wifi className="w-6 h-6 text-slate-600" />
                              ) : (
                                <Lightbulb className="w-6 h-6 text-yellow-500" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900">{item.title}</h4>
                              <p className="text-xs text-slate-400 mt-0.5">{item.submittedAt}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {item.status === 'Resolved' ? 'Resolved On' : 'Assigned To'}
                              </p>
                              <p className="text-xs font-semibold text-slate-700">
                                {item.status === 'Resolved' ? item.resolvedAt : (item.assignedTo || 'Unassigned')}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'Resolved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                {/* Right sidebar: Recent Notices (4 cols) */}
                <section className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Megaphone className="w-6 h-6 text-blue-600" />
                    <h3 className="font-title-md text-lg font-bold text-slate-900">Recent Notices</h3>
                  </div>

                  <div className="space-y-6 relative pl-4 before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-slate-100">
                    {notices.slice(0, 3).map((item) => (
                      <div key={item.id} className="relative pl-8">
                        <div className="absolute left-0 top-0.5 w-[40px] h-[40px] bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center bg-white z-10 shadow-sm">
                          {item.icon === 'dinner_dining' ? (
                            <Utensils className="w-4 h-4 text-blue-600" />
                          ) : item.icon === 'event_busy' ? (
                            <Zap className="w-4 h-4 text-amber-500" />
                          ) : (
                            <Trophy className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.content}</p>
                          <span className="text-[10px] text-slate-400 font-semibold block mt-1.5">{item.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 transition-all">
                    Browse All Notices
                  </button>
                </section>

              </div>

              {/* Bottom Quick Action Strip */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Mess Bookings */}
                <div className="relative h-40 rounded-2xl overflow-hidden group border border-slate-200 cursor-pointer shadow-sm hover:shadow-lg transition-all">
                  <img
                    alt="Hostel Canteen"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEuu4Zc9xTJx2nM2-j35Ch_hfWn1z_PZ-I98Vd8yEggU52ZKG-KctGdHRzu2sMn0CeoCWpdcUKWIN3mhlTu_L9NvEd2cWFS0KSbVnFiC-6ckhA9rcnudVyRkktxkCzX-wFfKAu-YQ909DDfcs94OreKX2Z3Kr2m_-OQkdE2bINBZRCD64MXYIzQwNrhHo7WaRxlQ2c4qBzE05S_iULeiDYeYAZ42NfbVpx8yV5Lu0Q_A7Lx5qyLWKrUbkqXsHQ__2Zhl4ayYUAcas"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                    <p className="text-white font-bold">Mess Bookings</p>
                    <p className="text-white/70 text-xs mt-0.5">Order snacks or view daily coupons</p>
                  </div>
                </div>

                {/* Laundry Pickup */}
                <div className="relative h-40 rounded-2xl overflow-hidden group border border-slate-200 cursor-pointer shadow-sm hover:shadow-lg transition-all">
                  <img
                    alt="Laundry Service"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY5km13zHDYb0j688MUHEA1KsoucIOqtbb40EDC8aKLYeOupkoewOX69SVuO8_YBOgTWTsYUoJQyvQ3huTneyb2dWCNa-Yycr25sO7f7UZEqUgWhAa7SXfT6aFcjo1SfVqYHa4ejgUUzqxRIdVDHj8sSFhB9z_sKUUld_rHdpCa7NUKaauPdJGA_mcz-GoY0dQzuGKt2eslm1y0mmdH9jwrCETqE0-rYSvnGDNpJtktY29zVWLrgd3c1hEJPN9PN4KKGNeKGMn-ss"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                    <p className="text-white font-bold">Laundry Pickup</p>
                    <p className="text-white/70 text-xs mt-0.5">Schedule your next laundry slot</p>
                  </div>
                </div>

                {/* Study Room */}
                <div className="relative h-40 rounded-2xl overflow-hidden group border border-slate-200 cursor-pointer shadow-sm hover:shadow-lg transition-all">
                  <img
                    alt="Library Study"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpyrPqZHbiSrfzuo8boe6aUdwwaguRZbywob6lBNW3ddNWAalU6Frn62AHKUBTuDi4ZvV7aACxJQiO60ZKlPm5fbgOBH16LB5oLXTXR5EMhPSI5pBx6YHwCiXu5W-ksaU2sRcyEb8Yc9hON5v4m7WH7cOlogErI_Y7NJ-tgYQ3x78g49vfwCoBzNrjBbAjWK1YvfJr4HkjY8kq5Kf38dUEh8LLudeQ8zZvwVBYbjYLj75ueoFwza1924ItiT6ysiOANmhm7bcaP4Y"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                    <p className="text-white font-bold">Study Room</p>
                    <p className="text-white/70 text-xs mt-0.5">Reserve a quiet desk for finals</p>
                  </div>
                </div>

                {/* Quick New Request */}
                <div
                  onClick={() => {
                    setRequestType('leave');
                    setShowRequestModal(true);
                  }}
                  className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-md hover:bg-blue-700 transition-all cursor-pointer group hover:scale-[1.01]"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-3 border border-white/20 transition-transform group-hover:scale-110">
                    <PlusCircle className="w-8 h-8" />
                  </div>
                  <p className="font-bold">New Request</p>
                  <p className="text-white/70 text-xs mt-1">Gate pass, Maintenance, and more</p>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'fees' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-headline-lg text-2xl font-bold mb-4">Account Fee Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hostel Semester Fees</p>
                  <p className="text-3xl font-bold mt-2">$2,400.00</p>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mt-4 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" /> PAID ON TIME
                  </span>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Mess / Dining Fees</p>
                  <p className="text-3xl font-bold mt-2">$850.00</p>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mt-4 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" /> PAID ON TIME
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs text-center">Receipts archived globally. Contact the main registrar for institutional copy.</p>
            </div>
          )}

        </main>
      </div>

      {/* COMPREHENSIVE REQUEST MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden animate-slide-up">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  {requestType === 'leave' ? <CalendarDays className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </span>
                <h3 className="font-bold text-slate-900">
                  {requestType === 'leave' ? 'Apply for Leave Permission' : 'Submit Maintenance Complaint'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestType(null);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Switch toggles */}
            <div className="flex bg-slate-100 p-1 mx-6 mt-6 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setRequestType('leave')}
                className={`flex-1 py-2 rounded-lg font-bold text-center text-xs transition-all ${
                  requestType === 'leave' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                🛫 Apply for Leave
              </button>
              <button
                type="button"
                onClick={() => setRequestType('complaint')}
                className={`flex-1 py-2 rounded-lg font-bold text-center text-xs transition-all ${
                  requestType === 'complaint' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                🔧 Maintain Residence
              </button>
            </div>

            {/* LEAVE APPLICATION FORM */}
            {requestType === 'leave' ? (
              <form onSubmit={handleLeaveSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {['Local', 'Weekend', 'Holiday'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setLeaveType(t as any)}
                      className={`py-2 rounded-xl border text-xs font-semibold ${
                        leaveType === t
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Oct 25 - Oct 25 (Weekend) or Oct 29 - Nov 03"
                    value={leaveDates}
                    onChange={(e) => setLeaveDates(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reason or Purpose</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide a valid detail for leave permission. e.g. Visiting home for festival celebrations / Medical consultation..."
                    value={leavePurpose}
                    onChange={(e) => setLeavePurpose(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-bold text-sm tracking-wider shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> SUBMIT LEAVE APPLICATION
                </button>
              </form>
            ) : (
              /* COMPLAINT SUBMISSION FORM */
              <form onSubmit={handleComplaintSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Complaint Title</label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="e.g. Bathroom washbasin faucet leaking / Clogged shower drain"
                    value={complaintTitle}
                    onChange={(e) => setComplaintTitle(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urgency Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Critical', 'Maintenance', 'Security'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setComplaintCategory(cat as any)}
                        className={`py-2 rounded-xl border text-xs font-semibold ${
                          complaintCategory === cat
                            ? cat === 'Critical'
                              ? 'border-rose-500 bg-rose-50 text-rose-700'
                              : 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Problem Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Deeply explain the issue. Mention specific details (e.g. dripping rate, blockages, floor wetness) so we can dispatch the accurate crew."
                    value={complaintDesc}
                    onChange={(e) => setComplaintDesc(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#131b2e] text-white py-3 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm tracking-wider shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> DISPATCH RESIDENCE COMPLAINT
                </button>
              </form>
            )}

            <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-[10px] text-slate-400 leading-normal">
              🛡️ Submissions are archived securely in the central registrar. Simulation triggers Warden alert.
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Assistance Bubble */}
      <button
        onClick={() => {
          triggerNotification("💬 Calling student welfare representative... Helpdesk alerted.");
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 hover:bg-blue-700"
      >
        <Sparkles className="w-6 h-6" />
      </button>

    </div>
  );
};
