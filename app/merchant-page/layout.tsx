import { MerchantOnboardingProvider } from "@/context/MerchantOnboardingContext";

export default function MerchantPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MerchantOnboardingProvider>{children}</MerchantOnboardingProvider>;
}
