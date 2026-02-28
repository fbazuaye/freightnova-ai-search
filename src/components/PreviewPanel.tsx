import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ExternalLink, FileText, Ship, MapPin, Calendar, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { exportToExcel } from "@/lib/excelExport";

interface PreviewPanelProps {
  isOpen: boolean;
  document: any | null;
  onClose: () => void;
}

export const PreviewPanel = ({ isOpen, document, onClose }: PreviewPanelProps) => {
  if (!document) return null;

  const getTypeIcon = () => {
    switch (document.type) {
      case "Container Tracking": return <Ship className="w-5 h-5 text-primary" />;
      case "Bill of Lading": return <FileText className="w-5 h-5 text-primary" />;
      case "Booking Confirmation": return <Package className="w-5 h-5 text-primary" />;
      default: return <FileText className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 lg:w-[28rem] bg-white shadow-2xl border-l border-border z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <div className="flex items-center gap-3 min-w-0">
              {getTypeIcon()}
              <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{document.title}</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="flex-shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 p-4 sm:p-6 border-b border-border">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => {
              const data = document.details ? { ...document.details } : { id: document.id, title: document.title, status: document.status };
              exportToExcel([data], `${document.title?.replace(/\s+/g, '_') || 'export'}`);
            }}>
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Printer className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button variant="outline" size="sm" className="sm:w-auto">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="space-y-5">
              {/* Status & Type Summary */}
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant={
                  document.status === 'Confirmed' || document.status === 'Original' || document.status === 'Discharged' ? 'default' : 'secondary'
                }>
                  {document.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{document.type}</span>
              </div>

              {/* Core metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {document.reference && (
                  <div>
                    <span className="text-muted-foreground">Reference</span>
                    <div className="font-medium font-mono text-xs mt-0.5">{document.reference}</div>
                  </div>
                )}
                {document.date && (
                  <div>
                    <span className="text-muted-foreground">Date</span>
                    <div className="font-medium mt-0.5">{document.date}</div>
                  </div>
                )}
                {document.customer && (
                  <div>
                    <span className="text-muted-foreground">Customer</span>
                    <div className="font-medium mt-0.5">{document.customer}</div>
                  </div>
                )}
                {document.id && (
                  <div>
                    <span className="text-muted-foreground">ID</span>
                    <div className="font-medium font-mono mt-0.5">{document.id}</div>
                  </div>
                )}
              </div>

              {/* All detail fields */}
              {document.details && (
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-foreground mb-3 border-b border-border pb-2">Full Details</h4>
                  <div className="space-y-3">
                    {Object.entries(document.details).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted-foreground capitalize block">{key.replace(/_/g, ' ')}</span>
                        <span className="font-medium break-words">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Containers list if present */}
              {document.containers && Array.isArray(document.containers) && (
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2">Containers</h4>
                  <div className="flex flex-wrap gap-2">
                    {document.containers.map((c: string) => (
                      <Badge key={c} variant="outline" className="font-mono text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Document preview area */}
              <div className="bg-muted/50 rounded-lg p-4 min-h-[150px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  {getTypeIcon()}
                  <p className="mt-2 font-medium">Document Preview</p>
                  <p className="text-sm">PDF content would be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
