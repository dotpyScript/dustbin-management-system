// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';

export default function SidebarSection({
  title,
  items,
  collapsed,
  // eslint-disable-next-line no-unused-vars
  sectionIcon: SectionIcon,
  activeItem,
  onItemClick,
}) {
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <div>
      {/* Section Header - Only show when NOT collapsed */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='flex items-center gap-2 px-3 mb-2'
        >
          <h2 className='text-xs font-semibold text-textTertiary uppercase tracking-wider'>
            {title}
          </h2>
        </motion.div>
      )}
      {collapsed && <div className='-mb-4'></div>}

      {/* Navigation Items */}
      <ul className='space-y-2'>
        {items.map((item, index) => (
          <motion.li
            key={item.label}
            custom={index}
            variants={itemVariants}
            initial='hidden'
            animate='visible'
          >
            {collapsed ? (
              <Tooltip content={item.label} position='right' className=''>
                <motion.button
                  onClick={() => onItemClick(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    activeItem === item.label
                      ? 'bg-accent text-background font-semibold shadow-md'
                      : 'text-textTertiary hover:bg-hover hover:text-textSecondary'
                  }`}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <motion.div
                    animate={{
                      scale: activeItem === item.label ? 1.15 : 1,
                      rotate: activeItem === item.label ? 5 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <item.icon size={18} className='flex-shrink-0' />
                  </motion.div>
                </motion.button>
              </Tooltip>
            ) : (
              <motion.button
                onClick={() => onItemClick(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeItem === item.label
                    ? 'bg-accent text-background font-semibold shadow-md'
                    : 'text-textTertiary hover:bg-hover hover:text-textSecondary'
                }`}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <motion.div
                  animate={{
                    scale: activeItem === item.label ? 1.15 : 1,
                    rotate: activeItem === item.label ? 5 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <item.icon size={18} className='flex-shrink-0' />
                </motion.div>

                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className='text-sm font-medium truncate'
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
