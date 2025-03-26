import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './styles/demand.modal.css';
import App from './App';

let root: ReactDOM.Root | null = null;

const render = (props: any) => {
  const { container } = props;

  // eslint-disable-next-line import/no-named-as-default-member
  root = ReactDOM.createRoot((container?.querySelector('#root') || document.querySelector('#root')) as HTMLElement);
  root.render(<App />);
};

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export const bootstrap = async () => {
  // ...
};

export const mount = async (props: any) => {
  (window as any).bdhMicroMainEvents = props.bdhMicroMainEvents;
  (window as any).container = props.container
  render(props);
};

export const unmount = async (props: any) => {
  root?.unmount();
};
