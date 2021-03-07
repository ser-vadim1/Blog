const Post = require('../../models/Post')


const Search = async (req, res, next)=>{
   const {search} = req.query
   let reg = new RegExp (`${search}`, "i");
   
try {
   const resSearchPosts = await Post.aggregate([
      { $match: {
          $or: [
              {title: { '$regex': reg } }, 
              { fullText: { '$regex': reg } }
          ]
      } }])


res.status(200).json({data: resSearchPosts})
   

} catch (error) {    

   console.log('error', error);
   return next(error)
   }   
}


module.exports = Search