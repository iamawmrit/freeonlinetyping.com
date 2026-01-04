import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Play, RotateCcw } from 'lucide-react';
import { useTestStore } from '@/lib/store';
import { TypingArea } from '@/components/TypingArea';
import { StatsDisplay } from '@/components/StatsDisplay';
import { KeyboardDisplay } from '@/components/KeyboardDisplay';
import { ResultModal } from '@/components/ResultModal';

export default function CustomTextTypingTest() {
    const [customText, setCustomText] = useState('');
    const [isTestActive, setIsTestActive] = useState(false);
    const { resetTest, setWords, status } = useTestStore();

    const handleStartTest = () => {
        if (customText.trim().length < 10) {
            alert('Please enter at least 10 characters of text to practice with.');
            return;
        }

        // Convert custom text to words array
        const wordsArray = customText.trim().split(/\s+/);
        setWords(wordsArray);
        setIsTestActive(true);
    };

    const handleReset = () => {
        setIsTestActive(false);
        resetTest();
    };

    // Reset when test finishes
    useEffect(() => {
        if (status === 'finished' && isTestActive) {
            setTimeout(() => {
                setIsTestActive(false);
            }, 2000);
        }
    }, [status, isTestActive]);

    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is perfect for practicing typing skills.",
        "Practice makes perfect. The more you type, the faster and more accurate you become. Consistency is key to improving your typing speed.",
        "Technology has transformed the way we communicate. From emails to instant messages, typing has become an essential skill in the digital age."
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-background">
                <Helmet>
                    <title>Custom Text Typing Practice - Type Your Own Text | Free Online Typing</title>
                    <meta
                        name="description"
                        content="Practice typing with your own custom text. Perfect for students, professionals, and anyone who wants to practice typing specific content. Free custom text typing test."
                    />
                    <meta
                        name="keywords"
                        content="custom text typing, practice typing, custom typing test, type your own text, personalized typing practice, typing trainer"
                    />
                    <link rel="canonical" href="https://freeonlinetyping.com/custom-text-typing-test" />

                    {/* Open Graph */}
                    <meta property="og:title" content="Custom Text Typing Practice | Free Online Typing" />
                    <meta property="og:description" content="Practice typing with your own custom text. Perfect for personalized typing practice." />
                    <meta property="og:url" content="https://freeonlinetyping.com/custom-text-typing-test" />
                    <meta property="og:type" content="website" />
                </Helmet>

                <div className="w-full max-w-6xl mx-auto px-4 py-8">
                    {!isTestActive ? (
                        <>
                            {/* Header Section */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                    <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                    Custom Text Typing Practice
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Practice typing with your own custom text. Perfect for students preparing for exams, professionals practicing specific content, or anyone who wants personalized typing practice.
                                </p>
                            </div>

                            {/* Input Section */}
                            <Card className="mb-8">
                                <CardHeader>
                                    <CardTitle>Enter Your Custom Text</CardTitle>
                                    <CardDescription>
                                        Type or paste the text you want to practice. Minimum 10 characters required.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Textarea
                                        placeholder="Enter your custom text here... (minimum 10 characters)"
                                        value={customText}
                                        onChange={(e) => setCustomText(e.target.value)}
                                        className="min-h-[200px] font-mono text-base"
                                    />
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            {customText.length} characters
                                        </span>
                                        <Button
                                            onClick={handleStartTest}
                                            disabled={customText.trim().length < 10}
                                            size="lg"
                                        >
                                            <Play className="w-4 h-4 mr-2" />
                                            Start Typing Test
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Sample Texts */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Need Inspiration? Try These Sample Texts</CardTitle>
                                    <CardDescription>
                                        Click on any sample text to use it for practice
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {sampleTexts.map((text, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setCustomText(text)}
                                            className="p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all"
                                        >
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {text}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Features Section */}
                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                <Card className="border-border/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Personalized Practice</CardTitle>
                                        <CardDescription>
                                            Practice with content that matters to you - essays, code, emails, or any text
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="border-border/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Real-time Feedback</CardTitle>
                                        <CardDescription>
                                            Get instant feedback on your typing speed and accuracy as you type
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="border-border/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Unlimited Practice</CardTitle>
                                        <CardDescription>
                                            Practice as many times as you want with different texts - completely free
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Test Active View */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Custom Text Typing Test</h2>
                                <Button onClick={handleReset} variant="outline">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reset
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <StatsDisplay />
                                <TypingArea />
                                <KeyboardDisplay />
                            </div>
                        </>
                    )}
                </div>

                <ResultModal />
            </div>
        </>
    );
}
