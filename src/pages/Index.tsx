import { useState } from "react";
import { Header } from "@/components/pos/Header";
import { CustomerForm } from "@/components/pos/CustomerForm";
import { CurrencyExchange } from "@/components/pos/CurrencyExchange";
import { Receipt } from "@/components/pos/Receipt";
import { Card } from "@/components/ui/card";

export interface CustomerData {
  name: string;
  idNumber: string;
  source: string;
  otherSource?: string;
}

export interface ExchangeData {
  currencyType: string;
  amountReceived: string;
  rateOffered: string;
  amountIssued: string;
}

const Index = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [exchangeData, setExchangeData] = useState<ExchangeData[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleCustomerSubmit = (data: CustomerData) => {
    setCustomerData(data);
  };

  const handleExchangeSubmit = (data: ExchangeData[]) => {
    setExchangeData(data);
    setShowReceipt(true);
  };

  const handleNewTransaction = () => {
    setCustomerData(null);
    setExchangeData([]);
    setShowReceipt(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!showReceipt ? (
          <div className="space-y-6">
            <Card className="p-6 shadow-lg">
              <CustomerForm 
                onSubmit={handleCustomerSubmit}
                initialData={customerData}
              />
            </Card>

            {customerData && (
              <Card className="p-6 shadow-lg">
                <CurrencyExchange 
                  onSubmit={handleExchangeSubmit}
                  customerData={customerData}
                />
              </Card>
            )}
          </div>
        ) : (
          <Receipt
            customerData={customerData!}
            exchangeData={exchangeData}
            onNewTransaction={handleNewTransaction}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
