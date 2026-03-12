"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type OrderStatus =
  | "new"
  | "assigned"
  | "on_the_way"
  | "arrived"
  | "done"
  | "cancelled";

type OrderRow = {
  id: string;
  status: OrderStatus | null;
  address: string | null;
  package_label: string | null;
  apartment: string | null;
  entrance: string | null;
  comment: string | null;
  leave_at_door: boolean | null;
  phone: string | null;
  payment_method: string | null;
  total: number | null;
  created_at: string | null;
};

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "new", label: "Новый" },
  { value: "assigned", label: "Назначен" },
  { value: "on_the_way", label: "В пути" },
  { value: "arrived", label: "На месте" },
  { value: "done", label: "Выполнен" },
  { value: "cancelled", label: "Отменён" },
];

function formatPhone(value: string | null) {
  if (!value) return "—";

  const digits = value.replace(/\D/g, "");

  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
    7,
    9
  )}-${digits.slice(9, 11)}`;
}

function statusLabel(status: string | null) {
  switch (status) {
    case "new":
      return "Новый";
    case "assigned":
      return "Назначен";
    case "on_the_way":
      return "В пути";
    case "arrived":
      return "На месте";
    case "done":
      return "Выполнен";
    case "cancelled":
      return "Отменён";
    default:
      return status || "—";
  }
}

async function copy(text: string | null) {
  if (!text) return;
  await navigator.clipboard.writeText(text);
}

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    loadOrders();

    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        async (payload) => {
          const id = payload.new.id;

          const { data } = await supabase
            .from("orders")
            .select("*")
            .eq("id", id)
            .single();

          if (!data) return;

          setOrders((prev) => [data as OrderRow, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const updated = payload.new as OrderRow;

          setOrders((prev) =>
            prev.map((o) => (o.id === updated.id ? updated : o))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders((data ?? []) as OrderRow[]);
  }

  async function changeStatus(id: string, status: OrderStatus) {
    await supabase.from("orders").update({ status }).eq("id", id);

    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }

  const newOrders = orders.filter((o) => o.status === "new");

  const activeOrders = orders.filter(
    (o) =>
      o.status === "assigned" ||
      o.status === "on_the_way" ||
      o.status === "arrived"
  );

  const finishedOrders = orders.filter(
    (o) => o.status === "done" || o.status === "cancelled"
  );

  return (
    <main className="min-h-screen bg-[#0f1011] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">

        <Link href="/" className="text-sm text-white/40 hover:text-white/70">
          ← Назад
        </Link>

        <h1 className="text-3xl font-black mt-4 mb-8">
          Диспетчерская МусорОК
        </h1>

        <Section title="🔥 Новые заказы" orders={newOrders} changeStatus={changeStatus} />

        <Section title="🚚 В работе" orders={activeOrders} changeStatus={changeStatus} />

        <Section title="✅ Завершенные" orders={finishedOrders} changeStatus={changeStatus} />

      </div>
    </main>
  );
}

function Section({
  title,
  orders,
  changeStatus,
}: {
  title: string;
  orders: OrderRow[];
  changeStatus: (id: string, status: OrderStatus) => void;
}) {
  if (!orders.length) return null;

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="grid gap-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >
            <div className="flex justify-between mb-3">

              <div>
                <p className="font-bold">{order.package_label}</p>
                <p className="text-white/60 text-sm">{order.address}</p>
              </div>

              <span className="text-xs text-white/50">
                {statusLabel(order.status)}
              </span>

            </div>

            <div className="text-sm text-white/70 mb-4">
              {formatPhone(order.phone)} • {order.total} ₽
            </div>

            <div className="flex flex-wrap gap-2 mb-4">

              {order.phone && (
                <a
                  href={`tel:${order.phone}`}
                  className="px-3 py-2 text-xs rounded-lg bg-white/10 hover:bg-white/20"
                >
                  📞 Позвонить
                </a>
              )}

              {order.address && (
                <a
                  target="_blank"
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(
                    order.address
                  )}`}
                  className="px-3 py-2 text-xs rounded-lg bg-white/10 hover:bg-white/20"
                >
                  🗺 Маршрут
                </a>
              )}

              {order.address && (
                <button
                  onClick={() => copy(order.address)}
                  className="px-3 py-2 text-xs rounded-lg bg-white/10 hover:bg-white/20"
                >
                  📋 Копировать
                </button>
              )}

            </div>

            <select
              value={order.status ?? "new"}
              onChange={(e) =>
                changeStatus(order.id, e.target.value as OrderStatus)
              }
              className="bg-[#1b1c1d] border border-white/10 rounded-lg px-3 py-2 text-sm w-[200px]"
            >
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#1b1c1d]">
                  {s.label}
                </option>
              ))}
            </select>

          </article>
        ))}
      </div>
    </div>
  );
}