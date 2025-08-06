import { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePaciente from '../components/forms/create_paciente';
import UpdatePaciente from '../components/forms/update_paciente';
import DeletePaciente from '../components/forms/delete_paciente';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const VistaPaciente = () => {
  const [mostrarFormularioCrear, setMostrarFormularioCrear] = useState(false);
  const [mostrarFormularioActualizar, setMostrarFormularioActualizar] = useState(false);
  const [mostrarFormularioEliminar, setMostrarFormularioEliminar] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  const obtenerPacientes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/pacientes');
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  return (
    <div className="demo-app container mx-auto p-8 bg-cyan-800">
      <div className="main-wrapper">
        <h2 className="text-white text-4xl">Pacientes</h2>

        {/* Botones */}
        <div className="flex">
          <div className="my-8 mr-4">
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
          <CreatePaciente
            onSuccess={obtenerPacientes}
            onClose={() => setMostrarFormularioCrear(false)}
          />
        )}

        {mostrarFormularioActualizar && pacienteSeleccionado && (
          <UpdatePaciente
            paciente={pacienteSeleccionado}
            onClose={() => {
              setMostrarFormularioActualizar(false);
              setPacienteSeleccionado(null);
              obtenerPacientes();
            }}
          />
        )}

        {mostrarFormularioEliminar && pacienteSeleccionado && (
          <DeletePaciente
            pacienteId={pacienteSeleccionado.id}
            onClose={() => {
              setMostrarFormularioEliminar(false);
              setPacienteSeleccionado(null);
              obtenerPacientes();
            }}
          />
        )}

        {/* Tabla */}
        <div className="container mx-auto bg-white rounded-lg shadow-md mt-5">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full">
              <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                <tr>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Nombre</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Correo</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Teléfono</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-left">Estado</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-center">Editar</th>
                  <th className="border-2 border-white border-b-gray-300 px-5 text-center">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-200">
                    <td className="border-2 pt-4 border-white border-b-gray-300">{p.username}</td>
                    <td className="border-2 pt-4 border-white border-b-gray-300">{p.email}</td>
                    <td className="border-2 pt-4 border-white border-b-gray-300">{p.telefono}</td>
                    <td className="border-2 pt-4 border-white border-b-gray-300">{p.status}</td>
                    <td
                      className="border-2 pt-2 border-white border-b-gray-300 text-center cursor-pointer"
                      onClick={() => {
                        setPacienteSeleccionado(p);
                        setMostrarFormularioActualizar(true);
                      }}
                    >
                      ✏️
                    </td>
                    <td
                      className="border-2 pt-2 border-white border-b-gray-300 text-center cursor-pointer"
                      onClick={() => {
                        setPacienteSeleccionado(p);
                        setMostrarFormularioEliminar(true);
                      }}
                    >
                      🗑️
                    </td>
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

export default VistaPaciente;
