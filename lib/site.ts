export const WA_NUMBER = "5524998247584";

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SITE = {
  name: "RW Apple",
  tagline: "O iPhone que você sonha, com quem você confia",
  description:
    "RW Apple em Angra dos Reis: iPhones originais, Apple Watch e iPad com garantia real e atendimento humanizado. Rua Coronel Carvalho, 356, Centro.",
  url: "https://rwapple.com.br",
  locale: "pt_BR",
  address: "Rua Coronel Carvalho, 356 — Centro, Angra dos Reis, RJ",
  addressShort: "Centro, Angra dos Reis",
  hours: "Seg a Sáb, 9h às 18h",
  instagram: "https://www.instagram.com/rw.apple",
  instagramFollowers: "8.896",
  yearsMarket: "6 anos",
  dreamsDone: "+12.000",
  notaFiscal: true,
  maxInstallments: "18x",
  maps: "https://www.google.com/maps/place/R.+Cel.+Carvalho,+356+-+Centro,+Angra+dos+Reis+-+RJ,+23900-310/@-23.006994,-44.3189257,15z",
  waGeneral: waLink("Olá! Quero saber mais sobre os iPhones da RW Apple."),
};

export const CTA_WHATSAPP_LABEL = "Chamar no WhatsApp";
