import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/internal/preview-api";
import { ButtonPrimitive } from "../Button";
import { ModalComponent } from "./index";

const meta: Meta = {
  title: "core/Modal",
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `
        <ModalComponent.Root isOpen={open} toggle={() => setOpen(false)}>
          <ModalComponent.Header>Título do Modal</ModalComponent.Header>

          <ModalComponent.Body>
            Conteúdo do modal aqui dentro
          </ModalComponent.Body>

          <ModalComponent.Footer>
            <ButtonPrimitive variant="light" onClick={() => setOpen(false)}>
              Cancelar
            </ButtonPrimitive>
            <ButtonPrimitive>Confirmar</ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>  
        `,
      },
      description: {
        component: `
          Modal composto por:

          • ModalComponent.Root → container controlado
          • ModalComponent.Header → título
          • ModalComponent.Body → conteúdo
          • ModalComponent.Footer → ações
      `,
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "Controla se o modal está aberto",
      control: "boolean",
      type: "boolean",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    toggle: {
      description: "Função chamada para abrir/fechar o modal",
      type: "function",
      table: {
        defaultValue: {
          summary: "() => void",
        },
      },
    },
    children: {
      description: "Conteúdo do modal (Header, Body, Footer)",
      control: false,
      table: {
        type: {
          summary: "React.ReactNode",
        },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [{ isOpen }, updateArgs] = useArgs();

    const toggle = () => updateArgs({ isOpen: !isOpen });

    return (
      <>
        <ButtonPrimitive
          variant="primary"
          onClick={() => updateArgs({ isOpen: true })}
        >
          Abrir modal
        </ButtonPrimitive>

        <ModalComponent.Root isOpen={isOpen} toggle={toggle}>
          <ModalComponent.Header>Título do Modal</ModalComponent.Header>

          <ModalComponent.Body>
            Conteúdo do modal aqui dentro
          </ModalComponent.Body>

          <ModalComponent.Footer>
            <ButtonPrimitive variant="light" onClick={toggle}>
              Cancelar
            </ButtonPrimitive>
            <ButtonPrimitive>Confirmar</ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      </>
    );
  },
};
