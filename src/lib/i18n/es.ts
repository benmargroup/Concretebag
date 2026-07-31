export const es = {
  siteName: "ConcreteBag",
  pricingLabel: "primavera de 2026",
  adPlaceholder: "Anuncio",
  nav: {
    home: "Inicio",
  },
  languageToggle: {
    en: "EN",
    es: "ES",
  },
  breadcrumbs: {
    home: "Inicio",
  },
  calculator: {
    fields: {
      length: "Largo",
      width: "Ancho",
      thickness: "Espesor",
      diameter: "Diámetro",
      depth: "Profundidad",
      holeDiameter: "Diámetro del hoyo",
      holeDepth: "Profundidad del hoyo",
      postSize: "Tamaño del poste",
    },
    units: {
      ft: " pies",
      in: " pulg",
    },
    bagSizeLabel: "Tamaño del saco",
    bagUnit: "lb",
    estimatedCostPrefix: "Costo estimado",
    perBag: "por saco",
    pricingSuffix: "precios de",
    answers: {
      slab: (l: number, w: number, t: number, bags: number, bagLb: number) =>
        `Una losa de ${l}x${w} a ${t}" necesita ${bags} sacos de concreto de ${bagLb} lb.`,
      cylinder: (d: number, depth: number, bags: number, bagLb: number) =>
        `Un tubo de ${d}" lleno a ${depth}" de profundidad necesita ${bags} sacos de concreto de ${bagLb} lb.`,
      posthole: (post: number, d: number, depth: number, bags: number, bagLb: number) =>
        `Un poste de ${post}x${post} en un hoyo de ${d}" y ${depth}" de profundidad necesita ${bags} sacos de concreto de ${bagLb} lb.`,
    },
  },
  materialList: {
    title: "Lista de materiales",
    bagsLine: (count: number, bagLb: number) => `${count} × sacos de concreto de ${bagLb} lb`,
    shopHomeDepot: "Home Depot ↗",
    shopLowes: "Lowe's ↗",
    shopTitle: (bagLb: number, count: number) =>
      `Resultados de búsqueda para sacos de concreto de ${bagLb} lb — necesitas ${count} saco${count === 1 ? "" : "s"}`,
    accessories: [
      "Carretilla o cubeta para mezclar",
      "Azadón de mezcla o mezclador de taladro",
      "Llana o flotador de margen",
    ],
  },
  referenceTable: {
    bagSize: "Tamaño del saco",
    yield: "Rendimiento (pies³)",
    price: "Precio",
    costPerCuFt: "Costo / pie³",
    bagsPerYard: "Sacos por yarda",
    bagsPerPallet: "Sacos por tarima",
    pricesAsOf: "Precios de",
  },
  howItWorks: {
    title: "Cómo se calcula esto",
    body: "Convertimos tus medidas a pies cúbicos, añadimos un margen de desperdicio del 10% por derrames y una subrasante desigual, y luego dividimos entre el rendimiento del saco, redondeando hacia arriba al siguiente saco completo.",
    referenceBody:
      "Estas cifras salen directamente del rendimiento en pies cúbicos de cada saco — sin margen de desperdicio, ya que son conversiones de referencia fijas.",
    faqTitle: "Preguntas frecuentes",
  },
  relatedPages: {
    title: "Páginas relacionadas",
    backTo: "Volver a",
  },
  hubPage: {
    intro:
      "Cada página de esta categoría en un solo lugar. Elige tu tamaño para ver el número exacto de sacos y el costo.",
  },
  homePage: {
    title: "Calculadoras de Sacos de Concreto",
    intro:
      "El número exacto de sacos de concreto y el costo para losas, zapatas, sonotubos y más. Elige una categoría o ve directo a tu tamaño abajo.",
  },
  footer: {
    about: "Acerca de",
    privacy: "Privacidad",
    terms: "Términos",
    rights: "Todos los derechos reservados.",
  },
} as const;
