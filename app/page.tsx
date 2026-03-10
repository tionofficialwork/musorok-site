"use client";

import { useEffect } from "react";
import Header from "@/components/landing/Header";
import HeroCopy from "@/components/landing/HeroCopy";
import OrderCard from "@/components/landing/OrderCard";
import AudienceOfferSection from "@/components/landing/AudienceOfferSection";
import FaqSection from "@/components/landing/FaqSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricesSection from "@/components/landing/PricesSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import FloatingButtons from "@/components/landing/FloatingButtons";
import { useYandexMap } from "@/hooks/useYandexMap";
import { useOrderForm } from "@/hooks/useOrderForm";
import { YANDEX_MAPS_API_KEY } from "@/lib/constants";

export default function Home() {
  const {
    showTopButton,
    setShowTopButton,
    isAddressOpen,
    setIsAddressOpen,
    addressMode,
    setAddressMode,
    manualAddress,
    setManualAddress,
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
    submitMessage,
    total,
    addressLabel,
    resetOrderForm,
    handleCreateOrder,
  } = useOrderForm();

  const { mapContainerRef } = useYandexMap({
    isEnabled: isAddressOpen && addressMode === "map",
    apiKey: YANDEX_MAPS_API_KEY,
    onStatusChange: setMapStatus,
    onAddressSelect: (address) => {
      setSelectedMapAddress(address);
      setIsAddressOpen(false);
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setShowTopButton]);

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
              setApartment={setApartment}
              setEntrance={setEntrance}
              setComment={setComment}
              setLeaveAtDoor={setLeaveAtDoor}
              setPhone={setPhone}
              setShouldCall={setShouldCall}
              setPaymentMethod={setPaymentMethod}
              setTip={setTip}
              setCustomTip={setCustomTip}
              onSubmit={handleCreateOrder}
              onResetAfterSuccess={resetOrderForm}
              submitStatus={submitStatus}
              submitMessage={submitMessage}
            />
          </div>
        </section>

        <HowItWorksSection />

        <PricesSection
          selectedPackageId={selectedPackageId}
          setSelectedPackageId={setSelectedPackageId}
          setOrderStep={setOrderStep}
        />

        <AudienceOfferSection />
        <CtaSection />
        <FaqSection />
      </main>

      <Footer />
      <FloatingButtons showTopButton={showTopButton} />
    </div>
  );
}