import { Landmark } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-elegant">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Landmark className="h-8 w-8 text-accent" />
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              PEARL CITY HOTEL (PVT) LTD
            </h1>
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm md:text-base font-medium text-accent">
            AUTHORIZED FOREIGN MONEY CHANGER
          </p>
          <p className="text-xs md:text-sm opacity-90">
            17, Baudhaloka Mawatha, Colombo - 04
          </p>
          <p className="text-xs md:text-sm opacity-90">
            Tel: 0114523800 (Auto Lines)
          </p>
        </div>
      </div>
    </header>
  );
};
