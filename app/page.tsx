"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

declare global {
  interface Window {
    ymaps: any;
  }
}

const YANDEX_MAPS_API_KEY =
  typeof process !== "undefined" && process.env
    ? process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
    : undefined;

const SUPABASE_URL =
  typeof process !== "undefined" && process.env
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : undefined;

const SUPABASE_ANON_KEY =
  typeof process !== "undefined" && process.env
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : undefined;

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

type YesNo = "yes" | "no";
type PaymentMethod = "card" | "cash" | "sbp";
type AddressMode = "map" | "manual";
type OrderStep = 1 | 2 | 3;
type TipAmount = number;

type PriceOption = {
  id: string;
  name: string;
  price: number;
  label: string;
  desc: string;
};

const steps = [
  {
    title: "Оставляете заявку",
    text: "Нажимаете кнопку, указываете адрес и количество пакетов. Без долгих форм и лишних действий.",
  },
  {
    title: "Исполнитель приходит",
    text: "Человек рядом забирает мусор в удобное вам время и сразу относит его к контейнерам.",
  },
  {
    title: "Вы остаетесь дома",
    text: "Никаких лифтов, лестниц и походов до мусорки. Просто чисто и спокойно.",
  },
];

const prices: PriceOption[] = [
  { id: "1", name: "Базовый", price: 99, label: "99 ₽", desc: "1 пакет бытового мусора" },
  { id: "2-3", name: "Семейный", price: 149, label: "149 ₽", desc: "2–3 пакета" },
  { id: "4+", name: "Много всего", price: 199, label: "от 199 ₽", desc: "4+ пакета или объёмный заказ" },
];

const audience = [
  "Тем, кому просто лень выходить",
  "Семьям с детьми",
  "Тем, кто работает из дома",
  "Пожилым людям",
  "Жителям больших ЖК",
  "Тем, кто уже переоделся в домашнее",
];

const faq = [
  {
    q: "Куда вы выносите мусор?",
    a: "В ближайшие разрешённые контейнеры для вашего дома или жилого комплекса. Формат работы можно отдельно уточнить при запуске в конкретном районе.",
  },
  {
    q: "Сколько ждать исполнителя?",
    a: "В пилотной версии можно обещать быстрый выезд в пределах района. Для лендинга удобно заявить формат: от 10 до 30 минут.",
  },
  {
    q: "Можно ли заказать на постоянной основе?",
    a: "Да. В следующей итерации можно добавить регулярный вынос по расписанию: каждый день или несколько раз в неделю.",
  },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-2xl px-3 py-2.5 text-sm font-semibold transition hover:scale-[1.03] active:scale-[0.97] ${
        active ? "bg-white text-black" : "bg-black/20 text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1011]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <a href="#top" className="flex items-center">
            <img src="/musorok-logo-removebg-preview.png" alt="МусорОК" className="h-8 w-auto cursor-pointer" />
          </a>
          <span className="hidden text-sm text-white/60 md:block">Сервис выноса мусора в Краснодаре</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex">
          <a href="#how" className="transition hover:text-white">Как это работает</a>
          <a href="#prices" className="transition hover:text-white">Тарифы</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
        </nav>
      </div>
    </header>
  );
}

function HeroCopy() {
  return (
    <div>
      <h1 className="max-w-[440px] text-4xl font-black leading-[0.92] tracking-tight sm:text-5xl lg:text-[72px]">
        Лень выносить мусор?
        <span className="mt-3 block text-white/70">МусорОК вынесет за тебя.</span>
      </h1>
      <p className="mt-4 max-w-[440px] text-sm leading-6 text-white/70 lg:text-base">
        Заказывайте вынос бытового мусора через сайт или приложение. Исполнитель приходит,
        забирает пакеты и относит их к контейнерам — быстро, просто и без лишней суеты.
      </p>
    </div>
  );
}

function StepOne({
  selectedPackageId,
  setSelectedPackageId,
  selectedPrice,
  addressSelected,
  onContinue,
}: {
  selectedPackageId: string;
  setSelectedPackageId: (value: string) => void;
  selectedPrice: PriceOption;
  addressSelected: boolean;
  onContinue: () => void;
}) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Пакеты</p>
          <div className="mt-3 grid gap-2">
            {prices.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedPackageId(item.id);
                  document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`rounded-2xl border px-3 py-2.5 text-left text-sm font-medium transition duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  selectedPackageId === item.id
                    ? "border-white bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {item.id} пакет{item.id === "1" ? "" : item.id === "2-3" ? "а" : "ов"}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Стоимость</p>
          <p className="mt-3 text-3xl font-black">{selectedPrice.label}</p>
          <p className="mt-2 text-sm text-white/55">{selectedPrice.desc}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={!selectedPackageId || !addressSelected}
        className={`mt-4 w-full rounded-2xl px-5 py-3.5 font-bold transition ${
          !selectedPackageId || !addressSelected
            ? "bg-white/30 text-black/50 cursor-not-allowed"
            : "bg-white text-black hover:scale-[1.01]"
        }`}
      >
        Продолжить
      </button>
    </div>
  );
}

function StepTwo({
  apartment,
  entrance,
  comment,
  leaveAtDoor,
  phone,
  shouldCall,
  setApartment,
  setEntrance,
  setComment,
  setLeaveAtDoor,
  setPhone,
  setShouldCall,
  onBack,
  onContinue,
}: {
  apartment: string;
  entrance: string;
  comment: string;
  leaveAtDoor: YesNo;
  phone: string;
  shouldCall: YesNo;
  setApartment: (value: string) => void;
  setEntrance: (value: string) => void;
  setComment: (value: string) => void;
  setLeaveAtDoor: (value: YesNo) => void;
  setPhone: (value: string) => void;
  setShouldCall: (value: YesNo) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
            <p className="text-sm text-white/50">Квартира</p>
            <input
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              placeholder="Например: 55"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
            <p className="text-sm text-white/50">Подъезд</p>
            <input
              value={entrance}
              onChange={(e) => setEntrance(e.target.value)}
              placeholder="Например: 2"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Комментарий курьеру</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Например: домофон не работает, пакет у двери"
            rows={2}
            className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
            <p className="text-sm text-white/50">Забрать у двери?</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ToggleButton active={leaveAtDoor === "yes"} onClick={() => setLeaveAtDoor("yes")}>Да</ToggleButton>
              <ToggleButton active={leaveAtDoor === "no"} onClick={() => setLeaveAtDoor("no")}>Нет</ToggleButton>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
            <p className="text-sm text-white/50">Телефон для связи</p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Например: +7 (999) 123-45-67"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ToggleButton active={shouldCall === "yes"} onClick={() => setShouldCall("yes")}>Позвонить</ToggleButton>
              <ToggleButton active={shouldCall === "no"} onClick={() => setShouldCall("no")}>Не звонить</ToggleButton>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="rounded-2xl bg-white px-5 py-3.5 font-bold text-black transition hover:scale-[1.01]"
        >
          К оплате
        </button>
      </div>
    </div>
  );
}

function StepThree({
  paymentMethod,
  tip,
  customTip,
  total,
  packageLabel,
  apartment,
  entrance,
  isSubmitting,
  submitError,
  submitSuccess,
  onSubmit,
  setPaymentMethod,
  setTip,
  setCustomTip,
  onBack,
}: {
  paymentMethod: PaymentMethod;
  tip: TipAmount;
  customTip: string;
  total: number;
  packageLabel: string;
  apartment: string;
  entrance: string;
  isSubmitting: boolean;
  submitError: string;
  submitSuccess: string;
  onSubmit: () => void;
  setPaymentMethod: (value: PaymentMethod) => void;
  setTip: (value: TipAmount) => void;
  setCustomTip: (value: string) => void;
  onBack: () => void;
}) {
  const presetTips = [0, 50, 100];

  return (
    <div>
      <div className="grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Ваш заказ</p>
          <div className="mt-3 space-y-1 text-sm text-white/80">
            {apartment && <p>кв. {apartment}</p>}
            {entrance && <p>подъезд {entrance}</p>}
            <p>{packageLabel}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Способ оплаты</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <ToggleButton active={paymentMethod === "card"} onClick={() => setPaymentMethod("card")}>Картой</ToggleButton>
            <ToggleButton active={paymentMethod === "cash"} onClick={() => setPaymentMethod("cash")}>Наличные</ToggleButton>
            <ToggleButton active={paymentMethod === "sbp"} onClick={() => setPaymentMethod("sbp")}>СБП</ToggleButton>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Чаевые</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {presetTips.map((value) => (
              <ToggleButton
                key={value}
                active={tip === value && customTip === ""}
                onClick={() => {
                  setCustomTip("");
                  setTip(value);
                }}
              >
                {value === 0 ? "Без чаевых" : `${value} ₽`}
              </ToggleButton>
            ))}
          </div>
          <div className="mt-3">
            <input
              value={customTip}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setCustomTip(value);
                setTip(value ? Number(value) : 0);
              }}
              placeholder="Своя сумма чаевых"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-4 text-black">
          <p className="text-sm text-black/45">Итого</p>
          <p className="mt-2 text-4xl font-black">{total} ₽</p>
          <p className="mt-2 text-sm text-black/60">Стоимость заказа с учетом чаевых</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`rounded-2xl px-5 py-3.5 font-bold transition ${
            isSubmitting
              ? "bg-white/40 text-black/50 cursor-not-allowed"
              : "bg-white text-black hover:scale-[1.01]"
          }`}
        >
          {isSubmitting ? "Сохраняем заказ..." : "Оплатить"}
        </button>
      </div>

      {submitError && <p className="mt-3 text-sm text-red-300">{submitError}</p>}
      {submitSuccess && <p className="mt-3 text-sm text-green-300">{submitSuccess}</p>}
    </div>
  );
}

function AddressSelector({
  isAddressOpen,
  setIsAddressOpen,
  addressMode,
  setAddressMode,
  addressLabel,
  manualAddress,
  setManualAddress,
  mapStatus,
  mapContainerRef,
  setSelectedMapAddress,
  setDraftMapAddress,
}: {
  isAddressOpen: boolean;
  setIsAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addressMode: AddressMode;
  setAddressMode: (value: AddressMode) => void;
  addressLabel: string;
  manualAddress: string;
  setManualAddress: (value: string) => void;
  mapStatus: "idle" | "loading" | "ready" | "error" | "fallback";
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  setSelectedMapAddress: (value: string) => void;
  setDraftMapAddress: (value: string) => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setAddressMode("map");
          setIsAddressOpen((prev) => !prev);
        }}
        className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10 lg:p-4"
      >
        <p className="text-sm text-white/50">Адрес</p>
        <p className="mt-1 font-medium">{addressLabel}</p>
      </button>

      {isAddressOpen && (
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 lg:p-4">
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() => setAddressMode("map")}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                addressMode === "map" ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Выбрать на карте
            </button>
            <button
              type="button"
              onClick={() => setAddressMode("manual")}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                addressMode === "manual" ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Ввести вручную
            </button>
          </div>

          {addressMode === "map" ? (
            <div>
              {mapStatus === "fallback" ? (
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#1d1f22,#111214)] p-5">
                  <div className="mb-4 flex items-center justify-between text-sm text-white/50">
                    <span>Карта Краснодара</span>
                    <span>Preview mode</span>
                  </div>
                  <div className="grid min-h-[220px] place-items-center rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 p-6 text-center lg:min-h-[240px]">
                    <div className="max-w-sm">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl">📍</div>
                      <p className="text-lg font-semibold">Карта будет видна на реальном сайте</p>
                      <p className="mt-2 text-sm leading-6 text-white/50">
                        В preview внутри чата внешние скрипты и env-переменные могут не отрабатывать.
                        На localhost и Vercel загрузится настоящая Яндекс Карта.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setDraftMapAddress("Краснодар, ул. Красная, 176");
                          setSelectedMapAddress("Краснодар, ул. Красная, 176");
                          setIsAddressOpen(false);
                        }}
                        className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                      >
                        Выбрать тестовый адрес
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div ref={mapContainerRef} className="min-h-[220px] overflow-hidden rounded-3xl border border-white/10 lg:min-h-[240px]" />
              )}

              <p className="mt-3 text-sm text-white/45">
                {mapStatus === "loading" && "Загружаем карту Краснодара..."}
                {mapStatus === "ready" && "Кликните по карте, чтобы сразу выбрать адрес."}
                {mapStatus === "error" && "Карта не загрузилась. Проверьте API-ключ и перезапустите проект."}
                {mapStatus === "fallback" && "В preview показывается аккуратная заглушка, а на живом сайте — настоящая карта."}
              </p>
            </div>
          ) : (
            <input
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              placeholder="Например: Краснодар, ул. Красная, 176"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
          )}
        </div>
      )}
    </div>
  );
}

function OrderCard({
  isAddressOpen,
  setIsAddressOpen,
  addressMode,
  setAddressMode,
  addressLabel,
  manualAddress,
  setManualAddress,
  mapStatus,
  mapContainerRef,
  setSelectedMapAddress,
  setDraftMapAddress,
  selectedPackageId,
  setSelectedPackageId,
  selectedPrice,
  orderStep,
  setOrderStep,
  apartment,
  entrance,
  comment,
  leaveAtDoor,
  phone,
  shouldCall,
  paymentMethod,
  tip,
  customTip,
  total,
  isSubmitting,
  submitError,
  submitSuccess,
  onSubmit,
  setApartment,
  setEntrance,
  setComment,
  setLeaveAtDoor,
  setPhone,
  setShouldCall,
  setPaymentMethod,
  setTip,
  setCustomTip,
}: {
  isAddressOpen: boolean;
  setIsAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addressMode: AddressMode;
  setAddressMode: (value: AddressMode) => void;
  addressLabel: string;
  manualAddress: string;
  setManualAddress: (value: string) => void;
  mapStatus: "idle" | "loading" | "ready" | "error" | "fallback";
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  setSelectedMapAddress: (value: string) => void;
  setDraftMapAddress: (value: string) => void;
  selectedPackageId: string;
  setSelectedPackageId: (value: string) => void;
  selectedPrice: PriceOption;
  orderStep: OrderStep;
  setOrderStep: (value: OrderStep) => void;
  apartment: string;
  entrance: string;
  comment: string;
  leaveAtDoor: YesNo;
  phone: string;
  shouldCall: YesNo;
  paymentMethod: PaymentMethod;
  tip: TipAmount;
  customTip: string;
  total: number;
  isSubmitting: boolean;
  submitError: string;
  submitSuccess: string;
  onSubmit: () => void;
  setApartment: (value: string) => void;
  setEntrance: (value: string) => void;
  setComment: (value: string) => void;
  setLeaveAtDoor: (value: YesNo) => void;
  setPhone: (value: string) => void;
  setShouldCall: (value: YesNo) => void;
  setPaymentMethod: (value: PaymentMethod) => void;
  setTip: (value: TipAmount) => void;
  setCustomTip: (value: string) => void;
}) {
  return (
    <div className="relative lg:flex lg:justify-end">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/30 lg:max-h-[calc(100vh-120px)] lg:w-[min(100%,680px)] lg:overflow-hidden lg:p-4">
        <div className="rounded-[1.75rem] border border-[#2c3807]/40 bg-[#1a2105] p-3 lg:h-full lg:overflow-hidden lg:p-4">
          <div className="mt-1 rounded-3xl border border-white/10 bg-[#17181a] p-3 lg:h-full lg:overflow-y-auto lg:p-4">
            <div className="space-y-3">
              {orderStep === 1 && (
                <AddressSelector
                  isAddressOpen={isAddressOpen}
                  setIsAddressOpen={setIsAddressOpen}
                  addressMode={addressMode}
                  setAddressMode={setAddressMode}
                  addressLabel={addressLabel}
                  manualAddress={manualAddress}
                  setManualAddress={setManualAddress}
                  mapStatus={mapStatus}
                  mapContainerRef={mapContainerRef}
                  setSelectedMapAddress={setSelectedMapAddress}
                  setDraftMapAddress={setDraftMapAddress}
                />
              )}

              {orderStep === 1 ? (
                <StepOne
                  selectedPackageId={selectedPackageId}
                  setSelectedPackageId={setSelectedPackageId}
                  selectedPrice={selectedPrice}
                  addressSelected={addressLabel !== "Краснодар, выберите точку на карте"}
                  onContinue={() => setOrderStep(2)}
                />
              ) : orderStep === 2 ? (
                <StepTwo
                  apartment={apartment}
                  entrance={entrance}
                  comment={comment}
                  leaveAtDoor={leaveAtDoor}
                  phone={phone}
                  shouldCall={shouldCall}
                  setApartment={setApartment}
                  setEntrance={setEntrance}
                  setComment={setComment}
                  setLeaveAtDoor={setLeaveAtDoor}
                  setPhone={setPhone}
                  setShouldCall={setShouldCall}
                  onBack={() => setOrderStep(1)}
                  onContinue={() => setOrderStep(3)}
                />
              ) : (
                <StepThree
                  paymentMethod={paymentMethod}
                  tip={tip}
                  customTip={customTip}
                  total={total}
                  packageLabel={selectedPrice.desc}
                  apartment={apartment}
                  entrance={entrance}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                  submitSuccess={submitSuccess}
                  onSubmit={onSubmit}
                  setPaymentMethod={setPaymentMethod}
                  setTip={setTip}
                  setCustomTip={setCustomTip}
                  onBack={() => setOrderStep(2)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [addressMode, setAddressMode] = useState<AddressMode>("map");
  const [manualAddress, setManualAddress] = useState("");
  const [selectedMapAddress, setSelectedMapAddress] = useState("Краснодар, выберите точку на карте");
  const [draftMapAddress, setDraftMapAddress] = useState("Краснодар, выберите точку на карте");
  const [selectedPackageId, setSelectedPackageId] = useState("2-3");
  const [orderStep, setOrderStep] = useState<OrderStep>(1);
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");
  const [comment, setComment] = useState("");
  const [leaveAtDoor, setLeaveAtDoor] = useState<YesNo>("no");
  const [phone, setPhone] = useState("");
  const [shouldCall, setShouldCall] = useState<YesNo>("yes");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [tip, setTip] = useState<TipAmount>(0);
  const [customTip, setCustomTip] = useState("");
  const [mapStatus, setMapStatus] = useState<"idle" | "loading" | "ready" | "error" | "fallback">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  const selectedPrice = useMemo(() => {
    return prices.find((item) => item.id === selectedPackageId) ?? prices[1];
  }, [selectedPackageId]);

  const total = useMemo(() => selectedPrice.price + tip, [selectedPrice.price, tip]);

  const addressLabel = addressMode === "manual"
    ? manualAddress || "Введите адрес вручную"
    : selectedMapAddress;

  const handleCreateOrder = async () => {
    setSubmitError("");
    setSubmitSuccess("");

    if (!supabase) {
      setSubmitError("Supabase не подключен. Добавьте переменные окружения и перезапустите проект.");
      return;
    }

    if (!addressLabel || addressLabel === "Краснодар, выберите точку на карте") {
      setSubmitError("Сначала выберите адрес.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("orders").insert({
      address: addressLabel,
      package_id: selectedPackageId,
      package_label: selectedPrice.desc,
      package_price: selectedPrice.price,
      apartment,
      entrance,
      comment,
      leave_at_door: leaveAtDoor === "yes",
      phone,
      should_call: shouldCall === "yes",
      payment_method: paymentMethod,
      tip,
      total,
    });

    setIsSubmitting(false);

    if (error) {
      setSubmitError(error.message);
      return;
    }

    setSubmitSuccess("Заказ создан. Теперь его можно взять в таблице orders в Supabase.");
    setOrderStep(1);
  };

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isAddressOpen || addressMode !== "map") return;

    if (!YANDEX_MAPS_API_KEY) {
      setMapStatus("fallback");
      return;
    }

    const initializeMap = () => {
      if (!window.ymaps || !mapContainerRef.current || mapInstanceRef.current) return;

      setMapStatus("loading");

      window.ymaps.ready(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const krasnodarCenter = [45.03547, 38.975313];
        const map = new window.ymaps.Map(mapContainerRef.current, {
          center: krasnodarCenter,
          zoom: 12,
          controls: ["zoomControl", "geolocationControl"],
        });

        const placemark = new window.ymaps.Placemark(krasnodarCenter, {}, { preset: "islands#blackDotIcon" });

        map.geoObjects.add(placemark);
        mapInstanceRef.current = map;
        placemarkRef.current = placemark;
        setMapStatus("ready");

        window.ymaps
          .geocode(krasnodarCenter)
          .then((result: any) => {
            const firstGeoObject = result.geoObjects.get(0);
            if (firstGeoObject) setDraftMapAddress(firstGeoObject.getAddressLine());
          })
          .catch(() => setDraftMapAddress("Краснодар, выберите точку на карте"));

        map.events.add("click", (event: any) => {
          const coords = event.get("coords");
          if (placemarkRef.current) placemarkRef.current.geometry.setCoordinates(coords);

          window.ymaps
            .geocode(coords)
            .then((result: any) => {
              const firstGeoObject = result.geoObjects.get(0);
              const address = firstGeoObject
                ? firstGeoObject.getAddressLine()
                : `Краснодар, ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;

              setDraftMapAddress(address);
              setSelectedMapAddress(address);
              setIsAddressOpen(false);
            })
            .catch(() => {
              const address = `Краснодар, ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
              setDraftMapAddress(address);
              setSelectedMapAddress(address);
              setIsAddressOpen(false);
            });
        });
      });
    };

    if (window.ymaps) {
      initializeMap();
      return;
    }

    if (scriptLoadedRef.current) return;

    scriptLoadedRef.current = true;
    setMapStatus("loading");

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;
    script.onload = initializeMap;
    script.onerror = () => setMapStatus("fallback");
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [addressMode, isAddressOpen]);

  return (
    <div id="top" className="min-h-screen bg-[#0f1011] text-white">
      <Header />

      <main>
        <section className="relative overflow-hidden lg:h-[calc(100vh-72px)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:h-full lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8 lg:py-6">
            <HeroCopy />
            <OrderCard
              isAddressOpen={isAddressOpen}
              setIsAddressOpen={setIsAddressOpen}
              addressMode={addressMode}
              setAddressMode={setAddressMode}
              addressLabel={addressLabel}
              manualAddress={manualAddress}
              setManualAddress={setManualAddress}
              mapStatus={mapStatus}
              mapContainerRef={mapContainerRef}
              setSelectedMapAddress={setSelectedMapAddress}
              setDraftMapAddress={setDraftMapAddress}
              selectedPackageId={selectedPackageId}
              setSelectedPackageId={setSelectedPackageId}
              selectedPrice={selectedPrice}
              orderStep={orderStep}
              setOrderStep={setOrderStep}
              apartment={apartment}
              entrance={entrance}
              comment={comment}
              leaveAtDoor={leaveAtDoor}
              phone={phone}
              shouldCall={shouldCall}
              paymentMethod={paymentMethod}
              tip={tip}
              customTip={customTip}
              total={total}
              isSubmitting={isSubmitting}
              submitError={submitError}
              submitSuccess={submitSuccess}
              onSubmit={handleCreateOrder}
              setApartment={setApartment}
              setEntrance={setEntrance}
              setComment={setComment}
              setLeaveAtDoor={setLeaveAtDoor}
              setPhone={setPhone}
              setShouldCall={setShouldCall}
              setPaymentMethod={setPaymentMethod}
              setTip={setTip}
              setCustomTip={setCustomTip}
            />
          </div>
        </section>

        <section id="how" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionTitle eyebrow="Как это работает" title="Три простых шага, чтобы не нести мусор самому" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-black">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="prices" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
            <SectionTitle eyebrow="Тарифы" title="Понятные цены без сложных условий" />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {prices.map((item) => (
                <div
                  key={item.name}
                  className={`rounded-[1.75rem] border p-6 transition ${
                    selectedPackageId === item.id ? "border-white bg-white text-black" : "border-white/10 bg-black/20"
                  }`}
                >
                  <p className={`text-sm uppercase tracking-[0.18em] ${selectedPackageId === item.id ? "text-black/45" : "text-white/45"}`}>
                    {item.name}
                  </p>
                  <p className="mt-4 text-4xl font-black">{item.label}</p>
                  <p className={`mt-3 ${selectedPackageId === item.id ? "text-black/65" : "text-white/65"}`}>{item.desc}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPackageId(item.id);
                      setOrderStep(1);
                      document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`mt-8 w-full rounded-2xl px-4 py-3 font-semibold transition duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      selectedPackageId === item.id
                        ? "border border-black/10 bg-black text-white hover:opacity-90"
                        : "border border-white/15 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {selectedPackageId === item.id ? "Выбрано" : "Выбрать"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <SectionTitle eyebrow="Для кого" title="Сервис для тех, кто ценит время и комфорт" />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {audience.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/85">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-black">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/45">Оффер</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Не носи мусор. Живи нормально.</h2>
              <p className="mt-4 leading-7 text-black/65">
                МусорОК — это бытовой сервис нового типа: открыл, заказал, отдал пакет,
                забыл о проблеме. Без звонков, ожиданий и лишней суеты.
              </p>
              <div className="mt-8 space-y-3">
                <div className="rounded-2xl bg-black/5 p-4">Подходит для пилотного запуска в одном районе или ЖК</div>
                <div className="rounded-2xl bg-black/5 p-4">Легко расширяется до приложения с подпиской</div>
                <div className="rounded-2xl bg-black/5 p-4">Можно развить в сервис микро-поручений</div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Оставить заявку</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Запустим МусорОК в вашем ЖК</h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/65">
                  Оставьте контакты, чтобы первыми получить доступ к сервису и узнать о запуске в вашем районе.
                </p>
              </div>
              <form className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                <div className="space-y-3">
                  <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25" placeholder="Ваше имя" />
                  <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25" placeholder="Телефон" />
                  <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25" placeholder="ЖК или адрес" />
                  <button className="w-full rounded-2xl bg-white px-5 py-4 font-bold text-black transition hover:scale-[1.01]">Хочу доступ</button>
                </div>
                <p className="mt-3 text-xs leading-5 text-white/40">
                  Нажимая кнопку, вы соглашаетесь на обработку данных. Текст политики можно добавить на следующем этапе.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionTitle eyebrow="FAQ" title="Частые вопросы" />
          <div className="mt-10 grid gap-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-bold">{item.q}</h3>
                <p className="mt-3 leading-7 text-white/65">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© МусорОК — первая итерация лендинга</p>
          <p>powered by TION</p>
        </div>
      </footer>

      <button
        onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#2c3807] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105 md:hidden"
      >
        Заказать вынос мусора
      </button>

      {showTopButton && (
        <button
          onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-white px-4 py-3 text-sm font-bold text-black shadow-lg transition hover:scale-105"
        >
          ↑ Наверх
        </button>
      )}
    </div>
  );
}
