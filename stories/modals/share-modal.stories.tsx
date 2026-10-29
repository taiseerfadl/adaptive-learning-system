import type { Meta, StoryObj } from "@storybook/react";
import { ShareModal } from "../../components/modals/share-modal";

const meta: Meta<typeof ShareModal> = {
  title: "MODALS/ShareModal",
  component: ShareModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ShareModal>;

export const Default: Story = {
  args: {},
};
