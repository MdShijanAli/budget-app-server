const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');



const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jqheb6c.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const usersCollection = client.db('BudgetApp').collection('users')
    

        // jwt

       /*  app.post('/jwt', (req, res) => {
            
            const user = req.body;
           console.log(user)
     
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRECT, {
                expiresIn: '1d'
            })
            console.log(token)
            res.send({ token })
        }) */


        // token 

        /* app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true }
            const updateDoc = {
                $set: user,
            }
            const result = await usersCollection.updateOne(filter, updateDoc, options);

            console.log(result)

            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRECT, {
                expiresIn: '1d'
            })
            console.log(token)
            res.send({ result, token })
        }) */




        // user post


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })


        // get users

        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        // delete single users

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(filter);
            res.send(result);
        })

// User data update
app.put('/user/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    
    const update = req.body;
    const option = { upsert: true }

console.log("update", update)
    const updateInfo = {
        $set: {
            photoURL: update.photoURL,
            displayName: update.displayName,
            phone: update.phone,
            country: update.country
            
        }
    }
    console.log("updateInfo", updateInfo)
    const result = await usersCollection.updateOne(filter, updateInfo, option)
    res.send(result)

});

    
/* app.put('/user/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };

    const updateData = {};
    if (req.body.name) {
        updateData.name = req.body.name;
    }
    if (req.body.photo) {
        updateData.photo = req.body.photo;
    }
    if (req.body.phone) {
        updateData.phone = req.body.phone;
    }
    if (req.body.country) {
        updateData.country = req.body.country;
    }

    const update = {
        $set: updateData
    };

    const result = await usersCollection.updateOne(filter, update);
    res.send(result);
});
 */

        
         // delete single users

         app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await usersCollection.deleteOne(filter);
            res.send(result);
        })
       


   




    }
    finally {

    }
}
run()
    .catch(error => {
        console.log(error)
    })


app.get('/', (req, res) => {
    res.send('Budget App server is Running')
})


app.listen(port, () => console.log(`Budget App running on: ${port}`))