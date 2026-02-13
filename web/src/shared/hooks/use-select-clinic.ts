import { Clinic } from "@/features/auth/hooks/authContext";
import {
  selectClinicFormSchema,
  SelectClinicFormTypeSchema,
} from "@/features/auth/schemas";
import { useMutationSelectClinic } from "@/shared/mutations/clinic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export interface UseSelectClinicProps {
  clinics: Clinic[];
  isOpen: boolean;
  onClose: () => void;
}

export function useSelectClinic({ isOpen, onClose }: UseSelectClinicProps) {
  const queryClient = useQueryClient();
  const mutationSelectClinic = useMutationSelectClinic();
  const form = useForm<SelectClinicFormTypeSchema>({
    resolver: zodResolver(selectClinicFormSchema),
  });

  const onSubmitSelectClinic = async (data: SelectClinicFormTypeSchema) => {
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
