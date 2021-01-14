import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
  FC,
} from 'react';
import ToolPane from '../ToolPane';
import Context from './context';

import './index.less';

interface IRenderToolPane {
  mode: string;
  icon: ReactNode;
  name: string | ReactNode;
  selectIcon?: ReactNode;
  selectName?: string | ReactNode;
  selected: boolean;
}

export interface IToolBar {
  visible: boolean;
  selectedMode?: string;
  values?: any[];
  renderToolBar?: (a: any) => ReactNode;
  renderToolPane?: (options: IRenderToolPane[]) => ReactNode;
  className?: string;
  hasDefaultToolBar?: boolean;
  // onChange: (mode: string) => void;
  onCancel: () => void;
}

const ToolBar: FC<IToolBar> = ({
  visible,
  renderToolBar,
  hasDefaultToolBar,
  // onChange,
  children,
  selectedMode,
  onCancel,
}) => {
  const toolBar = useMemo(() => {
    const findToolPane: React.ReactNode[] = [];
    React.Children.forEach(children, child => {
      // @ts-ignore
      if (child && child?.type === ToolPane) {
        findToolPane.push(child);
      }
    });
    return findToolPane;
  }, [children]);

  return (
    <Context.Provider value={selectedMode}>
      <div
        className="note-tool-wrap"
        onClick={onCancel}
        style={{ display: visible ? 'block' : 'none' }}
      >
        <div className="note-tool">{toolBar}</div>
      </div>
    </Context.Provider>
  );
};

export default ToolBar;
