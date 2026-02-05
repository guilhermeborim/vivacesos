import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  createClinicFormSchema,
  CreateClinicFormTypeSchema,
} from "features/clinic/schemas";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutationCreateClinic } from "shared/mutations/clinic";

export const useCreateClinic = () => {
  const mutationCreateClinic = useMutationCreateClinic();
  const formCreateClinic = useForm<CreateClinicFormTypeSchema>({
    resolver: zodResolver(createClinicFormSchema),
  });

  const onSubmitClinicCreate = async (data: CreateClinicFormTypeSchema) => {
    try {
      await mutationCreateClinic.mutateAsync(data);
    } catch (error) {}
  };

  const cep = formCreateClinic.watch("cep");

  useEffect(() => {
    const cepFormatted = cep?.replace(/\D/g, "");

    if (cepFormatted?.length !== 8) return;

    async function buscarCep() {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepFormatted}/json/`,
        );
        const data = response.data;

        formCreateClinic.setValue("road", data.logradouro || "");
        formCreateClinic.setValue("neighborhood", data.bairro || "");
        formCreateClinic.setValue("city", data.localidade || "");
      } catch (error) {
        console.log("erro", error);
      }
    }

    buscarCep();
  }, [cep]);

  return {
    formCreateClinic,
    mutationCreateClinic,
    onSubmitClinicCreate,
  };
};
