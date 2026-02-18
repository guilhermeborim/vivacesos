import { PatientTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/patient.repository";
import { PatientDto } from "../dtos/Patient";
import { PatientMapper } from "../mappers/PatientMapper";

export class GetPatientsByClinicService {
  private patientRepository: PatientTypeormRepository;

  constructor() {
    this.patientRepository = new PatientTypeormRepository();
  }

  async execute(clinicId: string): Promise<PatientDto[]> {
    const patients = await this.patientRepository.getPatientsByClinic(clinicId);

    return patients.map(PatientMapper.toResponse);
  }
}
