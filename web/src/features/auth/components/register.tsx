import { ButtonPrimitive, InputController, Loading } from "@/core/ui"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Label, Row } from "reactstrap"
import { useRegister } from "../hooks/use-register"
import { registerFields } from "./forms"

export function Register() {
  const { form, handleSubmit, registerUser, showPassword, toggleShowPassword } =
    useRegister()

  return (
    <>
      {registerUser && <Loading loading={registerUser} />}
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="mt-4 card-bg-fill">
            <CardBody className="p-4">
              <div className="text-center text-white-50"></div>
              <div className="text-center mt-2">
                <h5 className="text-primary">Realize seu cadastro!</h5>
                <p className="text-muted">Crie sua conta para acessar a plataforma.</p>
              </div>
              <div className="p-2 mt-4">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  {registerFields.map((field) => (
                    <div className="mb-3" key={field.name}>
                      <InputController
                        control={form.control}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        errors={form.formState.errors}
                      />
                    </div>
                  ))}

                  <div className="mb-3">
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

                  <div className="mt-4">
                    <ButtonPrimitive
                      variant="primary"
                      className="w-100"
                      type="submit"
                      disabled={registerUser}
                      isLoading={registerUser}
                    >
                      Cadastrar
                    </ButtonPrimitive>
                  </div>
                  <div className="text-end mt-1">
                    <Link to="/login">Já tem uma conta? Entrar</Link>
                  </div>
                </form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}
