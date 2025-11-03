import type { ICart } from "@/types/order";
import { environment } from "@/constants/environment";

export const getOrders = async ({
  page,
  pageSize,
  search,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
}) => {
  let url = `${environment.API_URL}/orders?page=${page}&pageSize=${pageSize}`;

  if (search) {
    url += `&search=${search}`;
  }

  const result = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  }).then((data) => data.json());

  return result;
};

export const getOrderById = async (id: string) => {
  let url = `${environment.API_URL}/orders/${id}`;

  const result = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  }).then((data) => data.json());

  return result;
};

export const createOrder = async (payload: {
  customerName: string;
  tableNumber: number;
  cart: ICart[];
}) => {
  const result = await fetch(`${environment.API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
    body: JSON.stringify(payload),
  });

  return result;
};

export const updateOrder = async (id: string, payload: { status: string }) => {
  const result = await fetch(`${environment.API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
    body: JSON.stringify(payload),
  });

  return result;
};
