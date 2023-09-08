import {DropdownOption} from '../components/Dropdown';

export const mapStringArrayToOptions = (
  items?: Array<string>,
): Array<DropdownOption> => {
  if (!items) {
    return [];
  }

  return [
    {label: 'All', value: ''},
    ...items.map(item => ({
      label: item.toUpperCase(),
      value: item.toLowerCase(),
    })),
  ];
};
