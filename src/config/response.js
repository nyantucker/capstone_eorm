export const responseData = (res,message,data,statusCode) => { 
    res.status(statusCode).send({
        message: message,
        content: data,
        date: new Date()
    })
 }