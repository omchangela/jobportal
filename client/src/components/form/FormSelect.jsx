import { Listbox } from '@headlessui/react';

import styles from './styles/FormSelect.module.css';
import { useState } from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { Text } from '../ui';

export default function FormSelect({ options, onChange, index = 0 }) {
  const [selectedOption, setSelectedOption] = useState(options[index]);

  return (
    <Listbox
      by="id"
      value={selectedOption}
      onChange={(e) => {
        onChange(e.name);
        setSelectedOption(e);
      }}
    >
      <div className={styles.selectBox}>
        <Listbox.Button className={styles.button}>
          <span className={styles.selectedName}>{selectedOption?.name}</span>
          <span className={styles.iconButton}>
            <ChevronsUpDownIcon size={20} aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className={styles.options}>
          {options.map((option) => (
            <Listbox.Option
              className={styles.option}
              key={option.id}
              value={option}
              disabled={option.unavailable}
            >
              {({ active, selected }) => (
                <div className={`${active ? styles.isActive : ''}`}>
                  <div className={styles.icon}>
                    {selected && <CheckIcon color="green" />}
                  </div>
                  <Text>{option.name}</Text>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
