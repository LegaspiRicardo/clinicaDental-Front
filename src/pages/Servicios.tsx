// src/pages/Servicios.tsx
import React, { useState, useEffect } from 'react';
import ServiciosCarousel from '../components/ServiciosCarousel';
import Create_servicio from '../components/forms/create_servicio';
import Update_servicio from '../components/forms/update_servicio';
import Delete_servicio from '../components/forms/delete_servicio';
import axios from 'axios';

interface Servicio {
    id: number;
    name: string;
    description?: string;
    duracion_estimada: number;
    precio: number;
}

const Servicios = () => {
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const [mostrarEliminar, setMostrarEliminar] = useState(false);
    const [servicioSeleccionado, setServicioSeleccionado] = useState<Servicio | null>(null);

    const cargarServicios = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/servicios', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setServicios(res.data);
        } catch (error) {
            console.error('Error cargando servicios:', error);
        }
    };

    useEffect(() => {
        cargarServicios();
    }, []);

    return (
        <div className="demo-app container mx-auto p-8 h-full ">
            <h2 className="text-white text-4xl">Servicios dentales</h2>

            <div className="flex mt-8">
                <button
                    onClick={() => {
                        setMostrarCrear(!mostrarCrear);
                        setMostrarActualizar(false);
                        setMostrarEliminar(false);
                    }}
                    className="bg-slate-400 text-white px-6 py-2 rounded hover:bg-slate-600 transition"
                >
                    {mostrarCrear ? 'Ocultar Crear' : '+'}
                </button>
            </div>

{mostrarCrear && (
    <Create_servicio
        open={mostrarCrear}
        onSuccess={() => {
            setMostrarCrear(false);
            cargarServicios();
        }}
        onClose={() => setMostrarCrear(false)}
    />
)}


            {mostrarActualizar && servicioSeleccionado && (
                <Update_servicio
                    servicio={servicioSeleccionado}
                    onClose={() => {
                        setMostrarActualizar(false);
                        cargarServicios();
                    }}
                />
            )}

            {mostrarEliminar && servicioSeleccionado && (
                <Delete_servicio
                    servicio={servicioSeleccionado}
                    onClose={() => {
                        setMostrarEliminar(false);
                        cargarServicios();
                    }}
                />
            )}


            {/* Seccion carrusel servicios */}
            <div className="h-96 mt-16 rounded-lg">
                <ServiciosCarousel
                    servicios={servicios}
                    onEditar={(servicio) => {
                        setServicioSeleccionado(servicio);
                        setMostrarActualizar(true);
                        setMostrarCrear(false);
                        setMostrarEliminar(false);
                    }}
                    onEliminar={(servicio) => {
                        setServicioSeleccionado(servicio);
                        setMostrarEliminar(true);
                        setMostrarActualizar(false);
                        setMostrarCrear(false);
                    }}
                />
            </div>
        </div>
    );
};

export default Servicios;
