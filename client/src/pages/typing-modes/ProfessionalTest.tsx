import { TypingModePage } from './TypingModePage';

export default function ProfessionalTypingTest() {
    return (
        <TypingModePage
            title="Professional Typing Test - Business & Office Standards"
            description="Professional typing test for job applications and career development. Test your skills with business vocabulary and office document formats. Get certified-level results."
            keywords={[
                'professional typing test',
                'business typing test',
                'office typing test',
                'typing test for jobs',
                'career typing test',
            ]}
            slug="professional-typing-test"
            heading="Professional Typing Test"
            subheading="Business-focused typing test for professional environments"
            preset={{ mode: 'time', duration: 180 }}
        />
    );
}
