import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomerData } from "@/pages/Index";
import { User, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
  initialData: CustomerData | null;
}

const sourceOptions = [
  { value: "vacation", label: "Persons return for vacation from foreign employment" },
  { value: "relatives", label: "Relatives of those employees abroad" },
  { value: "tourists", label: "Foreign tourists (directly or through Tour Guides)" },
  { value: "unutilized", label: "Unutilized foreign currency obtained for travel purpose by residents" },
  { value: "other", label: "Other" },
];

export const CustomerForm = ({ onSubmit, initialData }: CustomerFormProps) => {
  const [formData, setFormData] = useState<CustomerData>(
    initialData || {
      name: "",
      idNumber: "",
      source: "",
      otherSource: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter customer name");
      return;
    }
    
    if (!formData.idNumber.trim()) {
      toast.error("Please enter NIC/Passport number");
      return;
    }
    
    if (!formData.source) {
      toast.error("Please select source of foreign currency");
      return;
    }
    
    if (formData.source === "other" && !formData.otherSource?.trim()) {
      toast.error("Please specify other source");
      return;
    }

    onSubmit(formData);
    toast.success("Customer information saved");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Customer Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Name of the Customer *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber" className="text-sm font-medium flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            NIC/Passport No *
          </Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
            placeholder="Enter NIC or Passport number"
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Source of Foreign Currency *</Label>
        <RadioGroup
          value={formData.source}
          onValueChange={(value) => setFormData({ ...formData, source: value })}
        >
          <div className="space-y-3">
            {sourceOptions.map((option) => (
              <div key={option.value} className="flex items-start space-x-3">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label
                  htmlFor={option.value}
                  className="font-normal cursor-pointer leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        {formData.source === "other" && (
          <div className="mt-3 ml-6">
            <Input
              value={formData.otherSource || ""}
              onChange={(e) => setFormData({ ...formData, otherSource: e.target.value })}
              placeholder="Please specify the source"
              className="h-11"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
        >
          Continue to Exchange
        </Button>
      </div>
    </form>
  );
};
