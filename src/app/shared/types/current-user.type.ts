import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';

export type currentUser = PatientDocument & { session: string };
