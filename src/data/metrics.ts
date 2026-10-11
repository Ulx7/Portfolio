export interface Metric {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  period?: string;
  description: string;
  hasDiplomaAction?: boolean;
}

export const metrics: Metric[] = [
  {
    id: "eu-citizen",
    badge: "EU",
    title: "EU Citizen",
    subtitle: "Work Authorization",
    period: "Worldwide",
    description: "Full working rights with immediate relocation availability worldwide (No visa sponsorship required).",
  },
  {
    id: "berlin-hub",
    badge: "DE",
    title: "Berlin Tech Hub",
    subtitle: "Location",
    period: "Berlin, Germany",
    description: "Based in Berlin, Germany. Open to worldwide remote and on-site engineering roles.",
  },
  {
    id: "ort-degrees",
    badge: "ORT",
    title: "Universidad ORT Uruguay",
    subtitle: "Academic Formation",
    period: "Montevideo",
    description: "Triple Degree in IT Analyst, Systems Analyst & Web Development.",
    hasDiplomaAction: true,
  },
];
