

 // PARA ADD
    // firebase.firestore().collection("users").add({
    //   first: "Ada",
    //   last: "Lovelace", 
    //   born: 1815
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
  

    // PARA LER
  // firebase.firestore().collection('breakfast').doc('0')
  // .get().then((doc => {
  //   console.log(doc.data());
  // })); 

  const allday = firebase.firestore().collection('allDay').doc('item').collection('Hambúrgueres');
  let arr = [];

  allday.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        arr.push(`${doc.id} => ${doc.data().name}`);
    });
    console.log(arr);
  });





//   HOOKS

  const [algo, setAlgo] = useState({});


  useEffect(() => {

  }, []);
 