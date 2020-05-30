import React from 'react';

import {
  DatePicker,
  DayOfWeek,
  IDatePickerStrings,
} from '@fluentui/react/lib/DatePicker';

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
};

interface Props {
  placeholder: string;
  value?: number | null;
  onSelectDate?: (date: Date | null | undefined) => void;
  label: string;
}

export const FormDatePicker: React.FunctionComponent<Props> = (props) => {
  const { value, placeholder, onSelectDate, label } = props;
  return (
    <DatePicker
      label={label}
      firstDayOfWeek={DayOfWeek.Monday}
      strings={DayPickerStrings}
      onSelectDate={onSelectDate}
      value={value && value > 0 ? new Date(value) : undefined}
      placeholder={placeholder}
      ariaLabel={placeholder}
    />
  );
};
