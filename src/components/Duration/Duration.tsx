import { FC, createElement } from 'react';
import classNames from 'classnames';
import { getElementType } from '../../lib/getElementType';

export interface DurationProps {
  /**
   * Number of milliseconds in this duration.
   */
  milliseconds?: number;
  /**
   * Number of seconds in this duration.
   */
  seconds?: number;
  /**
   * Number of minutes in this duration.
   */
  minutes?: number;
  /**
   * The element type to be rendered.
   */
  as?: string;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
  /**
   * Additional class names to add.
   */
  className?: string;
  /**
   * When rounding to the nearest second, minute, hour, or day, round up.
   */
  roundUp?: boolean;
  /**
   * The control will display seconds until this number of milliseconds is reached, then minutes are used.
   */
  displayMinutes?: number;
  /**
   * The control will display minutes until this number of milliseconds is reached, then hours are used.
   */
  displayHours?: number;
  /**
   * The control will display hours until this number of milliseconds is reached, then days are used.
   */
  displayDays?: number;
}

export const Duration: FC<DurationProps> = ({
  milliseconds = 0,
  seconds = 0,
  minutes = 0,
  as = 'span',
  displayMinutes = 60000, // 1 minute
  displayHours = 3600000, // 1 hours
  displayDays = 86400000, // 24 hours
  roundUp = true,
  className,
  ...restProps
}) => {
  const totalMilliseconds = milliseconds + seconds * 1000 + minutes * 60000;
  let number = 1;
  let label = '';

  const rounding = roundUp ? Math.ceil : Math.floor;

  if (totalMilliseconds < displayMinutes) {
    number = rounding(totalMilliseconds / 1000);
    label = number > 1 ? 'seconds' : 'second';
  } else if (totalMilliseconds < displayHours) {
    number = rounding(totalMilliseconds / 60000);
    label = number > 1 ? 'minutes' : 'minute';
  } else if (totalMilliseconds < displayDays) {
    number = rounding(totalMilliseconds / 3600000);
    label = number > 1 ? 'hours' : 'hour';
  } else {
    number = rounding(totalMilliseconds / 86400000);
    label = number > 1 ? 'days' : 'day';
  }

  const element = getElementType(Duration, { as });
  const classes = classNames(className);

  return createElement(element, { className: classes, ...restProps }, `${number.toLocaleString()} ${label}`);
};
