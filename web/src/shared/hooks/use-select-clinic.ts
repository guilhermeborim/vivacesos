import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Clinic } from "features/auth/hooks/authContext";
import {
  selectClinicFormSchema,
  SelectClinicFormSchema,
} from "features/auth/schemas";
import { useForm } from "react-hook-form";
import { useMutationSelectClinic } from "shared/mutations/clinic";

export interface UseSelectClinicProps {
  clinics: Clinic[];
  isOpen: boolean;
  onClose: () => void;
}

export function useSelectClinic({ isOpen, onClose }: UseSelectClinicProps) {
  const queryClient = useQueryClient();
  const mutationSelectClinic = useMutationSelectClinic();
  const form = useForm<SelectClinicFormSchema>({
    resolver: zodResolver(selectClinicFormSchema),
  });

  const onSubmitSelectClinic = async (data: SelectClinicFormSchema) => {
    try {
      await mutationSelectClinic.mutateAsync(data.clinicId);
      queryClient.invalidateQueries({ queryKey: ["session"] });
      onClose();
    } catch (error) {}
  };

  return {
    form,
    mutationSelectClinic,
    onSubmitSelectClinic,
    isOpen,
  };
}
