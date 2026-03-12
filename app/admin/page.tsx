"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type OrderStatus = "new" | "accepted" | "done" | "cancelled";

type OrderRow = {
  id: string;
  status: OrderStatus | null;
  address: string | null;
  package_id: string | null;
  package_label: string | null;
  package_price: number | null;
  apartment: string | null;
  entrance: string | null;
  comment: string | null;
  leave_at_door: boolean | null;
  phone: string | null;
  should_call: boolean | null;
  payment_method: string | null;
  tip: number | null;
  total: number | null;
  created_at: string | null;
};

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "new", label: "Новый" },
  { value: "accepted", label: "Принят" },
  { value: "done", label: "Выполнен" },
  { value: "cancelled", label: "Отменён" },
];

function formatPhone(value: string | null) {
  if (!value) return "—";

  const digits = value.replace(/\D/g, "");
  if (digits.length < 11) return value;

  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
    7,
    9
  )}-${digits.slice(9, 11)}`;
}

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function statusLabel(status: string | null) {
  switch (status) {
    case "new":
      return "Новый";
    case "accepted":
      return "Принят";
    case "done":
      return "Выполнен";
    case "cancelled":
      return "Отменён";
    default:
      return status || "—";
  }
}

function copyToClipboard(text: string | null) {
  if (!text) return;
  navigator.clipboard.writeText(text);
}

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadOrders() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("orders")
        .select(
          "id,status,address,package_id,package_label,package_price,apartment,entrance,comment,leave_at_door,phone,should_call,payment_method,tip,total,created_at"
        )
        .order("created_at", { ascending: false });

      if (ignore) return;

      if (error) {
        setErrorMessage(
          "Не удалось загрузить заказы. Проверь select policy для таблицы orders."
        );
        setOrders([]);
        setLoading(false);
        return;
      }

      setOrders((data ?? []) as OrderRow[]);
      setLoading(false);
    }

    loadOrders();

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        async (payload) => {
          const orderId = payload.new.id;

          const { data } = await supabase
            .from("orders")
            .select(
              "id,status,address,package_id,package_label,package_price,apartment,entrance,comment,leave_at_door,phone,should_call,payment_method,tip,total,created_at"
            )
            .eq("id", orderId)
            .single();

          if (!data) return;

          setOrders((prev) => [data as OrderRow, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          const updatedOrder = payload.new as OrderRow;

          setOrders((prev) =>
            prev.map((order) =>
              order.id === updatedOrder.id ? updatedOrder : order
            )
          );
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const handleStatusChange = async (
    orderId: string,
    nextStatus: OrderStatus
  ) => {
    setUpdatingOrderId(orderId);
    setErrorMessage("");

    const { error } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", orderId);

    if (error) {
      setErrorMessage(
        "Не удалось обновить статус. Проверь update policy для таблицы orders."
      );
      setUpdatingOrderId(null);
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: nextStatus } : order
      )
    );

    setUpdatingOrderId(null);
  };

  return (
    <main className="min-h-screen bg-[#0f1011] px-6 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm text-white/45 transition hover:text-white/75"
            >
              ← Назад на сайт
            </Link>
            <h1 className="mt-3 text-3xl font-black">Админка заказов</h1>
          </div>

          <div className="w-full sm:w-[220px]">
            <label className="mb-2 block text-sm text-white/55">Статус</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-white/25"
            >
              <option value="all">Все</option>
              <option value="new">Новые</option>
              <option value="accepted">Принятые</option>
              <option value="done">Выполненные</option>
              <option value="cancelled">Отменённые</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-white/60">Загружаем заказы...</div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => {
              const isUpdating = updatingOrderId === order.id;

              return (
                <article
                  key={order.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold">
                      {order.package_label || "Без тарифа"}
                    </h2>

                    <p className="text-white/60">
                      {order.address || "Адрес не указан"}
                    </p>

                    <p className="text-white/60">
                      {formatPhone(order.phone)} • {order.total ?? 0} ₽
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">

                      {order.phone && (
                        <a
                          href={`tel:${order.phone}`}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
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
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
                        >
                          🗺 Маршрут
                        </a>
                      )}

                      {order.address && (
                        <button
                          onClick={() => copyToClipboard(order.address)}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
                        >
                          📋 Копировать
                        </button>
                      )}
                    </div>

                    <div className="mt-4">
                      <select
                        value={order.status ?? "new"}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}