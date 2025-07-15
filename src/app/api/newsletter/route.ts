import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validar email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Configurar transporter de nodemailer
    // Puedes usar Gmail, Outlook, o cualquier servicio SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // Cambia por tu servicio preferido
      auth: {
        user: process.env.EMAIL_USER, // Tu email
        pass: process.env.EMAIL_PASSWORD, // Tu contraseña de aplicación
      },
    });

    // Email de confirmación para el usuario
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🦷 ¡Bienvenido al Newsletter de DetistCare!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fdf2f8;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; font-size: 28px; margin: 0;">🦷 DetistCare</h1>
            <p style="color: #6b7280; margin: 10px 0;">Cuidado Dental Moderno Hecho Personal</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">¡Gracias por suscribirte! 🎉</h2>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Nos alegra tenerte en nuestra comunidad de DetistCare. Ahora recibirás:
            </p>
            
            <ul style="color: #4b5563; line-height: 1.8; margin-bottom: 25px;">
              <li>✨ Consejos semanales de salud dental</li>
              <li>📚 Artículos exclusivos sobre cuidado bucal</li>
              <li>🎯 Tips de prevención personalizados</li>
              <li>📢 Promociones especiales en tratamientos</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3001/blog" style="display: inline-block; background: linear-gradient(45deg, #ec4899, #f472b6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                📖 Lee nuestro último artículo
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
              ¿Necesitas agendar una cita? Llámanos al +52 464 579 9711
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            <p>DetistCare - Cuidando tu sonrisa desde 2020</p>
          </div>
        </div>
      `,
    };

    // Email de notificación para ti (opcional)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Tu email para recibir notificaciones
      subject: "🔔 Nueva suscripción al Newsletter - DetistCare",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #ec4899;">Nueva suscripción al Newsletter</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleDateString(
            "es-ES"
          )}</p>
          <p><strong>Hora:</strong> ${new Date().toLocaleTimeString(
            "es-ES"
          )}</p>
        </div>
      `,
    };

    // Enviar ambos emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      { message: "¡Suscripción exitosa! Revisa tu email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error al enviar el email. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
