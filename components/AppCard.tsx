'use client';

import { useCallback } from 'react';

interface AppCardProps {
    app: {
        id: string;
        title: string;
        description: string;
        icon_url: string;
        launch_url: string;
        categories: string[];
        tags: string[];
    };
}

export default function AppCard({ app }: AppCardProps) {
    const handleClick = useCallback(() => {
        // Send click event to API
        fetch('/api/click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                appId: app.id,
                userAgent: navigator.userAgent,
                referrer: document.referrer,
                ip: null, // Optional: can be populated on server if needed
            }),
        }).catch((err) => console.error('Click tracking error:', err));
    }, [app.id]);

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-md transition hover:scale-105">
            <img
                src={app.icon_url}
                alt={app.title}
                className="w-16 h-16 mb-3 object-cover rounded"
            />
            <h2 className="font-bold text-lg">{app.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{app.description}</p>
            {app.categories && (
                <p className="text-xs mt-2 text-gray-500">
                    Categories: {app.categories.join(', ')}
                </p>
            )}
            <a
                href={app.launch_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="mt-3 inline-block text-blue-600 hover:underline text-sm"
            >
                Launch in Telegram
            </a>
        </div>
    );
}
