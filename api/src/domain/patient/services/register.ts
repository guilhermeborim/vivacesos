import { Patient } from "../../../infra/database/typeorm/sass/entities/Patient";
import { CreatePatientParams } from "../../../infra/database/typeorm/sass/interfaces/patient";
import { PatientTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/patient.repository";
import { encrypt } from "../../../infra/utils/crypto";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";

export class RegisterPatientService {
  private patientRepository: PatientTypeormRepository;

  constructor() {
    this.patientRepository = new PatientTypeormRepository();
  }

  async execute(
    clinicId: string,
    patient: CreatePatientParams,
  ): Promise<Patient> {
    const patientExistByClinic =
      await this.patientRepository.getPatientByCpfInClinic(
        clinicId,
        patient.cpf,
      );

    if (patientExistByClinic) {
      throw new ForbiddenError("Paciente já está cadastrado nessa clínica");
    }

    if (patient.cpf || patient.phone) {
      const cpfHash = encrypt(patient.cpf);
      const phoneHash = encrypt(patient.phone);
      patient.cpf = cpfHash;
      patient.phone = phoneHash;
    }

    const patientCreated = await this.patientRepository.createPatient(
      clinicId,
      patient,
    );

    return patientCreated;
  }
}
