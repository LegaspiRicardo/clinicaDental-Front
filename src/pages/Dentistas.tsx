import { useEffect, useState } from 'react';
import axios from 'axios';
import RecentDoctorCarousel from '../components/RecentDoctorCarousel';
import Create_dentista from '../components/forms/create_dentista';
import Delete_dentista from '../components/forms/delete_dentista';
import Update_dentista from '../components/forms/update_dentista';

interface Dentista {
  id: number;
  username: string;
  email: string;
  telefono: number;
  especialidad: string;
}

const VistaDentista = () => {
  const [mostrarFormularioCrear, setMostrarFormularioCrear] = useState(false);
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [dentistaSeleccionado, setDentistaSeleccionado] = useState<Dentista | null>(null);
  const [dentistaAEliminar, setDentistaAEliminar] = useState<Dentista | null>(null);

  const obtenerDentistas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/dentistas');
      setDentistas(res.data);
    } catch (error) {
      console.error('Error al cargar dentistas:', error);
    }
  };

  useEffect(() => {
    obtenerDentistas();
  }, []);

  return (
    <div className="demo-app container mx-auto p-8 bg-cyan-800">
      <div className="main-wrapper">
        <h2 className="text-white text-4xl">Dentistas</h2>

        {/* Botones */}
        <div className="flex">
          <div className="my-8">
            <button
              onClick={() => setMostrarFormularioCrear(!mostrarFormularioCrear)}
              className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
            >
              {mostrarFormularioCrear ? 'Ocultar Formulario' : '+'}
            </button>
          </div>
        </div>

        {/* Formularios */}
        {mostrarFormularioCrear && (
          <Create_dentista
            onSuccess={obtenerDentistas}
            onClose={() => setMostrarFormularioCrear(false)}
          />
        )}

        {dentistaSeleccionado && (
          <Update_dentista
            dentista={dentistaSeleccionado}
            onClose={() => {
              setDentistaSeleccionado(null);
              obtenerDentistas();
            }}
          />
        )}

        {dentistaAEliminar && (
          <Delete_dentista
            dentista={dentistaAEliminar}
            onClose={() => {
              setDentistaAEliminar(null);
              obtenerDentistas();
            }}
          />
        )}

        {/* Tabla de dentistas */}
        <div className="container mx-auto bg-white rounded-lg shadow-md mt-5">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full">
              <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                <tr>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Nombre</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Especialidad</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Correo</th>
                  <th className="border-2 border-white border-b-gray-300 px-5">Editar</th>
                  <th className="border-2 border-white border-b-gray-300 px-5">Baja</th>
                </tr>
              </thead>

              <tbody>
                {dentistas.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-200">
                    <td className="border-2 pt-4 border-white border-b-gray-300">{d.username}</td>
                    <td className="border-2 pt-4 border-white border-b-gray-300">{d.especialidad}</td>
                    <td className="border-2 pt-4 border-white border-b-gray-300">{d.email}</td>
                    <td
                      className="border-2 pt-4 border-white border-b-gray-300 text-center cursor-pointer"
                      onClick={() => setDentistaSeleccionado(d)}
                    >
                      ✏️
                    </td>
                    <td
                      className="border-2 pt-4 border-white border-b-gray-300 text-center cursor-pointer"
                      onClick={() => setDentistaAEliminar(d)}
                    >
                      🗑️
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Carrusel de dentistas recientes */}
        <div className="h-96 mt-32 rounded-lg">
          <RecentDoctorCarousel />
        </div>

        {/* Dentistas por especialidad */}
        <h2 className="my-8 text-3xl text-white">Dentistas por especialidad</h2>
        <div className="container w-3/6 bg-white rounded-lg shadow-md mt-5">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full">
              <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                <tr>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Nombre</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Especialidad</th>
                </tr>
              </thead>
              <tbody>
                {dentistas.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-200">
                    <td className="border-2 pt-4 border-white border-b-gray-300">{d.username}</td>
                    <td className="border-2 pt-4 border-white border-b-gray-300">{d.especialidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaDentista;
