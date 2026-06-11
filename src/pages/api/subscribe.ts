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
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL; // opcional: requiere dominio verificado en Resend

  if (!apiKey || !audienceId) {
    console.error('[newsletter] Faltan RESEND_API_KEY o RESEND_AUDIENCE_ID');
    return new Response(
      JSON.stringify({ error: 'Error de configuración del servidor.' }),
      { status: 500, headers }
    );
  }

  // Añadir contacto a la audiencia
  const contactRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  // 409 = ya estaba suscrito → igualmente enviamos respuesta de éxito pero no duplicamos el email
  const alreadySubscribed = contactRes.status === 409;

  if (!contactRes.ok && !alreadySubscribed) {
    const errData: { message?: string } = await contactRes.json().catch(() => ({}));
    return new Response(
      JSON.stringify({ error: errData?.message ?? 'No se pudo completar la suscripción.' }),
      { status: contactRes.status, headers }
    );
  }

  // Enviar email de bienvenida solo si es suscripción nueva y hay dominio configurado
  if (!alreadySubscribed && fromEmail) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: email,
        subject: '¡Bienvenido a IA en Español! 🤖',
        html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7C3AED,#5B21B6);padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">
              <span style="color:#c4b5fd;">IA</span> en Español
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;">¡Ya eres parte de la comunidad!</h1>
            <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
              Gracias por suscribirte. A partir de ahora recibirás reviews en profundidad, comparativas honestas y guías prácticas sobre las mejores herramientas de IA. Todo en español, sin anglicismos.
            </p>

            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#f5f3ff;border-left:3px solid #7C3AED;border-radius:0 8px 8px 0;padding:16px 20px;">
                  <p style="margin:0;font-size:13px;font-weight:600;color:#7C3AED;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Mientras tanto</p>
                  <p style="margin:0;font-size:14px;color:#374151;line-height:1.5;">Explora los últimos artículos y comparativas que ya están publicados en el blog.</p>
                </td>
              </tr>
            </table>

            <a href="https://iaenespanol.es/blog"
               style="display:inline-block;background:#7C3AED;color:#ffffff;font-weight:600;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
              Ver artículos →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px 32px;border-top:1px solid #f3f4f6;">
            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
              Recibiste este email porque te suscribiste en <a href="https://iaenespanol.es" style="color:#7C3AED;text-decoration:none;">iaenespanol.es</a>.<br>
              Si no fuiste tú, puedes ignorar este mensaje.
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
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
