import "./homePage.css"
import Image from "next/image";
import { client } from "../src/lib/sanity";
import ProductCard from "../Components/productCard";



export default async function Home() {

    const products = await client.fetch(`
    *[_type == "product"]{
      _id,
      name,
      price,
      description,
      image
    }
  `);
  
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
    <section className="mx-auto max-w-7xl px-6 py-12 text-center">
        <h2 className="text-4xl font-bold">
          Welcome to My Store
        </h2>

        <p className="mt-4 text-gray-600">
          Browse our collection and order directly via WhatsApp.
        </p>
    </section>
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </main>
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          © 2026 My Store • Order through WhatsApp
        </div>
      </footer>
    </div>
  );
}