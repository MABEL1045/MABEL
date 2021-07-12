const express = require('express');
const app = express();
const friends = require('./models/FriendList');
const PORT = 5000

app.use(express.json());


app.get('/', (req, res) => {
    res.send("</h1>Hello Guys</h1>");
});

app.get('/friends', (req, res) => {
    console.log(friends);
    res.json(friends);
});

app.post('/friends/create', (req, res) => {
    id = friends.length + 1;
    const newFriend = {id,...req.body}
    friends.push(newFriend);
    res.json(friends);
});

app.put('/friends/:id', (req, res) => {
    const friend = friends.find((friend) => friend.id === Number(req.params.id));
    const index = friends.indexOf(friend)
if(!friend) {
    res.status(500).json({success: false, msg: "friend list not found"});
} else {
    const updatedList = {...friend, ...req.body};
    friends[index] = updatedList;
    res.json({msg: "friendList successfully updated", data: friends})
}
});

app.delete('/friends/:id', (req, res) => {
    const rmFriend = friends.find((friend) => friend.id === Number(req.params.id));

    if(!rmFriend) {
        res.status(400).json({success: false, msg: "friend not found"});
    } else {
        const newList = friends.filter((friend) => friend.id !== Number(req.params.id));
        res.json(newList);
    }
})


app.listen(5000, () => {
    console.log(`server listening on port ${PORT}....`)
})