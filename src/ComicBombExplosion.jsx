import { motion } from 'framer-motion';

const ComicBombExplosion = () => (
  <div className="absolute inset-0 z-[150] flex items-center justify-center pointer-events-none">
    <motion.div
      initial={{ scale: 0, opacity: 1, rotate: -15 }}
      animate={{ scale: [0, 1.5, 2], rotate: [-15, 15, -15, 15, -15, 0], opacity: [1, 1, 0] }}
      transition={{ duration: 0.9, times: [0, 0.8, 1] }}
      className="absolute text-7xl drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
    >
      💣
    </motion.div>
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 1] }}
      transition={{ delay: 0.8, duration: 0.4, type: 'spring', bounce: 0.6 }}
      className="absolute"
    >
      <svg viewBox="0 0 100 100" className="w-40 h-40 overflow-visible drop-shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
        <path d="M50 0 L60 30 L95 15 L70 45 L100 65 L65 70 L75 100 L50 75 L25 100 L35 70 L0 65 L30 45 L5 15 L40 30 Z" fill="#ef4444" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M50 15 L57 35 L80 25 L65 47 L90 60 L62 65 L70 85 L50 67 L30 85 L38 65 L10 60 L35 47 L20 25 L43 35 Z" fill="#facc15" stroke="#000" strokeWidth="3" strokeLinejoin="round"/>
        <text x="50" y="58" fontFamily="sans-serif" fontSize="22" fontWeight="900" fill="white" stroke="black" strokeWidth="2" textAnchor="middle" paintOrder="stroke">BOOM!</text>
      </svg>
    </motion.div>
  </div>
);

export default ComicBombExplosion;