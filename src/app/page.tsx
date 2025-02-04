import { Features } from "@/components/landing-page/features";
import { Footer } from "@/components/landing-page/footer";
import { Hero } from "@/components/landing-page/hero";
import { NavBar } from "@/components/landing-page/navbar";


export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-principal to-second overflow-x-hidden">
      <NavBar />
      <Hero />
      <Features />
      <Footer />

    </div>
  );
}
