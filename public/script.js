const plus = document.getElementById('plus-btn');
const updateLocalStorage = ()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes =[];
    textAreaData.forEach((note)=>{ 
        notes.push(note.value);
    })
    
    localStorage.setItem('notes', JSON.stringify(notes));

    

}



const addNote = (text= '')=>{
    const note = document.createElement('div');   
    note.classList.add('note');
    
    const html = `
    <div class="operation">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>

        </div>
        <div class="main ${text?"":"hidden"} "></div>
            <textarea class="${text?"hidden":""}"></textarea>
         `;
        note.insertAdjacentHTML('afterbegin', html);
        document.body.appendChild(note);
        const del = note.querySelector('.delete');
        del.addEventListener('click',()=>{
            note.remove();
            updateLocalStorage();
        })

        const edit = note.querySelector('.edit');
        const mainDiv = note.querySelector('.main');
        const textArea = note.querySelector('textarea');
        textArea.value = text;
        mainDiv.innerHTML = text;

        edit.addEventListener('click', ()=>{
            mainDiv.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
        })
        
        textArea.addEventListener('change', (event)=>{
             let val =  event.target.value;
             mainDiv.innerHTML= val;
             updateLocalStorage();
        })
        
}

const savedNotes= JSON.parse(localStorage.getItem('notes'));
if(savedNotes){
    savedNotes.forEach((savedNote)=> addNote(savedNote));

}
plus.addEventListener('click',()=> addNote());