import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutationPatient } from "../api/mutations";
import { createPatientTypeSchema, CreatePatientTypeSchema } from "../schemas";

export const usePostPatient = () => {
  // STATES
  const mutationPatient = useMutationPatient();

  // FORM
  const formPatient = useForm<CreatePatientTypeSchema>({
    resolver: zodResolver(createPatientTypeSchema),
  });

  // FUNCTIONS
  const onSubmitPatient = async (payload: CreatePatientTypeSchema) => {
    try {
      await mutationPatient.mutateAsync(payload);
    } catch {}
  };

  return {
    formPatient,
    onSubmitPatient,
  };
};
