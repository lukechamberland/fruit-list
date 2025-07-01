import List from "./list-components/List";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative w-full">
      <div className="absolute z-10 bg-gradient-to-r from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.9)] h-full w-full"></div>
      <Image
        src="/background-image.jpg"
        alt="Background"
        fill
        className="object-cover blur-md"
      />
      <div className="relative z-10 w-full">
        <List />
      </div>
    </section>
  );
}
