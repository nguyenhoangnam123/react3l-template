import React, { RefObject } from "react";
import "./AdvanceStringFilter.scss";
import { Model } from "@react3l/react3l/core/model";
import classNames from "classnames";

interface AdvanceStringFilter<T extends Model> {
  value?: string;
  title?: string;
  isError?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  onChange?: (T: string) => void;
  onBlur?: (T: string) => void;
}

function AdvanceStringFilter(props: AdvanceStringFilter<Model>) {
  const { value, title, disabled, placeHolder, onChange, onBlur } = props;

  const [internalValue, setInternalValue] = React.useState<string>("");

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null,
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      if (typeof onChange === "function") {
        onChange(event.target.value);
      }
    },
    [onChange],
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setInternalValue("");
      if (typeof onBlur === "function") {
        onBlur(null);
      }
      inputRef.current.focus();
    },
    [onBlur],
  );

  const handleKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        event.keyCode === 13 &&
        // event.currentTarget.value &&
        typeof onBlur === "function"
      ) {
        onBlur(event.currentTarget.value);
      }
    },
    [onBlur],
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (event.target.value && typeof onBlur === "function") {
        onBlur(event.target.value);
      }
    },
    [onBlur],
  );

  React.useEffect(() => {
    if (value) {
      setInternalValue(value);
    } else {
      setInternalValue("");
    }
  }, [value]);

  return (
    <>
      <div className='advance-string-filter__container'>
        {title && <div className='advance-string-filter__title'>{title}</div>}
        <div className='advance-string-filter__wrapper'>
          <input
            type='text'
            value={internalValue}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            placeholder={placeHolder ? placeHolder : "Nhập dữ liệu..."}
            ref={inputRef}
            disabled={disabled}
            className={classNames(
              "component__input",
              "component__input--bordered",
            )}
          />
          {internalValue && (
            <i
              className='advance-string-filter__icon tio-clear'
              onClick={handleClearInput}
            ></i>
          )}
        </div>
      </div>
    </>
  );
}

AdvanceStringFilter.defaultProps = {
  disabled: false,
};

export default AdvanceStringFilter;
