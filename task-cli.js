#!usr/bin/bash/env node
// imports and requirements
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'tasks.json')
// loading tasks from json
function loadTasks() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]")
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}
// saving tasks to json
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
}
// process incoming arguments
const args = process.argv.slice(2)
const command = args[0]
// add tasks
if (command == 'add') {
    const desc = args[1] // get CLI argument for task description
    if (!desc) return console.log('Please provide task')
    const tasks = loadTasks()
    // create new task object
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1, desc,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask)
    saveTasks(tasks)
    console.log(`Task added: ${newTask.id}`)
}
// list all tasks
if (command == 'list') {
    const filter = args[1] // categorize do,doa,done
    const tasks = loadTasks() // load all tasks
    const filtered = filter ? tasks.filter(t => t.status === filter) : tasks; // give taks of each category
    if (filtered.length === 0) {
        console.log('No tasks present')
    } else {
        filtered.forEach(t => {
            console.log(`#${t.id}: [${t.status}] ${t.desc}`)
        })
    }
}
// update tasks
if (command == 'update') {
    const id = parseInt(args[1]) // parseInt
    const newDesc = args[2] // new description in the CLI arg
    const tasks = loadTasks() // same old
    const task = tasks.find(t => t.id === id)
    if (!task) return console.log("Task not found")
    task.desc = newDesc;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks) // call save function with newly updated description
    console.log("Task updated")
}
// delete task with id
if (command == 'delete') {
    const id = parseInt(args[1]) // get required task id
    let tasks = loadTasks() // get all tasks
    const initialLen = tasks.length
    tasks = tasks.filter(t => t.id !== id) // get all tasks that are NOT the task to be deleted, filter that stuff in, filter out that required id
    if (tasks.length == initialLen) return console.log("Task not found")
    saveTasks(tasks)
    console.log("Task deleted")
}
// mark task as done
if (command == 'mark-in-progress' || command == 'mark-done') {
    const id = parseInt(args[1])
    const tasks = loadTasks()
    const task = tasks.find(t => t.id === id) // find that task
    task.status = command === 'mark-done' ? 'done' : 'in-progress'
    task.updatedAt = new Date().toISOString()
    saveTasks(tasks)
    console.log(`Task #${id} marked as ${task.status}`)

}