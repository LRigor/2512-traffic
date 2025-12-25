import Image from "next/image";
import StarRating from "@/components/StarRating";

export default function Banner() {
  return (
    <div
      className="text-center py-16 px-4"
      style={{ backgroundColor: "#1A132A" }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Explore the World&apos;s Top AI Tools List
      </h1>
      <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
        Discover and compare over <strong>10,000</strong> Top AI Tools, curated
        and ranked by our community of <strong>3M</strong> monthly visitors
      </p>

      {/* Rating Section with Laurel Wreath */}
      <div className="flex items-center justify-center gap-3 mb-4 relative">
        {/* Left half of laurel wreath */}
        <Image
          src="/laurel-wreath.svg"
          alt="Laurel wreath"
          width={60}
          height={100}
          className="w-12 h-20 flex-shrink-0"
          style={{
            transform: "scaleX(-1) rotate(-12deg)",
          }}
        />

        <div className="flex flex-col text-white px-2 gap-y-4">
          <div className="text-sm md:text-base whitespace-nowrap">
            Voted 4.2/5 by 30,000+ conversations
          </div>

          {/* Five Gold Stars */}
          <div className="flex items-center justify-center">
            <StarRating rating={5} />
          </div>
        </div>

        {/* Right half of laurel wreath */}
        <Image
          src="/laurel-wreath.svg"
          alt="Laurel wreath"
          width={60}
          height={100}
          className="w-12 h-20 flex-shrink-0"
          style={{
            transform: "rotate(12deg)",
          }}
        />
      </div>
    </div>
  );
}
