
const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case 'CastError':
      res.status(400).send({ message: error.message });
      break;
    case 'Error':
      res.status(404).send({ message: error.message });
      break;
    case 'ValidationError':
      res.status(400).send({ message: error.message });
      break;
    case 'Unauthorised':
      res.status(401).send({ message: error.message });
      break;
    default:
      res.status(500).send({ message: error.message });
      break;
  }

  next();
};
module.exports = { errorHandler };
