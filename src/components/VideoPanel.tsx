import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface VideoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  className?: string;
}

const VideoPanel: React.FC<VideoPanelProps> = ({ isOpen, onClose, videoSrc, className = '' }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current || !closeButtonRef.current) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const closeButton = closeButtonRef.current;

    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';

      const openTl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      gsap.set(overlay, { opacity: 0 });
      gsap.set(panel, { opacity: 0, scale: 0.7, y: 50 });
      gsap.set(closeButton, { opacity: 0, scale: 0.5, rotation: -90 });

      openTl
        .to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .to(
          panel,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        )
        .to(
          closeButton,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'back.out(2)',
          },
          '-=0.2'
        );
    } else {
      setIsAnimating(true);

      // Closing animation - much smoother and faster
      const closeTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setIsAnimating(false);
        },
      });

      closeTl
        .to(closeButton, {
          opacity: 0,
          scale: 0.5,
          rotation: 90,
          duration: 0.15,
          ease: 'power2.in',
        })
        .to(
          panel,
          {
            opacity: 0,
            scale: 0.8,
            y: -30,
            duration: 0.25,
            ease: 'power2.in',
          },
          '-=0.1'
        )
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          '-=0.15'
        );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && !isAnimating) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isAnimating) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, isAnimating]);

  useEffect(() => {
    if (videoRef.current) {
      if (isOpen && isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isOpen, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    if (!isAnimating) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div ref={panelRef} className={`relative mx-4 bg-black rounded-xl overflow-hidden shadow-2xl ${className}`}>
        {/* Close button positioned at top-right of video panel */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
          disabled={isAnimating}>
          <svg
            className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-video">
          <video ref={videoRef} src={videoSrc} onClick={togglePlay} />
          <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center group">
            {!isPlaying && (
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ marginLeft: 0 }}>
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;
