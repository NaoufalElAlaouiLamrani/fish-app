import { createContext, useContext, useState, ReactNode } from 'react';

type Page = 'home' | 'catalog' | 'contact' | 'fish-detail';

interface NavigationContextType {
  currentPage: Page;
  selectedFishId: string | null;
  navigateTo: (page: Page, fishId?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedFishId, setSelectedFishId] = useState<string | null>(null);

  const navigateTo = (page: Page, fishId?: string) => {
    setCurrentPage(page);
    if (fishId !== undefined) {
      setSelectedFishId(fishId);
    }
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, selectedFishId, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
