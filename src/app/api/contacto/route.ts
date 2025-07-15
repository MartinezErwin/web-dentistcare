import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validar campos requeridos
    const requiredFields = [
      "nombre",
      "apellido",
      "telefono",
      "email",
      "tipoServicio",
      "urgencia",
      "fechaPreferida",
      "horaPreferida",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Configurar transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Mapear valores para el email
    const servicioLabels: { [key: string]: string } = {
      limpieza: "🧼 Limpieza Dental",
      resina: "🔧 Resinas",
      curetaje: "🩺 Curetajes",
      corona: "👑 Coronas",
      protesis: "🦷 Prótesis",
      carillas: "✨ Carillas Estéticas",
      urgencia: "🚨 Urgencia",
      consulta: "💬 Consulta General",
    };

    const urgenciaLabels: { [key: string]: string } = {
      baja: "🟢 No es urgente",
      media: "🟡 Moderada",
      alta: "🔴 Urgente",
    };

    const fuenteLabels: { [key: string]: string } = {
      google: "🔍 Google",
      facebook: "📘 Facebook",
      instagram: "📷 Instagram",
      recomendacion: "👥 Recomendación",
      otro: "🌐 Otro",
    };

    // Email de confirmación para el cliente
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: "🦷 Solicitud de Cita Recibida - DetistCare",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fdf2f8;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; font-size: 28px; margin: 0;">🦷 DetistCare</h1>
            <p style="color: #6b7280; margin: 10px 0;">Cuidado Dental Moderno Hecho Personal</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">¡Hola ${
              formData.nombre
            }! 👋</h2>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Hemos recibido tu solicitud de cita. Nuestro equipo revisará tu información y te contactará pronto para confirmar tu cita.
            </p>
            
            <div style="background: #fef7ff; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ec4899;">
              <h3 style="color: #ec4899; margin-bottom: 15px;">📋 Resumen de tu solicitud:</h3>
              <div style="color: #374151; line-height: 1.8;">
                <p><strong>Servicio:</strong> ${
                  servicioLabels[formData.tipoServicio] || formData.tipoServicio
                }</p>
                <p><strong>Urgencia:</strong> ${
                  urgenciaLabels[formData.urgencia] || formData.urgencia
                }</p>
                <p><strong>Fecha preferida:</strong> ${new Date(
                  formData.fechaPreferida
                ).toLocaleDateString("es-ES")}</p>
                <p><strong>Hora preferida:</strong> ${
                  formData.horaPreferida
                }</p>
                <p><strong>Teléfono:</strong> ${formData.telefono}</p>
              </div>
            </div>

            <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #059669; margin-bottom: 15px;">⏰ ¿Qué sigue?</h3>
              <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Te contactaremos en las próximas 24 horas</li>
                <li>Confirmaremos tu cita según disponibilidad</li>
                <li>Te enviaremos un recordatorio antes de tu cita</li>
                <li>Podrás reagendar si es necesario</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #6b7280; margin-bottom: 15px;">¿Necesitas contactarnos directamente?</p>
              <a href="https://wa.me/524645799711?text=Hola%20DetistCare,%20acabo%20de%20enviar%20una%20solicitud%20de%20cita.%20Mi%20nombre%20es%20${encodeURIComponent(
                formData.nombre
              )}%20${encodeURIComponent(
        formData.apellido
      )}" style="display: inline-block; background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 0 10px; font-size: 16px;">
                💬 Continuar por WhatsApp
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            <p>DetistCare - Tu sonrisa es nuestra prioridad 🦷✨</p>
          </div>
        </div>
      `,
    };

    // Email de notificación para el consultorio
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🔔 Nueva Solicitud de Cita - ${formData.nombre} ${formData.apellido}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #ec4899; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
              🦷 Nueva Solicitud de Cita
            </h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">👤 Información del Paciente:</h3>
              <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p><strong>Nombre:</strong> ${formData.nombre} ${
        formData.apellido
      }</p>
                <p><strong>Teléfono:</strong> <a href="tel:${
                  formData.telefono
                }">${formData.telefono}</a></p>
                <p><strong>Email:</strong> <a href="mailto:${formData.email}">${
        formData.email
      }</a></p>
              </div>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">🦷 Detalles del Servicio:</h3>
              <div style="background: #fef7ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p><strong>Servicio solicitado:</strong> ${
                  servicioLabels[formData.tipoServicio] || formData.tipoServicio
                }</p>
                <p><strong>Nivel de urgencia:</strong> ${
                  urgenciaLabels[formData.urgencia] || formData.urgencia
                }</p>
              </div>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">📅 Disponibilidad:</h3>
              <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p><strong>Fecha preferida:</strong> ${new Date(
                  formData.fechaPreferida
                ).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                <p><strong>Hora preferida:</strong> ${
                  formData.horaPreferida
                }</p>
              </div>
            </div>

            ${
              formData.mensaje
                ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">💬 Mensaje adicional:</h3>
              <div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #f59e0b;">
                <p style="font-style: italic;">${formData.mensaje}</p>
              </div>
            </div>
            `
                : ""
            }

            ${
              formData.comoNosEncontro
                ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">📍 Fuente:</h3>
              <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p><strong>Nos encontró por:</strong> ${
                  fuenteLabels[formData.comoNosEncontro] ||
                  formData.comoNosEncontro
                }</p>
              </div>
            </div>
            `
                : ""
            }

            <div style="margin: 30px 0; text-align: center; padding: 20px; background: #fee2e2; border-radius: 8px;">
              <h3 style="color: #dc2626; margin-bottom: 15px;">⚡ Acción requerida:</h3>
              <p style="color: #7f1d1d; margin-bottom: 15px;">Contactar al paciente para confirmar la cita</p>
              <div>
                <a href="tel:${
                  formData.telefono
                }" style="display: inline-block; background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                  📞 Llamar
                </a>
                <a href="mailto:${
                  formData.email
                }" style="display: inline-block; background: #0369a1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                  📧 Email
                </a>
                <a href="https://wa.me/${formData.telefono.replace(
                  /[^0-9]/g,
                  ""
                )}" style="display: inline-block; background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                  💬 WhatsApp
                </a>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
              <p>Solicitud recibida el ${new Date().toLocaleDateString(
                "es-ES"
              )} a las ${new Date().toLocaleTimeString("es-ES")}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar ambos emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      {
        message: "¡Solicitud enviada exitosamente! Te contactaremos pronto.",
        data: {
          nombre: formData.nombre,
          email: formData.email,
          servicio:
            servicioLabels[formData.tipoServicio] || formData.tipoServicio,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
