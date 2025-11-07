import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar";

const Home = () => {
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
    </>
  );
};

export default Home;
