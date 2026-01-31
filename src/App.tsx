import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import URLChecker from './components/URLChecker';
import ImageChecker from './components/ImageChecker';
import TextChecker from './components/TextChecker';
import VideoChecker from './components/VideoChecker';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'url':
        return <URLChecker />;
      case 'image':
        return <ImageChecker />;
      case 'text':
        return <TextChecker />;
      case 'video':
        return <VideoChecker />;
      default:
        return <Hero onNavigate={setActiveTab} />;
    }
  };

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ paddingTop: '70px', flex: 1 }}>
        {renderContent()}
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            © 2026 DeepFake-Home — AI-Powered Deepfake Detection System
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
