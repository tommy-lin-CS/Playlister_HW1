import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with editing songs from the playlist. 
 * It will be managed by the transaction stack.
 * 
 * @author Tommy Lin
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initOriginalIndex, initOriginalTitle, initOriginalArtist, initOriginalYtid,
        initNewIndex, initNewTitle, initNewArtist, initNewYtid) {
        super();
        this.model = initModel;
        this.originalIndex = initOriginalIndex;
        this.originalTitle = initOriginalTitle;
        this.originalAritst = initOriginalArtist;
        this.originalYtid = initOriginalYtid;
        this.newIndex = initNewIndex;
        this.newTitle = initNewTitle;
        this.newArtist = initNewArtist;
        this.newYtid = initNewYtid;
    }

    doTransaction() {
        // NEW EDITS BROUGHT BACK
        this.model.addSongGivenAllComponents(this.newIndex, this.newTitle,
            this.newArtist, this.newYtid);
         
    }
    
    undoTransaction() {
        // BRINGS BACK ORIGINAL CONTENT BEFORE EDITING
        this.model.addSongGivenAllComponents(this.originalIndex, this.originalTitle, 
            this.originalAritst, this.originalYtid);
    }
}