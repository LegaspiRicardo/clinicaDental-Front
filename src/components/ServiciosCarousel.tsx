// src/components/ServiciosCarousel.tsx
import React from 'react';

interface Servicio {
    id: number;
    name: string;
    description?: string;
    precio: number;
    duracion_estimada: number;
}

interface Props {
    servicios: Servicio[];
    onEditar: (servicio: Servicio) => void;
    onEliminar: (servicio: Servicio) => void;
}


const ServiciosCarousel: React.FC<Props> = ({ servicios, onEditar, onEliminar }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const visibleCards = 3;

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            Math.min(prev + 1, servicios.length - visibleCards)
        );
    };

    return (
        <div className="mx-auto px-4">
            <div className="relative">
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-80 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-600 text-white px-8 py-1 rounded shadow z-10"
                    disabled={currentIndex === 0}
                >
                    ⬅
                </button>

                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
                    >
                        {servicios.map((card) => (
                            <div
                                key={card.id}
                                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-2"
                            >
                                <div className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-2">{card.name}</h3>
                                        <p className="text-gray-600 text-justify">
                                            Descripción: <b>{card.description}</b>
                                        </p>
                                        <p className="text-gray-600 mt-8 text-center">
                                            Precio: <span className="text-lg"><b>${card.precio}</b></span>
                                        </p>
                                        <p className="text-gray-600 mt-6 text-center">
                                            Duración estimada: <b>{card.duracion_estimada / 60}</b> horas
                                        </p>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button
                                            onClick={() => onEditar(card)}
                                            className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 text-sm"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => onEliminar(card)}
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-80 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-600 text-white px-8 py-1 rounded shadow z-10"
                    disabled={currentIndex >= servicios.length - visibleCards}
                >
                    ➡
                </button>
            </div>
        </div>
    );
};

export default ServiciosCarousel;
