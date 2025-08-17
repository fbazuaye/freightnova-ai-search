import { motion } from "framer-motion";
import { Ship, Calendar, MapPin, Anchor } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface CargoSpaceResultsProps {
  searchQuery: string;
}

const mockCargoData = [
  {
    id: 1,
    carrier: "MSC",
    vessel: "MSC IRINA",
    route: "Shanghai → Lagos",
    etd: "2024-09-20",
    eta: "2024-10-25",
    transitTime: "35 days",
    availableSlots: 45,
    price: "$1,850",
    status: "Available"
  },
  {
    id: 2,
    carrier: "COSCO",
    vessel: "COSCO PRIDE",
    route: "Shanghai → Lagos", 
    etd: "2024-09-22",
    eta: "2024-10-28",
    transitTime: "36 days",
    availableSlots: 23,
    price: "$1,790",
    status: "Limited"
  },
  {
    id: 3,
    carrier: "CMA CGM",
    vessel: "CMA CGM MARCO POLO",
    route: "Shanghai → Lagos",
    etd: "2024-09-24",
    eta: "2024-10-30",
    transitTime: "36 days", 
    availableSlots: 67,
    price: "$1,920",
    status: "Available"
  }
];

export const CargoSpaceResults = ({ searchQuery }: CargoSpaceResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Available Cargo Space</h2>
        <div className="text-sm text-muted-foreground">
          {mockCargoData.length} results found
        </div>
      </div>

      <div className="grid gap-4">
        {mockCargoData.map((cargo, index) => (
          <motion.div
            key={cargo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="result-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Ship className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold text-lg">{cargo.carrier}</div>
                      <div className="text-sm text-muted-foreground">{cargo.vessel}</div>
                    </div>
                  </div>
                  <Badge variant={cargo.status === 'Available' ? 'default' : 'secondary'}>
                    {cargo.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Route</div>
                      <div className="font-medium">{cargo.route}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">ETD / ETA</div>
                      <div className="font-medium text-sm">{cargo.etd} / {cargo.eta}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Transit Time</div>
                      <div className="font-medium">{cargo.transitTime}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Available TEU</div>
                    <div className="font-medium">{cargo.availableSlots} slots</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{cargo.price}</span>
                    <span className="text-sm text-muted-foreground">per TEU</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary-hover">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};