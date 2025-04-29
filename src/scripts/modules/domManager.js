export function attachEventListeners() {
  const sidebar = document.querySelector('.sidebar-section');

  const projectHeaders = document.querySelectorAll('.project-header');

  projectHeaders.forEach(project => {
    project.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode; //Project-Wrapper
      const projectBody = parent.querySelector('.project-body');

      projectBody.classList.toggle('hidden');
    })
  })

  const taskHeaders = document.querySelectorAll('.task-header')

  taskHeaders.forEach(task => {
    task.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode; //Task-Wrapper
      const taskBody = parent.querySelector('.task-body');

      taskBody.classList.toggle('hidden');

    })
  })
}