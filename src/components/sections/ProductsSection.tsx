import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, LayoutDashboard, CheckCircle } from 'lucide-react';
import AnimatedGradientText from '../shared/AnimatedGradientText';

const ServiceFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
    <span className="text-foreground/90">{children}</span>
  </li>
);

export default function ProductsSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <AnimatedGradientText className="mb-4 bg-gradient-to-r from-primary to-accent">
                <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
                    Our Core Services
                </h2>
            </AnimatedGradientText>
          <p className="mt-2 text-lg text-foreground/80">
            We specialize in creating powerful digital platforms that drive business growth and efficiency.
          </p>
        </div>

        <Tabs defaultValue="ecommerce" className="w-full">
          <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2 h-12">
            <TabsTrigger value="ecommerce" className="h-10 text-sm md:text-base">
              <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" /> E-commerce
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="h-10 text-sm md:text-base">
              <LayoutDashboard className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Dashboards
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ecommerce" className="mt-8">
            <Card className="overflow-hidden shadow-lg border-none glass-card transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 items-center">
                  <div className="p-6 md:p-8 lg:p-12">
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-primary mb-4">Custom E-commerce Solutions</h3>
                    <p className="text-foreground/80 mb-6">
                      We build bespoke online stores that offer seamless shopping experiences. Our solutions are designed to convert visitors into loyal customers, with a focus on performance, security, and scalability.
                    </p>
                    <ul className="space-y-4">
                      <ServiceFeature>Secure payment gateway integration.</ServiceFeature>
                      <ServiceFeature>Mobile-first, responsive design.</ServiceFeature>
                      <ServiceFeature>Advanced inventory and order management.</ServiceFeature>
                      <ServiceFeature>SEO-optimized for better visibility.</ServiceFeature>
                    </ul>
                  </div>
                   <div className="h-full w-full overflow-hidden min-h-[300px] md:min-h-0">
                    <Image
                      src="/images/ecommerce-solution.png"
                      alt="E-commerce solution screenshot"
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      data-ai-hint="ecommerce website"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-8">
             <Card className="overflow-hidden shadow-lg border-none glass-card transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 items-center">
                  <div className="p-6 md:p-8 lg:p-12">
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-primary mb-4">Data Analytics Dashboards</h3>
                    <p className="text-foreground/80 mb-6">
                      Turn your data into actionable insights with our custom-built analytics dashboards. We create intuitive interfaces to help you monitor KPIs, track performance, and make data-driven decisions with confidence.
                    </p>
                    <ul className="space-y-4">
                      <ServiceFeature>Real-time data visualization.</ServiceFeature>
                      <ServiceFeature>Integration with multiple data sources.</ServiceFeature>
                      <ServiceFeature>Customizable reports and widgets.</ServiceFeature>
                      <ServiceFeature>Role-based access control for security.</ServiceFeature>
                    </ul>
                  </div>
                  <div className="h-full w-full overflow-hidden min-h-[300px] md:min-h-0">
                    <Image
                      src="/images/analytics-dashboard.png"
                      alt="Analytics dashboard screenshot"
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      data-ai-hint="dashboard interface"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
