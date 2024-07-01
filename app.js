import express from 'express'

import { getPlant, getPlants, createPlant } from './database.js'

const app = express()

app.use(express.json())

app.get("/Native_Plant_List", async (req,res) => {
    const plants = await getPlants()
    res.send(plants)
})

app.get("/Native_Plant_List/:id", async (req,res) => {
    const id = req.params.id
    const plant = await getPlant(id)
    res.send(plant)
})

app.post("/Native_Plant_List", async (req,res) => {
    const {Scientific_name, Common_name, Type, Height, Width, Spacing, Bloom_color, Light_intensity, Bloom_start, 
        Bloom_end, Hardiness_zone, Soil_moisture} = req.body
        const plant = await createPlant(Scientific_name, Common_name, Type, Height, Width, Spacing, Bloom_color, Light_intensity, Bloom_start, 
            Bloom_end, Hardiness_zone, Soil_moisture)
    res.status(201).send(plant)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(8080,() => {
    console.log('Server is running on port 8080')
  })