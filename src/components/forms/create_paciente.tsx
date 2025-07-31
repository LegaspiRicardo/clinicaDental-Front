const Create_paciente = () => {
    return (
        <div className=" justify-center mx-auto w-5/6 flex-col bg-white p-2">
            <div className="rounded-xl bg-white text-sm/7 text-gray-700 px-8 pt-8 pb-8">
                <h3 className="text-2xl font-bold mb-4">Nuevo Paciente</h3>
                <label className="mt-4" >Nombre</label>
                <input type="text" className=" w-full border-2 mb-4 border-gray-300 rounded min-h-10" />

                <label className="mt-4" >Correo electronico</label>
                <input type="email" className=" w-full border-2 border-gray-300 mb-4 rounded min-h-10" placeholder=" exampleuser@gmail.com" />

                <label className="mt-6" >Contraseña</label>
                <input type="password" className="flex w-full rounded border-2 border-gray-300 min-h-10" />

                <div className="flex ">
                    <div className=" w-full flex">
                        <div className=" w-full mx-auto mt-6">
                            <label className="mt-4 " >Telefono</label>
                            <input type="number" className="flex w-full rounded border-2 border-gray-300 py-1" />
                        </div>
                    </div>
                </div>
                <div className="w-3/6 text-center mx-auto"> 
                    <button className="bg-cyan-600 py-2 mt-7 rounded w-3/6 text-white hover:bg-cyan-700">Agregar</button>

                </div>
            </div>
        </div>
    );
};

export default Create_paciente;