import { Patient } from "../../../../infra/database/typeorm/sass/entities/Patient";
import { ForbiddenError } from "../../../../shared/errors/forbidden.error";
import { encrypt, hash } from "../../../../shared/utils/crypto";
import { PatientTypeormRepository } from "../../database/repositories/PatientTypeormRepository";
import { CreatePatientParams } from "../types";

export class RegisterPatientService {
  private patientRepository: PatientTypeormRepository;

  constructor() {
    this.patientRepository = new PatientTypeormRepository();
  }

  async execute(
    clinicId: string,
    patient: CreatePatientParams,
  ): Promise<Patient> {
    const cpfHash = hash(patient.cpf);
    const phoneHash = hash(patient.phone);

    const patientExistByClinic =
      await this.patientRepository.getPatientByCpfInClinic(cpfHash, clinicId);

    console.log(patientExistByClinic);
    if (patientExistByClinic) {
      throw new ForbiddenError("Este CPF já está cadastrado!");
    }

    patient.cpfHash = cpfHash;
    patient.phoneHash = phoneHash;
    patient.cpf = encrypt(patient.cpf);
    patient.phone = encrypt(patient.phone);

    const patientCreated = await this.patientRepository.createPatient(
      clinicId,
      patient,
    );

    return patientCreated;
  }
}
