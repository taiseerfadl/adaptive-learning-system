import type { Meta, StoryObj } from "@storybook/react";
import { UserImport } from "../../components/admin/user-import";

const meta: Meta<typeof UserImport> = {
  title: "ADMIN/UserImport",
  component: UserImport,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserImport>;

export const Default: Story = {
  args: {},
};
