"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Separator } from "@/components/ui/Separator";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/utils";
import { PlusCircle, XCircleIcon } from "lucide-react";

type RangeValue = [number, number];

interface SliderFilterProps {
  title?: string;
  value: RangeValue;
  onChange: (value: RangeValue) => void;
  min: number;
  max: number;
  unit?: string;
  step?: number;
  useFormat?: boolean;
}

export function SliderFilter({
  title,
  value,
  onChange,
  min,
  max,
  unit,
  step,
  useFormat = false,
}: Readonly<SliderFilterProps>) {
  const id = React.useId();

  const range = React.useMemo<RangeValue>(() => {
    return [
      Math.max(min, Math.min(value[0], max)),
      Math.min(max, Math.max(value[1], min)),
    ];
  }, [value, min, max]);

  const formatValue = (v: number) => useFormat ?
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v) : v;

  const calcStep = step ?? ((): number => {
    const size = max - min;
    if (size <= 20) return 1;
    if (size <= 100) return Math.ceil(size / 20);
    return Math.ceil(size / 50);
  })();

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (!Number.isNaN(num) && num >= min && num <= range[1]) {
      onChange([num, range[1]]);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (!Number.isNaN(num) && num <= max && num >= range[0]) {
      onChange([range[0], num]);
    }
  };

  const handleSliderChange = (v: RangeValue) => {
    onChange(v);
  };

  const handleReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange([min, max]);
  };

  const hasFilter = value[0] !== min || value[1] !== max;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`btn btn-dash btn-sm has-[>svg]:px-2.5  
          disabled:opacity-50 [&_svg]:pointer-events-none 
          [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0`}>

          {hasFilter ? (
            <div
              role="button"
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={handleReset}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleReset();
                }
              }}
            >
              <XCircleIcon />
            </div>
          ) : (
            <PlusCircle />
          )}

          <span>{title}</span>
          {hasFilter && (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              {formatValue(range[0])} - {formatValue(range[1])}
              {unit ? ` ${unit}` : ""}
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col gap-4 bg-base-100">
        <div className="flex flex-col gap-3">
          <p className="font-medium leading-none">{title}</p>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input id={`${id}-from`}
                type="number"
                min={min}
                max={max}
                value={range[0]}
                onChange={handleFromChange}
                className={cn("input input-sm", "h-8 w-24", unit && "pr-8")}
                placeholder="From"
              />
              {unit && (
                <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
                  {unit}
                </span>
              )}
            </div>
            <div className="relative">

              <input id={`${id}-to`}
                type="number"
                min={min}
                max={max}
                value={range[1]}
                onChange={handleToChange}
                className={cn("input input-sm", "h-8 w-24", unit && "pr-8")}
              />
              {unit && (
                <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
                  {unit}
                </span>
              )}
            </div>
          </div>
          <Slider
            id={`${id}-slider`}
            min={min}
            max={max}
            step={calcStep}
            value={range}
            onValueChange={handleSliderChange}
          />
        </div>
        <button
          className="btn btn-outline btn-sm"
          aria-label={`Clear ${title} filter`}
          onClick={handleReset}
        >
          Clear
        </button>
      </PopoverContent>
    </Popover>
  );
}
