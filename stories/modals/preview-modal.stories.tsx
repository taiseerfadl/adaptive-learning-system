import type { Meta, StoryObj } from "@storybook/react";
import { PreviewModal } from "../../components/modals/preview-modal";

const meta: Meta<typeof PreviewModal> = {
  title: "MODALS/PreviewModal",
  component: PreviewModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PreviewModal>;

export const Default: Story = {
  args: {},
};
