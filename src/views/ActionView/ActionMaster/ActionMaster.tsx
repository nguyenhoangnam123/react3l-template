/* begin general import */
import React, { useMemo } from "react";
import { Col, Row, Tooltip } from "antd";
import Card from "antd/lib/card";
import Table, { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import Pagination from "components/Utility/Pagination/Pagination";
import { formatDateTime } from "helpers/date-time";
import { renderMasterIndex } from "helpers/table";
import { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { Animate } from "react-show";
import masterService from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import ActionPreview from "./ActionPreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { actionRepository } from "repositories/action-repository";
import { Action, ActionFilter } from "models/Action";
import { ACTION_DETAIL_ROUTE } from "config/route-consts";
import { Menu, MenuFilter } from "models/Menu";
/* end individual import */

function ActionMasterView() {
    const [translate] = useTranslation();

    const {
        list,
        total,
        loadingList,
        filter,
        toggle,
        handleChangeFilter,
        handleResetFilter,
        handleGoCreate,
        handleGoDetail,
        handleToggleSearch,
        handleTableChange,
        handlePagination,
        handleServerDelete,
        handleServerBulkDelete,
        handleImportList,
        handleListExport,
        handleExportTemplateList,
        importButtonRef,
        rowSelection,
        canBulkDelete,
        pagination, // optional using
    } = masterService.useMaster<Action, ActionFilter>
    (
        ActionFilter,
        ACTION_DETAIL_ROUTE,
        actionRepository.list,
        actionRepository.count,
        actionRepository.delete,
        actionRepository.bulkDelete,
    );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<Action>
    (
        Action,
        actionRepository.get
    );

    const columns: ColumnProps<Action>[] = useMemo(
            () => [
                    {
                        title: translate("general.columns.index"),
                        key: "index",
                        width: 100,
                        render: renderMasterIndex<Action>(pagination),
                    },
                    
                    
                    
                    
                    {
                        title: translate('actions.name'),
                        key: nameof(list[0].name),
                        dataIndex: nameof(list[0].name),
                        sorter: true,
                        sortOrder: getAntOrderType<Action, ActionFilter>
                            (
                                filter,
                                nameof(list[0].name),
                            ),
                    },
                    
                    
                    
                    
                    
                    {
                        title: translate('actions.isDeleted'),
                        key: nameof(list[0].isDeleted),
                        dataIndex: nameof(list[0].isDeleted),
                        sorter: true,
                        sortOrder: getAntOrderType<Action, ActionFilter>
                            (
                                filter,
                                nameof(list[0].isDeleted),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('actions.menu'),
                        key: nameof(list[0].menu),
                        dataIndex: nameof(list[0].menu),
                        sorter: true,
                        sortOrder: getAntOrderType<Action, ActionFilter>
                            (
                                filter,
                                nameof(list[0].menu),
                            ),
                        render(menu: Menu) {
                            return menu?.name;
                        }
                    },
                    
                    
                    
                    
                    
                    {
                        title: translate("general.actions.label"),
                        key: "action",
                        dataIndex: nameof(list[0].id),
                        width: 200,
                        align: "center",
                        render(id: number, action: Action) {
                            return (
                                <div className='d-flex justify-content-center button-action-table'>
                                    <Tooltip title={translate("general.actions.view")}>
                                        <button className='btn gradient-btn-icon' onClick={handleOpenPreview(id)}>
                                            <i className='tio-visible' />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title={translate("general.actions.edit")}>
                                        <button className='btn gradient-btn-icon'
                                                onClick={handleGoDetail(id)}>
                                            <i className='tio-edit' />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title={translate("general.actions.delete")}>
                                        <button className='btn btn-sm component__btn-delete'
                                                onClick={() =>
                                            handleServerDelete(action)}
                                            >
                                            <i className='tio-delete' />
                                        </button>
                                    </Tooltip>
                                </div>);
                        },
                    },
                ], [handleGoDetail, handleServerDelete, translate, handleOpenPreview, list, pagination, filter]);

    return (
        <>
            <div className='page page__master'>
                <div className='page__header d-flex align-items-center justify-content-between'>
                    <div className='page__title'>
                        {translate("actions.master.title")}
                    </div>
                    <div className='page__actions d-flex align-items-center'>
                        <button className='btn btn-sm component__btn-primary ml-3 grow-animate-1'
                                onClick={handleGoCreate}>
                            {translate("general.actions.create")}
                        </button>
                    </div>
                </div>
                <div className='page__search'>
                    <Card title={translate("general.search.title")}>
                        <div className='d-flex align-items-center'>
                            <div className='pr-4 flex-grow-1'>
                                <InputSearch />
                            </div>
                            {/* start toggle and reset filter */}
                            <div className='d-flex justify-content-around'>
                                <button className={classNames(
                                        'btn component__btn-toggle mr-4 grow-animate-1' ,
                                        toggle === true ? 'component__btn-toggle-active' : '' ,
                                        )}
                                        onClick={handleToggleSearch}>
                                    <i className='tio-tune_horizontal'></i>
                                    <span className='component_btn-text'>
                                        {translate("general.button.advance")}
                                    </span>
                                </button>
                                <button className='btn component__btn-toggle grow-animate-1'
                                        onClick={handleResetFilter}>
                                    <i className='tio-restore'></i>
                                    <span className='component_btn-text'>
                                        {translate("general.button.filter")}
                                    </span>
                                </button>
                            </div>
                            {/* end toggle and reset filter */}
                        </div>
                        <Animate show={toggle}
                                    duration={500}
                                    style={ {height: "auto" } }
                                    transitionOnMount={true}
                                    start={ {height: 0} }
                                    leave={ {opacity: 0, height: 0} }>
                            <Row className='mt-4'>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('actions.name')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].name)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].name),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('actions.placeholder.name')} />
                                </Col>
                                


                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('actions.isDeleted')
                                    </label>
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('actions.menu')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].menuId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].menuId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ MenuFilter }
                                                        getList={ actionRepository.singleListMenu }
                                                        placeHolder={translate('actions.placeholder.menu')} />
                                </Col>


                            </Row>
                        </Animate>
                    </Card>
                </div>
                <div className='page__master-table'>
                    <Card>
                        <Table tableLayout='fixed'
                                rowKey={nameof(list[0].id)}
                                columns={columns}
                                pagination={false}
                                dataSource={list}
                                loading={loadingList}
                                onChange={handleTableChange}
                                rowSelection={rowSelection}
                                scroll={ { x: 'max-content' } }
                                title={() =>
                            (
                            <>
                                <div className='d-flex justify-content-between'>
                                    <div className='flex-shrink-1 d-flex align-items-center'>
                                        <div className='table-title ml-2'>
                                            {translate('actions.table.title')}
                                        </div>
                                    </div>

                                    <div className='flex-shrink-1 d-flex align-items-center'>
                                        <Tooltip title={translate("general.button.bulkDelete")} key='bulkDelete'>
                                            <button className='btn border-less component__btn-delete grow-animate-2'
                                                    style={ {border: "none" , backgroundColor: "unset" } }
                                                    onClick={handleServerBulkDelete}
                                                    disabled={!canBulkDelete}>
                                                <i className='tio-delete' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.importExcel")}>
                                            <>
                                            <input ref={importButtonRef}
                                                    type="file"
                                                    style={ {display: 'none' } }
                                                    id="master-import"
                                                    onChange={handleImportList(actionRepository.import)} />
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={() =>
                                                {importButtonRef.current.click();}}>
                                                <i className='tio-file_add_outlined' />
                                            </button>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.exportExcel")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleListExport(filter, actionRepository.export)}>
                                                <i className='tio-file_outlined' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.downloadTemplate")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleExportTemplateList(actionRepository.exportTemplate)}>
                                                <i className='tio-download_to' />
                                            </button>
                                        </Tooltip>
                                        <Pagination skip={filter.skip}
                                                    take={filter.take}
                                                    total={total}
                                                    onChange={handlePagination}
                                                    style={ {margin: "10px" } } />
                                    </div>
                                </div>
                            </>
                            )}
                            />
                    </Card>
                </div>
            </div>
            <ActionPreview previewModel={previewModel}
                                        isOpenPreview={isOpenPreview}
                                        isLoadingPreview={isLoadingPreview}
                                        handleClosePreview={handleClosePreview}
                                        handleGoDetail={handleGoDetail}
                                        translate={translate} />
        </>
    );
}

export default ActionMasterView;