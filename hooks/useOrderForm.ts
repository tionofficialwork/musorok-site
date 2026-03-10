import { useMemo, useState } from "react";
import { prices } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import type {
  AddressMode,
  MapStatus,
  OrderStep,
  PaymentMethod,
  SubmitStatus,
  YesNo,
} from "@/lib/types";

export function useOrderForm() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [addressMode, setAddressMode] = useState<AddressMode>("map");
  const [manualAddress, setManualAddress] = useState("");
  const [selectedMapAddress, setSelectedMapAddress] = useState(
    "Краснодар, выберите точку на карте"
  );
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
  const [mapStatus, setMapStatus] = useState<MapStatus>("idle");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const selectedPrice = useMemo(() => {
    return prices.find((item) => item.id === selectedPackageId) ?? prices[1];
  }, [selectedPackageId]);

  const total = useMemo(() => selectedPrice.price + tip, [selectedPrice.price, tip]);

  const addressLabel =
    addressMode === "manual"
      ? manualAddress || "Введите адрес вручную"
      : selectedMapAddress;

  const resetOrderForm = () => {
    setSubmitStatus("idle");
    setSubmitMessage("");
    setOrderStep(1);
    setAddressMode("map");
    setManualAddress("");
    setSelectedMapAddress("Краснодар, выберите точку на карте");
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
    setIsAddressOpen(false);
  };

  const handleCreateOrder = async () => {
    if (!supabase) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Supabase не подключен. Добавьте ключи в .env.local и Vercel, затем перезапустите проект."
      );
      return;
    }

    const finalAddress =
      addressMode === "manual"
        ? manualAddress || "Адрес не указан"
        : selectedMapAddress;

    setSubmitStatus("submitting");
    setSubmitMessage("");

    const { error } = await supabase.from("orders").insert({
      status: "new",
      address: finalAddress,
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

    if (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Не удалось сохранить заказ. Проверьте таблицу orders и политики в Supabase."
      );
      return;
    }

    setSubmitStatus("success");
    setSubmitMessage(
      "Заявка успешно отправлена. Скоро исполнитель сможет взять ваш заказ в работу."
    );
  };

  return {
    showTopButton,
    setShowTopButton,
    isAddressOpen,
    setIsAddressOpen,
    addressMode,
    setAddressMode,
    manualAddress,
    setManualAddress,
    selectedMapAddress,
    setSelectedMapAddress,
    selectedPackageId,
    setSelectedPackageId,
    selectedPrice,
    orderStep,
    setOrderStep,
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
    paymentMethod,
    setPaymentMethod,
    tip,
    setTip,
    customTip,
    setCustomTip,
    mapStatus,
    setMapStatus,
    submitStatus,
    setSubmitStatus,
    submitMessage,
    setSubmitMessage,
    total,
    addressLabel,
    resetOrderForm,
    handleCreateOrder,
  };
}