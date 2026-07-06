import { TransactionFormProvider } from "@/context/TransactionFormContext";

export default function NewTransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TransactionFormProvider>{children}</TransactionFormProvider>;
}
