import { apiClient } from './client';

export interface ApplicationResponse {
    id: number;
    jobTitle: string;
    companyName: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'INTERVIEW' | 'OFFER_SENT' | 'HIRED' | 'WITHDRAWN';
    applicationDate: string;
    interviewUrl?: string;
    // ... otros campos si son necesarios
}

/**
 * Aplica a una oferta.
 * URL: /api/rep/jobs/{offerId}/apply
 */
export const applyToJob = async (jobOfferId: number): Promise<ApplicationResponse> => {
    // apiClient.post ya devuelve T, no AxiosResponse<T>
    return await apiClient.post<ApplicationResponse>(
        `/rep/jobs/${jobOfferId}/apply`, 
        {}, // body vacío
        true // auth
    );
};

/**
 * Obtiene las aplicaciones del REP.
 * URL: /api/rep/applications
 */
export const fetchRepApplications = async (): Promise<ApplicationResponse[]> => {
    return await apiClient.get<ApplicationResponse[]>('/rep/applications', true);
};