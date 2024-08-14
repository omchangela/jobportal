import JobForm from '../../components/JobForm';
import JobUpdatePage from '../../components/JobUpdatePage';

export default function AddJob() {
  return (
    <div className="">
      <JobUpdatePage>
        <JobForm />
      </JobUpdatePage>
    </div>
  );
}
