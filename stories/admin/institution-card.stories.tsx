import type { Meta, StoryObj } from "@storybook/react";
import { InstitutionCard } from "../../components/admin/institution-card";

const meta: Meta<typeof InstitutionCard> = {
  title: "ADMIN/InstitutionCard",
  component: InstitutionCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstitutionCard>;

export const Default: Story = {
  args: {},
};
