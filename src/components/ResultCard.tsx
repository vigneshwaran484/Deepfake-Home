import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    AlertCircle
} from 'lucide-react';
import type { AnalysisResult } from '../utils/analyzers';
import { useLanguage } from '../i18n/LanguageContext';

interface ResultCardProps {
    result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
    const { t } = useLanguage();

    const statusIcon = {
        safe: CheckCircle,
        danger: XCircle,
        warning: AlertTriangle
    };

    const Icon = statusIcon[result.status];

    return (
        <div className="result-container">
            <div className={`result-card ${result.status}`}>
                {/* Header */}
                <div className="result-header">
                    <div className="result-status">
                        <Icon />
                    </div>
                    <div className="result-title">
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                    </div>
                </div>

                {/* Confidence Meter */}
                <div className="confidence-meter">
                    <div className="confidence-label">
                        <span>{t('confidence')}</span>
                        <span>{result.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="confidence-bar">
                        <div
                            className="confidence-fill"
                            style={{ width: `${result.confidence}%` }}
                        />
                    </div>
                </div>

                {/* Metadata Grid */}
                <div className="metadata-grid">
                    {result.metadata.map((item, index) => (
                        <div key={index} className="metadata-item">
                            <div className="label">
                                {/* Try to translate the label if it's a key, otherwise show as is */}
                                {t(item.label as any) !== item.label ? t(item.label as any) : item.label}
                            </div>
                            <div className="value">{item.value}</div>
                        </div>
                    ))}
                </div>

                {/* Risk Factors */}
                {result.riskFactors.length > 0 && (
                    <div className="risk-factors">
                        <h4>
                            {result.status === 'safe' ? t('analysisDetails') : t('riskFactorsDetected')}
                        </h4>
                        <ul className="risk-list">
                            {result.riskFactors.map((factor, index) => (
                                <li key={index} className={`risk-item ${factor.level}`}>
                                    <AlertCircle />
                                    <span>{factor.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Detailed Findings */}
                {result.detailedAnalysis && result.detailedAnalysis.length > 0 && (
                    <div className="detailed-analysis">
                        <h4>{t('detailedTechnicalAnalysis') || 'Detailed Technical Analysis'}</h4>
                        <div className="detailed-list">
                            {result.detailedAnalysis.map((item, index) => (
                                <div key={index} className="detailed-item">
                                    <div className="detailed-header">
                                        <div className="detailed-label">
                                            {item.timestamp && <span className="timestamp">[{item.timestamp}]</span>}
                                            <span className="label-text">{item.label}</span>
                                        </div>
                                        <div className="detailed-confidence">
                                            {item.confidence}% Match
                                        </div>
                                    </div>
                                    <p className="detailed-description">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
