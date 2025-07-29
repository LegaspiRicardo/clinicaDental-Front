
import React, { useState } from 'react';

interface CardItem {
    id: number;
    name: string;
    description: string;
    precio: number;
    duracion_estimada: number;
}

const cardData: CardItem[] = [
    { id: 1, name: 'Ortodoncia', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi facere sunt quasi aperiam quis laudantium illum corporis voluptatum placeat laborum impedit nesciunt, amet praesentium molestias alias provident omnis sapiente eveniet molestiae voluptatibus in quibusdam enim eius. Possimus, consequatur mollitia impedit provident nam aspernatur sapiente repellat tempora maiores ratione numquam.', precio: 899, duracion_estimada: 1 },
    { id: 2, name: 'Brackets', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi facere sunt quasi aperiam quis laudantium illum corporis voluptatum placeat laborum impedit nesciunt, amet praesentium molestias alias provident omnis sapiente eveniet molestiae voluptatibus in quibusdam enim eius. Possimus, consequatur mollitia impedit provident nam aspernatur sapiente repellat tempora maiores ratione numquam.', precio: 560, duracion_estimada: 1 },
    { id: 3, name: 'Implantes', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi facere sunt quasi aperiam quis laudantium illum corporis voluptatum placeat laborum impedit nesciunt, amet praesentium molestias alias provident omnis sapiente eveniet molestiae voluptatibus in quibusdam enim eius. Possimus, consequatur mollitia impedit provident nam aspernatur sapiente repellat tempora maiores ratione numquam.', precio: 1600, duracion_estimada: 2 },
    { id: 4, name: 'Extracciones', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi facere sunt quasi aperiam quis laudantium illum corporis voluptatum placeat laborum impedit nesciunt, amet praesentium molestias alias provident omnis sapiente eveniet molestiae voluptatibus in quibusdam enim eius. Possimus, consequatur mollitia impedit provident nam aspernatur sapiente repellat tempora maiores ratione numquam.', precio: 280, duracion_estimada: 1 },
    { id: 5, name: 'Limpieza general', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi facere sunt quasi aperiam quis laudantium illum corporis voluptatum placeat laborum impedit nesciunt, amet praesentium molestias alias provident omnis sapiente eveniet molestiae voluptatibus in quibusdam enim eius. Possimus, consequatur mollitia impedit provident nam aspernatur sapiente repellat tempora maiores ratione numquam.', precio: 500, duracion_estimada: 1 },
    { id: 6, name: 'Limpieza profunda', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi facere sunt quasi aperiam quis laudantium illum corporis voluptatum placeat laborum impedit nesciunt, amet praesentium molestias alias provident omnis sapiente eveniet molestiae voluptatibus in quibusdam enim eius. Possimus, consequatur mollitia impedit provident nam aspernatur sapiente repellat tempora maiores ratione numquam.', precio: 1000, duracion_estimada: 2 },
    { id: 7, name: 'Coronas', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi facere sunt quasi aperiam quis laudantium illum corporis voluptatum placeat laborum impedit nesciunt, amet praesentium molestias alias provident omnis sapiente eveniet molestiae voluptatibus in quibusdam enim eius. Possimus, consequatur mollitia impedit provident nam aspernatur sapiente repellat tempora maiores ratione numquam.', precio: 1250, duracion_estimada: 2 },


];




const ServiciosCarousel: React.FC = () => {
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

            <div className="relative">
                {/* Botón Izquierda */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-80 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-600 text-white px-8 py-1 rounded shadow z-10"
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
                                    <h3 className="text-2xl font-semibold mb-2">{card.name}</h3>
                                    <p className="text-gray-600 text-justify">Descripción: <b>{card.description} </b> </p>
                                    <p className="text-gray-600 mt-8 text-center">Precio: <span className='text-lg'><b> ${card.precio} </b></span></p>
                                    <p className="text-gray-600 mt-6 text-center">Duración estimada: <b>{card.duracion_estimada}</b> horas</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón Derecha */}
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-80 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-600 text-white px-8 py-1 rounded shadow z-10"
                    disabled={currentIndex >= cardData.length - visibleCards}
                >
                    ➡
                </button>
            </div>
        </div>
    );
};

export default ServiciosCarousel;
