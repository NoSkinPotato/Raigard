

import "./homePage.css"
import Image from "next/image";
import { client } from "@/src/lib/sanity";
import ProductCard from "../Components/productCard";
import Carousel from "../Components/Carousel"; 
import Navbar from "../Components/NavigationBar"; 
import { ArrowRight } from "lucide-react";
import FadeIn from "@/Components/FadeIn";
import { Any } from "@sanity/client/csm";
import { urlFor } from "../src/lib/image";
import ReviewsCarousel from "@/Components/ReviewsCarousel";

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

  const marketplace = await client.fetch(`
    *[_type == "social"]{
      _id,
      name,
      link,
      logo,
      color
    } | order(sequence asc)
    `);

  const reviews = await client.fetch(`
    *[_type == "Review"]{
      _id,
      Username,
      RatingValue,
      ReviewNote
    } `
  );

  const appSetting = await client.fetch(`
    *[_type == "appsSetting"]{
      _id,
      phoneNumber,
      whatsAppFirstText
    } 
    `);

    const setting = appSetting[0]

    let whatsAppLink = "https://wa.me/" + setting.phoneNumber + "?text=" + setting.whatsAppFirstText;
  
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
      <p className="text-center Tagline1">
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
          <br/><br/>Today, RAIGARD offers 24 distinctive colorways designed to help collectors express their style while keeping their slabs protected.
          <br/><br/>This is only the beginning. <br/><br/>As we continue to grow, our goal remains the same: to make premium collecting more accessible and to build Indonesia’s leading ecosystem for collector accessories.
        </h3>
        <h1 className="py-5 mx-12 md:mx-20 lg:mx-60 text-center StoryLast">
          RAIGARD
          <br/>Affordable Luxury & Protection for Your Slabs.
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
       <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-10 align-center mx-5 md:mx-10 sm:mx-10">
          {marketplace.map((store: Any) => (
            <div
              key={store.name}
              className="relative rounded-3xl border border-gray-200  shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="p-5 text-center justify-center w-full">
                <img
                  src={urlFor(store.logo).width(600).url()}
                  alt={store.name}
                  className="w-24 h-24 mx-auto object-contain"
                />

                <h3 className={`mt-6 font-semibold StoreName`}
                style={{
                  color: (store.color.hex)
                }}>
                  {store.name}
                </h3>
              </div>

              <a
                href={store.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-center gap-3 py-6 text-xl font-semibold border-t  `}
                style={{
                  color: (store.color.hex),
                  background: `${store.color.hex}15`
                }}>
                <h3 className="StoreName">Visit Store</h3>

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
        {/* <FadeIn>
          <section id="reviews" className="bg-white px-6 py-10 md:px-12">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto mb-12 max-w-2xl rounded-[40px] border-black px-4 py-4 text-center md:border-2 md:px-12 md:py-6">
                <h2 className="text-xl font-bold text-black md:text-2xl">Reviews</h2>

                <div className="my-3 flex justify-center gap-1.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-black" />
                  ))}
                </div>
                
                <hr className="mb-3 border-black/20" />
                
                <p className="text-sm font-bold uppercase tracking-wide text-black md:text-base">
                  What Collectors Are Saying
                </p>
              </div>
                
              <ReviewsCarousel reviews={reviews} />
            </div>
          </section>
        </FadeIn> */}
      <a
        href={whatsAppLink}
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
        <div className="mx-auto max-w-7xl px-6 text-center text-md text-gray-500 Footer">
          © 2026 RAIGARD • AFFORDABLE LUXURY & PROTECTION FOR YOUR SLAB
          <br />
          Jakarta, Indonesia
        </div>
      </footer>
    </div>
    
  );
}