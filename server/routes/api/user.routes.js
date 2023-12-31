const router = require('express').Router();
const { 
  find,
  findById,
  create,
  update,
  updateById,
  remove,
  addTeamNameToUser, 
  addTConferenceToUser
} = require('../../controllers/user.controller');

router.get("/", async (req, res) => {
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await findById(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await create(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.put("/", async (req, res) => {
  try {
    const payload = await update(req.query, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.put("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await updateById(id, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await remove(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.put('/:userId/teams/:teamName', async (req, res) => {
  const userId = req.params.userId;
  const teamName = req.params.teamName;

  try {
    const user = await addTeamNameToUser(userId, teamName);
    return res.status(200).json({ status: 'success', payload: user });
  } catch (err) {
    return res.status(400).json({ status: 'error', msg: err.message });
  }
});

router.put('/:userId/conferences/:conferenceName', async (req, res) => {
  const userId = req.params.userId;
  const conferenceName = req.params.conferenceName;

  try {
    const user = await addTConferenceToUser (userId, conferenceName);
    return res.status(200).json({ status: 'success', payload: user });
  } catch (err) {
    return res.status(400).json({ status: 'error', msg: err.message });
  }
});


module.exports = router;
