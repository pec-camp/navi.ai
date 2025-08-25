"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/ui/lib/utils";

interface MainSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function MainSearchBar({
  onSearch,
  placeholder = "Search AI tools..",
  className,
}: MainSearchBarProps) {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      // Navigate to search page with query
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex h-14 w-full max-w-[672px] items-center rounded-[28px] border border-border bg-background shadow-sm transition-colors focus-within:border-secondary",
        className,
      )}
    >
      <div className="flex h-5 w-11 items-center justify-start pl-6">
        <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.67} />
      </div>

      <div className="flex flex-1 items-center px-4">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          name="search"
          className="h-12 border-0 bg-transparent p-0 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="pr-2">
        <Button
          type="submit"
          className="hover:bg-primary/90 h-11 rounded-full bg-secondary px-6 py-2.5 text-base font-normal text-white"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
