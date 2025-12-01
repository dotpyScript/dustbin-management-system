import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mapstats } from '../Data/Mapstats';

export default function MapComponent() {
  const [activeAlert, setActiveAlert] = useState(0);

  const AnimatedStatItem = ({ stat, index, isActive }) => {
    const Icon = stat.icon;

    return (
      <motion.button
        onClick={() => setActiveAlert(index)}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full p-4 rounded-lg border-2 transition-all ${
          isActive
            ? `${stat.bgColor} ${stat.textColor} border-current shadow-lg`
            : 'bg-surface border-border hover:border-current/30'
        }`}
      >
        <div className='flex items-center gap-3 mb-2'>
          <motion.div
            animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] } : {}}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <Icon size={20} />
          </motion.div>
          <span className='text-xs uppercase font-semibold tracking-wider'>
            {stat.label}
          </span>
        </div>
        <div className='text-2xl font-bold text-text'>{stat.value}</div>
      </motion.button>
    );
  };

  // Blinking dot component for map
  const BlinkingDot = ({ stat, index, isActive }) => {
    return (
      <motion.div
        key={index}
        className='absolute'
        style={{ left: `${stat.position.x}%`, top: `${stat.position.y}%` }}
      >
        {/* Outer pulse ring */}
        <motion.div
          className={`w-4 h-4 rounded-full border-2 ${stat.textColor}`}
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Inner dot */}
        <motion.div
          className={`absolute top-0 left-0 w-4 h-4 rounded-full ${stat.bgColor} border-2 border-current`}
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          {/* Center Indicator */}
          <div className='absolute inset-1 rounded-full bg-current opacity-30' />
        </motion.div>

        {/* Tooltip on hover */}
        <motion.div
          className={`absolute top-full mt-2 -left-12 w-12 w-24 px-2 py-1 rounded-lg text-xs font-semibold text-center ${stat.bgColor} opacity-0 pointer-events-none z-10`}
          whileHover={{ opacity: 1 }}
        >
          {stat.label}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='mb-8'
    >
      {/* Section Title */}
      <motion.h3
        className='text-xl font-bold text-text mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Real-time Device tracking
      </motion.h3>

      {/* Main  Container*/}
      <div className='grid grid-col-1 lg:grid-col-11 gap-6'>
        {/* Left: Statistics Column (2.75/4 3 cols) */}
        <motion.div
          className='lg:col-span-3 space-y-4'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {Mapstats.map((stat, index) => (
            <AnimatedStatItem
              key={stat.label}
              stat={stat}
              index={index}
              isActive={activeAlert === index}
            />
          ))}

          {/* Summary Stats */}
          <motion.div
            className='p-4 bg-surface border border-border rounded-lg mt-6'
            whileHover={{ borderColor: 'var(--color-accent)' }}
          >
            <div className='text-xs uppercase front-semibold text-textTertiary tracking-wider mb-2'>
              Total Devices
            </div>
            <div className='flex items-baseline gap-2 mb-3'>
              <span className='flex-3xl font-bold text-text'>196</span>
              <span className='text-xs text-textTertiary'>devices</span>
            </div>
            <div className='h-2 bg-hover rounded-full overflow-hidden'>
              <motion.div
                className='h-full bg-gradient-to-r from-accent to-info'
                initial={{ width: 0 }}
                animate={{ width: '92%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className='text-xs text-textTertiary mt-2'>92% operational</p>
          </motion.div>
        </motion.div>

        {/* Right: Map Column  (8.25/4 .. 8 cols)*/}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          aniamte={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className='relative w-full bg-gradient-to-br from-surface to-hover rounded-xl border border-border overflow-hidden group'>
            {/* Map Background with grid */}
            <div className='absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-50' />
            <svg
              className='absolute inset-0 w-full h-full opacity-10'
              viewBox='0 0 100 100'
              preserveAspectRatio='none'
            >
              <defs>
                <pattern
                  id='grid'
                  width='10'
                  height='10'
                  patternUnits='userSpaceOnUse'
                >
                  <path
                    d='M 10 0 L 0 0 0 10'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='0.5'
                  />
                </pattern>
              </defs>
              <rect width='100' height='100' fill='url(#grid)' />
            </svg>

            {/* Map Container */}
            <div className='relative w-full aspect-video flex items-center justify-center overflow-hidden'>
              {/* background map area */}
              <div className='absolute inset-0 bg-gradient-to-br from-accentBg/20 via-infoBg/10 to-accentBg/10' />

              {/* Animated dots on map */}
              {Mapstats.map((stat, index) => (
                <BlinkingDot
                  key={stat.label}
                  stat={stat}
                  index={index}
                  isActive={activeAlert === index}
                />
              ))}

              {/* Center Accent Circle */}
              <motion.div
                className='absolute w-24 h-24 rounded-full border-2 border-accent/20'
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* Map Footer with "Explore More" Button */}
            <motion.div
              className='relative p-4 bg-background/50 backdrop-blur-sm border-t border-border flex items-center justify-between'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className='flex-1'>
                <p className='text-xs uppercase font-semibold text-textTertiary tracking-wider'>
                  Viewing Zone: North District
                </p>
                <p className='text-sm font-medium text-text mt-1'>
                  Last updated: 2 min ago
                </p>
              </div>
              {/* Explore More Button */}
              <motion.a
                href='/map'
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-background font-semibold text-sm hover:shadow-lg transition-all'
              >
                <span>Explore</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </motion.a>
            </motion.div>

            {/* Corner gradient Accent */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full pointer-events-none' />
            <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-info/10 to-transparent rounded-tr-full pointer-events-none' />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
