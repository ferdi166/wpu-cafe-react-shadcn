import { Link } from "react-router-dom";
import { Button } from "../button";

const Hero = () => (
  <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 place-items-center gap-12 py-24 px-6">
    {/* Left: Text */}
    <div className="flex flex-col md:items-start self-center order-2 md:order-1">
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
        <Button size="lg" className="w-full md:w-auto">
          Let's Order
        </Button>
      </Link>
    </div>
    {/* Right: Image */}
    <div className="flex justify-center self-center order-1 md:order-2">
      <img
        src="Cooking-cuate.png"
        alt="Food Delivery"
        className="w-80 md:w-[400px] object-contain"
      />
    </div>
  </div>
);

export default Hero;
