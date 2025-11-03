import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderById } from "@/services/order.service";
import type { ICart } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const DetailOrder = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id as string),
  });

  if (isLoading) {
    return (
      <main className="p-6">
        <section className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Detail Order</h1>
          <Skeleton className="h-10 w-24" />
        </section>
        <section className="grid grid-cols-2 gap-6 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Menu</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-10 inline-block mr-2" />
                    <Skeleton className="h-4 w-24 inline-block" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    );
  }

  return (
    <main className="p-6">
      <section className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Detail Order</h1>
        <Link to="/orders">
          <Button>Back</Button>
        </Link>
      </section>
      <section className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Order ID:</p>
          <h4 className="font-semibold">{data?.id}</h4>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Customer Name:</p>
          <h4 className="font-semibold">{data?.customer_name}</h4>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Table:</p>
          <h4 className="font-semibold">{data?.table_number}</h4>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status:</p>
          <h4 className="font-semibold">{data?.status}</h4>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total:</p>
          <h4 className="font-semibold">{data?.total}</h4>
        </div>
      </section>
      <section>
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Menu</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.cart?.map((item: ICart) => (
                <TableRow key={item.menuItemId}>
                  <TableCell className="flex items-center gap-2">
                    <img
                      src={item?.menuItem?.image_url}
                      alt={item?.menuItem?.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span>{item?.menuItem?.name}</span>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item?.menuItem?.price}</TableCell>
                  <TableCell>
                    ${parseInt(`${item?.menuItem?.price}`) * item?.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default DetailOrder;
