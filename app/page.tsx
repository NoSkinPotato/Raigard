import "./homePage.css"
import Image from "next/image";
import { client } from "../src/lib/sanity";
import ProductCard from "../Components/productCard";

export const revalidate = 60;

export default async function Home() {

    const products = await client.fetch(`
    *[_type == "product"]{
      _id,
      name,
      price,
      description,
      image,
      colorGradient
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
    {/* <section className="mx-auto max-w-7xl px-6 py-12 text-center">
        <h2 className="text-4xl font-bold">
          Welcome to My Store
        </h2>

        <p className="mt-4 text-gray-600">
          Browse our collection and order directly via WhatsApp.
        </p>
    </section> */}
      <main className="MainSection">
        <div className="mx-auto w-full flex-1 max-w-[900px]">
          <div className="flex flex-wrap justify-center gap-3">
            {products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      </main>
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          © 2026 Raigard • Order through WhatsApp
        </div>
      </footer>
    </div>
  );
}