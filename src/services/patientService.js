import db from "../models/index";
require('dotenv').config();

let postBookAppointment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType) {
                resolve({
                    errCode: -1,
                    message: "Missing required parameters"
                });
            }
            else {
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                });

                // Create Booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: '',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    });
                }

                resolve({
                    errCode: 0,
                    message: "Save infor patient booking successfully"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    postBookAppointment: postBookAppointment
}