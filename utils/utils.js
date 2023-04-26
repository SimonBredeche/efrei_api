import bcrypt from "bcrypt"

export async function hashedPassword(pass){
    const password = pass;
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
}

export function isValidPassword(inputPsw,hash){
  return bcrypt.compareSync(inputPsw, hash);

}

export function formatDate(date){
  let dateTmp = new Date(date);
  return dateTmp.toISOString().replace(/T/, ' ').replace(/\..+/, '') 
}

export function stringToDate(str){
  let date = new Date(str)
  let userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
}
