/* begin general import */
import React from 'react';
import { Model } from '@react3l/react3l/core/model';
import { Descriptions } from 'antd';
import Modal from 'components/Utility/Modal/Modal';
import { TFunction } from 'i18next';
import moment from "moment";
// import ChatBox from 'components/Utility/ChatBox/ChatBox';
// import { useGlobal } from 'reactn';
// import { AppUser } from 'models/AppUser';
// import {disscusionRepository} from 'repositories/disscusion-repository';
// import { appUserRepository } from 'repositories/app-user-repository';
/* end general import */

/* begin individual import */
import { Permission } from 'models/Permission';
import nameof from "ts-nameof.macro";
import Table from "antd/lib/table";
import { Menu } from 'models/Menu';
import { Role } from 'models/Role';
import { PermissionActionMapping } from 'models/PermissionActionMapping';
import { Action } from 'models/Action';
import { PermissionFieldMapping } from 'models/PermissionFieldMapping';
import { Field } from 'models/Field';


/* end individual import */

interface PermissionPreviewProps<T extends Model>
    {
    previewModel?: T;
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    handleGoDetail?: (id: number) => () => void;
    translate?: TFunction;
    };

    function PermissionPreview(props: PermissionPreviewProps<Permission>
        ) {

        const {
        previewModel,
        isOpenPreview,
        isLoadingPreview,
        handleClosePreview,
        handleGoDetail,
        translate,
        } = props;

        // const [userInfo] = useGlobal<AppUser>('user');

            return <>
            <Modal title={null}
                   visible={isOpenPreview}
                   handleCancel={handleClosePreview}
                   width={1000}
                   visibleFooter={false}>
                { isLoadingPreview ?
                <div className="loading-block">
                    <img src="/assets/svg/spinner.svg" alt='Loading...' />
                </div> :
                <div className="preview__containter">
                    <div className="preview__left-side">
                        <div className="preview__header">
                            <div className="preview__vertical-bar"></div>
                            <div className="preview__header-info">
                                <div className="preview__header-text">
                                    <span className="preview__header-title">{previewModel.name}</span>
                                    <span className="preview__header-date">{translate('permissions.startDate')} { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }</span>
                                </div>
                                <button className="btn gradient-btn-icon ant-tooltip-open" onClick={handleGoDetail(previewModel.id)}>
                                    <i className="tio-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div className="preview__body">
                            <div className="preview__content">
                                <Descriptions title={previewModel.name} column={2}>
                                    
                                    
                                    <Descriptions.Item label={translate('permissions.code')}>
                                        <span className="gradient-text">{ previewModel.code }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('permissions.name')}>
                                        <span className="gradient-text">{ previewModel.name }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    
                                    
                                    
                                    <Descriptions.Item label={translate('permissions.menu')}>
                                        <span className="gradient-text">{ previewModel?.menu?.name }</span>
                                    </Descriptions.Item>
                                    
                                    <Descriptions.Item label={translate('permissions.role')}>
                                        <span className="gradient-text">{ previewModel?.role?.name }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    
                                </Descriptions>
                            </div>
                            <div className="preview__content">
                                <Table tableLayout='fixed'
                                       rowKey={nameof(previewModel.permissionActionMappings[0].id)}
                                       columns={[
                                       
                                       
                                       
                                       {
                                       title: translate('permissionActionMappings.action'),
                                       dataIndex: 'action' ,
                                       key: 'action' ,
                                       render(action: Action){
                                       return action; // fill render field after generate
                                       }
                                       },
                                       
                                       ]}
                                       pagination={false}
                                       dataSource={previewModel.permissionActionMappingsMappings} />
                            </div>
                            <div className="preview__content">
                                <Table tableLayout='fixed'
                                       rowKey={nameof(previewModel.permissionFieldMappings[0].id)}
                                       columns={[
                                       
                                       
                                       
                                       {
                                       title: translate('permissionFieldMappings.value'),
                                       dataIndex: 'value' ,
                                       key: 'value'
                                       },
                                       
                                       
                                       {
                                       title: translate('permissionFieldMappings.field'),
                                       dataIndex: 'field' ,
                                       key: 'field' ,
                                       render(field: Field){
                                       return field; // fill render field after generate
                                       }
                                       },
                                       
                                       ]}
                                       pagination={false}
                                       dataSource={previewModel.permissionFieldMappingsMappings} />
                            </div>
                        </div>
                        <div className="preview__footer"></div>
                    </div>
                    <div className="preview__right-side">
                         {/* <ChatBox getMessages={disscusionRepository.list}
                                 countMessages={disscusionRepository.count}
                                 postMessage={disscusionRepository.create}
                                 deleteMessage={disscusionRepository.delete}
                                 attachFile={disscusionRepository.import}
                                 suggestList={appUserRepository.list}
                                 discussionId={previewModel.rowId}
                                 userInfo={userInfo} />
                        */}
                    </div>
                </div>
                }
            </Modal>
            </>;
            }

            export default PermissionPreview;
