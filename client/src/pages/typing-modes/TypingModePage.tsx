import { Helmet } from 'react-helmet-async';
import Home from '../Home';

interface TypingModePageProps {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
    heading: string;
    subheading: string;
    preset?: {
        mode?: 'time' | 'words' | 'quote';
        duration?: number;
        wordCount?: number;
    };
}

export function TypingModePage({
    title,
    description,
    keywords,
    slug,
    heading,
    subheading,
    preset,
}: TypingModePageProps) {
    const canonicalUrl = `https://freeonlinetyping.com/${slug}`;

    return (
        <>
            <Helmet>
                <title>{title} | Free Online Typing</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords.join(', ')} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content={`https://freeonlinetyping.com/images/og-image.png`}
                />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="https://freeonlinetyping.com/images/og-image.png" />

                {/* Schema.org */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: title,
                        description: description,
                        url: canonicalUrl,
                        applicationCategory: 'UtilitiesApplication',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                    })}
                </script>
            </Helmet>

            {/* Custom heading for this mode */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{heading}</h1>
                <p className="text-muted-foreground">{subheading}</p>
            </div>

            <Home preset={preset} />
        </>
    );
}
