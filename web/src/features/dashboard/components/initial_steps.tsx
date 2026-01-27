import classnames from "classnames";
import { InputController } from "Components/Common/InputController";
import { Loading } from "Components/Common/Loading";
import { SelectController } from "Components/Common/SelectController";
import FormClinic from "features/clinic/components/form";
import { useClinic } from "features/clinic/hooks/use-clinic";
import { useProfessionalOnboarding } from "features/professional/hooks/use-professional-onboarding";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { useInitialSteps } from "../hooks/use-initial-steps";

interface InitialStepsProps {
  step: "CREATE_CLINIC" | "LINK_PROFESSIONAL" | "DONE" | "FINISHED";
}

export default function InitialSteps({ step }: InitialStepsProps) {
  const {
    onSubmitClinic,
    mutationCreateClinic,
    onSubmitProfessionalOnboarding,
    mutationCreateProfessionalOnboarding,
    onSubmitFinishedOnboarding,
    activeTab,
    progressbarvalue,
  } = useInitialSteps(step);
  const { formClinic } = useClinic();
  const { formProfessionalOnboarding } = useProfessionalOnboarding();

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

          <Nav className="nav-pills progress-bar-tab custom-nav" role="tablist">
            <NavItem>
              <NavLink
                id="pills-gen-info-tab"
                className={classnames(
                  {
                    active: activeTab === 1,
                    done: activeTab <= 4 && activeTab >= 0,
                  },
                  "rounded-pill",
                )}
                tag="button"
                type="button"
              >
                1
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="pills-gen-info-tab"
                className={classnames(
                  {
                    active: activeTab === 2,
                    done: activeTab <= 4 && activeTab > 1,
                  },
                  "rounded-pill",
                )}
                tag="button"
                type="button"
              >
                2
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="pills-gen-info-tab"
                className={classnames(
                  {
                    active: activeTab === 3,
                    done: activeTab <= 4 && activeTab > 2,
                  },
                  "rounded-pill",
                )}
                tag="button"
                type="button"
              >
                3
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
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
            <form onSubmit={formClinic.handleSubmit(onSubmitClinic)}>
              <FormClinic formClinic={formClinic} />
              <div className="d-flex">
                <button
                  type="submit"
                  className="btn btn-primary ms-auto"
                  disabled={
                    mutationCreateClinic.isPending ||
                    !formClinic.formState.isValid
                  }
                >
                  {mutationCreateClinic.isPending
                    ? "Salvando..."
                    : "Salvar Clínica e Continuar"}
                </button>
              </div>
            </form>
          </TabPane>

          <TabPane tabId={2}>
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
          </TabPane>

          <TabPane tabId={3}>
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
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}
