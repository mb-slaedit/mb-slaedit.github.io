import { waLink } from "./site";

export type Product = {
  id: string;
  category: string;
  name: string;
  desc: string;
  img: string;
  alt: string;
  wa: string;
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const STORY_IMG_1 = {
  src: "/clientes-31.jpg",
  alt: "Cliente sendo consultado por especialista na RW Apple — escolha do iPhone ideal",
};

export const STORY_IMG_2 = {
  src: "/clientes-25.jpg",
  alt: "Cliente aprendendo a usar iPhone novo com suporte especializado da loja",
};

export const STORY_IMG_3 = {
  src: "/clientes-30.jpg",
  alt: "Cliente satisfeito retornando à loja — confiança e fidelidade RW Apple",
};

export const ABOUT_IMG = {
  src: "/ig-loja-cantinho.jpg",
  alt: "Fachada da loja RW Apple no Centro de Angra dos Reis",
};

export const AULA_IMG = {
  src: u("photo-1592899677977-9c10ca588bbd", 1200),
  alt: "Mão usando iPhone durante aula de uso na loja",
};

export const DETAIL_IMG = {
  src: u("photo-1616348436168-de43ad0db179", 1400),
  alt: "iPhone em close mostrando o acabamento premium",
};

export const PRODUCTS: Product[] = [
  // iPhones - Linha 18 Pro
  {
    id: "18-pro-max",
    category: "iPhone 18 Pro Max",
    name: "18 Pro Max",
    desc: "A20 Pro, 48MP c/ abertura variável, tele 4x (8x c/ qualidade óptica), Ação / Controle de Câmera.",
    img: "/iphone-18-pro-max.png",
    alt: "iPhone 18 Pro Max azul-claro — frente e traseira",
    wa: waLink("Quero o iPhone 18 Pro Max"),
  },
  {
    id: "18-pro",
    category: "iPhone 18 Pro",
    name: "18 Pro",
    desc: "A20 Pro, 48MP c/ abertura variável, tele 4x (8x c/ qualidade óptica). Compacto e potente.",
    img: "/iphone-18-pro.png",
    alt: "iPhone 18 Pro vinho — frente e traseira",
    wa: waLink("Quero o iPhone 18 Pro"),
  },

  // iPhones - Linha 17
  {
    id: "17-pro-max",
    category: "iPhone 17 Pro Max",
    name: "17 Pro Max",
    desc: "A19 Pro, 48MP nas 3 lentes, tele 4x (8x c/ qualidade óptica), alumínio unibody.",
    img: "/iphone-17-pro-max.png",
    alt: "iPhone 17 Pro Max — foto do produto",
    wa: waLink("Quero o iPhone 17 Pro Max"),
  },
  {
    id: "17-pro",
    category: "iPhone 17 Pro",
    name: "17 Pro",
    desc: "A19 Pro, 48MP nas 3 lentes, tele 4x (8x c/ qualidade óptica). Compacto e potente.",
    img: "/iphone-17-pro.png",
    alt: "iPhone 17 Pro — foto do produto",
    wa: waLink("Quero o iPhone 17 Pro"),
  },
  {
    id: "17",
    category: "iPhone 17",
    name: "17",
    desc: "O equilíbrio. A19, 48MP Dual Fusion, 120Hz, Dynamic Island, USB-C.",
    img: "/iphone-17.png",
    alt: "iPhone 17 — foto do produto",
    wa: waLink("Quero o iPhone 17"),
  },

  // iPhones - Linha 16
  {
    id: "16-pro-max",
    category: "iPhone 16 Pro Max",
    name: "16 Pro Max",
    desc: "A18 Pro, 48MP Fusion, 5x zoom, Botão de Controle de Câmera, Titânio.",
    img: "/iphone-16-pro-max.avif",
    alt: "iPhone 16 Pro Max — foto do produto",
    wa: waLink("Quero o iPhone 16 Pro Max"),
  },
  {
    id: "16-pro",
    category: "iPhone 16 Pro",
    name: "16 Pro",
    desc: "A18 Pro, 48MP Fusion, 5x zoom, Botão de Controle de Câmera, Titânio.",
    img: "/iphone-16-pro.webp",
    alt: "iPhone 16 Pro — foto do produto",
    wa: waLink("Quero o iPhone 16 Pro"),
  },
  {
    id: "16-plus",
    category: "iPhone 16 Plus",
    name: "16 Plus",
    desc: "Tela grande, bateria o dia todo. A18, Botão de Ação, USB-C.",
    img: "/iphone-16-plus.png",
    alt: "iPhone 16 Plus — foto do produto",
    wa: waLink("Quero o iPhone 16 Plus"),
  },
  {
    id: "16",
    category: "iPhone 16",
    name: "16",
    desc: "O essencial moderno. A18, Dynamic Island, Botão de Ação, USB-C.",
    img: "/iphone-16.png",
    alt: "iPhone 16 — foto do produto",
    wa: waLink("Quero o iPhone 16"),
  },

  // iPhones - Linha 15
  {
    id: "15-pro-max",
    category: "iPhone 15 Pro Max",
    name: "15 Pro Max",
    desc: "A17 Pro, 48MP, 5x zoom. Titânio.",
    img: "/iphone-15-pro-max.png",
    alt: "iPhone 15 Pro Max preto — frente e traseira",
    wa: waLink("Quero o iPhone 15 Pro Max"),
  },
  {
    id: "15-pro",
    category: "iPhone 15 Pro",
    name: "15 Pro",
    desc: "A17 Pro, 48MP, 3x zoom. Titânio.",
    img: "/iphone-15-pro.png",
    alt: "iPhone 15 Pro — foto do produto",
    wa: waLink("Quero o iPhone 15 Pro"),
  },
  {
    id: "15-plus",
    category: "iPhone 15 Plus",
    name: "15 Plus",
    desc: "Tela grande, bateria o dia todo. A16 Bionic, Dynamic Island.",
    img: "/iphone-15-plus.png",
    alt: "iPhone 15 Plus — foto do produto",
    wa: waLink("Quero o iPhone 15 Plus"),
  },
  {
    id: "15",
    category: "iPhone 15",
    name: "15",
    desc: "O essencial. A16 Bionic, Dynamic Island, USB-C.",
    img: "/iphone-15.png",
    alt: "iPhone 15 — foto do produto",
    wa: waLink("Quero o iPhone 15"),
  },

  // MacBooks
  {
    id: "macbook-pro-16-m3",
    category: "MacBook Pro 16",
    name: "Pro 16 M3 Max",
    desc: "M3 Max, até 128GB de memória unificada, tela Liquid Retina XDR.",
    img: "/macbook-pro-16-m3-max.png",
    alt: "MacBook Pro 16 M3 Max — foto do produto",
    wa: waLink("Quero o MacBook Pro 16 M3 Max"),
  },
  {
    id: "macbook-pro-14-m3",
    category: "MacBook Pro 14",
    name: "Pro 14 M3 Pro",
    desc: "M3 Pro, até 36GB de memória unificada, tela Liquid Retina XDR.",
    img: "/macbook-pro-14-m3-pro.png",
    alt: "MacBook Pro 14 M3 Pro — foto do produto",
    wa: waLink("Quero o MacBook Pro 14 M3 Pro"),
  },
  {
    id: "macbook-air-15-m3",
    category: "MacBook Air 15",
    name: "Air 15 M3",
    desc: "M3, até 24GB, 18h de bateria. Leve e potente.",
    img: "/macbook-air-15-m3.png",
    alt: "MacBook Air 15 M3 — foto do produto",
    wa: waLink("Quero o MacBook Air 15 M3"),
  },
  {
    id: "macbook-air-13-m3",
    category: "MacBook Air 13",
    name: "Air 13 M3",
    desc: "M3, até 24GB, 18h de bateria. Ultrafino.",
    img: "/macbook-air-13-m3.png",
    alt: "MacBook Air 13 M3 — foto do produto",
    wa: waLink("Quero o MacBook Air 13 M3"),
  },

  // Apple Watch
  {
    id: "watch-ultra-2",
    category: "Apple Watch Ultra 2",
    name: "Ultra 2",
    desc: "Caixa em Titânio, 36h de bateria, GPS de dupla frequência, resistência à água até 100m.",
    img: "/apple-watch-ultra-2.png",
    alt: "Apple Watch Ultra 2 — foto do produto",
    wa: waLink("Quero o Apple Watch Ultra 2"),
  },
  {
    id: "watch-series-9",
    category: "Apple Watch Series 9",
    name: "Series 9",
    desc: "Chip S9, Gesto de Toque Duplo (Double Tap), 18h de bateria, Alumínio ou Aço Inoxidável.",
    img: "/apple-watch-series-9.png",
    alt: "Apple Watch Series 9 — foto do produto",
    wa: waLink("Quero o Apple Watch Series 9"),
  },
  {
    id: "watch-se-2",
    category: "Apple Watch SE",
    name: "SE 2ª gen",
    desc: "Chip S8, Detecção de Acidentes e Quedas, 18h de bateria.",
    img: "/apple-watch-se-2nd-gen.png",
    alt: "Apple Watch SE 2ª geração — foto do produto",
    wa: waLink("Quero o Apple Watch SE"),
  },

  // iPads
  {
    id: "ipad-pro-13-m4",
    category: "iPad Pro 13",
    name: "Pro 13 M4",
    desc: "Chip M4, tela Ultra Retina XDR (OLED), opções até 2TB, compatível com Apple Pencil Pro.",
    img: "/ipad-pro-13-m4.png",
    alt: "iPad Pro 13 M4 — foto do produto",
    wa: waLink("Quero o iPad Pro 13 M4"),
  },
  {
    id: "ipad-pro-11-m4",
    category: "iPad Pro 11",
    name: "Pro 11 M4",
    desc: "Chip M4, tela Ultra Retina XDR (OLED), opções até 2TB, compatível com Apple Pencil Pro.",
    img: "/ipad-pro-11-m4.png",
    alt: "iPad Pro 11 M4 — foto do produto",
    wa: waLink("Quero o iPad Pro 11 M4"),
  },
  {
    id: "ipad-air-13-m2",
    category: "iPad Air 13",
    name: "Air 13 M2",
    desc: "Chip M2, tela Liquid Retina, compatível com Apple Pencil Pro.",
    img: "/ipad-air-13-m2.png",
    alt: "iPad Air 13 M2 — foto do produto",
    wa: waLink("Quero o iPad Air 13 M2"),
  },
  {
    id: "ipad-air-11-m2",
    category: "iPad Air 11",
    name: "Air 11 M2",
    desc: "Chip M2, tela Liquid Retina, compatível com Apple Pencil Pro.",
    img: "/ipad-air-11-m2.png",
    alt: "iPad Air 11 M2 — foto do produto",
    wa: waLink("Quero o iPad Air 11 M2"),
  },
  {
    id: "ipad-10",
    category: "iPad 10",
    name: "iPad 10",
    desc: "Chip A14 Bionic, tela 10.9\", USB-C, compatível com Apple Pencil (1ª gen c/ adaptador) e USB-C.",
    img: "/ipad-10th-gen.png",
    alt: "iPad 10ª geração — foto do produto",
    wa: waLink("Quero o iPad 10"),
  },
  {
    id: "ipad-mini",
    category: "iPad mini",
    name: "mini A17 Pro",
    desc: "Chip A17 Pro, tela 8.3\", USB-C, compatível com Apple Pencil Pro e USB-C.",
    img: "/ipad-mini-a17-pro.png",
    alt: "iPad mini A17 Pro — foto do produto",
    wa: waLink("Quero o iPad mini"),
  },

  // Acessórios
  {
    id: "airpods-pro-2",
    category: "AirPods Pro 2",
    name: "AirPods Pro 2",
    desc: "Chip H2, Cancelamento Ativo de Ruído (ANC) até 2x maior, estojo USB-C, até 30h de bateria total, Áudio Adaptativo.",
    img: "/airpods-pro-2.png",
    alt: "AirPods Pro 2 — foto do produto",
    wa: waLink("Quero os AirPods Pro 2"),
  },
  {
    id: "airpods-max",
    category: "AirPods Max",
    name: "AirPods Max",
    desc: "Chip H1, Cancelamento Ativo de Ruído, Áudio Espacial, 20h de bateria, acabamento em Alumínio.",
    img: "/airpods-max.png",
    alt: "AirPods Max — foto do produto",
    wa: waLink("Quero os AirPods Max"),
  },
  {
    id: "airpods-3",
    category: "AirPods 3",
    name: "AirPods 3",
    desc: "Áudio Espacial Personalizado, até 30h de bateria total, estojo MagSafe, resistência IPX4.",
    img: "/airpods-3rd-gen.png",
    alt: "AirPods 3 — foto do produto",
    wa: waLink("Quero os AirPods 3"),
  },
];
