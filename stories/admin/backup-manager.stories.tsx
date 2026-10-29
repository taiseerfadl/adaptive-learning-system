import type { Meta, StoryObj } from "@storybook/react";
import { BackupManager } from "../../components/admin/backup-manager";

const meta: Meta<typeof BackupManager> = {
  title: "ADMIN/BackupManager",
  component: BackupManager,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BackupManager>;

export const Default: Story = {
  args: {},
};
