export const prerender = false;

import type { APIRoute } from 'astro';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const PROMPTS_HTML = `
  <!-- Prompt 1 -->
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
    <tr>
      <td style="background:#f9f7ff;border:1px solid #ede9fe;border-radius:12px;padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#7c3aed;">📧 Email y comunicación · Prompt 1 de 5</p>
        <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111827;">Pedir una reseña a un cliente satisfecho</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background:#1e1e2e;border-radius:8px;padding:16px 18px;">
              <p style="margin:0;font-family:monospace;font-size:13px;color:#e2e8f0;line-height:1.7;">Escribe un mensaje corto y natural para pedirle a un cliente satisfecho que deje una reseña en Google. El cliente se llama [nombre] y compró/contrató [producto/servicio]. Que no suene a plantilla genérica.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Prompt 2 -->
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
    <tr>
      <td style="background:#f9f7ff;border:1px solid #ede9fe;border-radius:12px;padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#7c3aed;">📱 Redes y marketing · Prompt 2 de 5</p>
        <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111827;">Generar ideas de contenido cuando no se te ocurre nada</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background:#1e1e2e;border-radius:8px;padding:16px 18px;">
              <p style="margin:0;font-family:monospace;font-size:13px;color:#e2e8f0;line-height:1.7;">Dame 20 ideas de contenido para redes sociales de un negocio de [tipo de negocio] dirigido a [tu público]. Mezcla contenido educativo, de entretenimiento y promocional, en proporción 60/20/20.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Prompt 3 -->
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
    <tr>
      <td style="background:#f9f7ff;border:1px solid #ede9fe;border-radius:12px;padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#7c3aed;">💼 Gestión y administración · Prompt 3 de 5</p>
        <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111827;">Optimizar procesos internos</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background:#1e1e2e;border-radius:8px;padding:16px 18px;">
              <p style="margin:0;font-family:monospace;font-size:13px;color:#e2e8f0;line-height:1.7;">Este es mi proceso actual para [describe el proceso, ej: gestionar pedidos]: [describe los pasos]. Identifica los cuellos de botella y sugiere cómo simplificarlo o automatizarlo.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Prompt 4 -->
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
    <tr>
      <td style="background:#f9f7ff;border:1px solid #ede9fe;border-radius:12px;padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#7c3aed;">🎯 Ventas y atención al cliente · Prompt 4 de 5</p>
        <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111827;">Responder a "es muy caro"</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background:#1e1e2e;border-radius:8px;padding:16px 18px;">
              <p style="margin:0;font-family:monospace;font-size:13px;color:#e2e8f0;line-height:1.7;">Un cliente potencial me dice que mi [producto/servicio] es muy caro comparado con [competencia o alternativa]. Ayúdame a responder destacando el valor sin bajar el precio ni sonar defensivo.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Prompt 5 -->
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:0;">
    <tr>
      <td style="background:#f9f7ff;border:1px solid #ede9fe;border-radius:12px;padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#7c3aed;">⚙️ Productividad personal · Prompt 5 de 5</p>
        <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111827;">Priorizar tareas del día</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background:#1e1e2e;border-radius:8px;padding:16px 18px;">
              <p style="margin:0;font-family:monospace;font-size:13px;color:#e2e8f0;line-height:1.7;">Esta es mi lista de tareas de hoy: [lista tareas]. Ayúdame a priorizarlas usando la matriz de Eisenhower (urgente/importante) y dime con cuál debería empezar.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

function buildEmail(email: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f3ff;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:20px;border:1px solid #ede9fe;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#4c1d95,#7c3aed);padding:32px 40px 28px;">
            <p style="margin:0 0 16px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.6);letter-spacing:.12em;text-transform:uppercase;">IA en Español</p>
            <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;">Aquí tienes tus 5 prompts gratis 🎁</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.5;">Copia, sustituye los [corchetes] por los datos de tu negocio y pégalo en ChatGPT, Claude o Gemini.</p>
          </td>
        </tr>

        <!-- Prompts -->
        <tr>
          <td style="padding:32px 32px 24px;">
            ${PROMPTS_HTML}
          </td>
        </tr>

        <!-- Upsell -->
        <tr>
          <td style="padding:0 32px 36px;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="background:linear-gradient(135deg,#4c1d95,#7c3aed);border-radius:14px;padding:28px 28px 24px;">
                  <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,0.6);">Pack completo</p>
                  <p style="margin:0 0 10px;font-size:20px;font-weight:700;color:#ffffff;line-height:1.2;">¿Quieres los 45 restantes?</p>
                  <p style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.5;">El pack completo incluye <strong style="color:#fff;">50 prompts en 5 categorías</strong>: email, redes, gestión, ventas y productividad. Todo por <strong style="color:#c4b5fd;">€9.99</strong>.</p>
                  <a href="https://iaenespanol.gumroad.com/l/50-prompts-para-autonomos-y-pymes"
                     style="display:inline-block;background:#ffffff;color:#7c3aed;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
                    Descargar el pack completo →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px 28px;border-top:1px solid #f3f4f6;">
            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
              Recibiste este email porque lo pediste en <a href="https://iaenespanol.es" style="color:#7c3aed;text-decoration:none;">iaenespanol.es</a>.<br>
              Si no fuiste tú, puedes ignorar este mensaje.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
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
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;

  if (!apiKey || !audienceId || !fromEmail) {
    console.error('[lead-magnet] Faltan variables de entorno de Resend');
    return new Response(
      JSON.stringify({ error: 'Error de configuración del servidor.' }),
      { status: 500, headers }
    );
  }

  // Añadir a la audiencia
  const contactRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  const alreadySubscribed = contactRes.status === 409;
  if (!contactRes.ok && !alreadySubscribed) {
    const err: { message?: string } = await contactRes.json().catch(() => ({}));
    return new Response(
      JSON.stringify({ error: err?.message ?? 'No se pudo completar la suscripción.' }),
      { status: contactRes.status, headers }
    );
  }

  // Enviar siempre los prompts, incluso si ya estaba en la audiencia
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail,
      to: email,
      reply_to: 'comunidad.aienespanol@gmail.com',
      subject: '🎁 Tus 5 prompts gratuitos para tu negocio',
      html: buildEmail(email),
    }),
  });

  if (!emailRes.ok) {
    const emailErr = await emailRes.json().catch(() => ({}));
    console.error('[lead-magnet] Error enviando email:', emailErr);
    return new Response(
      JSON.stringify({ error: 'No se pudo enviar el email. Inténtalo de nuevo.' }),
      { status: 500, headers }
    );
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
