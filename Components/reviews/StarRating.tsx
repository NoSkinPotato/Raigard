const STAR_PATH =
  'M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.77l-5.2 2.75.99-5.8-4.21-4.1 5.82-.85L10 1.5z'

interface StarRatingProps {
  rating?: number
  className?: string
}

export default function StarRating({ rating = 5, className = '' }: StarRatingProps) {
  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        // How full this particular star is, 0–1. e.g. rating 4.3, i=4 -> 0.3
        const fill = Math.min(Math.max(rating - i, 0), 1)

        return (
          <span key={i} className="relative inline-block h-4 w-4 shrink-0">
            {/* empty star underneath */}
            <svg viewBox="0 0 20 20" className="absolute inset-0 h-4 w-4 fill-white/15">
              <path d={STAR_PATH} />
            </svg>

            {/* gold star on top, clipped to the fill percentage */}
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-amber-400">
                  <path d={STAR_PATH} />
                </svg>
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
