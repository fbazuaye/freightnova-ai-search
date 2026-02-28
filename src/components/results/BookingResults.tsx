import { useMemo } from "react";
import { motion } from "framer-motion";
import { Package, Calendar, Download, Eye, CheckCircle2, Clock, AlertCircle, SearchX } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { extractSearchTerms, matchesSearch } from "@/lib/searchUtils";
import { exportToExcel } from "@/lib/excelExport";

interface BookingResultsProps {
  searchQuery: string;
  onPreviewDocument: (document: any) => void;
}

const mockBookings = [
  {
    id: "BK001234",
    customer: "ABC Ltd",
    reference: "ABC-SEP-2024-001",
    vessel: "MSC IRINA",
    route: "Shanghai → Lagos",
    bookingDate: "2024-09-15",
    etd: "2024-09-20",
    containers: 3,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-15",
    title: "Booking Confirmation - ABC Ltd"
  },
  {
    id: "BK001235",
    customer: "ABC Ltd",
    reference: "ABC-SEP-2024-002",
    vessel: "COSCO PRIDE",
    route: "Shanghai → Lagos",
    bookingDate: "2024-09-18",
    etd: "2024-09-22",
    containers: 2,
    status: "Pending",
    type: "Booking Confirmation",
    date: "2024-09-18",
    title: "Booking Confirmation - ABC Ltd"
  },
  {
    id: "BK001236",
    customer: "Global Imports Inc",
    reference: "GII-SEP-2024-003",
    vessel: "MSC MEDITERRANEAN",
    route: "Shanghai → Lagos",
    bookingDate: "2024-09-08",
    etd: "2024-09-14",
    containers: 2,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-08",
    title: "Booking Confirmation - Global Imports Inc"
  },
  {
    id: "BK001237",
    customer: "West Africa Trading Ltd",
    reference: "WAT-SEP-2024-001",
    vessel: "CMA CGM MARCO POLO",
    route: "Ningbo → Durban",
    bookingDate: "2024-09-03",
    etd: "2024-09-06",
    containers: 3,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-03",
    title: "Booking Confirmation - West Africa Trading Ltd"
  },
  {
    id: "BK001238",
    customer: "EuroAfrica Commodities",
    reference: "EAC-AUG-2024-005",
    vessel: "HAPAG LLOYD BERLIN",
    route: "Rotterdam → Tema",
    bookingDate: "2024-08-18",
    etd: "2024-08-21",
    containers: 1,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-08-18",
    title: "Booking Confirmation - EuroAfrica Commodities"
  },
  {
    id: "BK001239",
    customer: "Pacific Orient Shipping",
    reference: "POS-SEP-2024-002",
    vessel: "OOCL HONG KONG",
    route: "Busan → Felixstowe",
    bookingDate: "2024-09-01",
    etd: "2024-09-04",
    containers: 2,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-01",
    title: "Booking Confirmation - Pacific Orient Shipping"
  },
  {
    id: "BK001240",
    customer: "Nairobi Freight Solutions",
    reference: "NFS-SEP-2024-001",
    vessel: "MAERSK EDINBURGH",
    route: "Antwerp → Mombasa",
    bookingDate: "2024-09-18",
    etd: "2024-09-21",
    containers: 4,
    status: "Pending",
    type: "Booking Confirmation",
    date: "2024-09-18",
    title: "Booking Confirmation - Nairobi Freight Solutions"
  },
  {
    id: "BK001241",
    customer: "Arabian Gulf Traders",
    reference: "AGT-SEP-2024-003",
    vessel: "EVERGREEN TRIUMPH",
    route: "Yokohama → Jeddah",
    bookingDate: "2024-09-06",
    etd: "2024-09-09",
    containers: 2,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-06",
    title: "Booking Confirmation - Arabian Gulf Traders"
  },
  {
    id: "BK001242",
    customer: "Tanzania Import Corp",
    reference: "TIC-SEP-2024-001",
    vessel: "YANG MING UNITY",
    route: "Kaohsiung → Dar es Salaam",
    bookingDate: "2024-09-08",
    etd: "2024-09-11",
    containers: 1,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-08",
    title: "Booking Confirmation - Tanzania Import Corp"
  },
  {
    id: "BK001243",
    customer: "Brasil Importações Ltda",
    reference: "BIL-SEP-2024-001",
    vessel: "ZIM PACIFIC",
    route: "Colombo → Santos",
    bookingDate: "2024-09-04",
    etd: "2024-09-07",
    containers: 3,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-04",
    title: "Booking Confirmation - Brasil Importações Ltda"
  },
  {
    id: "BK001244",
    customer: "Cartagena Supplies SA",
    reference: "CSA-SEP-2024-002",
    vessel: "ONE COLUMBA",
    route: "Los Angeles → Cartagena",
    bookingDate: "2024-09-10",
    etd: "2024-09-13",
    containers: 1,
    status: "Cancelled",
    type: "Booking Confirmation",
    date: "2024-09-10",
    title: "Booking Confirmation - Cartagena Supplies SA"
  },
  {
    id: "BK001245",
    customer: "Hellenic Freight Group",
    reference: "HFG-AUG-2024-004",
    vessel: "COSCO SHIPPING GEMINI",
    route: "Qingdao → Piraeus",
    bookingDate: "2024-08-16",
    etd: "2024-08-19",
    containers: 2,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-08-16",
    title: "Booking Confirmation - Hellenic Freight Group"
  },
  {
    id: "BK001246",
    customer: "Horn of Africa Trading",
    reference: "HAT-SEP-2024-001",
    vessel: "SEALAND ILLINOIS",
    route: "Mundra → Djibouti",
    bookingDate: "2024-09-08",
    etd: "2024-09-11",
    containers: 1,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-08",
    title: "Booking Confirmation - Horn of Africa Trading"
  },
  {
    id: "BK001247",
    customer: "Southampton Maritime Ltd",
    reference: "SML-SEP-2024-001",
    vessel: "MSC OSCAR",
    route: "Le Havre → Southampton",
    bookingDate: "2024-09-16",
    etd: "2024-09-19",
    containers: 1,
    status: "Pending",
    type: "Booking Confirmation",
    date: "2024-09-16",
    title: "Booking Confirmation - Southampton Maritime Ltd"
  },
  {
    id: "BK001248",
    customer: "Vancouver Pacific Imports",
    reference: "VPI-AUG-2024-003",
    vessel: "HAPAG LLOYD EXPRESS",
    route: "Shenzhen → Vancouver",
    bookingDate: "2024-08-26",
    etd: "2024-08-29",
    containers: 3,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-08-26",
    title: "Booking Confirmation - Vancouver Pacific Imports"
  },
  {
    id: "BK001249",
    customer: "Alexandria Import House",
    reference: "AIH-SEP-2024-001",
    vessel: "TURKON ISTANBUL",
    route: "Mersin → Alexandria",
    bookingDate: "2024-09-14",
    etd: "2024-09-17",
    containers: 1,
    status: "Amended",
    type: "Booking Confirmation",
    date: "2024-09-14",
    title: "Booking Confirmation - Alexandria Import House"
  },
  {
    id: "BK001250",
    customer: "Bangladesh Textile Corp",
    reference: "BTC-SEP-2024-002",
    vessel: "PIL CELESTIAL",
    route: "Chennai → Chittagong",
    bookingDate: "2024-09-10",
    etd: "2024-09-13",
    containers: 2,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-09-10",
    title: "Booking Confirmation - Bangladesh Textile Corp"
  },
  {
    id: "BK001251",
    customer: "Ivory Coast Agri Export",
    reference: "ICAE-SEP-2024-001",
    vessel: "WAN HAI 612",
    route: "Jakarta → Abidjan",
    bookingDate: "2024-09-11",
    etd: "2024-09-14",
    containers: 1,
    status: "Waitlisted",
    type: "Booking Confirmation",
    date: "2024-09-11",
    title: "Booking Confirmation - Ivory Coast Agri Export"
  },
  {
    id: "BK001252",
    customer: "Lagos General Merchandise",
    reference: "LGM-AUG-2024-006",
    vessel: "HYUNDAI DREAM",
    route: "Tianjin → Lagos",
    bookingDate: "2024-08-20",
    etd: "2024-08-23",
    containers: 2,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-08-20",
    title: "Booking Confirmation - Lagos General Merchandise"
  },
  {
    id: "BK001253",
    customer: "Togo Free Zone Enterprises",
    reference: "TFZE-AUG-2024-002",
    vessel: "K LINE FUTURE",
    route: "Genoa → Lome",
    bookingDate: "2024-08-23",
    etd: "2024-08-26",
    containers: 2,
    status: "Confirmed",
    type: "Booking Confirmation",
    date: "2024-08-23",
    title: "Booking Confirmation - Togo Free Zone Enterprises"
  }
];

export const BookingResults = ({ searchQuery, onPreviewDocument }: BookingResultsProps) => {
  const searchTerms = useMemo(() => extractSearchTerms(searchQuery), [searchQuery]);
  const filteredData = useMemo(() => 
    mockBookings.filter(b => matchesSearch(searchTerms, b.id, b.customer, b.reference, b.vessel, b.route)),
    [searchTerms]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Booking Confirmations</h2>
        <div className="text-sm text-muted-foreground">
          {filteredData.length} bookings found
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <SearchX className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">No matching bookings found</p>
          <p className="text-sm">Try a different booking ID, reference, or customer name</p>
        </div>
      ) : (
      <div className="grid gap-4">
        {filteredData.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="result-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-lg">{booking.customer}</div>
                    <div className="text-sm text-muted-foreground">Booking #{booking.id}</div>
                  </div>
                  <Badge variant={
                    booking.status === 'Confirmed' ? 'default' : 
                    booking.status === 'Cancelled' ? 'destructive' :
                    booking.status === 'Amended' ? 'outline' : 'secondary'
                  }>
                    {booking.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {booking.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                    {booking.status === 'Cancelled' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {booking.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Reference</div>
                    <div className="font-medium font-mono text-sm">{booking.reference}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Vessel & Route</div>
                    <div className="font-medium">{booking.vessel}</div>
                    <div className="text-sm text-muted-foreground">{booking.route}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Containers</div>
                    <div className="font-medium">{booking.containers} TEU</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Booked: {booking.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>ETD: {booking.etd}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onPreviewDocument({
                        ...booking,
                        details: {
                          booking_id: booking.id,
                          customer: booking.customer,
                          reference: booking.reference,
                          vessel: booking.vessel,
                          route: booking.route,
                          containers: `${booking.containers} TEU`,
                          booking_date: booking.bookingDate,
                          etd: booking.etd,
                          status: booking.status
                        }
                      })}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => exportToExcel([{
                      Booking_ID: booking.id,
                      Customer: booking.customer,
                      Reference: booking.reference,
                      Vessel: booking.vessel,
                      Route: booking.route,
                      Containers: `${booking.containers} TEU`,
                      Booking_Date: booking.bookingDate,
                      ETD: booking.etd,
                      Status: booking.status
                    }], `Booking_${booking.id}`)}>
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
