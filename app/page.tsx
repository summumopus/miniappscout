'use client';

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import AppCard from '@/components/AppCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const supabase = getSupabaseClient();
  const [apps, setApps] = useState<any[]>([]);
  const [filteredApps, setFilteredApps] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch apps on mount
  useEffect(() => {
    const fetchApps = async () => {
      const { data, error } = await supabase.from('apps').select('*');
      if (error) {
        console.error('Error fetching apps:', error);
        return;
      }
      setApps(data || []);
      setFilteredApps(data || []);

      const uniqueCategories = Array.from(
        new Set(data?.flatMap((app: any) => app.categories || []))
      );
      setCategories(uniqueCategories);
    };
    fetchApps();
  }, [supabase]);

  // Filter apps by category and search query
  useEffect(() => {
    let result = apps;

    // Category filter
    if (selectedCategory) {
      result = result.filter((app) => app.categories?.includes(selectedCategory));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (app) =>
          app.title.toLowerCase().includes(query) ||
          app.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredApps(result);
  }, [apps, selectedCategory, searchQuery]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MiniAppScout — Telegram Mini Apps Directory</h1>

      <SearchBar onSearch={setSearchQuery} />
      <CategoryFilter categories={categories} onSelect={handleSelectCategory} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => <AppCard key={app.id} app={app} />)
        ) : (
          <p>No mini apps found.</p>
        )}
      </div>
    </main>
  );
}
