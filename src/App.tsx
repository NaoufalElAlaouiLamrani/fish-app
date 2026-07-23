import { useState } from 'react';
import { NavigationProvider } from './context/NavigationContext';
import { useNavigation } from './context/useNavigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Contact } from './pages/Contact';
import { Language } from './i18n';

function AppContent() {
  const { currentPage } = useNavigation();
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={setLanguage} />
      <main className="flex-grow">
        {currentPage === 'home' && <Home language={language} />}
        {currentPage === 'catalog' && <Catalog language={language} />}
        {currentPage === 'contact' && <Contact language={language} />}
      </main>
      <Footer language={language} />
    </div>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
