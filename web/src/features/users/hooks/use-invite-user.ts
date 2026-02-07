import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutationInvite } from "../api/mutations";
import { createInviteSchema, CreateInviteTypeSchema } from "../schemas";

export const useInviteUser = () => {
  // STATES
  const [modalInvite, setModalInvite] = useState<boolean>(false);
  const mutationInvite = useMutationInvite();

  // FORM
  const formUser = useForm<CreateInviteTypeSchema>({
    resolver: zodResolver(createInviteSchema),
  });

  // FUNCTIONS
  const toggleModalInvite = () => {
    setModalInvite(!modalInvite);
    formUser.reset();
  };

  const onSubmitInvite = async (payload: CreateInviteTypeSchema) => {
    try {
      await mutationInvite.mutateAsync(payload);
      toggleModalInvite();
    } catch {}
  };

  return {
    modalInvite,
    toggleModalInvite,
    formUser,
    onSubmitInvite,
  };
};
