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
import { Theme } from 'models/Theme';
import { THEME_MASTER_ROUTE } from 'config/route-consts';
import { appUserRepository } from 'repositories/app-user-repository';
import { themeRepository } from "repositories/theme-repository";
/* end individual import */

const { TabPane } = Tabs;

function ThemeDetail() {
    const [translate] = useTranslation();

    const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

    const {
        model,
        isDetail,
        handleChangeSimpleField,
        handleSave,
    } = detailService.useDetail<Theme>
    (
        Theme,
        themeRepository.get,
        themeRepository.save,
        THEME_MASTER_ROUTE,
    );

    return (
        <>
            <div className='page page__detail'>
                <div className='page__header d-flex align-items-center'>
                    <div className='page__title mr-1'>
                        {translate("themes.detail.title")}
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
                                        <FormItem label={translate("themes.code")}
                                                    validateStatus={formService.getValidationStatus<Theme>(model.errors, nameof(model.code))}
                                                message={ model.errors?.code }>
                                            <InputText isMaterial={true}
                                                        value={ model.code }
                                                        placeHolder={translate("themes.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                        </Col>
                                        

                                        <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("themes.name")}
                                                    validateStatus={formService.getValidationStatus<Theme>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("themes.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
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
                    <Row className='mt-3 mb-5'>
                        <button className='btn component__btn-primary pr-4 mb-5'
                                onClick={handleSave()}>
                            {translate("themes.button.saveModel")}
                        </button>
                    </Row>
                </div>
            </div>
            <AppFooter></AppFooter>
        </>
    );
}

export default ThemeDetail;
