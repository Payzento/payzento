import React from "react";

const CODE_BLOCK = {
  language: "html",
  code: `<script src="https://cdn.payzento.com/v1/payzento.js"></script>
<script>
  const payzento = new Payzento('sk_live_abc123xyz789def456ghi');

  payzento.createCheckout({
    amount: 125000,
    currency: 'NGN',
    productName: 'Premium Package',
    description: 'Professional web design service',
    customerEmail: 'customer@example.com',
    onSuccess: (transaction) => {
      console.log('Payment successful:', transaction);
    },
    onClose: () => {
      console.log('Checkout closed');
    }
  });
</script>`,
};

const IntegrationCode = () => {
  const { code } = CODE_BLOCK;

  return (
    <pre
      style={{
        backgroundColor: "#0a1f44",
        color: "#00ff99", 
        fontSize: "14px",
        lineHeight: "1.6",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
      }}
    >
      {code}
    </pre>
  );
};

export default IntegrationCode;
