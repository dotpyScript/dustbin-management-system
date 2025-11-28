import SidebarSection from './SidebarSection';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  Map,
  Antenna,
  User,
  UserPlus,
  UserPlus2,
  ShieldUser,
  Trash,
  UserPen,
  WholeWord,
  Logs,
} from 'lucide-react';
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Sidebar({ collapsed, setCollapsed }) {
  const toggleSidebar = () => setCollapsed(!collapsed);
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Animation variants
  const sidebarVariants = {
    expanded: { width: '13rem' }, // w-52
    collapsed: { width: '4rem' }, // w-16
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.aside
      animate={collapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='fixed left-0 top-22 bg-background text-text flex flex-col z-40 overflow-visible'
      style={{ height: 'calc(100vh - 5.5rem)' }}
    >
      {/* Header Section */}
      <motion.div className='flex items-center justify-between px-4' layout>
        <motion.div
          initial={false}
          animate={{
            opacity: collapsed ? 0 : 1,
            width: collapsed ? 0 : 'auto',
          }}
          transition={{ duration: 0.2 }}
          className='flex items-center gap-3 min-w-0 overflow-hidden'
        >
          <motion.div
            className='p-2 bg-accent rounded-lg flex-shrink-0'
            animate={{ rotate: collapsed ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div className='min-w-0'>
            <span className='text-xs text-textTertiary'>Super Admin</span>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={toggleSidebar}
          className='p-1.5 hover:bg-hover rounded-lg transition-colors flex-shrink-0'
          aria-label='Toggle sidebar'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {collapsed ? (
              <ChevronRight size={20} className='text-muted' />
            ) : (
              <ChevronLeft size={20} className='text-muted' />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Navigation Sections */}
      <motion.nav
        className={`flex-1 overflow-y-auto px-3 overflow-x-visible py-6 ${
          collapsed ? 'space-y-6' : 'space-y-8'
        } scrollbar-hide`}
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div variants={itemVariants}>
          <SidebarSection
            collapsed={collapsed}
            sectionIcon={LayoutDashboard}
            title='SYSTEM OVERVIEW'
            items={[
              { label: 'Dashboard', icon: LayoutDashboard },
              { label: 'System Analytics', icon: BarChart3 },
            ]}
            activeItem={activeItem}
            onItemClick={setActiveItem}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SidebarSection
            collapsed={collapsed}
            sectionIcon={Map}
            title='ZONE MANAGEMENT'
            items={[
              { label: 'All Zones', icon: WholeWord },
              { label: 'Create New Zone', icon: Map },
            ]}
            activeItem={activeItem}
            onItemClick={setActiveItem}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SidebarSection
            collapsed={collapsed}
            sectionIcon={Map}
            title='BIN MANAGEMENT'
            items={[
              { label: 'All Bins', icon: Trash },
              { label: 'Assign Bins', icon: UserPen },
              { label: 'Firmware Updates', icon: Antenna },
            ]}
            activeItem={activeItem}
            onItemClick={setActiveItem}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SidebarSection
            collapsed={collapsed}
            sectionIcon={User}
            title='USER MANAGEMENT'
            items={[
              { label: 'All Users', icon: User },
              { label: 'Create Directors', icon: UserPlus },
              { label: 'Create Staff', icon: UserPlus2 },
              { label: 'Permission', icon: ShieldUser },
              { label: 'Activity Logs', icon: Logs },
            ]}
            activeItem={activeItem}
            onItemClick={setActiveItem}
          />
        </motion.div>
      </motion.nav>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.aside>
  );
}
