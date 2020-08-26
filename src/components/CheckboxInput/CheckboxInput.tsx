import React,
{
  FC,
  ChangeEvent,
  FocusEvent,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import FormLabel from '../FormLabel/FormLabel';
import styles from './CheckboxInput.module.scss';

interface Props {
  /**
   * The id attribute of the input
   */
  id: string;
  /**
   * The checkbox input "checked" attribute
   */
  isChecked: boolean;
  /**
   * Callback function when input is changed
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Custom content to be displayed to right of checkbox.
   */
  label: string;
  /**
   * Determines if the label is not shown for stylistic reasons.
   * Note the label is still a required prop and will be used as the aria-label for accesibility reasons.
   */
  hideLabel?: boolean;
  /**
   * Determines if the checkbox should be rendered with display: inline;
   */
  displayInline?: boolean;
  /**
   * Additional classes to add
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  error?: ReactNode;
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required)
   */
  isRequired?: boolean;
  /**
   * Callback function when input is blurred.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function when input is focused
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

const CheckboxInput: FC<Props> = ({
  id,
  isChecked,
  onChange,
  label,
  hideLabel = false,
  displayInline = false,
  className,
  error = false,
  isDisabled = false,
  isRequired = false,
  onBlur,
  onFocus,
}) => {
  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (onBlur) onBlur(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    if (onFocus) onFocus(event);
  };

  const wrapperClasses = classNames(
    styles.checkbox,
    className,
    { [styles.disabled]: isDisabled },
    { [styles.inline]: displayInline },
  );

  const inputProps = {
    'aria-invalid': !!error,
    'aria-label': label,
    'aria-labelledby': label ? `${id}Label` : undefined,
    id,
    checked: !!isChecked,
    disabled: isDisabled,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    type: 'checkbox',
    className: styles.input,
  };

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    hasError: !!error,
    isDisabled,
  };

  return (
    <>
      <div className={wrapperClasses}>
        <input {...inputProps} />
        {label && !hideLabel && (
          <FormLabel {...labelProps}>
            {label}
          </FormLabel>
        )}
      </div>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </>
  );
};

export default CheckboxInput;