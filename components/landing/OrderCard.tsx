import AddressSelector from "@/components/landing/AddressSelector";
import StepOne from "@/components/landing/StepOne";
import StepThree from "@/components/landing/StepThree";
import StepTwo from "@/components/landing/StepTwo";
import SuccessStep from "@/components/landing/SuccessStep";
import type { OrderCardProps } from "@/lib/types";
import { DEFAULT_ADDRESS_LABEL } from "@/lib/constants";

export default function OrderCard(props: OrderCardProps) {
  const isAddressSelected = props.addressLabel !== DEFAULT_ADDRESS_LABEL;

  const addressSelectorProps = {
    isAddressOpen: props.isAddressOpen,
    setIsAddressOpen: props.setIsAddressOpen,
    addressMode: props.addressMode,
    setAddressMode: props.setAddressMode,
    addressLabel: props.addressLabel,
    manualAddress: props.manualAddress,
    setManualAddress: props.setManualAddress,
    mapStatus: props.mapStatus,
    mapContainerRef: props.mapContainerRef,
    setSelectedMapAddress: props.setSelectedMapAddress,
  };

  const stepOneProps = {
    selectedPackageId: props.selectedPackageId,
    setSelectedPackageId: props.setSelectedPackageId,
    selectedPrice: props.selectedPrice,
    addressSelected: isAddressSelected,
  };

  const stepTwoProps = {
    apartment: props.apartment,
    entrance: props.entrance,
    comment: props.comment,
    leaveAtDoor: props.leaveAtDoor,
    phone: props.phone,
    shouldCall: props.shouldCall,
    setApartment: props.setApartment,
    setEntrance: props.setEntrance,
    setComment: props.setComment,
    setLeaveAtDoor: props.setLeaveAtDoor,
    setPhone: props.setPhone,
    setShouldCall: props.setShouldCall,
  };

  const stepThreeProps = {
    paymentMethod: props.paymentMethod,
    tip: props.tip,
    customTip: props.customTip,
    total: props.total,
    packageLabel: props.selectedPrice.desc,
    apartment: props.apartment,
    entrance: props.entrance,
    setPaymentMethod: props.setPaymentMethod,
    setTip: props.setTip,
    setCustomTip: props.setCustomTip,
    submitStatus: props.submitStatus,
    submitMessage: props.submitMessage,
  };

  const goToStepOne = () => props.setOrderStep(1);
  const goToStepTwo = () => props.setOrderStep(2);
  const goToStepThree = () => props.setOrderStep(3);

  return (
    <div className="relative lg:flex lg:justify-end">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/30 lg:max-h-[calc(100vh-120px)] lg:w-[min(100%,680px)] lg:overflow-hidden lg:p-4">
        <div className="rounded-[1.75rem] border border-[#2c3807]/40 bg-[#1a2105] p-3 lg:h-full lg:overflow-hidden lg:p-4">
          <div className="mt-1 rounded-3xl border border-white/10 bg-[#17181a] p-3 lg:h-full lg:overflow-y-auto lg:p-4">
            <div className="space-y-3">
              {props.submitStatus !== "success" && (
                <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                      Заказ без звонков
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/75">
                      Цена видна заранее
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/75">
                      Пара минут на оформление
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/62">
                    Заполните форму по шагам — без сложной регистрации и лишних
                    действий. Сначала адрес и пакет, потом детали заказа.
                  </p>
                </div>
              )}

              {props.orderStep === 1 && (
                <AddressSelector {...addressSelectorProps} />
              )}

              {props.submitStatus === "success" ? (
                <SuccessStep
                  message={props.submitMessage}
                  onNewOrder={props.onResetAfterSuccess}
                />
              ) : props.orderStep === 1 ? (
                <StepOne {...stepOneProps} onContinue={goToStepTwo} />
              ) : props.orderStep === 2 ? (
                <StepTwo
                  {...stepTwoProps}
                  onBack={goToStepOne}
                  onContinue={goToStepThree}
                />
              ) : (
                <StepThree
                  {...stepThreeProps}
                  onBack={goToStepTwo}
                  onPay={props.onSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}