import Image from "next/image";
import { urlFor } from "../src/lib/image";

export default function ProductCard({ product }: any) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-sm transition hover:shadow-lg">
      <img
        src={urlFor(product.image).width(600).url()}
        alt={product.name}
        width={600}
        height={400}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {product.description}
        </p>

        <p className="mt-3 font-bold">
          Rp {product.price.toLocaleString()}
        </p>

        <a
          href={`https://wa.me/628123456789?text=Halo, saya tertarik dengan ${product.name}`}
          target="_blank"
          className="mt-4 block rounded bg-green-600 py-2 text-center text-white"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}