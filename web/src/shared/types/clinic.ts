export type Clinic = {
  clinic: {
    id: string;
    name: string;
    cnpj: string;
    phone: string;
    active: boolean;
    cep: string;
    road: string;
    number: string;
    neighborhood: string;
    city: string;
    complement: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  };
};
