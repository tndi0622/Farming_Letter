
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const apiKey = process.env.STIBEE_API_KEY;
        const listId = process.env.STIBEE_LIST_ID;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!apiKey || !listId) {
            console.error('Stibee API definition missing');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const response = await fetch(`https://api.stibee.com/v1/lists/${listId}/subscribers`, {
            method: 'POST',
            headers: {
                'AccessToken': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventOccuredBy: 'SUBSCRIBER',
                confirmEmailYN: 'Y', // Send confirmation email? 'N' if you want immediate add (check permissions) or 'Y' for double opt-in default
                subscribers: [
                    {
                        email: email
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Stibee Error:', errorData);
            return NextResponse.json({ error: 'Failed to subscribe' }, { status: response.status });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Internal Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
