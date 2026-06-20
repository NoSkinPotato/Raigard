// Reviews ordered so featured ones lead, then newest first.
// Spread this into your existing groq query file, or import it directly.
export const reviewsQuery: string = `*[_type == "review"] | order(featured desc, date desc){
  _id,
  name,
  location,
  rating,
  review,
  colorway,
  verified,
  date,
  "avatarUrl": avatar.asset->url
}`
