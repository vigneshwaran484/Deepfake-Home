import { Circle, CheckCircle } from 'lucide-react';

interface LoadingStateProps {
    type: 'url' | 'image' | 'text' | 'video';
}

export default function LoadingState({ type }: LoadingStateProps) {
    const steps: Record<string, string[]> = {
        url: [
            'Parsing URL structure',
            'Checking domain reputation',
            'Analyzing SSL certificate',
            'Scanning for phishing patterns',
            'Generating threat report'
        ],
        image: [
            'Processing image data',
            'Detecting faces in image',
            'Analyzing pixel patterns',
            'Checking for AI artifacts',
            'Running deepfake detection',
            'Generating analysis report'
        ],
        text: [
            'Analyzing text content',
            'Detecting scam patterns',
            'Checking embedded links',
            'Evaluating sentiment',
            'Generating risk assessment'
        ],
        video: [
            'Loading video file',
            'Extracting frame samples',
            'Analyzing facial consistency',
            'Checking lip-sync accuracy',
            'Analyzing audio patterns',
            'Running deepfake detection',
            'Generating report'
        ]
    };

    const currentSteps = steps[type] || steps.url;

    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Analyzing {type}...</p>

            <div className="loading-steps">
                {currentSteps.map((step, index) => {
                    // Simulate progress based on time
                    const isActive = index === Math.floor(Date.now() / 800) % currentSteps.length;
                    const isComplete = index < Math.floor(Date.now() / 800) % currentSteps.length;

                    return (
                        <div
                            key={index}
                            className={`loading-step ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                        >
                            {isComplete ? <CheckCircle /> : <Circle />}
                            <span>{step}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
