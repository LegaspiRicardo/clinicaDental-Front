import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import Update_servicio from './forms/update_servicio';

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [servicioSeleccionado, setServicioSeleccionado] = useState<Servicio | null>(null);

    const visibleCards = 3;

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            Math.min(prev + 1, servicios.length - visibleCards)
        );
    };

    const handleEditarClick = (servicio: Servicio) => {
        setServicioSeleccionado(servicio);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setServicioSeleccionado(null);
    };

    return (
        <div className="mx-auto px-4">
            <div className="relative  pb-16">
                {/* Botón Anterior */}
                <button
                    onClick={prevSlide}
                    className="absolute bottom-0 -translate-y-1/2 bg-cyan-800/50 hover:bg-cyan-900 text-white px-8 py-1 rounded shadow z-10 text-2xl"
                    disabled={currentIndex === 0}
                >
                    ⬅
                </button>

                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 "
                        style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
                    >
                        {servicios.map((card) => (
                            <div
                                key={card.id}
                                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-5  "
                            >

                                <article className="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg  ">
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1590424693420-634a0b0b782c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <button onClick={() => handleEditarClick(card)} className='text-justify'>
                                        <div className="relative bg-gradient-to-t from-gray-900 to-white/5 pt-32 sm:pt-48 lg:pt-64 ">

                                            <div className="p-4 sm:p-6">

                                                <h3 className="mt-0.5 text-4xl text-white">{card.name}</h3>

                                                <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/75">
                                                    {card.description || "Sin descripción"}
                                                </p>
                                                <div className='flex flex-row mt-6 text-lg'>
                                                    <p className="text-white/75 basis-1/2 ">
                                                        Duración: <b className='text-white'>{card.duracion_estimada / 60}</b> horas
                                                    </p>
                                                    <p className=" text-white/90">
                                                        Precio $<b>{card.precio} </b>
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </button>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón Siguiente */}
                <button
                    onClick={nextSlide}
                    className="absolute right-0 bottom-0 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-900 text-white px-8 py-1 rounded shadow z-10 text-2xl"
                    disabled={currentIndex >= servicios.length - visibleCards}
                >
                    ➡
                </button>
            </div>

            {/* Modal de edición */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                {servicioSeleccionado && (
                    <Update_servicio
                        servicio={servicioSeleccionado}
                        onClose={handleCloseModal}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default ServiciosCarousel;
