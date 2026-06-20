export interface Review {
  _id: string
  name: string
  location?: string
  rating: number
  review: string
  colorway?: string
  verified?: boolean
  date: string
  avatarUrl?: string
}
