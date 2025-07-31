// src/pages/Pacientes.tsx
import { useState } from 'react';
import Create_paciente from '../components/forms/create_paciente';
import Delete_paciente from '../components/forms/delete_paciente';
import Update_paciente from '../components/forms/update_paciente';

const VistaPaciente = () => {
  const [mostrarFormularioCrear, setMostrarFormularioCrear] = useState(false);
  const [mostrarFormularioActualizar, setMostrarFormularioActualizar] = useState(false);
  const [mostrarFormularioEliminar, setMostrarFormularioEliminar] = useState(false);

  return (
    <div className="demo-app container mx-auto p-8 bg-cyan-800 ">
      <div className="main-wrapper   ">

        <h2 className="text-white text-4xl">Pacientes</h2>

        <div className='flex'>
          {/* Botón para mostrar el formulario de crear */}
          <div className="my-8">
            <button
              onClick={() => setMostrarFormularioCrear(!mostrarFormularioCrear)}
              className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
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
        {mostrarFormularioCrear && <Create_paciente />}

        {/* Mostrar el formulario ACTUALZAR solo si mostrarFormulario es true */}
        {mostrarFormularioActualizar && <Update_paciente />}

        {/* Mostrar el formulario ELIMINAR solo si mostrarFormulario es true */}
        {mostrarFormularioEliminar && <Delete_paciente />}





        {/* Tabla pacientes */}
        <div className=" container  mx-auto bg-white rounded-lg shadow-md mt-5 ">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full ">

              <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                <tr >
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Nombre</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Correo</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Telefono</th>
                  <th className="border-2 border-white border-b-gray-300 px-5">Editar</th>
                  <th className="border-2 border-white border-b-gray-300 px-5">Baja</th>
                </tr>
              </thead>

              <tbody >
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3345365754</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">34657853677</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3357543678</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3345365754</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">34657853677</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3357543678</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3345365754</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">34657853677</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3357543678</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3345365754</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">34657853677</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3357543678</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3345365754</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">34657853677</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3357543678</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3345365754</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">34657853677</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">3357543678</td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>

        {/* Seccion agregados recientemente */}
        {/*   <div>
          <div className="h-96  mt-32 rounded-lg   ">
            <RecentDoctorCarousel/> 

          </div>
        </div>           */}


        {/* Tabla pacientes agendados. orden descendente de las ultimas citas agendadas y a quien */}
        <h2 className="mt-24  text-3xl text-white ">Pacientes agendados</h2>
        <div className=" container  w-3/6  rounded-lg shadow-md mt-5 ">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full ">

              <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                <tr >
                  <th className="border-2 px-5 text-left">Paciente</th>
                  <th className="border-2  px-5 text-left">Cita</th>
                </tr>
              </thead>

              <tbody className="text-white ">
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};


export default VistaPaciente;
