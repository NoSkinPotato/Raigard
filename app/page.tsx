
import "./homePage.css"
import Image from "next/image";
import { client } from "@/src/lib/sanity";
import ProductCard from "../Components/productCard";
import Carousel from "../Components/Carousel"; 
import Navbar from "../Components/NavigationBar"; 
import { ArrowRight } from "lucide-react";
import FadeIn from "@/Components/FadeIn";

export const revalidate = 60;


export default async function Home() {

  

    const products = await client.fetch(`
    *[_type == "product"]{
      _id,
      name,
      price,
      sequence,
      description,
      image,
      colorGradient
    } | order(sequence asc)
  `);

  const carousels = await client.fetch(`
    *[_type == "carousel"]{
      _id,
      Number,
      image,
    } | order(Number asc)
  `);

  const marketplaces = [
    { name: "Tokopedia", 
      link: "https://tk.tokopedia.com/ZSQJbGo78/", 
      image: "/Picture/Tokopedia.png",
      accent: "text-green-600",
      bg: "bg-green-50"},
    { name: "Shopee", 
      link: "https://s.shopee.co.id/1VwYYMkszt?share_channel_code=1", 
      image: "/Picture/Shopee.png",
      accent: "text-orange-500",
      bg: "bg-orange-50" },
    { name: "Tiktok", 
      link: "https://tk.tokopedia.com/ZSQJbGo78/", 
      image: "/Picture/TikTok.png",
      accent: "text-black",
      bg: "bg-gray-50" },
  ];
  
  return (
    
    <div className="min-h-screen flex flex-col bg-white">
      <section id="home" className="Header" >
        <Image className="HeaderLogo"
          src="/Picture/Raigard.png"
          alt="Store Logo"
          width={200}
          height={20}
        />
      </section>
      <p className="text-center text-sm Tagline1">
          AFFORDABLE LUXURY & PROTECTION FOR YOUR SLAB
        </p>
      <Navbar></Navbar>
      <div>
        
        {/* <p className="text-center TaglineDescr">
          Premium quality slab covers with seamless colors <br></br> and lasting protection for every surface
        </p> */}
      </div>
      
      <Carousel carousels={carousels} />
      <section id="catalog" className="rounded-[30px] mx-5 mt-5 text-center bg-black CatalogSection">
         <h2 className="text-4xl md:text-5xl pt-5 font-bold text-white">
          CATALOGS
        </h2>

        <div className="flex items-center justify-center gap-3 mt-4 pr-15 pl-15">
          <div className="h-px w-full bg-white" />
          <div className="w-5 h-2.5 rounded-full bg-white" />
          <div className="h-px w-full bg-white" />
        </div>

        <p className="mt-3 mb-3 text-white text-lg">
          Click Each Color To View Details
        </p>
      </section> 
      
      <main className="mt-6 MainSection">
        <div className="mx-auto w-full flex-1 max-w-[900px]">
          <FadeIn>
          <div className="flex flex-wrap justify-center gap-3">
            {products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
          </FadeIn>
        </div>
      </main>
      
      {/* <section id="story" className="rounded-[30px] mx-15 mt-5 text-center bg-[url('/Picture/WhiteTexture.jpg')] border-5 border-black/15 CatalogSection">
        <div className="py-7">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            OUR STORY
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 pr-15 pl-15">
            <div className="h-1 rounded-[5px] w-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="h-1 rounded-[5px] w-full bg-black" />
          </div>
          <p className="pt-1 text-black text-lg mt-2">
            Get To Know RAIGARD
          </p>
        </div>
      </section> 
      <section id="marketplace" className="rounded-[30px] mx-15 mt-5 text-center bg-white border-5 border-black CatalogSection">
        <div className="py-7">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            MARKETPLACE
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 pr-15 pl-15">
            <div className="h-1 rounded-[5px] w-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="w-5 h-2.5 rounded-full bg-black" />
            <div className="h-1 rounded-[5px] w-full bg-black" />
          </div>
          <p className="pt-1 text-black text-lg mt-2">
            Visit Our Official Stores
          </p>
        </div>
      </section>  */}
      <FadeIn>
        <section id="story" className="rounded-[30px] mx-5 mt-5 text-center bg-white ring-5 ring-black ring-inset CatalogSection">
          <div className="py-7">
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              OUR STORY
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4 pr-15 pl-15">
              <div className="h-1 rounded-[5px] w-full bg-black" />
              <div className="w-5 h-2.5 rounded-full bg-black" />
              <div className="w-5 h-2.5 rounded-full bg-black" />
              <div className="h-1 rounded-[5px] w-full bg-black" />
            </div>
            <p className="pt-1 text-black text-lg mt-2">
              Get To Know RAIGARD
            </p>
          </div>
        </section> 
      </FadeIn>
      <FadeIn>
        <h3 className="py-10 mx-12 md:mx-20 lg:mx-40 text-center Story">
          RAIGARD was created to challenge the idea that premium collector accessories must come at premium prices.
          Inspired by the passion of collectors, we set out to create slab protection that delivers both luxury aesthetics and reliable protection without compromising affordability.
          <br/><br/>Today, RAIGARD offers 20 distinctive colorways designed to help collectors express their style while keeping their slabs protected.
          <br/><br/>This is only the beginning. <br/><br/>As we continue to grow, our goal remains the same: to make premium collecting more accessible and to build Indonesia’s leading ecosystem for collector accessories.
        </h3>
        <h1 className="py-5 mx-12 md:mx-20 lg:mx-60 text-[1.75rem] text-center StoryLast">
          RAIGARD, Affordable Luxury & Protection for Your Slabs.
        </h1>
      </FadeIn>

      <FadeIn>
      <section id="marketplace" className="rounded-[30px] mx-5 my-5 text-center bg-black CatalogSection">
        <div className="py-7">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            MARKETPLACE
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 pr-15 pl-15">
            <div className="h-1 rounded-[5px] w-full bg-white" />
            <div className="w-5 h-2.5 rounded-full bg-white" />
            <div className="w-5 h-2.5 rounded-full bg-white" />
            <div className="w-5 h-2.5 rounded-full bg-white" />
            <div className="h-1 rounded-[5px] w-full bg-white" />
          </div>
          <p className="pt-1 text-white text-lg mt-2">
            Visit Our Official Stores
          </p>
        </div>
      </section>  
      </FadeIn>
      <FadeIn>
       <div className="grid md:grid-cols-3 gap-8 my-10 px-15 mx-auto w-full flex-1 max-w-[1000px]">
          {marketplaces.map((store) => (
            <div
              key={store.name}
              className="overflow-hidden rounded-3xl border border-gray-200  shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="p-10 text-center">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-24 h-24 mx-auto object-contain"
                />

                <h3 className={`mt-6 text-3xl font-semibold ${store.accent}`}>
                  {store.name}
                </h3>

                {/* <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-6 h-px bg-black" />
                  <div className="w-2 h-2 rounded-full bg-[#B89B5E]" />
                  <div className="w-6 h-px bg-[#B89B5E]" />
                </div> */}
              </div>

              <a
                href={store.link}
                className={`group flex items-center justify-center gap-3 py-6 text-xl font-semibold border-t ${store.accent} ${store.bg} `}
              >
                <span>Visit Store</span>

                <ArrowRight
                  className="
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:translate-x-2
                  "
                  size={22}
                />
              </a>
            </div>
          ))}
        </div>
        </FadeIn>
      <a
        href="https://wa.me/6281282036413?text=Hi RAIGARD, mau order dong"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 flex items-center
        justify-center 
        bottom-[3vh]
        right-[3vw]
        w-[clamp(5rem,6vw,10rem)]
        h-[clamp(5rem,6vw,10rem)]
        transition-transform
        hover:scale-110">
        <Image
          src="/Picture/WhatsApp.png"
          alt="WhatsApp"
          width={200}
          height={200}
          className="
          w-full
          h-full"
        />
      </a>
      <footer className="border-t py-10 bg-black">
        <div className="mx-auto max-w-7xl px-6 text-center text-md text-gray-500">
          © 2026 RAIGARD • LUXURY & PROTECTION FOR YOUR SLAB
        </div>
      </footer>
    </div>
    
  );
}