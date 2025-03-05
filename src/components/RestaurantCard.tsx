'use client';

import { Restaurant } from '@prisma/client';
import { useMemo, useState } from 'react';
import { trpc } from '~/utils/trpc';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

type Featured = { icon: string; text: string };

const PLACEHOLDER_IMAGE =
  'https://flowbite.com/docs/images/carousel/carousel-1.svg';

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const utils = trpc.useUtils();

  const featured = useMemo(
    () => restaurant.featured as Featured,
    [restaurant.featured],
  );

  const addFavorite = trpc.restaurant.addFavorite.useMutation({
    onSuccess: () => {
      utils.restaurant.getRestaurants.invalidate();
    },
  });

  const toggleFavorite = () => {
    addFavorite.mutate({
      id: restaurant.id,
      isFavorite: !restaurant.isFavorite,
    });
  };

  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden ">
      <div className="relative bg-gray-200 rounded-2xl">
        {/* <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        /> */}
        <Image
          src={
            imageLoaded && restaurant.images && restaurant.images.length > 0
              ? restaurant.images[0]
              : PLACEHOLDER_IMAGE
          }
          width={358}
          height={200}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-2xl"
          onError={handleImageError}
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/70"
        >
          {restaurant.isFavorite ? (
            <HeartFilledIcon className="w-6 h-6 backdrop-blur-lg text-red-500" />
          ) : (
            <HeartOutlineIcon className="w-6 h-6 backdrop-blur-lg text-gray-600" />
          )}
        </button>
      </div>

      <div className="py-3">
        {featured && (
          <div className="flex gap-[2px] items-center">
            {featured?.icon === 'stars-02' && <StarsIcon />}
            <span
              className="line-clamp-1 text-center text-xs text-orange-500
"
            >
              {featured?.text}
            </span>
          </div>
        )}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-[#344054] line-clamp-1">
            {restaurant.name}
          </h3>
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm">
              {restaurant.rating || '-'}({restaurant.rating_count || 0})
            </span>
          </div>
        </div>
        <p className="text-sm font-normal text-gray-900 line-clamp-1">
          {restaurant.desc}
        </p>
        <div className="font-normal text-sm leading-5 text-[#475467]">
          {[restaurant.category, restaurant.city, restaurant.price_range]
            .filter((e) => Boolean(e.trim()))
            .join(' · ')}
        </div>
      </div>
    </div>
  );
}

// SVG Icons
function HeartFilledIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function HeartOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4259 2.5C16.3611 2.5 18.3334 5.29375 18.3334 7.9C18.3334 13.1781 10.1482 17.5 10 17.5C9.85187 17.5 1.66669 13.1781 1.66669 7.9C1.66669 5.29375 3.63891 2.5 6.5741 2.5C8.25928 2.5 9.36113 3.35312 10 4.10312C10.6389 3.35312 11.7408 2.5 13.4259 2.5Z"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

import Image from 'next/image';

const StarsIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_0_11059)">
      <path
        d="M2.25 11V8.5M2.25 3.5V1M1 2.25H3.5M1 9.75H3.5M6.5 1.5L5.63291 3.75443C5.49191 4.12105 5.4214 4.30435 5.31177 4.45854C5.21459 4.5952 5.0952 4.71459 4.95854 4.81176C4.80435 4.9214 4.62105 4.99191 4.25443 5.13291L2 6L4.25443 6.86709C4.62105 7.00809 4.80435 7.0786 4.95854 7.18823C5.0952 7.28541 5.21459 7.4048 5.31177 7.54146C5.4214 7.69565 5.49191 7.87895 5.63291 8.24557L6.5 10.5L7.36709 8.24557C7.5081 7.87895 7.5786 7.69565 7.68824 7.54146C7.78541 7.4048 7.9048 7.28541 8.04146 7.18823C8.19565 7.0786 8.37895 7.00809 8.74557 6.86709L11 6L8.74557 5.13291C8.37895 4.99191 8.19565 4.9214 8.04146 4.81176C7.9048 4.71459 7.78541 4.5952 7.68824 4.45854C7.5786 4.30435 7.50809 4.12105 7.36709 3.75443L6.5 1.5Z"
        stroke="#FF692E"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_0_11059">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
