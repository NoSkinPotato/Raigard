import StarRating from './StarRating'
import type { Review } from '@/src/lib/reviewsQuery'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { name, rating, review: text } = review

  return (
    <div className="flex h-full min-h-[200px] flex-col justify-between rounded-2xl bg-black p-5">
      <div>
        <StarRating rating={rating} />
        <p className="mt-3 line-clamp-6 text-xs leading-relaxed text-neutral-300">{text}</p>
      </div>

      <p className="mt-4 text-xs text-neutral-400">- {name}</p>
    </div>
  )
}
