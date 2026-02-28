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
  },
  {
    id: "CMAU4455881",
    vessel: "CMA CGM MARCO POLO",
    currentLocation: "Singapore Strait",
    status: "In Transit",
    lastUpdate: "2024-09-18 06:12 UTC",
    eta: "2024-10-05",
    pol: "Ningbo, China",
    pod: "Durban, South Africa",
    progress: 45,
    milestones: [
      { status: "Loaded", location: "Ningbo", date: "2024-09-05", completed: true },
      { status: "Departed", location: "Ningbo", date: "2024-09-06", completed: true },
      { status: "In Transit", location: "Singapore Strait", date: "2024-09-18", completed: false, current: true },
      { status: "Arrive", location: "Durban", date: "2024-10-05", completed: false }
    ]
  },
  {
    id: "HLBU7712340",
    vessel: "HAPAG LLOYD BERLIN",
    currentLocation: "Tema Port, Ghana",
    status: "Discharged",
    lastUpdate: "2024-09-15 11:00 UTC",
    eta: "Completed",
    pol: "Rotterdam, Netherlands",
    pod: "Tema, Ghana",
    progress: 100,
    milestones: [
      { status: "Loaded", location: "Rotterdam", date: "2024-08-20", completed: true },
      { status: "Departed", location: "Rotterdam", date: "2024-08-21", completed: true },
      { status: "In Transit", location: "Bay of Biscay", date: "2024-08-28", completed: true },
      { status: "Discharged", location: "Tema", date: "2024-09-15", completed: true, current: true }
    ]
  },
  {
    id: "OOLU5566332",
    vessel: "OOCL HONG KONG",
    currentLocation: "Suez Canal",
    status: "In Transit",
    lastUpdate: "2024-09-19 09:20 UTC",
    eta: "2024-10-08",
    pol: "Busan, South Korea",
    pod: "Felixstowe, UK",
    progress: 55,
    milestones: [
      { status: "Loaded", location: "Busan", date: "2024-09-03", completed: true },
      { status: "Departed", location: "Busan", date: "2024-09-04", completed: true },
      { status: "In Transit", location: "Suez Canal", date: "2024-09-19", completed: false, current: true },
      { status: "Arrive", location: "Felixstowe", date: "2024-10-08", completed: false }
    ]
  },
  {
    id: "MAEU3344998",
    vessel: "MAERSK EDINBURGH",
    currentLocation: "Port of Antwerp",
    status: "Loaded",
    lastUpdate: "2024-09-20 07:00 UTC",
    eta: "2024-10-18",
    pol: "Antwerp, Belgium",
    pod: "Mombasa, Kenya",
    progress: 10,
    milestones: [
      { status: "Loaded", location: "Antwerp", date: "2024-09-20", completed: true, current: true },
      { status: "Departed", location: "Antwerp", date: "2024-09-21", completed: false },
      { status: "In Transit", location: "Mediterranean", date: "—", completed: false },
      { status: "Arrive", location: "Mombasa", date: "2024-10-18", completed: false }
    ]
  },
  {
    id: "EISU8877221",
    vessel: "EVERGREEN TRIUMPH",
    currentLocation: "Strait of Malacca",
    status: "In Transit",
    lastUpdate: "2024-09-18 22:15 UTC",
    eta: "2024-10-12",
    pol: "Yokohama, Japan",
    pod: "Jeddah, Saudi Arabia",
    progress: 40,
    milestones: [
      { status: "Loaded", location: "Yokohama", date: "2024-09-08", completed: true },
      { status: "Departed", location: "Yokohama", date: "2024-09-09", completed: true },
      { status: "In Transit", location: "Strait of Malacca", date: "2024-09-18", completed: false, current: true },
      { status: "Arrive", location: "Jeddah", date: "2024-10-12", completed: false }
    ]
  },
  {
    id: "YMLU6633445",
    vessel: "YANG MING UNITY",
    currentLocation: "Port Klang, Malaysia",
    status: "Transhipment",
    lastUpdate: "2024-09-17 16:40 UTC",
    eta: "2024-10-10",
    pol: "Kaohsiung, Taiwan",
    pod: "Dar es Salaam, Tanzania",
    progress: 35,
    milestones: [
      { status: "Loaded", location: "Kaohsiung", date: "2024-09-10", completed: true },
      { status: "Departed", location: "Kaohsiung", date: "2024-09-11", completed: true },
      { status: "Transhipment", location: "Port Klang", date: "2024-09-17", completed: false, current: true },
      { status: "Arrive", location: "Dar es Salaam", date: "2024-10-10", completed: false }
    ]
  },
  {
    id: "ZIMU2299887",
    vessel: "ZIM PACIFIC",
    currentLocation: "Cape of Good Hope",
    status: "In Transit",
    lastUpdate: "2024-09-19 13:55 UTC",
    eta: "2024-10-15",
    pol: "Colombo, Sri Lanka",
    pod: "Santos, Brazil",
    progress: 50,
    milestones: [
      { status: "Loaded", location: "Colombo", date: "2024-09-06", completed: true },
      { status: "Departed", location: "Colombo", date: "2024-09-07", completed: true },
      { status: "In Transit", location: "Cape of Good Hope", date: "2024-09-19", completed: false, current: true },
      { status: "Arrive", location: "Santos", date: "2024-10-15", completed: false }
    ]
  },
  {
    id: "ONEU1122334",
    vessel: "ONE COLUMBA",
    currentLocation: "Panama Canal",
    status: "In Transit",
    lastUpdate: "2024-09-20 04:30 UTC",
    eta: "2024-10-01",
    pol: "Los Angeles, USA",
    pod: "Cartagena, Colombia",
    progress: 75,
    milestones: [
      { status: "Loaded", location: "Los Angeles", date: "2024-09-12", completed: true },
      { status: "Departed", location: "Los Angeles", date: "2024-09-13", completed: true },
      { status: "In Transit", location: "Panama Canal", date: "2024-09-20", completed: false, current: true },
      { status: "Arrive", location: "Cartagena", date: "2024-10-01", completed: false }
    ]
  },
  {
    id: "CSLU9900112",
    vessel: "COSCO SHIPPING GEMINI",
    currentLocation: "Port of Piraeus, Greece",
    status: "Discharged",
    lastUpdate: "2024-09-14 10:20 UTC",
    eta: "Completed",
    pol: "Qingdao, China",
    pod: "Piraeus, Greece",
    progress: 100,
    milestones: [
      { status: "Loaded", location: "Qingdao", date: "2024-08-18", completed: true },
      { status: "Departed", location: "Qingdao", date: "2024-08-19", completed: true },
      { status: "In Transit", location: "Indian Ocean", date: "2024-09-02", completed: true },
      { status: "Discharged", location: "Piraeus", date: "2024-09-14", completed: true, current: true }
    ]
  },
  {
    id: "SEGU7788001",
    vessel: "SEALAND ILLINOIS",
    currentLocation: "Gulf of Aden",
    status: "In Transit",
    lastUpdate: "2024-09-19 18:00 UTC",
    eta: "2024-10-06",
    pol: "Mundra, India",
    pod: "Djibouti, Djibouti",
    progress: 70,
    milestones: [
      { status: "Loaded", location: "Mundra", date: "2024-09-10", completed: true },
      { status: "Departed", location: "Mundra", date: "2024-09-11", completed: true },
      { status: "In Transit", location: "Gulf of Aden", date: "2024-09-19", completed: false, current: true },
      { status: "Arrive", location: "Djibouti", date: "2024-10-06", completed: false }
    ]
  },
  {
    id: "MSCU4455667",
    vessel: "MSC OSCAR",
    currentLocation: "English Channel",
    status: "In Transit",
    lastUpdate: "2024-09-20 02:10 UTC",
    eta: "2024-09-22",
    pol: "Le Havre, France",
    pod: "Southampton, UK",
    progress: 85,
    milestones: [
      { status: "Loaded", location: "Le Havre", date: "2024-09-18", completed: true },
      { status: "Departed", location: "Le Havre", date: "2024-09-19", completed: true },
      { status: "In Transit", location: "English Channel", date: "2024-09-20", completed: false, current: true },
      { status: "Arrive", location: "Southampton", date: "2024-09-22", completed: false }
    ]
  },
  {
    id: "HLXU3322110",
    vessel: "HAPAG LLOYD EXPRESS",
    currentLocation: "Waiting at Anchorage",
    status: "Awaiting Berth",
    lastUpdate: "2024-09-20 08:45 UTC",
    eta: "2024-09-21",
    pol: "Shenzhen, China",
    pod: "Vancouver, Canada",
    progress: 95,
    milestones: [
      { status: "Loaded", location: "Shenzhen", date: "2024-08-28", completed: true },
      { status: "Departed", location: "Shenzhen", date: "2024-08-29", completed: true },
      { status: "In Transit", location: "Pacific Ocean", date: "2024-09-10", completed: true },
      { status: "Awaiting Berth", location: "Vancouver", date: "2024-09-20", completed: false, current: true }
    ]
  },
  {
    id: "TRHU5544332",
    vessel: "TURKON ISTANBUL",
    currentLocation: "Mediterranean Sea",
    status: "In Transit",
    lastUpdate: "2024-09-19 20:30 UTC",
    eta: "2024-09-28",
    pol: "Mersin, Turkey",
    pod: "Alexandria, Egypt",
    progress: 30,
    milestones: [
      { status: "Loaded", location: "Mersin", date: "2024-09-16", completed: true },
      { status: "Departed", location: "Mersin", date: "2024-09-17", completed: true },
      { status: "In Transit", location: "Mediterranean Sea", date: "2024-09-19", completed: false, current: true },
      { status: "Arrive", location: "Alexandria", date: "2024-09-28", completed: false }
    ]
  },
  {
    id: "PCIU8866554",
    vessel: "PIL CELESTIAL",
    currentLocation: "Bay of Bengal",
    status: "In Transit",
    lastUpdate: "2024-09-18 15:20 UTC",
    eta: "2024-10-03",
    pol: "Chennai, India",
    pod: "Chittagong, Bangladesh",
    progress: 55,
    milestones: [
      { status: "Loaded", location: "Chennai", date: "2024-09-12", completed: true },
      { status: "Departed", location: "Chennai", date: "2024-09-13", completed: true },
      { status: "In Transit", location: "Bay of Bengal", date: "2024-09-18", completed: false, current: true },
      { status: "Arrive", location: "Chittagong", date: "2024-10-03", completed: false }
    ]
  },
  {
    id: "WANU6677889",
    vessel: "WAN HAI 612",
    currentLocation: "Port of Tanjung Pelepas",
    status: "Transhipment",
    lastUpdate: "2024-09-17 19:00 UTC",
    eta: "2024-10-14",
    pol: "Jakarta, Indonesia",
    pod: "Abidjan, Ivory Coast",
    progress: 25,
    milestones: [
      { status: "Loaded", location: "Jakarta", date: "2024-09-13", completed: true },
      { status: "Departed", location: "Jakarta", date: "2024-09-14", completed: true },
      { status: "Transhipment", location: "Tanjung Pelepas", date: "2024-09-17", completed: false, current: true },
      { status: "Arrive", location: "Abidjan", date: "2024-10-14", completed: false }
    ]
  },
  {
    id: "KMTU3300998",
    vessel: "KMTC SINGAPORE",
    currentLocation: "East China Sea",
    status: "In Transit",
    lastUpdate: "2024-09-20 11:30 UTC",
    eta: "2024-09-25",
    pol: "Incheon, South Korea",
    pod: "Ho Chi Minh City, Vietnam",
    progress: 60,
    milestones: [
      { status: "Loaded", location: "Incheon", date: "2024-09-15", completed: true },
      { status: "Departed", location: "Incheon", date: "2024-09-16", completed: true },
      { status: "In Transit", location: "East China Sea", date: "2024-09-20", completed: false, current: true },
      { status: "Arrive", location: "Ho Chi Minh City", date: "2024-09-25", completed: false }
    ]
  },
  {
    id: "HDMU2211443",
    vessel: "HYUNDAI DREAM",
    currentLocation: "Apapa Port, Lagos",
    status: "Customs Hold",
    lastUpdate: "2024-09-19 07:15 UTC",
    eta: "Pending Clearance",
    pol: "Tianjin, China",
    pod: "Lagos, Nigeria",
    progress: 98,
    milestones: [
      { status: "Loaded", location: "Tianjin", date: "2024-08-22", completed: true },
      { status: "Departed", location: "Tianjin", date: "2024-08-23", completed: true },
      { status: "In Transit", location: "Indian Ocean", date: "2024-09-08", completed: true },
      { status: "Customs Hold", location: "Lagos", date: "2024-09-19", completed: false, current: true }
    ]
  },
  {
    id: "KKFU9988001",
    vessel: "K LINE FUTURE",
    currentLocation: "Port of Lome, Togo",
    status: "Discharged",
    lastUpdate: "2024-09-13 14:00 UTC",
    eta: "Completed",
    pol: "Genoa, Italy",
    pod: "Lome, Togo",
    progress: 100,
    milestones: [
      { status: "Loaded", location: "Genoa", date: "2024-08-25", completed: true },
      { status: "Departed", location: "Genoa", date: "2024-08-26", completed: true },
      { status: "In Transit", location: "West Africa Coast", date: "2024-09-08", completed: true },
      { status: "Discharged", location: "Lome", date: "2024-09-13", completed: true, current: true }
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
            transition={{ delay: index * 0.05 }}
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
                            container.status === 'In Transit' ? 'secondary' : 
                            container.status === 'Customs Hold' ? 'destructive' : 'outline'}
                    className="ml-2"
                  >
                    {container.status === 'Discharged' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {(container.status === 'In Transit' || container.status === 'Transhipment') && (
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
                    transition={{ duration: 1, delay: index * 0.1 }}
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
