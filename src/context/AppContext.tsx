import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  LeaveRequest,
  Complaint,
  Notice,
  InventoryItem,
  SystemLog
} from '../types';

interface AppContextProps {
  currentRole: UserRole | null;
  currentUser: { name: string; email: string; extra?: string } | null;
  leaves: LeaveRequest[];
  complaints: Complaint[];
  notices: Notice[];
  inventory: InventoryItem[];
  logs: SystemLog[];
  login: (role: UserRole, email: string) => void;
  logout: () => void;
  submitLeave: (type: 'Weekend' | 'Local' | 'Holiday', dateRange: string, purpose: string) => void;
  submitComplaint: (title: string, description: string, category: 'Critical' | 'Maintenance' | 'Security') => void;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;
  assignComplaint: (id: string, staffName: string) => void;
  resolveComplaint: (id: string) => void;
  updateInventory: (id: string, qty: number) => void;
  reorderItem: (id: string) => void;
  createNotice: (title: string, content: string, category: 'mess' | 'power' | 'sports' | 'general') => void;
  addLog: (user: string, role: string, action: string, entity: string, status: 'Success' | 'Failed') => void;
  wingBHeatmap: boolean[];
  toggleHeatmapRoom: (index: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; extra?: string } | null>(null);

  // Leave Requests state
  const [leaves, setLeaves] = useState<LeaveRequest[]>([
    {
      id: 'L001',
      studentId: 'alex_johnson',
      studentName: 'Liam Peterson',
      room: 'Room 302B • Wing A',
      dateRange: 'Oct 24 - Oct 27',
      type: 'Weekend',
      purpose: 'Family Event',
      status: 'PENDING',
      submittedAt: 'Today, 09:12 AM'
    },
    {
      id: 'L002',
      studentId: 'sarah_miller',
      studentName: 'Sarah Miller',
      room: 'Room 112A • Wing C',
      dateRange: 'Oct 25 - Oct 25',
      type: 'Local',
      purpose: 'Medical Checkup',
      status: 'PENDING',
      submittedAt: 'Today, 08:45 AM'
    },
    {
      id: 'L003',
      studentId: 'david_chen',
      studentName: 'David Chen',
      room: 'Room 205 • Wing B',
      dateRange: 'Oct 26 - Oct 30',
      type: 'Holiday',
      purpose: 'Out of Town',
      status: 'PENDING',
      submittedAt: 'Yesterday'
    },
    {
      id: 'L004',
      studentId: 'rahul_s',
      studentName: 'Rahul S.',
      room: 'Room B-204',
      dateRange: 'Oct 02 - Oct 05',
      type: 'Holiday',
      purpose: 'Ganesh Chaturthi',
      status: 'APPROVED',
      submittedAt: 'Oct 01, 2023'
    },
    {
      id: 'L005',
      studentId: 'rahul_s',
      studentName: 'Rahul S.',
      room: 'Room B-204',
      dateRange: 'Aug 15 - Aug 18',
      type: 'Holiday',
      purpose: 'Public Holiday',
      status: 'COMPLETED',
      submittedAt: 'Aug 14, 2023'
    },
    {
      id: 'L006',
      studentId: 'rahul_s',
      studentName: 'Rahul S.',
      room: 'Room B-204',
      dateRange: 'Aug 28 - Aug 28',
      type: 'Local',
      purpose: 'Evening Out',
      status: 'COMPLETED',
      submittedAt: 'Aug 28, 2023'
    },
    {
      id: 'L007',
      studentId: 'rahul_s',
      studentName: 'Rahul S.',
      room: 'Room B-204',
      dateRange: 'Sep 12 - Sep 14',
      type: 'Weekend',
      purpose: 'Home Visit',
      status: 'COMPLETED',
      submittedAt: 'Sep 11, 2023'
    }
  ]);

  // Complaints / Maintenance state
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 'C001',
      ticketId: '8842',
      studentId: 'alex_johnson',
      studentName: 'Alex Johnson',
      room: 'B-204',
      title: 'Water Leak in Bathroom',
      description: 'Student reported a significant leak from the bathroom ceiling. Damage to drywall suspected. Please check the shut-off valve first.',
      category: 'Critical',
      submittedAt: 'Oct 24, 2023 • Submitted 2h ago',
      assignedTo: 'Maintenance Team B',
      status: 'In Progress'
    },
    {
      id: 'C002',
      ticketId: '8710',
      studentId: 'alex_johnson',
      studentName: 'Alex Johnson',
      room: 'B-204',
      title: 'Internet Connectivity Issue',
      description: 'Wi-Fi router in corridor is blinking red and not providing internet access.',
      category: 'Maintenance',
      submittedAt: 'Oct 20, 2023  • Ticket #8710',
      resolvedAt: 'Oct 21, 2023',
      status: 'Resolved'
    },
    {
      id: 'C003',
      ticketId: '8655',
      studentId: 'alex_johnson',
      studentName: 'Alex Johnson',
      room: 'B-204',
      title: 'Corridor Bulb Replacement',
      description: 'The tube light in front of room B-204 is flickering.',
      category: 'Maintenance',
      submittedAt: 'Oct 18, 2023 • Ticket #8655',
      resolvedAt: 'Oct 19, 2023',
      status: 'Resolved'
    },
    {
      id: 'C004',
      ticketId: '8910',
      studentId: 'sarah_miller',
      studentName: 'Sarah Miller',
      room: '112A',
      title: 'Broken window latch',
      description: "Window won't lock securely. Safety concern for ground floor resident. Parts ordered and arrived this morning.",
      category: 'Maintenance',
      submittedAt: 'Submitted 5h ago',
      assignedTo: 'Michael Thorne',
      status: 'In Progress'
    },
    {
      id: 'C005',
      ticketId: '8911',
      studentId: 'lobby',
      studentName: 'Reception Desk',
      room: 'Lobby',
      title: 'Main door sensor flickering',
      description: 'Entrance door sensor sometimes fails to detect residents. Needs recalibration or battery check.',
      category: 'Maintenance',
      submittedAt: 'Submitted 1d ago',
      status: 'PENDING'
    },
    {
      id: 'C006',
      ticketId: '8912',
      studentId: 'block_b',
      studentName: 'Warden Alert',
      room: 'Room 412',
      title: 'AC Not Cooling',
      description: 'Room 412: Fan working but no cold air.',
      category: 'Critical',
      submittedAt: '2h ago',
      status: 'In Progress'
    }
  ]);

  // Notices state
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 'N001',
      title: 'New Mess Menu - Oct 25',
      content: 'The mess committee has updated the weekly menu including new healthy breakfast options.',
      category: 'mess',
      timestamp: '2 hours ago',
      icon: 'dinner_dining'
    },
    {
      id: 'N002',
      title: 'Power Shutdown Scheduled',
      content: 'Block B will experience a brief power outage from 2 PM to 4 PM for electrical maintenance.',
      category: 'power',
      timestamp: 'Yesterday',
      icon: 'event_busy'
    },
    {
      id: 'N003',
      title: 'Inter-Hostel Sports Fest',
      content: 'Registrations are now open for the Annual Sports Fest 2023. Join the trials at the main ground.',
      category: 'sports',
      timestamp: '2 days ago',
      icon: 'festival'
    },
    {
      id: 'N004',
      title: 'Fire Drill tomorrow at 4 PM',
      content: 'Mandatory for all wings to attend the training safety program.',
      category: 'general',
      timestamp: 'Active Alert',
      icon: 'campaign'
    }
  ]);

  // InventoryItems state
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'I001',
      name: 'LED Tubes (4ft)',
      quantity: 2,
      status: 'Low',
      icon: 'lightbulb'
    },
    {
      id: 'I002',
      name: 'Faucet Washers',
      quantity: 15,
      status: 'Low',
      icon: 'plumbing'
    },
    {
      id: 'I003',
      name: 'RJ45 Connectors',
      quantity: 120,
      status: 'Good',
      icon: 'lan'
    },
    {
      id: 'I004',
      name: 'Door Latches',
      quantity: 8,
      status: 'Good',
      icon: 'lock'
    }
  ]);

  // System Activity Log
  const [logs, setLogs] = useState<SystemLog[]>([
    {
      id: 'LOG001',
      user: 'John Doe (Admin)',
      role: 'Admin',
      action: 'Created Account',
      entity: 'Student #8921',
      status: 'Success',
      timestamp: '2 mins ago'
    },
    {
      id: 'LOG002',
      user: 'Sarah Miller',
      role: 'Staff',
      action: 'Modified Record',
      entity: 'Room 402B (A)',
      status: 'Success',
      timestamp: '14 mins ago'
    },
    {
      id: 'LOG003',
      user: 'Robert Black',
      role: 'Guest',
      action: 'Failed Login',
      entity: 'IP: 192.168.1.45',
      status: 'Failed',
      timestamp: '1 hour ago'
    },
    {
      id: 'LOG004',
      user: 'John Doe (Admin)',
      role: 'Admin',
      action: 'Approved Request',
      entity: 'Maint. Ticket #401',
      status: 'Success',
      timestamp: '2 hours ago'
    }
  ]);

  // Wing B Heatmap rooms - 40 rooms. True = Occupied, False = Empty.
  const [wingBHeatmap, setWingBHeatmap] = useState<boolean[]>([]);

  useEffect(() => {
    // Seed the rooms with random layout, matching approx 95% occupancy
    const seed: boolean[] = [];
    for (let i = 0; i < 40; i++) {
      seed.push(Math.random() > 0.15); // ~85-90% occupied
    }
    setWingBHeatmap(seed);
  }, []);

  const toggleHeatmapRoom = (index: number) => {
    setWingBHeatmap(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
    addLog(
      currentUser?.name || 'Warden',
      currentRole || 'warden',
      'Toggled Room Grid',
      `Room ${201 + index}`,
      'Success'
    );
  };

  const addLog = (user: string, role: string, action: string, entity: string, status: 'Success' | 'Failed') => {
    const newLog: SystemLog = {
      id: `LOG${Date.now()}`,
      user,
      role: role.charAt(0).toUpperCase() + role.slice(1),
      action,
      entity,
      status,
      timestamp: 'Just now'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const login = (role: UserRole, email: string) => {
    let name = '';
    let extra = '';
    if (role === 'student') {
      name = 'Alex Johnson';
      extra = 'B.Tech CS • Year 3';
    } else if (role === 'parent') {
      name = 'Mrs. Sharma';
      extra = 'Parent of Rahul S.';
    } else if (role === 'warden') {
      name = 'Admin Warden';
      extra = 'Main Wing A';
    } else if (role === 'staff') {
      name = 'Alex Rivera';
      extra = 'Senior Staff';
    } else if (role === 'admin') {
      name = 'John Doe';
      extra = 'University Administrator';
    }

    setCurrentRole(role);
    setCurrentUser({ name, email, extra });
    addLog(name, role, 'User logged in', 'CampusStay Dashboard', 'Success');
  };

  const logout = () => {
    if (currentUser && currentRole) {
      addLog(currentUser.name, currentRole, 'User logged out', 'CampusStay Portals', 'Success');
    }
    setCurrentRole(null);
    setCurrentUser(null);
  };

  const submitLeave = (type: 'Weekend' | 'Local' | 'Holiday', dateRange: string, purpose: string) => {
    const newLeave: LeaveRequest = {
      id: `L${Date.now()}`,
      studentId: currentRole === 'student' ? 'alex_johnson' : 'rahul_s',
      studentName: currentRole === 'student' ? 'Alex Johnson' : 'Rahul S.',
      room: currentRole === 'student' ? 'Room B-204' : 'Room B-204',
      dateRange,
      type,
      purpose,
      status: 'PENDING',
      submittedAt: 'Just now'
    };
    setLeaves(prev => [newLeave, ...prev]);
    addLog(
      currentUser?.name || 'Student',
      currentRole || 'student',
      'Submitted Leave Request',
      `${type} - ${purpose}`,
      'Success'
    );
  };

  const submitComplaint = (title: string, description: string, category: 'Critical' | 'Maintenance' | 'Security') => {
    const newComplaint: Complaint = {
      id: `C${Date.now()}`,
      ticketId: Math.floor(1000 + Math.random() * 9000).toString(),
      studentId: currentRole === 'student' ? 'alex_johnson' : 'rahul_s',
      studentName: currentUser?.name || 'Alex Johnson',
      room: 'B-204',
      title,
      description,
      category,
      submittedAt: 'Submitted just now',
      status: 'PENDING'
    };
    setComplaints(prev => [newComplaint, ...prev]);
    addLog(
      currentUser?.name || 'Student',
      currentRole || 'student',
      'Submitted Support Ticket',
      `Ticket #${newComplaint.ticketId}: ${title}`,
      'Success'
    );
  };

  const approveLeave = (id: string) => {
    setLeaves(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'APPROVED' } : item))
    );
    const request = leaves.find(l => l.id === id);
    addLog(
      currentUser?.name || 'Warden',
      currentRole || 'warden',
      'Leave Approved',
      `Student ${request?.studentName || 'Request'}`,
      'Success'
    );
  };

  const rejectLeave = (id: string) => {
    setLeaves(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'REJECTED' } : item))
    );
    const request = leaves.find(l => l.id === id);
    addLog(
      currentUser?.name || 'Warden',
      currentRole || 'warden',
      'Leave Rejected',
      `Student ${request?.studentName || 'Request'}`,
      'Success'
    );
  };

  const assignComplaint = (id: string, staffName: string) => {
    setComplaints(prev =>
      prev.map(item =>
        item.id === id ? { ...item, assignedTo: staffName, status: 'In Progress' } : item
      )
    );
    const complaint = complaints.find(c => c.id === id);
    addLog(
      currentUser?.name || 'Warden',
      currentRole || 'warden',
      'Assigned Ticket',
      `Ticket #${complaint?.ticketId || id} assigned to ${staffName}`,
      'Success'
    );
  };

  const resolveComplaint = (id: string) => {
    setComplaints(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: 'Resolved', resolvedAt: 'Oct 24, 2023' }
          : item
      )
    );
    const complaint = complaints.find(c => c.id === id);
    addLog(
      currentUser?.name || 'Staff',
      currentRole || 'staff',
      'Resolved Maintenance Ticket',
      `Ticket #${complaint?.ticketId || id}`,
      'Success'
    );
  };

  const updateInventory = (id: string, qty: number) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + qty;
          return {
            ...item,
            quantity: newQty,
            status: newQty > 10 ? 'Good' : 'Low'
          };
        }
        return item;
      })
    );
    const item = inventory.find(i => i.id === id);
    addLog(
      currentUser?.name || 'Staff',
      currentRole || 'staff',
      'Updated Inventory Stock',
      `${item?.name || 'Item'} +${qty}`,
      'Success'
    );
  };

  const reorderItem = (id: string) => {
    setInventory(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: item.quantity + 50, status: 'Good' } : item))
    );
    const item = inventory.find(i => i.id === id);
    addLog(
      currentUser?.name || 'Staff',
      currentRole || 'staff',
      'Reordered item RESTOCK',
      `${item?.name || 'Item'} order placed`,
      'Success'
    );
  };

  const createNotice = (title: string, content: string, category: 'mess' | 'power' | 'sports' | 'general') => {
    const iconMap = {
      mess: 'dinner_dining',
      power: 'event_busy',
      sports: 'festival',
      general: 'campaign'
    };
    const newNotice: Notice = {
      id: `N${Date.now()}`,
      title,
      content,
      category,
      timestamp: 'Today, Just now',
      icon: iconMap[category]
    };
    setNotices(prev => [newNotice, ...prev]);
    addLog(
      currentUser?.name || 'Warden',
      currentRole || 'warden',
      'Published Notice Board Alert',
      title,
      'Success'
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        leaves,
        complaints,
        notices,
        inventory,
        logs,
        login,
        logout,
        submitLeave,
        submitComplaint,
        approveLeave,
        rejectLeave,
        assignComplaint,
        resolveComplaint,
        updateInventory,
        reorderItem,
        createNotice,
        addLog,
        wingBHeatmap,
        toggleHeatmapRoom
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};
