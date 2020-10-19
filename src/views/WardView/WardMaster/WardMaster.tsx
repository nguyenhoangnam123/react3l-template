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
import WardPreview from "./WardPreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
import AdvanceNumberFilter from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import { NumberFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { wardRepository } from "repositories/ward-repository";
import { Ward, WardFilter } from "models/Ward";
import { WARD_DETAIL_ROUTE } from "config/route-consts";
import { District, DistrictFilter } from "models/District";
import { Status, StatusFilter } from "models/Status";
/* end individual import */

function WardMasterView() {
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
    } = masterService.useMaster<Ward, WardFilter>
    (
        WardFilter,
        WARD_DETAIL_ROUTE,
        wardRepository.list,
        wardRepository.count,
        wardRepository.delete,
        wardRepository.bulkDelete,
    );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<Ward>
    (
        Ward,
        wardRepository.get
    );

    const columns: ColumnProps<Ward>[] = useMemo(
            () => [
                    {
                        title: translate("general.columns.index"),
                        key: "index",
                        width: 100,
                        render: renderMasterIndex<Ward>(pagination),
                    },
                    
                    
                    
                    
                    {
                        title: translate('wards.code'),
                        key: nameof(list[0].code),
                        dataIndex: nameof(list[0].code),
                        sorter: true,
                        sortOrder: getAntOrderType<Ward, WardFilter>
                            (
                                filter,
                                nameof(list[0].code),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('wards.name'),
                        key: nameof(list[0].name),
                        dataIndex: nameof(list[0].name),
                        sorter: true,
                        sortOrder: getAntOrderType<Ward, WardFilter>
                            (
                                filter,
                                nameof(list[0].name),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('wards.priority'),
                        key: nameof(list[0].priority),
                        dataIndex: nameof(list[0].priority),
                        sorter: true,
                        sortOrder: getAntOrderType<Ward, WardFilter>
                            (
                                filter,
                                nameof(list[0].priority),
                            ),
                    },
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    {
                        title: translate('wards.used'),
                        key: nameof(list[0].used),
                        dataIndex: nameof(list[0].used),
                        sorter: true,
                        sortOrder: getAntOrderType<Ward, WardFilter>
                            (
                                filter,
                                nameof(list[0].used),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('wards.district'),
                        key: nameof(list[0].district),
                        dataIndex: nameof(list[0].district),
                        sorter: true,
                        sortOrder: getAntOrderType<Ward, WardFilter>
                            (
                                filter,
                                nameof(list[0].district),
                            ),
                        render(district: District) {
                            return district?.name;
                        }
                    },
                    
                    
                    {
                        title: translate('wards.status'),
                        key: nameof(list[0].status),
                        dataIndex: nameof(list[0].status),
                        sorter: true,
                        sortOrder: getAntOrderType<Ward, WardFilter>
                            (
                                filter,
                                nameof(list[0].status),
                            ),
                        render(status: Status) {
                            return status?.name;
                        }
                    },
                    
                    {
                        title: translate("general.actions.label"),
                        key: "action",
                        dataIndex: nameof(list[0].id),
                        width: 200,
                        align: "center",
                        render(id: number, ward: Ward) {
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
                                            handleServerDelete(ward)}
                                            >
                                            <i className='tio-delete' />
                                        </button>
                                    </Tooltip>
                                </div>);
                        },
                    },
                ], [handleGoDetail, handleServerDelete, translate, handleOpenPreview, list, pagination]);

    return (
        <>
            <div className='page page__master'>
                <div className='page__header d-flex align-items-center justify-content-between'>
                    <div className='page__title'>
                        {translate("wards.master.title")}
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
                                        translate('wards.code')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].code)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].code),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('wards.placeholder.code')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('wards.name')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].name)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].name),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('wards.placeholder.name')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('wards.priority')
                                    </label>
                                    <AdvanceNumberFilter value={filter[nameof(list[0].priority)]["equal"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].priority),
                                                            'equal' as any,
                                                            NumberFilter,
                                                            )}
                                                            placeHolder={translate('wards.placeholder.priority')} />
                                </Col>
                                







                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('wards.used')
                                    </label>
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('wards.district')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].districtId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].districtId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ DistrictFilter }
                                                        getList={ wardRepository.singleListDistrict }
                                                        placeHolder={translate('wards.placeholder.district')} />
                                </Col>

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('wards.status')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].statusId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].statusId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ StatusFilter }
                                                        getList={ wardRepository.singleListStatus }
                                                        placeHolder={translate('wards.placeholder.status')} />
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
                                            {translate('wards.table.title')}
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
                                                    onChange={handleImportList(wardRepository.import)} />
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={() =>
                                                {importButtonRef.current.click();}}>
                                                <i className='tio-file_add_outlined' />
                                            </button>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.exportExcel")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleListExport(filter, wardRepository.export)}>
                                                <i className='tio-file_outlined' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.downloadTemplate")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleExportTemplateList(wardRepository.exportTemplate)}>
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
            <WardPreview previewModel={previewModel}
                                        isOpenPreview={isOpenPreview}
                                        isLoadingPreview={isLoadingPreview}
                                        handleClosePreview={handleClosePreview}
                                        handleGoDetail={handleGoDetail}
                                        translate={translate} />
        </>
    );
}

export default WardMasterView;
