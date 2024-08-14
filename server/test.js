const bcrypt = require('bcrypt');

const createHash = async pass => {
  const hash = await bcrypt.hash(pass, 12);
  return hash;
};

const validate = async (pass, hash) => {
  const res = await bcrypt.compare(pass, hash);
  console.log(res);
};

createHash('pass1234').then(hash => validate('pass1234', hash));
