"use client";
import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { tratamientos } from "../tratamientos.js";

export default function TratamientosPage() {
  return (
    <div className="min-h-screen bg-rose-200">
      <Header />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-domine mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-fade-scale">
              Nuestros Tratamientos
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-scale">
              Tecnología de vanguardia y cuidado personalizado para transformar
              tu sonrisa
            </p>
          </div>
        </div>
      </section>

      {/* Tratamientos - Diseño Moderno con Glassmorphism */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tratamientos.map((tratamiento, index) => (
              <div
                key={tratamiento.id}
                className="group relative animate-initial animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Principal */}
                <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 overflow-hidden border border-white/20 group-hover:-translate-y-4 group-hover:rotate-1">
                  {/* Gradient Background Animado */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tratamiento.color} opacity-0 group-hover:opacity-20 transition-all duration-700`}
                  ></div>

                  {/* Floating Icon */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tratamiento.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                    >
                      <span className="text-2xl">{tratamiento.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 pt-12">
                    {/* Title */}
                    <h3 className="text-2xl font-bold font-domine mb-4 text-gray-800 group-hover:text-pink-600 transition-colors duration-300 text-center">
                      {tratamiento.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed text-center text-sm">
                      {tratamiento.description}
                    </p>

                    {/* Price & Duration */}
                    <div className="flex justify-between items-center mb-6 bg-gray-50/80 rounded-xl p-3">
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold bg-gradient-to-r ${tratamiento.color} bg-clip-text text-transparent`}
                        >
                          {tratamiento.price}
                        </div>
                        <div className="text-xs text-gray-500">Precio</div>
                      </div>
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-700">
                          ⏱️
                        </div>
                        <div className="text-xs text-gray-500">
                          {tratamiento.duration}
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6">
                      {tratamiento.benefits.slice(0, 3).map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600 transform opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${tratamiento.color} mr-3`}
                          ></div>
                          {benefit}
                        </div>
                      ))}
                      {tratamiento.benefits.length > 3 && (
                        <div className="text-xs text-gray-400 text-center pt-2">
                          +{tratamiento.benefits.length - 3} beneficios más
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href="/contacto"
                      className={`w-full py-4 rounded-2xl font-semibold bg-gradient-to-r ${tratamiento.color} text-white transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden block text-center`}
                    >
                      <span className="relative z-10">Agendar Consulta</span>
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Link>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
