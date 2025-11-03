import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-2">
      <h1 className="text-4xl font-bold">Welcome To WPU Cafe</h1>
      <Link to={"/login"}>
        <Button>Login</Button>
      </Link>
    </main>
  );
};

export default Home;
