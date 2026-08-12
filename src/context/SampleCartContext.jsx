import React, { createContext, useContext, useState, useEffect } from 'react';

const SampleCartContext = createContext();

export function SampleCartProvider({ children, showToast }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('glaze_sample_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('glaze_sample_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addItem = (sample) => {
    if (!items.find((i) => i.id === sample.id)) {
      setItems((prev) => [...prev, sample]);
      if (showToast) showToast(`Added "${sample.name}" to sample kit drawer`);
    } else {
      if (showToast) showToast(`"${sample.name}" is already in your sample box`);
    }
    setIsOpen(true);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (showToast) showToast(`Removed sample from box`);
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <SampleCartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        clearCart,
        toggleDrawer,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </SampleCartContext.Provider>
  );
}

export function useSampleCart() {
  const context = useContext(SampleCartContext);
  if (!context) {
    throw new Error('useSampleCart must be used within a SampleCartProvider');
  }
  return context;
}
