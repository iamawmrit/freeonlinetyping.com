import { TypingModePage } from './TypingModePage';

export default function TenMinuteTypingTest() {
    return (
        <TypingModePage
            title="10 Minute Typing Test - Extended Endurance Challenge"
            description="Test your typing endurance with our 10-minute typing test. Perfect for measuring sustained typing speed and accuracy over longer periods. Free online test with detailed statistics."
            keywords={[
                '10 minute typing test',
                'long typing test',
                'typing endurance test',
                'extended typing test',
                '10 min WPM test',
            ]}
            slug="10-minute-typing-test"
            heading="10 Minute Typing Test"
            subheading="Challenge your endurance with an extended typing session"
            preset={{ mode: 'time', duration: 600 }}
        />
    );
}
