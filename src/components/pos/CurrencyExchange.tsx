import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExchangeData, CustomerData } from "@/pages/Index";
import { Plus, Trash2, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

interface CurrencyExchangeProps {
  onSubmit: (data: ExchangeData[]) => void;
  customerData: CustomerData;
}

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
];

export const CurrencyExchange = ({ onSubmit, customerData }: CurrencyExchangeProps) => {
  const [exchanges, setExchanges] = useState<ExchangeData[]>([
    {
      currencyType: "",
      amountReceived: "",
      rateOffered: "",
      amountIssued: "",
    },
  ]);

  const addExchange = () => {
    setExchanges([
      ...exchanges,
      {
        currencyType: "",
        amountReceived: "",
        rateOffered: "",
        amountIssued: "",
      },
    ]);
  };

  const removeExchange = (index: number) => {
    if (exchanges.length > 1) {
      setExchanges(exchanges.filter((_, i) => i !== index));
    }
  };

  const updateExchange = (index: number, field: keyof ExchangeData, value: string) => {
    const updated = [...exchanges];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-calculate amount issued when amount received and rate are present
    if (field === "amountReceived" || field === "rateOffered") {
      const amount = parseFloat(updated[index].amountReceived);
      const rate = parseFloat(updated[index].rateOffered);
      if (!isNaN(amount) && !isNaN(rate)) {
        updated[index].amountIssued = (amount * rate).toFixed(2);
      }
    }

    setExchanges(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all exchanges
    for (let i = 0; i < exchanges.length; i++) {
      const ex = exchanges[i];
      if (!ex.currencyType) {
        toast.error(`Please select currency type for exchange ${i + 1}`);
        return;
      }
      if (!ex.amountReceived || parseFloat(ex.amountReceived) <= 0) {
        toast.error(`Please enter valid amount for exchange ${i + 1}`);
        return;
      }
      if (!ex.rateOffered || parseFloat(ex.rateOffered) <= 0) {
        toast.error(`Please enter valid rate for exchange ${i + 1}`);
        return;
      }
    }

    onSubmit(exchanges);
    toast.success("Transaction completed successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-accent" />
          Currency Exchange
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customer: <span className="font-medium text-foreground">{customerData.name}</span>
        </p>
      </div>

      <div className="space-y-4">
        {exchanges.map((exchange, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border-2 border-border bg-muted/30 space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Exchange {index + 1}</h3>
              {exchanges.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExchange(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`currency-${index}`}>Currency Type *</Label>
                <Select
                  value={exchange.currencyType}
                  onValueChange={(value) => updateExchange(index, "currencyType", value)}
                >
                  <SelectTrigger id={`currency-${index}`} className="h-11">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`amount-${index}`}>Amount Received *</Label>
                <Input
                  id={`amount-${index}`}
                  type="number"
                  step="0.01"
                  value={exchange.amountReceived}
                  onChange={(e) => updateExchange(index, "amountReceived", e.target.value)}
                  placeholder="0.00"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`rate-${index}`}>Rate (LKR) *</Label>
                <Input
                  id={`rate-${index}`}
                  type="number"
                  step="0.01"
                  value={exchange.rateOffered}
                  onChange={(e) => updateExchange(index, "rateOffered", e.target.value)}
                  placeholder="0.00"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`issued-${index}`}>Amount Issued (LKR)</Label>
                <Input
                  id={`issued-${index}`}
                  type="number"
                  step="0.01"
                  value={exchange.amountIssued}
                  onChange={(e) => updateExchange(index, "amountIssued", e.target.value)}
                  placeholder="0.00"
                  className="h-11 bg-accent/10"
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={addExchange}
          className="border-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Exchange
        </Button>

        <Button
          type="submit"
          size="lg"
          className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:from-accent/90 hover:to-accent font-semibold"
        >
          Generate Receipt
        </Button>
      </div>
    </form>
  );
};
