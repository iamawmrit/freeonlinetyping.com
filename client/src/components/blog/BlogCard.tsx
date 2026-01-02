interface BlogCardProps {
    slug: string;
    title: string;
    description: string;
    category: string;
    publishDate: string;
    readingTime: number;
    ogImage: string;
}

export function BlogCard({
    slug,
    title,
    description,
    category,
    publishDate,
    readingTime,
    ogImage,
}: BlogCardProps) {
    const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="group bg-card/50 border border-border/50 hover:border-primary/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            {/* Featured Image */}
            <div className="relative h-48 overflow-hidden bg-muted">
                <img
                    src={ogImage}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {category}
                    </span>
                    <time dateTime={publishDate}>{formattedDate}</time>
                    <span>•</span>
                    <span>{readingTime} min read</span>
                </div>

                {/* Title */}
                <a
                    href={`/blog/${slug}`}
                    className="block text-lg font-bold text-foreground hover:text-primary transition-colors mb-2 line-clamp-2"
                >
                    {title}
                </a>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Read More Link */}
                <a
                    href={`/blog/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                    Read More
                    <span className="transition-transform">→</span>
                </a>
            </div>
        </article>
    );
}
