const notFound = (req,res,next)=>{
    const erorr = new Error(`Not-Found ${req.originalUrl}`)
    res.status(404)
    next(erorr)
}

const erorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({ message: err.message })
  }

module.exports={
    erorHandler,
    notFound,
}