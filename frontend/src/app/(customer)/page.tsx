import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const serviceCategories = [
  { name: "Car Wash", href: "/services" },
  { name: "Detailing", href: "/services" },
  { name: "Polishing", href: "/services" },
  { name: "PPF", href: "/services" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 px-4 py-8">
      <section className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Book professional car care, in minutes
        </h1>
        <p className="text-sm text-muted-foreground">
          Car wash, detailing, polishing and PPF — pick a slot, we handle the rest.
        </p>
        <Button render={<Link href="/book" />} size="lg" className="w-full">
          Book an appointment
        </Button>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Our services</h2>
        <div className="grid grid-cols-2 gap-3">
          {serviceCategories.map((category) => (
            <Card key={category.name}>
              <Link href={category.href}>
                <CardHeader>
                  <CardTitle className="text-sm">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Explore options
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
