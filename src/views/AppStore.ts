/**
 *
 * Contain AppState and reducer
 *
 * */
export interface AppState {
  isLoggedIn?: boolean;
  isSuccess?: boolean;
  successMessage?: boolean;
  isError?: boolean;
  errorMessage?: string;
  loading?: boolean;
  isErrorModalVisible?: boolean; // use it just one time for appModal
  toggleMenu?: boolean;
  displayFooter?: boolean;
  displayOverlay?: boolean;
}

export interface AppAction {
  type: AppActionEnum;
  data?: AppState;
  isLoggedIn?: boolean;
  isSuccess?: boolean;
  successMessage?: boolean;
  isError?: boolean;
  errorMessage?: string;
  loading?: boolean;
  isErrorModalVisible?: boolean; // use it just one time for appModal
  toggleMenu?: boolean;
  displayFooter?: boolean;
  displayOverlay?: boolean;
}

export enum AppActionEnum {
  INIT_IMPORT,
  IMPORT_SUCCESS,
  IMPORT_ERROR,
  END_IMPORT,
  SET_FOOTER,
  SET_OVERLAY,
  CLOSE_ERROR_MODAL,
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionEnum.INIT_IMPORT: {
      return {
        ...state,
        loading: true,
      };
    }
    case AppActionEnum.IMPORT_ERROR: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        isErrorModalVisible: true,
      };
    }
    case AppActionEnum.END_IMPORT: {
      return {
        ...state,
        loading: false,
      };
    }
    case AppActionEnum.SET_FOOTER: {
      return {
        ...state,
        loading: action.displayFooter,
      };
    }
    case AppActionEnum.SET_OVERLAY: {
      return {
        ...state,
        loading: action.displayOverlay,
      };
    }
    case AppActionEnum.CLOSE_ERROR_MODAL: {
      return {
        ...state,
        isErrorModalVisible: false,
      };
    }
  }
}
