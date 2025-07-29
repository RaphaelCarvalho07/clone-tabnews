import retry from "async-retry";

const fetchStatusPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/status`);

  if (res.status !== 200) {
    throw Error();
  }
};

const waitForWebServer = async () => {
  return retry(fetchStatusPage, {
    retries: 100,
    maxTimeout: 1000,
  });
};

const waitForAllServices = async () => {
  await waitForWebServer();
};

export default {
  waitForAllServices,
};
