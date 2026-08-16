import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight">Contact</h1>
      <p className="text-sm text-muted-foreground">
        Contact details and a contact form will be added here.
      </p>
    </div>
  );
}
