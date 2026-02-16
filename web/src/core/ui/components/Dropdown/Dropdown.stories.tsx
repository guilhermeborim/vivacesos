import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownComponent } from "./index";

const meta: Meta<typeof DropdownComponent.Item> = {
  title: "core/Dropdown",
  component: DropdownComponent.Item,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
          Dropdown composto por:

          • Root → Container controlado  
          • Toggle → Controle de abrir / fechar  
          • Menu → Container com vários itens  
          • Item → Ação clicável
        `,
      },
      source: {
        code: `
          <DropdownComponent.Root>
            <DropdownComponent.Toggle variant="light"/>

            <DropdownComponent.Menu>
              <DropdownComponent.Item label="Editar"/>
              <DropdownComponent.Item label="Excluir" variant="danger" />
            </DropdownComponent.Menu>
          </DropdownComponent.Root>
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <DropdownComponent.Root>
        <DropdownComponent.Toggle />

        <DropdownComponent.Menu>
          <DropdownComponent.Item
            icon={<i className="mdi mdi-pencil-outline me-1" />}
            label={"Editar"}
            onClick={() => {}}
          />
          <DropdownComponent.Item
            label="Excluir"
            icon={<i className="mdi mdi-delete-outline me-1" />}
            variant="danger"
            onClick={() => {}}
          />
        </DropdownComponent.Menu>
      </DropdownComponent.Root>
    );
  },
};
