import type { Meta, StoryObj } from "@storybook/react";
import { SkillTree } from "../../components/student/skill-tree";

const meta: Meta<typeof SkillTree> = {
  title: "STUDENT/SkillTree",
  component: SkillTree,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SkillTree>;

export const Default: Story = {
  args: {},
};
