export interface LanguageItem {
  language: string;
  level: string;
}

export interface EditorialCredential {
  id: string;
  category: string;
  headline?: string;
  details?: string;
  languageItems?: LanguageItem[];
  actionType?: "diplomas" | "certificates";
  actionLabel?: string;
  hasDiplomaAction?: boolean;
  title?: string;
  subtitle?: string;
  badge?: string;
  period?: string;
  description?: string;
}

export const credentials: EditorialCredential[] = [
  {
    id: "status-location",
    category: "Status & Location",
    headline: "EU Citizen · Berlin, Germany",
    details: "Immediate worldwide relocation & open to remote roles.",
  },
  {
    id: "education",
    category: "Education",
    headline: "Universidad ORT Uruguay",
    details: "Triple Degree: IT Analyst, Systems Analyst & Web Developer.",
    actionType: "diplomas",
    actionLabel: "View certificates",
    hasDiplomaAction: true,
  },
  {
    id: "languages",
    category: "Languages",
    headline: "Spanish (Native) · English (Professional working proficiency) · German (Elementary proficiency).",
    details: "Spanish (Native) · English (Professional working proficiency) · German (Elementary proficiency).",
    languageItems: [
      { language: "Spanish", level: "Native" },
      { language: "English", level: "Professional working proficiency" },
      { language: "German", level: "Elementary proficiency" },
    ],
    actionType: "certificates",
    actionLabel: "View certificates",
  },
];

// Compatibility exports
export type CredentialRow = EditorialCredential;
export type Metric = EditorialCredential;
export const credentialRows = credentials;
export const metrics = credentials;
