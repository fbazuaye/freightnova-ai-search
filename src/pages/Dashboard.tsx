import { useState } from "react";
import { motion } from "framer-motion";
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
        className="py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl font-bold text-primary mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              FreightNova
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              AI-powered freight forwarding search engine
            </motion.p>
          </div>

          <SearchBar onSearch={handleSearch} />
          <QuickTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
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
    </div>
  );
};

export default Dashboard;