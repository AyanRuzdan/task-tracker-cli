# Node.js CLI Task Tracker

A simple command-line tool to manage tasks using Node.js. Tasks are stored in a local `tasks.json` file.

## File Structure

```bash
project-root/
│
├── tasks.json       # Stores your tasks persistently
└── task-cli.js      # Your main CLI script (this file)
```

> Make sure to give the file execute permission:
> `chmod +x task-cli.js`

---

## How to Run

Run the CLI using:

```bash
./task-cli.js <command> [args]
```

---

## Commands

### `add <description>`

Adds a new task with the given description.

```bash
./task-cli.js add "Buy groceries"
```

### `list [status]`

Lists all tasks. Optionally filter by status:

* `todo`
* `in-progress`
* `done`

```bash
./task-cli.js list           # All tasks
./task-cli.js list todo      # Only pending tasks
```

### `update <id> <new description>`

Updates the task description by its ID.

```bash
./task-cli.js update 3 "Buy groceries and milk"
```

###  `delete <id>`

Deletes the task with the given ID.

```bash
./task-cli.js delete 2
```

### `mark-in-progress <id>`

Marks a task as in-progress.

```bash
./task-cli.js mark-in-progress 1
```

### `mark-done <id>`

Marks a task as completed.

```bash
./task-cli.js mark-done 1
```

## Data Format

Each task in `tasks.json` has the structure:

```json
{
  "id": 1,
  "desc": "Buy groceries",
  "status": "todo",
  "createdAt": "2025-08-04T10:00:00.000Z",
  "updatedAt": "2025-08-04T10:00:00.000Z"
}
```

## Task URL

This task was taken from https://roadmap.sh/projects/task-tracker