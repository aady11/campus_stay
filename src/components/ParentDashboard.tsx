import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  CreditCard,
  Megaphone,
  HeartHandshake,
  ShieldAlert,
  Settings,
  HelpCircle,
  Bell,
  Mail,
  Home,
  CheckCircle2,
  TrendingUp,
  Clock,
  Phone,
  MessageSquare,
  AlertOctagon,
  ExternalLink,
  Printer,
  ChevronRight,
  Video,
  X
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const {
    leaves,
    logout,
    addLog
  } = useAppState();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'parent' | 'warden'; text: string; time: string }>>([
    { sender: 'warden', text: 'Hello Mrs. Sharma, Rahul is doing great. His attendance in dinner is registered.', time: 'Yesterday' }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage) return;
    const userMsg = chatMessage;
    setChatLog(prev => [...prev, { sender: 'parent', text: userMsg, time: 'Just now' }]);
    setChatMessage('');
    addLog('Mrs. Sharma (Parent)', 'parent', 'Sent chat message to Warden', 'Mr. Arvind Kumar', 'Success');

    // Simulate friendly warden auto-response
    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        {
          sender: 'warden',
          text: 'Thank you for your message! I will review this during my active rounds and get back to you shortly.',
          time: 'Just now'
        }
      ]);
    }, 1500);
  };

  // Filter leaves to show Rahul S. / Liam Peterson / child leave requests
  // For interactive parent feedback, show all leaves as if they belong to Rahul/child
  const parentLeaves = leaves;

  return (
    <div className="bg-slate-50 text-slate-800 antialiased min-h-screen flex font-sans">
      
      {/* Toast helper */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-emerald-900 border border-emerald-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* SideNavBar Integration */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#131b2e] flex flex-col py-6 px-4 overflow-y-auto border-r border-slate-800 shadow-xl z-50">
        <div className="mb-8 px-4">
          <h1 className="font-headline-lg text-3xl font-extrabold text-white mb-1">CS</h1>
          <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest leading-none">CampusStay Parent</p>
        </div>

        <nav className="flex-grow space-y-1">
          <span className="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-300 border-l-4 border-emerald-500 bg-white/5 font-semibold text-sm transition-all cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </span>
          <span onClick={() => triggerToast('📋 Student details compiled for Term 3.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <User className="w-5 h-5" />
            <span>Student Details</span>
          </span>
          <span onClick={() => triggerToast('📅 Child currently checked inside Block B-204.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <CalendarCheck className="w-5 h-5" />
            <span>Leave Status</span>
          </span>
          <span onClick={() => triggerToast('💳 No pending invoices. Balance is $0.00.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <CreditCard className="w-5 h-5" />
            <span>Fee Info</span>
          </span>
          <span onClick={() => triggerToast('📢 Displaying last 3 notices')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <Megaphone className="w-5 h-5" />
            <span>Notices</span>
          </span>
          <span onClick={() => setShowChatModal(true)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <HeartHandshake className="w-5 h-5" />
            <span>Contact Warden</span>
          </span>
          <span onClick={() => triggerToast('🚨 Emergency alert system is fully functional.')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer">
            <ShieldAlert className="w-5 h-5" />
            <span>Emergency Contacts</span>
          </span>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 space-y-1.5">
          <span className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </span>
          <span className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </span>
          <button
            onClick={() => {
              triggerToast('🖨️ Generating Academic & Leave profile report PDF...');
              addLog('Mrs. Sharma (Parent)', 'parent', 'Generated Report PDF', 'Rahul S. - B-204', 'Success');
            }}
            className="w-full mt-4 bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Generate Reports
          </button>
          
          <button
            onClick={logout}
            className="w-full mt-2 bg-rose-500/10 text-rose-300 py-2.5 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all"
          >
            Log Out Parent Mode
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-[260px] flex-grow flex flex-col min-h-screen">
        
        {/* TopNavBar Integration */}
        <header className="sticky top-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex justify-between items-center px-8 z-40 shadow-sm">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold font-headline-lg text-[#011a42]">EduHostel</h2>
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Parent Panel</p>
              <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                <Home className="w-4 h-4" /> Rahul S. (Block B - 204)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
                <Mail className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt6DthHfpyee4MEiKOCJAgGDUbj4UNTKSdDsWsaVd5O2kdr2XaFRyP-MtoHmlEul7pKULvhQD3_oq5-1EYgprONETbaiFZUxrx7h6uHfLdgHKI1r8y0r-ml1GaLzWQIsezA0Wne1L4RVafOVVkosdN4gREy6eIxi6Sl5sLjcUZt9IRQhLG9MY3eKAAnA_D-EwUTUdBCNKJoSu4fD9J7v4lqci9vDPynITWLyKlTERLdRzmkCRlTS89oEc4-hSteVi1srldLMon7IE"
                alt="Parent Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-bold text-slate-700 pr-1">Mrs. Sharma</span>
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="p-8 max-w-[1440px] mx-auto w-full space-y-6 flex-grow overflow-y-auto">
          
          {/* Bento Grid - Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Status: In Hostel */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 transition-transform group-hover:scale-105">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">Active</span>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-1">Student Status</p>
              <p className="text-2xl font-bold text-slate-800">In Hostel</p>
              <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Checked in: Today, 08:30 AM
              </p>
            </div>

            {/* Attendance Circular Index */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 transition-transform group-hover:scale-105">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                
                {/* SVG Progress Circle */}
                <div className="w-10 h-10 flex items-center justify-center relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-slate-150 stroke-slate-100" cx="20" cy="20" fill="transparent" r="16" strokeWidth="4"></circle>
                    <circle className="text-emerald-500 stroke-emerald-500" cx="20" cy="20" fill="transparent" r="16" strokeDasharray="100" strokeDashoffset="8" strokeWidth="4"></circle>
                  </svg>
                  <span className="absolute text-[10px] font-bold text-emerald-600">92%</span>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-1">Attendance</p>
              <p className="text-2xl font-bold text-slate-800">92% <span className="text-sm font-normal text-slate-500">Monthly</span></p>
              <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Above average (85%)
              </p>
            </div>

            {/* Fee Status */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 transition-transform group-hover:scale-105">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">Paid</span>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-1">Fee Status</p>
              <p className="text-2xl font-bold text-slate-800">Clear</p>
              <p className="text-[11px] text-slate-500 mt-3 font-semibold">
                Next Due: Oct 15th, 2024
              </p>
            </div>

            {/* Latest Updates */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 transition-transform group-hover:scale-105">
                  <Megaphone className="w-5 h-5" />
                </div>
                <span className="animate-pulse w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-1">Latest Updates</p>
              <p className="text-sm font-bold text-slate-800 line-clamp-1">New Notice: Mess Timings</p>
              <p className="text-[11px] text-slate-500 mt-3 font-semibold">
                Posted 2 hours ago
              </p>
            </div>

          </div>

          {/* Table and Sides Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Child's Leave History (2 cols) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-[#131b2e]">Child's Leave History</h3>
                <span onClick={() => triggerToast('📊 Pulling completed archives...')} className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer">
                  View All Records
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans">
                  <thead className="bg-[#eff4ff]/60 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">DATE</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">TYPE</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">PURPOSE</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parentLeaves.map((leave) => (
                      <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">{leave.dateRange}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{leave.type}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{leave.purpose}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold ${
                            leave.status === 'APPROVED' 
                              ? 'bg-blue-100 text-blue-800' 
                              : leave.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side Panel: Direct Contact & Emergencies */}
            <div className="space-y-6">
              
              {/* Warden Contact Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Direct Contact</h3>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOzE1mgSVbHuWui5fi9fUK1Ftbp5XiZ3PdLdrPl90C8SK15FZkIoVJrVYTaZSrVoo3JDXjSORxELV6OwnwQEhnU2FFHYsdxjUBCi7SYkVUCjiDp3DuYu-EGg5SbowwzeEg0q29T1UJqx6tU0yXCFOKRjTNkpqyV-GWVqXw5v1tFbJIM06V02NgUvTCGCwk2-DjRxvm819pMOR3hnfHepYSN4jfVFRMSF3rP_Z5FJlCZNzJp1Z47Q-PPL4fMGGkxu9cYPhsZxHrA4Q"
                    alt="Warden Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">Mr. Arvind Kumar</h4>
                    <p className="text-xs text-slate-500 font-medium">Hostel Warden (Block B)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowCallModal(true)}
                    className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-xs font-bold hover:bg-emerald-500 transition-all shadow-sm active:scale-95"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </button>
                  <button
                    onClick={() => setShowChatModal(true)}
                    className="flex items-center justify-center gap-2 border border-emerald-600 text-emerald-700 py-3 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" /> Message
                  </button>
                </div>

                <div className="mt-4 p-3.5 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Last checked: 15 mins ago
                  </p>
                </div>
              </div>

              {/* Emergency Contacts Protocol */}
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-rose-700 mb-4">
                  <AlertOctagon className="w-5 h-5" />
                  <h3 className="text-xs font-extrabold uppercase tracking-widest">Emergency Protocol</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-rose-100/30">
                    <div>
                      <p className="text-xs font-bold text-rose-950">Campus Security</p>
                      <p className="text-xs text-rose-700 font-medium">+91 99880 11223</p>
                    </div>
                    <span onClick={() => { triggerToast('Calling emergency campus security...'); }} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg cursor-pointer">
                      <Phone className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-rose-100/30">
                    <div>
                      <p className="text-xs font-bold text-rose-950">Medical Center</p>
                      <p className="text-xs text-rose-700 font-medium">+91 99880 44556</p>
                    </div>
                    <span onClick={() => { triggerToast('Connecting with 24/7 campus triage...'); }} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg cursor-pointer">
                      <Phone className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mess Satisfaction</p>
              <h4 className="text-3xl font-extrabold text-slate-800 mt-2">4.8 / 5.0</h4>
              <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                ⭐ Based on direct student feedback
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Utility Consumption</p>
              <h4 className="text-3xl font-extrabold text-slate-800 mt-1">Normal</h4>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div
              onClick={() => triggerToast('🔗 Launching secure academic registrar portal...')}
              className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-6 shadow-sm cursor-pointer transition-colors group"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Link</p>
              <h4 className="text-md font-bold text-slate-800 mt-2 group-hover:text-emerald-700">Access Grade Reports</h4>
              <div className="flex items-center gap-1.5 text-emerald-600 mt-3 font-bold text-xs uppercase tracking-wider">
                <span>Launch Portal</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* QUICK CALL DIALOG MODAL */}
      {showCallModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-emerald-100 p-8 w-full max-w-sm text-center shadow-2xl relative animate-slide-up">
            <button onClick={() => setShowCallModal(false)} className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
              <Phone className="w-10 h-10 text-emerald-600 animate-pulse" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Calling Warden</h3>
            <p className="text-sm font-semibold text-emerald-600 mt-1">Mr. Arvind Kumar</p>
            <p className="text-xs text-slate-400 mt-4 leading-normal">
              Connecting secure campus line. Please ensure your registered mobile number is reachable.
            </p>
            <button
              onClick={() => {
                setShowCallModal(false);
                triggerToast('📞 Call connected on mobile lines.');
              }}
              className="w-full mt-6 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-500 transition-colors"
            >
              Connect Mobile Line
            </button>
          </div>
        </div>
      )}

      {/* QUICK CHAT COMPANION MODAL */}
      {showChatModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md shadow-2xl flex flex-col h-[500px] overflow-hidden animate-slide-up">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOzE1mgSVbHuWui5fi9fUK1Ftbp5XiZ3PdLdrPl90C8SK15FZkIoVJrVYTaZSrVoo3JDXjSORxELV6OwnwQEhnU2FFHYsdxjUBCi7SYkVUCjiDp3DuYu-EGg5SbowwzeEg0q29T1UJqx6tU0yXCFOKRjTNkpqyV-GWVqXw5v1tFbJIM06V02NgUvTCGCwk2-DjRxvm819pMOR3hnfHepYSN4jfVFRMSF3rP_Z5FJlCZNzJp1Z47Q-PPL4fMGGkxu9cYPhsZxHrA4Q"
                  alt="Warden Profile"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-slate-900">Mr. Arvind Kumar</h4>
                  <p className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> Active on Portal
                  </p>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'parent' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 max-w-[80%] rounded-2xl text-xs leading-relaxed font-medium ${
                    msg.sender === 'parent' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border text-slate-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1 font-semibold">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Footer Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 flex gap-2 bg-white">
              <input
                type="text"
                placeholder="Write your message..."
                required
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-grow border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#131b2e] hover:bg-emerald-600 text-white px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center"
              >
                Send
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
