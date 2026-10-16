import { ButtonPrimitive, Loading, Nav, Tab } from "@/core/ui"
import { FormClinic } from "@/features/clinic/components/form"
import { useCreateClinic } from "@/features/clinic/hooks/use-create-clinic"
import { FormProvider } from "react-hook-form"
import { Progress } from "reactstrap"
import {
  useInitialStepClinic,
  useInitialStepFinished,
  useInitialStepProfessional,
  useInitialSteps,
} from "../hooks"
import { CreateNextStepTypeSchema } from "../schemas"
import { FormProfessionalOnboarding } from "./forms"

export function InitialSteps(step: CreateNextStepTypeSchema) {
  const { activeTab, progressBarValue } = useInitialSteps(step)
  const {
    actions: { handleSubmitClinic },
    isLoading: { isPendingClinic },
  } = useInitialStepClinic()
  const {
    actions: {
      handleSubmitProfessionalOnboarding,
      handleSkipProfessional,
      formProfessionalOnboarding,
    },
    isLoading: { isPendingProfessionalOnboarding, isSkipping },
  } = useInitialStepProfessional()
  const {
    actions: { handleSubmitFinishedOnboarding },
  } = useInitialStepFinished()
  const {
    actions: { formCreateClinic },
    isLoading: { loadingCep },
  } = useCreateClinic()

  return (
    <>
      {loadingCep && <Loading loading={loadingCep} />}
      {isPendingClinic && <Loading loading={isPendingClinic} />}
      {isSkipping && <Loading loading={isSkipping} />}
      {isPendingProfessionalOnboarding && (
        <Loading loading={isPendingProfessionalOnboarding} />
      )}
      <div>
        <div className="progress-nav mb-4 mt-3">
          <Progress value={progressBarValue} style={{ height: "1px" }} />

          <Nav.Root>
            <Nav.Item>
              <Nav.Link activeTab={activeTab} maxTabs={4} tab={1} text="1" />
            </Nav.Item>
            <Nav.Item>
              <Nav.Link activeTab={activeTab} maxTabs={4} tab={2} text="2" />
            </Nav.Item>
            <Nav.Item>
              <Nav.Link activeTab={activeTab} maxTabs={4} tab={3} text="3" />
            </Nav.Item>
          </Nav.Root>
        </div>

        <Tab.Root activeTab={activeTab}>
          <Tab.Item tabId={1}>
            <div>
              <div className="mb-4">
                <div>
                  <h5 className="mb-1">Cadastre sua Clínica</h5>
                  <p className="text-muted">
                    Para começar a usar o sistema, o primeiro passo é cadastrar sua
                    clínica. É nela que ficarão organizados os atendimentos, profissionais
                    e informações do seu negócio.
                  </p>
                </div>
              </div>
            </div>
            <FormClinic formClinic={formCreateClinic} />
            <div className="d-flex py-3 justify-content-end">
              <form onSubmit={formCreateClinic.handleSubmit(handleSubmitClinic)}>
                <ButtonPrimitive
                  type="submit"
                  disabled={isPendingClinic || !formCreateClinic.formState.isValid}
                  isLoading={isPendingClinic}
                >
                  Salvar Clínica e Continuar
                </ButtonPrimitive>
              </form>
            </div>
          </Tab.Item>
          <Tab.Item tabId={2}>
            <FormProvider {...formProfessionalOnboarding}>
              <div>
                <div className="mb-4">
                  <div>
                    <h5 className="mb-1">Cadastre Você como Profissional</h5>
                    <p className="text-muted">
                      Agora precisamos cadastrar você como profissional da clínica. Isso
                      permitirá que você realize atendimentos, tenha acesso ao sistema e
                      convide outros profissionais futuramente.
                    </p>
                  </div>
                </div>
                <div>
                  <FormProfessionalOnboarding />
                </div>
              </div>
              <div className="d-flex mt-3 justify-content-end gap-2">
                <form
                  onSubmit={formProfessionalOnboarding.handleSubmit(
                    handleSubmitProfessionalOnboarding,
                  )}
                >
                  <ButtonPrimitive
                    type="submit"
                    disabled={
                      isPendingProfessionalOnboarding ||
                      !formProfessionalOnboarding.formState.isValid
                    }
                    isLoading={isPendingProfessionalOnboarding}
                  >
                    Salvar Profissional e Continuar
                  </ButtonPrimitive>
                </form>
                <ButtonPrimitive
                  type="button"
                  variant="warning"
                  onClick={handleSkipProfessional}
                  isLoading={isSkipping}
                  disabled={isPendingProfessionalOnboarding}
                >
                  Pular
                </ButtonPrimitive>
              </div>
            </FormProvider>
          </Tab.Item>
          <Tab.Item tabId={3}>
            <div>
              <div className="text-center">
                <div className="mb-4">
                  <i className="bx bx-party display-4 text-success"></i>
                </div>
                <h5>Parábens, tudo pronto!</h5>
                <div>
                  <p className="text-muted">
                    Sua clínica já está cadastrada. Se você atende pacientes, seu perfil
                    de profissional também foi criado; caso contrário, você pode
                    cadastrá-lo depois em Profissionais da Saúde. <br /> A partir de agora, você já pode começar a usar o
                    sistema e organizar sua rotina de forma mais simples e eficiente.
                  </p>
                </div>
              </div>
              <div className="d-flex mt-3 justify-content-end">
                <ButtonPrimitive type="button" onClick={handleSubmitFinishedOnboarding}>
                  Vamos Lá!
                </ButtonPrimitive>
              </div>
            </div>
          </Tab.Item>
        </Tab.Root>
      </div>
    </>
  )
}
