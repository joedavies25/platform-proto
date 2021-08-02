import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../components/atoms/Button/Button';

export default {
  title: 'App/AppButton',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

export const Logout = (args) => <Button {...args}>Logout</Button>;

