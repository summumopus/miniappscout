'use client';

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import AppCard from '@/components/AppCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: { user?: any };
        ready: () => void;
      };
    };
  }
}

export default function Home() {
  const supabase = getSupabaseClient();
  const [apps, setApps] = useState<any[]>([]);
  const [filteredApps, setFilteredApps] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tgUser, setTgUser] = useState<any | null>(null);

  // Initialize Telegram Web App
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const webApp = window.Telegram?.WebApp;
    if (!webApp) {
      return;
    }
    webApp.ready();
    const user = webApp.initDataUnsafe?.user || null;
    setTgUser(user);
    console.log('Telegram user:', user);
  }, []);

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

    if (selectedCategory) {
      result = result.filter((app) => app.categories?.includes(selectedCategory));
    }

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

  // Separate featured apps (verified)
  const featuredApps = filteredApps.filter((app) => app.verified);
  const otherApps = filteredApps.filter((app) => !app.verified);

  return (
    <>
      <main className="container mx-auto p-4">
        {tgUser && (
          <p className="mb-4 text-sm text-gray-600">
            Welcome, {tgUser.first_name} {tgUser.last_name || ''}!
          </p>
        )}

        <h1 className="text-3xl font-bold mb-4">
          MiniAppScout — Telegram Mini Apps Directory
        </h1>

        <SearchBar onSearch={setSearchQuery} />
        <CategoryFilter categories={categories} onSelect={setSelectedCategory} />

        {featuredApps.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-2 mt-6">Featured Apps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </>
        )}

        <h2 className="text-2xl font-semibold mb-2 mt-6">All Apps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherApps.length > 0 ? (
            otherApps.map((app) => <AppCard key={app.id} app={app} />)
          ) : (
            <p>No mini apps found.</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
