import { TypingModePage } from './TypingModePage';

export default function OneMinuteTypingTest() {
    return (
        <TypingModePage
            title="1 Minute Typing Test - Quick WPM Check"
            description="Take a quick 1-minute typing test to instantly measure your WPM and accuracy. Perfect for daily progress tracking and quick skill assessments. Free and no sign-up required."
            keywords={[
                '1 minute typing test',
                'quick typing test',
                '1 min WPM test',
                'fast typing test',
                'typing speed 1 minute',
            ]}
            slug="1-minute-typing-test"
            heading="1 Minute Typing Test"
            subheading="Quick typing speed assessment in just 60 seconds"
            preset={{ mode: 'time', duration: 60 }}
        />
    );
}
