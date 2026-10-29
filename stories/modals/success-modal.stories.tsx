import type { Meta, StoryObj } from "@storybook/react";
import { SuccessModal } from "../../components/modals/success-modal";

const meta: Meta<typeof SuccessModal> = {
  title: "MODALS/SuccessModal",
  component: SuccessModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SuccessModal>;

export const Default: Story = {
  args: {},
};
