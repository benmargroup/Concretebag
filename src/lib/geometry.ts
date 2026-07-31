import type { CalcPage } from "@data/pages";
import { cylinderCuFt, postHoleCuFt, slabCuFt } from "@/lib/calc";

interface GeometricPage {
  pageType: CalcPage["pageType"];
  geometry: CalcPage["geometry"];
}

export function cuFtForPage(page: GeometricPage): number {
  const { geometry } = page;

  switch (page.pageType) {
    case "slab":
      return slabCuFt(geometry.lengthFt ?? 0, geometry.widthFt ?? 0, geometry.thicknessIn ?? 0);
    case "cylinder":
      return cylinderCuFt(geometry.diameterIn ?? 0, geometry.depthIn ?? 0);
    case "posthole":
      return postHoleCuFt(
        geometry.diameterIn ?? 0,
        geometry.depthIn ?? 0,
        geometry.postSideIn ?? 0
      );
    default:
      return 0;
  }
}
