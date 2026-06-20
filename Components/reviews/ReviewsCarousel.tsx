'use client'

import { useRef, useState, useCallback } from 'react'
import ReviewCard from './ReviewCard'
import type { Review } from '@/src/lib/reviewsQuery'

const GAP_PX = 16 // px, matches gap-4 below — keep these in sync

interface ReviewsCarouselProps {
  reviews: Review[]
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [page, setPage] = useState<number>(0) // desktop: which group of 4 is showing

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [])

  // Fires on every scroll tick (native touch swipe, trackpad, or button-triggered scroll)
  // and figures out which card is currently centered so the buttons stay in sync.
  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[0] as HTMLElement | undefined
    if (!card) return
    const cardWidth = card.offsetWidth + GAP_PX
    const index = Math.round(track.scrollLeft / cardWidth)
    setActiveIndex(Math.min(Math.max(index, 0), reviews.length - 1))
  }, [reviews.length])

  if (!reviews?.length) return null

  const pageCount = Math.ceil(reviews.length / 4)
  const visibleDesktop = reviews.slice(page * 4, page * 4 + 4)

  const handlePrev = () => scrollToIndex(Math.max(activeIndex - 1, 0))
  const handleNext = () => scrollToIndex(Math.min(activeIndex + 1, reviews.length - 1))

  return (
    <div>
      {/* Desktop: static 4-card grid, paginated in groups of 4 if there are more */}
      <div className="hidden md:block">
        <div className="grid grid-cols-4 gap-6">
          {visibleDesktop.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              aria-label="Previous reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-opacity hover:opacity-70 disabled:opacity-20 disabled:hover:opacity-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              ‹
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Go to review page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === page ? 'w-6 bg-black' : 'w-1.5 bg-black/20'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
              disabled={page === pageCount - 1}
              aria-label="Next reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-opacity hover:opacity-70 disabled:opacity-20 disabled:hover:opacity-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Mobile: native swipe via scroll-snap, single card per view, overlapping nav buttons */}
      <div className="md:hidden">
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="motion-safe:scroll-smooth flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review) => (
              <div key={review._id} className="w-[85%] shrink-0 snap-center">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {activeIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              ‹
            </button>
          )}

          {activeIndex < reviews.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="absolute right-0 top-1/2 z-10 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              ›
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
