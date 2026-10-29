import type { Meta, StoryObj } from "@storybook/react";
import { InfoModal } from "../../components/modals/info-modal";

const meta: Meta<typeof InfoModal> = {
  title: "MODALS/InfoModal",
  component: InfoModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InfoModal>;

export const Default: Story = {
  args: {},
};
