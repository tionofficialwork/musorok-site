import { DEFAULT_ADDRESS_LABEL } from "@/lib/constants";
import AddressSelector from "@/components/landing/AddressSelector";
import StepOne from "@/components/landing/StepOne";
import StepThree from "@/components/landing/StepThree";
import StepTwo from "@/components/landing/StepTwo";
import SuccessStep from "@/components/landing/SuccessStep";
import type { OrderCardProps } from "@/lib/types";

export default function OrderCard(props: OrderCardProps) {
  const isAddressSelected =
    props.addressLabel !== DEFAULT_ADDRESS_LABEL;  
	return (
    <div className="relative lg:flex lg:justify-end">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/30 lg:max-h-[calc(100vh-120px)] lg:w-[min(100%,680px)] lg:overflow-hidden lg:p-4">
        <div className="rounded-[1.75rem] border border-[#2c3807]/40 bg-[#1a2105] p-3 lg:h-full lg:overflow-hidden lg:p-4">
          <div className="mt-1 rounded-3xl border border-white/10 bg-[#17181a] p-3 lg:h-full lg:overflow-y-auto lg:p-4">
            <div className="space-y-3">
              {props.orderStep === 1 && (
                <AddressSelector
                  isAddressOpen={props.isAddressOpen}
                  setIsAddressOpen={props.setIsAddressOpen}
                  addressMode={props.addressMode}
                  setAddressMode={props.setAddressMode}
                  addressLabel={props.addressLabel}
                  manualAddress={props.manualAddress}
                  setManualAddress={props.setManualAddress}
                  mapStatus={props.mapStatus}
                  mapContainerRef={props.mapContainerRef}
                  setSelectedMapAddress={props.setSelectedMapAddress}
                />
              )}

              {props.submitStatus === "success" ? (
                <SuccessStep
                  message={props.submitMessage}
                  onNewOrder={props.onResetAfterSuccess}
                />
              ) : props.orderStep === 1 ? (
                <StepOne
  			selectedPackageId={props.selectedPackageId}
  			setSelectedPackageId={props.setSelectedPackageId}
  			selectedPrice={props.selectedPrice}
  			addressSelected={isAddressSelected}
  			onContinue={() => props.setOrderStep(2)}
		/>
              ) : props.orderStep === 2 ? (
                <StepTwo
                  apartment={props.apartment}
                  entrance={props.entrance}
                  comment={props.comment}
                  leaveAtDoor={props.leaveAtDoor}
                  phone={props.phone}
                  shouldCall={props.shouldCall}
                  setApartment={props.setApartment}
                  setEntrance={props.setEntrance}
                  setComment={props.setComment}
                  setLeaveAtDoor={props.setLeaveAtDoor}
                  setPhone={props.setPhone}
                  setShouldCall={props.setShouldCall}
                  onBack={() => props.setOrderStep(1)}
                  onContinue={() => props.setOrderStep(3)}
                />
              ) : (
                <StepThree
                  paymentMethod={props.paymentMethod}
                  tip={props.tip}
                  customTip={props.customTip}
                  total={props.total}
                  packageLabel={props.selectedPrice.desc}
                  apartment={props.apartment}
                  entrance={props.entrance}
                  setPaymentMethod={props.setPaymentMethod}
                  setTip={props.setTip}
                  setCustomTip={props.setCustomTip}
                  onBack={() => props.setOrderStep(2)}
                  onPay={props.onSubmit}
                  submitStatus={props.submitStatus}
                  submitMessage={props.submitMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}