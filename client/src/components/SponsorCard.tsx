import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function SponsorCard() {
    const [isVisible, setIsVisible] = useState(true);
    const STORAGE_KEY = 'sponsor-card-closed';

    // Check localStorage on component mount
    useEffect(() => {
        const isClosed = localStorage.getItem(STORAGE_KEY) === 'true';
        if (isClosed) {
            setIsVisible(false);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem(STORAGE_KEY, 'true');
    };

    const handleCardClick = () => {
        window.open('https://play.google.com/store/apps/details?id=com.np.xten.compass', '_blank');
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="w-full">
            <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={handleCardClick}>
                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-muted/80 hover:bg-muted transition-colors"
                    aria-label="Close sponsor card"
                >
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>

                {/* Sponsor By Text */}
                <div className="px-4 pt-4">
                    <p className="text-xs text-center text-muted-foreground font-medium">Sponsored by</p>
                </div>

                {/* Sponsor Image - Maintain 315x1015 aspect ratio */}
                <div className="w-full bg-muted" style={{ aspectRatio: '315 / 1015' }}>
                    <img
                        src="/sponsor/XTen.gif"
                        alt="XTen Sponsor"
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                </div>

                {/* Sponsor Text */}
                <div className="p-4">
                    <p className="text-sm font-semibold text-center text-foreground">Top Sponsor</p>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                        Thank you for supporting us!
                    </p>
                </div>
            </div>
        </div>
    );
}
