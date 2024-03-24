import { Meta, StoryObj } from "@storybook/react";
import { ButtonIconDaisy, ButtonIconDaisyProps } from "../components/buttons/button-icon-daisy";


const meta: Meta<ButtonIconDaisyProps> = {
  title: 'Buttons/ButtonIconDaisy',
  component: ButtonIconDaisy,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonIconDaisy>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
};