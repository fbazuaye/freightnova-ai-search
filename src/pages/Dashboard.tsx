import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { QuickTabs } from "../components/QuickTabs";
import { ResultsDisplay } from "../components/ResultsDisplay";
import { PreviewPanel } from "../components/PreviewPanel";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("cargo-space");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewDocument, setPreviewDocument] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Auto-detect search type and switch tab
    if (query.toLowerCase().includes("space") || query.toLowerCase().includes("shanghai")) {
      setActiveTab("cargo-space");
    } else if (query.toLowerCase().includes("booking") || query.toLowerCase().includes("abc")) {
      setActiveTab("bookings");
    } else if (query.toLowerCase().includes("bill") || query.toLowerCase().includes("lading") || query.toLowerCase().includes("msku") || query.toLowerCase().includes("tclu")) {
      setActiveTab("bills-lading");
    } else if (query.toLowerCase().includes("track") || query.toLowerCase().includes("container")) {
      setActiveTab("tracking");
    }
  };

  const handlePreviewDocument = (document: any) => {
    setPreviewDocument(document);
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <motion.header 
        className="py-4 sm:py-6 lg:py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              FreightNova
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              AI-powered Shipment tracking & freight search engine
            </motion.p>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <div className="flex-1 max-w-2xl">
              <SearchBar onSearch={handleSearch} />
            </div>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("cargo-space");
                }}
                className="mt-2 p-2.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                title="Reset search"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}
          </div>
          <QuickTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ResultsDisplay 
          activeTab={activeTab} 
          searchQuery={searchQuery}
          onPreviewDocument={handlePreviewDocument}
        />
      </main>

      {/* Preview Panel */}
      <PreviewPanel 
        isOpen={isPreviewOpen}
        document={previewDocument}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewDocument(null);
        }}
      />

      {/* Footer */}
      <footer className="mt-8 sm:mt-12 lg:mt-16 py-6 sm:py-8 border-t border-border bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Designed and Powered By <span className="font-medium text-primary">LiveGig Ltd</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;