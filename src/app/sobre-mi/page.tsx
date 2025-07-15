"use client";
import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Imagen de la doctora */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="bg-gradient-to-br from-pink-200 to-rose-300 rounded-3xl p-8 shadow-2xl">
                    <Image
                      src="/img-perfil.jpeg"
                      alt="Dra. - DetistCare"
                      width={500}
                      height={600}
                      className="w-full h-auto rounded-2xl object-cover shadow-lg"
                      priority
                    />
                  </div>
                  {/* Elementos decorativos */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-300 rounded-full opacity-70 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-rose-400 rounded-full opacity-60 animate-bounce"></div>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold font-domine text-gray-800 mb-6">
                    Conoce a tu{" "}
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                      Doctora
                    </span>
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mb-8"></div>
                </div>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    Soy egresada de la{" "}
                    <span className="font-semibold text-pink-600">
                      Universidad Privada de Irapuato
                    </span>{" "}
                    que busca mejorar la sonrisa y el autoestima de los
                    pacientes.
                  </p>

                  <p className="text-lg">
                    Mi misión es brindar una atención dental personalizada y de
                    calidad, utilizando las técnicas más modernas y un enfoque
                    humano que pone al paciente en el centro de todo lo que
                    hago.
                  </p>

                  <p className="text-lg">
                    Creo firmemente que una sonrisa saludable no solo mejora la
                    salud bucal, sino que transforma la confianza y el bienestar
                    general de cada persona que confía en mi cuidado.
                  </p>
                </div>

                {/* Botones de contacto */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <a
                    href="/contacto"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    📅 Agendar Cita
                  </a>
                  <a
                    href="https://wa.me/524645799711"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educación y Formación */}
      <section className="py-16 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-domine text-gray-800 mb-6">
              🎓 Educación y Formación
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 shadow-xl">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    🏛️
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Universidad Privada de Irapuato
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Licenciatura en Odontología
                    </p>
                    <p className="text-gray-500 text-sm">
                      Formación integral en ciencias odontológicas con enfoque
                      en atención personalizada y técnicas modernas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    📚
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Educación Continua
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Actualización constante en técnicas odontológicas
                    </p>
                    <p className="text-gray-500 text-sm">
                      Participación regular en cursos y seminarios para
                      mantenerme al día con las últimas innovaciones en
                      odontología.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofía y Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-domine text-gray-800 mb-6">
              💝 Mi Filosofía
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
                  ❤️
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Atención Personalizada
                </h3>
                <p className="text-gray-600">
                  Cada paciente es único y merece un tratamiento diseñado
                  específicamente para sus necesidades y objetivos.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
                  🔬
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Tecnología Moderna
                </h3>
                <p className="text-gray-600">
                  Utilizo las técnicas y equipos más avanzados para garantizar
                  resultados excelentes y procedimientos cómodos.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
                  🌟
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Confianza y Bienestar
                </h3>
                <p className="text-gray-600">
                  Mi objetivo es que cada visita sea una experiencia positiva
                  que contribuya a mejorar tu autoestima y calidad de vida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="py-16 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-domine text-gray-800 mb-6">
              🦷 Áreas de Especialización
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "🧼",
                  title: "Odontología Preventiva",
                  desc: "Limpiezas, fluorización y selladores",
                },
                {
                  icon: "🔧",
                  title: "Odontología Restaurativa",
                  desc: "Resinas, coronas y rehabilitación oral",
                },
                {
                  icon: "✨",
                  title: "Odontología Estética",
                  desc: "Carillas, blanqueamientos y diseño de sonrisa",
                },
                {
                  icon: "🩺",
                  title: "Periodoncia",
                  desc: "Tratamiento de encías y curetajes",
                },
                {
                  icon: "🦷",
                  title: "Prótesis Dental",
                  desc: "Prótesis fijas y removibles",
                },
                {
                  icon: "🚨",
                  title: "Urgencias Dentales",
                  desc: "Atención inmediata para dolor y traumatismos",
                },
              ].map((especialidad, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{especialidad.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        {especialidad.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {especialidad.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold font-domine mb-6">
                ¿Lista para transformar tu sonrisa?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Agenda tu consulta y comencemos juntas este viaje hacia la
                sonrisa de tus sueños
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  📅 Agendar Consulta
                </a>
                <a
                  href="https://wa.me/524645799711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  💬 Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
