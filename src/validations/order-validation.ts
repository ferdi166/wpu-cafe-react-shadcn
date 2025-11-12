import z from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(1, "Customer Name is required"),
  tableNumber: z.number(),
  cart: z.array(
    z.object({
      menuItemId: z.string(),
      quantity: z.number(),
      notes: z.string(),
    })
  ),
});

export type CreateOrderForm = z.infer<typeof orderSchema>;
