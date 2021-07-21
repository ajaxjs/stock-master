import { NButton, NTooltip } from 'naive-ui';
import { RoleEnum } from '/@/enums/roleEnum';

export interface ActionItem extends NButton.props {
    onClick?: Fn;
    label?: string;
    color?: 'success' | 'error' | 'warning';
    icon?: string;
    popConfirm?: PopConfirm;
    disabled?: boolean;
    divider?: boolean;
    // 权限编码控制是否显示
    auth?: RoleEnum | RoleEnum[] | string | string[];
    // 业务控制是否显示
    ifShow?: boolean | ((action: ActionItem) => boolean);
    tooltip?: string | TooltipProps;
}

export interface PopConfirm {
    title: string;
    okText?: string;
    cancelText?: string;
    confirm: Fn;
    cancel?: Fn;
    icon?: string;
}
