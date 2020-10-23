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
import tableService, { mappingToMapper } from "services/table-service";
import { getAntOrderType } from "services/table-service";
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
import { Role } from 'models/Role';
import { AppUserRoleMapping, AppUserRoleMappingFilter } from 'models/AppUserRoleMapping';
import { roleRepository } from "repositories/role-repository";
import { AppUser, AppUserFilter } from 'models/AppUser';
/* end individual import */

export function useAppUserRoleMappingTable (
    model: Role,
    setModel: (data: Role) => void,
) {
    const [translate] = useTranslation();
    const {
        content: appUserRoleMappingContents,
        setContent: setAppUserRoleMappingContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.appUserRoleMappings),
    );
    const {
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        appUserRoleMappingFilter,
        dispatchAppUserRoleMappingFilter,
    ] = React.useReducer<React.Reducer<AppUserRoleMappingFilter,AdvanceFilterAction<AppUserRoleMappingFilter>>>(advanceFilterReducer, new AppUserRoleMappingFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<AppUserRoleMappingFilter>
        (
            appUserRoleMappingFilter,
            dispatchAppUserRoleMappingFilter,
            AppUserRoleMappingFilter,
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
        AppUserRoleMapping,
        AppUser
,
        AppUserRoleMappingFilter
        >(
            appUserRoleMappingContents,
            setAppUserRoleMappingContents,
            appUserRoleMappingContentMapper,
            AppUserRoleMapping,
            appUserRoleMappingFilter,
            handleUpdateNewFilter,
            handleSearch,
            loadList,
            setLoadList,
        );

    const appUserRoleMappingContentColumns = React.useMemo(() => {
        return CreateTableColumns(
                CreateColumn()
                .Title(() => <>{translate("general.columns.index")}</>)
                .AddChild(
                    CreateColumn()
                    .Key("index")
                    .Width(120)
                    .Render(masterTableIndex<AppUserRoleMapping,AppUserRoleMappingFilter>
                        (appUserRoleMappingFilter),
                    ),
                ),
                
                
                
                CreateColumn()
                    .Title(() => <>{translate("role.appUserRoleMapping.appUser")}</>)
                    .Key(nameof(appUserRoleMappingContents[0].appUser))
                    .DataIndex(nameof(appUserRoleMappingContents[0].appUser))
                    .Sorter(true)
                    .SortOrder(getAntOrderType<AppUserRoleMapping, AppUserRoleMappingFilter>
                        (
                            appUserRoleMappingFilter,
                            nameof(appUserRoleMappingContents[0].appUser),
                        ),
                    )
                    .AddChild(
                        CreateColumn()
                        .Title(
                            RenderIdFilter(
                                appUserRoleMappingFilter["appUserId"]["equal"],
                                handleChangeFilter("appUserId", "equal" as any, IdFilter),
                                AppUserFilter,
                                roleRepository.singleListAppUser,
                            ),
                        )
                        .Key(nameof(appUserRoleMappingContents[0].appUser))
                        .DataIndex(nameof(appUserRoleMappingContents[0].appUser)),
                    ),
                
                CreateColumn()
                    .Title(() => <>{translate("general.actions.index")}</>)
                    .AddChild(
                    CreateColumn()
                      .Key("actions") // key
                      .Width(120)
                      .DataIndex(nameof(appUserRoleMappingContents[0].key))
                      .Render(
                        RenderActionColumn(
                          CreateTableAction()
                            .Title(translate("general.delete.content"))
                            .Icon("tio-delete_outlined text-danger")
                            .HasConfirm(true),
                        ),
                       ),
                    ),
                );
            },
                [
                    appUserRoleMappingFilter,
                    appUserRoleMappingContents,
                    RenderIdFilter,
                    handleChangeFilter,
                    translate,
                    RenderActionColumn,
                ]);

    return {
        appUserRoleMappingFilter,
        appUserRoleMappingList: list,
        loadAppUserRoleMappingList: loadingList,
        appUserRoleMappingTotal: total,
        handleAddAppUserRoleMapping: handleAddContent,
        handleAppUserRoleMappingTableChange: handleTableChange,
        handleAppUserRoleMappingPagination: handlePagination,
        appUserRoleMappingRowSelection: rowSelection,
        canBulkDeleteAppUserRoleMapping: canBulkDelete,
        handleResetAppUserRoleMappingFilter: handleResetFilter,
        handleLocalBulkDeleteAppUserRoleMapping: handleLocalBulkDelete,
        appUserRoleMappingRef: ref,
        handleClickAppUserRoleMapping: handleClick,
        handleImportAppUserRoleMapping: handleImportContentList,
        handleExportAppUserRoleMapping: handleContentExport,
        handleExportTemplateAppUserRoleMapping: handleContentExportTemplate,
        appUserRoleMappingContents,
        setAppUserRoleMappingContents,
        appUserRoleMappingContentColumns,
        handleSearchAppUserRoleMapping: handleSearch,
    };
};

export function useAppUserRoleMappingModal(source: AppUserRoleMapping, handleSource?: () => void) {

    const [translate] = useTranslation();
    const [appUserFilter, dispatchAppUserFilter] = React.useReducer<
    React.Reducer<AppUserFilter, AdvanceFilterAction<AppUserFilter>>>(advanceFilterReducer, new AppUserFilter());

    const {
        RenderStringFilter,
        RenderIdFilter,
        RenderDateFilter,
        RenderNumberFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleUpdateNewFilter,
        handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<AppUserFilter>(
        appUserFilter,
        dispatchAppUserFilter,
        AppUserFilter,
        false,
    );

    const selectedAppUserList = React.useMemo(
        () => (source.length > 0 ? source.map(mappingToMapper("appUser")) : []),
        [source],
    );

    const appUserModalFilters = React.useMemo(
        () => [
            
            
            RenderStringFilter(
                appUserFilter["username"]["contain"],
                handleChangeFilter("username", "contain" as any, StringFilter),
                translate("appUser.filter.username"),
            ),
            
            
            RenderStringFilter(
                appUserFilter["password"]["contain"],
                handleChangeFilter("password", "contain" as any, StringFilter),
                translate("appUser.filter.password"),
            ),
            
            
            RenderStringFilter(
                appUserFilter["otpCode"]["contain"],
                handleChangeFilter("otpCode", "contain" as any, StringFilter),
                translate("appUser.filter.otpCode"),
            ),
            
            
            RenderDateFilter(
                appUserFilter["otpExpired"]["equal"],
                handleChangeFilter("otpExpired", "equal" as any, DateFilter),
                'single',
                translate("appUser.filter.otpExpired"),
            ),
            
            
            RenderStringFilter(
                appUserFilter["displayName"]["contain"],
                handleChangeFilter("displayName", "contain" as any, StringFilter),
                translate("appUser.filter.displayName"),
            ),
            
            
            RenderStringFilter(
                appUserFilter["address"]["contain"],
                handleChangeFilter("address", "contain" as any, StringFilter),
                translate("appUser.filter.address"),
            ),
            
            
            RenderStringFilter(
                appUserFilter["email"]["contain"],
                handleChangeFilter("email", "contain" as any, StringFilter),
                translate("appUser.filter.email"),
            ),
            
            
            RenderStringFilter(
                appUserFilter["phone"]["contain"],
                handleChangeFilter("phone", "contain" as any, StringFilter),
                translate("appUser.filter.phone"),
            ),
            
            
            
            
            RenderStringFilter(
                appUserFilter["department"]["contain"],
                handleChangeFilter("department", "contain" as any, StringFilter),
                translate("appUser.filter.department"),
            ),
            
            
            
            
            
            
            
            
            RenderStringFilter(
                appUserFilter["avatar"]["contain"],
                handleChangeFilter("avatar", "contain" as any, StringFilter),
                translate("appUser.filter.avatar"),
            ),
            
            
            RenderDateFilter(
                appUserFilter["birthday"]["equal"],
                handleChangeFilter("birthday", "equal" as any, DateFilter),
                'single',
                translate("appUser.filter.birthday"),
            ),
            
            
            
            
            
            RenderNumberFilter(
                appUserFilter["longitude"]["equal"],
                translate("appUser.filter.longitude"),
                handleChangeFilter("longitude", "equal" as any, NumberFilter),
                'single',
            ),
            
            
            RenderNumberFilter(
                appUserFilter["latitude"]["equal"],
                translate("appUser.filter.latitude"),
                handleChangeFilter("latitude", "equal" as any, NumberFilter),
                'single',
            ),
            
            
            
            
            
            
            
            
        ],
    [handleChangeFilter, RenderStringFilter, appUserFilter, translate]);

    const appUserColumns = React.useMemo(
    () =>
      CreateTableColumns(
        CreateColumn()
          .Title(translate("general.columns.index"))
          .Key("index")
          .Render(masterTableIndex<AppUser, AppUserFilter>(appUserFilter)),
        
        
        CreateColumn()
          .Title(translate("role.appUser.username"))
          .Key("username")
          .DataIndex("username"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.password"))
          .Key("password")
          .DataIndex("password"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.otpCode"))
          .Key("otpCode")
          .DataIndex("otpCode"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.otpExpired"))
          .Key("otpExpired")
          .DataIndex("otpExpired"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.displayName"))
          .Key("displayName")
          .DataIndex("displayName"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.address"))
          .Key("address")
          .DataIndex("address"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.email"))
          .Key("email")
          .DataIndex("email"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.phone"))
          .Key("phone")
          .DataIndex("phone"),
        
        
        
        
        CreateColumn()
          .Title(translate("role.appUser.department"))
          .Key("department")
          .DataIndex("department"),
        
        
        
        
        
        
        
        
        CreateColumn()
          .Title(translate("role.appUser.avatar"))
          .Key("avatar")
          .DataIndex("avatar"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.birthday"))
          .Key("birthday")
          .DataIndex("birthday"),
        
        
        
        CreateColumn()
          .Title(translate("role.appUser.used"))
          .Key("used")
          .DataIndex("used"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.longitude"))
          .Key("longitude")
          .DataIndex("longitude"),
        
        
        CreateColumn()
          .Title(translate("role.appUser.latitude"))
          .Key("latitude")
          .DataIndex("latitude"),
        
        
        
        
        
        
        
        
      ),
    [appUserFilter, translate],
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
    appUserModalFilters,
    visibleAppUser: visible,
    handleOpenAppUserModal: handleOpenModal,
    handleCloseAppUserModal: handleCloseModal,
    handleSaveAppUserModal: handleSaveModal,
    selectedAppUserList,
    appUserFilter,
    dispatchAppUserFilter,
    appUserColumns,
    loadAppUserList: loadList,
    setLoadAppUserList: setLoadList,
    handleSearchAppUser: handleSearch,
    handleUpdateNewAppUserFilter: handleUpdateNewFilter,
    handleResetAppUserFilter: handleResetFilter,
  };

};

export const appUserRoleMappingContentMapper = (model: AppUserRoleMapping | AppUser): AppUserRoleMapping => {
    if (model.hasOwnProperty("appUser")) {
        const { appUser } = model;
        return {
          ...model,
        appUserId: appUser?.id,
        appUserUsername: appUser?.username,
        appUserPassword: appUser?.password,
        appUserOtpCode: appUser?.otpCode,
        appUserOtpExpired: appUser?.otpExpired,
        appUserDisplayName: appUser?.displayName,
        appUserAddress: appUser?.address,
        appUserEmail: appUser?.email,
        appUserPhone: appUser?.phone,
        appUserProvinceId: appUser?.provinceId,
        appUserPositionId: appUser?.positionId,
        appUserDepartment: appUser?.department,
        appUserOrganizationId: appUser?.organizationId,
        appUserSexId: appUser?.sexId,
        appUserStatusId: appUser?.statusId,
        appUserCreatedAt: appUser?.createdAt,
        appUserUpdatedAt: appUser?.updatedAt,
        appUserDeletedAt: appUser?.deletedAt,
        appUserAvatar: appUser?.avatar,
        appUserBirthday: appUser?.birthday,
        appUserRowId: appUser?.rowId,
        appUserUsed: appUser?.used,
        appUserLongitude: appUser?.longitude,
        appUserLatitude: appUser?.latitude,
        appUserOrganization: appUser?.organization,
        appUserPosition: appUser?.position,
        appUserProvince: appUser?.province,
        appUserSex: appUser?.sex,
        appUserStatus: appUser?.status,
        appUserAppUserRoleMappings: appUser?.appUserRoleMappings,
        appUserAppUserSiteMappings: appUser?.appUserSiteMappings,
        };
    }

    return appUserRoleMappingContentMapper({
        ...new AppUserRoleMapping(),
        appUser: model,
    });
};

