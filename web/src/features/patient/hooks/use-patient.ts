import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutationPatient } from "../api/mutations";
import { createPatientTypeSchema, CreatePatientTypeSchema } from "../schemas";

export const usePostPatient = () => {
  // STATES
  const mutationPatient = useMutationPatient();
  const [modal, setModal] = useState(false);

  // FORM
  const formPatient = useForm<CreatePatientTypeSchema>({
    resolver: zodResolver(createPatientTypeSchema),
  });

  // FUNCTIONS
  const toggleModal = () => {
    formPatient.reset();
    setModal(!modal);
  };

  const onSubmitPatient = async (payload: CreatePatientTypeSchema) => {
    try {
      await mutationPatient.mutateAsync(payload);
      toggleModal();
    } catch {}
  };

  return {
    formPatient,
    onSubmitPatient,
    modal,
    toggleModal,
  };
};
