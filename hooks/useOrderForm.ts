import { useMemo, useState } from "react";
import {
  trackOrderSubmit,
  trackOrderSuccess,
  trackStep3Complete,
} from "@/lib/analytics";
import { DEFAULT_ADDRESS_LABEL, prices } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import type {
  AddressMode,
  MapStatus,
  OrderStep,
  PaymentMethod,
  SubmitStatus,
  YesNo,
} from "@/lib/types";

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (!digits) return "";

  if (digits.startsWith("7")) return digits.slice(0, 11);
  if (digits.startsWith("8")) return `7${digits.slice(1, 11)}`;

  return `7${digits}`.slice(0, 11);
}

export function useOrderForm() {
  const [showTopButton, setShowTopButton] = useState(false);

  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [addressMode, setAddressMode] = useState<AddressMode>("map");
  const [manualAddress, setManualAddress] = useState("");
  const [selectedMapAddress, setSelectedMapAddress] =
    useState(DEFAULT_ADDRESS_LABEL);
  const [mapStatus, setMapStatus] = useState<MapStatus>("idle");

  const [selectedPackageId, setSelectedPackageId] = useState("2-3");
  const [orderStep, setOrderStep] = useState<OrderStep>(1);

  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");
  const [comment, setComment] = useState("");
  const [leaveAtDoor, setLeaveAtDoor] = useState<YesNo>("no");

  const [phone, setPhone] = useState("");
  const [shouldCall, setShouldCall] = useState<YesNo>("yes");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState("");

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const selectedPrice = useMemo(() => {
    return prices.find((item) => item.id === selectedPackageId) ?? prices[1];
  }, [selectedPackageId]);

  const total = useMemo(() => {
    return selectedPrice.price + tip;
  }, [selectedPrice.price, tip]);

  const addressLabel =
    addressMode === "manual"
      ? manualAddress || "Введите адрес вручную"
      : selectedMapAddress;

  const finalAddress =
    addressMode === "manual"
      ? manualAddress.trim() || "Адрес не указан"
      : selectedMapAddress;

  const normalizedPhone = normalizePhone(phone);
  const trimmedApartment = apartment.trim();

  const resetOrderForm = () => {
    setSubmitStatus("idle");
    setSubmitMessage("");
    setOrderStep(1);

    setAddressMode("map");
    setManualAddress("");
    setSelectedMapAddress(DEFAULT_ADDRESS_LABEL);
    setIsAddressOpen(false);
    setMapStatus("idle");

    setSelectedPackageId("2-3");

    setApartment("");
    setEntrance("");
    setComment("");
    setLeaveAtDoor("no");

    setPhone("");
    setShouldCall("yes");

    setPaymentMethod("card");
    setTip(0);
    setCustomTip("");
  };

  const handleCreateOrder = async () => {
    if (!normalizedPhone) {
      setSubmitStatus("error");
      setSubmitMessage("Пожалуйста, укажите номер телефона.");
      return;
    }

    if (normalizedPhone.length < 11) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Укажите телефон в полном формате, например +7 (999) 123-45-67."
      );
      return;
    }

    if (!trimmedApartment) {
      setSubmitStatus("error");
      setSubmitMessage("Пожалуйста, укажите номер квартиры.");
      return;
    }

    if (!finalAddress || finalAddress === DEFAULT_ADDRESS_LABEL) {
      setSubmitStatus("error");
      setSubmitMessage("Пожалуйста, выберите адрес.");
      return;
    }

    if (!supabase) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Supabase не подключен. Добавьте ключи в .env.local и Vercel, затем перезапустите проект."
      );
      return;
    }

    trackStep3Complete();
    trackOrderSubmit();

    setSubmitStatus("submitting");
    setSubmitMessage("");

    const { error } = await supabase.from("orders").insert({
      status: "new",
      address: finalAddress,
      package_id: selectedPackageId,
      package_label: selectedPrice.desc,
      package_price: selectedPrice.price,
      apartment: trimmedApartment,
      entrance,
      comment,
      leave_at_door: leaveAtDoor === "yes",
      phone: normalizedPhone,
      should_call: shouldCall === "yes",
      payment_method: paymentMethod,
      tip,
      total,
    });

    if (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Не удалось сохранить заказ. Проверьте таблицу orders и политики в Supabase."
      );
      return;
    }

    trackOrderSuccess();

    setSubmitStatus("success");
    setSubmitMessage(
      "Заявка успешно отправлена. Скоро исполнитель сможет взять ваш заказ в работу."
    );
  };

  return {
    ui: {
      showTopButton,
      setShowTopButton,
    },

    address: {
      isAddressOpen,
      setIsAddressOpen,
      addressMode,
      setAddressMode,
      manualAddress,
      setManualAddress,
      selectedMapAddress,
      setSelectedMapAddress,
      mapStatus,
      setMapStatus,
      addressLabel,
    },

    packageSelection: {
      selectedPackageId,
      setSelectedPackageId,
      selectedPrice,
      orderStep,
      setOrderStep,
    },

    details: {
      apartment,
      setApartment,
      entrance,
      setEntrance,
      comment,
      setComment,
      leaveAtDoor,
      setLeaveAtDoor,
      phone,
      setPhone,
      shouldCall,
      setShouldCall,
    },

    payment: {
      paymentMethod,
      setPaymentMethod,
      tip,
      setTip,
      customTip,
      setCustomTip,
      total,
    },

    submit: {
      submitStatus,
      setSubmitStatus,
      submitMessage,
      setSubmitMessage,
      resetOrderForm,
      handleCreateOrder,
    },
  };
}