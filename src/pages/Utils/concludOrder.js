import firebase from '../../Utils/firebase';

const conclud = (item) => {
  firebase
    .firestore().collection('Orders').doc(item.id).update({
      status: 'concluded',
      timeConclud: new Date(),
    })
}

export default conclud
