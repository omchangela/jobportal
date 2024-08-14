import { Link } from 'react-router-dom';
import { IndianRupee, MapPin } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

import styles from './styles/JobCard.module.css';
import { Badge, Button, Text } from '../../components/ui/index';

export default function JobCard({ job, authCtx }) {
  return (
    <div className={styles.job}>
      <div className={styles.jobLogo}>
        <img src={job.logo} alt={job.companyName} />
      </div>

      <div className={styles.jobInfo}>
        <Text step={5} weight="500">
          {job.jobPosition}
        </Text>
        <div className="">
          <div className={styles.logoText}>
            <IndianRupee size={20} />
            <Text>{job.monthlySalary}</Text>
          </div>
          <div className={styles.logoText}>
            <MapPin size={20} />
            <Text>{job.location}</Text>
          </div>
        </div>
        <div className="">
          <Text color="red">{job.jobType}</Text>
          <Text color="red">{job.category}</Text>
        </div>
      </div>

      <div className={styles.rightBlock}>
        <div className={styles.skills}>
          {job.skills.slice(0, 3).map((skill, index) => (
            <Badge shape="pill" key={index}>
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <>
              <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content={job.skills.slice(3).join(', ')}
              >
                <Badge>+{job.skills.length - 3}</Badge>
              </div>
              <Tooltip id="my-tooltip" />
            </>
          )}
        </div>

        <div className="">
          {authCtx.user && (
            <Link to={`/jobs/${job._id}/edit`}>
              <Button variant="outline" style={{ color: 'red' }}>
                Edit Job
              </Button>
            </Link>
          )}
          <Link to={`/jobs/${job._id}`}>
            <Button>View details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
