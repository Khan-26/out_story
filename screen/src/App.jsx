import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GiftReveal from './pages/Screen1/GiftReveal';
import Journey from './pages/Screen2/Journey';
import Ending from './pages/Screen3/Ending';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<GiftReveal />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/ending" element={<Ending />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
