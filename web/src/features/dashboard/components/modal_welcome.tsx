import ImgWelcome from "@/assets/images/welcome.svg";
import { ButtonPrimitive, ModalComponent } from "@/core/ui";
import { useState } from "react";

interface ModalWelcomeProps {
  isOpen: boolean;
}

export function ModalWelcome({ isOpen }: ModalWelcomeProps) {
  const [modalWelcome, setmodalWelcome] = useState(isOpen);

  return (
    <ModalComponent.Root isOpen={modalWelcome} toggle={() => {}}>
      <ModalComponent.Body
      //  className="py-3 px-5"
      >
        <div className="mt-2 text-center">
          <img
            src={ImgWelcome}
            alt="Boas-vindas"
            height="150"
            className="mb-3"
          />
          <div className="fs-15 mx-4 mx-sm-5">
            <h4>Bem-vindo(a) à plataforma! 🎉</h4>
            <p className="text-muted mb-0">
              Vamos te guiar rapidamente pelos primeiros passos para deixar tudo
              pronto e começar a usar o sistema sem complicações.
            </p>
          </div>
        </div>
        <div className="d-grid mt-4 mb-2">
          <ButtonPrimitive
            type="button"
            variant="primary"
            onClick={() => setmodalWelcome(false)}
          >
            Vamos nessa!
          </ButtonPrimitive>
        </div>
      </ModalComponent.Body>
    </ModalComponent.Root>
  );
}
