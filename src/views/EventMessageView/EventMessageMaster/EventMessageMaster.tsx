/* begin general import */
import React, { useMemo } from "react";
import { Col, Row, Tooltip } from "antd";
import Card from "antd/lib/card";
import Table, { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import Pagination from "components/Utility/Pagination/Pagination";
import { renderMasterIndex } from "helpers/table";
import { useTranslation } from "react-i18next";
import { Animate } from "react-show";
import masterService from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import EventMessagePreview from "./EventMessagePreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
import AdvanceDateFilter from "components/Utility/AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import { DateFilter } from "@react3l/advanced-filters";
import { formatDateTime } from "helpers/date-time";
import { Moment } from "moment";
/* end filter import */

/* begin individual import */
import { eventMessageRepository } from "repositories/event-message-repository";
import { EventMessage, EventMessageFilter } from "models/EventMessage";
import { EVENT_MESSAGE_DETAIL_ROUTE } from "config/route-consts";
/* end individual import */

function EventMessageMaster() {
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
    } = masterService.useMaster<EventMessage, EventMessageFilter>
    (
        EventMessageFilter,
        EVENT_MESSAGE_DETAIL_ROUTE,
        eventMessageRepository.list,
        eventMessageRepository.count,
        eventMessageRepository.delete,
        eventMessageRepository.bulkDelete,
    );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<EventMessage>
    (
        EventMessage,
        eventMessageRepository.get,
    );

    const columns: ColumnProps<EventMessage>[] = useMemo(
            () => [
                    {
                        title: translate("general.columns.index"),
                        key: "index",
                        width: 100,
                        render: renderMasterIndex<EventMessage>(pagination),
                    },
                    
                    
                    
                    
                    {
                        title: (<div className='text-center'>{translate('eventMessages.time')}</div>),
                        key: nameof(list[0].time),
                        dataIndex: nameof(list[0].time),
                        sorter: true,
                        sortOrder: getAntOrderType<EventMessage, EventMessageFilter>
                            (
                                filter,
                                nameof(list[0].time),
                            ),
                        render(...params: [Moment, EventMessage, number]) {
                            return <div className='text-center'>{formatDateTime(params[0])}</div>;
                        },
                    },
                    
                    
                    
                    
                    
                    {
                        title: (<div className='text-center'>{translate('eventMessages.entityName')}</div>),
                        key: nameof(list[0].entityName),
                        dataIndex: nameof(list[0].entityName),
                        sorter: true,
                        sortOrder: getAntOrderType<EventMessage, EventMessageFilter>
                            (
                                filter,
                                nameof(list[0].entityName),
                            ),
                    },
                    
                    
                    
                    {
                        title: (<div className='text-center'>{translate('eventMessages.content')}</div>),
                        key: nameof(list[0].content),
                        dataIndex: nameof(list[0].content),
                        sorter: true,
                        sortOrder: getAntOrderType<EventMessage, EventMessageFilter>
                            (
                                filter,
                                nameof(list[0].content),
                            ),
                    },
                    
                    
                    {
                        title: translate("general.actions.label"),
                        key: "action",
                        dataIndex: nameof(list[0].id),
                        fixed: "right",
                        width: 150,
                        align: "center",
                        render(id: number, eventMessage: EventMessage) {
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
                                            handleServerDelete(eventMessage)}
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
                        {translate("eventMessages.master.title")}
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
                                        translate('eventMessages.time')
                                    </label>
                                    <AdvanceDateFilter value={filter[nameof(list[0].time)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].time),
                                                        'equal' as any,
                                                        DateFilter,
                                                        )}
                                                        placeholder={translate('eventMessages.placeholder.time')} />
                                </Col>
                                


                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('eventMessages.entityName')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].entityName)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].entityName),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('eventMessages.placeholder.entityName')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('eventMessages.content')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].content)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].content),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('eventMessages.placeholder.content')} />
                                </Col>
                                
                            </Row>
                        </Animate>
                    </Card>
                </div>
                <div className='page__master-table'>
                    <Card>
                        <Table rowKey={nameof(list[0].id)}
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
                                            {translate('eventMessages.table.title')}
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
                                                    onChange={handleImportList(eventMessageRepository.import)} />
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={() =>
                                                {importButtonRef.current.click();}}>
                                                <i className='tio-file_add_outlined' />
                                            </button>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.exportExcel")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleListExport(filter, eventMessageRepository.export)}>
                                                <i className='tio-file_outlined' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.downloadTemplate")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleExportTemplateList(eventMessageRepository.exportTemplate)}>
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
            <EventMessagePreview previewModel={previewModel}
                                        isOpenPreview={isOpenPreview}
                                        isLoadingPreview={isLoadingPreview}
                                        handleClosePreview={handleClosePreview}
                                        handleGoDetail={handleGoDetail}
                                        translate={translate} />
        </>
    );
}

export default EventMessageMaster;
