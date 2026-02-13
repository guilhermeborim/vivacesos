import { getCep } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutationUpdateClinic } from "../api/mutations";
import { updateClinicFormSchema, UpdateClinicFormTypeSchema } from "../schemas";

export const useEditClinic = () => {
  // STATES
  const [editClinicId, setEditClinicId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // FORM
  const formUpdateClinic = useForm<UpdateClinicFormTypeSchema>({
    resolver: zodResolver(updateClinicFormSchema),
  });
  const cep = formUpdateClinic.watch("cep");
  const mutationUpdateClinic = useMutationUpdateClinic(editClinicId!);
  const onSubmitClinicUpdate = async (payload: UpdateClinicFormTypeSchema) => {
    try {
      await mutationUpdateClinic.mutateAsync(payload);
    } catch (error) {}
  };

  // FUNCTIONS
  function toggleModal() {
    setModalOpen(!modalOpen);
    setEditClinicId(null);
  }

  function handleEdit(clinicId: string) {
    setModalOpen(true);
    setEditClinicId(clinicId);
  }

  function handleDelete(id: string) {
    console.log("Deletar clínica", id);
  }

  // RENDERS
  useEffect(() => {
    if (cep) {
      getCep({ form: formUpdateClinic, cep });
    }
  }, [cep]);

  return {
    formUpdateClinic,
    mutationUpdateClinic,
    onSubmitClinicUpdate,
    handleDelete,
    handleEdit,
    modalOpen,
    toggleModal,
    editClinicId,
  };
};
