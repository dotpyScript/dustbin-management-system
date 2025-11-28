// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({
  title,
  value,
  unit = '',
  trend = null,
  trendValue = null,
  icon: Icon,
  color = 'accent',
  description = '',
}) {
  // Color variants
  const colorStyles = {
    accent: 'bg-accentBg text-accent border-accent/20',
  };

  const isTrendingUp = trend === 'up';
  const isTrendingDown = trend === 'down';

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 },
  };

  //   const trendVariants = {
  //     up: { color: '#10b981' },
  //     down: { color: '#ef4444' },
  //   };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      whileHover='hover'
      className='relative overflow-hidden'
    >
      {/* Card Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-surface/50 to-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

      {/* Main Card */}
      <div
        className={`relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 ${colorStyles[color]} hover:shadow-lg group`}
      >
        {/* Top Section: Icon + Title */}
        <div className='flex items-start justify-between mb-4'>
          {/* Icon Container */}
          <motion.div
            className='mb-2 rounded-lg bg-opacity-10 backdrop-blur-sm'
            variants={iconVariants}
            initial='rest'
            whileHover='hover'
          >
            {Icon && (
              <Icon
                size={24}
                className={`text-${color} transition-all duration-300`}
              />
            )}
          </motion.div>

          {/* Trend Badge */}
          {(isTrendingUp || isTrendingDown) && trendValue && (
            <motion.div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                isTrendingUp
                  ? 'bg-successBg text-success'
                  : 'bg-errorBg text-error'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isTrendingUp ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{trendValue}%</span>
            </motion.div>
          )}
        </div>

        {/* Title */}
        <motion.h3
          className='text-xs uppercase font-semibold text-textTertiary tracking-wider mb-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>

        {/* Value Section */}
        <motion.div
          className='mb-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className='flex items-baseline gap-1'>
            <span className='text-3xl font-bold text-text'>{value}</span>
            {unit && (
              <span className='text-sm text-textTertiary font-medium'>
                {unit}
              </span>
            )}
          </div>
        </motion.div>

        {/* Description */}
        {description && (
          <motion.p
            className='text-xs text-textTertiary'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
