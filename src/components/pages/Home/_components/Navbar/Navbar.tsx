import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="w-full flex items-center justify-between px-8 py-4 shadow">
    <Link to="/" className="text-xl font-bold">
      WPU Cafe
    </Link>
    <div className="flex gap-4">
      <Link to="/login">
        <Button variant="outline">Login</Button>
      </Link>
      <Link to="/orders">
        <Button variant="outline">Orders</Button>
      </Link>
    </div>
  </nav>
);

export default Navbar;
