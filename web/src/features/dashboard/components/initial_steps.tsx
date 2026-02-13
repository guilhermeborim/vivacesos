import {
  InputController,
  Loading,
  Nav,
  SelectController,
  Tab,
} from "@/core/ui";
import FormClinic from "@/features/clinic/components/form";
import { useCreateClinic } from "@/shared/hooks";
import { Col, Progress, Row } from "reactstrap";
import {
  useInitialStepClinic,
  useInitialStepFinished,
  useInitialStepProfessional,
  useInitialSteps,
} from "../hooks";
import { CreateNextStepTypeSchema } from "../schemas";

export default function InitialSteps(step: CreateNextStepTypeSchema) {
  const { activeTab, progressbarvalue } = useInitialSteps(step);
  const { mutationCreateClinic, onSubmitClinic } = useInitialStepClinic();
  const {
    mutationCreateProfessionalOnboarding,
    onSubmitProfessionalOnboarding,
    formProfessionalOnboarding,
  } = useInitialStepProfessional();
  const { onSubmitFinishedOnboarding } = useInitialStepFinished();
  const { formCreateClinic } = useCreateClinic();

  return (
    <>
      {mutationCreateClinic.isPending && (
        <Loading loading={mutationCreateClinic.isPending} />
      )}
      {mutationCreateProfessionalOnboarding.isPending && (
        <Loading loading={mutationCreateProfessionalOnboarding.isPending} />
      )}
      <div>
        <div className="progress-nav mb-4 mt-3">
          <Progress value={progressbarvalue} style={{ height: "1px" }} />

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
                    Para começar a usar o sistema, o primeiro passo é cadastrar
                    sua clínica. É nela que ficarão organizados os atendimentos,
                    profissionais e informações do seu negócio.
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={formCreateClinic.handleSubmit(onSubmitClinic)}>
              <FormClinic formClinic={formCreateClinic} />
              <div className="d-flex py-3">
                <button
                  type="submit"
                  className="btn btn-primary ms-auto"
                  disabled={
                    mutationCreateClinic.isPending ||
                    !formCreateClinic.formState.isValid
                  }
                >
                  {mutationCreateClinic.isPending
                    ? "Salvando..."
                    : "Salvar Clínica e Continuar"}
                </button>
              </div>
            </form>
          </Tab.Item>
          <Tab.Item tabId={2}>
            <form
              onSubmit={formProfessionalOnboarding.handleSubmit(
                onSubmitProfessionalOnboarding,
              )}
            >
              <div>
                <div className="mb-4">
                  <div>
                    <h5 className="mb-1">Cadastre Você como Profissional</h5>
                    <p className="text-muted">
                      Agora precisamos cadastrar você como profissional da
                      clínica. Isso permitirá que você realize atendimentos,
                      tenha acesso ao sistema e convide outros profissionais
                      futuramente.
                    </p>
                  </div>
                </div>
                <div>
                  <Row>
                    <Col lg={3}>
                      <SelectController
                        control={formProfessionalOnboarding.control}
                        name="type"
                        options={[{ label: "Médico", value: "MEDICO" }]}
                        label="Tipo de Profissional"
                        disabled
                      />
                    </Col>
                    <Col lg={3}>
                      <InputController
                        control={formProfessionalOnboarding.control}
                        name="crm"
                        label="CRM"
                        placeholder="CRM do Profissional"
                      />
                    </Col>
                    <Col lg={3}>
                      <InputController
                        control={formProfessionalOnboarding.control}
                        name="specialty"
                        label="Especialidade"
                        placeholder="Especialidade do Profissional"
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="d-flex mt-3">
                <button
                  type="submit"
                  className="btn btn-primary ms-auto"
                  disabled={
                    mutationCreateProfessionalOnboarding.isPending ||
                    !formProfessionalOnboarding.formState.isValid
                  }
                >
                  {mutationCreateProfessionalOnboarding.isPending
                    ? "Salvando..."
                    : "Salvar Profissional e Continuar"}
                </button>
              </div>
            </form>
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
                    Sua clínica já está cadastrada e seu perfil como
                    profissional foi criado. <br /> A partir de agora, você já
                    pode começar a usar o sistema e organizar sua rotina de
                    forma mais simples e eficiente.
                  </p>
                </div>
              </div>
              <div className="d-flex mt-3">
                <button
                  type="button"
                  className="btn btn-primary ms-auto"
                  onClick={onSubmitFinishedOnboarding}
                >
                  Vamos Lá!
                </button>
              </div>
            </div>
          </Tab.Item>
        </Tab.Root>
      </div>
    </>
  );
}
