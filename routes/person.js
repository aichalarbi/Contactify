const express = require("express");
const router = express.Router();
const contact = require("../models/personModel");

//this enables us to add new people

router.post("/addPerson", async (req, res) => {
    try {
        const newPerson = {
            name: req.body.name,
            age: req.body.age,
            favoriteFoods: req.body.favoriteFoods,
            
        };

        const result = await contact.create(newPerson);
        res.status(201).json({ msg: "Person added", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
//enables us to check all the database
router.get("/getpeople", async (req, res) => {
    try {
        const result = await contact.find();
        res.status(200).json({ msg: "people retrieved", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
//this allows us to find people through their names
router.get('/getPeopleByFood/:food', async (req, res) => {
    try {
      const food = req.params.food;
  
      const result = await contact.find({ favoriteFoods:food });
  
      if (result.length === 0) {
        res.status(404).json({ msg: 'No matching people found' });
      } else {
        res.status(200).json({ msg: 'People retrieved', result });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
// we can use this to find a person through their id 
router.get("/getPerson/:id", async (req, res) => {
    
    try {
        const id = req.params.id;
        const result = await contact.findOne({_id: id} );
        res.status(200).json({ msg: "person retrieved", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
// we can use this to delete a contact through their id 
router.delete("/deletePerson/:id",async (req,res) =>{
    try{
        const id = req.params.id;
        const result = await contact.findByIdAndDelete({_id : id})
        res.send({msg :"person deleted ",result})

    }
    catch (error){
        console.error(error);
        res.status(500).json("internal server error", error)
    }
});
//this is used to update info about a contact using their id 
router.put("/updatePerson/:id",async (req,res) =>{
    try{
        const id = req.params.id;
        const result = await contact.findByIdAndUpdate({_id : id} , {$set: {age:20}},{new:true})
        res.send({msg :"person updated ",result})

    }
    catch (error){
        console.error(error);
        res.status(500).json("internal server error", error)
    }

});
//add hamburger to the list of favorite foods
// router.put('/updateFood/:id', async (req, res) => {
//     try {
//       const id = req.params.id;
//       const favoriteFoods = " Hamburger";
//       let result = await contact.findById({_id: id});
//       result.favoriteFoods.push(favoriteFoods);
//       result = await contact.save();
//       res.status(200).json({ msg: 'Person updated', updatedPerson });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ msg: 'Internal server error', error });
//     }
//   });
router.put('/update-favorite-foods/:personId', async (req, res) => {
    const { personId } = req.params;
    const newFavoriteFood = 'Hamburger'; // Update with your new favorite food
  
    try {
      const person = await contact.findById(personId);
  
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      person.favoriteFoods.push(newFavoriteFood);
      await person.save();
  
      res.json(person);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
//this is used to delete certain people with the same name
router.delete('/deleteMany/:name', async (req, res) => {
    try {
      const name = req.params.name;
  
      const result = await contact.deleteMany({ name });
  
      res.send({ msg: `Deleted all people with the name ${name}`, result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal server error', error });
    }
  });

module.exports = router;
