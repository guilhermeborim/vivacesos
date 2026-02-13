import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutationCreateProfessional } from "../api/mutations";
import {
  CreateProfessionalTypeSchema,
  createProfessionalSchema,
} from "../schemas";

export const useProfessional = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const mutationCreateProfessional = useMutationCreateProfessional();

  const form = useForm<CreateProfessionalTypeSchema>({
    resolver: zodResolver(createProfessionalSchema),
  });
  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
    form.reset();
  };

  const handleSubmit = async (payload: CreateProfessionalTypeSchema) => {
    try {
      await mutationCreateProfessional.mutateAsync(payload);
      toggleModalOpen();
    } catch {}
  };

  return {
    toggleModalOpen,
    modalOpen,
    form,
    handleSubmit,
    mutationCreateProfessional,
  };
};
