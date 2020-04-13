// Enables tooltips everywhere
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// ############################################################################

const progressBar = document.querySelector('.progress-bar')
const progressButtons = document.querySelectorAll('.task')
const errorMessage = document.querySelector('.alert-danger')

// ############################################################################

const animate = () => {
  let progress = parseInt(localStorage.getItem('progress'))

  // Intialize the localStorage
  if(!progress){
    progress = 10
    localStorage.setItem('progress', progress)
  }

  // Initialize the progress bar
  const cls = ['bg-danger', 'bg-warning']
  progressBar.classList.remove(...cls)

  // Change its properties and content given what's stored in the LS
  progressBar.style.width = `${progress}%`
  progressBar.innerText = `${progress}%`

  // Change the colors for 3 different levels (#TO DO : add more levels)
  if(progress < 50){
    progressBar.classList.add('bg-danger')
  }else if(progress >= 50 && progress < 100){
    progressBar.classList.add('bg-warning')
  }else if(progress === 100){
    progressBar.classList.remove('progress-bar-striped')
    progressBar.classList.add('bg-success')
  }
}

// ############################################################################

const displayErrorMessage = (taskToDo) => {
  errorMessage.innerText = ` ⚠️ Tu dois encore completer l'Etape ${taskToDo} !`
  errorMessage.classList.add('display')
  setTimeout( () => { errorMessage.classList.remove('display') } ,5000 )
}

// ############################################################################

const progressCompute = (currentIndex) => {
  const totalTasks = progressButtons.length
  const currentProgress = (currentIndex / totalTasks) * 100

  // Store the value in the LS, only if it's the first time the user completes this
  // task.
  if(currentProgress > parseInt(localStorage.getItem('progress'))){
    localStorage.setItem('progress', currentProgress)
  }
}

// ############################################################################

const progressBarAnimation = (e) => {
  // Display the task at the (as) top (as possible) of the page
  // TO DO : Enhance this 👎
  e.currentTarget.parentElement.parentElement.scrollIntoView(false)

  const tasksArray = [...progressButtons]
  const currentTask = tasksArray.indexOf(e.currentTarget) + 1
  // console.log('current task index :', currentTask)

  const lastTaskDone = parseInt(localStorage.getItem('progress') / tasksArray.length)
  const taskToDo = lastTaskDone + 1

  if(taskToDo < currentTask){
    displayErrorMessage(taskToDo)
  }else{
    e.currentTarget.classList.add('done')
    progressCompute(currentTask)
    animate()
  }
}

// ############################################################################

// Every time a user clicks on a task, animate the progress bar
progressButtons.forEach( button => {
  button.addEventListener('click', progressBarAnimation)
})

// ############################################################################

// Initialize the Game
animate()

// ############################################################################

// Enable solution button after the click on link
const solutionButton = document.querySelector('.solution-button')
const taskNine = document.querySelector('#task-nine')

const enableSolution = () => {
  setTimeout( () => {
    solutionButton.disabled = false
    solutionButton.nextElementSibling.remove()
  }, 120000 )
}

taskNine.addEventListener('click', enableSolution)
