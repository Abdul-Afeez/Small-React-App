export default class {
    
 indexUserForSearch(terms, users) {
   terms = terms === '' ? '-' : terms;
   const userBackUp = [...users];
   const result = new Map();
   userBackUp.map((user) => Object.values(user).join('-').toLocaleLowerCase()).forEach((user, ind) => {
     if( user.indexOf(terms) >= 0) {
       result.set(ind, ind)
     }
   });
   return result;
  }

  searchUsers(term, users) {
      if(term === '') {
          return;
      }
    [...users].forEach((user) => {
    const u = {...user}; // to defeat JavaScript Shallow Copy Bug
    for(let key in user) {
      if(u.hasOwnProperty(key)) {
        const word = ''+ u[key];
        const term_reg = new RegExp(term, 'gi')
        u[key] = word.replace(term_reg, `(${term})`)
      }
    }
    return u;
  })
  }
 
}