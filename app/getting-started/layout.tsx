import { SignupFormProvider } from "@/context/SignupFormContext";

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SignupFormProvider>{children}</SignupFormProvider>;
}
