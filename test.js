const outerFunction = (name, callback) => {
  if (name.length < 5) {
    //error scream
    callback('Length to short for name', undefined);
  } else {
    callback(undefined, name.toUpperCase());
  }
};

outerFunction('Daniel', (error, data) => {
  if (error) {
    console.log('ERROR!!!!!', error);
  } else {
    console.log('UpperCased', data);
  }
});
