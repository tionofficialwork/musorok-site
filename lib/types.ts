import type React from "react";

export type YesNo = "yes" | "no";
export type PaymentMethod = "card" | "cash" | "sbp";
export type AddressMode = "map" | "manual";
export type OrderStep = 1 | 2 | 3;
export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export type PriceOption = {
  id: string;
  name: string;
  price: number;
  label: string;
  desc: string;
};

export type MapStatus = "idle" | "loading" | "ready" | "error" | "fallback";

export type OrderCardProps = {
  isAddressOpen: boolean;
  setIsAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addressMode: AddressMode;
  setAddressMode: (value: AddressMode) => void;
  addressLabel: string;
  manualAddress: string;
  setManualAddress: (value: string) => void;
  mapStatus: MapStatus;
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  setSelectedMapAddress: (value: string) => void;
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
  tip: number;
  customTip: string;
  total: number;
  setApartment: (value: string) => void;
  setEntrance: (value: string) => void;
  setComment: (value: string) => void;
  setLeaveAtDoor: (value: YesNo) => void;
  setPhone: (value: string) => void;
  setShouldCall: (value: YesNo) => void;
  setPaymentMethod: (value: PaymentMethod) => void;
  setTip: (value: number) => void;
  setCustomTip: (value: string) => void;
  onSubmit: () => void;
  onResetAfterSuccess: () => void;
  submitStatus: SubmitStatus;
  submitMessage: string;
};