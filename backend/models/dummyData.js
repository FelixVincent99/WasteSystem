const db = require("./index");
const User = db.users;
const Role = db.roles;
const Truck = db.trucks;
const Manpower = db.manpowers;
const Area = db.areas;

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

    Truck.create({
        truckNo: "QAB123",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",

    })

    Truck.create({
        truckNo: "QBC456",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",

    })

    Truck.create({
        truckNo: "QCD789",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",

    })

    Truck.create({
        truckNo: "QEF246",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",

    })

    Truck.create({
        truckNo: "QGH357",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",

    })

    Manpower.create({
        mpName: "Adam",
        mpAge: "22",
        role: "1",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Bryant",
        mpAge: "23",
        role: "1",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Clement",
        mpAge: "24",
        role: "1",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Dickson",
        mpAge: "25",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Edmund",
        mpAge: "26",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Fredrick",
        mpAge: "27",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "George",
        mpAge: "28",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Halix",
        mpAge: "29",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Jacky",
        mpAge: "30",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Kris",
        mpAge: "20",
        role: "1",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Manpower.create({
        mpName: "Leonard",
        mpAge: "21",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
    })
    Area.create({
        areaCode: "MHH1",
        status: "1",
    })
    Area.create({
        areaCode: "MHH2",
        status: "1",
    })
    Area.create({
        areaCode: "MHH3",
        status: "1",
    })
    Area.create({
        areaCode: "DHH1",
        status: "1",
    })
    Area.create({
        areaCode: "DHH2",
        status: "1",
    })
    Area.create({
        areaCode: "DHH3",
        status: "1",
    })
    Area.create({
        areaCode: "MPP1",
        status: "1",
    })
    Area.create({
        areaCode: "MPP2",
        status: "1",
    })
    Area.create({
        areaCode: "MPP3",
        status: "1",
    })
});

module.exports = initialDBSetup;