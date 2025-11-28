import { Download, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const [filterActive, setFilterActive] = useState(false);

  const buttonVariant = {
    rest: { scale: 1 },
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 },
  };

  const iconsVariant = {
    rest: { rotate: 0 },
    hover: { rotate: 12 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex justify-between items-center px-6 py-4'
    >
      {/* Left Side - Page Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h2 className='text-lg font-bold text-text'>Dashboard</h2>
        <p className='text-xs text-textTertiary mt-0.5'>
          Welcome back! Here's your system overview.
        </p>
      </motion.div>

      {/* Right Side - Action Buttons */}
      <motion.div
        className='flex items-center gap-3'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {/* Filter Button */}
        <motion.button
          variants={buttonVariant}
          initial='rest'
          whileHover='hover'
          whileTap='tap'
          onClick={() => setFilterActive(!filterActive)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            filterActive
              ? 'bg-accent text-background shadow-lg'
              : 'bg-surface text-textSecondary hover:bg-hover border border-border'
          }`}
        >
          <motion.div variants={iconsVariant} initial='rest' whileHover='hover'>
            <Filter size={16} />
          </motion.div>
          <span>Filter</span>
        </motion.button>

        {/* Export Button */}
        <motion.button
          variants={buttonVariant}
          initial='rest'
          whileHover='hover'
          whileTap='tap'
          className='flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-buttonPrimary text-background hover:bg-buttonPrimaryHover shadow-md border border-accent'
        >
          <motion.div variants={iconsVariant} initial='rest' whileHover='hover'>
            <Download size={16} />
          </motion.div>
          <span>Export</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
