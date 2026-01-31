import {
    Shield,
    Link,
    Image,
    MessageSquare,
    Video,
    Menu,
    X,
    Globe
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

interface NavbarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const navItems = [
        { id: 'home', label: t('title'), icon: Shield },
        { id: 'url', label: t('urlChecker'), icon: Link },
        { id: 'image', label: t('imageAnalyzer'), icon: Image },
        { id: 'text', label: t('textScanner'), icon: MessageSquare },
        { id: 'video', label: t('videoDetector'), icon: Video },
    ];

    const languages: { code: Language; name: string }[] = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिंदी' },
        { code: 'te', name: 'తెలుగు' },
        { code: 'ta', name: 'தமிழ்' },
        { code: 'kn', name: 'ಕನ್ನಡ' },
        { code: 'ml', name: 'മലയാളം' },
        { code: 'bn', name: 'বাংলা' },
    ];

    return (
        <nav className="navbar">
            <div className="container">
                <a className="navbar-brand" onClick={() => onTabChange('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src="/logo.png" alt="Vexora" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                    <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.025em' }}>{t('title')}</span>
                </a>

                {/* Desktop Nav */}
                <ul className="navbar-nav">
                    {navItems.slice(1).map((item) => (
                        <li key={item.id}>
                            <a
                                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => onTabChange(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </a>
                        </li>
                    ))}

                    {/* Language Switcher */}
                    <li style={{ position: 'relative' }}>
                        <a
                            className="nav-link"
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Globe size={18} />
                            {language.toUpperCase()}
                        </a>

                        {showLangMenu && (
                            <div className="dropdown-menu">
                                {languages.map((lang) => (
                                    <a
                                        key={lang.code}
                                        className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setShowLangMenu(false);
                                        }}
                                    >
                                        {lang.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="btn btn-icon btn-secondary mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ display: 'none' }}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => {
                                    onTabChange(item.id);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </a>
                        ))}

                        <div className="language-grid">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            padding: 0.5rem;
            min-width: 150px;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            z-index: 1000;
        }
        .dropdown-item {
            padding: 0.5rem 1rem;
            color: #cbd5e1;
            text-decoration: none;
            cursor: pointer;
            border-radius: 0.25rem;
            display: block;
        }
        .dropdown-item:hover, .dropdown-item.active {
            background: rgba(255, 255, 255, 0.1);
            color: #22d3ee;
        }
        
        .language-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            padding: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 0.5rem;
        }
        
        .lang-btn {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            padding: 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
        }
        
        .lang-btn.active {
            background: rgba(34, 211, 238, 0.2);
            color: #22d3ee;
            border-color: #22d3ee;
        }

        @media (max-width: 768px) {
          .navbar-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--glass-border);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            z-index: 1000;
          }
          .mobile-menu .nav-link {
            padding: 1rem;
            justify-content: center;
          }
        }
      `}</style>
        </nav>
    );
}
