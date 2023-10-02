const express = require("express");
const bcrypt = require('bcrypt');
const db = require('../database/databaseconn');
const getEmailFromInput = require('./validateInput')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Create users table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS favourites (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, recipeid INTEGER, recipename TEXT, recipeimage TEXT)");
    db.run('CREATE TABLE IF NOT EXISTS authorization (useremail TEXT, confirmationCode INTEGER, approved BOOLEAN)')
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const { username, password, repassword } = req.body;

    if (!username || !password || !repassword) {
        return res.json({ success: false, error: 'Missing fields' });
    }

    if (password !== repassword) {
        return res.json({ success: false, error: 'Password must match' });
    }

    // Hash the password with a salt of 10 rounds
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error(err.message);
            return res.json({ success: false, error: 'Error creating user' });
        }

        // Insert the new user into the database
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
            if (err) {
                console.error(err.message);
                return res.json({ success: false, error: 'Error creating user' });
            }

            return res.json({ success: true, user: { username } });
        });
    });
});


// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({success: false, error: 'Missing information'});
    }

    db.get('SELECT * FROM users WHERE username = ?', username, (err, row) => {
        if (err) {
            console.error(err.message);
            return res.json({ success: false, error: 'Database error'});
        } else if (!row) {
            return res.json({ success: false, error: 'Login Attempt Failed'});
        }

        bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                console.error(err.message);
                return res.json({ success: false, error: 'Database error'});
            } else if (result) {
                return res.json({ success: true, user: { id: row.id, username: row.username, email: row.email }});
            } else {
                return res.json({ success: false, error: 'Login Attempt Failed'});
            }
        });
    });
});

//Save to favourites endpoint
app.post('/api/saveFavourites', (req, res) =>{
    let { userId, recipeId, recipeName, recipeImage } = req.body;
    userId = parseInt(userId);
    recipeId = parseInt(recipeId);
    if (!userId || !recipeId){
        return res.json({success: false, error: 'Something Went Wrong'})
    }

    db.get('SELECT * FROM favourites WHERE userid = ?', userId, (err, row) => {
        if (err) {
          console.error(err.message);
          return res.json({ success: false, error: 'Database error' });
        } else if (!row) {
          db.run('INSERT INTO favourites (userid, recipeid, recipename, recipeimage) VALUES(?,?,?,?)', [userId, recipeId, recipeName, recipeImage], (err) => {
            if (err) {
              console.error(err.message);
              return res.json({ success: false, error: 'Database error' });
            }
            return res.json({ success: true, favourites: { userId, recipeId } });
          });
        } else {
          let idarr = String(row.recipeid).split(',');
          let namearr = row.recipename.split('+');
          let imagearr = row.recipeimage.split('+')
          if (idarr.includes(String(recipeId)) === false) {
            idarr.push(recipeId);
            namearr.push(recipeName);
            imagearr.push(recipeImage);
            db.run('UPDATE favourites SET\
            recipeid = ?,recipename=?,recipeimage=?\
            WHERE userid = ?',
            [idarr.join(','),
            namearr.join('+'),
            imagearr.join('+'),
            userId],
            (err) => {
              if (err) {
                console.error(err.message);
                return res.json({ success: false, error: 'Database error' });
              }
              return res.json({ success: true, favourites: { userId, recipeId } });
            });
          }
        }
      });
      
});


//fetch from favourites endpoint
app.post('/api/showfavourites', (req, res) => {
    let {userId} = req.body;
    userId = parseInt(userId);
    if (!userId){
        return res.json({success: false, error: 'Something Went Wrong'});
    }
    db.get('SELECT * FROM favourites WHERE userid = ?', userId, (err, row) => {
        if (err) {
            return res.json({ success: false, error: 'Database error'});
        } else if (!row) {
            return res.json({ success: false, error: 'No Saved Data'})
        } else {
            return res.json({success: true, recipe: {
                recipeid: row.recipeid,
                recipename: row.recipename,
                recipeimage: row.recipeimage
            }});
        }
});
});
// Delete from favorites endpoint
app.post('/api/deleteFromFavorites', (req, res) => {
    let { userId, recipeId } = req.body;
    userId = parseInt(userId);
    recipeId = parseInt(recipeId);
    
    if (!userId || !recipeId) {
        return res.json({ success: false, error: 'Missing information' });
    }

    db.get('SELECT * FROM favourites WHERE userid = ?', userId, (err, row) => {
        if (err) {
            console.error(err.message);
            return res.json({ success: false, error: 'Database error' });
        } else if (!row) {
            return res.json({ success: false, error: 'No favorites found for this user' });
        } else {
            let idarr = String(row.recipeid).split(',');
            let namearr = row.recipename.split('+');
            let imagearr = row.recipeimage.split('+');

            const index = idarr.indexOf(String(recipeId));
            if (index !== -1) {
                idarr.splice(index, 1);
                namearr.splice(index, 1);
                imagearr.splice(index, 1);

                db.run('UPDATE favourites SET\
                recipeid = ?, recipename = ?, recipeimage = ?\
                WHERE userid = ?',
                [idarr.join(','), namearr.join('+'), imagearr.join('+'), userId],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        return res.json({ success: false, error: 'Database error' });
                    }
                    return res.json({ success: true, message: 'Recipe removed from favorites' });
                });
            } else {
                return res.json({ success: false, error: 'Recipe not found in favorites' });
            }
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// Close the database connection when the process is terminated
process.on('SIGINT', () => {
    db.close();
});
