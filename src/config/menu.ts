import {translate} from '@react3l/react3l/helpers';
import {RouteConfig} from 'react-router-config';

import { ACTION_MASTER_ROUTE } from 'config/route-consts';



import { APP_USER_MASTER_ROUTE } from 'config/route-consts';


import { APP_USER_PERMISSION_MASTER_ROUTE } from 'config/route-consts';




import { DISTRICT_MASTER_ROUTE } from 'config/route-consts';


import { EVENT_MESSAGE_MASTER_ROUTE } from 'config/route-consts';


import { FIELD_MASTER_ROUTE } from 'config/route-consts';


import { FIELD_TYPE_MASTER_ROUTE } from 'config/route-consts';


import { MENU_MASTER_ROUTE } from 'config/route-consts';


import { ORGANIZATION_MASTER_ROUTE } from 'config/route-consts';


import { PAGE_MASTER_ROUTE } from 'config/route-consts';



import { PERMISSION_CONTENT_MASTER_ROUTE } from 'config/route-consts';


import { PERMISSION_MASTER_ROUTE } from 'config/route-consts';



import { PERMISSION_OPERATOR_MASTER_ROUTE } from 'config/route-consts';


import { POSITION_MASTER_ROUTE } from 'config/route-consts';


import { PROVIDER_MASTER_ROUTE } from 'config/route-consts';


import { PROVINCE_MASTER_ROUTE } from 'config/route-consts';


import { ROLE_MASTER_ROUTE } from 'config/route-consts';



import { SITE_MASTER_ROUTE } from 'config/route-consts';



import { THEME_MASTER_ROUTE } from 'config/route-consts';


import { WARD_MASTER_ROUTE } from 'config/route-consts';


export const menu: RouteConfig[] =
[

        {
            name: translate('menu.actions'),
            path: ACTION_MASTER_ROUTE,
            key: ACTION_MASTER_ROUTE,
            icon: 'fa fa-building',
        },



        {
            name: translate('menu.appUsers'),
            path: APP_USER_MASTER_ROUTE,
            key: APP_USER_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.appUserPermissions'),
            path: APP_USER_PERMISSION_MASTER_ROUTE,
            key: APP_USER_PERMISSION_MASTER_ROUTE,
            icon: 'fa fa-building',
        },




        {
            name: translate('menu.districts'),
            path: DISTRICT_MASTER_ROUTE,
            key: DISTRICT_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.eventMessages'),
            path: EVENT_MESSAGE_MASTER_ROUTE,
            key: EVENT_MESSAGE_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.fields'),
            path: FIELD_MASTER_ROUTE,
            key: FIELD_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.fieldTypes'),
            path: FIELD_TYPE_MASTER_ROUTE,
            key: FIELD_TYPE_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.menus'),
            path: MENU_MASTER_ROUTE,
            key: MENU_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.organizations'),
            path: ORGANIZATION_MASTER_ROUTE,
            key: ORGANIZATION_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.pages'),
            path: PAGE_MASTER_ROUTE,
            key: PAGE_MASTER_ROUTE,
            icon: 'fa fa-building',
        },



        {
            name: translate('menu.permissionContents'),
            path: PERMISSION_CONTENT_MASTER_ROUTE,
            key: PERMISSION_CONTENT_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.permissions'),
            path: PERMISSION_MASTER_ROUTE,
            key: PERMISSION_MASTER_ROUTE,
            icon: 'fa fa-building',
        },



        {
            name: translate('menu.permissionOperators'),
            path: PERMISSION_OPERATOR_MASTER_ROUTE,
            key: PERMISSION_OPERATOR_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.positions'),
            path: POSITION_MASTER_ROUTE,
            key: POSITION_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.providers'),
            path: PROVIDER_MASTER_ROUTE,
            key: PROVIDER_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.provinces'),
            path: PROVINCE_MASTER_ROUTE,
            key: PROVINCE_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.roles'),
            path: ROLE_MASTER_ROUTE,
            key: ROLE_MASTER_ROUTE,
            icon: 'fa fa-building',
        },



        {
            name: translate('menu.sites'),
            path: SITE_MASTER_ROUTE,
            key: SITE_MASTER_ROUTE,
            icon: 'fa fa-building',
        },



        {
            name: translate('menu.themes'),
            path: THEME_MASTER_ROUTE,
            key: THEME_MASTER_ROUTE,
            icon: 'fa fa-building',
        },


        {
            name: translate('menu.wards'),
            path: WARD_MASTER_ROUTE,
            key: WARD_MASTER_ROUTE,
            icon: 'fa fa-building',
        },

];
