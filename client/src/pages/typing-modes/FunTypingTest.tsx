import { TypingModePage } from './TypingModePage';

export default function FunTypingTest() {
    return (
        <TypingModePage
            title="Fun Typing Test - Entertaining Quotes & Phrases"
            description="Enjoy typing with fun quotes, movie lines, and entertaining phrases. Make practice enjoyable while improving your typing speed. Perfect for casual typists and beginners."
            keywords={[
                'fun typing test',
                'entertaining typing test',
                'typing quotes',
                'fun typing practice',
                'typing game',
            ]}
            slug="fun-typing-test"
            heading="Fun Typing Test"
            subheading="Type entertaining quotes and have fun while practicing"
            preset={{ mode: 'quote' }}
        />
    );
}
