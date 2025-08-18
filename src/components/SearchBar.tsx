import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search for cargo space, bookings, or track containers..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div 
      className="search-bar px-4 sm:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <Search className="search-icon w-4 h-4 sm:w-5 sm:h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`search-input ${isFocused ? 'search-shadow' : ''}`}
        />
        <button
          type="button"
          className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 text-muted-foreground hover:text-primary transition-colors"
          title="Voice search"
        >
          <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </motion.div>
  );
};