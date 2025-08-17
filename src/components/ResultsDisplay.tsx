import { motion, AnimatePresence } from "framer-motion";
import { CargoSpaceResults } from "./results/CargoSpaceResults";
import { BookingResults } from "./results/BookingResults";
import { BillsOfLadingResults } from "./results/BillsOfLadingResults";
import { TrackingResults } from "./results/TrackingResults";

interface ResultsDisplayProps {
  activeTab: string;
  searchQuery: string;
  onPreviewDocument: (document: any) => void;
}

export const ResultsDisplay = ({ activeTab, searchQuery, onPreviewDocument }: ResultsDisplayProps) => {
  const renderResults = () => {
    switch (activeTab) {
      case "cargo-space":
        return <CargoSpaceResults searchQuery={searchQuery} />;
      case "bookings":
        return <BookingResults searchQuery={searchQuery} onPreviewDocument={onPreviewDocument} />;
      case "bills-lading":
        return <BillsOfLadingResults searchQuery={searchQuery} onPreviewDocument={onPreviewDocument} />;
      case "tracking":
        return <TrackingResults searchQuery={searchQuery} />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="mt-8 min-h-[400px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderResults()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};