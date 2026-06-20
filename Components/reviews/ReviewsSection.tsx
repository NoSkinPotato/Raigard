tsximport { client } from "@/src/lib/sanity";
import { reviewsQuery } from "@/src/lib/reviewsQuery";
import ReviewsCarousel from "./ReviewsCarousel";
import type { Review } from "@/src/lib/types/review";

export default async function ReviewsSection() {
  const reviews = await client.fetch<Review[]>(reviewsQuery)

  if (!reviews?.length) return null

  return (
    <section id="reviews" className="bg-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Heading: bordered pill on desktop, plain centered text on mobile */}
        <div className="mx-auto mb-12 max-w-2xl rounded-[40px] border-black px-4 py-4 text-center md:border-2 md:px-12 md:py-6">
          <h2 className="text-xl font-bold text-black md:text-2xl">Reviews</h2>

          <div className="my-3 flex justify-center gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-black" />
            ))}
          </div>

          <hr className="mb-3 border-black/20" />

          <p className="text-sm font-bold uppercase tracking-wide text-black md:text-base">
            What Collectors Are Saying
          </p>
        </div>

        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  )
}
