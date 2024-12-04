const Blog = require("../models/Blog");

//POST a new Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    const response = await Blog.create({
      title,
      description,
      owner: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "New Blog created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again. ",
    });
  }
};

//Get all blogs
exports.viewBlogs = async (req, res) => {
  try {
    const response = await Blog.find({ owner: req.user._id });

    res.status(200).json({
      success: true,
      data: response,
      message: "All blogs are fetched",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again. ",
    });
  }
};

//Get a blog by id
exports.findBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id) ;

    const response = await Blog.findById(id,{owner:req.user._id}) ;

    
    res.status(200).json({
      success: true,
      data: response,
      message: "Here is your blog with id",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again. ",
    });
  }
};

//Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    const { id } = req.params;

    const response = await Blog.findByIdAndUpdate(
      { _id: id, owner: req.user._id },
      { title, description },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: response,
      message: "Blog updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again. ",
    });
  }
};

//Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Blog.findByIdAndDelete({
      _id: id,
      owner: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "Blog deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again. ",
    });
  }
};
