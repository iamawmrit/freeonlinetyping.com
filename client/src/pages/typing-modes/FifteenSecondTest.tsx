import { TypingModePage } from './TypingModePage';

export default function FifteenSecondTypingTest() {
    return (
        <TypingModePage
            title="15 Second Typing Test - Ultra Quick WPM Check"
            description="Take an ultra-quick 15-second typing test for instant WPM measurement. Perfect for rapid assessments and warm-ups. Free and no sign-up required."
            keywords={[
                '15 second typing test',
                'quick typing test',
                'fast WPM test',
                'typing speed test',
                'instant typing test',
            ]}
            slug="15-second-typing-test"
            heading="15 Second Typing Test"
            subheading="Ultra quick typing speed assessment in just 15 seconds"
            preset={{ mode: 'time', duration: 15 }}
        />
    );
}
