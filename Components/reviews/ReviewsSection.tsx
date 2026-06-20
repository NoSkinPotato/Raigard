import { client } from "@/src/lib/sanity";
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
          <h2 className="text-xl font-bold text-black md:text-2xl mb-4">Reviews</h2>

          {/* New line and dots structure */}
          <div className="flex items-center justify-center gap-3 mt-4 pr-15 pl-15">
            <div className="h-1 rounded-[5px] w-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="h-1 rounded-[5px] w-full bg-black" />
          </div>

          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-black md:text-base">
            What Collectors Are Saying
          </p>
        </div>

        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  )
}
