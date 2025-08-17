import { motion } from "framer-motion";
import { FileText, Calendar, Download, Eye, Truck, Ship } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface BillsOfLadingResultsProps {
  searchQuery: string;
  onPreviewDocument: (document: any) => void;
}

const mockBLs = [
  {
    id: "MSKU12345",
    reference: "MSKU12345-BL-001",
    customer: "Global Imports Inc",
    vessel: "MSC MEDITERRANEAN", 
    voyage: "424W",
    pol: "Shanghai, China",
    pod: "Lagos, Nigeria",
    issueDate: "2024-09-10",
    status: "Original",
    containers: ["MSKU1234567", "MSKU1234568"],
    type: "Bill of Lading",
    date: "2024-09-10",
    title: "Bill of Lading - MSKU12345"
  },
  {
    id: "TCLU9988776", 
    reference: "TCLU9988776-BL-002",
    customer: "Mega Logistics Co",
    vessel: "EVER GIVEN",
    voyage: "321E", 
    pol: "Hamburg, Germany",
    pod: "Port Harcourt, Nigeria",
    issueDate: "2024-09-08",
    status: "Telex Release",
    containers: ["TCLU9988776"],
    type: "Bill of Lading",
    date: "2024-09-08", 
    title: "Bill of Lading - TCLU9988776"
  }
];

export const BillsOfLadingResults = ({ searchQuery, onPreviewDocument }: BillsOfLadingResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Bills of Lading</h2>
        <div className="text-sm text-muted-foreground">
          {mockBLs.length} documents found
        </div>
      </div>

      <div className="grid gap-4">
        {mockBLs.map((bl, index) => (
          <motion.div
            key={bl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="result-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-lg">B/L #{bl.id}</div>
                    <div className="text-sm text-muted-foreground">{bl.customer}</div>
                  </div>
                  <Badge variant={bl.status === 'Original' ? 'default' : 'secondary'}>
                    {bl.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Vessel / Voyage</div>
                    <div className="font-medium">{bl.vessel}</div>
                    <div className="text-sm text-muted-foreground">Voyage {bl.voyage}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Port of Loading</div>
                      <div className="font-medium text-sm">{bl.pol}</div>
                    </div>
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <Ship className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Port of Discharge</div>
                    <div className="font-medium text-sm">{bl.pod}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">Containers</div>
                  <div className="flex flex-wrap gap-2">
                    {bl.containers.map((container) => (
                      <Badge key={container} variant="outline" className="font-mono text-xs">
                        {container}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Issued: {bl.issueDate}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onPreviewDocument({
                        ...bl,
                        details: {
                          vessel_voyage: `${bl.vessel} / ${bl.voyage}`,
                          port_of_loading: bl.pol,
                          port_of_discharge: bl.pod,
                          containers: bl.containers.join(', '),
                          issue_date: bl.issueDate
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