import { TypingModePage } from './TypingModePage';

export default function SpeedTypingTest() {
    return (
        <TypingModePage
            title="Speed Typing Test - Push Your WPM Limits"
            description="Challenge yourself with our speed typing test. Compete for high scores, push your WPM limits, and see how fast you can type. Perfect for competitive typists."
            keywords={[
                'speed typing test',
                'fast typing test',
                'competitive typing',
                'typing speed challenge',
                'high WPM test',
                'typing speed test wpm',
                'free typing speed test',
                'check typing speed',
            ]}
            slug="speed-typing-test"
            heading="Speed Typing Test"
            subheading="Push your limits and compete for the fastest typing speed"
            preset={{ mode: 'time', duration: 60 }}
        />
    );
}
