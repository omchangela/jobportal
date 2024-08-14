import { Briefcase, IndianRupee } from 'lucide-react';
import { useContext } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';

import toast from 'react-hot-toast';
import Header from '../../components/Header';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Text from '../../components/ui/Text';
import { AuthContext } from '../../store/authContext';
import getTimePassed from '../../utils/getTimePassed';
import styles from './styles/index.module.css';

export default function Job() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const data = useRouteLoaderData('job');
  const job = data.data.job;
  const { id } = useParams();

  const handleDeleteJob = async () => {
    const confirm = window.confirm('Are you sure you want to delete this job?');

    if (!confirm) {
      return;
    }

    const url = import.meta.env.VITE_SERVER_URL + '/api/v1/jobs/' + id;
    const token = JSON.parse(localStorage.getItem('user')).token;

    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (!res.ok) {
        switch (res.status) {
          case 401:
            throw new Error(
              'Your login session has expired. Please login again'
            );
          case 404:
            throw new Error('Rotute note found');
          default:
            throw new Error('Something went wrong');
        }
      }

      navigate('/');
      toast.success('Job post deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  let jobPostDuration;

  if (job.createdAt) {
    jobPostDuration = getTimePassed(job.createdAt);
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.title}>
          <p>
            {job.jobPosition} {job.jobType.toLowerCase()}{' '}
            {job.category.toLowerCase()} job/internship at {job.companyName}
          </p>
        </div>

        <div className={styles.info}>
          <div className={styles.metadata}>
            <Text>{jobPostDuration}</Text>
            <Text>•</Text>
            <Text>{job.jobType}</Text>
            <div className={styles.logo}>
              <img src={job.logo} alt="" />
            </div>
            <Text>{job.companyName}</Text>
          </div>

          <div className={styles.position}>
            <div>
              <Text step={9} weight="500">
                {job.jobPosition}
              </Text>
              <Text step={4} color="red">
                {job.location}
              </Text>
            </div>
            {authCtx.user && (
              <Link to="edit">
                <Button>Edit job</Button>
              </Link>
            )}
          </div>

          <div className={styles.details}>
            <div>
              <div className={styles.icon}>
                <IndianRupee size={20} />
                <Text step={3}>Stipend</Text>
              </div>
              <Text step={4}>{job.monthlySalary}</Text>
            </div>
            <div>
              <div className={styles.icon}>
                <Briefcase size={20} />
                <Text step={3}>Remote/Office</Text>
              </div>
              <Text step={4}>{job.category}</Text>
            </div>
          </div>

          <div className={styles.about}>
            <Text step={5} weight="500">
              About company
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              {job.about}
            </Text>
          </div>

          <div className={styles.description}>
            <Text step={5} weight="500">
              About the job/internship
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              {job.description}
            </Text>
          </div>

          <div className={styles.skills}>
            <Text step={5} weight="500">
              Skill(s) required
            </Text>
            <div className={styles.badge}>
              {job.skills.map((el, index) => (
                <Badge shape="pill" key={index}>
                  {el}
                </Badge>
              ))}
            </div>
          </div>

          <div className={styles.additional}>
            <Text step={5} weight="500">
              Additional Information
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              {job.information}
            </Text>
            {authCtx.user && (
              <div className={styles.deleteButton}>
                <Button
                  onClick={handleDeleteJob}
                  variant="outline"
                  style={{ color: 'var(--primary)' }}
                  type="button"
                >
                  Delete job
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
