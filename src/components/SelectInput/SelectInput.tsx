import React, { FC, FocusEvent } from 'react';
import classNames from 'classnames';
import Select, { ValueType, OptionTypeBase, FocusEventHandler } from 'react-select';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import styles from './SelectInput.module.scss';

interface SimulatedEventPayload {
  target: {
    name: string;
    value: ValueType<OptionTypeBase>;
  };
}

interface Props {
  /**
   * The id attribute of the input
   */
  id: string;
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: string;
  /**
   * Callback function to call on change event.
   */
  onChange: (event: SimulatedEventPayload) => void;
  /**
   * Options for dropdown list
   */
  options: {
    value: string;
    label: string;
  }[];
  /**
   * The value(s) of select
   */
  value: any | any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Visually hide the label
   */
  hideLabel?: boolean;
  /**
   * Additional classes to add
   */
  className?: string;
  /**
   * Placeholder
   */
  placeholder?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  error?: React.ReactNode;
  /**
   * If the input value is clearable programmatically
   */
  isClearable?: boolean;
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required)
   */
  isRequired?: boolean;
  /**
   * Select 'name' attribute
   */
  name?: string;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  /**
   * Callback function to call on blur event.
   */
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  /**
   * Autofocus select input on render
   */
  autoFocus?: boolean;
  /**
   * Is multi select enabled
   */
  isMulti?: boolean;
}

const SelectInput: FC<Props> = ({
  id,
  label,
  className,
  placeholder,
  error = false,
  hideLabel = false,
  isClearable = false,
  isDisabled = false,
  isRequired = false,
  name = '',
  onChange,
  onFocus = null,
  onBlur = null,
  autoFocus = false,
  isMulti = false,
  options,
  value,
}) => {
  const handleChange = (values: ValueType<OptionTypeBase>) => {
    const simulatedEventPayload: SimulatedEventPayload = {
      target: {
        name,
        value: values,
      },
    };

    onChange(simulatedEventPayload);
  };

  const handleFocus: FocusEventHandler = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur: FocusEventHandler = e => {
    if (onBlur) onBlur(e);
  };

  const wrapperClasses = classNames(
    'select-input-wrapper',
    className,
    { [styles.disabled]: isDisabled },
  );

  const inputClasses = classNames(
    'react-select',
    { [styles.error]: error },
  );

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    hasError: !!error,
    className: styles['select-input-label'],
    isDisabled,
  };

  return (
    <div className={wrapperClasses}>
      {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      <Select
        inputId={id}
        aria-label={label}
        aria-labelledby={label && !hideLabel ? `${id}Label` : undefined}
        className={inputClasses}
        classNamePrefix="react-select"
        placeholder={placeholder}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        name={name}
        autoFocus={autoFocus}
        options={options}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
      />
      {error && typeof error !== 'boolean' && <InputValidationMessage>{error}</InputValidationMessage>}
    </div>
  );
};

export default SelectInput;