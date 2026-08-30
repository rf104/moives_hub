import { useState } from "react";

function StarRating({ movieId, size = "md", onRate }) {
  const [hovered, setHovered] = useState(0);

  const sizes = {
    sm: "text-base gap-0.5",
    md: "text-xl gap-1",
    lg: "text-3xl gap-1.5",
  };

  return (
    <div className={`flex ${sizes[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={(e) => {
            e.stopPropagation();
            onRate(star);
          }}
          className="transition-transform hover:scale-125 focus:outline-none"
          aria-label={`Rate ${star} stars`}
        >
          <span
            className={
              star <= (hovered || 0)
                ? "text-yellow-400"
                : "text-gray-600"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default StarRating;
