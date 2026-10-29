import type { Meta, StoryObj } from "@storybook/react";
import { InstitutionForm } from "../../components/admin/institution-form";

const meta: Meta<typeof InstitutionForm> = {
  title: "ADMIN/InstitutionForm",
  component: InstitutionForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstitutionForm>;

export const Default: Story = {
  args: {},
};
