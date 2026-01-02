import { useRoute } from 'wouter';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { BlogMeta } from '@/components/blog/BlogMeta';
import blogPosts from '@/content/blog/posts';
import { Clock, Calendar, ArrowLeft, Zap } from 'lucide-react';
import { Link } from 'wouter';

export default function BlogPost() {
    const [, params] = useRoute('/blog/:slug');
    const post = blogPosts.find((p) => p.slug === params?.slug);

    if (!post) {
        return (
            <BlogLayout>
                <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
                    <h1 className="text-5xl font-bold mb-6 text-primary">Post Not Found</h1>
                    <p className="text-muted-foreground mb-8 text-lg">
                        The article you're looking for doesn't exist.
                    </p>
                    <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors text-lg group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                </div>
            </BlogLayout>
        );
    }

    const publishDate = new Date(post.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const relatedPosts = blogPosts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 3);

    return (
        <BlogLayout>
            <BlogMeta post={post} />

            <article className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-5 text-xs sm:text-sm">
                        <span className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 font-medium uppercase tracking-wider">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {publishDate}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime} min
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-foreground">
                        {post.title}
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{post.description}</p>
                </header>

                {/* Featured Image */}
                <div className="relative mb-12 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative border border-primary/20 overflow-hidden">
                        <img
                            src={post.ogImage}
                            alt={post.title}
                            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />
                    <div
                        className="prose prose-invert max-w-none pl-6
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-primary prose-h2:flex prose-h2:items-center prose-h2:gap-2
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-secondary
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:text-secondary prose-a:transition-colors
                prose-strong:text-foreground
                prose-ul:my-4 prose-li:text-muted-foreground
                prose-ol:my-4
                prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:border prose-code:border-primary/30
                prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-primary/5 prose-blockquote:py-2"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                {/* Author Bio */}
                <div className="mt-16 pt-8 border-t border-primary/20">
                    <div className="flex items-start gap-4 bg-card/50 border border-primary/20 p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-background flex-shrink-0">
                            FT
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1 text-foreground">{post.author}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Passionate about helping people improve their typing skills and productivity. Part of the team at{' '}
                                <a href="https://freeonlinetyping.com" className="text-primary hover:text-secondary transition-colors">
                                    freeonlinetyping.com
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16">
                    <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 p-8 sm:p-10 text-center overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                        <div className="relative">
                            <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">
                                Ready to Level Up?
                            </h2>
                            <p className="text-muted-foreground mb-6 text-sm sm:text-base max-w-xl mx-auto">
                                Practice what you've learned with our free typing test. Track your progress in real-time!
                            </p>
                            <a
                                href="/"
                                className="inline-block px-6 py-3 bg-primary text-background font-medium hover:bg-secondary transition-all transform hover:scale-105 uppercase tracking-wider text-sm"
                            >
                                Start Test Now
                            </a>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold mb-8 text-primary">Related Articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <a
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group block bg-card/30 border border-border hover:border-primary/50 p-5 transition-all hover:bg-card/50"
                                >
                                    <h3 className="font-bold mb-2 line-clamp-2 text-base group-hover:text-primary transition-colors">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                        {relatedPost.description}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-xs text-primary font-medium uppercase tracking-wider group-hover:gap-3 transition-all">
                                        Read More
                                        <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </BlogLayout>
    );
}
