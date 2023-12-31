const { User } = require('../models');
const Model = User

async function find(criteria = {}){
  try {
    const payload = await Model.find(criteria)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

async function findOne(criteria = {}){
  try {
    const payload = await Model.find(criteria).limit(1)
    return (Array.isArray(payload)) ? payload[0] : payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

async function findById(id){
  try {
    const payload = await Model.findById(id)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

async function create(body){
  try {
    const payload = await Model.create(body)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

async function update(criteria, body){
  try {
    const payload = await Model.findOneAndUpdate(criteria, body, { new: true })
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}


async function updateById(id, body){
  try {
    const payload = await Model.findByIdAndUpdate(id, body, { new: true })
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}


async function remove(id){
  try {
    const payload = await Model.findByIdAndDelete(id)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

async function addTeamNameToUser(userId, teamName) {
  try {
    const user = await Model.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.teams.push(teamName);

    await user.save();

    return user;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err);
    throw new Error(err);
  }
}

async function addTConferenceToUser(userId, conferenceName) {
  try {
    const user = await Model.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.teams.push(conferenceName);

    await user.save();

    return user;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err);
    throw new Error(err);
  }
}

module.exports = {
  find,
  findOne,
  findById,
  create,
  update,
  updateById,
  remove,
  addTeamNameToUser, 
  addTConferenceToUser
}
