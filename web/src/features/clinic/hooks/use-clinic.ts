import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutationCreateClinic } from "shared/mutations/clinic";
import { createClinicFormSchema, CreateClinicFormSchema } from "../schemas";

export function useClinic(defaultValues?: any) {
  const mutationCreateClinic = useMutationCreateClinic();
  const formClinic = useForm<CreateClinicFormSchema>({
    resolver: zodResolver(createClinicFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      formClinic.reset(defaultValues);
    }
  }, [defaultValues]);

  const cep = formClinic.watch("cep");

  useEffect(() => {
    const cepFormatted = cep?.replace(/\D/g, "");

    if (cepFormatted?.length !== 8) return;

    async function buscarCep() {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepFormatted}/json/`,
        );
        const data = response.data;

        formClinic.setValue("road", data.logradouro || "");
        formClinic.setValue("neighborhood", data.bairro || "");
        formClinic.setValue("city", data.localidade || "");
      } catch (error) {
        console.log("erro", error);
      }
    }

    buscarCep();
  }, [cep]);

  return {
    mutationCreateClinic,
    formClinic,
  };
}
