// import { User } from "@/shared/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { updateUserSchema, UpdateUserTypeSchema } from "../schemas";

// export const useEditUser = (user: User) => {
//   const [modalEdit, setModalEdit] = useState(false);

//   const toggleModalEdit = () => {
//     setModalEdit(!modalEdit);
//   };

//   const formUpdateUser = useForm<UpdateUserTypeSchema>({
//     resolver: zodResolver(updateUserSchema),
//     defaultValues: user,
//   });
//   // const [editClinicId, setEditClinicId] = useState<string | null>(null);

//   // const mutationUpdateClinic = useMutationUpdateClinic(editClinicId!);
//   const onSubmitUserUpdate = async (payload: any) => {
//     try {
//       console.log(formUpdateUser.formState.dirtyFields);
//       // await mutationUpdateClinic.mutateAsync(payload);
//     } catch (error) {}
//   };

//   return {
//     data: {
//       modalEdit,
//     },
//     actions: {
//       toggleModalEdit,
//       formUpdateUser,
//       onSubmitUserUpdate,
//     },
//   };
// };
