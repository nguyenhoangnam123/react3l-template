/* begin general import */
import React from "react";
import { useTranslation } from "react-i18next";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Tabs } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
/* end general import */

/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import { Site } from 'models/Site';
import { SITE_MASTER_ROUTE } from 'config/route-consts'
import { siteRepository } from "repositories/site-repository";
/* end individual import */

const { TabPane } = Tabs;

function SiteDetail() {
    const [translate] = useTranslation();

    const {
        model,
        isDetail,
        handleChangeSimpleField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<Site>
    (
        Site,
        siteRepository.get,
        siteRepository.save,
        SITE_MASTER_ROUTE
    );

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("sites.detail.title")}
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
                                        <FormItem label={translate("sites.code")}
                                                validateStatus={formService.getValidationStatus<Site>(model.errors, nameof(model.code))}
                                                message={ model.errors?.code }>
                                            <InputText isMaterial={true}
                                                        value={ model.code }
                                                        placeHolder={translate("sites.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("sites.name")}
                                                validateStatus={formService.getValidationStatus<Site>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("sites.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("sites.icon")}
                                                validateStatus={formService.getValidationStatus<Site>(model.errors, nameof(model.icon))}
                                                message={ model.errors?.icon }>
                                            <InputText isMaterial={true}
                                                        value={ model.icon }
                                                        placeHolder={translate("sites.placeholder.icon")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.icon))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("sites.logo")}
                                                validateStatus={formService.getValidationStatus<Site>(model.errors, nameof(model.logo))}
                                                message={ model.errors?.logo }>
                                            <InputText isMaterial={true}
                                                        value={ model.logo }
                                                        placeHolder={translate("sites.placeholder.logo")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.logo))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("sites.isDisplay")}
                                                validateStatus={formService.getValidationStatus<Site>(model.errors, nameof(model.isDisplay))}
                                                message={ model.errors?.isDisplay }>
                                        </FormItem>
                                    </Col>
                                    


                                </Row>
                            </TabPane>
                        </Tabs>
                    </Card>
                    </Col>
                </Row>
            </div>
            <div className='w-100 mt-3 page__detail-tabs'>
                <Row className='mt-3 mb-5'>
                    <button className='btn component__btn-primary pr-4 mb-5'
                            onClick={handleSave()}>
                        {translate("sites.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default SiteDetail;
