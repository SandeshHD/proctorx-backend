const studentsAuthGuard = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(401)
    jwt.verify(token,process.env.STUDENTS_ACCESS_TOKEN_SECRET,(err,username)=>{
        if(err) return res.sendStatus(403);
        next()
    })
}

const facultiesAuthGuard = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(401)
    jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN_SECRET,(err,username)=>{
        if(err) return res.sendStatus(403);
        next()
    })
}
const superAdminAuthGuard = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(401)
    jwt.verify(token,process.env.SUPERADMIN_ACCESS_TOKEN_SECRET,(err,username)=>{
        if(err) return res.sendStatus(403);
        next()
    })
}

module.exports = {
    studentsAuthGuard,
    facultiesAuthGuard,
    superAdminAuthGuard
}