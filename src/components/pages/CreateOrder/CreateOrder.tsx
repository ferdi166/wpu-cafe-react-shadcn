import { getMenus } from "@/services/menu.service";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { filters, tables } from "./CreateOrder.constants";
import { Button } from "@/components/ui/button";
import type { ICart, IMenu } from "@/types/order";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, type FormEvent } from "react";
import { createOrder } from "@/services/order.service";

const CreateOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: ["menus", searchParams.get("category")],
    queryFn: () => getMenus(searchParams.get("category") as string),
  });
  const [carts, setCarts] = useState<ICart[]>([]);
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();

  //   console.log("data:", data);

  const handleAddToCart = (type: string, id: string, name: string) => {
    const itemIsInCart = carts.find((item: ICart) => item.menuItemId === id);
    if (type === "increment") {
      if (itemIsInCart) {
        setCarts(
          carts.map((item: ICart) =>
            item.menuItemId === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCarts([...carts, { menuItemId: id, name, quantity: 1 }]);
      }
    } else {
      if (itemIsInCart && itemIsInCart.quantity <= 1) {
        setCarts(carts.filter((item: ICart) => item.menuItemId !== id));
      } else {
        setCarts(
          carts.map((item: ICart) =>
            item.menuItemId === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    }
  };

  const handleOrder = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      customerName: form.customerName.value,
      tableNumber: Number(tableNumber),
      cart: carts.map((item: ICart) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        notes: "",
      })),
    };
    await createOrder(payload);
    return navigate("/orders");
  };

  return (
    <main className="flex gap-8 p-8">
      {/* Menu Section */}
      <section className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Explore Our Best Menu</h2>
        <div className="mb-4 flex gap-2">
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
          {data?.data?.map((item: IMenu) => (
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
                    handleAddToCart("increment", item.id, item.name)
                  }>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Form Section */}
      <form onSubmit={handleOrder}>
        <div className="w-96 border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
          <div className="mb-4">
            <Label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="customerName"
              className="border rounded-lg w-full p-2"
            />
          </div>
          <div className="mb-4">
            <Select
              name="tableNumber"
              value={tableNumber}
              onValueChange={setTableNumber}
              required>
              <SelectTrigger>
                <SelectValue placeholder="Table Number" />
              </SelectTrigger>
              <SelectContent>
                {tables.map((table) => {
                  const value =
                    typeof table === "object" && table !== null
                      ? (table as { value: string }).value
                      : String(table);
                  const label =
                    typeof table === "object" && table !== null
                      ? (table as { label: string }).label
                      : String(table);
                  return (
                    <SelectItem key={String(value)} value={String(value)}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Link to={"/orders"}>
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit">Submit Order</Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        </div>
        <div>
          {/* Order summary details will go here */}
          {carts.length > 0 ? (
            <div>
              {carts?.map((item: ICart) => (
                <div
                  key={item.menuItemId}
                  className="flex justify-between py-2 border-b">
                  <h4>{item.name}</h4>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={() =>
                        handleAddToCart(
                          "decrement",
                          `${item.menuItemId}`,
                          `${item.name}`
                        )
                      }
                      variant="secondary"
                      size="sm">
                      -
                    </Button>
                    <div className="px-2">{item.quantity}</div>
                    <Button
                      type="button"
                      onClick={() =>
                        handleAddToCart(
                          "increment",
                          `${item.menuItemId}`,
                          `${item.name}`
                        )
                      }
                      variant="secondary"
                      size="sm">
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h4>No items in cart</h4>
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateOrder;
