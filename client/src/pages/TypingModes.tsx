import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { Clock, Target, Zap, Baby, GraduationCap, Briefcase, Smile, Timer, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/Header';

interface TypingMode {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    duration?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'professional';
}

const typingModes: TypingMode[] = [
    {
        title: 'Custom Text Typing Practice',
        description: 'Practice typing with your own custom text and paragraphs',
        href: '/custom-text-typing-test',
        icon: <FileText className="w-6 h-6" />,
        difficulty: 'intermediate',
    },
    {
        title: '15 Second Typing Test',
        description: 'Ultra quick typing speed assessment in just 15 seconds',
        href: '/15-second-typing-test',
        icon: <Timer className="w-6 h-6" />,
        duration: '15 sec',
        difficulty: 'beginner',
    },
    {
        title: '1 Minute Typing Test',
        description: 'Quick typing speed assessment in just 60 seconds',
        href: '/1-minute-typing-test',
        icon: <Timer className="w-6 h-6" />,
        duration: '1 min',
        difficulty: 'beginner',
    },
    {
        title: '5 Minute Typing Test',
        description: 'Standard typing test to measure your consistent speed',
        href: '/5-minute-typing-test',
        icon: <Clock className="w-6 h-6" />,
        duration: '5 min',
        difficulty: 'intermediate',
    },
    {
        title: '10 Minute Typing Test',
        description: 'Extended typing test for endurance and consistency',
        href: '/10-minute-typing-test',
        icon: <Clock className="w-6 h-6" />,
        duration: '10 min',
        difficulty: 'advanced',
    },
    {
        title: 'Speed Typing Test',
        description: 'Challenge yourself with fast-paced typing exercises',
        href: '/speed-typing-test',
        icon: <Zap className="w-6 h-6" />,
        difficulty: 'advanced',
    },
    {
        title: 'Accuracy Typing Test',
        description: 'Focus on precision and accuracy over speed',
        href: '/accuracy-typing-test',
        icon: <Target className="w-6 h-6" />,
        difficulty: 'intermediate',
    },
    {
        title: 'Fun Typing Test',
        description: 'Enjoy typing with fun quotes and entertaining content',
        href: '/fun-typing-test',
        icon: <Smile className="w-6 h-6" />,
        difficulty: 'beginner',
    },
    {
        title: 'Beginner Typing Test',
        description: 'Perfect for those just starting their typing journey',
        href: '/beginner-typing-test',
        icon: <Baby className="w-6 h-6" />,
        difficulty: 'beginner',
    },
    {
        title: 'Advanced Typing Test',
        description: 'Challenge yourself with complex words and patterns',
        href: '/advanced-typing-test',
        icon: <GraduationCap className="w-6 h-6" />,
        difficulty: 'advanced',
    },
    {
        title: 'Professional Typing Test',
        description: 'Professional-level test for career and certification',
        href: '/professional-typing-test',
        icon: <Briefcase className="w-6 h-6" />,
        difficulty: 'professional',
    },
    {
        title: 'Kids Typing Test',
        description: 'Kid-friendly typing test with simple words',
        href: '/typing-test-for-kids',
        icon: <Baby className="w-6 h-6" />,
        difficulty: 'beginner',
    },
];

const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
    intermediate: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    advanced: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    professional: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
};

export default function TypingModes() {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-background">
                <Helmet>
                    <title>Typing Modes - Choose Your Test | Free Online Typing</title>
                    <meta
                        name="description"
                        content="Choose from 11 typing test modes including 15-second, 1-minute, 5-minute, speed tests, accuracy tests, and more. Find the perfect typing test for your skill level."
                    />
                    <meta
                        name="keywords"
                        content="typing modes, typing tests, WPM test, typing speed test, accuracy test, beginner typing, professional typing, 1 minute test, 5 minute test, 10 minute test"
                    />
                    <link rel="canonical" href="https://freeonlinetyping.com/typing-modes" />

                    {/* Open Graph */}
                    <meta property="og:title" content="Typing Test Modes | Free Online Typing" />
                    <meta property="og:description" content="Choose from 11 typing test modes for different skill levels and goals. Free typing tests with no sign-up required." />
                    <meta property="og:url" content="https://freeonlinetyping.com/typing-modes" />
                    <meta property="og:type" content="website" />

                    {/* Structured Data */}
                    <script type="application/ld+json">
                        {JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'CollectionPage',
                            name: 'Typing Test Modes',
                            description: 'Collection of typing test modes for all skill levels',
                            url: 'https://freeonlinetyping.com/typing-modes',
                            breadcrumb: {
                                '@type': 'BreadcrumbList',
                                itemListElement: [{
                                    '@type': 'ListItem',
                                    position: 1,
                                    name: 'Home',
                                    item: 'https://freeonlinetyping.com'
                                }, {
                                    '@type': 'ListItem',
                                    position: 2,
                                    name: 'Typing Modes',
                                    item: 'https://freeonlinetyping.com/typing-modes'
                                }]
                            }
                        })}
                    </script>
                </Helmet>

                <div className="w-full max-w-7xl mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                            Typing Test Modes
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Choose from a variety of typing tests designed for different skill levels and goals
                        </p>
                    </div>

                    {/* Typing Modes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {typingModes.map((mode) => (
                            <Link key={mode.href} href={mode.href}>
                                <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group">
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                                                {mode.icon}
                                            </div>
                                            <div className="flex gap-2">
                                                {mode.duration && (
                                                    <span className="text-xs px-2 py-1 bg-muted rounded-full">
                                                        {mode.duration}
                                                    </span>
                                                )}
                                                {mode.difficulty && (
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full border capitalize ${difficultyColors[mode.difficulty]
                                                            }`}
                                                    >
                                                        {mode.difficulty}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {mode.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm">
                                            {mode.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card className="border-border/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Choose Your Level</CardTitle>
                                <CardDescription>
                                    Start with beginner tests and gradually move up to professional level as you improve
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-border/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Track Progress</CardTitle>
                                <CardDescription>
                                    Each test mode helps you focus on different aspects of typing - speed, accuracy, or endurance
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-border/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Free Forever</CardTitle>
                                <CardDescription>
                                    All typing test modes are completely free with no sign-up required. Practice anytime!
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-card/50 border border-border rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Not Sure Where to Start?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Try our most popular 1-minute typing test for a quick assessment
                        </p>
                        <Link
                            href="/1-minute-typing-test"
                            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Take 1 Minute Test
                        </Link>
                    </div>
                </div>
            </div >
        </>
    );
}
