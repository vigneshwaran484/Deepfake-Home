import {
    Shield,
    Link,
    Image,
    MessageSquare,
    Video,
    ArrowRight,
    Zap,
    Lock,
    Eye
} from 'lucide-react';

interface HeroProps {
    onNavigate: (tab: string) => void;
}

import { useLanguage } from '../i18n/LanguageContext';

export default function Hero({ onNavigate }: HeroProps) {
    const { t } = useLanguage();
    const features = [
        {
            id: 'url',
            icon: Link,
            title: t('urlChecker'),
            description: t('urlCheckerDescription'),
            iconClass: 'url'
        },
        {
            id: 'image',
            icon: Image,
            title: t('imageAnalyzer'),
            description: t('imageCheckerDescription'),
            iconClass: 'image'
        },
        {
            id: 'text',
            icon: MessageSquare,
            title: t('textScanner'),
            description: t('textCheckerDescription'),
            iconClass: 'text'
        },
        {
            id: 'video',
            icon: Video,
            title: t('videoDetector'),
            description: t('videoCheckerDescription'),
            iconClass: 'video'
        }
    ];

    const stats = [
        { value: '99.2%', label: t('confidence') },
        { value: '<2s', label: 'Analysis Time' },
        { value: '24/7', label: 'Protection' },
        { value: '100K+', label: 'Threats Blocked' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="hero-logo-container" style={{ position: 'relative' }}>
                            <div className="hero-logo-glow" style={{ position: 'absolute', inset: '-20px', background: 'var(--cyan-primary)', filter: 'blur(40px)', opacity: '0.3', borderRadius: '50%' }}></div>
                            <img src="/logo.png" alt="Vexora Logo" style={{ width: '120px', height: '120px', borderRadius: '24px', position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} />
                        </div>
                        <div className="badge-content" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 211, 238, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
                            <Shield size={16} className="text-cyan-primary animate-pulse" />
                            <span className="text-cyan-primary text-sm font-semibold uppercase tracking-wider">AI-Powered Protection</span>
                        </div>
                    </div>

                    <h1>
                        {t('heroTitle').split(',')[0]} <br />
                        <span className="gradient-text">{t('heroTitle').split(',')[1] || ''}</span>
                    </h1>

                    <p>
                        {t('heroSubtitle')}
                    </p>

                    <div className="hero-actions">
                        <button className="btn btn-primary btn-lg" onClick={() => onNavigate('url')}>
                            {t('startScanning')}
                            <ArrowRight size={20} />
                        </button>
                        <button className="btn btn-secondary btn-lg" onClick={() => {
                            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            {t('learnMore')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card glass-card">
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2>{t('features')}</h2>
                    <p style={{ maxWidth: '600px', margin: '1rem auto', fontSize: '1.125rem' }}>
                        Four powerful detection modules working together to keep you safe from digital threats.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="feature-card glass-card"
                            onClick={() => onNavigate(feature.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={`feature-icon ${feature.iconClass}`}>
                                <feature.icon />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="container" style={{ paddingBottom: '4rem' }}>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '2rem' }}>{t('whyChoose')}</h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        marginTop: '2rem'
                    }}>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'var(--gradient-purple)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem'
                            }}>
                                <Zap size={28} color="white" />
                            </div>
                            <h4>Real-Time Analysis</h4>
                            <p style={{ marginTop: '0.5rem' }}>
                                Get instant results with our lightning-fast AI analysis engine
                            </p>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'var(--gradient-success)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem'
                            }}>
                                <Lock size={28} color="white" />
                            </div>
                            <h4>Privacy First</h4>
                            <p style={{ marginTop: '0.5rem' }}>
                                Your data is analyzed locally and never stored on our servers
                            </p>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'var(--gradient-info)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem'
                            }}>
                                <Eye size={28} color="white" />
                            </div>
                            <h4>Advanced Detection</h4>
                            <p style={{ marginTop: '0.5rem' }}>
                                Cutting-edge ML models trained on millions of threat samples
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
