const VistaMiPerfil = () => {
    return (
        <div className="demo-app container mx-auto p-8 bg-cyan-800 ">
            <div className="main-wrapper   ">
                <h2 className="text-white text-4xl">¡Hola @usuario! </h2>
                {/* Carta Mi Perfil */}
                <div className=" container h-lvh mx-auto rounded-lg  mt-5 ">
                    <div className="overflow-auto h-5/6 w-2/5 mx-auto bg-white shadow-md scrollbar-hide rounded-lg">
                        <h4 className="text-4xl text-center mt-80">Eric Mariano Madera Cataño</h4>
                        <div className=" mt-12 w-5/6 mx-auto">
                            <h5 className="text-sm"><b>Especialidad:</b></h5>
                            <p className="text-xl">Ortodoncia y Extracciones</p>
                        </div>
                        <div className=" mt-12 w-5/6 mx-auto">
                            <h5 className="text-sm"><b>Correo electronico:</b></h5>
                            <p className="text-xl">dr_mariano_29883@gmail.com</p>
                        </div>

                        <div className=" mt-12 w-5/6 mx-auto">
                            <h5 className="text-sm"><b>Telefono:</b></h5>
                            <p className="text-xl">+52 33 2343 3232</p>
                        </div>
                        <p className="text-center mt-16 "><a href="" >¿Olvidaste tu contraseña?</a></p>
                    </div>
                </div>

                {/* Botones crear cita y agendar disponibilidad */}
                <div className="">
                    <div className="flex flex-row h-32">
                        <div className="w-3/6 text-center ">
                            <p className="rounded border-2 bg-transparent w-4/6 mx-auto py-14 text-white text-3xl hover:bg-gray-100 hover:text-cyan-800">Agendar una cita</p>
                        </div>
                        <div className="w-3/6 text-center ">
                            <p className="rounded border-2 bg-transparent w-4/6 mx-auto py-14 text-white text-3xl hover:bg-gray-100 hover:text-cyan-800">Habililtar disponibilidad</p>
                        </div>


                    </div>
                </div>

                {/* Tabla pacientes agendados. orden descendente de las ultimas citas agendadas correspondiente a su ID */}

                <div className=" container mt-44 mx-auto w-3/6  rounded-lg shadow-md  ">
                    <h2 className=" my-8 text-3xl text-white ">Proximos pacientes  </h2>
                    <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
                        <table className="w-full ">

                            <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                                <tr >
                                    <th className="border-2 px-5 text-left">Paciente</th>
                                    <th className="border-2  px-5 text-left">Cita</th>
                                </tr>
                            </thead>

                            <tbody className="text-black bg-gray-100">
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Monica Coronado Bajado</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">31/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">02/08/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Monica Coronado Bajado</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">31/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">02/08/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Monica Coronado Bajado</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">31/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">02/08/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Monica Coronado Bajado</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">31/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">02/08/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Monica Coronado Bajado</td>
                                    <td className="pt-4  ">28/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">31/07/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-200 hover:text-black">
                                    <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                                    <td className="pt-4  ">02/08/2025</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>

                {/* Tabla de los servcios realizados*/}

                <div className=" container mt-32 mx-auto w-3/6 rounded-lg shadow-md  ">
                    <h2 className="  text-3xl text-white ">Servicios realizados</h2>
                    <div className="h-80 overflow-auto scrollbar-hide rounded-lg">
                        <table className="w-full bg-white">

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


export default VistaMiPerfil;
