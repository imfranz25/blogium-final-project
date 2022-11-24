const errorHandler = (error, navigate) => {
  const status = error.response?.status;

  if (status === 401) {
    alert(error.response?.data?.message);
    localStorage.clear();
    navigate('/login');
  }

  if (status === 403) {
    alert('Session Timeout');
    localStorage.clear();
    navigate('/login');
  }

  if (error.response?.status === 422) {
    alert(error.response?.data?.errors[0].msg);
  }

  if (error.response?.status === 500) {
    alert(error.response?.data?.error?.message);
  }
};

export default errorHandler;
