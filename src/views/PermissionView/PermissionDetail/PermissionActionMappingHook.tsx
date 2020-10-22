/* begin general import */
import React from "react";
import nameof from "ts-nameof.macro";
import { useTranslation } from "react-i18next";
import detailService from "services/pages/detail-service";
import {
  CreateColumn,
  CreateTableAction,
  CreateTableColumns,
} from "core/models/TableColumn";
import { masterTableIndex } from "helpers/table";
import tableService, {
  mappingToMapper,
  getAntOrderType,
} from "services/table-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import { useContentTable } from "components/Utility/ContentTable/ContentTableHook";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import { IdFilter, StringFilter, NumberFilter, DateFilter } from "@react3l/advanced-filters";
/* end general import */

/* begin individual import */
import { Permission } from 'models/Permission';
import { PermissionActionMapping, PermissionActionMappingFilter } from 'models/PermissionActionMapping'
import { permissionRepository } from "repositories/permission-repository";
import { Action, ActionFilter } from 'models/Action';
/* end individual import */

export function usePermissionActionMappingTable (
    model: Permission,
    setModel: (data: Permission) => void,
) {
    const [translate] = useTranslation();
    const {
        content: permissionActionMappingContents,
        setContent: setPermissionActionMappingContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.permissionActionMappings),
    );
    const {
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        permissionActionMappingFilter,
        dispatchPermissionActionMappingFilter,
    ] = React.useReducer<React.Reducer<PermissionActionMappingFilter,AdvanceFilterAction<PermissionActionMappingFilter>>>(advanceFilterReducer, new PermissionActionMappingFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<PermissionActionMappingFilter>
        (
            permissionActionMappingFilter,
            dispatchPermissionActionMappingFilter,
            PermissionActionMappingFilter,
        );

    const {
            list,
            loadingList,
            total,
            handleAddContent,
            handleTableChange,
            handlePagination,
            rowSelection,
            canBulkDelete,
            handleLocalBulkDelete,
            ref,
            handleClick,
            handleImportContentList,
            handleContentExport,
            handleContentExportTemplate,
        } = useContentTable<
        PermissionActionMapping,
        Action
,
        PermissionActionMappingFilter
        >(
            permissionActionMappingContents,
            setPermissionActionMappingContents,
            permissionActionMappingContentMapper,
            PermissionActionMapping,
            permissionActionMappingFilter,
            handleUpdateNewFilter,
            handleSearch,
            loadList,
            setLoadList,
        );

    const permissionActionMappingContentColumns = React.useMemo(() => {
        return CreateTableColumns(
                CreateColumn()
                .Title(() => <>{translate("general.columns.index")}</>)
                .AddChild(
                    CreateColumn()
                    .Key("index")
                    .Width(120)
                    .Render(masterTableIndex<PermissionActionMapping,PermissionActionMappingFilter>
                        (permissionActionMappingFilter),
                    ),
                ),
                
                
                
                CreateColumn()
                    .Title(() => <>{translate("permission.permissionActionMapping.action")}</>)
                    .Key(nameof(permissionActionMappingContents[0].action))
                    .DataIndex(nameof(permissionActionMappingContents[0].action))
                    .Sorter(true)
                    .SortOrder(getAntOrderType<PermissionActionMapping, PermissionActionMappingFilter>
                    (
                        permissionActionMappingFilter,
                        nameof(permissionActionMappingContents[0].action),),
                    )
                    .AddChild(
                        CreateColumn()
                        .Title(
                            RenderIdFilter(
                                permissionActionMappingFilter["actionId"]["equal"],
                                handleChangeFilter("actionId", "equal" as any, IdFilter),
                                ActionFilter,
                                permissionRepository.singleListAction,
                            ),
                        )
                        .Key(nameof(permissionActionMappingContents[0].action))
                        .DataIndex(nameof(permissionActionMappingContents[0].action)),
                    ),
                
                CreateColumn()
                    .Title(() => <>{translate("general.actions.index")}</>)
                    .AddChild(
                    CreateColumn()
                      .Key("actions") // key
                      .Width(120)
                      .DataIndex(nameof(permissionActionMappingContents[0].key))
                      .Render(
                        RenderActionColumn(
                          CreateTableAction()
                            .Title(translate("general.delete.content"))
                            .Icon("tio-delete_outlined text-danger")
                            .HasConfirm(true),
                        ),
                       ),
                    )
                );
            },
                [
                    permissionActionMappingFilter,
                    permissionActionMappingContents,
                    RenderIdFilter,
                    handleChangeFilter,
                    translate,
                    RenderActionColumn,
                ]);

    return {
        permissionActionMappingFilter,
        permissionActionMappingList: list,
        loadPermissionActionMappingList: loadingList,
        permissionActionMappingTotal: total,
        handleAddPermissionActionMapping: handleAddContent,
        handlePermissionActionMappingTableChange: handleTableChange,
        handlePermissionActionMappingPagination: handlePagination,
        permissionActionMappingRowSelection: rowSelection,
        canBulkDeletePermissionActionMapping: canBulkDelete,
        handleResetPermissionActionMappingFilter: handleResetFilter,
        handleLocalBulkDeletePermissionActionMapping: handleLocalBulkDelete,
        permissionActionMappingRef: ref,
        handleClickPermissionActionMapping: handleClick,
        handleImportPermissionActionMapping: handleImportContentList,
        handleExportPermissionActionMapping: handleContentExport,
        handleExportTemplatePermissionActionMapping: handleContentExportTemplate,
        permissionActionMappingContents,
        setPermissionActionMappingContents,
        permissionActionMappingContentColumns,
        handleSearchPermissionActionMapping: handleSearch
    }
};

export function usePermissionActionMappingModal(source: PermissionActionMapping, handleSource?: () => void) {

    const [translate] = useTranslation();
    const [actionFilter, dispatchActionFilter] = React.useReducer<
    React.Reducer<ActionFilter, AdvanceFilterAction<ActionFilter>>>(advanceFilterReducer, new ActionFilter());

    const {
        RenderStringFilter,
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleUpdateNewFilter,
        handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<ActionFilter>(
        actionFilter,
        dispatchActionFilter,
        ActionFilter,
        false,
    );

    const selectedActionList = React.useMemo(
        () => (source.length > 0 ? source.map(mappingToMapper("action")) : []),
        [source],
    );

    const actionModalFilters = React.useMemo(
        () => [
            
            
            RenderStringFilter(
                actionFilter["name"]["contain"],
                handleChangeFilter("name", "contain" as any, StringFilter),
                translate("action.filter.name"),
            ),
            
            
            
            
            
            
            
        ],
    [handleChangeFilter, RenderStringFilter, actionFilter, translate]);

    const actionColumns = React.useMemo(
    () =>
      CreateTableColumns(
        CreateColumn()
          .Title(translate("general.columns.index"))
          .Key("index")
          .Render(masterTableIndex<Action, ActionFilter>(actionFilter)),
        
        
        CreateColumn()
          .Title(translate("permission.action.name"))
          .Key("name")
          .DataIndex("name"),
        
        
        
        CreateColumn()
          .Title(translate("permission.action.isDeleted"))
          .Key("isDeleted")
          .DataIndex("isDeleted"),
        
        
        
        
      ),
    [actionFilter, translate],
  );

    const {
        visible,
        loadControl,
        handleEndControl,
        handleOpenModal,
        handleCloseModal,
        handleSaveModal,
    } = tableService.useContenModal(handleSource);

    React.useEffect(() => {
        if (loadControl) {
          handleSearch();
          handleEndControl();
        }
    }, [handleSearch, loadControl, handleEndControl]);

  return {
    actionModalFilters,
    visibleAction: visible,
    handleOpenActionModal: handleOpenModal,
    handleCloseActionModal: handleCloseModal,
    handleSaveActionModal: handleSaveModal,
    selectedActionList,
    actionFilter,
    dispatchActionFilter,
    actionColumns,
    loadActionList: loadList,
    setLoadActionList: setLoadList,
    handleSearchAction: handleSearch,
    handleUpdateNewActionFilter: handleUpdateNewFilter,
    handleResetActionFilter: handleResetFilter,
  };

};

export const permissionActionMappingContentMapper = (model: PermissionActionMapping | Action): PermissionActionMapping => {
    if (model.hasOwnProperty("action")) {
        const { action } = model;
        return {
          ...model,
        actionId: action?.id,
        actionName: action?.name,
        actionMenuId: action?.menuId,
        actionIsDeleted: action?.isDeleted,
        actionMenu: action?.menu,
        actionActionPageMappings: action?.actionPageMappings,
        actionPermissionActionMappings: action?.permissionActionMappings,
        };
    }

    return permissionActionMappingContentMapper({
        ...new PermissionActionMapping(),
        action: model,
    });
}

