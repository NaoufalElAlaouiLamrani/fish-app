import { NavigationProvider } from './context/NavigationContext';
import { useNavigation } from './context/useNavigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Contact } from './pages/Contact';

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {currentPage === 'home' && <Home />}
        {currentPage === 'catalog' && <Catalog />}
        {currentPage === 'contact' && <Contact />}
      </main>
      <Footer />
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
