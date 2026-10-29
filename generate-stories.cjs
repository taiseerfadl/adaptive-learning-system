const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname,  'components');
const storiesDir = path.join(__dirname,  'stories');

const excludeDirs = ['skeletons'];
const excludeFiles = ['index.ts', 'remaining-index.ts', 'route_placeholder.tsx', 'README.md', 'modal-utils.tsx'];

function createStory(filePath, relativePath) {
  const fileName = path.basename(filePath, '.tsx');
  
  const componentName = fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const categoryDir = path.dirname(relativePath);
  const targetStoryFolder = path.join(storiesDir, categoryDir);

  if (!fs.existsSync(targetStoryFolder)) {
    fs.mkdirSync(targetStoryFolder, { recursive: true });
  }

  const storyFilePath = path.join(targetStoryFolder, fileName + '.stories.tsx');

  let importPath = path.relative(targetStoryFolder, filePath).replace(/\\/g, '/');
  if (importPath.endsWith('.tsx')) {
    importPath = importPath.slice(0, -4);
  }
  if (!importPath.startsWith('.')) {
    importPath = './' + importPath;
  }

  const titleCategory = categoryDir !== '.' ? categoryDir.toUpperCase() + '/' : '';

  const storyContent = [
    "import type { Meta, StoryObj } from '@storybook/react';",
    "import { " + componentName + " } from '" + importPath + "';",
    "",
    "const meta: Meta<typeof " + componentName + "> = {",
    "  title: '" + titleCategory + componentName + "',",
    "  component: " + componentName + ",",
    "  tags: ['autodocs'],",
    "};",
    "",
    "export default meta;",
    "type Story = StoryObj<typeof " + componentName + ">;",
    "",
    "export const Default: Story = {",
    "  args: {},",
    "};",
    ""
  ].join('\n');

  fs.writeFileSync(storyFilePath, storyContent, 'utf8');
  console.log('✅ Created story for: ' + categoryDir + '/' + fileName);
}

function processDirectory(dir, relativeDir) {
  relativeDir = relativeDir || '';
  const items = fs.readdirSync(dir);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const fullPath = path.join(dir, item);
    const relPath = path.join(relativeDir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludeDirs.includes(item)) {
        processDirectory(fullPath, relPath);
      }
    } else if (stat.isFile() && item.endsWith('.tsx')) {
      if (!excludeFiles.includes(item)) {
        createStory(fullPath, relPath);
      }
    }
  }
}

console.log('🚀 Starting Storybook stories generation...');
if (fs.existsSync(componentsDir)) {
  processDirectory(componentsDir);
  console.log('🎉 Finished generating stories inside src/stories folder!');
} else {
  console.error('❌ Folder src/components not found!');
}