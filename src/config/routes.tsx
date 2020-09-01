import { PRICE_LIST_ROUTE_PREFIX } from "config/route-consts";
import path from "path";
import React from "react";
import { RouteConfig } from "react-router-config";
import PriceListMasterView from "views/App/PriceListView/PriceListMasterView/PriceListMasterView";

// const ProvinceView = React.lazy(() =>
//   import("views/App/ProvinceView/ProvinceView"),
// );
const PriceListView = React.lazy(() =>
  import("views/App/PriceListView/PriceListView"),
);

export const routes: RouteConfig[] = [
  {
    path: PRICE_LIST_ROUTE_PREFIX,
    component: PriceListView,
    routes: [
      {
        path: path.join(PRICE_LIST_ROUTE_PREFIX),
        component: PriceListMasterView,
        exact: true,
      },
      // {
      //   path: path.join(PROVINCE_ROUTE_PREFIX, nameof(GeneralActions.create)),
      //   component: ProvinceDetailView,
      // },
      // {
      //   path: path.join(PROVINCE_ROUTE_PREFIX, ":id"),
      //   component: ProvinceDetailView,
      // },
    ],
  },
];
