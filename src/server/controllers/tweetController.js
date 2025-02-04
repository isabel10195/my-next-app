const { executeQuery } = require("../config/database");
const db = require("mssql");

// Crear un tweet
const createTweet = async (req, res) => {
    const { tweet_text } = req.body;
    const user_id = req.user.id;

    try {
        const query = "INSERT INTO tweets (user_id, tweet_text) OUTPUT INSERTED.id VALUES (@user_id, @tweet_text)";
        const inputs = [
            { name: "user_id", type: db.Int, value: user_id },
            { name: "tweet_text", type: db.NVarChar, value: tweet_text },
        ];

        const result = await executeQuery(query, inputs);
        res.send({ message: "Tweet creado correctamente", tweetId: result.recordset[0].id });
    } catch (error) {
        console.error("Error al crear el tweet:", error);
        res.status(500).send("Error al crear el tweet");
    }
};

// Obtener tweets de usuarios seguidos
const getTweetsByFollowing = async (req, res) => {
    const user_id = req.user.id;

    try {
        const query = `
            SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, tweets.created_at, 
                   users.user_handle, users.first_name, users.last_name, users.avatar_url
            FROM tweets
            JOIN users ON tweets.user_id = users.user_id
            JOIN followers ON followers.following_id = tweets.user_id
            WHERE followers.follower_id = @user_id 
            ORDER BY tweets.created_at DESC`;
        const inputs = [{ name: "user_id", type: db.Int, value: user_id }];
        const results = await executeQuery(query, inputs);

        res.send({ tweets: results.recordset });
    } catch (error) {
        console.error("Error al obtener tweets:", error);
        res.status(500).send("Error al obtener tweets");
    }
};

// Obtener los tweets del usuario autenticado
const getTweets = async (req, res) => {
    const userId = req.user.id;

    try {
        const query = `
            SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, tweets.created_at, 
                   user_handle, first_name, last_name, avatar_url 
            FROM tweets
            JOIN users ON tweets.user_id = users.user_id
            WHERE tweets.user_id = @userId
            ORDER BY tweets.created_at DESC`;
        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const results = await executeQuery(query, inputs);

        res.send({ tweets: results.recordset });
    } catch (error) {
        console.error("Error al obtener tweets del usuario:", error);
        res.status(500).send("Error al obtener tweets");
    }
};

// Obtener tweets de los usuarios seguidos
const getFollowingTweets = async (req, res) => {
    const userId = req.user.id;

    try {
        const followingQuery = `SELECT following_id FROM followers WHERE follower_id = @userId`;
        const followingInputs = [{ name: "userId", type: db.Int, value: userId }];
        const followingResults = await executeQuery(followingQuery, followingInputs);

        const followingIds = followingResults.recordset.map(follow => follow.following_id);

        if (followingIds.length === 0) {
            return res.send({ tweets: [] });
        }

        const tweetsQuery = `
            SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, created_at, 
                   user_handle, first_name, last_name, avatar_url 
            FROM tweets
            JOIN users ON tweets.user_id = users.user_id
            WHERE tweets.user_id IN (${followingIds.join(",")})
            ORDER BY created_at DESC`;
        const tweetsResults = await executeQuery(tweetsQuery);

        res.send({ tweets: tweetsResults.recordset });
    } catch (error) {
        console.error("Error al obtener tweets de los usuarios seguidos:", error);
        res.status(500).send("Error al obtener tweets");
    }
};

// Eliminar un tweet
const deleteTweet = async (req, res) => {
    const tweetId = req.params.tweet_id;
    const userId = req.user.id;

    try {
        const result = await executeQuery(
            "DELETE FROM tweets WHERE tweet_id = @tweetId AND user_id = @userId",
            [
                { name: "tweetId", type: db.Int, value: tweetId },
                { name: "userId", type: db.Int, value: userId },
            ]
        );

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Tweet eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Tweet no encontrado o no autorizado" });
        }
    } catch (error) {
        console.error("Error al eliminar el tweet:", error);
        res.status(500).json({ message: "Error al eliminar el tweet", error: error.message });
    }
};

// Editar un tweet
const editTweet = async (req, res) => {
    const tweetId = req.params.tweet_id;
    const { tweet_text } = req.body;

    try {
        await executeQuery(
            "UPDATE tweets SET tweet_text = @tweet_text WHERE tweet_id = @tweet_id",
            [
                { name: "tweet_text", type: db.NVarChar, value: tweet_text },
                { name: "tweet_id", type: db.Int, value: tweetId },
            ]
        );
        res.status(200).json({ message: "Tweet actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el tweet:", error);
        res.status(500).json({ message: "Error al actualizar el tweet", error: error.message });
    }
};

module.exports = {
    createTweet,
    getTweetsByFollowing,
    getTweets,
    getFollowingTweets,
    deleteTweet,
    editTweet,
};
