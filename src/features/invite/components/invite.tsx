import { ButtonPrimitive, InputController, Loading } from "@/core/ui";
import { FormProvider } from "react-hook-form";
import { Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import { useInvite } from "../hooks";
import { FormInvite, FormProfessionalStep } from "./forms";

export function Invite() {
  const {
    actions: {
      form,
      handleSubmit,
      toggleShowPassword,
      goBack,
      setWantsToAttend,
    },
    data: {
      data,
      registerUser,
      showPassword,
      step,
      offersProfessional,
      needsProfessional,
      wantsToAttend,
    },
  } = useInvite();

  return (
    <FormProvider {...form}>
      {registerUser && <Loading loading={registerUser} />}
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="mt-4 card-bg-fill">
            <CardBody className="p-4">
              <div className="text-center text-white-50"></div>
              <div className="text-center mt-2">
                <h5 className="text-primary">
                  Finalize o cadastro do convite!
                </h5>
                <p className="text-muted">
                  {step === 1
                    ? "Crie sua conta para acessar a plataforma."
                    : "Agora, os dados do seu perfil profissional."}
                </p>
                {needsProfessional && (
                  <small className="text-muted">Etapa {step} de 2</small>
                )}
              </div>
              <div className="p-2">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  {step === 1 && (
                    <>
                      <div>
                        <InputController
                          control={form.control}
                          name="email"
                          label="E-mail"
                          value={data?.data.email}
                          errors={form.formState.errors}
                          disabled
                        />
                      </div>

                      <FormInvite />

                      <div className="mt-3">
                        <Label className="form-label" htmlFor="password-input">
                          Senha
                        </Label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <InputController
                            control={form.control}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="******"
                            errors={form.formState.errors}
                          />
                          {!form.formState.errors.password && (
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={toggleShowPassword}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          )}
                        </div>
                      </div>

                      {offersProfessional && (
                        <div className="form-check form-switch mb-3">
                          <Input
                            type="switch"
                            id="attend-switch"
                            checked={wantsToAttend}
                            onChange={(e) => setWantsToAttend(e.target.checked)}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="attend-switch"
                          >
                            Também atendo pacientes
                          </Label>
                        </div>
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <div className="mb-3">
                      <FormProfessionalStep />
                    </div>
                  )}

                  <div className="mt-4 d-flex gap-2">
                    {step === 2 && (
                      <ButtonPrimitive
                        type="button"
                        variant="light"
                        disabled={registerUser}
                        onClick={goBack}
                      >
                        Voltar
                      </ButtonPrimitive>
                    )}
                    <ButtonPrimitive
                      className="flex-grow-1"
                      type="submit"
                      disabled={registerUser}
                      isLoading={registerUser}
                    >
                      {needsProfessional
                        ? step === 1
                          ? "Avançar"
                          : "Vamos começar"
                        : "Vamos lá"}
                    </ButtonPrimitive>
                  </div>
                </form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </FormProvider>
  );
}
