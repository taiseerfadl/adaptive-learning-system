import type { Meta, StoryObj } from "@storybook/react";
import { InstitutionSidebar } from "../../components/institution/institution-sidebar";

const meta: Meta<typeof InstitutionSidebar> = {
  title: "INSTITUTION/InstitutionSidebar",
  component: InstitutionSidebar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstitutionSidebar>;

export const Default: Story = {
  args: {},
};
