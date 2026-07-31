import { pages, hubs, type CalcPage } from "@data/pages";
import { bagsNeeded, cylinderCuFt, postHoleCuFt, slabCuFt, YIELD, EPSILON } from "@/lib/calc";
import { bagCost, formatCurrency, BAGS_PER_PALLET, PRICE } from "@/lib/pricing";
import { PAGE_SLUG_TO_ES, HUB_SLUGS_ES } from "./slugMap";

export interface EsFaqItem {
  q: string;
  a: string;
}

export interface EsPage {
  slug: string;
  enSlug: string;
  pageType: CalcPage["pageType"];
  category: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  geometry: CalcPage["geometry"];
  defaultBag: 40 | 60 | 80;
  faq: EsFaqItem[];
}

export interface EsHub {
  slug: string;
  enSlug: string;
  category: string;
  h1: string;
  metaTitle: string;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function dollars(n: number): number {
  return Math.round(n);
}

function bagWord(count: number): string {
  return count === 1 ? "saco" : "sacos";
}

function truckNote(bags80: number): string {
  return bags80 > 60
    ? " Por encima de ~60 sacos, un camión de concreto premezclado suele ser más económico — la página muestra ambas opciones."
    : "";
}

function slabFamilyEs(page: CalcPage): EsPage {
  const { lengthFt, widthFt, thicknessIn } = page.geometry as {
    lengthFt: number;
    widthFt: number;
    thicknessIn: number;
  };
  const cuFt = slabCuFt(lengthFt, widthFt, thicknessIn);
  const cuFtWaste = round1(cuFt * 1.1);
  const bags80 = bagsNeeded(cuFt, 80);
  const bags60 = bagsNeeded(cuFt, 60);
  const cost = dollars(bagCost(bags80, 80));

  const isDriveway = page.category === "driveway";
  const isShed = page.category === "shed";
  const nounEs = isShed ? "base de cobertizo" : "losa";

  if (isDriveway) {
    return {
      slug: PAGE_SLUG_TO_ES[page.slug],
      enSlug: page.slug,
      pageType: page.pageType,
      category: page.category,
      h1: `¿Cuántos Sacos de Concreto Necesito para una Losa de ${lengthFt}x${widthFt} a 6 Pulgadas?`,
      metaTitle: `Losa ${lengthFt}x${widthFt} (6") Entrada: Sacos y Costo`,
      metaDescription: `Una losa de ${lengthFt}x${widthFt} a 6" necesita ${bags80} sacos de concreto de 80 lb (~$${cost}). Conteo exacto, costo y comparación con camión para entradas.`,
      geometry: page.geometry,
      defaultBag: page.defaultBag,
      faq: [
        {
          q: `¿Cuántos sacos de concreto necesito para una entrada de ${lengthFt}x${widthFt} a 6 pulgadas?`,
          a: `Una losa de ${lengthFt}x${widthFt} a 6 pulgadas necesita aproximadamente ${bags80} sacos de 80 lb o ${bags60} sacos de 60 lb de concreto, incluyendo el 10% de desperdicio.`,
        },
        {
          q: "¿Es suficiente un espesor de 6 pulgadas para una entrada de vehículos?",
          a: "Sí. 6 pulgadas es el espesor estándar para entradas residenciales y áreas que soportan el peso de vehículos; 4 pulgadas es solo para patios y andadores.",
        },
        {
          q: `¿Debo usar sacos o un camión de concreto premezclado para una entrada de ${lengthFt}x${widthFt}?`,
          a: `Con ${bags80} sacos, este es un vaciado grande. Un camión de concreto premezclado suele ser más económico y rápido por encima de ~60 sacos — la página muestra ambas opciones lado a lado.`,
        },
      ],
    };
  }

  return {
    slug: PAGE_SLUG_TO_ES[page.slug],
    enSlug: page.slug,
    pageType: page.pageType,
    category: page.category,
    h1: isShed
      ? `¿Cuántos Sacos de Concreto Necesito para una Base de Cobertizo de ${lengthFt}x${widthFt}?`
      : `¿Cuántos Sacos de Concreto Necesito para una Losa de ${lengthFt}x${widthFt}?`,
    metaTitle: isShed
      ? `Base de Cobertizo ${lengthFt}x${widthFt}: Sacos Exactos y Costo`
      : `Losa de Concreto ${lengthFt}x${widthFt}: Sacos Exactos y Costo`,
    metaDescription: `Una ${nounEs} de ${lengthFt}x${widthFt} a ${thicknessIn}" necesita ${bags80} sacos de concreto de 80 lb (~$${cost}). Obtén el conteo exacto, costo y lista de materiales.`,
    geometry: page.geometry,
    defaultBag: page.defaultBag,
    faq: [
      {
        q: `¿Cuántos sacos de concreto necesito para una ${nounEs} de ${lengthFt}x${widthFt}?`,
        a: `Una ${nounEs} de ${lengthFt}x${widthFt} a ${thicknessIn} pulgadas necesita aproximadamente ${bags80} sacos de 80 lb o ${bags60} sacos de 60 lb de concreto, incluyendo un margen de desperdicio del 10%.`,
      },
      {
        q: `¿Cuánto cuesta una ${nounEs} de concreto de ${lengthFt}x${widthFt}?`,
        a: `Aproximadamente $${cost} en sacos de 80 lb a precios actuales.${truckNote(bags80)}`,
      },
      {
        q: `¿Cuántos pies cúbicos de concreto tiene una ${nounEs} de ${lengthFt}x${widthFt} a ${thicknessIn} pulgadas?`,
        a: `Aproximadamente ${round1(cuFt)} pies cúbicos, o ${cuFtWaste} pies cúbicos al añadir el margen de desperdicio del 10%.`,
      },
    ],
  };
}

function sonotubeFamilyEs(page: CalcPage): EsPage {
  const { diameterIn, depthIn } = page.geometry as { diameterIn: number; depthIn: number };
  const cuFt = round1(cylinderCuFt(diameterIn, depthIn));
  const bags80 = bagsNeeded(cylinderCuFt(diameterIn, depthIn), 80);
  const bags60 = bagsNeeded(cylinderCuFt(diameterIn, depthIn), 60);

  return {
    slug: PAGE_SLUG_TO_ES[page.slug],
    enSlug: page.slug,
    pageType: page.pageType,
    category: page.category,
    h1: `¿Cuántos Sacos de Concreto Necesito para un Sonotubo de ${diameterIn} Pulgadas?`,
    metaTitle: `Sonotubo de ${diameterIn}": Sacos de Concreto por 4 pies de Profundidad`,
    metaDescription: `Un sonotubo de ${diameterIn}" lleno a ${depthIn}" de profundidad necesita ${bags80} sacos de concreto de 80 lb. Ajusta la profundidad para el conteo exacto y el costo.`,
    geometry: page.geometry,
    defaultBag: page.defaultBag,
    faq: [
      {
        q: `¿Cuántos sacos de concreto necesito para un sonotubo de ${diameterIn} pulgadas?`,
        a: `Un tubo de ${diameterIn} pulgadas lleno a ${depthIn} pulgadas de profundidad necesita aproximadamente ${bags80} sacos de 80 lb o ${bags60} sacos de 60 lb de concreto, incluyendo el 10% de desperdicio.`,
      },
      {
        q: "¿Cómo calculo el concreto para un tubo más profundo o menos profundo?",
        a: "Ingresa tu profundidad en la calculadora de arriba y el número de sacos se actualiza al instante. El concreto necesario escala directamente con la profundidad.",
      },
      {
        q: `¿Cuánto concreto contiene un sonotubo de ${diameterIn} pulgadas?`,
        a: `Aproximadamente ${cuFt} pies cúbicos por cada ${depthIn} pulgadas de profundidad para un tubo de ${diameterIn} pulgadas.`,
      },
    ],
  };
}

interface PostholeMeta {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  subject: string;
  pluralSubject: string;
}

const POSTHOLE_META: Record<string, PostholeMeta> = {
  "4x4-fence-post-8-inch-hole": {
    h1: "¿Cuántos Sacos de Concreto Necesito para un Poste de Cerca de 4x4?",
    metaTitle: 'Poste de Cerca 4x4 (Hoyo de 8"): Sacos de Concreto por Hoyo',
    metaDescription:
      'Un poste de cerca de 4x4 en un hoyo de 8" a 24" de profundidad necesita 2 sacos de concreto de 60 lb. Conteo por poste y para varios postes al instante.',
    subject: "poste de cerca de 4x4",
    pluralSubject: "postes de cerca de 4x4",
  },
  "4x4-fence-post-9-inch-hole": {
    h1: "¿Cuántos Sacos de Concreto Necesito para un Poste de Cerca de 4x4?",
    metaTitle: 'Poste de Cerca 4x4 (Hoyo de 9"): Sacos de Concreto por Hoyo',
    metaDescription:
      'Un poste de cerca de 4x4 en un hoyo de 9" a 24" de profundidad necesita 2 sacos de concreto de 60 lb. Conteo por poste y para varios postes al instante.',
    subject: "poste de cerca de 4x4",
    pluralSubject: "postes de cerca de 4x4",
  },
  "4x4-fence-post-36-inch-deep": {
    h1: "¿Cuántos Sacos de Concreto Necesito para un Poste de Cerca de 4x4?",
    metaTitle: 'Poste de Cerca 4x4 (36" de Profundidad): Sacos de Concreto por Hoyo',
    metaDescription:
      'Un poste de cerca de 4x4 en un hoyo de 9" a 36" de profundidad necesita 3 sacos de concreto de 60 lb. Conteo por poste y para varios postes al instante.',
    subject: "poste de cerca de 4x4",
    pluralSubject: "postes de cerca de 4x4",
  },
  "6x6-post-10-inch-hole": {
    h1: "¿Cuántos Sacos de Concreto Necesito para un Poste de 6x6?",
    metaTitle: 'Poste 6x6 (Hoyo de 10"): Sacos de Concreto por Hoyo',
    metaDescription:
      'Un poste de 6x6 en un hoyo de 10" a 30" de profundidad necesita 2 sacos de concreto de 60 lb. Conteo por poste y para varios postes al instante.',
    subject: "poste de 6x6",
    pluralSubject: "postes de 6x6",
  },
  "6x6-post-12-inch-hole": {
    h1: "¿Cuántos Sacos de Concreto Necesito para un Poste de Terraza de 6x6?",
    metaTitle: 'Poste de Terraza 6x6 (Hoyo de 12"): Sacos de Concreto por Hoyo',
    metaDescription:
      'Un poste de terraza de 6x6 en un hoyo de 12" a 36" de profundidad necesita 4 sacos de concreto de 60 lb. Conteo por poste y para varios postes al instante.',
    subject: "poste de terraza de 6x6",
    pluralSubject: "postes de terraza de 6x6",
  },
  "mailbox-post-concrete": {
    h1: "¿Cuántos Sacos de Concreto Necesito para un Poste de Buzón?",
    metaTitle: "Poste de Buzón: Sacos de Concreto por Hoyo",
    metaDescription:
      'Un poste de buzón en un hoyo de 8" a 24" de profundidad necesita 2 sacos de concreto de 60 lb. Conteo por poste y para varios postes al instante.',
    subject: "poste de buzón",
    pluralSubject: "postes de buzón",
  },
  "pergola-post-concrete": {
    h1: "¿Cuántos Sacos de Concreto Necesito para un Poste de Pérgola?",
    metaTitle: "Poste de Pérgola: Sacos de Concreto por Hoyo",
    metaDescription:
      'Un poste de pérgola en un hoyo de 12" a 36" de profundidad necesita 4 sacos de concreto de 60 lb. Conteo por poste y para varios postes al instante.',
    subject: "poste de pérgola",
    pluralSubject: "postes de pérgola",
  },
};

function postholeFamilyEs(page: CalcPage): EsPage {
  const { diameterIn, depthIn, postSideIn } = page.geometry as {
    diameterIn: number;
    depthIn: number;
    postSideIn: number;
  };
  const meta = POSTHOLE_META[page.slug];
  const cuFt = postHoleCuFt(diameterIn, depthIn, postSideIn);
  const bags60 = bagsNeeded(cuFt, 60);
  const bags80 = bagsNeeded(cuFt, 80);
  const bags60ForFive = bagsNeeded(cuFt * 5, 60);

  return {
    slug: PAGE_SLUG_TO_ES[page.slug],
    enSlug: page.slug,
    pageType: page.pageType,
    category: page.category,
    h1: meta.h1,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    geometry: page.geometry,
    defaultBag: page.defaultBag,
    faq: [
      {
        q: `¿Cuántos sacos de concreto necesito para un ${meta.subject}?`,
        a: `Un ${meta.subject} colocado en un hoyo de ${diameterIn} pulgadas a ${depthIn} pulgadas de profundidad necesita aproximadamente ${bags60} ${bagWord(bags60)} de 60 lb o ${bags80} ${bagWord(bags80)} de 80 lb de concreto, incluyendo el desperdicio.`,
      },
      {
        q: `¿Cuánto concreto necesito para 5 ${meta.pluralSubject}?`,
        a: `Aproximadamente ${bags60ForFive} ${bagWord(bags60ForFive)} de 60 lb para 5 postes. Compra uno o dos sacos extra para no quedarte corto a mitad del trabajo.`,
      },
      {
        q: `¿Puedo usar concreto de fraguado rápido para un ${meta.subject}?`,
        a: "Sí. Mucha gente vierte la mezcla de fraguado rápido directamente en el hoyo y agrega agua. El número de sacos es el mismo que con la mezcla estándar.",
      },
    ],
  };
}

interface ReferenceMeta {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  faq: EsFaqItem[];
}

const bags80PerYard = Math.ceil(27 / YIELD[80] - EPSILON);
const bags60PerYard = Math.ceil(27 / YIELD[60] - EPSILON);
const bags40PerYard = Math.ceil(27 / YIELD[40] - EPSILON);
const cost80PerYard = dollars(bagCost(bags80PerYard, 80));
const cost60PerYard = dollars(bagCost(bags60PerYard, 60));
const costPerCuFt80 = formatCurrency(PRICE[80] / YIELD[80]);
const costPerCuFt60 = formatCurrency(PRICE[60] / YIELD[60]);
const costPerCuFt40 = formatCurrency(PRICE[40] / YIELD[40]);

const REFERENCE_META: Record<string, ReferenceMeta> = {
  "bags-of-concrete-per-yard": {
    h1: "¿Cuántos Sacos de Concreto Hay en una Yarda?",
    metaTitle: "Sacos de Concreto por Yarda: 80, 60 y 40 lb",
    metaDescription: `Una yarda cúbica requiere ${bags80PerYard} sacos de 80 lb, ${bags60PerYard} sacos de 60 lb, o ${bags40PerYard} sacos de 40 lb de concreto. Mira el desglose completo y cuándo cambiar a un camión.`,
    faq: [
      {
        q: "¿Cuántos sacos de concreto forman una yarda?",
        a: `Una yarda cúbica son 27 pies cúbicos. Eso equivale a ${bags80PerYard} sacos de 80 lb, ${bags60PerYard} sacos de 60 lb, o ${bags40PerYard} sacos de 40 lb de concreto.`,
      },
      {
        q: "¿Cuántos sacos de 80 lb hay en una yarda de concreto?",
        a: `${bags80PerYard} sacos de 80 lb forman una yarda cúbica, ya que cada saco rinde ${YIELD[80]} pies cúbicos (27 dividido entre ${YIELD[80]} = ${bags80PerYard}).`,
      },
      {
        q: "¿Es más barato comprar sacos o una yarda de concreto premezclado?",
        a: "Para trabajos pequeños, los sacos son convenientes. Al acercarte a una yarda completa, un camión de concreto premezclado suele ser más económico y mucho menos trabajo.",
      },
    ],
  },
  "80lb-bags-per-yard": {
    h1: "¿Cuántos Sacos de 80 lb de Concreto Hay en una Yarda?",
    metaTitle: "Sacos de 80 lb por Yarda de Concreto: La Respuesta",
    metaDescription: `Se necesitan ${bags80PerYard} sacos de 80 lb de concreto para hacer una yarda cúbica. Aquí está el cálculo, el costo, y cuándo gana un camión premezclado.`,
    faq: [
      {
        q: "¿Cuántos sacos de 80 lb hay en una yarda?",
        a: `${bags80PerYard} sacos. Cada saco de 80 lb rinde ${YIELD[80]} pies cúbicos, y una yarda cúbica son 27 pies cúbicos (27 dividido entre ${YIELD[80]} = ${bags80PerYard}).`,
      },
      {
        q: "¿Cuánto cuesta una yarda de concreto en sacos de 80 lb?",
        a: `Aproximadamente $${cost80PerYard} por ${bags80PerYard} sacos a precios actuales, antes de contar el esfuerzo de mezclar cada uno a mano.`,
      },
      {
        q: "¿Cuántos sacos de 80 lb hay en una tarima?",
        a: `Una tarima estándar tiene aproximadamente ${BAGS_PER_PALLET[80]} sacos de 80 lb, cerca de una yarda cúbica completa.`,
      },
    ],
  },
  "60lb-bags-per-yard": {
    h1: "¿Cuántos Sacos de 60 lb de Concreto Hay en una Yarda?",
    metaTitle: "Sacos de 60 lb por Yarda de Concreto: La Respuesta",
    metaDescription: `Se necesitan ${bags60PerYard} sacos de 60 lb de concreto para hacer una yarda cúbica. Mira el cálculo, el costo, y cómo se compara con los sacos de 80 lb.`,
    faq: [
      {
        q: "¿Cuántos sacos de 60 lb hay en una yarda?",
        a: `${bags60PerYard} sacos. Cada saco de 60 lb rinde ${YIELD[60]} pies cúbicos, y una yarda cúbica son 27 pies cúbicos (27 dividido entre ${YIELD[60]} = ${bags60PerYard}).`,
      },
      {
        q: "¿Son los sacos de 60 lb una buena opción?",
        a: "Los sacos de 60 lb son más fáciles de cargar pero cuestan más por pie cúbico que los de 80 lb. Úsalos para trabajos en solitario o vaciados más pequeños.",
      },
      {
        q: "¿Cuánto cuesta una yarda en sacos de 60 lb?",
        a: `Aproximadamente $${cost60PerYard} por ${bags60PerYard} sacos a precios actuales.`,
      },
    ],
  },
  "cubic-feet-per-bag": {
    h1: "¿Cuántos Pies Cúbicos Tiene un Saco de Concreto?",
    metaTitle: "Pies Cúbicos por Saco de Concreto: 80, 60, 40 lb",
    metaDescription: `Un saco de 80 lb rinde ${YIELD[80]} pies³, uno de 60 lb rinde ${YIELD[60]} pies³, y uno de 40 lb rinde ${YIELD[40]} pies³ de concreto terminado. Tabla completa de rendimiento aquí dentro.`,
    faq: [
      {
        q: "¿Cuántos pies cúbicos cubre un saco de concreto de 80 lb?",
        a: `Un saco de 80 lb rinde aproximadamente ${YIELD[80]} pies cúbicos de concreto mezclado.`,
      },
      {
        q: "¿Cuántos pies cúbicos tiene un saco de 60 lb y uno de 40 lb?",
        a: `Un saco de 60 lb rinde ${YIELD[60]} pies cúbicos y uno de 40 lb rinde ${YIELD[40]} pies cúbicos.`,
      },
      {
        q: "¿Cómo convierto pies cúbicos en número de sacos?",
        a: "Divide los pies cúbicos de tu proyecto entre el rendimiento del saco, y añade un 10% por desperdicio. Las calculadoras de este sitio lo hacen por ti.",
      },
    ],
  },
  "80lb-vs-60lb-concrete": {
    h1: "Sacos de Concreto de 80 lb vs 60 lb: ¿Cuál Comprar?",
    metaTitle: "Sacos de Concreto 80 lb vs 60 lb: Valor y Manejo",
    metaDescription: `Los sacos de 80 lb rinden más concreto por dólar (${costPerCuFt80} vs ${costPerCuFt60} por pie³); los sacos de 60 lb son más ligeros de cargar. Aquí cuándo elegir cada uno.`,
    faq: [
      {
        q: "¿Es mejor comprar un saco de concreto de 80 lb o de 60 lb?",
        a: `Los sacos de 80 lb cuestan menos por pie cúbico, aproximadamente ${costPerCuFt80} frente a ${costPerCuFt60}, por lo que son la mejor opción para vaciados más grandes.`,
      },
      {
        q: "¿Cuándo debo usar sacos de 60 lb en lugar de 80 lb?",
        a: "Elige sacos de 60 lb cuando debas cargarlos una larga distancia, trabajes solo, o mezcles en una carretilla, donde el peso ligero importa más que el costo.",
      },
      {
        q: "¿Cuánto más concreto tiene un saco de 80 lb?",
        a: `Un saco de 80 lb rinde ${YIELD[80]} pies cúbicos frente a ${YIELD[60]} de uno de 60 lb, casi un 33% más de concreto por saco.`,
      },
    ],
  },
  "bags-on-a-pallet": {
    h1: "¿Cuántos Sacos de Concreto Hay en una Tarima?",
    metaTitle: "Sacos de Concreto por Tarima: 80, 60 y 40 lb",
    metaDescription: `Una tarima tiene aproximadamente ${BAGS_PER_PALLET[80]} sacos de 80 lb, ${BAGS_PER_PALLET[60]} sacos de 60 lb, o ${BAGS_PER_PALLET[40]} sacos de 40 lb de concreto. Comprar por tarima puede ahorrarte entre $20 y $40.`,
    faq: [
      {
        q: "¿Cuántos sacos de 80 lb hay en una tarima?",
        a: `Aproximadamente ${BAGS_PER_PALLET[80]} sacos de 80 lb por tarima, cerca de una yarda cúbica. El número varía un poco según la marca.`,
      },
      {
        q: "¿Ahorro dinero al comprar una tarima completa?",
        a: "Sí. Una tarima completa de sacos de 80 lb normalmente ahorra entre $20 y $40 frente a comprar los sacos por separado, y muchas veces incluye la entrega.",
      },
      {
        q: "¿Cuántos sacos de 60 lb o 40 lb hay por tarima?",
        a: `Aproximadamente ${BAGS_PER_PALLET[60]} sacos de 60 lb u ${BAGS_PER_PALLET[40]} sacos de 40 lb, aunque el número exacto varía según el fabricante y la tienda.`,
      },
    ],
  },
  "concrete-bag-prices": {
    h1: "¿Cuánto Cuesta un Saco de Concreto en 2026?",
    metaTitle: "Precios de Sacos de Concreto 2026: 80, 60 y 40 lb",
    metaDescription: `Un saco de 80 lb cuesta aproximadamente $${PRICE[80]}, uno de 60 lb $${PRICE[60]}, y uno de 40 lb $${PRICE[40]} en Home Depot y Lowe's en 2026. Mira el costo por pie cúbico.`,
    faq: [
      {
        q: "¿Cuánto cuesta un saco de concreto de 80 lb?",
        a: `Aproximadamente $${PRICE[80]} en Home Depot y Lowe's en la primavera de 2026, aunque los precios varían según la región.`,
      },
      {
        q: "¿Cuál tamaño de saco es más barato por pie cúbico?",
        a: `El saco de 80 lb, a aproximadamente ${costPerCuFt80} por pie cúbico, le gana al de 60 lb (${costPerCuFt60}) y al de 40 lb (${costPerCuFt40}).`,
      },
      {
        q: "¿Puedo conseguir un descuento en sacos de concreto?",
        a: "Sí. Comprar una tarima completa o pedir 50 sacos o más suele calificar para precios de contratista o por volumen en las tiendas principales.",
      },
    ],
  },
};

function referenceFamilyEs(page: CalcPage): EsPage {
  const meta = REFERENCE_META[page.slug];
  return {
    slug: PAGE_SLUG_TO_ES[page.slug],
    enSlug: page.slug,
    pageType: page.pageType,
    category: page.category,
    h1: meta.h1,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    geometry: page.geometry,
    defaultBag: page.defaultBag,
    faq: meta.faq,
  };
}

export const esPages: EsPage[] = pages.map((page) => {
  if (page.pageType === "posthole") return postholeFamilyEs(page);
  if (page.pageType === "reference") return referenceFamilyEs(page);
  if (page.pageType === "cylinder") return sonotubeFamilyEs(page);
  return slabFamilyEs(page);
});

const HUB_META: Record<string, { h1: string; metaTitle: string }> = {
  "slab-calculator": {
    h1: "Calculadora de Sacos para Losas de Concreto",
    metaTitle: "Calculadora de Losas de Concreto: Sacos por Tamaño",
  },
  "driveway-calculator": {
    h1: "Calculadora de Sacos para Entradas de Concreto",
    metaTitle: "Calculadora de Entradas de Concreto: Losas de 6 Pulgadas",
  },
  "post-hole-calculator": {
    h1: "Calculadora de Concreto para Cercas y Postes",
    metaTitle: "Calculadora de Hoyos para Postes: Sacos por Poste",
  },
  "sonotube-calculator": {
    h1: "Calculadora de Concreto para Sonotubos",
    metaTitle: "Calculadora de Sonotubos: Sacos de Concreto por Diámetro",
  },
  "shed-base-calculator": {
    h1: "Calculadora de Concreto para Base de Cobertizo",
    metaTitle: "Calculadora de Base de Cobertizo: Sacos de Concreto por Tamaño",
  },
  "concrete-reference": {
    h1: "Referencia y Conversiones de Sacos de Concreto",
    metaTitle: "Referencia de Concreto: Sacos por Yarda, Precios y Rendimiento",
  },
};

export const esHubs: EsHub[] = hubs.map((hub) => ({
  slug: HUB_SLUGS_ES[hub.slug],
  enSlug: hub.slug,
  category: hub.category,
  h1: HUB_META[hub.slug].h1,
  metaTitle: HUB_META[hub.slug].metaTitle,
}));
