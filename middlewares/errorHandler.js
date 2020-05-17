
const errorHandler = (error, req, res) => {
  if (error.name === 'CastError') {
    res.status(400).send({ message: error.message });
    return;
  }
  if (error.name === 'Error') {
    res.status(404).send({ message: error.message });
    return;
  }
  if (error.name === 'ValidationError') {
    res.status(400).send({ message: error.message });
    return;
  }

  res.status(500).send({ message: error.message });
};
module.exports = { errorHandler };
