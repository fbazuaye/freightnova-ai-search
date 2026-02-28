import { motion } from "framer-motion";
import { MapPin, Ship, Calendar, Bell, CheckCircle2, Clock, Eye, Download } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface TrackingResultsProps {
  searchQuery: string;
  onPreviewDocument: (document: any) => void;
}

const mockTracking = [
  {
    id: "TCLU9988776",
    vessel: "EVER GIVEN",
    currentLocation: "Red Sea",
    status: "In Transit",
    lastUpdate: "2024-09-17 14:30 UTC",
    eta: "2024-10-02",
    pol: "Hamburg, Germany",
    pod: "Port Harcourt, Nigeria",
    progress: 65,
    milestones: [
      { status: "Loaded", location: "Hamburg", date: "2024-09-01", completed: true },
      { status: "Departed", location: "Hamburg", date: "2024-09-02", completed: true },
      { status: "In Transit", location: "Red Sea", date: "2024-09-17", completed: false, current: true },
      { status: "Arrive", location: "Port Harcourt", date: "2024-10-02", completed: false }
    ]
  },
  {
    id: "MSKU1234567",
    vessel: "MSC MEDITERRANEAN",
    currentLocation: "Port of Lagos",
    status: "Discharged",
    lastUpdate: "2024-09-16 08:45 UTC",
    eta: "Completed",
    pol: "Shanghai, China",
    pod: "Lagos, Nigeria",
    progress: 100,
    milestones: [
      { status: "Loaded", location: "Shanghai", date: "2024-08-15", completed: true },
      { status: "Departed", location: "Shanghai", date: "2024-08-16", completed: true },
      { status: "In Transit", location: "Indian Ocean", date: "2024-08-30", completed: true },
      { status: "Discharged", location: "Lagos", date: "2024-09-16", completed: true, current: true }
    ]
  }
];

export const TrackingResults = ({ searchQuery, onPreviewDocument }: TrackingResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Container Tracking</h2>
        <div className="text-sm text-muted-foreground">
          {mockTracking.length} containers found
        </div>
      </div>

      <div className="grid gap-6">
        {mockTracking.map((container, index) => (
          <motion.div
            key={container.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="result-card"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Ship className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg font-mono">{container.id}</div>
                    <div className="text-sm text-muted-foreground">on the {container.vessel}</div>
                  </div>
                  <Badge 
                    variant={container.status === 'Discharged' ? 'default' : 
                            container.status === 'In Transit' ? 'secondary' : 'outline'}
                    className="ml-2"
                  >
                    {container.status === 'Discharged' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {container.status === 'In Transit' && (
                      <span className="relative flex h-2 w-2 mr-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                    )}
                    {container.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onPreviewDocument({
                      title: `Container Tracking - ${container.id}`,
                      type: "Container Tracking",
                      date: container.lastUpdate,
                      status: container.status,
                      reference: container.id,
                      details: {
                        container_id: container.id,
                        vessel: container.vessel,
                        current_location: container.currentLocation,
                        port_of_loading: container.pol,
                        port_of_discharge: container.pod,
                        eta: container.eta,
                        last_update: container.lastUpdate,
                        journey_progress: `${container.progress}%`,
                        milestones: container.milestones.map(m => `${m.status} at ${m.location} (${m.date})`).join(' → ')
                      }
                    })}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Notification
                  </Button>
                </div>
              </div>

              {/* Current Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Current Location</div>
                    <div className="font-medium">{container.currentLocation}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">ETA</div>
                    <div className="font-medium">{container.eta}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Last Update</div>
                  <div className="font-medium text-sm">{container.lastUpdate}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Journey Progress</span>
                  <span className="text-primary font-medium">{container.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div 
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${container.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Journey Milestones</h4>
                <div className="space-y-3">
                  {container.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        milestone.completed 
                          ? 'bg-green-500' 
                          : milestone.current 
                            ? 'bg-primary animate-pulse' 
                            : 'bg-muted border-2 border-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${milestone.current ? 'text-primary' : ''}`}>
                              {milestone.status}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              at {milestone.location}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {milestone.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
