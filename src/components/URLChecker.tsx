import { useState } from 'react';
import { Link, Search, ExternalLink } from 'lucide-react';
import { analyzeURL, saveScanToHistory, type AnalysisResult } from '../utils/analyzers';
import ResultCard from './ResultCard';
import LoadingState from './LoadingState';
import { useLanguage } from '../i18n/LanguageContext';

export default function URLChecker() {
    const { t } = useLanguage();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!url.trim()) {
            setError(t('enterUrl'));
            return;
        }

        setError('');
        setLoading(true);
        setResult(null);

        try {
            const analysisResult = await analyzeURL(url);
            setResult(analysisResult);

            // Save to history
            saveScanToHistory({
                type: 'url',
                input: url,
                result: analysisResult
            });
        } catch (err) {
            setError('An error occurred during analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !loading) {
            handleAnalyze();
        }
    };

    // Example URLs for testing
    const exampleUrls = [
        { url: 'https://mygov.in', label: t('safe') },
        { url: 'http://free-money-winner.xyz/claim-prize', label: t('suspicious') },
        { url: 'https://paypa1-secure.com/login', label: t('phishing') }
    ];

    return (
        <section className="checker-section">
            <div className="container">
                <div className="checker-header">
                    <div className="feature-icon url" style={{ margin: '0 auto 1.5rem' }}>
                        <Link />
                    </div>
                    <h2>{t('urlChecker')}</h2>
                    <p>
                        {t('urlCheckerDescription')}
                    </p>
                </div>

                <div className="checker-container">
                    <div className="checker-card glass-card">
                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="label">{t('enterUrl')}</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={loading}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    style={{ flexShrink: 0 }}
                                >
                                    <Search size={20} />
                                    {t('analyze')}
                                </button>
                            </div>
                            {error && (
                                <p style={{ color: 'var(--danger-color)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Example URLs */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                {t('tryExamples')}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {exampleUrls.map((example, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-secondary"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
                                        onClick={() => {
                                            setUrl(example.url);
                                            setResult(null);
                                        }}
                                        disabled={loading}
                                    >
                                        <ExternalLink size={14} />
                                        {example.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && <LoadingState type="url" />}

                        {/* Result */}
                        {result && !loading && <ResultCard result={result} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
