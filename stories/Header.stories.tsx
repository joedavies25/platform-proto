import { ComponentStory, ComponentMeta } from '@storybook/react';
import HeaderComponent from '../components/organisms/Header/HeaderComponent';

export default {
  title: 'App/AppHeader',
  component: HeaderComponent,
} as ComponentMeta<typeof HeaderComponent>;

const Template: ComponentStory<typeof HeaderComponent> = (args) => (
  <HeaderComponent {...args} />
);

export const Default = Template.bind({});
