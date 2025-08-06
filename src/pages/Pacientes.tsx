import { useState, useEffect } from 'react';
import Create_paciente from '../components/forms/create_paciente';
import Delete_paciente from '../components/forms/delete_paciente';
import Update_paciente from '../components/forms/update_paciente';
import axios from 'axios';

interface Paciente {
  id: number;
  username: string;
  email: string;
  telefono: number;
}

const VistaPaciente = () => {
  const [mostrarFormularioCrear, setMostrarFormularioCrear] = useState(false);
  const [mostrarFormularioActualizar, setMostrarFormularioActualizar] = useState(false);
  const [mostrarFormularioEliminar, setMostrarFormularioEliminar] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente | null>(null);

  const cargarPacientes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/pacientes');
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  return (
    <div className="demo-app container mx-auto p-8 bg-cyan-800">
      <h2 className="text-white text-4xl">Pacientes</h2>

      <div className='flex space-x-4 my-8'>
        <button
          onClick={() => {
            setMostrarFormularioCrear(!mostrarFormularioCrear);
            setMostrarFormularioActualizar(false);
            setMostrarFormularioEliminar(false);
            setPacienteSeleccionado(null);
          }}
          className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
        >
          {mostrarFormularioCrear ? 'Ocultar Formulario' : '+'}
        </button>
      </div>

      {mostrarFormularioCrear && (
        <Create_paciente
          onSuccess={() => {
            setMostrarFormularioCrear(false);
            cargarPacientes();
          }}
        />
      )}

      {mostrarFormularioActualizar && pacienteSeleccionado && (
        <Update_paciente
          paciente={pacienteSeleccionado}
          onClose={() => {
            setMostrarFormularioActualizar(false);
            setPacienteSeleccionado(null);
            cargarPacientes();
          }}
        />
      )}

{mostrarFormularioEliminar && pacienteSeleccionado && (
  <Delete_paciente
    paciente={pacienteSeleccionado}
    onClose={() => {
      setMostrarFormularioEliminar(false);
      setPacienteSeleccionado(null);
    }}
    onDeleted={() => {
      setMostrarFormularioEliminar(false);
      setPacienteSeleccionado(null);
      cargarPacientes();
    }}
  />
)}


      {/* Tabla pacientes */}
      <div className="container mx-auto bg-white rounded-lg shadow-md mt-5">
        <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
          <table className="w-full">
            <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
              <tr>
                <th className="border-2 px-5 text-left">Nombre</th>
                <th className="border-2 px-5 text-left">Correo</th>
                <th className="border-2 px-5 text-left">Teléfono</th>
                <th className="border-2 px-5">Editar</th>
                <th className="border-2 px-5">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-gray-200">
                  <td className="border-2 px-4 py-2">{paciente.username}</td>
                  <td className="border-2 px-4 py-2">{paciente.email}</td>
                  <td className="border-2 px-4 py-2">{paciente.telefono}</td>
                  <td className="border-2 px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        setPacienteSeleccionado(paciente);
                        setMostrarFormularioActualizar(true);
                        setMostrarFormularioCrear(false);
                        setMostrarFormularioEliminar(false);
                      }}
                      className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="border-2 px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        setPacienteSeleccionado(paciente);
                        setMostrarFormularioEliminar(true);
                        setMostrarFormularioCrear(false);
                        setMostrarFormularioActualizar(false);
                      }}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VistaPaciente;
