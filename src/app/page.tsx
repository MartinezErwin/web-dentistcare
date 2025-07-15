import React from "react";
import Header from "./components/header";
import Image from "next/image";
import Footer from "./components/footer";
import Link from "next/link";

export default function page() {
  return (
    <main className="bg-rose-200 min-h-screen">
      <Header />

      <section className="container mx-auto py-10 lg:py-0 px-4">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-2">
          <div className="flex-1 space-y-6 lg:pr-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 font-domine leading-tight">
              Cuidado Dental Moderno{" "}
              <span className="text-pink-400">Hecho Personal</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Experiencia de cuidado dental con tecnología avanzada y atención
              personalizada que te hará sonreír con confianza.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="/contacto"
                className="bg-pink-400 hover:bg-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors duration-200 shadow-lg text-center"
              >
                Agenda tu cita
              </Link>
              <Link
                href="/tratamientos"
                className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors duration-200 text-center"
              >
                Ver servicios
              </Link>
            </div>

            {/* Stats or features */}
            <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 pt-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-pink-400">
                  50
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Pacientes felices
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-pink-400">
                  5
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Años experiencia
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-pink-400">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Satisfacción
                </div>
              </div>
            </div>
          </div>

          {/* Image Right Side */}
          <div className="flex-1 flex justify-center w-full mt-8 lg:mt-0">
            <div className="relative">
              {/* Decorative background for mobile */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl transform rotate-3 scale-105 opacity-50 lg:hidden"></div>

              {/* Small decorative elements */}
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-pink-300 rounded-full opacity-70 lg:hidden"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-pink-400 rounded-full opacity-60 lg:hidden"></div>

              <Image
                src="/img-sonriendo.png"
                alt="Mujer sonriendo - Cuidado dental"
                width={700}
                height={700}
                className="relative object-cover w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-2xl shadow-lg lg:shadow-none"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
