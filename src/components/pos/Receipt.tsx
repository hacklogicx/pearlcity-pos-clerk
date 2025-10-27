import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CustomerData, ExchangeData } from "@/pages/Index";
import { Printer, FileText, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ReceiptProps {
  customerData: CustomerData;
  exchangeData: ExchangeData[];
  onNewTransaction: () => void;
}

const sourceLabels: Record<string, string> = {
  vacation: "Persons return for vacation from foreign employment",
  relatives: "Relatives of those employees abroad",
  tourists: "Foreign tourists (directly or through Tour Guides)",
  unutilized: "Unutilized foreign currency obtained for travel purpose by residents",
  other: "Other",
};

export const Receipt = ({ customerData, exchangeData, onNewTransaction }: ReceiptProps) => {
  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const totalAmount = exchangeData.reduce(
    (sum, ex) => sum + parseFloat(ex.amountIssued || "0"),
    0
  );

  return (
    <div className="space-y-6">
      <Card className="p-8 shadow-2xl print:shadow-none" id="receipt">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center border-b-2 border-primary pb-6">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-4 px-6 rounded-lg mb-4">
              <h1 className="text-2xl font-bold">PEARL CITY HOTEL (PVT) LTD</h1>
              <p className="text-accent font-semibold mt-1">AUTHORIZED FOREIGN MONEY CHANGER</p>
              <p className="text-sm mt-2">17, Baudhaloka Mawatha, Colombo - 04</p>
              <p className="text-sm">Tel: 0114523800 (Auto Lines)</p>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
              <FileText className="h-5 w-5 text-primary" />
              CUSTOMER RECEIPT
            </div>
          </div>

          {/* Receipt Details */}
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Serial No:</p>
              <p className="font-mono font-semibold">{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date:</p>
              <p className="font-semibold">{new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-3 border-t pt-4">
            <h3 className="font-semibold text-foreground">Customer Information</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex">
                <span className="text-muted-foreground w-40">Name:</span>
                <span className="font-medium">{customerData.name}</span>
              </div>
              <div className="flex">
                <span className="text-muted-foreground w-40">NIC/Passport No:</span>
                <span className="font-medium">{customerData.idNumber}</span>
              </div>
              <div className="flex">
                <span className="text-muted-foreground w-40">Source of Currency:</span>
                <span className="font-medium">
                  {customerData.source === "other"
                    ? customerData.otherSource
                    : sourceLabels[customerData.source]}
                </span>
              </div>
            </div>
          </div>

          {/* Exchange Table */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-foreground mb-3">Transaction Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left py-2 font-semibold">Currency Type</th>
                    <th className="text-right py-2 font-semibold">Amount Received</th>
                    <th className="text-right py-2 font-semibold">Rate (LKR)</th>
                    <th className="text-right py-2 font-semibold">Amount Issued (LKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {exchangeData.map((exchange, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">{exchange.currencyType}</td>
                      <td className="text-right py-3">{parseFloat(exchange.amountReceived).toFixed(2)}</td>
                      <td className="text-right py-3">{parseFloat(exchange.rateOffered).toFixed(2)}</td>
                      <td className="text-right py-3 font-semibold">
                        {parseFloat(exchange.amountIssued).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-primary font-bold text-base">
                    <td colSpan={3} className="py-3 text-right">Total Amount (LKR):</td>
                    <td className="text-right py-3 text-accent">{totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid md:grid-cols-2 gap-8 border-t pt-6 mt-6">
            <div>
              <div className="border-t-2 border-foreground/20 pt-2 mt-12">
                <p className="text-sm text-muted-foreground">Signature of the Customer</p>
              </div>
            </div>
            <div>
              <div className="border-t-2 border-foreground/20 pt-2 mt-12">
                <p className="text-sm text-muted-foreground">Signature and Stamp of Authorized Money Changer</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center print:hidden">
        <Button
          onClick={handlePrint}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
        >
          <Printer className="mr-2 h-5 w-5" />
          Print Receipt
        </Button>
        <Button
          onClick={onNewTransaction}
          variant="outline"
          size="lg"
          className="border-2"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          New Transaction
        </Button>
      </div>
    </div>
  );
};
