import { Meta, StoryObj } from "@storybook/react";
import { ButtonDaisy } from "../components/buttons/button-daisy";
import { fn } from "@storybook/test";
import type { ButtonsDaisyProps } from '../components/buttons/button-daisy'

const meta: Meta<ButtonsDaisyProps> = {
  title: 'Buttons/ButtonDaisy',
  component: ButtonDaisy,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn(), disabled: false, loader: false },
} satisfies Meta<typeof ButtonDaisy>

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    brandColor: "btn-primary",
    label: "Botón primario",
    size: "btn-xs",
  },
}