import type { Meta, StoryObj } from "@storybook/react";
import { ErrorModal } from "../../components/modals/error-modal";

const meta: Meta<typeof ErrorModal> = {
  title: "MODALS/ErrorModal",
  component: ErrorModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorModal>;

export const Default: Story = {
  args: {},
};
