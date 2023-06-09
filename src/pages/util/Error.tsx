import { isRouteErrorResponse, useRouteError } from "react-router-dom";


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let message;
  if (error instanceof Error) {
    message = error.message;
  } else if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else {
    message = String(error);
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}