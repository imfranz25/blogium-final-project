const errorHandler = (error) => {
  const status = error.response?.status;
  const type = 'error';
  let message = '';

  if (status === 401) {
    localStorage.clear();
    message = error.response?.data?.message;
  }

  if (status === 429) {
    message = error.response?.data?.message;
  }

  if (status === 403) {
    localStorage.clear();
    alert('Session Timeout');
    window.location.reload();
  }

  if (error.response?.status === 422) {
    message = error.response?.data?.errors[0].msg;
  }

  if (error.response?.status === 500) {
    message = error.response?.data?.error?.message;
  }

  return { type, message, status };
};

export default errorHandler;
