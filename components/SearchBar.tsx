'use client';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Search apps..."
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}
