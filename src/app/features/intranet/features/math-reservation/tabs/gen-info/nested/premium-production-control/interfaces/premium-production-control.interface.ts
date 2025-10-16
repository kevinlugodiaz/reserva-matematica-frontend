export interface PremiumProductionControl {
  benefits: Benefit[];
  total: Benefit;
}

interface Benefit {
  description: string;
  currency: string;
  premiumIssued: number;
  accountingPremium: number;
  difference: number;
}
