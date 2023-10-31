const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const libraryRoutes = require('./routes/libraryRoutes')

app.use(bodyParser.json());
app.use('/api/library', libraryRoutes);

app.use((req, res, next)=>{
    const error = new HttpError('Could not find this route.', 404);
    throw error;
})

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'An unknown error occured'})
} )


mongoose.connect('mongodb+srv://Ayush0751:clusture0751@cluster0.nhdkbx9.mongodb.net/BrewApps-backend?retryWrites=true&w=majority')
        .then(()=>{
            app.listen(3000,()=>{
                console.log("Listening on port 3000");
            })
        })
        .catch(err=>{
            console.log(err);
});