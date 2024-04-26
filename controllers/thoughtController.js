const { Thought, Reaction, User } = require("../models");

// --------/api/thoughts---------

const thoughtController = {
  // GET to get all thoughts
  async getThought(req, res) {
    try {
      const thoughtData = await Thought.find();

      res.status(200).json(thoughtData);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to retrieve thoughts due to server error" });
    }
  },

  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const getThoughtId = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v").populate("reactions");
      if (!getThoughtId) {
        res.status(404).json({ message: "No thought found with that ID" });
      } else {
        res.status(200).json(getThoughtId);
        console.log("Reaction count:", getThoughtId.reactionCount);
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Failed to retrieve thought due to server error" });
    }
  },
  // POST to create a new thought
  async createThought(req, res) {
    try {
      // Create the new thought
      const newThought = await Thought.create(req.body);

      // If thought is created successfully, link it to the user
      if (!newThought) {
        res
          .status(404)
          .json({ message: "Failed to create thought due to invalid input" });
      } else {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: newThought._id } },
          { new: true }
        );
        // Send the original thought data, not the user update data
        res.status(200).json({
          message: "Thought has been created successfully and linked to user",
          thought: newThought,
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Failed to create thought due to server error" });
    }
  },
  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true } // Ensures updated document is returned
      );
      if (!updatedThought) {
        res.status(404).json({ message: "No thought with this id!" });
      } else {
        res.status(200).json({
          message: "Thought has been updated successfully",
          thoughts: updatedThought,
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Failed to update thought due to server error" });
    }
  },
  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const removedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!removedThought) {
        res.status(404).json({ message: "No thought with this id!" });
      } else {
        // Update the user after the thought has been deleted
        const updatedUser = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        res.status(200).json({
          message: "Thought has been deleted successfully and user updated.",
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Failed to delete thought due to server error" });
    }
  },

  // -------/api/thoughts/:thoughtId/reactions--------

  // POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $addToSet: { reactions: req.body },
          $inc: { reactionCount: 1 },
        },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        res.status(404).json({ message: "No thought found with this ID" });
      } else {
        res.status(200).json({
          message: "Reaction added successfully",
          thoughts: updatedThought,
        });
        // console.log("Reaction count:", updatedThought.reactionCount);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Failed to add reaction due to server error",
        error: err.message, // Include this line in development mode for more detailed debugging information
      });
    }
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
    try {
      const removedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } }, // Assuming reactions is an array of objects
        { runValidators: true, new: true }
      );

      // Check if the thought was found and updated
      if (!removedThought) {
        res.status(404).json({ message: "No thought found with this ID" });
      } else {
        // Optionally, check if the reaction was actually removed, this would require knowing the state before and after the update
        res.status(200).json({ message: "Reaction removed successfully" });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Failed to remove reaction due to server error" });
    }
  },
};

module.exports = thoughtController;
