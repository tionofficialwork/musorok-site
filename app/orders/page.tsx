"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  async function loadOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setOrders(data);
  }

  async function takeOrder(id: string) {
    await supabase
      .from("orders")
      .update({ status: "taken" })
      .eq("id", id);

    loadOrders();
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1011] text-white p-8">
      <h1 className="text-3xl font-black mb-8">Заказы</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-lg font-bold">{order.address}</p>

            <p className="text-white/60 mt-2">
              {order.package_label}
            </p>

            <p className="mt-2">
              {order.total} ₽
            </p>

            {order.status === "new" && (
              <button
                onClick={() => takeOrder(order.id)}
                className="mt-4 bg-white text-black px-4 py-2 rounded-xl font-bold"
              >
                Взять заказ
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}