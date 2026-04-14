exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { email, whatsapp, source } = JSON.parse(event.body);
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_ANON_KEY;
        
        if (!email) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Email required' }) };
        }

        // Enregistrement dans Supabase (table prospects) via l'API REST
        const supabaseEndpoint = `${supabaseUrl}/rest/v1/prospects`;
        const response = await fetch(supabaseEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            },
            body: JSON.stringify({ email, whatsapp, source })
        });

        if (!response.ok) {
            throw new Error(`Supabase error: ${response.statusText}`);
        }
        
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
