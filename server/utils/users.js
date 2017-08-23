class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) { // my issue is id string or number
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const index =  this.users.findIndex( (user)=>user.id===id );
        return index===-1? null : this.users.splice(index,1)[0]; // careful splice(-1,1) works back from end of array
    }

    getUser(id) {
        const user =  this.users.find( (user)=>user.id===id );
        return user;
    }

    getUserList(room){
        const users = this.users.filter((user)=> user.room === room);
        const names = users.map((user)=> user.name );
        return names;
    }
}

module.exports = { Users };

// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)
