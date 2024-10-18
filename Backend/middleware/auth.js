import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next)=>{
  const {token} = req.headers;

  if(!token){
    return res.json({success:false, message:"Not Autherized Login"});
  }
  try{
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  }catch(e){
    console.log(e.message);
    res.json({success:false, message:e}) 
  }
}

export default authMiddleware;