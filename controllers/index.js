const { User, Product, Session, Reservation } = require("../models");
const { comparePassword } = require("../helpers/bcryptHelper");
const { signToken } = require("../helpers/jwtHelper");
const MIDTRANS_SERVER_KEY = "SB-Mid-server-q9TOXYoktaTbRhC6hr_g2dq_";
const midtransClient = require('midtrans-client');

class Controller {
    static async register(req, res, next) {
        try {
            const {username, email, password, pageName,
                pageDescription, imgAttachment} = req.body;
            const newUser = await User.create({username, email, password, pageName,
                pageDescription, imgAttachment});
            res.status(201).json({message: `User @${newUser.username} registration success`})
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body;
            if (!email) throw {name: "NullEmail"};
            if (!password) throw {name: "NullPassword"};

            const targetUser = await User.findOne({
                where: {email}
            })
            if (!targetUser) throw {name: "InvalidEmailPassword"};

            const isPasswordValid = comparePassword(password, targetUser.password);
            if (!isPasswordValid) throw {name: "InvalidEmailPassword"}

            const access_token = signToken({
                id: targetUser.id,
                username: targetUser.username,
                email: targetUser.email
            });

            res.status(200).json({access_token})
        } catch (err) {
            next(err)
        }
    }

    static async getAvailability(req, res, next) {
        /**
         * 0. Siapin object kyk atas yg isinya full (start from today)
         * 1. Ambil reservasi dari username, order by date
         * 2. For each date, ambil product & session, delete product-session-date tsb di object yg full
         * 3. Kita dapet object available
        */

        try {
            const {username} = req.params;
            const {month, year} = req.query;

            // Prepares array of dates from today until the end of the month
            const date = new Date();
            let lastDate = 31;
            // let lastDate = (new Date(date.getFullYear(), date.getMonth() + 1, 0, 8)).getDate();
            let startDate = date.getDate();
            if (month) { 
                startDate = 1
                // lastDate = (new Date(year, month + 1, 0, 8)).getDate();
            };

            let availableDateThisMonth = [];
            for (let i = startDate; i <= lastDate; i++) {
                availableDateThisMonth.push(i);
            }

            const data = await User.findOne({
                where: {username},
                include: {
                    model: Product,
                    include: {
                        model: Session,
                        include: Reservation
                    }
                }
            })

            const availability = {};
            for (let date of availableDateThisMonth) {
                availability[date] = [];
                for (let product of data.Products) {
                    let availableSessions = [];
                    for (let session of product.Sessions) {
                        let reservedDate = session.Reservations.map(e => {
                            return e.date.getDate()
                        })

                        if (!reservedDate.includes(date)) {
                            availableSessions.push({
                                sessionId: session.id,
                                sessionName: session.name,
                            })
                        }
                    }
                    
                    if (availableSessions.length > 0) {
                        availability[date].push({
                            productId: product.id,
                            productName: product.name,
                            productPrice: product.price,
                            availableSessions
                        });
                    }
                }
            }

            // console.dir(availability, { depth: null })
            // // Prepare availability object that has all dates (from today until end of the month) available
            // const availability = {};
            // for (let product of data.Products) {
            //     availability[product.name] = {};
            //     for (let session of product.Sessions) {
            //         availability[product.name][session.name] = availableDateThisMonth;
            //     }
            // }

            // // Delete dates that correspond to a reservation
            // for (let product of data.Products) {
            //     for (let session of product.Sessions) {
            //         for (let reservation of session.Reservations) {
            //             if (!reservation) break;
            //             let reservationDate = reservation.date.getDate();
            //             let newArr =  availability[product.name][session.name].filter(e => e != reservationDate);
            //             availability[product.name][session.name] = newArr;
            //         }
            //     }
            // }

            res.status(200).json(availability);
        } catch (err) {
            next(err);
        }
    }

    static async generateMidtransToken(req, res, next) {
        try {
            const {productId, email} = req.body;
            const data = await Product.findByPk(productId);
            if (!data) throw {name: "NotFound"}
            const productPrice = data.price

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1000000 + Math.random()*900000),
                    "gross_amount": productPrice
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "email": email
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            res.status(200).json(midtransToken)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller;