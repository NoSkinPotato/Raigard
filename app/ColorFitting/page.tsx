import { client } from "@/src/lib/sanity";
import ColorFitClient from "@/Components/ColorFit/ColorFitClient";

export default async function ColorFit() {

  const caseColors = await client.fetch(`
      *[_type == "product"]{
        _id,
        name,
        "imageUrl": image.asset->url,
        colorGradient
      } | order(sequence asc)
  `);

  return <ColorFitClient colors={caseColors}/>;
}