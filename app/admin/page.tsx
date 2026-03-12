"use client";

import { useEffect, useRef, useState } from "react";
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

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    console.error("Не удалось скопировать адрес");
  }
}

function playNewOrderSound() {
  if (typeof window === "undefined") return;

  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & {
      webkitAudioContext?: typeof AudioContext;
    }).webkitAudioContext;

  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(660, audioContext.currentTime + 0.12);

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.08,
    audioContext.currentTime + 0.02
  );
  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.35
  );

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.35);

  oscillator.onended = () => {
    audioContext.close().catch(() => {});
  };
}

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOrderIds, setNewOrderIds] = useState<string[]>([]);
  const knownOrderIdsRef = useRef<Set<string>>(new Set());
  const hasLoadedInitialOrdersRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      setLoading(true);

      const { data, error } = await supabase
        .from("orders")
        .select(
          "id,status,address,package_label,apartment,entrance,comment,leave_at_door,phone,payment_method,total,created_at"
        )
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("Не удалось загрузить заказы:", error.message);
        setOrders([]);
        setLoading(false);
        return;
      }

      const loadedOrders = (data ?? []) as OrderRow[];
      setOrders(loadedOrders);
      knownOrderIdsRef.current = new Set(loadedOrders.map((order) => order.id));
      hasLoadedInitialOrdersRef.current = true;
      setLoading(false);
    }

    loadOrders();

    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        async (payload) => {
          const id = payload.new.id as string;

          const { data, error } = await supabase
            .from("orders")
            .select(
              "id,status,address,package_label,apartment,entrance,comment,leave_at_door,phone,payment_method,total,created_at"
            )
            .eq("id", id)
            .single();

          if (error || !data) return;

          setOrders((prev) => {
            const exists = prev.some((order) => order.id === data.id);
            if (exists) return prev;
            return [data as OrderRow, ...prev];
          });

          if (
            hasLoadedInitialOrdersRef.current &&
            !knownOrderIdsRef.current.has(id)
          ) {
            knownOrderIdsRef.current.add(id);
            setNewOrderIds((prev) => [id, ...prev]);
            playNewOrderSound();

            window.setTimeout(() => {
              setNewOrderIds((prev) => prev.filter((orderId) => orderId !== id));
            }, 8000);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const updated = payload.new as OrderRow;

          setOrders((prev) =>
            prev.map((order) => (order.id === updated.id ? updated : order))
          );
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  async function changeStatus(id: string, status: OrderStatus) {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Не удалось обновить статус:", error.message);
      return;
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  }

  const newOrders = orders.filter((order) => order.status === "new");

  const activeOrders = orders.filter(
    (order) =>
      order.status === "assigned" ||
      order.status === "on_the_way" ||
      order.status === "arrived"
  );

  const finishedOrders = orders.filter(
    (order) => order.status === "done" || order.status === "cancelled"
  );

  return (
    <main className="min-h-screen bg-[#0f1011] px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-white/40 hover:text-white/70">
          ← Назад
        </Link>

        <div className="mb-8 mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black">Диспетчерская МусорОК</h1>
            <p className="mt-2 text-sm text-white/55">
              Живая панель заказов с realtime-обновлением.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            Всего заказов: <span className="font-bold text-white">{orders.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
            Загружаем заказы...
          </div>
        ) : (
          <>
            <Section
              title="🔥 Новые заказы"
              orders={newOrders}
              changeStatus={changeStatus}
              newOrderIds={newOrderIds}
            />

            <Section
              title="🚚 В работе"
              orders={activeOrders}
              changeStatus={changeStatus}
              newOrderIds={newOrderIds}
            />

            <Section
              title="✅ Завершенные"
              orders={finishedOrders}
              changeStatus={changeStatus}
              newOrderIds={newOrderIds}
            />

            {orders.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
                Заказов пока нет.
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function Section({
  title,
  orders,
  changeStatus,
  newOrderIds,
}: {
  title: string;
  orders: OrderRow[];
  changeStatus: (id: string, status: OrderStatus) => void;
  newOrderIds: string[];
}) {
  if (!orders.length) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="grid gap-4">
        {orders.map((order) => {
          const isNewlyHighlighted = newOrderIds.includes(order.id);

          return (
            <article
              key={order.id}
              className={`rounded-2xl border p-5 transition ${
                isNewlyHighlighted
                  ? "border-emerald-400/50 bg-emerald-400/10 shadow-[0_0_0_1px_rgba(74,222,128,0.25)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-bold">
                    {order.package_label || "Без тарифа"}
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    {order.address || "Адрес не указан"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {isNewlyHighlighted && (
                    <span className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">
                      Новый заказ
                    </span>
                  )}

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {statusLabel(order.status)}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                    {formatDate(order.created_at)}
                  </span>
                </div>
              </div>

              <div className="mb-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-white/40">Телефон</p>
                  <p className="mt-1 font-medium text-white">
                    {formatPhone(order.phone)}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-white/40">К оплате</p>
                  <p className="mt-1 font-medium text-white">
                    {order.total ?? 0} ₽
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-white/40">Квартира / подъезд</p>
                  <p className="mt-1 font-medium text-white">
                    {order.apartment || "—"} / {order.entrance || "—"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-white/40">Оплата</p>
                  <p className="mt-1 font-medium text-white">
                    {order.payment_method || "—"}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid gap-3 text-sm text-white/60 lg:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-white/40">Комментарий</p>
                  <p className="mt-1">{order.comment || "Нет комментария"}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-white/40">Оставить у двери</p>
                  <p className="mt-1">
                    {order.leave_at_door ? "Да" : "Нет"}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {order.phone && (
                  <a
                    href={`tel:${order.phone}`}
                    className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
                  >
                    📞 Позвонить
                  </a>
                )}

                {order.address && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://yandex.ru/maps/?text=${encodeURIComponent(
                      order.address
                    )}`}
                    className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
                  >
                    🗺 Маршрут
                  </a>
                )}

                {order.address && (
                  <button
                    onClick={() => copy(order.address)}
                    className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
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
                className="w-[220px] rounded-lg border border-white/10 bg-[#1b1c1d] px-3 py-2 text-sm text-white outline-none"
              >
                {statusOptions.map((status) => (
                  <option
                    key={status.value}
                    value={status.value}
                    className="bg-[#1b1c1d] text-white"
                  >
                    {status.label}
                  </option>
                ))}
              </select>
            </article>
          );
        })}
      </div>
    </section>
  );
}