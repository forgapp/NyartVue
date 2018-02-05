function transformPhones(phones) {
  if (!phones) {
    return [];
  }

  return phones.map(phone => phone.Number);
}

function transformEmails(emails) {
  if (!emails) {
    return [];
  }

  return emails.map(email => email.Address);
}

function removeRef(info) {
  return Object.keys(info)
    .filter(key => key.toLowerCase() !== 'ref')
    .reduce((aggr, current) => {
      return Object.assign({}, aggr, { [current]: info[current] });
    }, {});
}

module.exports = {
  transformPhones,
  transformEmails,
  removeRef
};
