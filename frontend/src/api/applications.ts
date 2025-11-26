import { apiClient } from './client';
// 🚨 Importamos AxiosResponse para asegurar el correcto tipado de la respuesta
import { AxiosResponse } from 'axios'; 

interface ApplyPayload {
    jobOfferId: number;
}

// 🟢 Tipo de la respuesta del Backend (POST /api/rep/applications)
export interface ApplicationResponse {
    id: number;
    jobTitle: string;
    companyName: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    applicationDate: string;
}

/**
 * Función para que el comercial aplique a una oferta de trabajo.
 */
// 🟢 Definición explícita del tipo de retorno: Promise<ApplicationResponse>
export const applyToJob = async (jobOfferId: number): Promise<ApplicationResponse> => {
    const payload: ApplyPayload = { jobOfferId };
    
    // Le decimos a .post qué tipo de datos esperamos que contenga la respuesta.
    const response: AxiosResponse<ApplicationResponse> = await apiClient.post(
        '/rep/applications', 
        payload
    );
    
    // Devolvemos el cuerpo de los datos (lo que sale del backend)
    return response.data;
};

/**
 * Función para obtener todas las aplicaciones del REP autenticado.
 */
export const fetchRepApplications = async (): Promise<ApplicationResponse[]> => {
    const response = await apiClient.get<ApplicationResponse[]>('/rep/applications');
    return response.data;
};