import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { Products } from "@/components/site/products";
import { Features } from "@/components/site/features";
import { Reviews } from "@/components/site/reviews";
import { Pricing } from "@/components/site/pricing";
import { FAQ } from "@/components/site/faq";
import { DownloadCTA } from "@/components/site/download-cta";
import { Footer } from "@/components/site/footer";

type Params = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main" className="flex-grow overflow-x-hidden">
        <Hero />
        {/* <TrustStrip /> */}
        <Products />
        <Features />
        <Reviews />
        {/* <Pricing /> */}
        <FAQ />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
}
