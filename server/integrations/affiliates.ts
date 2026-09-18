export type AffiliateDestination = {
  id: string;
  label: string;
  href: string;
  disclosure: string;
  enabled: boolean;
};

export const affiliateDestinations: AffiliateDestination[] = [
  {
    id: "chaturbate",
    label: "Chaturbate",
    href: "https://chaturbate.com/",
    disclosure: "Collegamento esterno 18+. Red Velvet non ospita né replica i contenuti della piattaforma.",
    enabled: true,
  },
  {
    id: "stripchat",
    label: "Stripchat",
    href: "https://stripchat.com/",
    disclosure: "Collegamento esterno 18+. Verifica sempre termini, età e legalità nella tua giurisdizione.",
    enabled: true,
  },
];
