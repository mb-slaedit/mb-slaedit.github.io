import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "iPhone 18, 17 e 16, MacBook, Apple Watch e iPad lacrados, com nota fiscal e até 18x em Angra dos Reis. O valor se fecha no WhatsApp.",
};

export default function CatalogoPage() {
  return <Catalog />;
}