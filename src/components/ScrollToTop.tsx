import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Επιστροφή στην κορυφή"
      className="fixed bottom-6 right-6 rounded-full bg-gray-800 p-3 text-white shadow-lg transition-colors hover:bg-gray-700"
    >
      <ArrowUp size={20} />
    </button>
  );
}
