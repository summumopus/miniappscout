'use client';

export default function Footer() {
    return (
        <footer className="mt-12 py-6 border-t text-center text-sm text-gray-500">
            <p>
                MiniAppScout — Telegram Mini Apps Directory &middot;{' '}
                <a
                    href="https://github.com/summumopus/miniappscout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    GitHub
                </a>
            </p>
            <p className="mt-1">&copy; {new Date().getFullYear()} MiniAppScout</p>
        </footer>
    );
}
