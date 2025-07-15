"use client";
import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { articles } from "../../articles.js";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = React.use(params);
  const article = articles.find((a) => a.id === parseInt(resolvedParams.id));
  const [shareMessage, setShareMessage] = useState("");

  if (!article) {
    notFound();
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${article.title} - ${article.description}`;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${text} ${url}`
        )}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      setShareMessage(`¡Compartido en ${platform}!`);
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  const handleScheduleAppointment = () => {
    // Aquí puedes agregar tu lógica para agendar citas
    // Por ejemplo, redirigir a una página de contacto o abrir un modal
    window.location.href = "tel:+524645799711"; // Cambia por tu número
  };

  return (
    <div className="min-h-screen bg-rose-200">
      <Header />

      {/* Back Button */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Link href="/blog">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-300 font-medium">
              <span>←</span>
              <span>Volver al Blog</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className={`h-80 bg-gradient-to-br ${article.color} rounded-3xl relative overflow-hidden mb-8`}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-8xl mb-6">📝</div>
                  <h1 className="text-3xl md:text-5xl font-bold font-domine mb-4 px-6">
                    {article.title}
                  </h1>
                  <div className="flex items-center justify-center space-x-6 text-white/90">
                    <span className="flex items-center space-x-2">
                      <span>👨‍⚕️</span>
                      <span>{article.author}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <span>📅</span>
                      <span>{article.date}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <span>⏱️</span>
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur-sm">
                  {article.category}
                </span>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border-4 border-white/20 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8 lg:p-12">
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  {article.content.introduction}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-gray-200">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Content Sections */}
              <div className="space-y-12">
                {article.content.sections.map((section, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold font-domine text-gray-800 mb-6 text-center">
                      {section.title}
                    </h2>

                    <p className="text-gray-700 mb-6 text-center italic">
                      {section.content}
                    </p>

                    {/* Points */}
                    {section.points && (
                      <ul className="space-y-3">
                        {section.points.map((point, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <span
                              className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${article.color} flex items-center justify-center mt-1`}
                            >
                              <span className="text-white text-sm font-bold">
                                ✓
                              </span>
                            </span>
                            <span className="text-gray-700 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Good Foods / Bad Foods */}
                    {section.goodFoods && (
                      <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-green-50 rounded-xl p-6">
                          <h3 className="font-bold text-green-800 mb-4 flex items-center">
                            <span className="mr-2">✅</span>
                            {section.goodFoods.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.goodFoods.items.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-green-700 flex items-start"
                              >
                                <span className="mr-2 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50 rounded-xl p-6">
                          <h3 className="font-bold text-red-800 mb-4 flex items-center">
                            <span className="mr-2">❌</span>
                            {section.badFoods.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.badFoods.items.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-red-700 flex items-start"
                              >
                                <span className="mr-2 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="mt-16 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold font-domine text-gray-800 mb-6 text-center">
                  Conclusión
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                  {article.content.conclusion}
                </p>
                <div
                  className={`bg-gradient-to-r ${article.color} rounded-xl p-6 text-center`}
                >
                  <p className="text-white font-semibold text-lg">
                    {article.content.callToAction}
                  </p>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ¿Te gustó este artículo?
                </h3>
                <p className="text-gray-600 mb-6">
                  Compártelo con tus amigos y familia
                </p>
                {shareMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-full inline-block">
                    {shareMessage}
                  </div>
                )}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 font-semibold transform hover:scale-105"
                  >
                    📘 Facebook
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors duration-300 font-semibold transform hover:scale-105"
                  >
                    🐦 Twitter
                  </button>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 font-semibold transform hover:scale-105"
                  >
                    📱 WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-domine text-white mb-6">
            ¿Listo para tu próxima cita?
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Aplica estos consejos y agenda tu revisión dental con nosotros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <button className="bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20">
                ← Volver al Blog
              </button>
            </Link>
            <button
              onClick={handleScheduleAppointment}
              className="bg-white text-pink-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-50 transition-all duration-300 shadow-2xl transform hover:scale-105"
            >
              📞 Agendar Cita
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
