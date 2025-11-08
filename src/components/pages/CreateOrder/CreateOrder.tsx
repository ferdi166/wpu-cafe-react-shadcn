import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { filters, tables } from "./CreateOrder.constants";
import { Button } from "@/components/ui/button";
import type { ICart } from "@/types/order";
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
import ListMenu from "@/components/ListMenu/ListMenu";
import { useMenusQuery } from "@/hooks/useMenusQuery";

const CreateOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useMenusQuery(searchParams.get("category") || "");
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
      <ListMenu
        data={data?.data}
        filters={filters}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleAddToCart={handleAddToCart}
        isLoading={isLoading}
      />

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
