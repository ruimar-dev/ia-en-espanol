export const prerender = false;

import type { APIRoute } from 'astro';

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  let nombre: string, email: string, mensaje: string;
  try {
    const body = await request.json();
    nombre  = (body?.nombre  ?? '').trim();
    email   = (body?.email   ?? '').trim();
    mensaje = (body?.mensaje ?? '').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), { status: 400, headers });
  }

  if (!nombre)
    return new Response(JSON.stringify({ error: 'El nombre es obligatorio.' }), { status: 400, headers });
  if (!email || !isValidEmail(email))
    return new Response(JSON.stringify({ error: 'Introduce un email válido.' }), { status: 400, headers });
  if (!mensaje || mensaje.length < 10)
    return new Response(JSON.stringify({ error: 'El mensaje debe tener al menos 10 caracteres.' }), { status: 400, headers });

  const apiKey    = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error('[contact] Faltan RESEND_API_KEY o RESEND_FROM_EMAIL');
    return new Response(JSON.stringify({ error: 'Error de configuración del servidor.' }), { status: 500, headers });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: 'comunidad.aienespanol@gmail.com',
      reply_to: email,
      subject: `[Contacto web] Mensaje de ${nombre}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e6e5e2;overflow:hidden;">

        <tr>
          <td style="background:linear-gradient(135deg,#8983ff,#6c66f5);padding:28px 40px;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#fff;">
              <span style="color:#d4d1ff;">IA</span> en Español — Contacto
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#8983ff;">Nombre</p>
            <p style="margin:0 0 24px;font-size:15px;color:#18181b;">${nombre}</p>

            <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#8983ff;">Email</p>
            <p style="margin:0 0 24px;font-size:15px;color:#18181b;">
              <a href="mailto:${email}" style="color:#8983ff;text-decoration:none;">${email}</a>
            </p>

            <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#8983ff;">Mensaje</p>
            <p style="margin:0;font-size:15px;color:#18181b;line-height:1.65;white-space:pre-wrap;">${mensaje.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </td>
        </tr>

        <tr>
          <td style="padding:16px 40px 28px;border-top:1px solid #f0efec;">
            <p style="margin:0;font-size:12px;color:#a1a1aa;">
              Responde directamente a este email para contestar a ${nombre}.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }),
  });

  if (!res.ok) {
    const err: { message?: string } = await res.json().catch(() => ({}));
    console.error('[contact] Resend error:', err);
    return new Response(
      JSON.stringify({ error: err?.message ?? 'Error al enviar el mensaje. Inténtalo de nuevo.' }),
      { status: res.status, headers }
    );
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
