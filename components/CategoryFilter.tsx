'use client';

import { useState } from 'react';

interface CategoryFilterProps {
    categories: string[];
    onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ categories, onSelect }: CategoryFilterProps) {
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (category: string) => {
        if (selected === category) {
            setSelected(null);
            onSelect(null);
        } else {
            setSelected(category);
            onSelect(category);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleClick(cat)}
                    className={`px-3 py-1 rounded-full text-sm border transition ${selected === cat
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
