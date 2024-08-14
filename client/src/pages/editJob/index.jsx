import { useParams, useRouteLoaderData } from 'react-router-dom';
import JobForm from '../../components/JobForm';
import JobUpdatePage from '../../components/JobUpdatePage';

export default function EditJob() {
  const data = useRouteLoaderData('job');
  const job = data.data.job;
  const { id } = useParams();

  return (
    <JobUpdatePage>
      <JobForm
        jobDetails={job}
        action="Update job"
        submitText="Updating job..."
        toastMessage="Successfully updated job"
        id={id}
        method="PUT"
      />
    </JobUpdatePage>
  );
}
