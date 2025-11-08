import type { IMenu } from "@/types/order";
import { Button } from "../ui/button";

interface ListMenuProps {
  data: IMenu[];
  filters: string[];
  searchParams: URLSearchParams;
  setSearchParams: (params: Record<string, string>) => void;
  handleAddToCart?: (action: "increment", id: string, name: string) => void;
  className?: string;
  titleClassName?: string;
  filtersClassName?: string;
}

const ListMenu = ({
  data,
  filters,
  searchParams,
  setSearchParams,
  handleAddToCart,
  className,
  titleClassName,
  filtersClassName,
}: ListMenuProps) => {
  return (
    <section className={className ?? "flex-1"}>
      <h2 className={`${titleClassName} text-2xl font-bold mb-4`}>
        Explore Our Best Menu
      </h2>
      <div className={`${filtersClassName} mb-4 flex gap-2`}>
        {/* Category Filters */}
        {filters.map((filter) => (
          <Button
            variant={
              (!searchParams.get("category") && filter === "All") ||
              filter === searchParams.get("category")
                ? "default"
                : "secondary"
            }
            key={filter}
            onClick={() =>
              setSearchParams(filter === "All" ? {} : { category: filter })
            }>
            {filter}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Menu Items */}
        {data?.map((item: IMenu) => (
          <div key={item.id} className="border rounded-lg p-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="h-[200px] w-full object-cover rounded"
            />
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
              <p className="text-primary text-xl font-bold mt-1">
                ${item.price}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() =>
                  handleAddToCart?.("increment", item.id, item.name)
                }
                disabled={!handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListMenu;
