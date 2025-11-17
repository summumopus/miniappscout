import { getSupabaseClient } from '@/lib/supabaseClient';

export async function GET() {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('apps')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
