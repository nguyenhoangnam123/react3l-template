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
import { Role } from 'models/Role';
import nameof from "ts-nameof.macro";
import Table from "antd/lib/table";
import { Status } from 'models/Status';
import { AppUserRoleMapping } from 'models/AppUserRoleMapping';
import { AppUser } from 'models/AppUser';
import { Permission } from 'models/Permission';
import { Menu } from 'models/Menu';


/* end individual import */

interface RolePreviewProps<T extends Model>
    {
    previewModel?: T;
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    handleGoDetail?: (id: number) => () => void;
    translate?: TFunction;
    };

    function RolePreview(props: RolePreviewProps<Role>
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
                                    <span className="preview__header-date">{translate('roles.startDate')} { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }</span>
                                </div>
                                <button className="btn gradient-btn-icon ant-tooltip-open" onClick={handleGoDetail(previewModel.id)}>
                                    <i className="tio-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div className="preview__body">
                            <div className="preview__content">
                                <Descriptions title={previewModel.name} column={2}>
                                    
                                    
                                    <Descriptions.Item label={translate('roles.code')}>
                                        <span className="gradient-text">{ previewModel.code }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('roles.name')}>
                                        <span className="gradient-text">{ previewModel.name }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    
                                    <Descriptions.Item label={translate('roles.used')}>
                                        <span className="gradient-text">{ previewModel.used }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('roles.status')}>
                                        <span className="gradient-text">{ previewModel?.status?.name }</span>
                                    </Descriptions.Item>
                                    
                                    
                                </Descriptions>
                            </div>
                            <div className="preview__content">
                                <Table tableLayout='fixed'
                                       rowKey={nameof(previewModel.appUserRoleMappings[0].id)}
                                       columns={[
                                       
                                       
                                       
                                       {
                                       title: translate('appUserRoleMappings.appUser'),
                                       dataIndex: 'appUser' ,
                                       key: 'appUser' ,
                                       render(appUser: AppUser){
                                       return appUser; // fill render field after generate
                                       }
                                       },
                                       
                                       ]}
                                       pagination={false}
                                       dataSource={previewModel.appUserRoleMappingsMappings} />
                            </div>
                            <div className="preview__content">
                                <Table tableLayout='fixed'
                                       rowKey={nameof(previewModel.permissions[0].id)}
                                       columns={[
                                       
                                       
                                       {
                                       title: translate('permissions.code'),
                                       dataIndex: 'code' ,
                                       key: 'code'
                                       },
                                       
                                       
                                       {
                                       title: translate('permissions.name'),
                                       dataIndex: 'name' ,
                                       key: 'name'
                                       },
                                       
                                       
                                       
                                       
                                       
                                       {
                                       title: translate('permissions.menu'),
                                       dataIndex: 'menu' ,
                                       key: 'menu' ,
                                       render(menu: Menu){
                                       return menu; // fill render field after generate
                                       }
                                       },
                                       
                                       
                                       
                                       
                                       ]}
                                       pagination={false}
                                       dataSource={previewModel.permissionsMappings} />
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

            export default RolePreview;
