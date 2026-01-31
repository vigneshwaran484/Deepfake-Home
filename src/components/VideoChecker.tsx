import { useState, useRef, useCallback } from 'react';
import { Video, Upload, X, Play } from 'lucide-react';
import { analyzeVideo, saveScanToHistory, type AnalysisResult } from '../utils/analyzers';
import ResultCard from './ResultCard';
import LoadingState from './LoadingState';
import { useLanguage } from '../i18n/LanguageContext';

export default function VideoChecker() {
    const { t } = useLanguage();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleFileSelect = useCallback((selectedFile: File) => {
        if (!selectedFile.type.startsWith('video/')) {
            alert('Please select a video file');
            return;
        }

        // Limit file size to 100MB for demo
        if (selectedFile.size > 100 * 1024 * 1024) {
            alert('File size must be less than 100MB');
            return;
        }

        setFile(selectedFile);
        setResult(null);

        // Create preview URL
        const url = URL.createObjectURL(selectedFile);
        setPreview(url);
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
            const analysisResult = await analyzeVideo(file);
            setResult(analysisResult);

            saveScanToHistory({
                type: 'video',
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
        if (preview) {
            URL.revokeObjectURL(preview);
        }
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
                    <div className="feature-icon video" style={{ margin: '0 auto 1.5rem' }}>
                        <Video />
                    </div>
                    <h2>{t('videoDetector')}</h2>
                    <p>
                        {t('videoCheckerDescription')}
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
                                    accept="video/*"
                                    onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        if (selectedFile) handleFileSelect(selectedFile);
                                    }}
                                />
                                <Upload className="upload-icon" />
                                <h4 style={{ marginBottom: '0.5rem' }}>{t('dropVideo')}</h4>
                                <p style={{ fontSize: '0.9375rem' }}>
                                    or click to browse • Supports MP4, WebM, MOV (max 100MB)
                                </p>
                            </div>
                        )}

                        {/* Video Preview */}
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

                                <div className="preview-container" style={{ position: 'relative' }}>
                                    <video
                                        ref={videoRef}
                                        src={preview}
                                        controls
                                        style={{ width: '100%', maxHeight: '400px' }}
                                    />
                                </div>

                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    style={{ width: '100%', marginTop: '1.5rem' }}
                                >
                                    <Play size={20} />
                                    {loading ? 'Analyzing Video...' : t('analyze')}
                                </button>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && <LoadingState type="video" />}

                        {/* Result */}
                        {result && !loading && <ResultCard result={result} />}

                        {/* Info Box */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'rgba(102, 126, 234, 0.1)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}>
                            <h4 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Video size={20} color="var(--accent-purple)" />
                                How Video Analysis Works
                            </h4>
                            <ul style={{
                                marginLeft: '1.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9375rem',
                                lineHeight: 1.8
                            }}>
                                <li>Analyzes facial feature consistency across all frames</li>
                                <li>Checks lip synchronization with audio</li>
                                <li>Detects unnatural blinking patterns</li>
                                <li>Identifies AI-generated visual artifacts</li>
                                <li>Analyzes voice patterns for synthesis markers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
