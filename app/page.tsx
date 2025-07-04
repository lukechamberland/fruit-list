import List from "./list-components/List";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full">
      <div className="bg-blue-500 h-[10000px] w-full">
        <div className="absolute z-10 bg-gradient-to-r from-[rgba(59, 130, 246, 0.5)] to-[rgba(59, 130, 246, 0.9)] h-full w-full"></div>
        <Image
          src="/background-image.jpg"
          alt="Background"
          fill
          className="object-cover"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />
        <div className="relative z-10 w-full">
          <List />
        </div>
      </div>
    </section>
  );
}
