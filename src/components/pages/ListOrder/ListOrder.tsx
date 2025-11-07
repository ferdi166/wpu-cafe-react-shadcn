import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PaginationContent,
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrders, updateOrder } from "@/services/order.service";
import type { IOrder } from "@/types/order";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ListOrder = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", page, pageSize, searchQuery],
    queryFn: () =>
      getOrders({
        page,
        pageSize,
        search: searchQuery,
      }),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <main className="p-6">
        <section className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Order List</h1>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </section>
        <section className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Table Number</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-24" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    );
  }
  if (error) return <p>Error loading orders</p>;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    return navigate("/login");
  };

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(search);
  };

  const handleCompleteOrder = async (id: string) => {
    await updateOrder(id, { status: "COMPLETED" }).then(() => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });
  };

  return (
    // <Layout>
    <main className="p-6">
      <section className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order List</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div className="flex gap-2">
          <Link to="/create-order">
            <Button>Create Order</Button>
          </Link>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>
      <section>
        <ScrollArea className="h-[500px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">No</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Table Number</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((order: IOrder, index: number) => (
                <TableRow key={order.id}>
                  <TableCell className="pl-4">{index + 1}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.table_number}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Link to={`/orders/${order.id}`}>
                      <Button variant="secondary">Detail</Button>
                    </Link>
                    {order.status === "PROCESSING" && (
                      <Button onClick={() => handleCompleteOrder(order.id)}>
                        Completed
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <Pagination className="mt-4 justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                aria-disabled={page === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => {
                  if (data?.data?.length === pageSize) {
                    setPage(page + 1);
                  }
                }}
                aria-disabled={data?.data?.length < pageSize}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
    // </Layout>
  );
};

export default ListOrder;
