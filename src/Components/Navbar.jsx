import { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Sun,
  Globe,
  UserCircle,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // activate glassmorphism effect after scroll
    };
    window.addEventListener('scroll', handleScroll);
    const handleClickOuside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOuside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.addEventListener('mousedown', handleClickOuside);
    };
  }, []);

  return (
    <nav
      className={`flex sticky top-0 z-50 bg-background text-slate-400 px-6 py-4 justify-between items-center transition-colors duration-300 ${
        scrolled
          ? 'bg-[#1e1e2f]/70 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      {/* {Left Brand} */}

      <div className='text-xl font-bold text-slate-400'>DMS</div>

      {/* Search Navigation */}
      <motion.div
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className='hidden md:block w-1/3'
      >
        <input
          type='search'
          name='searchbar'
          value={search}
          placeholder='Search...'
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='w-full bg-input border border-border text-text px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent'
        />
      </motion.div>

      {/* Right: Icons + Profile */}

      <div className='flex flex-row space-x-4'>
        <div className='flex items-center space-x-4 flex-row'>
          <button className='p-1 sm:p-2 rounded-full bg-surface hover:bg-hover hover:text-slate-200 transition-colors duration-300'>
            <Bell size={16} className='text-text' />
          </button>
          <button className='p-1 sm:p-2 rounded-full bg-surface hover:bg-hover hover:text-slate-200 transition-colors duration-300'>
            <Sun size={16} className='text-text' />
          </button>
          <button className='p-1 sm:p-2 rounded-full bg-surface hover:bg-hover hover:text-slate-200 transition-colors duration-300'>
            <Globe size={16} className='text-text' />
          </button>
        </div>

        {/* profile dropdown */}
        <div className='relative group' ref={dropdownRef}>
          <button
            className='flex items-center p-2 rounded-full bg-surface hover:bg-hover hover:text-slate-200 transition-colors duration-300'
            aria-label='Profile'
            title='Profile'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <UserCircle size={22} className='text-text' />
            <span className='text-text hidden md:inline ml-2'>Abbas</span>
            <motion.div
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className='text-muted ml-2' />
            </motion.div>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 mt-2 w-48 max-h-60 overflow-y-auto bg-surface text-text rounded shadow-lg z-80'
              >
                <a
                  href='#'
                  className='flex items-center px-4 py-2 hover:bg-hover'
                >
                  <User size={16} className='mr-2' />
                  Profile
                </a>
                <a
                  href='#'
                  className='flex items-center px-4 py-2 hover:bg-hover'
                >
                  <Settings size={16} className='mr-2' />
                  Settings
                </a>
                <a
                  href='#'
                  className='flex items-center px-4 py-2 hover:bg-hover'
                >
                  <LogOut size={16} className='mr-2' />
                  Logout
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
