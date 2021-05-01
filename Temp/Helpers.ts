const isRegistred(phone: string): boolean => {
  console.log('Query to DB by phone if exist return true', phone)
  return true
}
const phone: string = '+380'
if (!isRegistred(phone)) {
  console.log('create user in db')
}
