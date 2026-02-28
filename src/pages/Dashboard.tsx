import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, LogOut, User } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { QuickTabs } from "../components/QuickTabs";
import { ResultsDisplay } from "../components/ResultsDisplay";
import { PreviewPanel } from "../components/PreviewPanel";
import { detectTab } from "@/lib/tabDetection";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("cargo-space");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewDocument, setPreviewDocument] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() ?? "U";

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const detected = detectTab(query);
    if (detected) {
      setActiveTab(detected);
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
          {/* User menu */}
          <div className="flex justify-end mb-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profile?.avatar_url ?? undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{profile?.full_name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs text-muted-foreground cursor-default">
                  Plan: <span className="ml-1 capitalize font-medium">{profile?.subscription_tier ?? "free"}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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