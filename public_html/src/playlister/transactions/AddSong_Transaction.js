import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding songs to the playlist. 
 * It will be managed by the transaction stack.
 * 
 * @author Tommy Lin
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initModel) {
        super();
        this.model = initModel;
        
    }

    doTransaction() {
        // ADDS NEW SONG BACK
        this.model.addDefaultSongDetails();
    }
    
    undoTransaction() {
        // DELETES THE LAST INDEX
        this.model.deleteTheLastSong();
    }
}