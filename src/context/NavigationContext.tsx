import { createContext, useState, ReactNode } from 'react';

export type Page = 'home' | 'catalog' | 'contact' | 'fish-detail';

interface NavigationContextType {
  currentPage: Page;
  selectedFishId: string | null;
  navigateTo: (page: Page, fishId?: string) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

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
