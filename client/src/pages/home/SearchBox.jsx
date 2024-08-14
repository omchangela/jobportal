import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { Badge, Button, Input, Text } from '../../components/ui/index';
import SelectedTag from './SelectedTag';
import styles from './styles/SearchBox.module.css';
import { AuthContext } from '../../store/authContext';

const skills = [
  { id: 1, name: 'React', unavailable: false },
  { id: 2, name: 'AWS', unavailable: false },
  { id: 3, name: 'Azure', unavailable: false },
  { id: 4, name: 'CSS', unavailable: false },
  { id: 5, name: 'Javascript', unavailable: false },
  { id: 6, name: 'Svelte', unavailable: false },
  { id: 7, name: 'Java', unavailable: false },
  { id: 8, name: 'SQL', unavailable: false },
];

export default function SearchBox({ setParamsObj }) {
  const authCtx = useContext(AuthContext);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');

  const skillsString = selectedSkills.map((skill) => skill.name).join(',');

  const handleSubmit = (e) => {
    console.log('Submit');
    e.preventDefault();
    setParamsObj({
      jobPosition: e.target.jobPosition.value ?? '',
      skills: skillsString,
    });
  };

  const removeSkill = (skill) => {
    const filteredSkills = selectedSkills.filter((el) => el.id !== skill.id);
    setSelectedSkills(filteredSkills);
  };

  const filteredSkills =
    query === ''
      ? skills
      : skills.filter((skill) => {
          return skill.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Input
          input={input}
          setInput={setInput}
          name="jobPosition"
          variant="large"
          label="jobPosition"
          placeholder="Type any job title"
        ></Input>

        <div className={styles.selectGroup}>
          <Combobox
            value={selectedSkills}
            by="id"
            onChange={setSelectedSkills}
            multiple
            nullable
          >
            <div className={styles.combobox}>
              <div className={styles.comboSearch}>
                <Combobox.Input
                  onChange={(event) => setQuery(event.target.value)}
                  displayValue={(skill) => skill.name}
                  placeholder="Filter by skills"
                />

                <Combobox.Button>
                  <ChevronsUpDownIcon
                    size={20}
                    color="gray"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>

              <Combobox.Options className={styles.comboOptions}>
                {query.length > 0 && (
                  <Combobox.Option
                    className={styles.customComboOption}
                    value={{ id: null, name: query }}
                  >
                    {({ active }) => (
                      <div className={`${active ? styles.isActive : ''}`}>
                        <Text>
                          Add <span style={{ fontWeight: '500' }}>{query}</span>
                        </Text>
                      </div>
                    )}
                  </Combobox.Option>
                )}
                {filteredSkills.map((skill) => (
                  <Combobox.Option
                    key={skill.id}
                    value={skill}
                    disabled={skill.unavailable}
                    className={styles.comboOption}
                  >
                    {({ active, selected }) => (
                      <div className={`${active ? styles.isActive : ''}`}>
                        <div className={styles.icon}>
                          {selected && <CheckIcon color="green" />}
                        </div>
                        <Text>{skill.name}</Text>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>

          <div className={styles.selected}>
            {selectedSkills.length > 0 &&
              selectedSkills.slice(0, 3).map((el) => (
                <SelectedTag onClick={removeSkill} key={el.id}>
                  {el}
                </SelectedTag>
              ))}

            {selectedSkills.length > 3 && (
              <Badge>{selectedSkills.length - 3} more</Badge>
            )}
          </div>

          <button
            className={styles.clearButton}
            type="button"
            onClick={() => {
              setQuery('');
              setInput('');
              setSelectedSkills([]);
            }}
            style={{ color: 'red' }}
          >
            Clear
          </button>
        </div>

        <div className={styles.formButtons}>
          <Button variant="outline" style={{ color: 'red' }}>
            Search
          </Button>
          {authCtx.user && (
            <Link to="/jobs/post">
              <Button type="button">+ Add Job</Button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
