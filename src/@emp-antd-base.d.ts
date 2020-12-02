declare module '@emp-antd/base/App' {
  /// <reference types="react" />
  import '@emp-antd/base/index.scss';
  import '@emp-antd/base/App.scss';
  import { RouterCompType } from '@emp-antd/base/types';
  const App: (prop: RouterCompType) => JSX.Element;
  export default App;

}
declare module '@emp-antd/base/bootstrap' {
  export {};

}
declare module '@emp-antd/base/components/common/BreadcrumbComp' {
  /// <reference types="react" />
  import { RoutesType } from '@emp-antd/base/types';
  const BreadcrumbComp: ({ routes, forceShow, rootname }: {
      routes?: RoutesType[] | undefined;
      forceShow?: boolean | undefined;
      rootname?: string | undefined;
  }) => JSX.Element;
  export default BreadcrumbComp;

}
declare module '@emp-antd/base/components/common/HeaderUserProfile' {
  import React from 'react';
  import './HeaderUserProfile.less';
  export const HeaderUserProfile: React.FunctionComponent<object>;

}
declare module '@emp-antd/base/components/common/LoadingComp' {
  /// <reference types="react" />
  import './LoadingCompStyle.less';
  type TLoadingComp = {
      fullScreen?: boolean;
  };
  const LoadingComp: (props: TLoadingComp) => JSX.Element;
  export default LoadingComp;

}
declare module '@emp-antd/base/components/common/P403Comp' {
  /// <reference types="react" />
  const P403Comp: () => JSX.Element;
  export default P403Comp;

}
declare module '@emp-antd/base/components/common/P404Comp' {
  /// <reference types="react" />
  const P404Comp: () => JSX.Element;
  export default P404Comp;

}
declare module '@emp-antd/base/components/common/RouteMenu' {
  /// <reference types="react" />
  import { MenuProps } from "antd/lib/menu";
  import { SubMenuProps } from "antd/lib/menu/SubMenu";
  import { RoutesType } from "@emp-antd/base/types";
  export type TRouteMenu = {
      options: MenuProps;
      routes?: RoutesType[];
      topMenuOptions?: SubMenuProps;
  };
  export const IconName: ({ route }: {
      route: RoutesType;
  }) => JSX.Element;
  const RouteMenu: (props: TRouteMenu) => JSX.Element;
  export default RouteMenu;

}
declare module '@emp-antd/base/components/common/RouterComp' {
  /// <reference types="react" />
  import { RoutesType, RouterCompType } from '@emp-antd/base/types';
  export default function RouterComp(props: RouterCompType): JSX.Element;
  export const SwitchRouter: ({ routes }: {
      routes?: RoutesType[] | undefined;
  }) => JSX.Element;

}
declare module '@emp-antd/base/components/common/crud/CrudComponent' {
  import React from 'react';
  import { PageListProps, RecordType } from '@emp-antd/base/components/common/crud/PageList';
  import { SearchFormProps } from '@emp-antd/base/components/common/crud/SForm/inter';
  import { FormItemProps } from '@emp-antd/base/components/common/crud/SForm/inter';
  import { ModalFormProps } from '@emp-antd/base/components/common/crud/ModalForm';
  import { ButtonProps } from 'antd/lib/button';
  export interface DataModalProps {
      add?: ActionProps;
      remove?: ActionProps;
      edit?: ActionProps;
      search?: SearchActionProps;
      actions?: MoreActionProps[];
  }
  export interface MoreActionProps extends Partial<ButtonProps> {
      name: string;
      action?: (record?: RecordType, index?: number) => any;
      isShowAct?: (record?: RecordType, index?: number) => any;
  }
  export interface SearchActionProps extends Partial<SearchFormProps> {
      items: FormItemProps[];
      action?: (record?: RecordType, index?: number) => any;
      beforeClear?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }
  export interface ActionProps extends Partial<ModalFormProps & ButtonProps> {
      title?: string;
      name?: string;
      items: FormItemProps[];
      action?: (record?: RecordType, index?: number) => any;
      clickAction?: (record?: RecordType, index?: number) => any;
      setBtnOptions?: (record?: RecordType, index?: number) => object;
  }
  export interface ConfigProps {
      langs?: {
          addText?: string;
          editText?: string;
          removeText?: string;
          searchText?: string;
          clearText?: string;
          totalText?: string;
          actionTitle?: string;
      };
  }
  const CrudComponent: (opt: PageListProps & DataModalProps & ConfigProps) => JSX.Element;
  export default CrudComponent;

}
declare module '@emp-antd/base/components/common/crud/ModalForm' {
  import React from 'react';
  import { ModalProps } from 'antd/lib/modal/Modal';
  import { FormProps, FormInstance } from 'antd/lib/form';
  import { FormItemProps } from '@emp-antd/base/components/common/crud/SForm/inter';
  export interface ModalFormProps extends ModalProps {
      visible?: boolean;
      title?: string;
      name: string;
      formOptions?: FormProps;
      initialValues?: object;
      fromItems: FormItemProps[];
      options?: ModalProps;
      okText?: string;
      cancelText?: string;
      onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
      onSubmit?: (success: boolean, e: any) => void;
      headerRender?: JSX.Element;
      footerRender?: JSX.Element;
      forceRender?: boolean;
      form?: FormInstance;
      dataRef?: React.RefObject<FormInstance>;
  }
  const ModalForm: ({ options, initialValues, visible, title, onCancel, onSubmit, headerRender, footerRender, formOptions, name, fromItems, forceRender, destroyOnClose, okText, cancelText, dataRef, form, }: ModalFormProps) => JSX.Element;
  export default ModalForm;

}
declare module '@emp-antd/base/components/common/crud/PageList' {
  import React from 'react';
  import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
  import { TableRowSelection } from 'antd/lib/table/interface';
  import { ConfigProps } from '@emp-antd/base/components/common/crud/CrudComponent';
  import './PageList.scss';
  export type RecordType = {
      title: string;
      dataIndex: string;
      key: string;
      render: (t: string | number | undefined, d: any) => void;
      onCell: (record: any, rowIndex: any) => any;
      sorter: any;
      align: 'center';
  };
  export interface PageListProps {
      list: any;
      loading?: boolean;
      page: number | string;
      pageSize: number | string;
      count: number;
      columnsKey: string;
      columns: ColumnsType<RecordType>;
      nextPage: (d: JSONObject) => void;
      selectRow?: React.ReactText[];
      pagination?: TablePaginationConfig;
      onSelectChange?: ((selectedRowKeys: React.ReactText[], selectedRows?: RecordType[]) => void) | undefined;
      expandable?: object;
      bordered?: boolean;
      tableTitle?: string;
      tableTopOption?: any;
      onRow?: (record: any, index: any) => any;
      isMultipleChecked?: boolean;
      rowSelectionOpt?: TableRowSelection<RecordType>;
      getCheckboxProps?: (record: any) => any;
  }
  const PageList: ({ tableTopOption, tableTitle, columns, list, loading, page, pageSize, count, nextPage, columnsKey, selectRow, onSelectChange, expandable, bordered, onRow, pagination, isMultipleChecked, getCheckboxProps, rowSelectionOpt, langs, }: PageListProps & ConfigProps) => JSX.Element;
  export default PageList;

}
declare module '@emp-antd/base/components/common/crud/SForm' {
  /// <reference types="react" />
  import { SFormProps } from '@emp-antd/base/components/common/crud/SForm/inter';
  export const FromItem: ({ item }: {
      item: any;
  }) => any;
  const SForm: (props: SFormProps) => JSX.Element;
  export default SForm;

}
declare module '@emp-antd/base/components/common/crud/SForm/inter' {
  /// <reference types="react" />
  import { ButtonProps, ButtonShape, ButtonType } from 'antd/lib/button';
  import { InputProps, GroupProps, SearchProps, TextAreaProps, PasswordProps } from 'antd/lib/input';
  import { RadioGroupProps, RadioChangeEvent } from 'antd/lib/radio/interface';
  import { UploadProps } from 'antd/lib/upload';
  import { FormProps, Rule, FormItemProps as FormItemProp } from 'antd/lib/form';
  import { FormInstance } from 'antd/lib/form/util';
  import { DatePickerProps } from 'antd/lib/date-picker';
  import { TimePickerProps } from 'antd/lib/time-picker';
  import { AutoCompleteProps } from 'antd/lib/auto-complete';
  import { SliderProps } from 'antd/lib/slider';
  import { InputNumberProps } from 'antd/lib/input-number';
  import { SelectProps } from 'rc-select/lib/';
  import { ConfigProps } from '@emp-antd/base/components/common/crud/CrudComponent';
  const ButtonHTMLTypes: ['submit', 'button', 'reset'];
  export type ButtonHTMLType = typeof ButtonHTMLTypes[number];
  export type SelectFormData = {
      value: React.ReactText;
      label: React.ReactNode;
      disabled?: boolean;
  };
  export type RadioFormData = {
      value: React.ReactText;
      label: React.ReactNode;
      disabled?: boolean;
  };
  export type renderForm = {
      disFormItem: boolean;
  };
  export type textForm = {
      style?: any;
      className: string;
  };
  export type selectMultipleProps = {
      mode?: string;
      defaultValue?: any;
      value?: any;
  };
  export interface ButtonGroupData {
      value: React.ReactText;
      label: string;
      options?: ButtonProps | ButtonShape | ButtonType;
      onClick?: ((e: React.MouseEvent) => void) | undefined;
      htmlType?: ButtonHTMLType;
  }
  export type FormItemOptionsType = RadioGroupProps | RadioGroupProps | InputProps | GroupProps | SearchProps | TextAreaProps | PasswordProps | renderForm | textForm | selectMultipleProps | DatePickerProps | TimePickerProps | UploadProps | SliderProps | InputNumberProps | SelectProps | undefined | AutoCompleteProps;
  export interface FormItemProps {
      type: string;
      label: string;
      name?: string;
      rules?: Rule[];
      render?: JSX.Element | any;
      children?: JSX.Element | React.ReactNode | any;
      placeholder?: string;
      col?: number;
      options?: FormItemOptionsType;
      formItemOptions?: FormItemProp;
      data?: SelectFormData[] | RadioFormData[] | ButtonGroupData[] | string | number | undefined;
      onChange?: ((e: RadioChangeEvent | React.MouseEvent) => void) | undefined;
      onSelect?: ((e: RadioChangeEvent | React.MouseEvent) => void) | undefined;
      onClick?: ((e: React.MouseEvent) => void) | undefined;
  }
  export interface SFormProps extends Partial<FormProps> {
      dataRef?: React.RefObject<FormInstance>;
      options?: FormProps;
      onFinish?: ((values: any) => void) | undefined;
      onFinishFailed?: ((values: any) => void) | undefined;
      items: FormItemProps[];
  }
  type TSearchForm = Omit<SFormProps, 'action'>;
  export interface SearchFormProps extends Partial<TSearchForm & ConfigProps> {
      formItems: FormItemProps[];
      beforeClear?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }
  export {};

}
declare module '@emp-antd/base/components/common/crud/SearchForm' {
  /// <reference types="react" />
  import { SearchFormProps } from '@emp-antd/base/components/common/crud/SForm/inter';
  import './SearchForm.scss';
  const SearchForm: ({ options, form, formItems, name, onFinish, onFinishFailed, initialValues, dataRef, beforeClear, langs, }: SearchFormProps) => JSX.Element;
  export default SearchForm;

}
declare module '@emp-antd/base/components/common/crud' {
  import ModalForm from '@emp-antd/base/components/common/crud/ModalForm';
  import PageList from '@emp-antd/base/components/common/crud/PageList';
  import SearchForm from '@emp-antd/base/components/common/crud/SearchForm';
  import SForm from '@emp-antd/base/components/common/crud/SForm';
  import CrudComponent from '@emp-antd/base/components/common/crud/CrudComponent';
  import './index.scss';
  export { ModalForm, PageList, SearchForm, SForm, CrudComponent };

}
declare module '@emp-antd/base/components/common/socketConnectMask' {
  import React from 'react';
  import './index.less';
  export interface SocketConnectMaskProps {
      channel: string;
      roomId: string;
      joinRoomCallback?: () => void;
  }
  export interface SokectData {
      code: number;
      event: string;
      msg: string;
      user: UserInfo;
      onlineUsers?: UserInfo[];
      roomMessageRecord?: RoomMessageRecordItem[];
      penetrateMsg?: any;
  }
  export interface UserInfo {
      avatar?: string;
      channel?: string;
      id?: string;
      nickname?: string;
      passport?: string;
      roomId?: string;
      sex?: string;
      socketID?: string;
      yyno?: string;
  }
  export interface RoomMessageRecordItem {
      user: UserInfo;
      d: any;
  }
  const SocketConnectMask: React.FC<SocketConnectMaskProps>;
  export default SocketConnectMask;

}
declare module '@emp-antd/base/components/layout/FixSlideHeader' {
  /// <reference types="react" />
  import { TLayoutProps, TmenuItem, Theme } from "@emp-antd/base/types";
  import './FixSlideHeader.less';
  const HeaderCom: ({ collapsed, setCollapsed, headerChildren, headerMenu, theme }: {
      collapsed?: boolean | undefined;
      setCollapsed?: (() => any) | undefined;
      headerChildren?: TLayoutProps['headerChildren'];
      headerMenu?: TmenuItem[] | undefined;
      theme?: "light" | "dark" | undefined;
  }) => JSX.Element;
  export default HeaderCom;

}
declare module '@emp-antd/base/components/layout/FixSlideLayout' {
  import React from "react";
  import "./FixSlideLayout.less";
  import { TLayoutProps } from "@emp-antd/base/types";
  const _default: React.FunctionComponent<TLayoutProps>;
  export default _default;

}
declare module '@emp-antd/base/components/layout/LayoutFooter' {
  import React from "react";
  import { Theme } from "@emp-antd/base/types";
  const LayoutFooter: ({ text, theme }: {
      text?: string | number | undefined;
      theme?: "light" | "dark" | undefined;
  }) => JSX.Element;
  export default LayoutFooter;

}
declare module '@emp-antd/base/components/layout/LogoBox' {
  /// <reference types="react" />
  import { TitleInfo, Theme } from '@emp-antd/base/types';
  import './LogoBox.less';
  const LogoBox: ({ titleInfo, theme }: {
      titleInfo?: TitleInfo | undefined;
      theme?: "light" | "dark" | undefined;
  }) => JSX.Element;
  export default LogoBox;

}
declare module '@emp-antd/base/components/layout/MarginHeader' {
  import React from "react";
  import { TitleInfo, TmenuItem } from "@emp-antd/base/types";
  import './MarginHeader.less';
  type THeaderComp = {
      theme?: "light" | "dark" | undefined;
      titleInfo?: TitleInfo;
      headerMenu?: TmenuItem[];
      headerChildren?: React.ReactNode;
      titleBox?: React.ReactNode;
  };
  export const HeaderComp: ({ theme, titleInfo, headerMenu, headerChildren, titleBox }: THeaderComp) => JSX.Element;
  export default HeaderComp;

}
declare module '@emp-antd/base/components/layout/MarginLayout' {
  import React from "react";
  import { TLayoutProps } from "@emp-antd/base/types";
  import "./MarginLayout.less";
  const _default: React.FunctionComponent<TLayoutProps>;
  export default _default;

}
declare module '@emp-antd/base/helpers/adaptDevice' {
  export type Task = {
      vals?: number | number[];
      min?: number;
      max?: number;
      cb: Function;
  };
  export type TAdaption = {
      target?: string | Element;
      attribute: string;
      tasks: Task[];
      interval?: number;
  };
  export const getElement: (selector: string | Element) => Element;
  export const deviceRange: {
      mobile: number;
      pad: number;
  };
  /**
   * observe 监听元素大小变动
   * @param target 监听对象
   * @param attribute 监听属性
   * @param tasks 任务数组
   * @param interval 监听时间间隔
   */
  export const observe: (options: TAdaption) => Function;
  export default function adaptDevice(updateMode: Function): Function;

}
declare module '@emp-antd/base/helpers/dataMender' {
  /***
   * evil 使用js执行字符串形式的语句
   * @param fn 字符串形式的语句
   * @return  执行后的结果
   */
  export const evil: (fn: string, ...params: any[]) => any;
  /***
   * converter 使用js执行字符串形式的语句
   * @param path 字符串形式的对象参数路径
   * @param val 参数的值
   * @return  对象
   */
  export const converter: (path: string, val: any) => Record<string, any>;
  /***
   * resolver 将字符串格式的对象路径解析为对象中的某个值
   * @param path 字符串形式的对象参数路径
   * @param obj 对象数据
   * @return  该参数在对象中的值
   */
  export const resolver: (path: string, obj: Record<string, any>) => Record<string, any>;
  /***
   * executor 根据匹配规则处理对象的执行器
   * @param targets 处理的对象列表
   * @param rules 处理规则列表
   * @return  规范化的对象列表
   */
  export const executor: (targets: Partial<object>[], rules: Record<string, Record<string, any>>) => any[];

}
declare module '@emp-antd/base/helpers/envStorage' {
  const _default: {
      get(name: string): any;
      set(name: string, value: any): void;
      getJSON(name: string): any;
      setJSON(name: string, value: any): void;
      remove(name: string): void;
  };
  export default _default;

}
declare module '@emp-antd/base/helpers/http' {
  const http: import("axios").AxiosInstance;
  export default http;

}
declare module '@emp-antd/base/helpers/loadScript' {
  const loadScript: (url: string | string[]) => Promise<unknown>;
  export default loadScript;

}
declare module '@emp-antd/base/helpers/udb' {
  export function yyLogin(url?: string): Promise<void>;

}
declare module '@emp-antd/base/helpers/useQuery' {
  /**
   * 使用方法
   * const query = useQuery()
   * query.get('lang')
   */
  export function useQuery(): URLSearchParams;

}
declare module '@emp-antd/base' {
  import 'react-app-polyfill/ie9';
  import 'react-app-polyfill/stable';

}
declare module '@emp-antd/base/stores/common/crud' {
  /// <reference types="react" />
  interface CrudAction {
      create?: any;
      update?: any;
      del?: any;
      request?: any;
      extend?: any;
      successCode?: React.ReactText;
  }
  export const crudStore: (crud: CrudAction) => () => any;
  export const useCrudStore: (action: CrudAction) => any;
  export {};

}
declare module '@emp-antd/base/stores/config' {
  import { TuserStore } from '@emp-antd/base/stores/user/userStore';
  import { TconfigProviderStore } from '@emp-antd/base/stores/configProvider/configProviderStore';
  import { StoresType } from '@emp-antd/base/types';
  import { TlayoutStore } from '@emp-antd/base/stores/layout/layoutStore';
  export interface EmpStoreType {
      configProviderStore: TconfigProviderStore;
      userStore: TuserStore;
      layoutStore: TlayoutStore;
  }
  const stores: StoresType;
  export default stores;

}
declare module '@emp-antd/base/stores/configProvider/configProviderStore' {
  import { ConfigProviderProps } from 'antd/lib/config-provider';
  export const configProviderStore: () => {
      configProvider: ConfigProviderProps;
      setConfigProvider(val: ConfigProviderProps): void;
  };
  export type TconfigProviderStore = ReturnType<typeof configProviderStore>;

}
declare module '@emp-antd/base/stores' {
  import React from 'react';
  import { StoresType } from '@emp-antd/base/types';
  type TstoreProviderProps = {
      children: React.ReactNode;
      stores?: StoresType;
  };
  export const StoreProvider: ({ children, stores }: TstoreProviderProps) => JSX.Element;
  export const useStores: () => any;
  export {};

}
declare module '@emp-antd/base/stores/lang/langStore' {
  export interface LangApi {
      Req: {
          project: string;
          mod: string;
          lang: string;
      };
      Res: JSONObject;
  }
  export const langStore: () => {
      $l: JSONObject;
      $menu: JSONObject;
      country: string;
      getLang({ project, mod, lang }: LangApi['Req']): Promise<void>;
      setMenu({ project, mod, lang }: LangApi['Req']): Promise<void>;
  };
  export type TlangStore = ReturnType<typeof langStore>;

}
declare module '@emp-antd/base/stores/layout/layoutStore' {
  export const MODE: Record<number, string>;
  export const layoutStore: () => {
      mode: string;
      updateMode(type: number): void;
  };
  export type TlayoutStore = ReturnType<typeof layoutStore>;

}
declare module '@emp-antd/base/stores/user/userStore' {
  export const userStore: () => {
      user: TgetUserInfo;
      permission: string[];
      permissionIsLoad: boolean;
      getUserInfo(yyuid: string | number): Promise<void>;
      logout(): void;
  };
  export type TuserStore = ReturnType<typeof userStore>;
  export type TgetUserInfo = {
      id?: string;
      permission: [];
      yyuid: string;
      yyno?: string;
      nick?: string;
      sex?: string;
      birthday?: string;
      province?: string;
      sign?: string;
      intro?: string;
      jifen?: string;
      register_time?: string;
      passport?: string;
      account?: string;
      hdlogo?: string;
      session_card?: string;
      custom_logo?: string;
  };

}
declare module '@emp-antd/base/types' {
  /// <reference types="react" />
  import { ClickParam, MenuProps } from "antd/lib/menu";
  export type TmenuItem = {
      path: string;
      name: string;
      langKey?: string;
  };
  export type RoutesType = {
      path?: string;
      component?: any;
      name?: string;
      url?: string;
      icon?: any;
      routes?: RoutesType[];
      langKey?: string;
      hide?: boolean;
      role?: string;
      group?: RoutesType[];
      withoutLayout?: boolean;
  };
  export interface TLayoutProps {
      children?: React.ReactNode;
      routes?: RoutesType[];
      headerMenu?: TmenuItem[];
      headerChildren?: React.ReactNode;
      layoutOptions?: TLayoutOptions;
      footerText?: React.ReactText;
      titleInfo?: TitleInfo;
      aside?: React.ReactNode;
      menuOptions?: MenuProps;
      header?: React.ReactNode;
      footer?: React.ReactNode;
      titleBox?: React.ReactNode;
      menuClick?: (e: ClickParam, history: any) => any;
  }
  export interface RouterCompType extends TLayoutProps {
      layout?: 'FixSlideLayout' | 'MarginLayout' | React.ReactNode;
      stores?: StoresType;
      pageview?: <T>(d: T, s: T) => any;
  }
  export type TCrumb = {
      rootname?: string;
      forceShow?: boolean;
  };
  export type TitleInfo = {
      logo?: string;
      link?: (() => void) | string;
      text?: React.ReactNode;
  };
  export type Theme = 'light' | 'dark';
  export type TLayoutOptions = {
      crumb?: TCrumb;
      theme?: Theme;
  };
  export interface StoresType {
      [key: string]: (...args: any) => any;
  }

}
declare module '@emp-antd/base/types/resizeObserver' {
  class ResizeObserver {
      constructor(callback: ResizeObserverCallback);
  }
  interface ResizeObserverObserveOptions {
      box?: "content-box" | "border-box";
  }
  interface ResizeObserverEntry {
      readonly borderBoxSize: ResizeObserverEntryBoxSize;
      readonly contentBoxSize: ResizeObserverEntryBoxSize;
      readonly contentRect: DOMRectReadOnly;
      readonly target: Element;
  }
  interface ResizeObserverEntryBoxSize {
      blockSize: number;
      inlineSize: number;
  }
  interface Window {
      ResizeObserver: typeof ResizeObserver;
  }

}
declare module '@emp-antd/base' {
  import main = require('@emp-antd/base');
  export = main;
}