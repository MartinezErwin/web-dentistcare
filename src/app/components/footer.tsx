import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br  from-gray-900 via-purple-900 to-pink-900 py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-400 rounded-full opacity-10 animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">🦷</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-domine bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                    DentistCare
                  </h3>
                  <p className="text-pink-200 text-sm">Innovación dental</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                Transformamos sonrisas con tecnología de vanguardia y cuidado
                personalizado que supera expectativas.
              </p>

              <div className="flex justify-center md:justify-start space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-pink-400 font-bold text-lg">50+</div>
                  <div className="text-gray-400 text-xs">Pacientes</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-bold text-lg">5</div>
                  <div className="text-gray-400 text-xs">Años</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold text-lg">100%</div>
                  <div className="text-gray-400 text-xs">Satisfacción</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-white font-semibold text-lg">Navegación</h4>
              <nav className="space-y-3">
                {["Inicio", "Tratamientos", "Sobre mí", "Contacto"].map(
                  (item, index) => (
                    <Link
                      key={index}
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="block text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 hover:font-medium"
                    >
                      → {item}
                    </Link>
                  )
                )}
              </nav>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-white font-semibold text-lg">Conecta</h4>

              <div className="flex justify-center md:justify-start space-x-3 pt-2">
                <a href="#" className="group relative">
                  <div className="w-12 h-12 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-6 h-6 sm:w-5 sm:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Facebook
                  </div>
                </a>

                <a href="#" className="group relative">
                  <div className="w-12 h-12 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pink-500/25 group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-6 h-6 sm:w-5 sm:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Instagram
                  </div>
                </a>

                <a href="mailto:info@detistcare.com" className="group relative">
                  <div className="w-12 h-12 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-6 h-6 sm:w-5 sm:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Email
                  </div>
                </a>
              </div>

              {/* Mobile email info */}
              <div className="sm:hidden">
                <p className="text-gray-300 text-sm">info@detistcare.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 DetistCare • Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
