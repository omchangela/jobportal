import { Icon } from '@iconify/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { AuthContext } from '../../store/authContext';
import JobCard from './JobCard';
import styles from './styles/Jobs.module.css';
import { Text } from '../../components/ui';

export default function Jobs({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState();
  const authCtx = useContext(AuthContext);
  console.log(params);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/jobs?jobPosition=${
          params.jobPosition ?? ''
        }&skills=${params.skills ?? ''}`
      );

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await res.json();
      setJobs(resData.data.jobs);
    } catch (error) {
      setError(true);
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  let content;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <Icon
          style={{ fontSize: '48px' }}
          icon="svg-spinners:blocks-wave"
          color="#ed5353"
        />
      </div>
    );
  } else if (error) {
    content = (
      <div className={styles.error}>
        <Text color="red" step={4}>
          Could not fetch jobs
        </Text>
      </div>
    );
  } else {
    content = (
      <div className={styles.jobsCollection}>
        {jobs?.map((job) => (
          <JobCard key={job._id} job={job} authCtx={authCtx} />
        ))}
      </div>
    );
  }

  return <div className={styles.container}>{content}</div>;
}
