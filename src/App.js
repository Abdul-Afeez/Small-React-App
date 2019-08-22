import React from 'react';
import Input from './components/input/Input'
import Select from './components/select/Select'
import './App.css';
import UserService from './services/UserService';
import QueryService from './services/QueryService';
import Countries from './constants/countries'
class App extends React.Component {
  state = {
    users: [],
    userBackUp: [],
    newUser: {},
  }
  userService;
  queryService;
  countries = Countries;
 componentDidMount() {
    this.userService = new UserService();
    this.queryService = new QueryService();
      const users = this.userService.fetchUsers();
    this.setState({users: users? users : [], userBackUp: users});
  }
 updateUserData(event) {
  const user = {...this.state.newUser};
  user[event.target.name] = event.target.value;
  this.setState({newUser: user})
 }
 getTerm(event) {
  const term = event.target.value.trim(); 
  if(!term) {
    this.setState({users: [...this.state.userBackUp]})
    return '';
  }
  return term;
 }
 
 /*
 @param event
 Search by name, email, country, phone number, date of birth
 */
 search(event) {
  const {highlighted_users} = this.queryService.searchUsers(this.getTerm(event), [...this.state.userBackUp]);
  this.setState({users: highlighted_users});
 }

 filter(event) {
  const indexes = this.queryService.indexUserForSearch(this.getTerm(event).toLocaleLowerCase(), [...this.state.userBackUp]);
  this.setState({users: [...this.state.userBackUp].filter((e, i) => indexes.has(i))})
 }

 handleSubmit(e) {
   e.preventDefault();
   this.reset();
   this.queryService.indexUserForSearch('', [...this.state.users]);
    const {userBackUp} = {...this.state};
    userBackUp.push(this.state.newUser);
    this.setState({users: userBackUp, userBackUp: userBackUp, newUser: {}});
    this.userService.persistUsers(userBackUp);
 }

 deleteUser(userId) {
  let userBackUp = [...this.state.userBackUp];
  userBackUp = userBackUp.filter((e, i) => i !== userId);
  this.setState({users: userBackUp, userBackUp: userBackUp});
  this.userService.persistUsers(userBackUp);
 }
 reset () {
  this.myFormRef.reset();
}

 render() {
  return (
    <div style={{'fontSize': '11px'}} className="Abel col-md-10 mx-auto">
      <div className="row justify-content-center">
        <div className="col-md-6">
              <form ref={(el) => this.myFormRef = el} onSubmit={(e) => this.handleSubmit(e)}>
                <Input name ="name" type="text" placeholder="Name" onChange={(e) => this.updateUserData(e)}  />
                <Input name="email" type="email" placeholder="Email" onChange={(e) => this.updateUserData(e)}/>
                <Input name="phone" type="digit" placeholder="Phone Number" onChange={(e) => this.updateUserData(e)}/>
                <Select name="country" data={{raw: this.countries, key: 'abbreviation', value: 'country', placeholder:'Choose Country'}} onChange={(e) => this.updateUserData(e)}/>
                <Input name="dob" type="date" placeholder="Date of Birth" onChange={(e) => this.updateUserData(e)}/>
                <div className="text-center mt-2">
                  <button>Add User</button>
                </div>
              </form>
         </div>
         <div className="col-md-6">
          <div className="row">
              <div className="col-6">
                <Input name="search" type="text" placeholder="Search" onChange={(e) => this.filter(e)}/>
              </div>
              <div className="col-6">
                <Input name="search" type="text" placeholder="Filter" onChange={(e) => this.search(e)}/>
              </div>
            </div>
            <table className="table table-stripped text-secondary">
              <tbody>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>DOB</th>
                <th>Action</th>
              </tr>
              {this.state.users.map((user, i) => {
               return <tr key={user.name}>
                  <th>{i + 1}</th>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th>{user.phone}</th>
                  <th>{user.country}</th>
                  <th>{user.dob}</th>
                  <th>
                  <button type="button"  onClick={() => this.deleteUser(i)} className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </th>
                </tr>
              })}
              </tbody>
            </table>

         </div> 
        </div>
        <div>
          
        </div>

      </div>
    
  );
 }
}

export default App;
