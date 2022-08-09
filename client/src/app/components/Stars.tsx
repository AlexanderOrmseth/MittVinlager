import { Star, StarHalf } from "phosphor-react";

interface Props {
  stars: number;
  size?: string;
  onClick?: (val: number) => void;
}
const Stars = ({ stars, size, onClick }: Props) => {
  const fullStars = Math.floor(stars / 2); // remove decimal
  const halfStar = !Number.isInteger(stars / 2); // true => half star should be rendered
  const fadedStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="dark:text-wine-300 flex flex-row items-center gap-x-0.5 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={i}
          onClick={() => {
            onClick && onClick((i + 1) * 2);
          }}
          size={size || "1.75rem"}
          weight="duotone"
        />
      ))}
      {halfStar && (
        <StarHalf
          onClick={() => {
            onClick && onClick((fullStars + 1) * 2);
          }}
          size={size || "1.75rem"}
          weight="duotone"
        />
      )}
      {[...Array(fadedStars)].map((_, i) => (
        <Star
          key={i}
          onClick={() => {
            onClick &&
              onClick((halfStar ? 2 + fullStars + i : 1 + fullStars + i) * 2);
          }}
          size={size || "1.75rem"}
          className="text-gray-200 dark:text-gray-600"
          weight="duotone"
        />
      ))}
    </div>
  );
};

export default Stars;
