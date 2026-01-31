import { useState } from 'react';
import { MessageSquare, Search, FileText } from 'lucide-react';
import { analyzeText, saveScanToHistory, type AnalysisResult } from '../utils/analyzers';
import ResultCard from './ResultCard';
import LoadingState from './LoadingState';
import { useLanguage } from '../i18n/LanguageContext';

export default function TextChecker() {
    const { t } = useLanguage();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!text.trim()) {
            setError(t('enterText'));
            return;
        }

        if (text.trim().length < 10) {
            setError('Please enter at least 10 characters for accurate analysis');
            return;
        }

        setError('');
        setLoading(true);
        setResult(null);

        try {
            const analysisResult = await analyzeText(text);
            setResult(analysisResult);

            saveScanToHistory({
                type: 'text',
                input: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
                result: analysisResult
            });
        } catch (err) {
            setError('An error occurred during analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Example scam messages for testing
    const exampleTexts = [
        {
            label: t('safe'), // Using existing keys
            text: 'Hi John, just wanted to follow up on our meeting yesterday. Let me know when you have time to discuss the project timeline. Thanks!'
        },
        {
            label: t('suspicious'),
            text: 'URGENT: Your account has been suspended! Click here immediately to verify your identity or your account will be permanently deleted. Act now!'
        },
        {
            label: t('phishing'),
            text: 'Congratulations! You have won $5,000,000 in the International Lottery! To claim your prize, send your bank details and social security number to verify your identity. Limited time offer - act now!'
        }
    ];

    return (
        <section className="checker-section">
            <div className="container">
                <div className="checker-header">
                    <div className="feature-icon text" style={{ margin: '0 auto 1.5rem' }}>
                        <MessageSquare />
                    </div>
                    <h2>{t('textScanner')}</h2>
                    <p>
                        {t('textCheckerDescription')}
                    </p>
                </div>

                <div className="checker-container">
                    <div className="checker-card glass-card">
                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="label">{t('enterText')}</label>
                            <textarea
                                className="input-field"
                                placeholder={t('enterText')}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                disabled={loading}
                                style={{ minHeight: '180px' }}
                            />
                            {error && (
                                <p style={{ color: 'var(--danger-color)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                                    {error}
                                </p>
                            )}

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '0.5rem'
                            }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    {text.length} characters
                                </span>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAnalyze}
                                    disabled={loading || text.trim().length < 10}
                                >
                                    <Search size={20} />
                                    {t('analyze')}
                                </button>
                            </div>
                        </div>

                        {/* Example Texts */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                {t('tryExamples')}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {exampleTexts.map((example, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-secondary"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
                                        onClick={() => {
                                            setText(example.text);
                                            setResult(null);
                                        }}
                                        disabled={loading}
                                    >
                                        <FileText size={14} />
                                        {example.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && <LoadingState type="text" />}

                        {/* Result */}
                        {result && !loading && <ResultCard result={result} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
