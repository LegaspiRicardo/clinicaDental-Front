// src/pages/Dentistas.tsx
import RecentDoctorCarousel from '../components/RecentDoctorCarousel';


const VistaDentista = () => {
  return (
    <div className="demo-app container mx-auto p-8 bg-cyan-800 ">
      <div className="main-wrapper   ">

        <h2 className="text-white text-4xl">Dentistas</h2>

    

{/* Tabla dentistas  */}
        <div className=" container  mx-auto bg-white rounded-lg shadow-md mt-5 ">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full ">
              
              <thead className="bg-slate-300 sticky top-0 z-10">
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
            <RecentDoctorCarousel/>

          </div>
        </div>


{/* Tabla dentistas por especialidad, aplicar un sortby seguramente xd */}
      <h2 className="my-8  text-3xl text-white ">Dentistas por especialidad</h2>
        <div className=" container  w-3/6 bg-white rounded-lg shadow-md mt-5 ">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full ">
              
              <thead className="bg-slate-300 sticky top-0 z-10">
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
