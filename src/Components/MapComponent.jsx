import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from 'react-leaflet';
import {
  AlertTriangle,
  WifiOff,
  Activity,
  Layers,
  ArrowRight,
  Zap,
} from 'lucide-react';

// Dustbin container locations across Port Harcourt
const mapStats = [
  {
    id: 1,
    label: 'Critical Alerts',
    value: 12,
    icon: AlertTriangle,
    color: '#ef4444',
    bgColor: 'bg-error',
    textColor: 'text-error',
    position: { lat: 4.8156, lng: 7.0498 },
  },
  {
    id: 2,
    label: 'Not Responding',
    value: 5,
    icon: WifiOff,
    color: '#f59e0b',
    bgColor: 'bg-warning',
    textColor: 'text-warning',
    position: { lat: 4.7719, lng: 6.9974 },
  },
  {
    id: 3,
    label: 'Active',
    value: 23,
    icon: Activity,
    color: '#3b82f6',
    bgColor: 'bg-info',
    textColor: 'text-info',
    position: { lat: 4.8396, lng: 7.0143 },
  },
  {
    id: 4,
    label: 'Available',
    value: 156,
    icon: Layers,
    color: '#10b981',
    bgColor: 'bg-success',
    textColor: 'text-success',
    position: { lat: 4.7883, lng: 7.073 },
  },
];

// Generate scattered dustbin locations across Port Harcourt
const generateDustbinLocations = () => {
  const locations = [];
  const centerLat = 4.8156;
  const centerLng = 7.0498;
  const radius = 0.08; // Approximately 8km radius

  // Generate 196 random locations scattered across Port Harcourt
  for (let i = 0; i < 196; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.sqrt(Math.random()) * radius;

    const lat = centerLat + distance * Math.cos(angle);
    const lng = centerLng + distance * Math.sin(angle);

    // Determine status based on the statistics
    let status, color;
    const rand = Math.random();
    if (rand < 0.06) {
      // 12/196 = ~6% critical
      status = 'critical';
      color = '#ef4444';
    } else if (rand < 0.09) {
      // 5/196 = ~2.5% not responding
      status = 'not_responding';
      color = '#f59e0b';
    } else if (rand < 0.21) {
      // 23/196 = ~12% active
      status = 'active';
      color = '#3b82f6';
    } else {
      // 156/196 = ~80% available
      status = 'available';
      color = '#10b981';
    }

    locations.push({
      id: i,
      lat,
      lng,
      status,
      color,
      name: `Container ${i + 1}`,
    });
  }

  return locations;
};

// Animated marker component
function AnimatedMarker({ location, isActive, onClick }) {
  return (
    <CircleMarker
      center={[location.lat, location.lng]}
      radius={isActive ? 8 : 5}
      pathOptions={{
        color: location.color,
        fillColor: location.color,
        fillOpacity: isActive ? 0.9 : 0.7,
        weight: 2,
      }}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup>
        <div className='text-center p-1'>
          <div className='font-bold text-sm'>{location.name}</div>
          <div className='text-xs text-textTertiary capitalize'>
            {location.status.replace('_', ' ')}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}

// Map center controller
function MapController({ activeStatId, stats }) {
  const map = useMap();

  useEffect(() => {
    if (activeStatId) {
      const stat = stats.find((s) => s.id === activeStatId);
      if (stat) {
        map.flyTo([stat.position.lat, stat.position.lng], 13, {
          duration: 1,
        });
      }
    }
  }, [activeStatId, stats, map]);

  return null;
}

export default function DeviceTrackingMap() {
  const [activeStatId, setActiveStatId] = useState(null);
  const [dustbinLocations] = useState(generateDustbinLocations());
  const [mapReady, setMapReady] = useState(false);

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    const isActive = activeStatId === stat.id;

    return (
      <motion.button
        onClick={() => setActiveStatId(stat.id)}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full p-4 rounded-xl border-2 transition-all ${
          isActive
            ? `${stat.bgColor} text-background border-transparent shadow-lg`
            : `bg-surface border-border hover:border-${stat.textColor.replace(
                'text-',
                ''
              )}`
        }`}
      >
        <div className='flex items-center gap-3 mb-2'>
          <motion.div
            animate={isActive ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <Icon
              size={20}
              className={isActive ? 'text-background' : stat.textColor}
            />
          </motion.div>
          <span
            className={`text-xs uppercase font-semibold tracking-wider ${
              isActive ? 'text-background' : 'text-textTertiary'
            }`}
          >
            {stat.label}
          </span>
        </div>
        <div
          className={`text-3xl font-bold ${
            isActive ? 'text-background' : 'text-text'
          }`}
        >
          {stat.value}
        </div>
      </motion.button>
    );
  };

  return (
    <div className='w-full max-w-7xl mx-auto p-6'>
      <div className='grid grid-cols-12 gap-6'>
        {/* Map and Statistics Container - 8 columns */}
        <div className='col-span-12 lg:col-span-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-surface rounded-2xl shadow-xl overflow-hidden border border-border'
          >
            {/* Header */}
            <div className='p-6 bg-gradient-to-r from-accent to-info text-background'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-2xl font-bold mb-1'>
                    Smart Dustbin Monitoring
                  </h2>
                  <p className='text-background/80 text-sm'>
                    Port Harcourt, Rivers • GPS + SIM7600G-H Enabled
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='w-3 h-3 bg-success rounded-full shadow-lg'
                />
              </div>
            </div>

            <div className='grid grid-cols-12 gap-6 p-6'>
              {/* Statistics Sidebar - 4 columns */}
              <div className='col-span-12 md:col-span-4 space-y-4'>
                {mapStats.map((stat) => (
                  <StatCard key={stat.id} stat={stat} />
                ))}

                {/* Total Summary Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className='p-5 bg-hover rounded-xl border border-border mt-4'
                >
                  <div className='flex items-center gap-2 mb-3'>
                    <Zap size={18} className='text-accent' />
                    <span className='text-xs uppercase font-semibold text-textTertiary tracking-wider'>
                      Total Containers
                    </span>
                  </div>
                  <div className='flex items-baseline gap-2 mb-3'>
                    <span className='text-4xl font-bold text-text'>196</span>
                    <span className='text-sm text-textSecondary'>
                      containers
                    </span>
                  </div>
                  <div className='h-3 bg-background rounded-full overflow-hidden mb-2'>
                    <motion.div
                      className='h-full bg-gradient-to-r from-accent to-info'
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    />
                  </div>
                  <p className='text-xs text-textSecondary font-medium'>
                    92% operational
                  </p>
                </motion.div>
              </div>

              {/* Map Container - 8 columns */}
              <div className='col-span-12 md:col-span-8'>
                <div className='relative h-[500px] rounded-xl overflow-hidden border-2 border-border shadow-inner'>
                  <MapContainer
                    center={[4.8156, 7.0498]}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                    whenReady={() => setMapReady(true)}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    {mapReady && (
                      <>
                        <MapController
                          activeStatId={activeStatId}
                          stats={mapStats}
                        />
                        {dustbinLocations.map((location) => (
                          <AnimatedMarker
                            key={location.id}
                            location={location}
                            isActive={false}
                            onClick={() => {}}
                          />
                        ))}
                      </>
                    )}
                  </MapContainer>

                  {/* Map Overlay Info */}
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4 border-t border-border z-[1000]'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-xs uppercase font-semibold tracking-wider text-textTertiary'>
                          Viewing Zone: Port Harcourt Metropolitan
                        </p>
                        <p className='text-sm font-medium text-text mt-1'>
                          Last updated: 2 min ago
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-background font-semibold text-sm hover:shadow-lg transition-all'
                      >
                        <span>Explore Map</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity Container - 4 columns */}
        <div className='col-span-12 lg:col-span-4'>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='bg-surface rounded-2xl shadow-xl p-6 border border-border h-full'
          >
            <h3 className='text-xl font-bold text-text mb-4'>
              Recent Activity
            </h3>
            <div className='space-y-4'>
              {[
                {
                  type: 'critical',
                  msg: 'Container 45 - Full capacity',
                  time: '2 min',
                },
                {
                  type: 'warning',
                  msg: 'Container 89 - No response',
                  time: '5 min',
                },
                {
                  type: 'success',
                  msg: 'Container 12 - Emptied',
                  time: '12 min',
                },
                { type: 'info', msg: 'Container 67 - Active', time: '18 min' },
                {
                  type: 'success',
                  msg: 'Container 134 - Available',
                  time: '25 min',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className='flex items-start gap-3 p-3 rounded-lg bg-hover hover:bg-background transition-colors border border-border'
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      item.type === 'critical'
                        ? 'bg-error'
                        : item.type === 'warning'
                        ? 'bg-warning'
                        : item.type === 'success'
                        ? 'bg-success'
                        : 'bg-info'
                    }`}
                  />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-text'>{item.msg}</p>
                    <p className='text-xs text-textTertiary mt-1'>
                      {item.time} ago
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats Section */}
            <div className='mt-6 pt-6 border-t border-border'>
              <h4 className='text-lg font-bold text-text mb-4'>Quick Stats</h4>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-textTertiary'>
                    Avg Response Time
                  </span>
                  <span className='text-lg font-semibold text-accent'>
                    124ms
                  </span>
                </div>
                <div className='w-full h-2 bg-hover rounded-full overflow-hidden'>
                  <motion.div
                    className='h-full bg-gradient-to-r from-accent to-info'
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>

                <div className='flex justify-between items-center pt-4'>
                  <span className='text-sm text-textTertiary'>
                    System Uptime
                  </span>
                  <span className='text-lg font-semibold text-success'>
                    99.9%
                  </span>
                </div>
                <div className='w-full h-2 bg-hover rounded-full overflow-hidden'>
                  <motion.div
                    className='h-full bg-gradient-to-r from-success to-info'
                    initial={{ width: 0 }}
                    animate={{ width: '99.9%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>

                <div className='flex justify-between items-center pt-4'>
                  <span className='text-sm text-textTertiary'>
                    Collection Rate
                  </span>
                  <span className='text-lg font-semibold text-accent'>92%</span>
                </div>
                <div className='w-full h-2 bg-hover rounded-full overflow-hidden'>
                  <motion.div
                    className='h-full bg-gradient-to-r from-accent to-warning'
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
