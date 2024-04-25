const sendResponse = (res, data) => {
  const responseData = {
    status: data.status,
    statusType: data.statusType,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  };
  res.status(data.status).json(responseData);
};

module.exports = sendResponse;
