import {
  createClinicFormSchema,
  CreateClinicFormTypeSchema,
} from "@/features/clinic/schemas";
import { useMutationCreateClinic } from "@/shared/mutations/clinic";
import { getCep } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
    if (cep) {
      getCep({ form: formCreateClinic, cep });
    }
  }, [cep]);

  return {
    formCreateClinic,
    mutationCreateClinic,
    onSubmitClinicCreate,
  };
};
