/* begin general import */
import React, { Dispatch, useContext } from 'react';
import { Model } from '@react3l/react3l/core/model';
import { Descriptions } from 'antd';
import ChatBox from 'components/Utility/ChatBox/ChatBox';
import Modal from 'components/Utility/Modal/Modal';
import { TFunction } from 'i18next';
import moment from "moment";
import {AppStoreContext, AppAction, AppState} from 'App';
import {discussionRepository} from 'repositories/discussion-repository';
import { appUserRepository } from 'repositories/app-user-repository';
/* end general import */

/* begin individual import */
import { Ward } from 'models/Ward';
/* end individual import */

interface WardPreviewProps<T extends Model>{
    previewModel?: T;
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    handleGoDetail?: (id: number) => () => void;
    translate?: TFunction;
};

function WardPreview(props: WardPreviewProps<Ward>) {

    const {
        previewModel,
        isOpenPreview,
        isLoadingPreview,
        handleClosePreview,
        handleGoDetail,
        translate,
    } = props;

    const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

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
                                    <span className="preview__header-date">{translate('wards.startDate')} { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }</span>
                                </div>
                                <button className="btn gradient-btn-icon ant-tooltip-open" onClick={handleGoDetail(previewModel.id)}>
                                    <i className="tio-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div className="preview__body">
                            <div className="preview__content">
                                <Descriptions title={previewModel.name} column={2}>
                                    
                                    
                                    <Descriptions.Item label={translate('wards.code')}>
                                        <span className="gradient-text">{ previewModel.code }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('wards.name')}>
                                        <span className="gradient-text">{ previewModel.name }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('wards.priority')}>
                                        <span className="gradient-text">{ previewModel.priority }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <Descriptions.Item label={translate('wards.used')}>
                                        <span className="gradient-text">{ previewModel.used }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('wards.district')}>
                                        <span className="gradient-text">{ previewModel?.district?.name }</span>
                                    </Descriptions.Item>
                                    
                                    <Descriptions.Item label={translate('wards.status')}>
                                        <span className="gradient-text">{ previewModel?.status?.name }</span>
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div className="preview__content">
                                <img src="/assets/img/img.png" alt="no-data" />
                                <span className="gradient-text transform-text">Have a nice day!</span>
                            </div>
                        </div>
                        <div className="preview__footer"></div>
                    </div>
                    <div className="preview__right-side">
                        <ChatBox getMessages={discussionRepository.list}
                                    countMessages={discussionRepository.count}
                                    postMessage={discussionRepository.create}
                                    deleteMessage={discussionRepository.delete}
                                    attachFile={discussionRepository.import}
                                    suggestList={appUserRepository.list}
                                    discussionId={previewModel.rowId}
                                    userInfo={state.user} />
                    </div>
                </div>
                }
            </Modal>
        </>;
}

export default WardPreview;
