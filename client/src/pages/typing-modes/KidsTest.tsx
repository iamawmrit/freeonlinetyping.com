import { TypingModePage } from './TypingModePage';

export default function TypingTestForKids() {
    return (
        <TypingModePage
            title="Typing Test for Kids - Fun & Educational"
            description="Kid-friendly typing test with simple words and encouraging feedback. Perfect for children learning to type. Safe, educational, and fun typing practice for young learners."
            keywords={[
                'typing test for kids',
                'kids typing practice',
                'children typing test',
                'typing for children',
                'learn typing for kids',
            ]}
            slug="typing-test-for-kids"
            heading="Typing Test for Kids"
            subheading="Fun and simple typing practice for young learners"
            preset={{ mode: 'words', wordCount: 10 }}
        />
    );
}
