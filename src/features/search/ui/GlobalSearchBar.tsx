"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/ui/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";

interface GlobalSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function GlobalSearchBar({
  onSearch,
  placeholder = "Search AI tools..",
  className,
}: GlobalSearchBarProps) {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex h-14 w-full max-w-[672px] items-center rounded-[28px] border border-border bg-background p-1 shadow-sm",
        className,
      )}
    >
      <div className="flex h-5 w-11 items-center justify-start pl-6">
        <Search className="h-5 w-5 text-secondary" strokeWidth={1.67} />
      </div>

      <div className="flex flex-1 items-center px-4">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          name="search"
          className="h-auto border-0 bg-transparent p-0 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="pr-2">
        <Button
          type="submit"
          className="hover:bg-primary/90 h-10 rounded-full bg-secondary px-6 py-2.5 text-base font-normal text-white"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
