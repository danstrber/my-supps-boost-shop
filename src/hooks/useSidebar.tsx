
import { useState, useEffect } from 'react';

export const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    console.log('Hamburger menu clicked - current state:', sidebarOpen);
    setSidebarOpen(!sidebarOpen);
    console.log('Setting sidebar state to:', !sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const sidebar = document.querySelector('[data-sidebar]');
      const hamburger = document.querySelector('[data-hamburger]');
      
      if (sidebarOpen && sidebar && !sidebar.contains(target) && !hamburger?.contains(target)) {
        console.log('Overlay clicked, closing sidebar');
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return {
    sidebarOpen,
    handleMenuToggle,
    handleSidebarClose
  };
};
