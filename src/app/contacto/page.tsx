"use client";
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Toast from "../components/Toast";
import { FaWhatsapp } from "react-icons/fa";

interface ContactData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;

  tipoServicio: string;
  urgencia: string;

  fechaPreferida: string;
  horaPreferida: string;

  mensaje: string;
  comoNosEncontro: string;
}

export default function ContactoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );
  const [showToast, setShowToast] = useState(false);

  const servicioLabels: { [key: string]: string } = {
    limpieza: "Limpieza Dental",
    resina: "Resinas",
    curetaje: "Curetajes",
    corona: "Coronas",
    protesis: "Prótesis",
    carillas: "Carillas Estéticas",
    urgencia: "Urgencia",
    consulta: "Consulta General",
  };

  const [formData, setFormData] = useState<ContactData>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    tipoServicio: "",
    urgencia: "",
    fechaPreferida: "",
    horaPreferida: "",
    mensaje: "",
    comoNosEncontro: "",
  });

  const totalSteps = 4;

  const showToastMessage = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateFormData = (field: keyof ContactData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.nombre &&
          formData.apellido &&
          formData.telefono &&
          formData.email
        );
      case 2:
        return !!(formData.tipoServicio && formData.urgencia);
      case 3:
        return !!(formData.fechaPreferida && formData.horaPreferida);
      case 4:
        return true; // Mensaje es opcional
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      showToastMessage(
        "Por favor completa todos los campos requeridos",
        "error"
      );
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = async () => {
    if (!validateStep(4)) {
      showToastMessage("Por favor completa la información", "error");
      return;
    }

    setIsSubmitting(true);
    showToastMessage("Enviando solicitud...", "info");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showToastMessage(
          "¡Solicitud enviada! Te redirigimos a WhatsApp para continuar...",
          "success"
        );

        // Abrir WhatsApp con mensaje predefinido
        const whatsappMessage = `Hola DetistCare! 👋

Acabo de enviar una solicitud de cita:
📝 Nombre: ${formData.nombre} ${formData.apellido}
🦷 Servicio: ${servicioLabels[formData.tipoServicio] || formData.tipoServicio}
📅 Fecha preferida: ${new Date(formData.fechaPreferida).toLocaleDateString(
          "es-ES"
        )}
⏰ Hora preferida: ${formData.horaPreferida}

¿Podrían confirmar mi cita? ¡Gracias!`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/524645799711?text=${encodedMessage}`;

        // Abrir WhatsApp después de un pequeño delay para que se muestre el toast
        setTimeout(() => {
          window.open(whatsappUrl, "_blank");
        }, 2000);

        // Resetear formulario
        setFormData({
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          tipoServicio: "",
          urgencia: "",
          fechaPreferida: "",
          horaPreferida: "",
          mensaje: "",
          comoNosEncontro: "",
        });
        setCurrentStep(1);
      } else {
        showToastMessage(
          result.error || "Error al enviar la solicitud",
          "error"
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);
      showToastMessage("Error de conexión. Inténtalo de nuevo.", "error");
    }

    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-domine text-gray-800 mb-4">
                📝 Información Personal
              </h2>
              <p className="text-gray-600">
                Cuéntanos un poco sobre ti para personalizar tu atención
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => updateFormData("nombre", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apellido *
                </label>
                <input
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => updateFormData("apellido", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300"
                  placeholder="Tu apellido"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => updateFormData("telefono", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300"
                placeholder="+52 123 456 7890"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300"
                placeholder="tu@email.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-domine text-gray-800 mb-4">
                🦷 Tipo de Servicio
              </h2>
              <p className="text-gray-600">
                Selecciona el servicio que necesitas
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                ¿Qué servicio necesitas? *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    value: "limpieza",
                    label: "🧼 Limpieza Dental",
                    desc: "Profilaxis y revisión general",
                  },
                  {
                    value: "resina",
                    label: "🔧 Resinas",
                    desc: "Restauraciones estéticas",
                  },
                  {
                    value: "curetaje",
                    label: "🩺 Curetajes",
                    desc: "Tratamiento periodontal",
                  },
                  {
                    value: "corona",
                    label: "👑 Coronas",
                    desc: "Zirconia o metal porcelana",
                  },
                  {
                    value: "protesis",
                    label: "🦷 Prótesis",
                    desc: "Removibles o fijas",
                  },
                  {
                    value: "carillas",
                    label: "✨ Carillas Estéticas",
                    desc: "Sonrisa perfecta",
                  },
                  {
                    value: "urgencia",
                    label: "🚨 Urgencia",
                    desc: "Dolor o emergencia",
                  },
                  {
                    value: "consulta",
                    label: "💬 Consulta General",
                    desc: "Revisión y diagnóstico",
                  },
                ].map((servicio) => (
                  <div
                    key={servicio.value}
                    onClick={() =>
                      updateFormData("tipoServicio", servicio.value)
                    }
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      formData.tipoServicio === servicio.value
                        ? "border-pink-400 bg-pink-50 shadow-lg"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">
                      {servicio.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {servicio.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                ¿Qué tan urgente es? *
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    value: "baja",
                    label: "🟢 No es urgente",
                    desc: "Puedo esperar algunas semanas",
                  },
                  {
                    value: "media",
                    label: "🟡 Moderada",
                    desc: "Prefiero esta semana",
                  },
                  {
                    value: "alta",
                    label: "🔴 Urgente",
                    desc: "Necesito atención pronto",
                  },
                ].map((urgencia) => (
                  <div
                    key={urgencia.value}
                    onClick={() => updateFormData("urgencia", urgencia.value)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      formData.urgencia === urgencia.value
                        ? "border-pink-400 bg-pink-50 shadow-lg"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">
                      {urgencia.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {urgencia.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-domine text-gray-800 mb-4">
                📅 Disponibilidad
              </h2>
              <p className="text-gray-600">
                ¿Cuándo te gustaría que te contactemos?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha preferida *
                </label>
                <input
                  type="date"
                  value={formData.fechaPreferida}
                  onChange={(e) =>
                    updateFormData("fechaPreferida", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hora preferida *
                </label>
                <select
                  value={formData.horaPreferida}
                  onChange={(e) =>
                    updateFormData("horaPreferida", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300"
                >
                  <option value="">Selecciona una hora</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">ℹ️</span>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Información importante:
                  </h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Te contactaremos para confirmar tu cita</li>
                    <li>• Los horarios están sujetos a disponibilidad</li>
                    <li>• Puedes reagendar si es necesario</li>
                    <li>• Consultorio: Lunes a Viernes 9:00 AM - 6:00 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-domine text-gray-800 mb-4">
                💬 Información Adicional
              </h2>
              <p className="text-gray-600">
                Últimos detalles para brindarte el mejor servicio
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mensaje adicional (opcional)
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => updateFormData("mensaje", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300"
                placeholder="Cuéntanos más detalles sobre tu caso, síntomas, o cualquier pregunta que tengas..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                ¿Cómo nos encontraste?
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { value: "google", label: "🔍 Google" },
                  { value: "facebook", label: "📘 Facebook" },
                  { value: "instagram", label: "📷 Instagram" },
                  { value: "recomendacion", label: "👥 Recomendación" },
                  { value: "otro", label: "🌐 Otro" },
                ].map((fuente) => (
                  <div
                    key={fuente.value}
                    onClick={() =>
                      updateFormData("comoNosEncontro", fuente.value)
                    }
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 text-center ${
                      formData.comoNosEncontro === fuente.value
                        ? "border-pink-400 bg-pink-50 shadow-lg"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">
                      {fuente.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen de la información */}
            <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
              <h3 className="font-bold text-rose-800 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Resumen de tu solicitud:
              </h3>
              <div className="space-y-2 text-rose-700">
                <p>
                  <strong>Nombre:</strong> {formData.nombre} {formData.apellido}
                </p>
                <p>
                  <strong>Teléfono:</strong> {formData.telefono}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Servicio:</strong> {formData.tipoServicio}
                </p>
                <p>
                  <strong>Urgencia:</strong> {formData.urgencia}
                </p>
                <p>
                  <strong>Fecha preferida:</strong> {formData.fechaPreferida}
                </p>
                <p>
                  <strong>Hora preferida:</strong> {formData.horaPreferida}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-rose-200">
      <Toast message={toastMessage} type={toastType} isVisible={showToast} />
      <Header />

      {/* Progress Bar */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step <= currentStep
                        ? "bg-pink-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? "✓" : step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 md:w-32 h-1 transition-all duration-300 ${
                        step < currentStep ? "bg-pink-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600">
                Paso {currentStep} de {totalSteps}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8 lg:p-12">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-500 text-white hover:bg-gray-600 transform hover:scale-105"
                  }`}
                >
                  ← Anterior
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-semibold hover:from-pink-500 hover:to-rose-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Siguiente →
                  </button>
                ) : (
                  <button
                    onClick={submitForm}
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      isSubmitting
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                    }`}
                  >
                    {isSubmitting ? (
                      "⏳ Enviando..."
                    ) : (
                      <span className="flex items-center gap-2">
                        <FaWhatsapp className="text-xl" />
                        Enviar por WhatsApp
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
