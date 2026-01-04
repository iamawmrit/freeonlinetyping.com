import { TypingModePage } from './TypingModePage';

export default function FiveMinuteTypingTest() {
    return (
        <TypingModePage
            title="5 Minute Typing Test - Standard WPM Assessment"
            description="Take our 5-minute typing test for a comprehensive assessment of your typing speed and accuracy. Ideal for job applications and skill evaluation. Track your progress over time."
            keywords={[
                '5 minute typing test',
                'typing test 5 min',
                'standard typing test',
                '5 min WPM test',
                'typing assessment',
                'wpm test 5 minutes',
                'free typing test 5 minutes',
            ]}
            slug="5-minute-typing-test"
            heading="5 Minute Typing Test"
            subheading="Comprehensive typing assessment in 5 minutes"
            preset={{ mode: 'time', duration: 300 }}
        />
    );
}
