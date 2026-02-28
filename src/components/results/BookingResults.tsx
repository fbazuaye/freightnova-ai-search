import { motion } from "framer-motion";
import { Package, Calendar, Download, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

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
  }
];

export const BookingResults = ({ searchQuery, onPreviewDocument }: BookingResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Booking Confirmations</h2>
        <div className="text-sm text-muted-foreground">
          {mockBookings.length} bookings found
        </div>
      </div>

      <div className="grid gap-4">
        {mockBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
                  <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>
                    {booking.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
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
                    <Button variant="outline" size="sm">
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
    </div>
  );
};