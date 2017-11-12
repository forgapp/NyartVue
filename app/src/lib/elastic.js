import { auth, firestore } from './firebase';

let key = null; // 'Rm9yZ0FkbWluOmltYnRrbmM5ajNoaGluY3hrY2Rq';

function getKey() {
  if (key) {
    return Promise.resolve(key);
  }

  return firestore.collection('Users')
    .doc(auth.currentUser.uid)
    .get()
    .then(doc => {
      const { Permissions } = doc.data();
      key = Permissions.elasticKey;

      return key;
    });
}

class Elastic {
  constructor() {
    this.baseUrl = process.env.ELASTIC_URL || 'https://first-cluster-8947855740.us-west-2.bonsaisearch.net';
  }

  setIndex(index) {
    this.index = index;
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  query(queryString) {
    this.queryString = queryString;
    return this;
  }

  size(sizeLimit) {
    this.sizeLimit = sizeLimit;
    return this;
  }

  async search() {
    const elasticKey = await getKey();
    const { index, type, sizeLimit, queryString } = this;
    const saneIndex = index ? index + '/' : '';
    const saneType = type ? type + '/' : '';
    const sizeClause = sizeLimit ? `&size=${sizeLimit}` : '';
    const results = fetch(`${this.baseUrl}/${saneIndex}${saneType}_search?q=${queryString}${sizeClause}`, {
      headers: {
        'Authorization': `Basic ${elasticKey}`
      }
    }).then(res => res.json());

    return results;
  }

  async searchWithBody() {
    const elasticKey = await getKey();
    const { index, type } = this;
    const saneIndex = index ? index + '/' : '';
    const saneType = type ? type + '/' : '';
    const results = fetch(`${this.baseUrl}/${saneIndex}${saneType}_search`, {
      method: 'POST',
      body: JSON.stringify(this.queryString),
      headers: {
        'Authorization': `Basic ${elasticKey}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    return results;
  }
}

export default Elastic;
