import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmModal } from "../../components/modals/confirm-modal";

const meta: Meta<typeof ConfirmModal> = {
  title: "MODALS/ConfirmModal",
  component: ConfirmModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {},
};
