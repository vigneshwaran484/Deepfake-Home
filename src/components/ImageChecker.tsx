import { useState, useRef, useCallback } from 'react';
import { Image, Upload, X } from 'lucide-react';
import { analyzeImage, saveScanToHistory, type AnalysisResult } from '../utils/analyzers';
import ResultCard from './ResultCard';
import LoadingState from './LoadingState';
import { useLanguage } from '../i18n/LanguageContext';

export default function ImageChecker() {
    const { t } = useLanguage();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = useCallback((selectedFile: File) => {
        if (!selectedFile.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        setFile(selectedFile);
        setResult(null);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    }, [handleFileSelect]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setLoading(true);
        setResult(null);

        try {
            const analysisResult = await analyzeImage(file);
            setResult(analysisResult);

            saveScanToHistory({
                type: 'image',
                input: file.name,
                result: analysisResult
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <section className="checker-section">
            <div className="container">
                <div className="checker-header">
                    <div className="feature-icon image" style={{ margin: '0 auto 1.5rem' }}>
                        <Image />
                    </div>
                    <h2>{t('imageAnalyzer')}</h2>
                    <p>
                        {t('imageCheckerDescription')}
                    </p>
                </div>

                <div className="checker-container">
                    <div className="checker-card glass-card">
                        {/* Upload Zone */}
                        {!file && (
                            <div
                                className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        if (selectedFile) handleFileSelect(selectedFile);
                                    }}
                                />
                                <Upload className="upload-icon" />
                                <h4 style={{ marginBottom: '0.5rem' }}>{t('dropImage')}</h4>
                                <p style={{ fontSize: '0.9375rem' }}>
                                    or click to browse • Supports JPG, PNG, GIF, WebP
                                </p>
                            </div>
                        )}

                        {/* Image Preview */}
                        {file && preview && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>{file.name}</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <button
                                        className="btn btn-secondary btn-icon"
                                        onClick={clearFile}
                                        disabled={loading}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="preview-container">
                                    <img src={preview} alt="Preview" />
                                </div>

                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    style={{ width: '100%', marginTop: '1.5rem' }}
                                >
                                    {loading ? 'Analyzing...' : t('analyze')}
                                </button>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && <LoadingState type="image" />}

                        {/* Result */}
                        {result && !loading && <ResultCard result={result} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
