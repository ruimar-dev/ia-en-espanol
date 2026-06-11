export const prerender = false;

import type { APIRoute } from 'astro';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  let email: string;
  try {
    const body = await request.json();
    email = (body?.email ?? '').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), { status: 400, headers });
  }

  if (!email || !isValidEmail(email)) {
    return new Response(
      JSON.stringify({ error: 'El email no tiene un formato válido.' }),
      { status: 400, headers }
    );
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error('[newsletter] Faltan RESEND_API_KEY o RESEND_AUDIENCE_ID');
    return new Response(
      JSON.stringify({ error: 'Error de configuración del servidor.' }),
      { status: 500, headers }
    );
  }

  const resendRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  // 409 = ya suscrito → tratar como éxito
  if (resendRes.status === 409) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  if (!resendRes.ok) {
    const errData: { message?: string } = await resendRes.json().catch(() => ({}));
    return new Response(
      JSON.stringify({ error: errData?.message ?? 'No se pudo completar la suscripción.' }),
      { status: resendRes.status, headers }
    );
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
