const errorHandler = (error, navigate) => {
  const status = error.response?.status;
  const type = 'error';
  let message;

  if (status === 401) {
    localStorage.clear();
    message = error.response?.data?.message;
  }

  if (status === 429) {
    alert(error.response?.data?.message);
  }

  if (status === 403) {
    alert('Session Timeout');
    localStorage.clear();
    navigate('/login');
  }

  if (error.response?.status === 422) {
    message = error.response?.data?.errors[0].msg;
  }

  if (error.response?.status === 500) {
    alert(error.response?.data?.error?.message);
  }

  return { type, message, status };
};

export default errorHandler;
