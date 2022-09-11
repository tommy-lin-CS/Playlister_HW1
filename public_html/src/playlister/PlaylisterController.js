/**
 * PlaylistController.js
 * 
 * This class provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author Tommy Lin
 */
export default class PlaylisterController {
    constructor() { }

    /*
        setModel 

        We are using an MVC-type approach, so this controller class
        will respond by updating the application data, which is managed
        by the model class. So, this function registers the model 
        object with this controller.
    */
    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    setView(initView) {
        this.view = initView;
        this.initHandlers();
    }

    /*
        initHandlers

        This function defines the event handlers that will respond to interactions
        with all the static user interface controls, meaning the controls that
        exist in the original Web page. Note that additional handlers will need
        to be initialized for the dynamically loaded content, like for controls
        that are built as the user interface is interacted with.
    */
    initHandlers() {
        // SETUP THE TOOLBAR BUTTON HANDLERS
        this.initEditToolbarHandlers();

        // SETUP THE MODAL HANDLERS
        this.initModalHandlers();
    }

    /*
        initEditToolbarHandlers

        Specifies event handlers for buttons in the toolbar.
    */
    initEditToolbarHandlers() {
        // HANDLER FOR ADDING A NEW LIST BUTTON
        document.getElementById("add-list-button").onmousedown = (event) => {
            let newList = this.model.addNewList("Untitled", []);
            this.model.loadList(newList.id);
            this.model.saveLists();
        }
        // HANDLER FOR ADDING SONG BUTTON
        document.getElementById("add-song-button").onmousedown = (event) => {
            this.model.addSongTransaction(); // Includes adding default song, built into the transaction class.
            this.model.refreshPlaylist();
        }
        // HANDLER FOR UNDO BUTTON
        document.getElementById("undo-button").onmousedown = (event) => {
            this.model.undo();
        }
        // HANDLER FOR REDO BUTTON
        document.getElementById("redo-button").onmousedown = (event) => {
            this.model.redo();
        }
        // HANDLER FOR CLOSE LIST BUTTON
        document.getElementById("close-button").onmousedown = (event) => {
            this.model.unselectAll();
            this.model.unselectCurrentList();
        }
    }

    /*
        initModalHandlers

        Specifies event handlers for when confirm and cancel buttons
        are pressed in the three modals.
    */
    initModalHandlers() {
        // RESPOND TO THE USER CONFIRMING TO DELETE A PLAYLIST
        let deleteListConfirmButton = document.getElementById("delete-list-confirm-button");
        deleteListConfirmButton.onclick = (event) => {
            // NOTE THAT WE SET THE ID OF THE LIST TO REMOVE
            // IN THE MODEL OBJECT AT THE TIME THE ORIGINAL
            // BUTTON PRESS EVENT HAPPENED
            let deleteListId = this.model.getDeleteListId();

            // DELETE THE LIST, THIS IS NOT UNDOABLE
            this.model.deleteList(deleteListId);

            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();

            // CLOSE THE MODAL
            let deleteListModal = document.getElementById("delete-list-modal");
            deleteListModal.classList.remove("is-visible");
        }

        // RESPOND TO THE USER CLOSING THE DELETE PLAYLIST MODAL
        let deleteListCancelButton = document.getElementById("delete-list-cancel-button");
        deleteListCancelButton.onclick = (event) => {
            
            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();
            
            // CLOSE THE MODAL
            let deleteListModal = document.getElementById("delete-list-modal");
            deleteListModal.classList.remove("is-visible");
        }

        // RESPOND TO THE USER CONFIRMING EDITING A SONG
        let editSongConfirmButton = document.getElementById("edit-song-confirm-button");
        editSongConfirmButton.onclick = (event) => {
            this.model.toggleConfirmDialogOpen();

            let song_index = editSongConfirmButton.parentElement.parentElement.parentElement.getAttribute("cardIndex");
            song_index = parseInt(song_index);

            // ORIGINAL SONG DETAILS BEFORE EDITING
            let original_title = document.getElementById("playlist-card-"+(song_index + 1)).getElementsByTagName("a")[0].getAttribute("song-title");
            let original_artist = document.getElementById("playlist-card-"+(song_index + 1)).getElementsByTagName("a")[0].getAttribute("song-artist");
            let original_ytid = document.getElementById("playlist-card-"+(song_index + 1)).getElementsByTagName("a")[0].getAttribute("song-ytid");

            // USER'S NEW INPUTS
            let song_new_title = document.getElementById("form-song-title").value;
            let song_new_artist = document.getElementById("form-song-artist").value
            let song_new_ytid = document.getElementById("form-song-ytid").value

            // ALTERNATE ALGORITHM THAT DOES NOT WORK PROPERLY!
            // document.getElementById("form-song-title").setAttribute("song-title", song_new_title);
            // document.getElementById("form-song-artist").setAttribute("song-artist", song_new_artist);
            // document.getElementById("form-song-ytid").setAttribute("song-ytid", song_new_ytid);

            // let original_name_checker = document.getElementById("form-song-title").getAttribute("form-song-title");
            // let original_artist_checker = document.getElementById("form-song-artist").getAttribute("form-song-artist");
            // let original_ytid_checker = document.getElementById("form-song-ytid").getAttribute("form-song-ytid");

            // for (let i = 1; i < this.model.getPlaylistSize() + 1; i++) {
            //     var title_checker = document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].getAttribute("song-title");
            //     var artist_checker = document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].getAttribute("song-artist");
            //     var ytid_checker = document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].getAttribute("song-ytid");
            //     if(title_checker == original_name_checker && artist_checker == original_artist_checker && ytid_checker == original_ytid_checker) {
            //         document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].setAttribute("song-title", song_new_title);
            //         document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].innerHTML = song_new_title;
            //         this.model.currentList.getSongAt(i - 1).title = song_new_title;

            //         document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].setAttribute("song-artist", song_new_artist);
            //         document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].innerHTML = song_new_artist;
            //         this.model.currentList.getSongAt(i - 1).artist = song_new_artist;

            //         document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].setAttribute("song-ytid", song_new_ytid);
            //         document.getElementById("playlist-card-"+i).getElementsByTagName('a')[0].innerHTML = song_new_ytid;
            //         this.model.currentList.getSongAt(i - 1).youTubeId = song_new_ytid;
            //     }
            // }

            this.model.editSongTransaction(song_index, original_title, original_artist, original_ytid, 
                song_index, song_new_title, song_new_artist, song_new_ytid);

            this.model.refreshPlaylist();
            this.model.saveLists();
            // CLOSE THE MODAL
            let editSongModal = document.getElementById("edit-song-content");
            editSongModal.classList.remove("is-visible");            
        }

        // RESPOND TO THE USER CLOSING THE DELETE PLAYLIST MODAL
        let editSongCancelButton = document.getElementById("edit-song-cancel-button");
        editSongCancelButton.onclick = (event) => {
            this.model.toggleConfirmDialogOpen();

            // CLOSE THE MODAL
            let editSongModal = document.getElementById("edit-song-content");
            editSongModal.classList.remove("is-visible");
        }

        
        let deleteSongConfirmButton = document.getElementById("delete-song-confirm-button");
            deleteSongConfirmButton.onclick = (event) => {
                // NOTE THAT WE SET THE ID OF THE LIST TO REMOVE
                // IN THE MODEL OBJECT AT THE TIME THE ORIGINAL
                // BUTTON PRESS EVENT HAPPENED
                
                let song_index = deleteSongConfirmButton.parentElement.parentElement.parentElement.getAttribute("index");
                let song = this.model.getSong(song_index - 1);
                // DELETE THE SONG, THIS IS UNDOABLE
                this.model.deleteSongTransaction(song, song_index);

                // ALLOW OTHER INTERACTIONS
                this.model.toggleConfirmDialogOpen();

                // CLOSE THE MODAL
                let deleteSongModal = document.getElementById("delete-song-modal");
                deleteSongModal.classList.remove("is-visible");
            }
        
    }

    /*
        registerListSelectHandlers

        This function specifies event handling for interactions with a
        list selection controls in the left toolbar. Note that we say these
        are for dynamic controls because the items in the playlists list is
        not known, it can be any number of items. It's as many items as there
        are playlists, and users can add new playlists and delete playlists.
        Note that the id provided must be the id of the playlist for which
        to register event handling.
    */
    registerListSelectHandlers(id) {
        // HANDLES SELECTING A PLAYLIST
        document.getElementById("playlist-" + id).onmousedown = (event) => {
            // MAKE SURE NOTHING OLD IS SELECTED
            this.model.unselectAll();

            // GET THE SELECTED LIST
            this.model.loadList(id);
        }
        // HANDLES DELETING A PLAYLIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            // DON'T PROPOGATE THIS INTERACTION TO LOWER-LEVEL CONTROLS
            this.ignoreParentClick(event);

            // RECORD THE ID OF THE LIST THE USER WISHES TO DELETE
            // SO THAT THE MODAL KNOWS WHICH ONE IT IS
            this.model.setDeleteListId(id);

            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE PLAYLIST
            // THE CODE BELOW OPENS UP THE LIST DELETE VERIFICATION DIALOG
            this.listToDeleteIndex = this.model.getListIndex(id);
            let listName = this.model.getList(this.listToDeleteIndex).getName();
            let deleteSpan = document.getElementById("delete-list-span");
            deleteSpan.innerHTML = "";
            deleteSpan.appendChild(document.createTextNode(listName));
            let deleteListModal = document.getElementById("delete-list-modal");

            // OPEN UP THE DIALOG
            deleteListModal.classList.add("is-visible");
            this.model.toggleConfirmDialogOpen();
        }
        // FOR RENAMING THE LIST NAME
        document.getElementById("list-card-text-" + id).ondblclick = (event) => {
            let text = document.getElementById("list-card-text-" + id)
            // CLEAR THE TEXT
            text.innerHTML = "";

            // ADD A TEXT FIELD
            let textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("id", "list-card-text-input-" + id);
            textInput.setAttribute("value", this.model.currentList.getName());
            textInput.style.width = "100%"

            // CHANGE THE CONTROL TO AN EDITABLE TEXT FIELD
            text.appendChild(textInput);
            this.model.refreshToolbar();

            // SPECIFY HANDLERS FOR THE TEXT FIELD
            textInput.ondblclick = (event) => {
                this.ignoreParentClick(event);
            }
            textInput.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    this.model.renameCurrentList(event.target.value, id);
                    this.model.refreshToolbar();
                }
            }
            textInput.onblur = (event) => {
                this.model.renameCurrentList(event.target.value, id);
                this.model.refreshToolbar();
            }
            textInput.focus();
            let temp = textInput.value;
            textInput.value = "";
            textInput.value = temp;

        }
    }

    /*
        registerItemHandlers

        This function specifies event handling for interactions with the
        playlist song items, i.e. cards. Note that we say these
        are for dynamic controls because the cards in the playlist are
        not known, it can be any number of songs. It's as many cards as there
        are songs in the playlist, and users can add and remove songs.
    */
    registerItemHandlers() {
        // SETUP THE HANDLERS FOR ALL SONG CARDS, WHICH ALL GET DONE
        // AT ONCE EVERY TIME DATA CHANGES, SINCE IT GETS REBUILT EACH TIME
        for (let i = 0; i < this.model.getPlaylistSize(); i++) {
            // GET THE CARD
            let card = document.getElementById("playlist-card-" + (i + 1));
            
            card.setAttribute("index", i);
            // NOW SETUP ALL CARD DRAGGING HANDLERS AS THE USER MAY WISH TO CHANGE
            // THE ORDER OF SONGS IN THE PLAYLIST

            // MAKE EACH CARD DRAGGABLE
            card.setAttribute('draggable', 'true')

            // WHEN DRAGGING STARTS RECORD THE INDEX
            card.ondragstart = (event) => {
                card.classList.add("is-dragging");
                event.dataTransfer.setData("from-id", i);
            }

            // WE ONLY WANT OUR CODE, NO DEFAULT BEHAVIOR FOR DRAGGING
            card.ondragover = (event) => {
                event.preventDefault();
            }

            card.ondblclick = (event) => {
                // DON'T PROPOGATE THIS INTERACTION TO LOWER-LEVEL CONTROLS
                this.ignoreParentClick(event);

                let edit_song_content = document.getElementById("edit-song-content");

                let cardIndex = card.getAttribute("index");

                // OPEN UP THE DIALOG
                edit_song_content.classList.add("is-visible");
                edit_song_content.setAttribute("cardIndex", cardIndex);
                this.model.toggleConfirmDialogOpen();

                // SET UP FORM FIELDS
                var song_title = event.target.querySelector('a').getAttribute("song-title");
                var song_artist = event.target.querySelector('a').getAttribute("song-artist");
                var song_ytid = event.target.querySelector('a').getAttribute("song-ytid");

                document.getElementById("form-song-title").value = song_title;
                document.getElementById("form-song-artist").value = song_artist;
                document.getElementById("form-song-ytid").value = song_ytid;
            }

            // STOP THE DRAGGING LOOK WHEN IT'S NOT DRAGGING
            card.ondragend = (event) => {
                card.classList.remove("is-dragging");
            }

            // WHEN AN ITEM IS RELEASED WE NEED TO MOVE THE CARD
            card.ondrop = (event) => {
                event.preventDefault();
                // GET THE INDICES OF WHERE THE CARD IS BRING DRAGGED FROM AND TO
                let fromIndex = Number.parseInt(event.dataTransfer.getData("from-id"));
                let toIndex = Number.parseInt(event.target.id.split("-")[2]) - 1;

                // ONLY ADD A TRANSACTION IF THEY ARE NOT THE SAME
                // AND BOTH INDICES ARE VALID
                if ((fromIndex !== toIndex)
                    && !isNaN(fromIndex) 
                    && !isNaN(toIndex)) {
                    this.model.addMoveSongTransaction(fromIndex, toIndex);
                }
            }

            // GET THE SONG
            let song = document.getElementById("song-" + (i + 1));
            // HANDLES DELETING A SONG IN PLAYLIST
            song.onmousedown = (event) => {
                // DON'T PROPOGATE THIS INTERACTION TO LOWER-LEVEL CONTROLS
                this.ignoreParentClick(event);

                // OPEN UP THE DIALOG
                let deleteSongModal = document.getElementById("delete-song-modal");
                deleteSongModal.setAttribute("index", (i+1));
                deleteSongModal.classList.add("is-visible");
                this.model.toggleConfirmDialogOpen();
                // RECORD THE ID OF THE LIST THE USER WISHES TO DELETE
                // SO THAT THE MODAL KNOWS WHICH ONE IT IS
                let songTitleName = this.model.getSong(i).title;
                // VERIFY THAT THE USER REALLY WANTS TO DELETE THE SONG
                // THE CODE BELOW OPENS UP THE LIST DELETE VERIFICATION DIALOG
                let deleteSongSpan = document.getElementById("delete-song-span");
                deleteSongSpan.innerHTML = "";
                deleteSongSpan.appendChild(document.createTextNode(songTitleName));
            }
            // CANCEL BUTTON
            let deleteSongCancelButton = document.getElementById("delete-song-cancel-button");
            deleteSongCancelButton.onclick = (event) => {
                this.model.toggleConfirmDialogOpen();

                // CLOSE THE MODAL
                let deleteSongModal = document.getElementById("delete-song-modal");
                deleteSongModal.classList.remove("is-visible");
            }
        }
    }

    /*
        ignoreParentClick

        This function makes sure the event doesn't get propogated
        to other controls.
    */
    ignoreParentClick(event) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
    }
}