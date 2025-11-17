import { getSupabaseClient } from '@/lib/supabaseClient';

export async function POST(req) {
    try {
        const { appId, userAgent, referrer, ip } = await req.json();

        const supabase = getSupabaseClient();

        const { error } = await supabase.from('clicks').insert([
            {
                app_id: appId,
                user_agent: userAgent || null,
                referrer: referrer || null,
                ip: ip || null,
            },
        ]);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
