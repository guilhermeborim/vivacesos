import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutationInvite } from "../api/mutations";
import { RegisterInviteBodySchema, registerInviteBodySchema } from "../schemas";

export const useInviteUser = () => {
  const [modalInvite, setModalInvite] = useState<boolean>(false);
  const mutationInvite = useMutationInvite();

  const formUser = useForm<RegisterInviteBodySchema>({
    resolver: zodResolver(registerInviteBodySchema),
  });

  const toggleModalInvite = () => {
    setModalInvite(!modalInvite);
    formUser.reset();
  };

  const onSubmitInvite = async (payload: RegisterInviteBodySchema) => {
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
