import React from "react";
import AppMain from "components/AppMain/AppMain";
import { join } from 'path';
import { RouteConfig } from 'react-router-config';
import { ROOT_ROUTE } from 'config/route-consts';

import { ACTION_ROUTE, ACTION_MASTER_ROUTE, ACTION_DETAIL_ROUTE } from 'config/route-consts';



import { APP_USER_ROUTE, APP_USER_MASTER_ROUTE, APP_USER_DETAIL_ROUTE } from 'config/route-consts';


import { APP_USER_PERMISSION_ROUTE, APP_USER_PERMISSION_MASTER_ROUTE, APP_USER_PERMISSION_DETAIL_ROUTE } from 'config/route-consts';




import { DISTRICT_ROUTE, DISTRICT_MASTER_ROUTE, DISTRICT_DETAIL_ROUTE } from 'config/route-consts';


import { EVENT_MESSAGE_ROUTE, EVENT_MESSAGE_MASTER_ROUTE, EVENT_MESSAGE_DETAIL_ROUTE } from 'config/route-consts';


import { FIELD_ROUTE, FIELD_MASTER_ROUTE, FIELD_DETAIL_ROUTE } from 'config/route-consts';


import { FIELD_TYPE_ROUTE, FIELD_TYPE_MASTER_ROUTE, FIELD_TYPE_DETAIL_ROUTE } from 'config/route-consts';


import { MENU_ROUTE, MENU_MASTER_ROUTE, MENU_DETAIL_ROUTE } from 'config/route-consts';


import { ORGANIZATION_ROUTE, ORGANIZATION_MASTER_ROUTE, ORGANIZATION_DETAIL_ROUTE } from 'config/route-consts';


import { PAGE_ROUTE, PAGE_MASTER_ROUTE, PAGE_DETAIL_ROUTE } from 'config/route-consts';



import { PERMISSION_CONTENT_ROUTE, PERMISSION_CONTENT_MASTER_ROUTE, PERMISSION_CONTENT_DETAIL_ROUTE } from 'config/route-consts';


import { PERMISSION_ROUTE, PERMISSION_MASTER_ROUTE, PERMISSION_DETAIL_ROUTE } from 'config/route-consts';



import { PERMISSION_OPERATOR_ROUTE, PERMISSION_OPERATOR_MASTER_ROUTE, PERMISSION_OPERATOR_DETAIL_ROUTE } from 'config/route-consts';


import { POSITION_ROUTE, POSITION_MASTER_ROUTE, POSITION_DETAIL_ROUTE } from 'config/route-consts';


import { PROVIDER_ROUTE, PROVIDER_MASTER_ROUTE, PROVIDER_DETAIL_ROUTE } from 'config/route-consts';


import { PROVINCE_ROUTE, PROVINCE_MASTER_ROUTE, PROVINCE_DETAIL_ROUTE } from 'config/route-consts';


import { ROLE_ROUTE, ROLE_MASTER_ROUTE, ROLE_DETAIL_ROUTE } from 'config/route-consts';



import { SITE_ROUTE, SITE_MASTER_ROUTE, SITE_DETAIL_ROUTE } from 'config/route-consts';



import { THEME_ROUTE, THEME_MASTER_ROUTE, THEME_DETAIL_ROUTE } from 'config/route-consts';


import { WARD_ROUTE, WARD_MASTER_ROUTE, WARD_DETAIL_ROUTE } from 'config/route-consts';


const ActionView = React.lazy(() =>
  import("views/ActionView/ActionView"),
);
const ActionDetail = React.lazy(() =>
  import("views/ActionView/ActionView").then((module) => ({
    default: module.ActionDetail,
  })),
);
const ActionMaster = React.lazy(() =>
  import("views/ActionView/ActionView").then((module) => ({
    default: module.ActionMaster,
  })),
);



const AppUserView = React.lazy(() =>
  import("views/AppUserView/AppUserView"),
);
const AppUserDetail = React.lazy(() =>
  import("views/AppUserView/AppUserView").then((module) => ({
    default: module.AppUserDetail,
  })),
);
const AppUserMaster = React.lazy(() =>
  import("views/AppUserView/AppUserView").then((module) => ({
    default: module.AppUserMaster,
  })),
);


const AppUserPermissionView = React.lazy(() =>
  import("views/AppUserPermissionView/AppUserPermissionView"),
);
const AppUserPermissionDetail = React.lazy(() =>
  import("views/AppUserPermissionView/AppUserPermissionView").then((module) => ({
    default: module.AppUserPermissionDetail,
  })),
);
const AppUserPermissionMaster = React.lazy(() =>
  import("views/AppUserPermissionView/AppUserPermissionView").then((module) => ({
    default: module.AppUserPermissionMaster,
  })),
);




const DistrictView = React.lazy(() =>
  import("views/DistrictView/DistrictView"),
);
const DistrictDetail = React.lazy(() =>
  import("views/DistrictView/DistrictView").then((module) => ({
    default: module.DistrictDetail,
  })),
);
const DistrictMaster = React.lazy(() =>
  import("views/DistrictView/DistrictView").then((module) => ({
    default: module.DistrictMaster,
  })),
);


const EventMessageView = React.lazy(() =>
  import("views/EventMessageView/EventMessageView"),
);
const EventMessageDetail = React.lazy(() =>
  import("views/EventMessageView/EventMessageView").then((module) => ({
    default: module.EventMessageDetail,
  })),
);
const EventMessageMaster = React.lazy(() =>
  import("views/EventMessageView/EventMessageView").then((module) => ({
    default: module.EventMessageMaster,
  })),
);


const FieldView = React.lazy(() =>
  import("views/FieldView/FieldView"),
);
const FieldDetail = React.lazy(() =>
  import("views/FieldView/FieldView").then((module) => ({
    default: module.FieldDetail,
  })),
);
const FieldMaster = React.lazy(() =>
  import("views/FieldView/FieldView").then((module) => ({
    default: module.FieldMaster,
  })),
);


const FieldTypeView = React.lazy(() =>
  import("views/FieldTypeView/FieldTypeView"),
);
const FieldTypeDetail = React.lazy(() =>
  import("views/FieldTypeView/FieldTypeView").then((module) => ({
    default: module.FieldTypeDetail,
  })),
);
const FieldTypeMaster = React.lazy(() =>
  import("views/FieldTypeView/FieldTypeView").then((module) => ({
    default: module.FieldTypeMaster,
  })),
);


const MenuView = React.lazy(() =>
  import("views/MenuView/MenuView"),
);
const MenuDetail = React.lazy(() =>
  import("views/MenuView/MenuView").then((module) => ({
    default: module.MenuDetail,
  })),
);
const MenuMaster = React.lazy(() =>
  import("views/MenuView/MenuView").then((module) => ({
    default: module.MenuMaster,
  })),
);


const OrganizationTreeView = React.lazy(() =>
  import("views/OrganizationTreeView/OrganizationTreeView"),
);
const OrganizationTreeDetail = React.lazy(() =>
  import("views/OrganizationTreeView/OrganizationTreeView").then((module) => ({
    default: module.OrganizationTreeDetail,
  })),
);
const OrganizationTreeMaster = React.lazy(() =>
  import("views/OrganizationTreeView/OrganizationTreeView").then((module) => ({
    default: module.OrganizationTreeMaster,
  })),
);


const PageView = React.lazy(() =>
  import("views/PageView/PageView"),
);
const PageDetail = React.lazy(() =>
  import("views/PageView/PageView").then((module) => ({
    default: module.PageDetail,
  })),
);
const PageMaster = React.lazy(() =>
  import("views/PageView/PageView").then((module) => ({
    default: module.PageMaster,
  })),
);



const PermissionContentView = React.lazy(() =>
  import("views/PermissionContentView/PermissionContentView"),
);
const PermissionContentDetail = React.lazy(() =>
  import("views/PermissionContentView/PermissionContentView").then((module) => ({
    default: module.PermissionContentDetail,
  })),
);
const PermissionContentMaster = React.lazy(() =>
  import("views/PermissionContentView/PermissionContentView").then((module) => ({
    default: module.PermissionContentMaster,
  })),
);


const PermissionView = React.lazy(() =>
  import("views/PermissionView/PermissionView"),
);
const PermissionDetail = React.lazy(() =>
  import("views/PermissionView/PermissionView").then((module) => ({
    default: module.PermissionDetail,
  })),
);
const PermissionMaster = React.lazy(() =>
  import("views/PermissionView/PermissionView").then((module) => ({
    default: module.PermissionMaster,
  })),
);



const PermissionOperatorView = React.lazy(() =>
  import("views/PermissionOperatorView/PermissionOperatorView"),
);
const PermissionOperatorDetail = React.lazy(() =>
  import("views/PermissionOperatorView/PermissionOperatorView").then((module) => ({
    default: module.PermissionOperatorDetail,
  })),
);
const PermissionOperatorMaster = React.lazy(() =>
  import("views/PermissionOperatorView/PermissionOperatorView").then((module) => ({
    default: module.PermissionOperatorMaster,
  })),
);


const PositionView = React.lazy(() =>
  import("views/PositionView/PositionView"),
);
const PositionDetail = React.lazy(() =>
  import("views/PositionView/PositionView").then((module) => ({
    default: module.PositionDetail,
  })),
);
const PositionMaster = React.lazy(() =>
  import("views/PositionView/PositionView").then((module) => ({
    default: module.PositionMaster,
  })),
);


const ProviderView = React.lazy(() =>
  import("views/ProviderView/ProviderView"),
);
const ProviderDetail = React.lazy(() =>
  import("views/ProviderView/ProviderView").then((module) => ({
    default: module.ProviderDetail,
  })),
);
const ProviderMaster = React.lazy(() =>
  import("views/ProviderView/ProviderView").then((module) => ({
    default: module.ProviderMaster,
  })),
);


const ProvinceView = React.lazy(() =>
  import("views/ProvinceView/ProvinceView"),
);
const ProvinceDetail = React.lazy(() =>
  import("views/ProvinceView/ProvinceView").then((module) => ({
    default: module.ProvinceDetail,
  })),
);
const ProvinceMaster = React.lazy(() =>
  import("views/ProvinceView/ProvinceView").then((module) => ({
    default: module.ProvinceMaster,
  })),
);


const RoleView = React.lazy(() =>
  import("views/RoleView/RoleView"),
);
const RoleDetail = React.lazy(() =>
  import("views/RoleView/RoleView").then((module) => ({
    default: module.RoleDetail,
  })),
);
const RoleMaster = React.lazy(() =>
  import("views/RoleView/RoleView").then((module) => ({
    default: module.RoleMaster,
  })),
);



const SiteView = React.lazy(() =>
  import("views/SiteView/SiteView"),
);
const SiteDetail = React.lazy(() =>
  import("views/SiteView/SiteView").then((module) => ({
    default: module.SiteDetail,
  })),
);
const SiteMaster = React.lazy(() =>
  import("views/SiteView/SiteView").then((module) => ({
    default: module.SiteMaster,
  })),
);



const ThemeView = React.lazy(() =>
  import("views/ThemeView/ThemeView"),
);
const ThemeDetail = React.lazy(() =>
  import("views/ThemeView/ThemeView").then((module) => ({
    default: module.ThemeDetail,
  })),
);
const ThemeMaster = React.lazy(() =>
  import("views/ThemeView/ThemeView").then((module) => ({
    default: module.ThemeMaster,
  })),
);


const WardView = React.lazy(() =>
  import("views/WardView/WardView"),
);
const WardDetail = React.lazy(() =>
  import("views/WardView/WardView").then((module) => ({
    default: module.WardDetail,
  })),
);
const WardMaster = React.lazy(() =>
  import("views/WardView/WardView").then((module) => ({
    default: module.WardMaster,
  })),
);


export const routes: RouteConfig[] =
[
    {
        path: ROOT_ROUTE,
        key: "main",
        component: AppMain,
        routes: [

            {
                path: ACTION_ROUTE,
                component: ActionView,
                children:
                [
                    {
                        path: join(ACTION_DETAIL_ROUTE, ':id'),
                        component: ActionDetail,
                    },
                    {
                        path: ACTION_MASTER_ROUTE,
                        component: ActionMaster,
                    },
                ],
            },



            {
                path: APP_USER_ROUTE,
                component: AppUserView,
                children:
                [
                    {
                        path: join(APP_USER_DETAIL_ROUTE, ':id'),
                        component: AppUserDetail,
                    },
                    {
                        path: APP_USER_MASTER_ROUTE,
                        component: AppUserMaster,
                    },
                ],
            },


            {
                path: APP_USER_PERMISSION_ROUTE,
                component: AppUserPermissionView,
                children:
                [
                    {
                        path: join(APP_USER_PERMISSION_DETAIL_ROUTE, ':id'),
                        component: AppUserPermissionDetail,
                    },
                    {
                        path: APP_USER_PERMISSION_MASTER_ROUTE,
                        component: AppUserPermissionMaster,
                    },
                ],
            },




            {
                path: DISTRICT_ROUTE,
                component: DistrictView,
                children:
                [
                    {
                        path: join(DISTRICT_DETAIL_ROUTE, ':id'),
                        component: DistrictDetail,
                    },
                    {
                        path: DISTRICT_MASTER_ROUTE,
                        component: DistrictMaster,
                    },
                ],
            },


            {
                path: EVENT_MESSAGE_ROUTE,
                component: EventMessageView,
                children:
                [
                    {
                        path: join(EVENT_MESSAGE_DETAIL_ROUTE, ':id'),
                        component: EventMessageDetail,
                    },
                    {
                        path: EVENT_MESSAGE_MASTER_ROUTE,
                        component: EventMessageMaster,
                    },
                ],
            },


            {
                path: FIELD_ROUTE,
                component: FieldView,
                children:
                [
                    {
                        path: join(FIELD_DETAIL_ROUTE, ':id'),
                        component: FieldDetail,
                    },
                    {
                        path: FIELD_MASTER_ROUTE,
                        component: FieldMaster,
                    },
                ],
            },


            {
                path: FIELD_TYPE_ROUTE,
                component: FieldTypeView,
                children:
                [
                    {
                        path: join(FIELD_TYPE_DETAIL_ROUTE, ':id'),
                        component: FieldTypeDetail,
                    },
                    {
                        path: FIELD_TYPE_MASTER_ROUTE,
                        component: FieldTypeMaster,
                    },
                ],
            },


            {
                path: MENU_ROUTE,
                component: MenuView,
                children:
                [
                    {
                        path: join(MENU_DETAIL_ROUTE, ':id'),
                        component: MenuDetail,
                    },
                    {
                        path: MENU_MASTER_ROUTE,
                        component: MenuMaster,
                    },
                ],
            },


            {
                path: ORGANIZATION_ROUTE,
                component: OrganizationTreeView,
                children:
                [
                    {
                        path: join(ORGANIZATION_DETAIL_ROUTE, ':id'),
                        component: OrganizationTreeDetail,
                    },
                    {
                        path: ORGANIZATION_MASTER_ROUTE,
                        component: OrganizationTreeMaster,
                    },
                ],
            },


            {
                path: PAGE_ROUTE,
                component: PageView,
                children:
                [
                    {
                        path: join(PAGE_DETAIL_ROUTE, ':id'),
                        component: PageDetail,
                    },
                    {
                        path: PAGE_MASTER_ROUTE,
                        component: PageMaster,
                    },
                ],
            },



            {
                path: PERMISSION_CONTENT_ROUTE,
                component: PermissionContentView,
                children:
                [
                    {
                        path: join(PERMISSION_CONTENT_DETAIL_ROUTE, ':id'),
                        component: PermissionContentDetail,
                    },
                    {
                        path: PERMISSION_CONTENT_MASTER_ROUTE,
                        component: PermissionContentMaster,
                    },
                ],
            },


            {
                path: PERMISSION_ROUTE,
                component: PermissionView,
                children:
                [
                    {
                        path: join(PERMISSION_DETAIL_ROUTE, ':id'),
                        component: PermissionDetail,
                    },
                    {
                        path: PERMISSION_MASTER_ROUTE,
                        component: PermissionMaster,
                    },
                ],
            },



            {
                path: PERMISSION_OPERATOR_ROUTE,
                component: PermissionOperatorView,
                children:
                [
                    {
                        path: join(PERMISSION_OPERATOR_DETAIL_ROUTE, ':id'),
                        component: PermissionOperatorDetail,
                    },
                    {
                        path: PERMISSION_OPERATOR_MASTER_ROUTE,
                        component: PermissionOperatorMaster,
                    },
                ],
            },


            {
                path: POSITION_ROUTE,
                component: PositionView,
                children:
                [
                    {
                        path: join(POSITION_DETAIL_ROUTE, ':id'),
                        component: PositionDetail,
                    },
                    {
                        path: POSITION_MASTER_ROUTE,
                        component: PositionMaster,
                    },
                ],
            },


            {
                path: PROVIDER_ROUTE,
                component: ProviderView,
                children:
                [
                    {
                        path: join(PROVIDER_DETAIL_ROUTE, ':id'),
                        component: ProviderDetail,
                    },
                    {
                        path: PROVIDER_MASTER_ROUTE,
                        component: ProviderMaster,
                    },
                ],
            },


            {
                path: PROVINCE_ROUTE,
                component: ProvinceView,
                children:
                [
                    {
                        path: join(PROVINCE_DETAIL_ROUTE, ':id'),
                        component: ProvinceDetail,
                    },
                    {
                        path: PROVINCE_MASTER_ROUTE,
                        component: ProvinceMaster,
                    },
                ],
            },


            {
                path: ROLE_ROUTE,
                component: RoleView,
                children:
                [
                    {
                        path: join(ROLE_DETAIL_ROUTE, ':id'),
                        component: RoleDetail,
                    },
                    {
                        path: ROLE_MASTER_ROUTE,
                        component: RoleMaster,
                    },
                ],
            },



            {
                path: SITE_ROUTE,
                component: SiteView,
                children:
                [
                    {
                        path: join(SITE_DETAIL_ROUTE, ':id'),
                        component: SiteDetail,
                    },
                    {
                        path: SITE_MASTER_ROUTE,
                        component: SiteMaster,
                    },
                ],
            },



            {
                path: THEME_ROUTE,
                component: ThemeView,
                children:
                [
                    {
                        path: join(THEME_DETAIL_ROUTE, ':id'),
                        component: ThemeDetail,
                    },
                    {
                        path: THEME_MASTER_ROUTE,
                        component: ThemeMaster,
                    },
                ],
            },


            {
                path: WARD_ROUTE,
                component: WardView,
                children:
                [
                    {
                        path: join(WARD_DETAIL_ROUTE, ':id'),
                        component: WardDetail,
                    },
                    {
                        path: WARD_MASTER_ROUTE,
                        component: WardMaster,
                    },
                ],
            },

        ],
    },
];
