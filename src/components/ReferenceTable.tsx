import { EPSILON, YIELD } from "@/lib/calc";
import { BAGS_PER_PALLET, PRICE, formatCurrency } from "@/lib/pricing";
import { es } from "@/lib/i18n/es";

const BAG_SIZES: (40 | 60 | 80)[] = [80, 60, 40];
const CUBIC_YARD_FT = 27;

interface ReferenceTableProps {
  locale?: "en" | "es";
}

export default function ReferenceTable({ locale = "en" }: ReferenceTableProps) {
  const isEs = locale === "es";
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-black/5 dark:bg-white/10">
          <tr>
            <th className="px-3 py-2 font-semibold">{isEs ? es.referenceTable.bagSize : "Bag size"}</th>
            <th className="px-3 py-2 font-semibold">
              {isEs ? es.referenceTable.yield : "Yield (cu ft)"}
            </th>
            <th className="px-3 py-2 font-semibold">{isEs ? es.referenceTable.price : "Price"}</th>
            <th className="px-3 py-2 font-semibold">
              {isEs ? es.referenceTable.costPerCuFt : "Cost / cu ft"}
            </th>
            <th className="px-3 py-2 font-semibold">
              {isEs ? es.referenceTable.bagsPerYard : "Bags per yard"}
            </th>
            <th className="px-3 py-2 font-semibold">
              {isEs ? es.referenceTable.bagsPerPallet : "Bags per pallet"}
            </th>
          </tr>
        </thead>
        <tbody>
          {BAG_SIZES.map((lb) => {
            const yieldCuFt = YIELD[lb];
            const price = PRICE[lb];
            const bagsPerYard = Math.ceil(CUBIC_YARD_FT / yieldCuFt - EPSILON);
            return (
              <tr key={lb} className="border-t border-black/10 dark:border-white/10">
                <td className="px-3 py-2 font-medium">{lb} lb</td>
                <td className="px-3 py-2">{yieldCuFt.toFixed(2)}</td>
                <td className="px-3 py-2">{formatCurrency(price)}</td>
                <td className="px-3 py-2">{formatCurrency(price / yieldCuFt)}</td>
                <td className="px-3 py-2">{bagsPerYard}</td>
                <td className="px-3 py-2">{BAGS_PER_PALLET[lb]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
