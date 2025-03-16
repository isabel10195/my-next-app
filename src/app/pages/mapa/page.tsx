"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Card } from "@/components/ui/card";
import { Building2, Clock, Link, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/BackButton"; // Ajusta la ruta según tu estructura de carpetas


export default function MapaPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json", // Estilo gratuito de MapLibre
      center: [-3.70379, 40.416775], // Coordenadas de Madrid
      zoom: 15,
    });

    new maplibregl.Marker().setLngLat([-3.70379, 40.416775]).addTo(map);

    return () => map.remove(); // Cleanup al desmontar
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <BackButton href="/" />
          <h1 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Dónde encontrarnos</h1>

          <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
            {/* Mapa con MapLibre */}
            <Card className="bg-muted border-0 overflow-hidden h-[600px]">
              <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
            </Card>
            

            {/* Información de contacto */}
            <div className="space-y-6">
              <Card className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-0 p-6 ">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Building2 className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h2 className="font-semibold text-xl mb-2">Dirección</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Calle Gran Vía, 123
                        <br />
                        28013 Madrid
                        <br />
                        España
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h2 className="font-semibold text-xl mb-2">Horario</h2>
                      <div className="text-gray-500 dark:text-gray-400 space-y-1">
                        <p>Lunes - Viernes: 9:00 - 20:00</p>
                        <p>Sábado: 10:00 - 14:00</p>
                        <p>Domingo: Cerrado</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h2 className="font-semibold text-xl mb-2">Teléfono</h2>
                      <p className="text-gray-500 dark:text-gray-400">+34 900 123 456</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h2 className="font-semibold text-xl mb-2">Email</h2>
                      <p className="text-gray-500 dark:text-gray-400">info@lure.com</p>
                    </div>
                  </div>
                </div>
              </Card>
              

              <Card className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-0 p-6">
                <h2 className="font-semibold text-xl mb-4">Cómo llegar</h2>
                <div className="space-y-4 text-gray-500">
                  <p>
                    <strong className="text-gray-700 dark:text-gray-400">Metro:</strong> Líneas 1, 2 y 3 - Estación Gran Vía
                  </p>
                  <p>
                    <strong className="text-gray-700 dark:text-gray-400">Bus:</strong> Líneas 1, 2, 46, 74, 146
                  </p>
                  <p>
                    <strong className="text-gray-700 dark:text-gray-400">Parking:</strong> Disponible en el edificio
                  </p>
                </div>
              </Card>
            </div>
          </div>
          <Link href="/" style={{ marginLeft: "5px" }}>
                <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Volver a inicio
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
