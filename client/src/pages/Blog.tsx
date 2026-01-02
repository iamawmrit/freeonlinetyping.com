import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { BlogCard } from '@/components/blog/BlogCard';
import blogPosts from '@/content/blog/posts';
import { Search } from 'lucide-react';

const categories = [
    'All',
    'Typing Speed & Skills',
    'Typing Techniques',
    'Gear & Equipment',
    'Health & Ergonomics',
    'Advanced Typing',
    'Education',
    'Technology',
    'Programming',
    'Accessibility',
    'Training',
    'Languages',
    'History',
    'Science',
    'Fun & Trivia',
    'Mobile',
    'Maintenance',
    'DIY & Hobbies',
    'Lifestyle',
];

// Map URL-friendly category slugs to actual category names
const categorySlugMap: Record<string, string> = {
    'typing-speed': 'Typing Speed & Skills',
    'typing-techniques': 'Typing Techniques',
    'gear-equipment': 'Gear & Equipment',
    'health-ergonomics': 'Health & Ergonomics',
    'advanced-typing': 'Advanced Typing',
    'education': 'Education',
    'technology': 'Technology',
    'programming': 'Programming',
    'accessibility': 'Accessibility',
    'training': 'Training',
    'languages': 'Languages',
    'history': 'History',
    'science': 'Science',
    'fun-trivia': 'Fun & Trivia',
    'mobile': 'Mobile',
    'maintenance': 'Maintenance',
    'diy-hobbies': 'DIY & Hobbies',
    'lifestyle': 'Lifestyle',
};

export default function Blog() {
    const [location] = useLocation();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Handle category query parameter
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category');

        if (categoryParam) {
            const mappedCategory = categorySlugMap[categoryParam];
            if (mappedCategory) {
                setSelectedCategory(mappedCategory);
            }
        }
    }, [location]);

    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory =
            selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch =
            searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <BlogLayout>
            <Helmet>
                <title>Typing Blog - Tips, Guides & Resources | Free Online Typing</title>
                <meta
                    name="description"
                    content="Explore expert typing tips, comprehensive guides, and valuable resources to improve your typing speed and accuracy. Free articles on touch typing, WPM improvement, and more."
                />
                <meta
                    name="keywords"
                    content="typing blog, typing tips, typing guides, WPM improvement, touch typing resources, typing tutorials"
                />
                <link rel="canonical" href="https://freeonlinetyping.com/blog" />

                {/* Open Graph */}
                <meta property="og:title" content="Typing Blog | Free Online Typing" />
                <meta
                    property="og:description"
                    content="Expert typing tips, guides, and resources to improve your typing skills."
                />
                <meta property="og:url" content="https://freeonlinetyping.com/blog" />
                <meta property="og:type" content="website" />

                {/* Schema.org */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Blog',
                        name: 'Free Online Typing Blog',
                        description:
                            'Expert guides and tips for improving typing speed and accuracy',
                        url: 'https://freeonlinetyping.com/blog',
                        publisher: {
                            '@type': 'Organization',
                            name: 'Free Online Typing',
                        },
                    })}
                </script>
            </Helmet>

            <div className="w-full max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        Typing Blog
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Expert tips, comprehensive guides, and valuable resources to master
                        typing and boost your WPM
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8">
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <BlogCard
                            key={post.id}
                            slug={post.slug}
                            title={post.title}
                            description={post.description}
                            category={post.category}
                            publishDate={post.publishDate}
                            readingTime={post.readingTime}
                            ogImage={post.ogImage}
                        />
                    ))}
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">
                            No articles found matching your criteria.
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 text-center bg-card/50 border border-border rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Ready to Test Your Typing Speed?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Put your skills to the test with our free online typing test. Track
                        your WPM and accuracy!
                    </p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Take Free Typing Test
                    </a>
                </div>
            </div>
        </BlogLayout>
    );
}
