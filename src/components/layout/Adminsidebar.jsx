import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Users,
  Calendar,
  ListChecks,
  Settings,
  LogOut,
  User,
  Activity,
  ShoppingCart,
  FileText,
  UserPlus,
  Zap,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const sidebarItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
      path: '/dashboard',
    },
    // {
    //   label: 'Users',
    //   icon: <Users className="h-4 w-4" />,
    //   path: '/users',
    // },
    // {
    //   label: 'Patients',
    //   icon: <User className="h-4 w-4" />,
    //   path: '/patients',
    // },
    // {
    //   label: 'Appointments',
    //   icon: <Calendar className="h-4 w-4" />,
    //   path: '/appointments',
    // },
    // {
    //   label: 'Treatments',
    //   icon: <Activity className="h-4 w-4" />,
    //   path: '/treatments',
    // },
    // {
    //   label: 'Bills',
    //   icon: <ShoppingCart className="h-4 w-4" />,
    //   path: '/bills',
    // },
    {
      label: 'Staff',
      icon: <UserPlus className="h-4 w-4" />,
      path: '/staff',
      children: [
        { label: 'Doctors', path: '/admin/doctors' },
        { label: 'Nurses', path: '/admin/nurses' },
        { label: 'Ward Boys', path: '/admin/wardboys' },
      ],
    },
    {
      label: 'Rooms',
      icon: <ListChecks className="h-4 w-4" />,
      path: '/rooms',
    },
    {
      label: 'Services',
      icon: <Zap className="h-4 w-4" />,
      path: '/services',
    },
    {
      label: 'Reports',
      icon: <FileText className="h-4 w-4" />,
      path: '/reports',
    },
    {
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      path: '/settings',
    },
    {
      label: 'Logout',
      icon: <LogOut className="h-4 w-4" />,
      path: '/login',
      onClick: onLogout,
    },
  ];

  const toggleSubMenu = (label) => {
    setOpenSubMenu(prev => prev === label ? null : label);
  };

  return (
    <aside className="w-64 bg-gray-900 text-white border-r border-gray-800 h-screen flex flex-col">
      <div className="p-6 flex items-center gap-2 border-b border-gray-800">
        <h1 className="text-2xl font-bold">HMS Admin</h1>
      </div>
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <div key={item.label} className="group">
            <Button
              variant="ghost"
              className={cn(
                'w-full flex items-center justify-between',
                'hover:bg-gray-800 hover:text-white',
                'transition-colors duration-300',
                'rounded-md',
                'py-2.5 px-4',
                'text-gray-300',
                'font-medium',
                'group-hover:shadow-lg', // Add a subtle shadow on hover
                item.onClick ? 'cursor-pointer' : ''
              )}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else if (item.children) {
                  toggleSubMenu(item.label);
                } else {
                  navigate(item.path);
                }
              }}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </span>
                {item.children && (
                    <motion.div
                        className="flex items-center"
                        animate={{
                            rotate: openSubMenu === item.label ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {openSubMenu === item.label ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                    </motion.div>
                )}
            </Button>
            <AnimatePresence>
                {openSubMenu === item.label && item.children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="ml-4 space-y-1"
                    >
                        {item.children.map(child => (
                            <Button
                                key={child.label}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start pl-8 pr-4 py-2",
                                    "hover:bg-gray-800 hover:text-white",
                                    "transition-colors duration-300",
                                    "rounded-md text-gray-400",
                                    "font-medium",
                                    "group-hover:shadow-md"
                                )}
                                onClick={() => navigate(child.path)}
                            >
                                {child.label}
                            </Button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
        <div className="p-4 border-t border-gray-800 mt-auto">
            <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-2 hover:bg-gray-800 hover:text-white transition-colors duration-200 rounded-md py-2 px-4 text-gray-300"
                onClick={onLogout}
            >
                <LogOut className="h-4 w-4" />
                Logout
            </Button>
        </div>
    </aside>
  );
};

export default Sidebar;
