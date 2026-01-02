import { TypingModePage } from './TypingModePage';

export default function BeginnerTypingTest() {
    return (
        <TypingModePage
            title="Beginner Typing Test - Easy Practice for New Typists"
            description="Perfect typing test for beginners. Practice with simple words and build confidence. No pressure, just focus on learning proper technique and accuracy."
            keywords={[
                'beginner typing test',
                'easy typing test',
                'typing for beginners',
                'simple typing test',
                'learn typing',
            ]}
            slug="beginner-typing-test"
            heading="Beginner Typing Test"
            subheading="Easy practice mode perfect for learning to type"
            preset={{ mode: 'words', wordCount: 25 }}
        />
    );
}
