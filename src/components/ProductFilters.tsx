import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterCategory {
  id: string;
  label: string;
  options: { value: string; label: string; count?: number }[];
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  benefits: string[];
}

const ProductFilters = ({ onFilterChange, activeFilters }: ProductFiltersProps) => {
  const [openSections, setOpenSections] = useState<string[]>([
    "category",
    "price",
  ]);

  const filterCategories: FilterCategory[] = [
    {
      id: "category",
      label: "Category",
      options: [
        { value: "Lip Makeup", label: "Lip Makeup" },
        { value: "Face Makeup", label: "Face Makeup" },
        { value: "Eye Makeup", label: "Eye Makeup" },
        { value: "Skin Care", label: "Skin Care" },
        { value: "Hair Care", label: "Hair Care" },
        { value: "Fragrance", label: "Fragrance" },
        { value: "Body Care", label: "Body Care" },
        { value: "Tools & Brushes", label: "Tools & Brushes" },
      ],
    },
    {
      id: "brand",
      label: "Brand",
      options: [
        { value: "The Beauty Vault", label: "The Beauty Vault" },
      ],
    },
    {
      id: "benefits",
      label: "Benefits",
      options: [
        { value: "hydrating", label: "Hydrating" },
        { value: "long-lasting", label: "Long Lasting" },
        { value: "moisturizing", label: "Moisturizing" },
        { value: "brightening", label: "Brightening" },
        { value: "anti-aging", label: "Anti-Aging" },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c) => c !== category)
      : [...activeFilters.categories, category];
    onFilterChange({ ...activeFilters, categories: newCategories });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...activeFilters,
      priceRange: [value[0], value[1]],
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, 100],
      brands: [],
      benefits: [],
    });
  };

  const activeFilterCount =
    activeFilters.categories.length +
    activeFilters.brands.length +
    activeFilters.benefits.length;

  return (
    <div className="w-full bg-background border-r h-full">
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-lg font-bold">Filters</h2>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear All ({activeFilterCount})
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <Collapsible
            open={openSections.includes("category")}
            onOpenChange={() => toggleSection("category")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="font-semibold">Category</span>
              {openSections.includes("category") ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              {filterCategories
                .find((f) => f.id === "category")
                ?.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${option.value}`}
                      checked={activeFilters.categories.includes(option.value)}
                      onCheckedChange={() => handleCategoryToggle(option.value)}
                    />
                    <label
                      htmlFor={`category-${option.value}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t" />

          {/* Price Range Filter */}
          <Collapsible
            open={openSections.includes("price")}
            onOpenChange={() => toggleSection("price")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="font-semibold">Price</span>
              {openSections.includes("price") ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-3">
              <div className="px-2">
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={activeFilters.priceRange}
                  onValueChange={handlePriceChange}
                  className="w-full"
                />
                <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                  <span>${activeFilters.priceRange[0]}</span>
                  <span>${activeFilters.priceRange[1]}+</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t" />

          {/* Benefits Filter */}
          <Collapsible
            open={openSections.includes("benefits")}
            onOpenChange={() => toggleSection("benefits")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="font-semibold">Benefits</span>
              {openSections.includes("benefits") ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              {filterCategories
                .find((f) => f.id === "benefits")
                ?.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`benefit-${option.value}`}
                      checked={activeFilters.benefits.includes(option.value)}
                      onCheckedChange={() => {
                        const newBenefits = activeFilters.benefits.includes(
                          option.value
                        )
                          ? activeFilters.benefits.filter((b) => b !== option.value)
                          : [...activeFilters.benefits, option.value];
                        onFilterChange({ ...activeFilters, benefits: newBenefits });
                      }}
                    />
                    <label
                      htmlFor={`benefit-${option.value}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductFilters;
