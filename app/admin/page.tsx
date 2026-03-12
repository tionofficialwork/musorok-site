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
        (payload) => {
          const newOrder = payload.new as OrderRow;

          setOrders((prev) => [newOrder, ...prev]);
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
            <p className="mt-2 text-sm text-white/55">
              Простая MVP-страница для просмотра и обновления заявок из таблицы
              orders.
            </p>
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

        <div className="mb-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50">Всего заказов</p>
            <p className="mt-2 text-3xl font-black">{orders.length}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50">Новых</p>
            <p className="mt-2 text-3xl font-black">
              {orders.filter((order) => order.status === "new").length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50">После фильтра</p>
            <p className="mt-2 text-3xl font-black">{filteredOrders.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60">
            Загружаем заказы...
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
            {errorMessage}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60">
            Заказов пока нет.
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => {
              const isUpdating = updatingOrderId === order.id;

              return (
                <article
                  key={order.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                        Заказ
                      </p>
                      <h2 className="mt-2 text-lg font-bold">
                        {order.package_label || "Без тарифа"}
                      </h2>
                      <p className="mt-1 text-sm text-white/55">
                        {order.address || "Адрес не указан"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {statusLabel(order.status)}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-white/40">Телефон</p>
                      <p className="mt-1 font-medium text-white">
                        {formatPhone(order.phone)}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-white/40">К оплате</p>
                      <p className="mt-1 font-medium text-white">
                        {order.total ?? 0} ₽
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-white/40">
                        Квартира / подъезд
                      </p>
                      <p className="mt-1 font-medium text-white">
                        {order.apartment || "—"} / {order.entrance || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-white/40">Оплата</p>
                      <p className="mt-1 font-medium text-white">
                        {order.payment_method || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-white/60 lg:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-white/40">Комментарий</p>
                      <p className="mt-1">{order.comment || "Нет комментария"}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-white/40">Оставить у двери</p>
                      <p className="mt-1">
                        {order.leave_at_door ? "Да" : "Нет"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-white/40">Нужно позвонить</p>
                      <p className="mt-1">
                        {order.should_call ? "Да" : "Нет"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xs text-white/40">Изменить статус</p>
                        <p className="mt-1 text-sm text-white/55">
                          Для MVP можно управлять заказом прямо из админки.
                        </p>
                      </div>

                      <div className="w-full sm:w-[220px]">
                        <select
                          value={order.status ?? "new"}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value as OrderStatus
                            )
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-white/25 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
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