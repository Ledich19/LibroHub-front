'use client'
import { SliderFilter } from "@/components/ui/SliderFilter";
import { BooksWithFiltersQuery } from "../../../generated/graphql";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FacetedFilter } from "@/components/ui/FacetedFilter";
import SearchInput from "@/components/ui/SearchInput";
import { useEffect, useState } from "react";
import { isArray } from "@apollo/client/utilities";



type Filters = Record<string, string | string[] | number[]>;

function parseFilters(searchParams: URLSearchParams, selectKeys: string[]): Filters {
  const filters: Filters = {};
  for (const [key, value] of searchParams.entries()) {
    if (value.includes('-') && /^\d+-\d+$/.test(value)) {
      filters[key] = value.split('-').map(Number);
    } else if (selectKeys.includes(key)) {
      filters[key] = value.split(',');
    } else {
      filters[key] = value;
    }
  }
  return filters;
}

function serializeFilters(filters: Filters): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      if (typeof value[0] === 'number') {
        params.set(key, value.join('-'));
      } else {
        params.set(key, value.join(','));
      }
    } else if (typeof value === 'string') {
      params.set(key, value);
    }
  }
  return params.toString();
}

const Filters = ({ filtersData }: { filtersData: NonNullable<BooksWithFiltersQuery["booksFilters"]> }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectKeys = filtersData
    .filter(f => f.__typename === "FilterSelect")
    .map(f => f.name);

  const [filters, setFilters] = useState<Filters>(() => parseFilters(searchParams, selectKeys));

  useEffect(() => {
    const handler = setTimeout(() => {
      const query = serializeFilters(filters);
      router.push(`${pathname}?${query}`, { scroll: false });
    }, 500);

    return () => clearTimeout(handler);
  }, [filters, pathname, router]);

  useEffect(() => {
    setFilters(parseFilters(searchParams, selectKeys));
    console.log("---filters", filters);
  }, [searchParams]);

  const updateFilter = (key: string, value: Filters[string]) => {
    console.log(key, value);
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return <div className="flex flex-wrap gap-4 items-end p-4">
    {

      filtersData?.map((filter) => {

        switch (filter.__typename) {
          case "FilterRange":

            console.log(filter.max);

            return <SliderFilter
              key={filter.name}
              title={filter.name}
              min={filter.min}
              max={filter.max}
              value={filters[filter.name] as [number, number] ?? [filter.min, filter.max]}
              onChange={(v) => updateFilter(filter.name, v)}
            />

          case "FilterSearch":
            return <SearchInput
              key={filter.name}
              placeholder={filter.name}
              value={filters[filter.name] as string ?? ""}
              onChange={(v) => updateFilter(filter.name, v)}
            />

          case "FilterSelect":
            return <FacetedFilter
              key={filter.name + filter.type}
              title={filter.name}
              options={filter.options}
              multiple={filter.isMulti ?? false}
              value={isArray(filters[filter.name]) ? filters[filter.name] as string[] : []}
              onChange={(v) => updateFilter(filter.name, v)}
            />;
          default:
            return <></>

        }
      })

    }

    <button
      onClick={() => setFilters({})}
      className="btn btn-dash btn-sm "
    >
      Сбросить фильтры
    </button>
  </div>
}

export default Filters