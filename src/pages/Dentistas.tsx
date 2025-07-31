// src/pages/Dentistas.tsx
import { useState } from 'react';
import RecentDoctorCarousel from '../components/RecentDoctorCarousel';
import Create_dentista from '../components/forms/create_dentista';
import Delete_dentista from '../components/forms/delete_dentista';
import Update_dentista from '../components/forms/update_dentista';

const VistaDentista = () => {

  
    const [mostrarFormularioCrear, setMostrarFormularioCrear] = useState(false);
    const [mostrarFormularioActualizar, setMostrarFormularioActualizar] = useState(false);
    const [mostrarFormularioEliminar, setMostrarFormularioEliminar] = useState(false);

  return (
    <div className="demo-app container mx-auto p-8 bg-cyan-800 ">
      <div className="main-wrapper   ">


        <h2 className="text-white text-4xl">Dentistas</h2>
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
        {mostrarFormularioCrear && <Create_dentista />}

        {/* Mostrar el formulario ACTUALZAR solo si mostrarFormulario es true */}
        {mostrarFormularioActualizar && <Update_dentista />}

        {/* Mostrar el formulario ELIMINAR solo si mostrarFormulario es true */}
        {mostrarFormularioEliminar && <Delete_dentista />}


        {/* Tabla dentistas  */}
        <div className=" container  mx-auto bg-white rounded-lg shadow-md mt-5 ">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full ">

              <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                <tr >
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Nombre</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Especialidad</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Correo</th>
                  <th className="border-2 border-white border-b-gray-300 px-5">Editar</th>
                  <th className="border-2 border-white border-b-gray-300 px-5">Baja</th>
                </tr>
              </thead>

              <tbody >
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">mariano@gmail.com</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">monicaaae3432@gmail.com</td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>

        {/* Seccion agregados recientemente */}
        <div>
          <div className="h-96  mt-32 rounded-lg   ">
            <RecentDoctorCarousel />

          </div>
        </div>


        {/* Tabla dentistas por especialidad, aplicar un sortby seguramente xd */}
        <h2 className="my-8  text-3xl text-white ">Dentistas por especialidad</h2>
        <div className=" container  w-3/6 bg-white rounded-lg shadow-md mt-5 ">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full ">

              <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                <tr >
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Nombre</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Especialidad</th>
                </tr>
              </thead>

              <tbody >
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className=" border-2 pt-4 border-white border-b-gray-300">Erick Mariano Madera Cataño</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Ortodoncia</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="border-2 pt-4 border-white border-b-gray-300">Monica Coronado Bajado</td>
                  <td className="border-2 pt-4 border-white border-b-gray-300">Implantes</td>
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
