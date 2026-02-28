import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ship, Search, BarChart3, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Ship className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">FreightNova</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
          <Button onClick={() => navigate("/auth?mode=signup")}>
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-8 pb-20">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Freight intelligence,{" "}
            <span className="text-primary">simplified</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Search cargo space, track shipments, manage bookings and bills of lading — all from one powerful search bar.
          </p>
        </div>

        <div className="flex gap-3">
          <Button size="lg" onClick={() => navigate("/auth?mode=signup")}>
            Get Started <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl w-full">
          {[
            { icon: Search, title: "Smart Search", desc: "Natural language queries across all freight data" },
            { icon: Ship, title: "Live Tracking", desc: "Real-time vessel and container tracking" },
            { icon: BarChart3, title: "Analytics", desc: "Export and analyze booking & cargo data" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 text-left space-y-2">
              <Icon className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
