// src/utils/localServiciosDB.ts
import { openDB } from 'idb';

const DB_NAME = 'ServiciosDB';
const STORE_NAME = 'servicios';

const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
    },
});

export const saveServicio = async (servicio: any) => {
    const db = await dbPromise;
    await db.put(STORE_NAME, servicio);
};

export const getServicios = async (): Promise<any[]> => {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
};

export const deleteServicio = async (id: number) => {
    const db = await dbPromise;
    await db.delete(STORE_NAME, id);
};
