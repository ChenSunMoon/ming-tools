import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
const db = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('appData'), '/ming-helper/data.db')
})
db.loadDatabase((err) => {
    if (err) {
        console.error(err)
    }
})
export default db
