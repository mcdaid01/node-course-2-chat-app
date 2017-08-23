const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {

    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:"1",name:"Mike",room:"Node course"
        },{
            id:"2",name:"John",room:"React course"
        },{
            id:"3",name:"Pete",room:"Node course"
        }];
    });

    it ("should add new user",()=>{
        var users = new Users();
        const user = {
            id: "123",
            name: "Mike",
            room: "pigs"
        };
    
        const resUser = users.addUser(user.id, user.name, user.room);
    
        expect(users.users).toEqual([user]);
    });

    it ("should return names for node course",()=>{
        const arr = users.getUserList("Node course");
        expect(arr).toEqual(["Mike","Pete"]); 
    });

    it ("should return names for react course",()=>{
        const arr = users.getUserList("React course");
        expect(arr).toEqual(["John"]); 
    });

    it ("should remove a user",()=>{
        const userId = "3";
        const user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2); 
    });

    it ("should not remove a user",()=>{ // this was worthwhile as didn't realise splice(-1,1) takes last element
        const user = users.removeUser(5);
        expect(users.users.length).toBe(3); 
    });

    it ("should not find a user",()=>{
        const user = users.removeUser("5");
        expect(user).toBe(null);
    });

    it ("should return a user based on id",()=>{
        const userId = "2";
        const user = users.getUser(userId);

        expect(user.id).toBe(userId); 
    });
    
})

