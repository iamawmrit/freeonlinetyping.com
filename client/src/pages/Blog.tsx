import { useState, useEffect, useMemo } from 'react';
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
    const [location, setLocation] = useLocation();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSearch, setCurrentSearch] = useState(window.location.search);

    // Listen for URL changes that might not trigger wouter's location update (query only changes)
    useEffect(() => {
        const handleUrlChange = () => {
            setCurrentSearch(window.location.search);
        };

        // Listen for popstate (back/forward)
        window.addEventListener('popstate', handleUrlChange);

        // Monkey patch pushState and replaceState to catch internal navigation
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function (...args) {
            originalPushState.apply(this, args);
            handleUrlChange();
        };

        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args);
            handleUrlChange();
        };

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };
    }, []);

    // Sync state with URL search params
    useEffect(() => {
        const params = new URLSearchParams(currentSearch);
        const categoryParam = params.get('category');
        const qParam = params.get('q');

        if (categoryParam) {
            // Find key by value or direct mapping?
            // categorySlugMap keys are slugs (e.g., 'typing-speed'), values are Display Names
            // We expect the URL to contain the KEY (slug).
            // But the loop below Line 171 uses 'categories' array which are Names.
            // We need to map back and forth.

            // Reverse lookup: check if current param is a slug in map
            if (categorySlugMap[categoryParam]) {
                setSelectedCategory(categorySlugMap[categoryParam]);
            } else if (categories.includes(categoryParam)) {
                // Fallback if full name passed
                setSelectedCategory(categoryParam);
            }
        } else {
            setSelectedCategory('All');
        }

        if (qParam) {
            setSearchQuery(qParam);
        }
    }, [currentSearch]);

    // Update URL when category or search changes
    const updateUrl = (category: string, search: string) => {
        const params = new URLSearchParams(window.location.search);

        // Handle Category
        if (category && category !== 'All') {
            // Find slug for category name
            const slugEntry = Object.entries(categorySlugMap).find(([_, name]) => name === category);
            const slug = slugEntry ? slugEntry[0] : category;
            params.set('category', slug);
        } else {
            params.delete('category');
        }

        // Handle Search
        if (search) {
            params.set('q', search);
        } else {
            params.delete('q');
        }

        const newSearch = params.toString();
        const newUrl = newSearch ? `${window.location.pathname}?${newSearch}` : window.location.pathname;

        // Only navigate if changed
        if (window.location.search !== `?${newSearch}` && window.location.search !== newSearch) {
            setLocation(newUrl); // This will update wouter location and SHOULD trigger our monkey patch or location effect
        }
    };

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory =
            selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch =
            searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        updateUrl(category, searchQuery);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setSearchQuery(newVal);
        // Debounce URL update could be better, but direct for now
        // To avoid lagging input, we keep local state `searchQuery` sync but maybe delay URL? 
        // For simplicity, let's just update local state and let useEffect NOT overwrite it if it matches?
        // Actually, let's just update URL on blur or debounce. For now, immediate might be jumpy.
        // Let's NOT update URL for search on every keystroke to avoid history spam.
        // Only update URL for Category clicks specifically.
    };

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
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
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
