import Link from "next/link";
import { Button } from "@/components/ui/button";

export function OrderButton() {
  return (
    <Button
      asChild
      className="bg-gold text-primary-foreground hover:bg-gold-light"
    >
      <Link href="/#angebot">Reading bestellen</Link>
    </Button>
  );
}
