const icon = document.getElementById('icon-plus');
const add = document.querySelector('#plus');


const hideBtn = () => {
    add.style.display = "none";
}

const showBtn = () => {
    add.style.display = "flex";
}

const updateLocalStorage = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        if(note.value)
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
    // textArea.disabled = true;
}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('notes');

    const htmlData = `
              
            <div class="upper-icon">
            <i class="fas fa-edit"></i>
            <i class="fas fa-save"></i>
            <i class="fas fa-trash"></i>
        </div>
            <div class="text-content">
            <div class="main" TextMode="MultiLine"">
            </div>
                <textarea id = "text-box" placeholder="Write a note..."  onmouseover="hideBtn()" onmouseout="showBtn()"></textarea>
            </div>
    `;

    note.insertAdjacentHTML('afterbegin', htmlData);

    document.body.appendChild(note);

    //References //
    const edit = note.querySelector('.fa-edit');
    const del = note.querySelector('.fa-trash');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    const save = note.querySelector('.fa-save');


    // Delete the note //

    del.addEventListener('click', () => {
        note.remove();
        updateLocalStorage();
    })


    //toggle using edit button //

    textArea.value = text;
    textArea.innerHTML = text;

    edit.addEventListener('click', () => {

        textArea.disabled = false;



        // textArea.classList.toggle('hidden');
    })

    save.addEventListener('click', () => {
        textArea.disabled = true;
        mainDiv.classList.toggle('hidden');
        updateLocalStorage();
     
         
    

        
    })


    textArea.addEventListener('change', (event) => {
        // const value = event.target.value;
        textArea.innerHTML = event.target.value;;
        updateLocalStorage();
     
    })

    if (textArea.value.length != 0) {
        textArea.disabled = true;
    }

}

// getting a data from local storage //
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    })
}


add.addEventListener('click', () => {
    addNewNote()
});