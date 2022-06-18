const express = require('express')
const router = express.Router()
const Forms = require('../models/forms')

// Getting All
router.get('/', async (req, res) => {
    try {
       const form = await Forms.find()
       res.send(form)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Getting One
router.get('/:id', getForm, (req, res) => {
    res.json(res.forms)
})

// Creating One
router.post('/api', async (req, res) => {
    const forms = new Forms({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newForm = await forms.save()
        res.status(201).json(newForm)
    } catch(err){
        res.status(400).json({ message: err.message })
    }

})

// Updating One
router.patch('/:id', getForm, async (req, res) => {
    if (req.body.name != null) {
        res.forms.name = req.body.name
    }
    if (req.body.email != null) {
        res.forms.email = req.body.email
    }
    try {
        const updatedForm = await res.forms.save()
        res.json(updatedForm)
    }   catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getForm, async (req, res) => {
    try {
        await res.forms.remove()
        res.json({ message: 'Deleted Form' })
    }   catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getForm(req, res, next) {
    let forms
    try {
        forms = await Forms.findById(req.params.id)
        if (forms == null) {
            return res.status(404).json({ massage: 'Cannot find form' })
        }
    }   catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.forms = forms
    next()
}

module.exports = router