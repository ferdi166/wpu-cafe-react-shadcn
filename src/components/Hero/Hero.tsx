import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => (
  <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-12 py-16 px-6">
    {/* Left: Text */}
    <div className="md:w-1/2 flex flex-col md:items-start">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        Hungry? You're
        <br />
        in the right place
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Discover your favorite menu and enjoy the best culinary experience with
        us. Order food easily, quickly, and safely from your chosen restaurant!
      </p>
      <Link to="/login">
        <Button size={"lg"} className="w-full">
          Let's Order
        </Button>
      </Link>
    </div>
    {/* Right: Image */}
    <div className="md:w-1/2 flex justify-center">
      <img
        src="Cooking-cuate.png"
        alt="Food Delivery"
        className="w-80 md:w-[400px] object-contain"
      />
    </div>
  </div>
);

export default Hero;
