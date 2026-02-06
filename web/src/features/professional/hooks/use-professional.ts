import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutationCreateProfessional } from "../api/mutations";
import {
  CreateProfessionalBodySchema,
  createProfessionalBodySchema,
} from "../schemas";

export const useProfessional = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const mutationCreateProfessional = useMutationCreateProfessional();

  const form = useForm<CreateProfessionalBodySchema>({
    resolver: zodResolver(createProfessionalBodySchema),
  });
  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
    form.reset();
  };

  const handleSubmit = async (payload: CreateProfessionalBodySchema) => {
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
  };
};
