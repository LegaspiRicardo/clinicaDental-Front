
import React, { useState } from 'react';

interface CardItem {
    id: number;
    title: string;
    description: string;
    fechaIngreso: string;
}

const cardData: CardItem[] = [
    { id: 1, title: 'Mariano Madera', description: 'Ortodoncia', fechaIngreso: '28 de Julio 2025' },
    { id: 2, title: 'Monica Naranjilla', description: 'Extracciones', fechaIngreso: '30 de Julio 2025' },
    { id: 3, title: 'Luis Martinez', description: 'Brackets', fechaIngreso: '2 de Agosto 2025' },
    { id: 4, title: 'Jose Luis Contreras', description: 'Implantes', fechaIngreso: '7 de Agosto 2025' },
    { id: 5, title: 'Jose Cuervo', description: 'Extracciones', fechaIngreso: '4 de Agosto 2025' },
    { id: 6, title: 'Nicole Moreno', description: 'Ortodoncia', fechaIngreso: '6 de Agosto 2025' },

];

const RecentDoctorCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3;

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            Math.min(prev + 1, cardData.length - visibleCards)
        );
    };

    return (
        <div className="  mx-auto px-4">
            <h2 className="mb-8  text-3xl text-white">Agregados recientemente</h2>

            <div className="relative">
                {/* Botón Izquierda */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-40 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-600 text-white px-8 py-1 rounded shadow z-10"
                    disabled={currentIndex === 0}
                >
                    ⬅
                </button>

                {/* Carrusel */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
                    >
                        {cardData.map((card) => (
                            <div
                                key={card.id}
                                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-2"
                            >
                                <div className="bg-white rounded-lg p-4 shadow-md h-full">
                                    <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                                    <p className="text-gray-600">Especialidad: <b>{card.description} </b> </p>
                                    <p className="text-gray-600">Fecha ingreso: {card.fechaIngreso}</p>
                                    <p className="text-gray-600 mt-8 text-end w-2/3">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón Derecha */}
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-40 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-600 text-white px-8 py-1 rounded shadow z-10"
                    disabled={currentIndex >= cardData.length - visibleCards}
                >
                    ➡
                </button>
            </div>
        </div>
    );
};

export default RecentDoctorCarousel;
