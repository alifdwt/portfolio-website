import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen bg-black flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Hero Section
        </h1>
        {/* <p className="text-xl text-gray-400">Coming soon...</p> */}
        <Button>Coming soon</Button>
      </div>
    </section>
  );
}
