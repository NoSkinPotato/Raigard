'use client'

import { useEffect, useRef, useState } from 'react'
import StarRating from './StarRating'
import { urlFor } from "../src/lib/image"
import { div } from 'framer-motion/client'

export default function ReviewsCarousel({ reviews }: any) {
  const [index, setIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768)

    update()
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  const cardsPerPage = isDesktop ? 3 : 1
  const pageCount = Math.ceil(reviews.length / cardsPerPage)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    if (paused) return

    const timer = setInterval(() => {
      setIndex(i => (i + 1) % pageCount)
    }, 10000)

    return () => clearInterval(timer)
  }, [paused, pageCount])

  const next = () => {
    setIndex(i => (i + 1) % pageCount)
  }

  const prev = () => {
    setIndex(i => (i - 1 + pageCount) % pageCount)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  } 

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  } 

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current  

    // Ignore tiny movements
    if (Math.abs(distance) < 50) return 

    if (distance > 0) {
      next() // swipe left
    } else {
      prev() // swipe right
    }
  }

  return (
    <div
      className="relative overflow-hidden px-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out gap-5"
        style={{
          transform: `translateX(-${index * 100}%)`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {Array.from({ length: pageCount }).map((_, page) => (
          <div
            key={page}
            className="w-full shrink-0 flex gap-5"
          >
            {reviews
              .slice(
                page * cardsPerPage,
                page * cardsPerPage + cardsPerPage
              )
              .map((review: any) => (
                <div
                  key={review._id}
                  className={`${
                    isDesktop ? 'w-1/3' : 'w-full'
                  } 
                  rounded-2xl bg-black p-5 flex flex-col justify-between min-h-[220px]`}
                >
                  <div>
                    <StarRating rating={review.RatingValue} />

                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <p className="mt-3 text-xs text-neutral-300 line-clamp-6">
                          {review.ReviewNote}
                        </p>
                      </div>   
                      
                      {review.ReviewImage && (
                        <img
                          src={urlFor(review.ReviewImage).width(300).url()}
                          alt={review.Username}
                          width={100}
                          height={100}
                          className="w-48 h-48 shrink-0 rounded-lg object-cover"
                        />
                      )
                      }
                    </div>
                  </div>

                  <p className="mt-5 text-xs text-neutral-400">
                    - {review.Username}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>

        
      <div className='mt-8 mb-5 flex items-center justify-center gap-6 mx-10'>    
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-opacity hover:opacity-70 disabled:opacity-20 disabled:hover:opacity-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          ‹
        </button>

        <div className="flex justify-center gap-2 py-auto">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all ${
                index === i
                  ? 'w-6 h-2 bg-black'
                  : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-opacity hover:opacity-70 disabled:opacity-20 disabled:hover:opacity-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          ›
        </button>

      </div>
    </div>
  )
}