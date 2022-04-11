const { exportedPg } = require("./pg");

const db = exportedPg(
  process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/1000mods-gig-guide"
);

module.exports.addRegistration = (nickname, password_hash) => {
  const q = `
        INSERT INTO community (nickname,
    password_hash)
        VALUES ($1, $2)
        RETURNING *
    `;
  const params = [nickname, password_hash];
  return db.query(q, params);
};

module.exports.loginCheck = (nickname) => {
  const q = `
        SELECT *
        FROM community WHERE nickname = $1
    `;
  const params = [nickname];
  return db.query(q, params);
};

module.exports.getUser = (id) => {
  const q = `
        SELECT *
        FROM community WHERE id = $1
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.addGig = (date, venue, lat, lng, tour_name, city) => {
  const q = `
        INSERT INTO gigs (date, venue, lat, lng, tour_name, city)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
  const params = [date, venue, lat, lng, tour_name, city];
  return db.query(q, params);
};

module.exports.getGigs = () => {
  const q = `
        SELECT *
        FROM gigs
        ORDER BY gigs.date DESC
    `;

  return db.query(q);
};

module.exports.getGigsTimeline = () => {
  const q = `
        SELECT *
        FROM gigs
        ORDER BY gigs.id DESC
        LIMIT 10
    `;

  return db.query(q);
};

module.exports.getGigsUpdatedTimeline = () => {
  const q = `
        SELECT *
        FROM gigs
        WHERE gigs.updated_at IS NOT NULL
        ORDER BY gigs.updated_at DESC
        LIMIT 10
    `;

  return db.query(q);
};

module.exports.getNextGigsTimeline = (id) => {
  const q = `
        SELECT *
        FROM gigs
           WHERE id < $1
        ORDER BY id DESC
        LIMIT 10
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.getNextGigsUpdatedTimeline = (updated_at) => {
  const q = `
        SELECT *
        FROM gigs
        WHERE gigs.updated_at IS NOT NULL 
        AND  gigs.updated_at < $1
        ORDER BY gigs.updated_at DESC
        LIMIT 10
    `;
  const params = [updated_at];
  return db.query(q, params);
};

module.exports.getGigToEdit = (date) => {
  const q = `
        SELECT *
        FROM gigs WHERE gigs.date = $1
        `;
  const params = [date];
  return db.query(q, params);
};

module.exports.getGig = (id) => {
  const q = `
        SELECT *
        FROM gigs WHERE gigs.id = $1
        `;
  const params = [id];
  return db.query(q, params);
};

module.exports.updateGig = (date, venue, lat, lng, tour_name, city, poster) => {
  const q = `
        UPDATE gigs
        SET date = $1, venue = $2, lat = $3, lng = $4, tour_name = $5, city = $6, poster = $7, updated_at= NOW()
        WHERE gigs.date = $1
        RETURNING *
    `;
  const params = [date, venue, lat, lng, tour_name, city, poster];
  return db.query(q, params);
};

module.exports.deleteGig = (date) => {
  const q = `
        DELETE FROM gigs
        WHERE date = $1
        RETURNING *
    `;
  const params = [date];
  return db.query(q, params);
};

module.exports.deleteGigImages = (id) => {
  const q = `
        DELETE FROM images
        WHERE gig_id = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.deleteUserImages = (id) => {
  const q = `
        DELETE FROM images
        WHERE img_sender_id = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.addImage = (id, url) => {
  const q = `
        UPDATE gigs
        SET poster = $2, updated_at= NOW()
        WHERE gigs.id = $1
        RETURNING *
    `;
  const params = [id, url];
  return db.query(q, params);
};

module.exports.check = () => {
  const q = `
        SELECT tablename
        FROM pg_catalog.pg_tables
        WHERE schemaname != 'pg_catalog' AND 
        schemaname != 'information_schema';
    `;

  return db.query(q);
};

module.exports.getOnlineUsers = (Ids) => {
  const q = "SELECT * FROM community WHERE id = ANY($1)";
  const params = [Ids];
  return db.query(q, params);
};

module.exports.getLastUsersTimeline = () => {
  const q = "SELECT * FROM community ORDER BY id DESC;";

  return db.query(q);
};

module.exports.getLastOnlineTimeline = () => {
  const q = "SELECT * FROM community ORDER BY last_online DESC;";

  return db.query(q);
};

module.exports.addChatMsg = (msg_sender_id, chat_msg) => {
  const q = `
        INSERT INTO chatroom (msg_sender_id, chat_msg)
        VALUES ($1, $2)
        RETURNING *
    `;
  const params = [msg_sender_id, chat_msg];
  return db.query(q, params);
};

module.exports.getChatMsgs = () => {
  const q = `
        SELECT chatroom.id, community.super_admin, chatroom.created_at, nickname, chat_img, chat_color, msg_sender_id, chat_msg
        FROM chatroom
        JOIN community
        ON (community.id = msg_sender_id)
        ORDER BY chatroom.created_at DESC
        LIMIT 250
        ;
    `;
  return db.query(q);
};

module.exports.addVisitorIp = (ip) => {
  const q = `
        INSERT INTO visitors (ip)
        VALUES ($1)
        RETURNING *
    `;
  const params = [ip];
  return db.query(q, params);
};

module.exports.checkVisitorIps = (ip) => {
  const q = `
        SELECT * FROM visitors
        WHERE ip = $1
    `;
  const params = [ip];
  return db.query(q, params);
};

module.exports.checkAllVisitorIps = () => {
  const q = `
        SELECT * FROM visitors
    `;
  return db.query(q);
};

module.exports.addChatPic = (pic, id) => {
  const q = `
        UPDATE community
        SET chat_img = $1
        WHERE id = $2
        RETURNING *
         `;
  const params = [pic, id];
  return db.query(q, params);
};

module.exports.setUserStatus = (online, id) => {
  const q = `
        UPDATE community
        SET online = $1
        WHERE id = $2
        RETURNING *
         `;
  const params = [online, id];
  return db.query(q, params);
};

module.exports.addChatColor = (id, color) => {
  const q = `
        UPDATE community
        SET chat_color = $2
        WHERE id = $1
        RETURNING *
         `;
  const params = [id, color];
  return db.query(q, params);
};

module.exports.getNextMsgs = (id) => {
  const q = `
        SELECT chatroom.id, community.super_admin, chatroom.created_at, nickname, chat_img, chat_color, msg_sender_id, chat_msg 
        FROM chatroom
         JOIN community
        ON (community.id = msg_sender_id)
        WHERE chatroom.id < $1
        AND chatroom.chat_msg NOT LIKE '%--##--entered--##--%'
        AND chatroom.chat_msg NOT LIKE '%--##--left--##--%'
           AND chatroom.chat_msg NOT LIKE '%--##--left-the-network--##--%'
        ORDER BY id DESC
        LIMIT 20;
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.getImages = () => {
  const q = `
    SELECT DISTINCT ON (poster) id, poster FROM gigs WHERE NOT (poster IS null)
    `;
  const params = [];
  return db.query(q, params);
};

module.exports.deleteChatPost = (id) => {
  const q = `
        DELETE FROM chatroom
        WHERE chatroom.id  = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.deleteUser = (id) => {
  const q = `
        DELETE FROM community
        WHERE community.id  = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.deleteAllUserPosts = (id) => {
  const q = `
        DELETE FROM chatroom
        WHERE chatroom.msg_sender_id  = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.getAllUsers = () => {
  const q = `
        SELECT DISTINCT ON (msg_sender_id) community.id, community.nickname, community.ban, chat_msg, chat_img, admin, super_admin,  last_online, chatroom.created_at
        FROM chatroom
        JOIN community
        ON (community.id = msg_sender_id)
        WHERE community.id != '1'
        ORDER BY msg_sender_id, chatroom.created_at DESC;
     `;
  return db.query(q);
};

module.exports.setUserAdmin = (id, boolean) => {
  const q = `
        UPDATE community SET admin = $2
        WHERE community.id = $1
     `;
  const params = [id, boolean];
  return db.query(q, params);
};

module.exports.setLastOnline = (id) => {
  const q = `
        UPDATE community SET last_online = NOW()
        WHERE community.id = $1
     `;
  const params = [id];
  return db.query(q, params);
};

module.exports.setUserSuperAdmin = (id, boolean) => {
  const q = `
        UPDATE community SET super_admin = $2
        WHERE community.id = $1
     `;
  const params = [id, boolean];
  return db.query(q, params);
};

module.exports.addCommunityImage = (
  gig_id,
  img_sender_id,
  nickname,
  img_url
) => {
  const q = `
        INSERT INTO images (gig_id, img_sender_id,nickname, img_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
  const params = [gig_id, img_sender_id, nickname, img_url];
  return db.query(q, params);
};

module.exports.getCommunityImages = (id) => {
  const q = `
        SELECT *
        FROM images
        WHERE images.gig_id = $1;
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.getTimelineImages = () => {
  const q = `
        SELECT images.gig_id, gigs.id, gigs.city,gigs.date, images.created_at, images.nickname, images.img_url
        FROM images
         JOIN gigs
        ON (images.gig_id = gigs.id)
        ORDER BY images.created_at DESC
        LIMIT 5;
        ;
    `;

  return db.query(q);
};

module.exports.getNextTimelineImages = (created_at) => {
  const q = `
        SELECT images.gig_id, gigs.id, gigs.city,gigs.date, images.created_at, images.nickname, images.img_url
        FROM images
         JOIN gigs
        ON (images.gig_id = gigs.id)
           WHERE images.created_at < $1
        ORDER BY images.created_at DESC
        LIMIT 5;
    `;
  const params = [created_at];
  return db.query(q, params);
};

module.exports.deleteCommunityImage = (id) => {
  const q = `
        DELETE FROM images
        WHERE images.id  = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.getComments = (id) => {
  const q = `
        SELECT  comments.id, gig_id, msg_sender_id, comment, community.nickname
        FROM comments
        JOIN community
        ON (community.id = comments.msg_sender_id) WHERE comments.gig_id = $1;
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.getCommentsTimeline = () => {
  const q = `
        SELECT  comments.id, gigs.id AS gigsId, msg_sender_id, comment, comments.created_at, community.nickname, gigs.city, gigs.date,gigs.poster
        FROM comments
        JOIN gigs 
        ON (gigs.id=comments.gig_id)
            JOIN community
        ON (community.id = comments.msg_sender_id) 
                ORDER BY comments.id DESC
                    LIMIT 10 ;
    
    `;

  return db.query(q);
};

module.exports.getNextCommentsTimeline = (created_at) => {
  const q = `
        SELECT  comments.id, gigs.id AS gigsId, msg_sender_id, comment, comments.created_at, community.nickname, gigs.city, gigs.date,gigs.poster
        FROM comments
        JOIN gigs 
        ON (gigs.id=comments.gig_id)
            JOIN community
        ON (community.id = comments.msg_sender_id)
        WHERE comments.id < $1    
        ORDER BY comments.id DESC
        LIMIT 10 ;       
    `;
  const params = [created_at];
  return db.query(q, params);
};

module.exports.addComment = (gig_id, msg_sender_id, comment) => {
  const q = `
        INSERT INTO comments (gig_id, msg_sender_id, comment)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const params = [gig_id, msg_sender_id, comment];
  return db.query(q, params);
};

module.exports.deleteComments = (id) => {
  const q = `
        DELETE FROM comments
        WHERE  comments.msg_sender_id  = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.deleteCommentsEditor = (id) => {
  const q = `
        DELETE FROM comments
        WHERE  comments.gig_id  = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.getPrivateMsgs = (sender_id, receiver_id) => {
  const q = `
        SELECT * FROM private_messages
        WHERE msg_sender_id = $1
        AND msg_receiver_id = $2
        OR msg_sender_id = $2 AND
        msg_receiver_id = $1
        ORDER BY created_at DESC
        LIMIT 20;
    `;
  const params = [sender_id, receiver_id];
  return db.query(q, params);
};

module.exports.getNextPrivateMsgs = (sender_id, receiver_id, msg_id) => {
  const q = `
        SELECT * FROM private_messages
        WHERE private_messages.id < $3
        AND ((msg_sender_id = $1
        AND msg_receiver_id = $2)
        OR (msg_sender_id = $2 AND
        msg_receiver_id = $1))
        ORDER BY id DESC
        LIMIT 20;
    `;
  const params = [sender_id, receiver_id, msg_id];
  return db.query(q, params);
};

module.exports.lastPrivateMsgChecker = () => {
  const q = `
   SELECT * FROM private_messages
   LIMIT 1;
    `;
  const params = [];
  return db.query(q, params);
};

module.exports.getFilteredPrivate = (receiver_id) => {
  const q = `
         SELECT * FROM (SELECT DISTINCT ON (msg_sender_id) id, msg_sender_id, msg_receiver_id, private_msg, receiver_seen, created_at    
        FROM private_messages
        WHERE msg_receiver_id = $1
        ORDER BY msg_sender_id, created_at DESC)
        private_messages
        ORDER BY created_at;
    `;
  const params = [receiver_id];
  return db.query(q, params);
};

module.exports.seenPrivateMsgs = (id) => {
  const q = `
           UPDATE private_messages SET receiver_seen = 'true'
        WHERE private_messages.id = $1
                RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.addPrivateMsg = (msg_sender_id, msg_receiver_id, message) => {
  const q = `
        INSERT INTO private_messages (msg_sender_id, msg_receiver_id, private_msg)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const params = [msg_sender_id, msg_receiver_id, message];
  return db.query(q, params);
};

module.exports.deletePrivateMessages = (id) => {
  const q = `
          DELETE FROM private_messages
        WHERE private_messages.msg_sender_id  = $1
        OR  private_messages.msg_receiver_id  = $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.getNetworkUsers = () => {
  const q = `
        SELECT * FROM community
        ORDER BY created_at;
    `;

  return db.query(q);
};

module.exports.getGuests = () => {
  const q = `
       SELECT * FROM community WHERE nickname ILIKE 'GUEST%';
    `;

  return db.query(q);
};

module.exports.changeNickname = (nickname, id) => {
  const q = `
        UPDATE community
        SET nickname = $1
        WHERE id = $2
        RETURNING *
         `;
  const params = [nickname, id];
  return db.query(q, params);
};

module.exports.changePassword = (password, id) => {
  const q = `
        UPDATE community
        SET password_hash = $1
        WHERE id = $2
        RETURNING *
         `;
  const params = [password, id];
  return db.query(q, params);
};

module.exports.addAboutComment = (userName, email, website, comment, reply) => {
  const q = `
        INSERT INTO about_comments (name,
    email, website, comment, reply)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
  const params = [userName, email, website, comment, reply];
  return db.query(q, params);
};

module.exports.getAboutComments = () => {
  const q = `
       SELECT * FROM about_comments
        ORDER BY id DESC;
    `;

  return db.query(q);
};

module.exports.deleteAboutComment = (id) => {
  const q = `
        DELETE FROM about_comments
        WHERE id = $1
        OR
        reply= $1
        RETURNING *
    `;
  const params = [id];
  return db.query(q, params);
};

module.exports.checkForDuplicatePosters = (poster) => {
  const q = `
        SELECT * FROM gigs
        WHERE poster = $1;
      
    `;
  const params = [poster];
  return db.query(q, params);
};

module.exports.setDarkMode = (id, dark_mode) => {
  const q = `
        UPDATE community
        SET dark_mode = $2
        WHERE community.id = $1
        RETURNING *
    `;
  const params = [id, dark_mode];
  return db.query(q, params);
};

module.exports.banUser = (id, boolean) => {
  const q = `
        UPDATE community
        SET ban = $2
        WHERE community.id = $1
        RETURNING *
    `;
  const params = [id, boolean];
  return db.query(q, params);
};

module.exports.setUserBanTime = (id, time) => {
  const q = `
        UPDATE community
        SET ban_time = $2
        WHERE community.id = $1
        RETURNING *
    `;
  const params = [id, time];
  return db.query(q, params);
};

module.exports.setUserBanSeconds = (id, sec) => {
  const q = `
        UPDATE community
        SET ban_time_sec = $2
        WHERE community.id = $1
        RETURNING *
    `;
  const params = [id, sec];
  return db.query(q, params);
};

module.exports.setMute = (id, boolean) => {
  const q = `
        UPDATE community
        SET mute = $2
        WHERE community.id = $1
        RETURNING *
    `;
  const params = [id, boolean];
  return db.query(q, params);
};
