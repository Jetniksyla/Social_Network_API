const { User, Thought, Reaction } = require("../models");

// ----------/api/users-----------

const userController = {
  // GET to get all users
  async getUser(req, res) {
    try {
      const userData = await User.find({});
      if (!userData || userData === 0) {
        res.status(404).json({ message: "No users found" });
      } else {
        res.status(200).json(userData);
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Failed to retrieve users due to server error" });
    }
  },

  // GET to get a single user by its _id
  async getSingleUser(req, res) {
    try {
      const getUserById = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
      if (!getUserById) {
        return res.status(404).json({ message: "No user found with this Id" });
      } else {
        res.status(200).json(getUserById);
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Failed to retrieve user due to server error" });
    }
  },

  // POST to create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      if (!newUser) {
        res
          .status(404)
          .json({ message: "Failed to create user due to invalid input" });
      } else {
        res.status(200).json(newUser);
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Failed to create user due to server error" });
    }
  },

  // PUT to update amuser by its _id
  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updateUser) {
        res.status(404).json({ message: "No user with this id!" });
      } else {
        res.status(200).json(updateUser);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "User has been updated successfully" });
    }
  },

  // DELETE to remove a user by its _id
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deleteUser) {
        return res.status(404).json({ message: "No user found with this ID!" });
      } else {
        // Assuming deleteUser.thoughts is an array of thought IDs
        if (deleteUser.thoughts && deleteUser.thoughts.length > 0) {
          await Thought.deleteMany({ _id: { $in: deleteUser.thoughts } });
        }
        res.status(200).json({
          message: "User and associated thoughts deleted successfully",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          "Failed to delete user or associated thoughts due to server error",
      });
    }
  },

  // ----------/api/users/:userId/friends/:friendId-----------

  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      // Prevent users from adding themselves as a friend
      if (req.params.userId === req.params.friendId) {
        return res.status(400).json({
          message: "Cannot add yourself as a friend",
        });
      }

      // Check if the friend ID is valid
      const friendExists = await User.findById(req.params.friendId);
      if (!friendExists) {
        return res.status(404).json({
          message: "Friend not found",
        });
      }

      const addUserAsFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!addUserAsFriend) {
        return res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json({
          message: "Friend added successfully",
          user: addUserAsFriend,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Failed to add friend due to server error",
        error: err.message, // Provide error details in the response for debugging
      });
    }
  },

  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const userBeforeUpdate = await User.findById(req.params.userId);
      if (!userBeforeUpdate) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const removeFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!removeFriend) {
        return res.status(404).json({
          message: "User not found",
        });
      } else {
        const wasRemoved = !userBeforeUpdate.friends.includes(
          req.params.friendId
        );
        res.status(200).json({
          message: wasRemoved
            ? "Friend removed successfully"
            : "Friend was removed successfully, may not be on your the list anymore",
          user: removeFriend,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Failed to remove friend due to server error",
        error: err.message,
      });
    }
  },
};

module.exports = userController;
