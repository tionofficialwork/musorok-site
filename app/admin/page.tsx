"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type OrderStatus =
  | "new"
  | "assigned"
  | "on_the_way"
  | "arrived"
  | "done"
  | "cancelled";

type RealtimeStatus = "connecting" | "online" | "offline";

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

const statusPriority: Record<OrderStatus, number> = {
  new: 0,
  assigned: 1,
  on_the_way: 2,
  arrived: 3,
  done: 4,
  cancelled: 5,
};

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

function formatTime(value: Date | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("ru-RU", {
    timeStyle: "medium",
  }).format(value);
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

function statusBadgeClass(status: string | null) {
  switch (status) {
    case "new":
      return "border-sky-400/30 bg-sky-400/10 text-sky-200";
    case "assigned":
      return "border-violet-400/30 bg-violet-400/10 text-violet-200";
    case "on_the_way":
      return "border-amber-400/30 bg-amber-400/10 text-amber-200";
    case "arrived":
      return "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200";
    case "done":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
    case "cancelled":
      return "border-red-400/30 bg-red-400/10 text-red-200";
    default:
      return "border-white/10 bg-white/5 text-white/70";
  }
}

function getOrderTime(value: string | null) {
  if (!value) return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function sortOrdersByPriority(list: OrderRow[]) {
  return [...list].sort((a, b) => {
    const aStatus = a.status ?? "new";
    const bStatus = b.status ?? "new";

    const priorityDiff = statusPriority[aStatus] - statusPriority[bStatus];
    if (priorityDiff !== 0) return priorityDiff;

    return getOrderTime(b.created_at) - getOrderTime(a.created_at);
  });
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
  const [refreshing, setRefreshing] = useState(false);
  const [newOrderIds, setNewOrderIds] = useState<string[]>([]);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [realtimeStatus, setRealtimeStatus] =
    useState<RealtimeStatus>("connecting");
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const knownOrderIdsRef = useRef<Set<string>>(new Set());
  const hasLoadedInitialOrdersRef = useRef(false);

  const loadOrders = useCallback(
    async (mode: "initial" | "manual" = "initial") => {
      if (mode === "manual") {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const { data, error } = await supabase
        .from("orders")
        .select(
          "id,status,address,package_label,apartment,entrance,comment,leave_at_door,phone,payment_method,total,created_at"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Не удалось загрузить заказы:", error.message);
        setOrders([]);
        if (mode === "manual") {
          setRefreshing(false);
        } else {
          setLoading(false);
        }
        return;
      }

      const loadedOrders = (data ?? []) as OrderRow[];
      setOrders(loadedOrders);
      knownOrderIdsRef.current = new Set(loadedOrders.map((order) => order.id));
      hasLoadedInitialOrdersRef.current = true;
      setLastSyncedAt(new Date());

      if (mode === "manual") {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function initialLoad() {
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
      setLastSyncedAt(new Date());
      setLoading(false);
    }

    initialLoad();

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

          setLastSyncedAt(new Date());

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
          setLastSyncedAt(new Date());
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setRealtimeStatus("online");
          return;
        }

        if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          setRealtimeStatus("offline");
          return;
        }

        setRealtimeStatus("connecting");
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleManualRefresh() {
    await loadOrders("manual");
  }

  async function changeStatus(id: string, status: OrderStatus) {
    setUpdatingOrderId(id);

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Не удалось обновить статус:", error.message);
      setUpdatingOrderId(null);
      return;
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
    setLastSyncedAt(new Date());
    setUpdatingOrderId(null);
  }

  const attentionOrders = useMemo(
    () =>
      sortOrdersByPriority(
        orders.filter(
          (order) =>
            order.status === "new" ||
            order.status === "assigned" ||
            order.status === "on_the_way" ||
            order.status === "arrived"
        )
      ),
    [orders]
  );

  const newOrders = useMemo(
    () =>
      sortOrdersByPriority(orders.filter((order) => order.status === "new")),
    [orders]
  );

  const activeOrders = useMemo(
    () =>
      sortOrdersByPriority(
        orders.filter(
          (order) =>
            order.status === "assigned" ||
            order.status === "on_the_way" ||
            order.status === "arrived"
        )
      ),
    [orders]
  );

  const finishedOrders = useMemo(
    () =>
      sortOrdersByPriority(
        orders.filter(
          (order) => order.status === "done" || order.status === "cancelled"
        )
      ),
    [orders]
  );

  return (
    <main className="min-h-screen bg-[#0f1011] px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-white/40 hover:text-white/70">
          ← Назад
        </Link>

        <div className="mb-6 mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black">Диспетчерская МусорОК</h1>
            <p className="mt-2 text-sm text-white/55">
              Живая панель заказов с realtime-обновлением.
            </p>
          </div>
        </div>

        {!loading && (
          <section className="sticky top-4 z-20 mb-8 rounded-3xl border border-white/10 bg-[#151617]/90 p-4 backdrop-blur">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:flex-1">
                <CounterCard label="Новые" value={newOrders.length} tone="sky" />
                <CounterCard
                  label="В работе"
                  value={activeOrders.length}
                  tone="amber"
                />
                <CounterCard
                  label="Требуют внимания"
                  value={attentionOrders.length}
                  tone="red"
                />
                <CounterCard
                  label="Завершенные"
                  value={finishedOrders.length}
                  tone="emerald"
                />
                <CounterCard label="Всего" value={orders.length} tone="neutral" />
              </div>

              <div className="flex flex-col gap-3 lg:w-[260px]">
                <RealtimeBadge status={realtimeStatus} />
                <button
                  onClick={handleManualRefresh}
                  disabled={refreshing}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {refreshing ? "Обновляем..." : "Обновить"}
                </button>
                <div className="text-xs text-white/45">
                  Последняя синхронизация: {formatTime(lastSyncedAt)}
                </div>
              </div>
            </div>
          </section>
        )}

        {!loading && attentionOrders.length > 0 && (
          <section className="mb-10 rounded-3xl border border-amber-400/20 bg-amber-400/5 p-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-amber-200">
                  ⚡ Требуют внимания
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Все незавершённые заказы в приоритетном порядке.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-400/20 bg-black/20 px-4 py-2 text-sm text-amber-100">
                Активных: {attentionOrders.length}
              </div>
            </div>

            <div className="grid gap-4">
              {attentionOrders.map((order) => (
                <CompactAttentionCard
                  key={order.id}
                  order={order}
                  isHighlighted={newOrderIds.includes(order.id)}
                />
              ))}
            </div>
          </section>
        )}

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
              updatingOrderId={updatingOrderId}
            />

            <Section
              title="🚚 В работе"
              orders={activeOrders}
              changeStatus={changeStatus}
              newOrderIds={newOrderIds}
              updatingOrderId={updatingOrderId}
            />

            <Section
              title="✅ Завершенные"
              orders={finishedOrders}
              changeStatus={changeStatus}
              newOrderIds={newOrderIds}
              updatingOrderId={updatingOrderId}
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

function CounterCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "sky" | "amber" | "red" | "emerald" | "neutral";
}) {
  const toneClass =
    tone === "sky"
      ? "border-sky-400/20 bg-sky-400/10 text-sky-200"
      : tone === "amber"
      ? "border-amber-400/20 bg-amber-400/10 text-amber-200"
      : tone === "red"
      ? "border-red-400/20 bg-red-400/10 text-red-200"
      : tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      : "border-white/10 bg-white/5 text-white";

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-xs uppercase tracking-[0.14em] opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function RealtimeBadge({ status }: { status: RealtimeStatus }) {
  const config =
    status === "online"
      ? {
          label: "Realtime: онлайн",
          className:
            "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
        }
      : status === "offline"
      ? {
          label: "Realtime: офлайн",
          className: "border-red-400/20 bg-red-400/10 text-red-200",
        }
      : {
          label: "Realtime: подключение",
          className: "border-amber-400/20 bg-amber-400/10 text-amber-200",
        };

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${config.className}`}>
      {config.label}
    </div>
  );
}

function CompactAttentionCard({
  order,
  isHighlighted,
}: {
  order: OrderRow;
  isHighlighted: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border p-4 transition ${
        isHighlighted
          ? "border-emerald-400/50 bg-emerald-400/10"
          : "border-white/10 bg-black/20"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-white">
              {order.package_label || "Без тарифа"}
            </p>

            <span
              className={`rounded-full border px-3 py-1 text-xs ${statusBadgeClass(
                order.status
              )}`}
            >
              {statusLabel(order.status)}
            </span>

            {isHighlighted && (
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">
                Новый заказ
              </span>
            )}
          </div>

          <p className="mt-2 truncate text-sm text-white/60">
            {order.address || "Адрес не указан"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-white/70">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {formatPhone(order.phone)}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {order.total ?? 0} ₽
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {formatDate(order.created_at)}
          </span>
        </div>
      </div>
    </article>
  );
}

function Section({
  title,
  orders,
  changeStatus,
  newOrderIds,
  updatingOrderId,
}: {
  title: string;
  orders: OrderRow[];
  changeStatus: (id: string, status: OrderStatus) => void;
  newOrderIds: string[];
  updatingOrderId: string | null;
}) {
  if (!orders.length) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="grid gap-4">
        {orders.map((order) => {
          const isNewlyHighlighted = newOrderIds.includes(order.id);
          const isUpdating = updatingOrderId === order.id;

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

                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${statusBadgeClass(
                      order.status
                    )}`}
                  >
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
                disabled={isUpdating}
                onChange={(e) =>
                  changeStatus(order.id, e.target.value as OrderStatus)
                }
                className="w-[220px] rounded-lg border border-white/10 bg-[#1b1c1d] px-3 py-2 text-sm text-white outline-none disabled:cursor-not-allowed disabled:opacity-60"
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