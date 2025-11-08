import ListMenu from "@/components/ui/ListMenu/ListMenu";
import { useMenusQuery } from "@/hooks/useMenusQuery";
import { useSearchParams } from "react-router-dom";
import { filters } from "../CreateOrder/CreateOrder.constants";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useMenusQuery(searchParams.get("category") || "");
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
        data={data?.data}
        filters={filters}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        className="p-8"
        titleClassName="text-center text-4xl mb-8"
        filtersClassName="justify-center mb-10 flex-wrap"
        isLoading={isLoading}
      />
    </>
  );
};

export default Home;
