const Delete_servicio = () => {
    return (
        <div className=" justify-center mx-auto w-5/6 flex-col bg-white p-2">
            <div className="rounded-xl bg-white text-sm/7 text-gray-700 px-8 pt-8 pb-8">
                <h3 className="text-2xl font-bold mb-4">Eliminar Servicio</h3>

                <label className="mt-4" >Nombre</label>
                <input type="text" className=" w-full border-2 mb-4 border-gray-300 rounded min-h-10 bg-gray-400" disabled />

                <label className="mt-4" >Descripción</label>
                <input type="text" className=" w-full border-2 border-gray-300 mb-4 rounded min-h-40 bg-gray-400" disabled />

                <label className="mt-6" >Duración estimada</label>
                <select className="rounded flex w-full px-4 py-3 border-2 border-gray-300 bg-gray-400" disabled>
                    <option hidden value="">Seleccione una</option>
                    <option value="">30 minutos</option>
                    <option value="">1 hora</option>
                    <option value="">2 horas</option>
                </select>

                <hr className="border-(--pattern-fg) my-6 w-full" />
                <div className="flex ">
                    <div className=" w-full flex">
                        <div className="w-3/6">
                            <label className="mt-4 " >Precio</label>
                            <input type="number" className="flex w-full rounded border-2 border-gray-300 min-h-10 bg-gray-400 " disabled />
                        </div>
                        <div className=" w-2/6 mx-auto">
                            <button className="bg-red-500 py-2 mt-7 rounded w-5/6 ml-8 text-white ">Eliminar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Delete_servicio;