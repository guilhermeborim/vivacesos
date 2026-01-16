import { ClinicTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic.repository";
import { CreateClinicParams } from "../../../infra/database/typeorm/sass/repositories/interfaces/clinic-repository.interface";
import { ConflictError } from "../../../shared/errors/conflict.error";
import { ClinicResponse } from "../interfaces/clinicResponse";

export class RegisterClinicService {
  private clinicRepository: ClinicTypeormRepository;

  constructor() {
    this.clinicRepository = new ClinicTypeormRepository();
  }

  async execute(clinic: CreateClinicParams): Promise<ClinicResponse> {
    const clinicExistsByCnpj = await this.clinicRepository.findByCnpj(
      clinic.cnpj
    );

    if (clinicExistsByCnpj) {
      throw new ConflictError("CNPJ já está cadastrado!");
    }

    const clinicExistsByPhone = await this.clinicRepository.findByPhone(
      clinic.phone
    );

    if (clinicExistsByPhone) {
      throw new ConflictError("Telefone já está cadastrado!");
    }

    const clinicCreated = await this.clinicRepository.createClinic(clinic);

    return {
      clinic: clinicCreated,
    };
  }
}
