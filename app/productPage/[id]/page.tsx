import Image from "next/image";
import { getProduct } from "@/src/lib/sanity";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <div className="min-h-screen flex flex-col">
    <header className="Header">
      <Image className="HeaderLogo"
        src="/Raigard.png"
        alt="Store Logo"
        width={200}
        height={100}
      />
    </header>
    {/* <section className="mx-auto max-w-7xl px-6 py-12 text-center">
        <h2 className="text-4xl font-bold">
          Welcome to My Store
        </h2>

        <p className="mt-4 text-gray-600">
          Browse our collection and order directly via WhatsApp.
        </p>
    </section> */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          © 2026 {product.name} • Order through WhatsApp
        </div>
      </footer>
    </div>
  );
}
