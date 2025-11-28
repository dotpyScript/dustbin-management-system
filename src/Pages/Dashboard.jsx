// File: Pages/Dashboard.jsx

import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Kpi from '../Components/Kpi';
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// ✅ Import both from kpiData.js
import { KpiData, SecondaryStats } from '../Components/Data/KpiData';

export function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className='h-screen flex flex-col bg-background overflow-hidden'>
      {/* Navbar - Fixed at top */}
      <Navbar />

      {/* Main Layout: Sidebar + Content */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main Content Area */}
        <motion.div
          animate={{ marginLeft: collapsed ? '4rem' : '13rem' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='flex flex-col flex-1 overflow-hidden'
        >
          {/* Main Content - Scrollable */}
          <main className='flex-1 overflow-y-auto'>
            <motion.div
              className='p-6'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
            >
              {/* Header - Scrolls with content */}
              <motion.div variants={itemVariants} className='mb-8'>
                <Header />
              </motion.div>

              {/* Primary KPI Cards Grid - Using imported kpiData */}
              <motion.div
                variants={itemVariants}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'
              >
                {KpiData.map((kpi) => (
                  <Kpi
                    key={kpi.title}
                    title={kpi.title}
                    value={kpi.value}
                    unit={kpi.unit}
                    icon={kpi.icon}
                    // color={kpi.color}
                    trend={kpi.trend}
                    trendValue={kpi.trendValue}
                    description={kpi.description}
                  />
                ))}
              </motion.div>

              {/* Secondary Section - Two Columns */}
              <motion.div
                variants={sectionVariants}
                className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'
              >
                {/* Left: Additional KPI Cards - Using imported secondaryStats */}
                <div className='lg:col-span-2'>
                  <motion.div variants={itemVariants} className='mb-4'>
                    <h3 className='text-xl font-bold text-text mb-4'>
                      System Metrics
                    </h3>
                  </motion.div>
                  <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                    className='grid grid-cols-1 md:grid-cols-3 gap-6'
                  >
                    {SecondaryStats.map((stat) => (
                      <Kpi
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        unit={stat.unit}
                        icon={stat.icon}
                        // color={stat.color}
                        trend={stat.trend}
                        trendValue={stat.trendValue}
                        description={stat.description}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Right: Quick Stats Panel */}
                <motion.div
                  variants={itemVariants}
                  className='p-6 bg-surface border border-border rounded-xl'
                >
                  <h4 className='text-lg font-bold text-text mb-4'>
                    Quick Stats
                  </h4>
                  <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-textTertiary'>
                        Avg Response Time
                      </span>
                      <span className='text-lg font-semibold text-accent'>
                        124ms
                      </span>
                    </div>
                    <div className='w-full h-1 bg-hover rounded-full overflow-hidden'>
                      <motion.div
                        className='h-full bg-gradient-to-r from-accent to-info'
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>

                    <div className='flex justify-between items-center pt-4'>
                      <span className='text-sm text-textTertiary'>
                        API Uptime
                      </span>
                      <span className='text-lg font-semibold text-success'>
                        99.9%
                      </span>
                    </div>
                    <div className='w-full h-1 bg-hover rounded-full overflow-hidden'>
                      <motion.div
                        className='h-full bg-gradient-to-r from-success to-info'
                        initial={{ width: 0 }}
                        animate={{ width: '99.9%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>

                    <div className='flex justify-between items-center pt-4'>
                      <span className='text-sm text-textTertiary'>
                        Cache Hit Rate
                      </span>
                      <span className='text-lg font-semibold text-accent'>
                        92%
                      </span>
                    </div>
                    <div className='w-full h-1 bg-hover rounded-full overflow-hidden'>
                      <motion.div
                        className='h-full bg-gradient-to-r from-accent to-warning'
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Recent Activity Section */}
              <motion.div variants={sectionVariants}>
                <motion.div variants={itemVariants} className='mb-4'>
                  <h3 className='text-xl font-bold text-text'>
                    Recent Activity
                  </h3>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial='hidden'
                  animate='visible'
                  className='p-6 bg-surface border border-border rounded-xl'
                >
                  <div className='space-y-3'>
                    {[1, 2, 3, 4].map((item) => (
                      <motion.div
                        key={item}
                        variants={itemVariants}
                        className='flex items-center justify-between p-3 rounded-lg hover:bg-hover transition-colors'
                      >
                        <div className='flex items-center gap-3 flex-1'>
                          <div className='w-2 h-2 rounded-full bg-accent' />
                          <div>
                            <p className='text-sm font-medium text-text'>
                              Bin #{1000 + item} status updated
                            </p>
                            <p className='text-xs text-textTertiary'>
                              {item * 5} minutes ago
                            </p>
                          </div>
                        </div>
                        <span className='text-xs px-2.5 py-1 rounded-full bg-accentBg text-accent font-semibold'>
                          Updated
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom Padding */}
              <div className='h-12' />
            </motion.div>
          </main>
        </motion.div>
      </div>
    </div>
  );
}
