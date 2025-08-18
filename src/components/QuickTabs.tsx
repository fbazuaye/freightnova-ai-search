import { motion } from "framer-motion";
import { Ship, Package, FileText, MapPin } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface QuickTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [];

export const QuickTabs = ({ activeTab, onTabChange }: QuickTabsProps) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-4 sm:px-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <span className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};