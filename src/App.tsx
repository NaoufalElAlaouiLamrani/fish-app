import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { FishDetail } from './pages/FishDetail';
import { Contact } from './pages/Contact';

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {currentPage === 'home' && <Home />}
        {currentPage === 'catalog' && <Catalog />}
        {currentPage === 'fish-detail' && <FishDetail />}
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
