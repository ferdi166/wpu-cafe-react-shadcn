import ListMenu from "@/components/ui/ListMenu/ListMenu";
import { useMenusQuery } from "@/hooks/useMenusQuery";
import { useSearchParams } from "react-router-dom";
import { filters } from "../CreateOrder/CreateOrder.constants";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/services/reviews.service";
import type { IReviews } from "@/types/reviews";
import ReviewCard from "@/components/ui/ReviewsCard/ReviewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: menuData, isLoading: isMenuLoading } = useMenusQuery(
    searchParams.get("category") || ""
  );
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
  return (
    <>
      <Navbar />
      {/* <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-2">
        <h1 className="text-4xl font-bold">Welcome To WPU Cafe</h1>
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
      </main> */}
      <Hero />
      <ListMenu
        data={menuData?.data}
        filters={filters}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        className="p-8"
        titleClassName="text-center text-4xl mb-8"
        filtersClassName="justify-center mb-10 flex-wrap"
        isLoading={isMenuLoading}
      />

      <section className="p-6">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-center mb-4">Reviews</h2>
          <p className="text-base text-center text-gray-700 mb-4 text-balance">
            Kami percaya pengalaman terbaik lahir dari pengunjung yang menikmati
            kopi, makanan, dan suasana di kafe kami. Baca pengalaman para
            pelanggan tentang rasa, layanan, dan atmosfer yang membuat kunjungan
            mereka berkesan.
          </p>
        </div>
        <div className="px-12">
          <Carousel className="w-full max-w-5xl mx-auto overflow-visible relative md:px-4">
            <CarouselContent>
              {reviewsData?.data?.map((review: IReviews) => (
                <CarouselItem
                  key={review.id}
                  className="basis-full md:basis-1/3">
                  <ReviewCard
                    id={review.id}
                    reviewer_name={review.reviewer_name}
                    rating={review.rating}
                    comment={review.comment}
                    created_at={review.created_at}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="z-10" />
            <CarouselNext className="z-10" />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Home;
