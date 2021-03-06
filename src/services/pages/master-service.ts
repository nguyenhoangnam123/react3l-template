import { Model, ModelFilter } from "@react3l/react3l/core";
import { useCallback, useRef, useState } from "react";
import { Observable } from "rxjs";
import { advanceFilterService } from "services/advance-filter-service";
import { queryStringService } from "services/query-string-service";
import { routerService } from "services/route-service";
import tableService from "services/table-service";
import { importExportDataService } from "services/import-export-data-service";
import { finalize } from "rxjs/operators";
import React from "react";

type KeyType = string | number;

export class MasterService {
  /**
   *
   * retrieve list from server, call api get list, total and supply method for modify list on server
   * @return: { content, setContent }
   *
   * */
  usePreview<T extends Model> (
    modelClass: new () => T,
    getDetail: (id: number) => Observable<T>,
  ) {
    const [isOpenPreview, setIsOpenPreview] = React.useState<boolean>(false);
    const [isLoadingPreview, setIsLoadingPreview] = React.useState<boolean>(false);
    const [previewModel, setPreviewModel] = React.useState<T>(new modelClass());

    const handleOpenPreview = React.useCallback(
      (id: number) => {
        return () => {
          setPreviewModel(new modelClass());
          setIsLoadingPreview(true);
          setIsOpenPreview(true);
          getDetail(id)
            .pipe(
              finalize(() => setIsLoadingPreview(false)),
            )
            .subscribe((tDetail: T) => {
              setPreviewModel(tDetail);
            });
        };
      },
      [getDetail, modelClass],
    );

    const handleClosePreview = React.useCallback(() => {
      setIsOpenPreview(false);
    }, []);

    return {
      isOpenPreview,
      isLoadingPreview,
      previewModel,
      handleOpenPreview,
      handleClosePreview,
    };
  };

  useMaster<T extends Model, TFilter extends ModelFilter>(
    modelFilterClass: new () => TFilter,
    routePrefix: string,
    getList: (filter: TFilter) => Observable<T[]>,
    getTotal: (filter: TFilter) => Observable<number>,
    deleteItem?: (t: T) => Observable<T>,
    bulkDeleteItems?: (t: KeyType[]) => Observable<void>,
    onUpdateListSuccess?: (item?: T) => void,
    onImportSuccess?: (list: T[]) => void,
  ) {
    //   service to navigating create or detail
    const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(
      routePrefix, // should replace to pricelist detail route base on rbac
    );
    // toggle search state
    const [toggle, setToggle] = useState<boolean>(false);

    // toggle search method, expose this
    const handleToggleSearch = useCallback(() => {
      const toggleTmp = !toggle;
      setToggle(toggleTmp);
    }, [toggle, setToggle]);

    const [filter, dispatch] = queryStringService.useQueryString<TFilter>(
      modelFilterClass,
    );

    const {
      loadList,
      setLoadList,
      handleSearch,
      handleChangeFilter,
      handleUpdateNewFilter,
      handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<TFilter>(
      filter,
      dispatch,
      modelFilterClass,
    );

    const {
      list,
      total,
      loadingList,
      pagination, // actually need if we use ant table default pagination
      handleTableChange, // expose table sorter
      handlePagination, // expose table pagination
      handleServerDelete,
      handleServerBulkDelete,
      rowSelection,
      canBulkDelete,
    } = tableService.useTable<T, TFilter>(
      filter,
      handleUpdateNewFilter,
      loadList,
      setLoadList,
      handleSearch,
      getList,
      getTotal,
      deleteItem,
      bulkDeleteItems,
      onUpdateListSuccess,
    );

    const {
      handleImportList,
    } = importExportDataService.useImport(onImportSuccess);
    
    const {
      handleListExport,
      handleExportTemplateList,
    } = importExportDataService.useExport();

    const importButtonRef: React.LegacyRef<HTMLInputElement> = useRef<HTMLInputElement>();

    return {
      list,
      total,
      loadingList,
      filter,
      toggle,
      dispatch,
      handleChangeFilter,
      handleResetFilter,
      handleGoCreate,
      handleGoDetail,
      handleToggleSearch,
      handleTableChange,
      handlePagination,
      handleServerDelete,
      handleServerBulkDelete,
      handleSearch,
      handleImportList,
      handleListExport,
      handleExportTemplateList,
      importButtonRef,
      rowSelection,
      canBulkDelete,
      pagination, // optional using
    };
  }
}
const masterService = new MasterService();
export default masterService;
