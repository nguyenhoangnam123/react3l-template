/* begin general import */
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Tabs } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import { discussionRepository } from "repositories/discussion-repository";
import AppFooter from "components/AppFooter/AppFooter";
import {AppStoreContext, AppAction, AppState} from 'App';
import ChatBox from 'components/Utility/ChatBox/ChatBox';
/* end general import */

/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import ContentModal from "components/Utility/ContentModal/ContentModal";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import { Permission } from 'models/Permission';
import { PERMISSION_MASTER_ROUTE } from 'config/route-consts';
import { appUserRepository } from 'repositories/app-user-repository';
import { permissionRepository } from "repositories/permission-repository";

import { MenuFilter } from 'models/Menu';

import { RoleFilter } from 'models/Role';
import { usePermissionActionMappingTable } from "./PermissionActionMappingHook";
import { permissionActionMappingContentMapper, usePermissionActionMappingModal } from "./PermissionActionMappingHook";
import { usePermissionFieldMappingTable } from "./PermissionFieldMappingHook";
import { permissionFieldMappingContentMapper, usePermissionFieldMappingModal } from "./PermissionFieldMappingHook";
/* end individual import */

const { TabPane } = Tabs;

function PermissionDetail() {
    const [translate] = useTranslation();

    const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<Permission>
    (
        Permission,
        permissionRepository.get,
        permissionRepository.save,
        PERMISSION_MASTER_ROUTE,
    );
    
    const {
        permissionActionMappingFilter,
        permissionActionMappingContents,
        setPermissionActionMappingContents,
        permissionActionMappingContentColumns,
        permissionActionMappingList,
        loadPermissionActionMappingList,
        permissionActionMappingTotal,
        handleAddPermissionActionMapping,
        handlePermissionActionMappingTableChange,
        handlePermissionActionMappingPagination,
        permissionActionMappingRowSelection,
        canBulkDeletePermissionActionMapping,
        handleLocalBulkDeletePermissionActionMapping,
        permissionActionMappingRef,
        handleClickPermissionActionMapping,
        handleImportPermissionActionMapping,
        handleExportPermissionActionMapping,
        handleExportTemplatePermissionActionMapping,
        handleSearchPermissionActionMapping,
    } = usePermissionActionMappingTable(model, handleUpdateNewModel);
    const {
        visibleAction,
        actionFilter,
        handleUpdateNewActionFilter,
        handleSearchAction,
        handleResetActionFilter,
        loadActionList,
        setLoadActionList,
        actionModalFilters,
        handleOpenActionModal,
        handleCloseActionModal,
        handleSaveActionModal,
        selectedActionList,
        actionColumns,
    } = usePermissionActionMappingModal(permissionActionMappingContents, handleSearchPermissionActionMapping);
    
    const {
        permissionFieldMappingFilter,
        permissionFieldMappingContents,
        setPermissionFieldMappingContents,
        permissionFieldMappingContentColumns,
        permissionFieldMappingList,
        loadPermissionFieldMappingList,
        permissionFieldMappingTotal,
        handleAddPermissionFieldMapping,
        handlePermissionFieldMappingTableChange,
        handlePermissionFieldMappingPagination,
        permissionFieldMappingRowSelection,
        canBulkDeletePermissionFieldMapping,
        handleLocalBulkDeletePermissionFieldMapping,
        permissionFieldMappingRef,
        handleClickPermissionFieldMapping,
        handleImportPermissionFieldMapping,
        handleExportPermissionFieldMapping,
        handleExportTemplatePermissionFieldMapping,
        handleSearchPermissionFieldMapping,
    } = usePermissionFieldMappingTable(model, handleUpdateNewModel);
    const {
        visibleField,
        fieldFilter,
        handleUpdateNewFieldFilter,
        handleSearchField,
        handleResetFieldFilter,
        loadFieldList,
        setLoadFieldList,
        fieldModalFilters,
        handleOpenFieldModal,
        handleCloseFieldModal,
        handleSaveFieldModal,
        selectedFieldList,
        fieldColumns,
    } = usePermissionFieldMappingModal(permissionFieldMappingContents, handleSearchPermissionFieldMapping);
    

    return (
        <>
            <div className='page page__detail'>
                <div className='page__header d-flex align-items-center'>
                    <div className='page__title mr-1'>
                        {translate("permissions.detail.title")}
                    </div>
                    {isDetail ? (
                    <div className='page__id'>{`- # ${model.id}`}</div>
                    ) : (
                    translate("general.actions.create")
                    )}
                </div>
                <div className='w-100 mt-3 page__detail-tabs'>
                    <Row className='d-flex'>
                        <Col lg={18}>
                        <Card className='mr-3'>
                            <Tabs defaultActiveKey='1'>
                                <TabPane tab={translate("general.detail.generalInfomation")}
                                        key='1'>
                                    <Row>
                                        

                                        <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissions.code")}
                                                    validateStatus={formService.getValidationStatus<Permission>(model.errors, nameof(model.code))}
                                                message={ model.errors?.code }>
                                            <InputText isMaterial={true}
                                                        value={ model.code }
                                                        placeHolder={translate("permissions.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                        </Col>
                                        

                                        <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissions.name")}
                                                    validateStatus={formService.getValidationStatus<Permission>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("permissions.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                        </Col>
                                        




                                        <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissions.menu")}
                                                    validateStatus={formService.getValidationStatus<Permission>(model.errors, nameof(model.menu))}
                                                message={ model.errors?.menu } >
                                                <Select isMaterial={true}
                                                    classFilter={ MenuFilter }
                                                    placeHolder={translate("permissions.placeholder.menu")}
                                                    getList={ permissionRepository.singleListMenu }
                                                    onChange={handleChangeObjectField(nameof(model.menu))}
                                                    model={ model.menu } />
                                        </FormItem>
                                        </Col>

                                        <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissions.role")}
                                                    validateStatus={formService.getValidationStatus<Permission>(model.errors, nameof(model.role))}
                                                message={ model.errors?.role } >
                                                <Select isMaterial={true}
                                                    classFilter={ RoleFilter }
                                                    placeHolder={translate("permissions.placeholder.role")}
                                                    getList={ permissionRepository.singleListRole }
                                                    onChange={handleChangeObjectField(nameof(model.role))}
                                                    model={ model.role } />
                                        </FormItem>
                                        </Col>



                                    </Row>
                                </TabPane>
                            </Tabs>
                        </Card>
                        </Col>
                        <Col lg={6}>
                            <ChatBox getMessages={discussionRepository.list}
                                    countMessages={discussionRepository.count}
                                    postMessage={discussionRepository.create}
                                    deleteMessage={discussionRepository.delete}
                                    attachFile={discussionRepository.import}
                                    suggestList={appUserRepository.list}
                                    discussionId={model.rowId}
                                    userInfo={state.user} />
                        </Col>
                    </Row>
                </div>
                <div className='w-100 mt-3 page__detail-tabs'>
                    <Row className='d-flex'>
                        <Col lg={18}>
                            <Card className='mr-3'>
                                <Tabs defaultActiveKey='1'>
                                    
                                    <TabPane tab={translate("permissions.permissionActionMappings")}
                                            key='1'>
                                        <Row>
                                            <ContentTable model={model}
                                                            filter={ permissionActionMappingFilter }
                                                            list={ permissionActionMappingList }
                                                            loadingList={loadPermissionActionMappingList}
                                                            total={ permissionActionMappingTotal }
                                                            handleTableChange={handlePermissionActionMappingTableChange}
                                                            rowSelection={ permissionActionMappingRowSelection }
                                                            handleLocalBulkDelete={ handleLocalBulkDeletePermissionActionMapping }
                                                            canBulkDelete={ canBulkDeletePermissionActionMapping }
                                                            handleExportContent={ handleExportPermissionActionMapping }
                                                            handleExportTemplateContent={ handleExportTemplatePermissionActionMapping }
                                                            handlePagination={ handlePermissionActionMappingPagination }
                                                            handleAddContent={ handleAddPermissionActionMapping }
                                                            ref={ permissionActionMappingRef }
                                                            handleClick={ handleClickPermissionActionMapping }
                                                            handleImportContentList={ handleImportPermissionActionMapping }
                                                            columns={ permissionActionMappingContentColumns }
                                                            onOpenModal={handleOpenActionModal}
 />
                                            <ContentModal content={ permissionActionMappingContents }
                                                            setContent={ setPermissionActionMappingContents }
                                                            visible={ visibleAction }
                                                            filter={ actionFilter }
                                                            onUpdateNewFilter={ handleUpdateNewActionFilter }
                                                            onResetFilter={ handleResetActionFilter }
                                                            onSearch={ handleSearchAction }
                                                            getList={ permissionRepository.listAction }
                                                            getTotal={ permissionRepository.countAction }
                                                            loadList={loadActionList}
                                                            setLoadList={setLoadActionList}
                                                            selectedList={selectedActionList}
                                                            columns={ actionColumns }
                                                            filterList={ actionModalFilters }
                                                            mapperField={nameof(model.permissionActionMappings[0].action)}
                                                            mapper={ permissionActionMappingContentMapper }
                                                            onClose={ handleCloseActionModal }
                                                            onSave={ handleSaveActionModal } />
                                        </Row>
                                    </TabPane>
                                    
                                    <TabPane tab={translate("permissions.permissionFieldMappings")}
                                            key='1'>
                                        <Row>
                                            <ContentTable model={model}
                                                            filter={ permissionFieldMappingFilter }
                                                            list={ permissionFieldMappingList }
                                                            loadingList={loadPermissionFieldMappingList}
                                                            total={ permissionFieldMappingTotal }
                                                            handleTableChange={handlePermissionFieldMappingTableChange}
                                                            rowSelection={ permissionFieldMappingRowSelection }
                                                            handleLocalBulkDelete={ handleLocalBulkDeletePermissionFieldMapping }
                                                            canBulkDelete={ canBulkDeletePermissionFieldMapping }
                                                            handleExportContent={ handleExportPermissionFieldMapping }
                                                            handleExportTemplateContent={ handleExportTemplatePermissionFieldMapping }
                                                            handlePagination={ handlePermissionFieldMappingPagination }
                                                            handleAddContent={ handleAddPermissionFieldMapping }
                                                            ref={ permissionFieldMappingRef }
                                                            handleClick={ handleClickPermissionFieldMapping }
                                                            handleImportContentList={ handleImportPermissionFieldMapping }
                                                            columns={ permissionFieldMappingContentColumns }
                                                            onOpenModal={handleOpenFieldModal}
 />
                                            <ContentModal content={ permissionFieldMappingContents }
                                                            setContent={ setPermissionFieldMappingContents }
                                                            visible={ visibleField }
                                                            filter={ fieldFilter }
                                                            onUpdateNewFilter={ handleUpdateNewFieldFilter }
                                                            onResetFilter={ handleResetFieldFilter }
                                                            onSearch={ handleSearchField }
                                                            getList={ permissionRepository.listField }
                                                            getTotal={ permissionRepository.countField }
                                                            loadList={loadFieldList}
                                                            setLoadList={setLoadFieldList}
                                                            selectedList={selectedFieldList}
                                                            columns={ fieldColumns }
                                                            filterList={ fieldModalFilters }
                                                            mapperField={nameof(model.permissionFieldMappings[0].field)}
                                                            mapper={ permissionFieldMappingContentMapper }
                                                            onClose={ handleCloseFieldModal }
                                                            onSave={ handleSaveFieldModal } />
                                        </Row>
                                    </TabPane>
                                    
                                </Tabs>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card style={ {height: '100%' } }></Card>
                        </Col>
                    </Row>
                    <Row className='mt-3 mb-5'>
                        <button className='btn component__btn-primary pr-4 mb-5'
                                onClick={handleSave()}>
                            {translate("permissions.button.saveModel")}
                        </button>
                    </Row>
                </div>
            </div>
            <AppFooter></AppFooter>
        </>
    );
}

export default PermissionDetail;
