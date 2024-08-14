import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorElement() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page does not exist!</div>;
    }

    if (error.status === 401) {
      return <div>You are not authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}
