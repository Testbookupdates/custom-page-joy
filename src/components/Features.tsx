import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "Lightning Fast",
      description: "Built with modern technologies for optimal performance and speed.",
      icon: "⚡"
    },
    {
      title: "Responsive Design", 
      description: "Perfect experience across all devices and screen sizes.",
      icon: "📱"
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee.",
      icon: "🔒"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Why Choose
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Our Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make us the preferred choice for modern businesses
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center space-y-4 bg-card/50 border-border/50 backdrop-blur-sm hover:shadow-card transition-smooth hover:scale-105">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="default" size="lg" className="text-lg px-8 py-6">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;