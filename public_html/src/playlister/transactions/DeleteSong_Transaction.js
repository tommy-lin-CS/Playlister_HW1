import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with deleting songs from the playlist. 
 * It will be managed by the transaction stack.
 * 
 * @author Tommy Lin
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initSong, initIndex) {
        super();
        this.model = initModel;
        this.song = initSong;
        this.index = initIndex;
    }

    doTransaction() {
         // DELETES THE LAST INDEX
         this.model.deleteSong(this.index);
    }
    
    undoTransaction() {
        // ADDS BACK THE DELETED SONG
        this.model.addSongGivenIndex(this.song, this.index);
    }
}