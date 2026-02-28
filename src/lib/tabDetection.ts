import { extractSearchTerms, matchesSearch } from "./searchUtils";

// Import mock data IDs for cross-dataset lookup
// We duplicate just the IDs/searchable fields here to avoid circular imports
// and keep the detection lightweight

interface DatasetEntry {
  searchFields: string[];
}

function buildTrackingIndex(): DatasetEntry[] {
  // Lazy-loaded from TrackingResults mock data
  return [
    { searchFields: ["TCLU9988776", "EVER GIVEN", "Red Sea", "Hamburg, Germany", "Port Harcourt, Nigeria"] },
    { searchFields: ["MSKU1234567", "MSC MEDITERRANEAN", "Port of Lagos", "Shanghai, China", "Lagos, Nigeria"] },
    { searchFields: ["CMAU4455881", "CMA CGM MARCO POLO", "Singapore Strait", "Ningbo, China", "Durban, South Africa"] },
    { searchFields: ["HLBU7712340", "HAPAG LLOYD BERLIN", "Tema Port, Ghana", "Rotterdam, Netherlands", "Tema, Ghana"] },
    { searchFields: ["OOLU5566332", "OOCL HONG KONG", "Suez Canal", "Busan, South Korea", "Felixstowe, UK"] },
    { searchFields: ["MAEU3344998", "MAERSK EDINBURGH", "Port of Antwerp", "Antwerp, Belgium", "Mombasa, Kenya"] },
    { searchFields: ["EISU8877221", "EVERGREEN TRIUMPH", "Strait of Malacca", "Yokohama, Japan", "Jeddah, Saudi Arabia"] },
    { searchFields: ["YMLU6633445", "YANG MING UNITY", "Port Klang, Malaysia", "Kaohsiung, Taiwan", "Dar es Salaam, Tanzania"] },
    { searchFields: ["ZIMU2299887", "ZIM PACIFIC", "Cape of Good Hope", "Colombo, Sri Lanka", "Santos, Brazil"] },
    { searchFields: ["ONEU1122334", "ONE COLUMBA", "Panama Canal", "Los Angeles, USA", "Cartagena, Colombia"] },
    { searchFields: ["CSLU9900112", "COSCO SHIPPING GEMINI", "Port of Piraeus, Greece", "Qingdao, China", "Piraeus, Greece"] },
    { searchFields: ["SEGU7788001", "SEALAND ILLINOIS", "Gulf of Aden", "Mundra, India", "Djibouti, Djibouti"] },
    { searchFields: ["MSCU4455667", "MSC OSCAR", "English Channel", "Le Havre, France", "Southampton, UK"] },
    { searchFields: ["HLXU3322110", "HAPAG LLOYD EXPRESS", "Waiting at Anchorage", "Shenzhen, China", "Vancouver, Canada"] },
    { searchFields: ["TRHU5544332", "TURKON ISTANBUL", "Mediterranean Sea", "Mersin, Turkey", "Alexandria, Egypt"] },
    { searchFields: ["PCIU8866554", "PIL CELESTIAL", "Bay of Bengal", "Chennai, India", "Chittagong, Bangladesh"] },
    { searchFields: ["WANU6677889", "WAN HAI 612", "Port of Tanjung Pelepas", "Jakarta, Indonesia", "Abidjan, Ivory Coast"] },
    { searchFields: ["KMTU3300998", "KMTC SINGAPORE", "East China Sea", "Incheon, South Korea", "Ho Chi Minh City, Vietnam"] },
    { searchFields: ["HDMU2211443", "HYUNDAI DREAM", "Apapa Port, Lagos", "Tianjin, China", "Lagos, Nigeria"] },
    { searchFields: ["KKFU9988001", "K LINE FUTURE", "Port of Lome, Togo", "Genoa, Italy", "Lome, Togo"] },
  ];
}

function buildBLIndex(): DatasetEntry[] {
  return [
    { searchFields: ["MSKU12345", "MSKU12345-BL-001", "Global Imports Inc", "MSKU1234567", "MSKU1234568"] },
    { searchFields: ["TCLU9988776", "TCLU9988776-BL-002", "Mega Logistics Co", "TCLU9988776"] },
    { searchFields: ["CMAU3344551", "CMAU3344551-BL-003", "West Africa Trading Ltd", "CMAU4455881", "CMAU4455882", "CMAU4455883"] },
    { searchFields: ["HLBU7700123", "HLBU7700123-BL-004", "EuroAfrica Commodities", "HLBU7712340"] },
    { searchFields: ["OOLU5500789", "OOLU5500789-BL-005", "Pacific Orient Shipping", "OOLU5566332", "OOLU5566333"] },
    { searchFields: ["MAEU3300456", "MAEU3300456-BL-006", "Nairobi Freight Solutions", "MAEU3344998", "MAEU3344999", "MAEU3345000", "MAEU3345001"] },
    { searchFields: ["EISU8800334", "EISU8800334-BL-007", "Arabian Gulf Traders", "EISU8877221", "EISU8877222"] },
    { searchFields: ["YMLU6600112", "YMLU6600112-BL-008", "Tanzania Import Corp", "YMLU6633445"] },
    { searchFields: ["ZIMU2200556", "ZIMU2200556-BL-009", "Brasil Importações Ltda", "ZIMU2299887", "ZIMU2299888", "ZIMU2299889"] },
    { searchFields: ["ONEU1100223", "ONEU1100223-BL-010", "Cartagena Supplies SA", "ONEU1122334"] },
    { searchFields: ["CSLU9900445", "CSLU9900445-BL-011", "Hellenic Freight Group", "CSLU9900112", "CSLU9900113"] },
    { searchFields: ["SEGU7700889", "SEGU7700889-BL-012", "Horn of Africa Trading", "SEGU7788001"] },
    { searchFields: ["MSCU4400778", "MSCU4400778-BL-013", "Southampton Maritime Ltd", "MSCU4455667"] },
    { searchFields: ["HLXU3300998", "HLXU3300998-BL-014", "Vancouver Pacific Imports", "HLXU3322110", "HLXU3322111", "HLXU3322112"] },
    { searchFields: ["TRHU5500221", "TRHU5500221-BL-015", "Alexandria Import House", "TRHU5544332"] },
    { searchFields: ["PCIU8800334", "PCIU8800334-BL-016", "Bangladesh Textile Corp", "PCIU8866554", "PCIU8866555"] },
    { searchFields: ["WANU6600556", "WANU6600556-BL-017", "Ivory Coast Agri Export", "WANU6677889"] },
    { searchFields: ["KMTU3300112", "KMTU3300112-BL-018", "Vietnam Machinery Import", "KMTU3300998"] },
    { searchFields: ["HDMU2200334", "HDMU2200334-BL-019", "Lagos General Merchandise", "HDMU2211443", "HDMU2211444"] },
    { searchFields: ["KKFU9900667", "KKFU9900667-BL-020", "Togo Free Zone Enterprises", "KKFU9988001", "KKFU9988002"] },
  ];
}

function buildBookingIndex(): DatasetEntry[] {
  return [
    { searchFields: ["BK001234", "ABC Ltd", "ABC-SEP-2024-001", "MSC IRINA", "Shanghai → Lagos"] },
    { searchFields: ["BK001235", "ABC Ltd", "ABC-SEP-2024-002", "COSCO PRIDE", "Shanghai → Lagos"] },
    { searchFields: ["BK001236", "Global Imports Inc", "GII-SEP-2024-003", "MSC MEDITERRANEAN", "Shanghai → Lagos"] },
    { searchFields: ["BK001237", "West Africa Trading Ltd", "WAT-SEP-2024-001", "CMA CGM MARCO POLO", "Ningbo → Durban"] },
    { searchFields: ["BK001238", "EuroAfrica Commodities", "EAC-AUG-2024-005", "HAPAG LLOYD BERLIN", "Rotterdam → Tema"] },
    { searchFields: ["BK001239", "Pacific Orient Shipping", "POS-SEP-2024-002", "OOCL HONG KONG", "Busan → Felixstowe"] },
    { searchFields: ["BK001240", "Nairobi Freight Solutions", "NFS-SEP-2024-001", "MAERSK EDINBURGH", "Antwerp → Mombasa"] },
    { searchFields: ["BK001241", "Arabian Gulf Traders", "AGT-SEP-2024-003", "EVERGREEN TRIUMPH", "Yokohama → Jeddah"] },
    { searchFields: ["BK001242", "Tanzania Import Corp", "TIC-SEP-2024-001", "YANG MING UNITY", "Kaohsiung → Dar es Salaam"] },
    { searchFields: ["BK001243", "Brasil Importações Ltda", "BIL-SEP-2024-001", "ZIM PACIFIC", "Colombo → Santos"] },
    { searchFields: ["BK001244", "Cartagena Supplies SA", "CSA-SEP-2024-002", "ONE COLUMBA", "Los Angeles → Cartagena"] },
    { searchFields: ["BK001245", "Hellenic Freight Group", "HFG-AUG-2024-004", "COSCO SHIPPING GEMINI", "Qingdao → Piraeus"] },
    { searchFields: ["BK001246", "Horn of Africa Trading", "HAT-SEP-2024-001", "SEALAND ILLINOIS", "Mundra → Djibouti"] },
    { searchFields: ["BK001247", "Southampton Maritime Ltd", "SML-SEP-2024-001", "MSC OSCAR", "Le Havre → Southampton"] },
    { searchFields: ["BK001248", "Vancouver Pacific Imports", "VPI-AUG-2024-003", "HAPAG LLOYD EXPRESS", "Shenzhen → Vancouver"] },
    { searchFields: ["BK001249", "Alexandria Import House", "AIH-SEP-2024-001", "TURKON ISTANBUL", "Mersin → Alexandria"] },
    { searchFields: ["BK001250", "Bangladesh Textile Corp", "BTC-SEP-2024-002", "PIL CELESTIAL", "Chennai → Chittagong"] },
    { searchFields: ["BK001251", "Ivory Coast Agri Export", "ICAE-SEP-2024-001", "WAN HAI 612", "Jakarta → Abidjan"] },
    { searchFields: ["BK001252", "Lagos General Merchandise", "LGM-AUG-2024-006", "HYUNDAI DREAM", "Tianjin → Lagos"] },
    { searchFields: ["BK001253", "Togo Free Zone Enterprises", "TFZE-AUG-2024-002", "K LINE FUTURE", "Genoa → Lome"] },
  ];
}

function hasMatch(terms: string[], dataset: DatasetEntry[]): boolean {
  return dataset.some(entry => matchesSearch(terms, ...entry.searchFields));
}

export function detectTab(query: string): string | null {
  const terms = extractSearchTerms(query);
  if (terms.length === 0) {
    // Fall back to keyword-based detection
    const lower = query.toLowerCase();
    if (lower.includes("space") || lower.includes("shanghai")) return "cargo-space";
    if (lower.includes("booking")) return "bookings";
    if (lower.includes("bill") || lower.includes("lading")) return "bills-lading";
    if (lower.includes("track") || lower.includes("container")) return "tracking";
    return null;
  }

  // Check datasets in priority order
  if (hasMatch(terms, buildTrackingIndex())) return "tracking";
  if (hasMatch(terms, buildBLIndex())) return "bills-lading";
  if (hasMatch(terms, buildBookingIndex())) return "bookings";

  // Keyword fallback
  const lower = query.toLowerCase();
  if (lower.includes("space") || lower.includes("shanghai")) return "cargo-space";
  if (lower.includes("booking")) return "bookings";
  if (lower.includes("bill") || lower.includes("lading")) return "bills-lading";
  if (lower.includes("track") || lower.includes("container")) return "tracking";

  return null;
}
