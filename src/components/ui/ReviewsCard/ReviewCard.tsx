import type { IReviews } from "@/types/reviews";

const ReviewCard = ({
  reviewer_name,
  rating,
  comment,
  created_at,
}: IReviews) => {
  return (
    <div className="border rounded-xl p-6 w-full max-w-lg mx-auto">
      <div className="flex items-start flex-col md:flex-row md:justify-between md:items-center mb-2">
        <div className="flex gap-1 text-yellow-400 text-xl">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <span className="text-gray-400 text-sm">
          {new Date(created_at).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <p className="text-gray-700 mb-6 text-balance">{comment}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">
          {reviewer_name[0]}
        </div>
        <div>
          <div className="font-bold text-base md:text-lg">{reviewer_name}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
