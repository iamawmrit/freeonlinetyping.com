import { TypingModePage } from './TypingModePage';

export default function AccuracyTypingTest() {
    return (
        <TypingModePage
            title="Accuracy Typing Test - Focus on Error-Free Typing"
            description="Master accurate typing with our precision-focused test. Perfect for improving typing accuracy and reducing errors. Essential for professional typing careers."
            keywords={[
                'accuracy typing test',
                'typing accuracy test',
                'error-free typing',
                'precise typing',
                'typing precision',
            ]}
            slug="accuracy-typing-test"
            heading="Accuracy Typing Test"
            subheading="Focus on precision and error-free typing"
            preset={{ mode: 'words', wordCount: 50 }}
        />
    );
}
