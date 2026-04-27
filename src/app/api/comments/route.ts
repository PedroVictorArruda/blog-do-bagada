import { NextRequest, NextResponse } from 'next/server';

const WP_API = 'http://blogdobagada.com.br/?rest_route=/wp/v2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { post, author_name, author_email, content, parent } = body;

    if (!post || !author_name || !author_email || !content) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const response = await fetch(`${WP_API}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post, author_name, author_email, content, parent: parent || 0 }),
    });

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: result.message || 'Erro ao enviar comentário.' }, { status: response.status });
  } catch {
    return NextResponse.json({ error: 'Erro interno ao processar comentário.' }, { status: 500 });
  }
}
