const db = require("./index");
const User = db.users;
const Role = db.roles;

const initialDBSetup = (()=> {
    Role.create({
        id: 1,
        name: "admin",
        status: "1"
    });
    
    Role.create({
        id: 2,
        name: "manager",
        status: "1"
    });
    
    Role.create({
        id: 3,
        name: "supervisor",
        status: "1"
    });

    User.create({
        name: "admin",
        email: "admin@mail.com",
        password: "$2a$10$0jpuTlqsZ58N2.Vt2wwMV.4ONX15Zxmys76GTke6/joULAdIG0ZL6", //abc123
        role: "1",
        status: "1"
    })

    User.create({
        name: "manager",
        email: "manager@mail.com",
        password: "$2a$10$0jpuTlqsZ58N2.Vt2wwMV.4ONX15Zxmys76GTke6/joULAdIG0ZL6", //abc123
        role: "2",
        status: "1"
    })

    User.create({
        name: "supervisor",
        email: "supervisor@mail.com",
        password: "$2a$10$0jpuTlqsZ58N2.Vt2wwMV.4ONX15Zxmys76GTke6/joULAdIG0ZL6", //abc123
        role: "3",
        status: "1"
    })
});

module.exports = initialDBSetup;