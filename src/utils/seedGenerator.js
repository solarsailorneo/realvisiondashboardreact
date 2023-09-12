export const genTokenData = (projectNum) => {
    let data = {};
    let hash = "0x";
  
    // Use the projectNum argument to seed the random number generator.
    // This will ensure that different projectNum values will result in different hashes.
    // Convert the uuid string into a numeric value using parseInt with radix 16
    let numericProjectNum = parseInt(projectNum, 16) % 16;
    for (let i = 0; i < 64; i++) {
      // This will use projectNum to offset the random value.
      hash += ((Math.floor(Math.random() * 16) + numericProjectNum) % 16).toString(16);
    }
    console.log(hash)
  
    data.hash = hash;
  
    return data;
}
