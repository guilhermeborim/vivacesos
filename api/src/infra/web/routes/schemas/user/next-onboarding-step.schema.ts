import z from "zod";
import { UserOnboardingStep } from "../../../../database/typeorm/sass/entities/User";

export const nextOnboardingStepBodySchema = z.object({
  step: z.enum(UserOnboardingStep),
});

export type NextOnboardingStepBodySchema = z.infer<
  typeof nextOnboardingStepBodySchema
>;
