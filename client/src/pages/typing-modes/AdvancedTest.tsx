import { TypingModePage } from './TypingModePage';

export default function AdvancedTypingTest() {
    return (
        <TypingModePage
            title="Advanced Typing Test - Complex Words & Punctuation"
            description="Challenge yourself with advanced typing including complex vocabulary, punctuation, and numbers. Perfect for experienced typists looking to master all aspects of typing."
            keywords={[
                'advanced typing test',
                'complex typing test',
                'professional typing test',
                'typing with punctuation',
                'advanced WPM test',
            ]}
            slug="advanced-typing-test"
            heading="Advanced Typing Test"
            subheading="Complex words, punctuation, and numbers for experienced typists"
            preset={{ mode: 'time', duration: 120 }}
        />
    );
}
