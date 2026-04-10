import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export interface ArticleCardProps {
  slug: string;
  image: StaticImageData | string;
  author: {
    name: string;
    avatar: StaticImageData | string;
  };
  date: string;
  readTime: string;
  title: string;
  category?: string;
}

const ArticleCard = ({
  slug,
  image,
  author,
  date,
  readTime,
  title,
}: ArticleCardProps) => {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-400 ease-in cursor-pointer block"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-400"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{author.name}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{date}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">
          {title}
        </h3>

        <span className="text-primary font-medium text-sm hover:underline">
          See More
        </span>
      </div>
    </Link>
  );
};

export default ArticleCard;
