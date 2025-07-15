"use client";
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Toast from "../components/Toast";
import { articles } from "../articles.js";
import Link from "next/link";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );
  const [showToast, setShowToast] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const mainArticle = articles[0];

  const showToastMessage = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToastMessage("Por favor ingresa tu email", "error");
      return;
    }
    if (!email.includes("@")) {
      showToastMessage("Por favor ingresa un email válido", "error");
      return;
    }

    setIsSubscribed(true);
    showToastMessage("Enviando...", "info");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showToastMessage("¡Te has suscrito exitosamente! 📧", "success");
        setEmail("");
      } else {
        showToastMessage(data.error || "Error al suscribirse", "error");
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      showToastMessage("Error de conexión. Inténtalo de nuevo.", "error");
      setIsSubscribed(false);
    }

    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-rose-200">
      <Toast message={toastMessage} type={toastType} isVisible={showToast} />
      <Header />

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-domine mb-6 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent animate-fade-scale">
              Blog DentistCare
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed animate-fade-scale">
              Consejos, tips y las últimas novedades en salud dental para
              mantener tu sonrisa perfecta
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-pink-500/25 transition-all duration-500 group">
              <div
                className={`h-64 bg-gradient-to-br ${mainArticle.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <div className="text-xl font-semibold">
                      Artículo Principal
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 left-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold bg-white/90 bg-gradient-to-r ${mainArticle.color} bg-clip-text text-transparent backdrop-blur-sm`}
                  >
                    {mainArticle.category}
                  </span>
                </div>

                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur-sm">
                    {mainArticle.readTime}
                  </span>
                </div>

                <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-white/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-white/20 rounded-full"></div>
              </div>

              <div className="p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-bold font-domine mb-6 text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                  {mainArticle.title}
                </h2>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {mainArticle.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {mainArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">Dra</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">
                        {mainArticle.author}
                      </div>
                      <div className="text-gray-500">{mainArticle.date}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <p className="text-gray-700 italic text-lg leading-relaxed">
                    &ldquo;{mainArticle.excerpt}&rdquo;
                  </p>
                </div>

                <div className="text-center">
                  <Link href={`/blog/${mainArticle.id}`}>
                    <button
                      className={`px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r ${mainArticle.color} text-white transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl mr-4`}
                    >
                      📖 Leer Artículo Completo
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="px-6 py-6 mt-5 border-2 border-pink-400 text-pink-500 hover:bg-pink-400 hover:text-white rounded-full font-semibold transition-all duration-300"
                  >
                    {showMoreInfo ? "📖 Ver Menos" : "📋 Más Info"}
                  </button>
                </div>

                {/* Additional Info Section */}
                {showMoreInfo && (
                  <div className="mt-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 animate-fade-scale">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                      📊 Sobre este artículo
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white rounded-xl p-4">
                        <div className="text-2xl font-bold text-pink-500 mb-2">
                          10
                        </div>
                        <div className="text-sm text-gray-600">
                          Consejos Prácticos
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <div className="text-2xl font-bold text-pink-500 mb-2">
                          5
                        </div>
                        <div className="text-sm text-gray-600">
                          Minutos de Lectura
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <div className="text-2xl font-bold text-pink-500 mb-2">
                          100%
                        </div>
                        <div className="text-sm text-gray-600">
                          Basado en Evidencia
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-600 italic">
                        &ldquo;La prevención es la mejor medicina dental&rdquo;
                        - Dra. Saria Rios
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-domine text-white mb-6 animate-fade-scale">
            ¡Mantente Informado!
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto animate-fade-scale">
            Suscríbete a nuestro newsletter y recibe los mejores consejos de
            salud dental directamente en tu email
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 rounded-full text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={isSubscribed}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl transform hover:scale-105 whitespace-nowrap ${
                isSubscribed
                  ? "bg-green-500 text-white"
                  : "bg-white text-pink-500 hover:bg-rose-50"
              }`}
            >
              {isSubscribed ? "✅ ¡Suscrito!" : "📧 Suscribirme"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
