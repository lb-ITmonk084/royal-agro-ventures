import { 
  Sprout, 
  Search, 
  Droplets, 
  Scissors, 
  Thermometer, 
  ClipboardCheck, 
  Package, 
  Truck 
} from "lucide-react";

const OurProcess = () => {
  const steps = [
    {
      icon: <Sprout className="w-6 h-6" />,
      title: "Direct Sourcing",
      description: "From trusted farmers",
      step: 1,
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Inspection & Grading",
      description: "Raw material quality check",
      step: 2,
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Cleaning & Washing",
      description: "Thorough sanitization",
      step: 3,
    },
    {
      icon: <Scissors className="w-6 h-6" />,
      title: "Preparation",
      description: "Cutting, slicing & sizing",
      step: 4,
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "Dehydration",
      description: "Controlled drying process",
      step: 5,
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Quality Checks",
      description: "Moisture & quality testing",
      step: 6,
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Packaging",
      description: "Hygienic sealing",
      step: 7,
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Dispatch",
      description: "Export-ready storage",
      step: 8,
    },
  ];

  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-wider uppercase text-sm">Our Process</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            From Farm to Finished Product
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every batch is handled with care to maintain food safety, consistency, and shelf life.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />
          
          <div className="grid grid-cols-8 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Step Circle */}
                <div className="relative z-10 w-16 h-16 bg-background border-4 border-primary rounded-full flex items-center justify-center shadow-lg group hover:scale-110 transition-transform duration-300">
                  <div className="text-primary group-hover:text-accent transition-colors">
                    {step.icon}
                  </div>
                </div>
                
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {step.step}
                </div>
                
                {/* Content */}
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Grid */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-background rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {step.step}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground italic max-w-2xl mx-auto">
            "Direct farmer sourcing, hygienic processing, and export-ready agricultural products you can rely on."
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
