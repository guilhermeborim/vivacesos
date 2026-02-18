import { PatientTypeormRepository } from "../../database/repositories/PatientTypeormRepository";
import { PatientResponse } from "../dtos/PatientResponse";
import { PatientMapper } from "../mappers/PatientMapper";

export class GetPatientsByClinicService {
  private patientRepository: PatientTypeormRepository;

  constructor() {
    this.patientRepository = new PatientTypeormRepository();
  }

  async execute(clinicId: string): Promise<PatientResponse[]> {
    const patients = await this.patientRepository.getPatientsByClinic(clinicId);

    return patients.map(PatientMapper.toResponse);
  }
}
