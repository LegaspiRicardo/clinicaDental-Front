// src/pages/Dentistas.tsx
import { useState } from 'react';
import ServiciosCarousel from '../components/ServiciosCarousel';
import Create_servicio from '../components/forms/create_servicio';
import Delete_servicio from '../components/forms/delete_servicio';
import Update_servicio from '../components/forms/update_servicio';

const VistaDentista = () => {

    const [mostrarFormularioCrear, setMostrarFormularioCrear] = useState(false);
    const [mostrarFormularioActualizar, setMostrarFormularioActualizar] = useState(false);
    const [mostrarFormularioEliminar, setMostrarFormularioEliminar] = useState(false);


    return (
        <div className="demo-app container mx-auto p-8 bg-cyan-800 ">
            <div className="main-wrapper   ">
                <h2 className="text-white text-4xl">Servicios</h2>
                <div className='flex'>
                    {/* Botón para mostrar el formulario de crear */}
                    <div className="my-8">
                        <button
                            onClick={() => setMostrarFormularioCrear(!mostrarFormularioCrear)}
                            className="bg-slate-400 text-white px-6 py-2 rounded hover:bg-slate-600 transition"
                        >
                            {mostrarFormularioCrear ? 'Ocultar Formulario' : '+'}
                        </button>
                    </div>
                    {/* Botón para mostrar el formulario de editar*/}
                    <div className="my-8">
                        <button
                            onClick={() => setMostrarFormularioActualizar(!mostrarFormularioActualizar)}
                            className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
                        >
                            {mostrarFormularioActualizar ? 'Ocultar Formulario' : 'Editar'}
                        </button>
                    </div>
                    {/* Botón para mostrar el formulario de eliminar */}
                    <div className="my-8">
                        <button
                            onClick={() => setMostrarFormularioEliminar(!mostrarFormularioEliminar)}
                            className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                        >
                            {mostrarFormularioEliminar ? 'Ocultar Formulario' : 'Eliminar'}
                        </button>
                    </div>
                </div>
                {/* Mostrar el formulario CREAR solo si mostrarFormulario es true */}
                {mostrarFormularioCrear && <Create_servicio />}

                {/* Mostrar el formulario ACTUALZAR solo si mostrarFormulario es true */}
                {mostrarFormularioActualizar && <Update_servicio />}

                {/* Mostrar el formulario ELIMINAR solo si mostrarFormulario es true */}
                {mostrarFormularioEliminar && <Delete_servicio />}


                {/* Seccion agregados recientemente */}
                <div>
                    <div className="h-96  mt-24 rounded-lg   ">
                        <ServiciosCarousel />
                    </div>
                </div>


                {/*Tabla para filtrar los servicios con mayor afluencia */}
                <h2 className="mt-32  text-3xl text-white ">Servicios más solicitados</h2>
                <div className=" container  w-3/6 bg-white rounded-lg shadow-md mt-5 ">
                    <div className="h-80 overflow-auto scrollbar-hide rounded-lg">
                        <table className="w-full ">

                            <thead className="bg-slate-300 sticky top-0 z-10">
                                <tr >
                                    <th className="border-2 border-white border-b-gray-300 px-5 text-left">Servicio</th>
                                    <th className="border-2 border-white border-b-gray-300 px-5 text-left">Total</th>
                                </tr>
                            </thead>

                            <tbody >
                                <tr className="hover:bg-gray-200">
                                    <td className=" border-2 pt-4 border-white border-b-gray-300">Limpieza general</td>
                                    <td className="border-2 pt-4 border-white border-b-gray-300"><b>84</b> servicios</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="border-2 pt-4 border-white border-b-gray-300">Extracciones</td>
                                    <td className="border-2 pt-4 border-white border-b-gray-300"><b>72</b> servicios</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className=" border-2 pt-4 border-white border-b-gray-300">Brackets</td>
                                    <td className="border-2 pt-4 border-white border-b-gray-300"><b>66</b> servicios</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                                    <td className="border-2 pt-4 border-white border-b-gray-300"><b>50</b> servicios</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className=" border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                                    <td className="border-2 pt-4 border-white border-b-gray-300"><b>84</b> servicios</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="border-2 pt-4 border-white border-b-gray-300">Limpieza profunda</td>
                                    <td className="border-2 pt-4 border-white border-b-gray-300"><b>40</b> servicios</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className=" border-2 pt-4 border-white border-b-gray-300">Coronas</td>
                                    <td className="border-2 pt-4 border-white border-b-gray-300"><b>38</b> servicios</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default VistaDentista;
