import * as mongoose from 'mongoose';

const URL = 'mongodb://admin:Secret123!@ds035836.mlab.com:35836/cooldesk';

class Database {
    public static connect(){
        mongoose.connect(URL);
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error...'));
        db.once('open', console.log.bind(console, 'connected to : ' + URL));
    }
}

export default Database;
