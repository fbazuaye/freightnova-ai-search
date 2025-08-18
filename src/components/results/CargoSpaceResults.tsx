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
    <div className="min-h-[400px]">
      {/* Empty space */}
    </div>
  );
};