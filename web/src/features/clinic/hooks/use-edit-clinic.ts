import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutationUpdateClinic } from "shared/mutations/clinic";
import { updateClinicFormSchema, UpdateClinicFormTypeSchema } from "../schemas";

export const useEditClinic = (clinicId: string | null) => {
  const mutationUpdateClinic = useMutationUpdateClinic(clinicId!);
  const formUpdateClinic = useForm<UpdateClinicFormTypeSchema>({
    resolver: zodResolver(updateClinicFormSchema),
  });

  const onSubmitClinicUpdate = async (data: UpdateClinicFormTypeSchema) => {
    try {
      await mutationUpdateClinic.mutateAsync(data);
    } catch (error) {}
  };

  const cep = formUpdateClinic.watch("cep");
  useEffect(() => {
    const cepFormatted = cep?.replace(/\D/g, "");

    if (cepFormatted?.length !== 8) return;

    async function buscarCep() {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepFormatted}/json/`,
        );
        const data = response.data;

        formUpdateClinic.setValue("road", data.logradouro || "");
        formUpdateClinic.setValue("neighborhood", data.bairro || "");
        formUpdateClinic.setValue("city", data.localidade || "");
      } catch (error) {
        console.log("erro", error);
      }
    }

    buscarCep();
  }, [cep]);

  return {
    formUpdateClinic,
    mutationUpdateClinic,
    onSubmitClinicUpdate,
  };
};
