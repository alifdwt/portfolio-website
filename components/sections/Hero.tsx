import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section id="home" className="flex min-h-screen items-center bg-black">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
          Hero Section
        </h1>
        {/* <p className="text-xl text-gray-400">Coming soon...</p> */}
        <Button>Coming soon</Button>
      </div>
    </section>
  );
}
