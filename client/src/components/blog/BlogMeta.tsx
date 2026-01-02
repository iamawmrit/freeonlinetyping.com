import { Helmet } from 'react-helmet-async';

export interface BlogPostMetadata {
    title: string;
    description: string;
    slug: string;
    author: string;
    publishDate: string;
    lastModified: string;
    category: string;
    keywords: string[];
    ogImage: string;
    readingTime: number;
}

interface BlogMetaProps {
    post: BlogPostMetadata;
}

export function BlogMeta({ post }: BlogMetaProps) {
    const canonicalUrl = `https://freeonlinetyping.com/blog/${post.slug}`;
    const siteUrl = 'https://freeonlinetyping.com';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{post.title} | Free Online Typing Blog</title>
            <meta name="description" content={post.description} />
            <meta name="keywords" content={post.keywords.join(', ')} />
            <meta name="author" content={post.author} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="article" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.description} />
            <meta property="og:image" content={`${siteUrl}${post.ogImage}`} />
            <meta property="og:image:alt" content={post.title} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Free Online Typing" />
            <meta property="article:published_time" content={post.publishDate} />
            <meta property="article:modified_time" content={post.lastModified} />
            <meta property="article:author" content={post.author} />
            <meta property="article:section" content={post.category} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.description} />
            <meta name="twitter:image" content={`${siteUrl}${post.ogImage}`} />
            <meta name="twitter:image:alt" content={post.title} />
            <meta name="twitter:creator" content="@awmrit" />

            {/* Schema.org BlogPosting */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: post.title,
                    description: post.description,
                    image: `${siteUrl}${post.ogImage}`,
                    datePublished: post.publishDate,
                    dateModified: post.lastModified,
                    author: {
                        '@type': 'Person',
                        name: post.author,
                        url: 'https://awmrit.com'
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: 'Free Online Typing',
                        logo: {
                            '@type': 'ImageObject',
                            url: `${siteUrl}/images/logo.png`
                        }
                    },
                    mainEntityOfPage: {
                        '@type': 'WebPage',
                        '@id': canonicalUrl
                    }
                })}
            </script>

            {/* Schema.org BreadcrumbList */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: 'Home',
                            item: 'https://freeonlinetyping.com'
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Blog',
                            item: 'https://freeonlinetyping.com/blog'
                        },
                        {
                            '@type': 'ListItem',
                            position: 3,
                            name: post.title,
                            item: canonicalUrl
                        }
                    ]
                })}
            </script>
        </Helmet>
    );
}
