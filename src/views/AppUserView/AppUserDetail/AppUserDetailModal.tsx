import React, { useContext, Dispatch } from "react";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Tabs, Switch } from "antd";
import { translate } from "@react3l/react3l/helpers";
import { AppState, AppAction, AppStoreContext } from "App";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import { FormDetailAction, formService } from "services/form-service";
import InputNumber, {
  DECIMAL,
  LONG,
} from "components/Utility/Input/InputNumber/InputNumber";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import Select from "components/Utility/Select/Select";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import { discussionRepository } from "repositories/discussion-repository";
/* begin individual import */
import { AppUser } from "models/AppUser";
import { OrganizationFilter } from "models/Organization";
import { PositionFilter } from "models/Position";
import { ProvinceFilter } from "models/Province";
import { SexFilter } from "models/Sex";
import { StatusFilter } from "models/Status";
import { appUserRepository } from "repositories/app-user-repository";
/* end individual import */

const { TabPane } = Tabs;

export interface AppUserDetailModalProps extends ModalProps {
  model: AppUser;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField: (
    fieldName: string,
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField: (
    fieldName: string,
    callback?: (id: number) => void,
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<AppUser>>;
  loading?: boolean;
}

export function AppUserDetailModal(props: AppUserDetailModalProps) {
  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);
  const {
    model,
    onChangeSimpleField,
    onChangeObjectField,
    onChangeTreeObjectField,
    loading,
  } = props;

  return (
    <Modal {...props}>
      {loading ? (
        <div className='loading-block'>
          <img src='/assets/svg/spinner.svg' alt='Loading...' />
        </div>
      ) : (
        <div className='page page__detail'>
          <div className='page__header w-100' style={{ padding: "10px 24px" }}>
            <Row className='d-flex'>
              <Col lg={24}>
                <div className='page__title mr-1'>
                  {translate("appUsers.detail.title")}
                </div>
                {model?.id ? (
                  <div className='page__id'>{`- # ${model.id}`}</div>
                ) : (
                  translate("general.actions.create")
                )}
              </Col>
            </Row>
          </div>
          <div className='w-100 mt-3 page__detail-tabs'>
            <Row className='d-flex'>
              <Col lg={24}>
                <Card>
                  <Tabs defaultActiveKey='1'>
                    <TabPane
                      tab={translate("general.detail.generalInfomation")}
                      key='1'
                    >
                      <Row>
                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.username")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.username))}
                            message={model.errors?.username}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.username}
                              placeHolder={translate(
                                "appUsers.placeholder.username",
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.username),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.password")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.password))}
                            message={model.errors?.password}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.password}
                              placeHolder={translate(
                                "appUsers.placeholder.password",
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.password),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.otpCode")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.otpCode))}
                            message={model.errors?.otpCode}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.otpCode}
                              placeHolder={translate(
                                "appUsers.placeholder.otpCode",
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.otpCode),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.otpExpired")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.otpExpired))}
                            message={model.errors?.otpExpired}
                          >
                            <DatePicker
                              isMaterial={true}
                              value={model.otpExpired}
                              placeholder={translate(
                                "appUsers.placeholder.otpExpired",
                              )}
                              onChange={onChangeSimpleField(
                                nameof(model.otpExpired),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.displayName")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.displayName))}
                            message={model.errors?.displayName}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.displayName}
                              placeHolder={translate(
                                "appUsers.placeholder.displayName",
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.displayName),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.address")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.address))}
                            message={model.errors?.address}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.address}
                              placeHolder={translate(
                                "appUsers.placeholder.address",
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.address),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.email")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.email))}
                            message={model.errors?.email}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.email}
                              placeHolder={translate(
                                "appUsers.placeholder.email",
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.email),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.phone")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.phone))}
                            message={model.errors?.phone}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.phone}
                              placeHolder={translate(
                                "appUsers.placeholder.phone",
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.phone),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.birthday")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.birthday))}
                            message={model.errors?.birthday}
                          >
                            <DatePicker
                              isMaterial={true}
                              value={model.birthday}
                              placeholder={translate(
                                "appUsers.placeholder.birthday",
                              )}
                              onChange={onChangeSimpleField(
                                nameof(model.birthday),
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.used")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.used))}
                            message={model.errors?.used}
                          >
                            <Switch
                              size='small'
                              onChange={onChangeSimpleField(nameof(model.used))}
                              checked={model.used}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.longitude")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.longitude))}
                            message={model.errors?.longitude}
                          >
                            <InputNumber
                              isMaterial={true}
                              value={model.longitude}
                              placeHolder={translate(
                                "appUsers.placeholder.longitude",
                              )}
                              onChange={onChangeSimpleField(
                                nameof(model.longitude),
                              )}
                              numberType={DECIMAL}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.organization")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.organization))}
                            message={model.errors?.organization}
                          >
                            <TreeSelect
                              isMaterial={true}
                              placeHolder={translate(
                                "appUsers.placeholder.organization",
                              )}
                              selectable={true}
                              classFilter={OrganizationFilter}
                              onChange={onChangeTreeObjectField(
                                nameof(model.organization),
                              )}
                              checkStrictly={true}
                              getTreeData={
                                appUserRepository.singleListOrganization
                              }
                              item={model.organization}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.position")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.position))}
                            message={model.errors?.position}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={PositionFilter}
                              placeHolder={translate(
                                "appUsers.placeholder.position",
                              )}
                              getList={appUserRepository.singleListPosition}
                              onChange={onChangeObjectField(
                                nameof(model.position),
                              )}
                              model={model.position}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.province")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.province))}
                            message={model.errors?.province}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={ProvinceFilter}
                              placeHolder={translate(
                                "appUsers.placeholder.province",
                              )}
                              getList={appUserRepository.singleListProvince}
                              onChange={onChangeObjectField(
                                nameof(model.province),
                              )}
                              model={model.province}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24}>
                          <FormItem
                            label={translate("appUsers.status")}
                            validateStatus={formService.getValidationStatus<
                              AppUser
                            >(model.errors, nameof(model.status))}
                            message={model.errors?.status}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={StatusFilter}
                              placeHolder={translate(
                                "appUsers.placeholder.status",
                              )}
                              getList={appUserRepository.singleListStatus}
                              onChange={onChangeObjectField(
                                nameof(model.status),
                              )}
                              model={model.status}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </TabPane>
                  </Tabs>
                </Card>
              </Col>
              <Col lg={24}>
                <Card>
                  <ChatBox
                    getMessages={discussionRepository.list}
                    countMessages={discussionRepository.count}
                    postMessage={discussionRepository.create}
                    deleteMessage={discussionRepository.delete}
                    attachFile={discussionRepository.import}
                    suggestList={appUserRepository.list}
                    discussionId={model.rowId}
                    userInfo={state.user}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default AppUserDetailModal;
