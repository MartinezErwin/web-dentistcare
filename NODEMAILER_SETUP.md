# 📧 Configuración de Nodemailer para DetistCare

## 🔧 Pasos para configurar el envío de emails:

### 1. **Configurar Gmail (Recomendado)**

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En "Seguridad" → "Verificación en 2 pasos" (debe estar activada)
3. En "Seguridad" → "Contraseñas de aplicaciones"
4. Selecciona "Correo" y "Otro"
5. Escribe "DetistCare Newsletter"
6. Copia la contraseña de 16 caracteres generada

### 2. **Actualizar .env.local**

Edita el archivo `.env.local` y reemplaza:

```env
# Tu email de Gmail
EMAIL_USER=tu_email_real@gmail.com

# La contraseña de aplicación de 16 caracteres (SIN espacios)
EMAIL_PASSWORD=abcd efgh ijkl mnop

# URL de tu sitio
SITE_URL=http://localhost:3001
```

### 3. **Otras opciones de email:**

#### **Outlook/Hotmail:**

```env
EMAIL_USER=tu_email@outlook.com
EMAIL_PASSWORD=tu_contraseña_de_aplicacion
```

En el archivo `route.ts`, cambia:

```typescript
service: "outlook";
```

#### **Yahoo:**

```env
EMAIL_USER=tu_email@yahoo.com
EMAIL_PASSWORD=tu_contraseña_de_aplicacion
```

En el archivo `route.ts`, cambia:

```typescript
service: "yahoo";
```

#### **Servidor SMTP personalizado:**

```typescript
const transporter = nodemailer.createTransport({
  host: "tu-servidor-smtp.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### 4. **Reiniciar el servidor**

Después de configurar las variables de entorno:

```bash
npm run dev
```

### 5. **Probar la funcionalidad**

1. Ve a `http://localhost:3001/blog`
2. Ingresa tu email en el newsletter
3. Haz click en "Suscribirme"
4. Revisa tu bandeja de entrada y spam

## 🎯 **Lo que sucede cuando alguien se suscribe:**

1. **Email de bienvenida** se envía al usuario
2. **Email de notificación** se envía a ti
3. **Toast de confirmación** aparece en la web
4. **Validación de email** en tiempo real

## 🔒 **Seguridad:**

- ✅ Nunca subas `.env.local` a GitHub
- ✅ Usa contraseñas de aplicación, no tu contraseña normal
- ✅ Las variables de entorno están protegidas
- ✅ Validación de emails del lado del servidor

## 🚨 **Solución de problemas:**

- **Error 535:** Contraseña incorrecta → Verifica la contraseña de aplicación
- **Error 534:** 2FA no activado → Activa verificación en 2 pasos
- **Error de conexión:** Firewall → Verifica conexión a internet
- **Emails no llegan:** Revisa carpeta de spam

¡Tu newsletter de DetistCare ahora está completamente funcional! 🦷✨
