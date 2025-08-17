import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface PreviewPanelProps {
  isOpen: boolean;
  document: any | null;
  onClose: () => void;
}

export const PreviewPanel = ({ isOpen, document, onClose }: PreviewPanelProps) => {
  if (!document) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-border z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">{document.title}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-2 p-4 border-b border-border">
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              {/* Document metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <div className="font-medium">{document.type}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <div className="font-medium">{document.date}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <div className={`font-medium ${
                    document.status === 'Completed' ? 'text-green-600' :
                    document.status === 'In Progress' ? 'text-blue-600' :
                    'text-orange-600'
                  }`}>{document.status}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Reference:</span>
                  <div className="font-medium font-mono text-xs">{document.reference}</div>
                </div>
              </div>

              {/* Document preview area */}
              <div className="bg-muted/50 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Document Preview</p>
                  <p className="text-sm">PDF content would be displayed here</p>
                </div>
              </div>

              {/* Additional details */}
              {document.details && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Details</h4>
                  {Object.entries(document.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Fix import issue
const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);