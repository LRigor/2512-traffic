import Image from 'next/image';
import Link from 'next/link';
import homeData from '@/data/home.json';

const Featured = () => {
  const { featured } = homeData;

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
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
                    <h4 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h4>
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
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(item.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Votes */}
                <div className="flex items-center gap-1 text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5">
                  <Image
                    alt="Upvote"
                    src="/up-arrow-blank.svg"
                    width={16}
                    height={16}
                    loading="lazy"
                  />
                  <span className="text-sm font-medium">{item.votes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
