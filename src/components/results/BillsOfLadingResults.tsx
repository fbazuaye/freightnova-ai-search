import { useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Download, Eye, Truck, Ship, SearchX } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { extractSearchTerms, matchesSearch } from "@/lib/searchUtils";
import { exportToExcel } from "@/lib/excelExport";

interface BillsOfLadingResultsProps {
  searchQuery: string;
  onPreviewDocument: (document: any) => void;
}

const mockBLs = [
  {
    id: "MSKU12345",
    reference: "MSKU12345-BL-001",
    customer: "Global Imports Inc",
    vessel: "MSC MEDITERRANEAN",
    voyage: "424W",
    pol: "Shanghai, China",
    pod: "Lagos, Nigeria",
    issueDate: "2024-09-10",
    status: "Original",
    containers: ["MSKU1234567", "MSKU1234568"],
    type: "Bill of Lading",
    date: "2024-09-10",
    title: "Bill of Lading - MSKU12345"
  },
  {
    id: "TCLU9988776",
    reference: "TCLU9988776-BL-002",
    customer: "Mega Logistics Co",
    vessel: "EVER GIVEN",
    voyage: "321E",
    pol: "Hamburg, Germany",
    pod: "Port Harcourt, Nigeria",
    issueDate: "2024-09-08",
    status: "Telex Release",
    containers: ["TCLU9988776"],
    type: "Bill of Lading",
    date: "2024-09-08",
    title: "Bill of Lading - TCLU9988776"
  },
  {
    id: "CMAU3344551",
    reference: "CMAU3344551-BL-003",
    customer: "West Africa Trading Ltd",
    vessel: "CMA CGM MARCO POLO",
    voyage: "FA529W",
    pol: "Ningbo, China",
    pod: "Durban, South Africa",
    issueDate: "2024-09-05",
    status: "Surrendered",
    containers: ["CMAU4455881", "CMAU4455882", "CMAU4455883"],
    type: "Bill of Lading",
    date: "2024-09-05",
    title: "Bill of Lading - CMAU3344551"
  },
  {
    id: "HLBU7700123",
    reference: "HLBU7700123-BL-004",
    customer: "EuroAfrica Commodities",
    vessel: "HAPAG LLOYD BERLIN",
    voyage: "044S",
    pol: "Rotterdam, Netherlands",
    pod: "Tema, Ghana",
    issueDate: "2024-08-20",
    status: "Express Release",
    containers: ["HLBU7712340"],
    type: "Bill of Lading",
    date: "2024-08-20",
    title: "Bill of Lading - HLBU7700123"
  },
  {
    id: "OOLU5500789",
    reference: "OOLU5500789-BL-005",
    customer: "Pacific Orient Shipping",
    vessel: "OOCL HONG KONG",
    voyage: "018E",
    pol: "Busan, South Korea",
    pod: "Felixstowe, UK",
    issueDate: "2024-09-03",
    status: "Sea Waybill",
    containers: ["OOLU5566332", "OOLU5566333"],
    type: "Bill of Lading",
    date: "2024-09-03",
    title: "Sea Waybill - OOLU5500789"
  },
  {
    id: "MAEU3300456",
    reference: "MAEU3300456-BL-006",
    customer: "Nairobi Freight Solutions",
    vessel: "MAERSK EDINBURGH",
    voyage: "437S",
    pol: "Antwerp, Belgium",
    pod: "Mombasa, Kenya",
    issueDate: "2024-09-20",
    status: "Original",
    containers: ["MAEU3344998", "MAEU3344999", "MAEU3345000", "MAEU3345001"],
    type: "Bill of Lading",
    date: "2024-09-20",
    title: "Bill of Lading - MAEU3300456"
  },
  {
    id: "EISU8800334",
    reference: "EISU8800334-BL-007",
    customer: "Arabian Gulf Traders",
    vessel: "EVERGREEN TRIUMPH",
    voyage: "S089",
    pol: "Yokohama, Japan",
    pod: "Jeddah, Saudi Arabia",
    issueDate: "2024-09-08",
    status: "Telex Release",
    containers: ["EISU8877221", "EISU8877222"],
    type: "Bill of Lading",
    date: "2024-09-08",
    title: "Bill of Lading - EISU8800334"
  },
  {
    id: "YMLU6600112",
    reference: "YMLU6600112-BL-008",
    customer: "Tanzania Import Corp",
    vessel: "YANG MING UNITY",
    voyage: "YM321W",
    pol: "Kaohsiung, Taiwan",
    pod: "Dar es Salaam, Tanzania",
    issueDate: "2024-09-10",
    status: "Surrendered",
    containers: ["YMLU6633445"],
    type: "Bill of Lading",
    date: "2024-09-10",
    title: "Bill of Lading - YMLU6600112"
  },
  {
    id: "ZIMU2200556",
    reference: "ZIMU2200556-BL-009",
    customer: "Brasil Importações Ltda",
    vessel: "ZIM PACIFIC",
    voyage: "ZP045W",
    pol: "Colombo, Sri Lanka",
    pod: "Santos, Brazil",
    issueDate: "2024-09-06",
    status: "Express Release",
    containers: ["ZIMU2299887", "ZIMU2299888", "ZIMU2299889"],
    type: "Bill of Lading",
    date: "2024-09-06",
    title: "Bill of Lading - ZIMU2200556"
  },
  {
    id: "ONEU1100223",
    reference: "ONEU1100223-BL-010",
    customer: "Cartagena Supplies SA",
    vessel: "ONE COLUMBA",
    voyage: "ON112E",
    pol: "Los Angeles, USA",
    pod: "Cartagena, Colombia",
    issueDate: "2024-09-12",
    status: "Sea Waybill",
    containers: ["ONEU1122334"],
    type: "Bill of Lading",
    date: "2024-09-12",
    title: "Sea Waybill - ONEU1100223"
  },
  {
    id: "CSLU9900445",
    reference: "CSLU9900445-BL-011",
    customer: "Hellenic Freight Group",
    vessel: "COSCO SHIPPING GEMINI",
    voyage: "CS220E",
    pol: "Qingdao, China",
    pod: "Piraeus, Greece",
    issueDate: "2024-08-18",
    status: "Original",
    containers: ["CSLU9900112", "CSLU9900113"],
    type: "Bill of Lading",
    date: "2024-08-18",
    title: "Bill of Lading - CSLU9900445"
  },
  {
    id: "SEGU7700889",
    reference: "SEGU7700889-BL-012",
    customer: "Horn of Africa Trading",
    vessel: "SEALAND ILLINOIS",
    voyage: "SL087S",
    pol: "Mundra, India",
    pod: "Djibouti, Djibouti",
    issueDate: "2024-09-10",
    status: "Telex Release",
    containers: ["SEGU7788001"],
    type: "Bill of Lading",
    date: "2024-09-10",
    title: "Bill of Lading - SEGU7700889"
  },
  {
    id: "MSCU4400778",
    reference: "MSCU4400778-BL-013",
    customer: "Southampton Maritime Ltd",
    vessel: "MSC OSCAR",
    voyage: "MO055W",
    pol: "Le Havre, France",
    pod: "Southampton, UK",
    issueDate: "2024-09-18",
    status: "Express Release",
    containers: ["MSCU4455667"],
    type: "Bill of Lading",
    date: "2024-09-18",
    title: "Bill of Lading - MSCU4400778"
  },
  {
    id: "HLXU3300998",
    reference: "HLXU3300998-BL-014",
    customer: "Vancouver Pacific Imports",
    vessel: "HAPAG LLOYD EXPRESS",
    voyage: "HLE202E",
    pol: "Shenzhen, China",
    pod: "Vancouver, Canada",
    issueDate: "2024-08-28",
    status: "Original",
    containers: ["HLXU3322110", "HLXU3322111", "HLXU3322112"],
    type: "Bill of Lading",
    date: "2024-08-28",
    title: "Bill of Lading - HLXU3300998"
  },
  {
    id: "TRHU5500221",
    reference: "TRHU5500221-BL-015",
    customer: "Alexandria Import House",
    vessel: "TURKON ISTANBUL",
    voyage: "TI034S",
    pol: "Mersin, Turkey",
    pod: "Alexandria, Egypt",
    issueDate: "2024-09-16",
    status: "Surrendered",
    containers: ["TRHU5544332"],
    type: "Bill of Lading",
    date: "2024-09-16",
    title: "Bill of Lading - TRHU5500221"
  },
  {
    id: "PCIU8800334",
    reference: "PCIU8800334-BL-016",
    customer: "Bangladesh Textile Corp",
    vessel: "PIL CELESTIAL",
    voyage: "PC078E",
    pol: "Chennai, India",
    pod: "Chittagong, Bangladesh",
    issueDate: "2024-09-12",
    status: "Sea Waybill",
    containers: ["PCIU8866554", "PCIU8866555"],
    type: "Bill of Lading",
    date: "2024-09-12",
    title: "Sea Waybill - PCIU8800334"
  },
  {
    id: "WANU6600556",
    reference: "WANU6600556-BL-017",
    customer: "Ivory Coast Agri Export",
    vessel: "WAN HAI 612",
    voyage: "WH612S",
    pol: "Jakarta, Indonesia",
    pod: "Abidjan, Ivory Coast",
    issueDate: "2024-09-13",
    status: "Telex Release",
    containers: ["WANU6677889"],
    type: "Bill of Lading",
    date: "2024-09-13",
    title: "Bill of Lading - WANU6600556"
  },
  {
    id: "KMTU3300112",
    reference: "KMTU3300112-BL-018",
    customer: "Vietnam Machinery Import",
    vessel: "KMTC SINGAPORE",
    voyage: "KS045E",
    pol: "Incheon, South Korea",
    pod: "Ho Chi Minh City, Vietnam",
    issueDate: "2024-09-15",
    status: "Express Release",
    containers: ["KMTU3300998"],
    type: "Bill of Lading",
    date: "2024-09-15",
    title: "Bill of Lading - KMTU3300112"
  },
  {
    id: "HDMU2200334",
    reference: "HDMU2200334-BL-019",
    customer: "Lagos General Merchandise",
    vessel: "HYUNDAI DREAM",
    voyage: "HD099W",
    pol: "Tianjin, China",
    pod: "Lagos, Nigeria",
    issueDate: "2024-08-22",
    status: "Original",
    containers: ["HDMU2211443", "HDMU2211444"],
    type: "Bill of Lading",
    date: "2024-08-22",
    title: "Bill of Lading - HDMU2200334"
  },
  {
    id: "KKFU9900667",
    reference: "KKFU9900667-BL-020",
    customer: "Togo Free Zone Enterprises",
    vessel: "K LINE FUTURE",
    voyage: "KF015S",
    pol: "Genoa, Italy",
    pod: "Lome, Togo",
    issueDate: "2024-08-25",
    status: "Surrendered",
    containers: ["KKFU9988001", "KKFU9988002"],
    type: "Bill of Lading",
    date: "2024-08-25",
    title: "Bill of Lading - KKFU9900667"
  }
];

export const BillsOfLadingResults = ({ searchQuery, onPreviewDocument }: BillsOfLadingResultsProps) => {
  const searchTerms = useMemo(() => extractSearchTerms(searchQuery), [searchQuery]);
  const filteredData = useMemo(() => 
    mockBLs.filter(bl => matchesSearch(searchTerms, bl.id, bl.reference, bl.customer, ...bl.containers)),
    [searchTerms]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Bills of Lading</h2>
        <div className="text-sm text-muted-foreground">
          {filteredData.length} documents found
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <SearchX className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">No matching Bills of Lading found</p>
          <p className="text-sm">Try a different B/L number, reference, or customer name</p>
        </div>
      ) : (
      <div className="grid gap-4">
        {filteredData.map((bl, index) => (
          <motion.div
            key={bl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="result-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-lg">B/L #{bl.id}</div>
                    <div className="text-sm text-muted-foreground">{bl.customer}</div>
                  </div>
                  <Badge variant={
                    bl.status === 'Original' ? 'default' : 
                    bl.status === 'Surrendered' ? 'destructive' :
                    bl.status === 'Sea Waybill' ? 'outline' : 'secondary'
                  }>
                    {bl.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Vessel / Voyage</div>
                    <div className="font-medium">{bl.vessel}</div>
                    <div className="text-sm text-muted-foreground">Voyage {bl.voyage}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Port of Loading</div>
                      <div className="font-medium text-sm">{bl.pol}</div>
                    </div>
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <Ship className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Port of Discharge</div>
                    <div className="font-medium text-sm">{bl.pod}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">Containers</div>
                  <div className="flex flex-wrap gap-2">
                    {bl.containers.map((container) => (
                      <Badge key={container} variant="outline" className="font-mono text-xs">
                        {container}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Issued: {bl.issueDate}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onPreviewDocument({
                        ...bl,
                        details: {
                          bl_number: bl.id,
                          customer: bl.customer,
                          status: bl.status,
                          vessel_voyage: `${bl.vessel} / ${bl.voyage}`,
                          port_of_loading: bl.pol,
                          port_of_discharge: bl.pod,
                          containers: bl.containers.join(', '),
                          issue_date: bl.issueDate
                        }
                      })}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => exportToExcel([{
                      BL_Number: bl.id,
                      Reference: bl.reference,
                      Customer: bl.customer,
                      Vessel: bl.vessel,
                      Voyage: bl.voyage,
                      POL: bl.pol,
                      POD: bl.pod,
                      Issue_Date: bl.issueDate,
                      Status: bl.status,
                      Containers: bl.containers.join(', ')
                    }], `BL_${bl.id}`)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}
    </div>
  );
};
