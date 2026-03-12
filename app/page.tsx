"use client";

import { useEffect } from "react";
import AudienceOfferSection from "@/components/landing/AudienceOfferSection";
import CtaSection from "@/components/landing/CtaSection";
import FloatingButtons from "@/components/landing/FloatingButtons";
import Footer from "@/components/landing/Footer";
import FaqSection from "@/components/landing/FaqSection";
import Header from "@/components/landing/Header";
import HeroCopy from "@/components/landing/HeroCopy";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import OrderCard from "@/components/landing/OrderCard";
import PricesSection from "@/components/landing/PricesSection";
import { useOrderForm } from "@/hooks/useOrderForm";
import { useYandexMap } from "@/hooks/useYandexMap";
import { YANDEX_MAPS_API_KEY } from "@/lib/constants";

export default function Home() {
  const { ui, address, packageSelection, details, payment, submit } =
    useOrderForm();

  const { mapContainerRef } = useYandexMap({
    isEnabled: address.isAddressOpen && address.addressMode === "map",
    apiKey: YANDEX_MAPS_API_KEY,
    onStatusChange: address.setMapStatus,
    onAddressSelect: (addressValue) => {
      address.setSelectedMapAddress(addressValue);
      address.setIsAddressOpen(false);
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      ui.setShowTopButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ui]);

  const orderCardProps = {
    isAddressOpen: address.isAddressOpen,
    setIsAddressOpen: address.setIsAddressOpen,
    addressMode: address.addressMode,
    setAddressMode: address.setAddressMode,
    addressLabel: address.addressLabel,
    manualAddress: address.manualAddress,
    setManualAddress: address.setManualAddress,
    mapStatus: address.mapStatus,
    mapContainerRef,
    setSelectedMapAddress: address.setSelectedMapAddress,

    selectedPackageId: packageSelection.selectedPackageId,
    setSelectedPackageId: packageSelection.setSelectedPackageId,
    selectedPrice: packageSelection.selectedPrice,
    orderStep: packageSelection.orderStep,
    setOrderStep: packageSelection.setOrderStep,

    apartment: details.apartment,
    entrance: details.entrance,
    comment: details.comment,
    leaveAtDoor: details.leaveAtDoor,
    phone: details.phone,
    shouldCall: details.shouldCall,
    setApartment: details.setApartment,
    setEntrance: details.setEntrance,
    setComment: details.setComment,
    setLeaveAtDoor: details.setLeaveAtDoor,
    setPhone: details.setPhone,
    setShouldCall: details.setShouldCall,

    paymentMethod: payment.paymentMethod,
    tip: payment.tip,
    customTip: payment.customTip,
    total: payment.total,
    setPaymentMethod: payment.setPaymentMethod,
    setTip: payment.setTip,
    setCustomTip: payment.setCustomTip,

    onSubmit: submit.handleCreateOrder,
    onResetAfterSuccess: submit.resetOrderForm,
    submitStatus: submit.submitStatus,
    submitMessage: submit.submitMessage,
  };

  return (
    <div id="top" className="min-h-screen bg-[#0f1011] text-white">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8 lg:py-10">
            <HeroCopy />

            <div id="order" className="scroll-mt-24">
              <OrderCard {...orderCardProps} />
            </div>
          </div>
        </section>

        <HowItWorksSection />

        <PricesSection
          selectedPackageId={packageSelection.selectedPackageId}
          setSelectedPackageId={packageSelection.setSelectedPackageId}
          setOrderStep={packageSelection.setOrderStep}
        />

        <AudienceOfferSection />

        <FaqSection />

        <CtaSection />
      </main>

      <Footer />
      <FloatingButtons showTopButton={ui.showTopButton} />
    </div>
  );
}