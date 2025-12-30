import Image from 'next/image';
import Link from 'next/link';
import homeData from '@/data/home.json';
import StarRating from "@/components/StarRating";

const Featured = () => {
  const { featured } = homeData;

  return (
    <section className="bg-white  px-6 -mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {featured.title}
        </h2>

        {/* Grid - responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featured.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg aspect-square object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <span className="flex-shrink-0 text-xs font-medium text-[#e94560] border border-[#e94560] rounded px-2 py-0.5">
                      Featured
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer: Stars & Votes */}
              <div className="flex items-center justify-between mt-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  <StarRating rating={item.rating ?? 0} />
                </div>

                {/* Votes */}
                <button className="flex items-center gap-1 text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                 <Image
                    src="/up-arrow-blank.svg"
                    alt="Upvote"
                    width={16}
                    height={16}
                  />
                  <span className="text-sm font-medium">{item.votes}</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
