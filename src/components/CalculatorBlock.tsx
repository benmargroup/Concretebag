"use client";

import { useMemo, useState } from "react";
import type { CalcPage } from "@data/pages";
import type { EsPage } from "@/lib/i18n/esPages";
import { es } from "@/lib/i18n/es";
import { bagsNeeded, cylinderCuFt, postHoleCuFt, slabCuFt } from "@/lib/calc";
import { PRICE, PRICING_LABEL, bagCost, formatCurrency } from "@/lib/pricing";
import MaterialList from "./MaterialList";

interface CalculatorBlockProps {
  page: CalcPage | EsPage;
  locale?: "en" | "es";
  afterAnswer?: React.ReactNode;
  afterCalculator?: React.ReactNode;
}

interface FieldProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function Field({ label, unit, value, min, max, step, onChange }: FieldProps) {
  return (
    <label className="block text-sm">
      <span className="flex items-baseline justify-between font-medium">
        {label}
        <span className="text-black/60 dark:text-white/60">
          {value}
          {unit}
        </span>
      </span>
      <span className="mt-1 flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 w-full flex-1 accent-black dark:accent-white"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20 rounded border border-black/15 px-2 py-1 dark:border-white/20 dark:bg-transparent"
        />
      </span>
    </label>
  );
}

const BAG_OPTIONS: (40 | 60 | 80)[] = [80, 60, 40];

export default function CalculatorBlock({
  page,
  locale = "en",
  afterAnswer,
  afterCalculator,
}: CalculatorBlockProps) {
  const { geometry, pageType } = page;
  const isEs = locale === "es";

  const [lengthFt, setLengthFt] = useState(geometry.lengthFt ?? 10);
  const [widthFt, setWidthFt] = useState(geometry.widthFt ?? 10);
  const [thicknessIn, setThicknessIn] = useState(geometry.thicknessIn ?? 4);
  const [diameterIn, setDiameterIn] = useState(geometry.diameterIn ?? 8);
  const [depthIn, setDepthIn] = useState(geometry.depthIn ?? 24);
  const [postSideIn, setPostSideIn] = useState(geometry.postSideIn ?? 4);
  const [bagLb, setBagLb] = useState<40 | 60 | 80>(page.defaultBag);

  const cuFt = useMemo(() => {
    switch (pageType) {
      case "slab":
        return slabCuFt(lengthFt, widthFt, thicknessIn);
      case "cylinder":
        return cylinderCuFt(diameterIn, depthIn);
      case "posthole":
        return postHoleCuFt(diameterIn, depthIn, postSideIn);
      default:
        return 0;
    }
  }, [pageType, lengthFt, widthFt, thicknessIn, diameterIn, depthIn, postSideIn]);

  const bags = bagsNeeded(cuFt, bagLb);
  const cost = bagCost(bags, bagLb);

  let answer = "";
  if (isEs) {
    switch (pageType) {
      case "slab":
        answer = es.calculator.answers.slab(lengthFt, widthFt, thicknessIn, bags, bagLb);
        break;
      case "cylinder":
        answer = es.calculator.answers.cylinder(diameterIn, depthIn, bags, bagLb);
        break;
      case "posthole":
        answer = es.calculator.answers.posthole(postSideIn, diameterIn, depthIn, bags, bagLb);
        break;
    }
  } else {
    switch (pageType) {
      case "slab":
        answer = `A ${lengthFt}x${widthFt} slab at ${thicknessIn}" needs ${bags} bags of ${bagLb} lb concrete.`;
        break;
      case "cylinder":
        answer = `A ${diameterIn}" tube filled ${depthIn}" deep needs ${bags} bags of ${bagLb} lb concrete.`;
        break;
      case "posthole":
        answer = `One ${postSideIn}x${postSideIn} post in a ${diameterIn}" hole ${depthIn}" deep needs ${bags} bags of ${bagLb} lb concrete.`;
        break;
    }
  }

  const fields = isEs
    ? {
        length: es.calculator.fields.length,
        width: es.calculator.fields.width,
        thickness: es.calculator.fields.thickness,
        diameter: es.calculator.fields.diameter,
        depth: es.calculator.fields.depth,
        holeDiameter: es.calculator.fields.holeDiameter,
        holeDepth: es.calculator.fields.holeDepth,
        postSize: es.calculator.fields.postSize,
      }
    : {
        length: "Length",
        width: "Width",
        thickness: "Thickness",
        diameter: "Diameter",
        depth: "Depth",
        holeDiameter: "Hole diameter",
        holeDepth: "Hole depth",
        postSize: "Post size",
      };
  const ftUnit = isEs ? es.calculator.units.ft : " ft";
  const inUnit = isEs ? es.calculator.units.in : " in";

  return (
    <div className="mt-6">
      <p className="text-lg font-bold sm:text-xl">{answer}</p>
      {afterAnswer}
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        {isEs ? (
          <>
            {es.calculator.estimatedCostPrefix}: ~{formatCurrency(cost)} ({bags} ×{" "}
            {formatCurrency(PRICE[bagLb])}/saco, {es.calculator.pricingSuffix} {es.pricingLabel})
          </>
        ) : (
          <>
            Estimated cost: ~{formatCurrency(cost)} ({bags} × {formatCurrency(PRICE[bagLb])}/bag,{" "}
            {PRICING_LABEL} pricing)
          </>
        )}
      </p>

      <div className="mt-5 space-y-4 rounded-lg border border-black/10 p-4 dark:border-white/10">
        {pageType === "slab" && (
          <>
            <Field label={fields.length} unit={ftUnit} value={lengthFt} min={2} max={40} step={1} onChange={setLengthFt} />
            <Field label={fields.width} unit={ftUnit} value={widthFt} min={2} max={40} step={1} onChange={setWidthFt} />
            <Field
              label={fields.thickness}
              unit={inUnit}
              value={thicknessIn}
              min={2}
              max={12}
              step={0.5}
              onChange={setThicknessIn}
            />
          </>
        )}
        {pageType === "cylinder" && (
          <>
            <Field
              label={fields.diameter}
              unit={inUnit}
              value={diameterIn}
              min={4}
              max={36}
              step={1}
              onChange={setDiameterIn}
            />
            <Field label={fields.depth} unit={inUnit} value={depthIn} min={6} max={96} step={1} onChange={setDepthIn} />
          </>
        )}
        {pageType === "posthole" && (
          <>
            <Field
              label={fields.holeDiameter}
              unit={inUnit}
              value={diameterIn}
              min={6}
              max={24}
              step={1}
              onChange={setDiameterIn}
            />
            <Field
              label={fields.holeDepth}
              unit={inUnit}
              value={depthIn}
              min={12}
              max={48}
              step={1}
              onChange={setDepthIn}
            />
            <Field
              label={fields.postSize}
              unit={inUnit}
              value={postSideIn}
              min={2}
              max={8}
              step={0.5}
              onChange={setPostSideIn}
            />
          </>
        )}

        <div>
          <span className="block text-sm font-medium">
            {isEs ? es.calculator.bagSizeLabel : "Bag size"}
          </span>
          <div className="mt-1 flex gap-2">
            {BAG_OPTIONS.map((lb) => (
              <button
                key={lb}
                type="button"
                onClick={() => setBagLb(lb)}
                aria-pressed={bagLb === lb}
                className={`rounded-full border px-3 py-1 text-sm font-medium ${
                  bagLb === lb
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                }`}
              >
                {lb} lb
              </button>
            ))}
          </div>
        </div>
      </div>

      <MaterialList bagCount={bags} bagLb={bagLb} locale={locale} />
      {afterCalculator}
    </div>
  );
}
