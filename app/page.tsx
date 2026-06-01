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
    <div className="min-h-screen flex flex-col ">
    <header className="Header">
      <Image className="HeaderLogo"
        src="/Picture/Raigard.png"
        alt="Store Logo"
        width={325}
        height={50}
      />
    </header>
    {/* <section className="mx-auto max-w-7xl px-6 py-12 text-center">
        <h2 className="text-4xl font-bold">
          Welcome to My Store
        </h2>

        <p className="mt-4 text-gray-600">
          Browse our collection and order directly via WhatsApp.
        </p>
    </section>  */}
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
      <a
        href="https://wa.me/6281296735238?text=Hi, I wanna buy"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-15 right-6 z-50 flex items-center
        justify-center w-16 h-16 rounded-full bg-[#F2F2F2] shadow-lg transition-transform
        hover:scale-110">
        <Image
          src="/Picture/WhatsApp.png"
          alt="WhatsApp"
          width={48}
          height={48}
        />
      </a>
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          © 2026 RAIGARD • Product By PokeRaiku
        </div>
      </footer>
    </div>
    
  );
}