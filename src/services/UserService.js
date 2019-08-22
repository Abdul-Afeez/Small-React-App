export default class {
 persistUsers(userBackUp) {
    setTimeout(()=> !!localStorage.setItem('USERS', JSON.stringify(userBackUp)), 0); // parse this execution of the call stack to the Web API asychronously
   }
   fetchUsers() {
     return JSON.parse(localStorage.getItem('USERS'))
   }
  
}