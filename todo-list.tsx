"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [weeklyTasks, setWeeklyTasks] = useState<TodoItem[]>([]);
  const [projectTasks, setProjectTasks] = useState<TodoItem[]>([]);
  const [newWeeklyTask, setNewWeeklyTask] = useState("");
  const [newProjectTask, setNewProjectTask] = useState("");

  useEffect(() => {
    // Hydration-safe loading from localStorage
    try {
      const storedWeekly = localStorage.getItem("weeklyTasks");
      if (storedWeekly) setWeeklyTasks(JSON.parse(storedWeekly));
      
      const storedProjects = localStorage.getItem("projectTasks");
      if (storedProjects) setProjectTasks(JSON.parse(storedProjects));
    } catch (error) {
      console.error("Could not parse tasks from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("weeklyTasks", JSON.stringify(weeklyTasks));
  }, [weeklyTasks]);

  useEffect(() => {
    localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
  }, [projectTasks]);

  const addTask = (type: "weekly" | "project") => {
    if (type === "weekly" && newWeeklyTask.trim()) {
      setWeeklyTasks([
        ...weeklyTasks,
        { id: Date.now(), text: newWeeklyTask.trim(), completed: false },
      ]);
      setNewWeeklyTask("");
    } else if (type === "project" && newProjectTask.trim()) {
      setProjectTasks([
        ...projectTasks,
        { id: Date.now(), text: newProjectTask.trim(), completed: false },
      ]);
      setNewProjectTask("");
    }
  };
  
  const toggleTask = (id: number, type: 'weekly' | 'project') => {
    const taskSetter = type === 'weekly' ? setWeeklyTasks : setProjectTasks;
    taskSetter(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number, type: 'weekly' | 'project') => {
    const taskSetter = type === 'weekly' ? setWeeklyTasks : setProjectTasks;
    taskSetter(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'weekly' | 'project') => {
    if (e.key === 'Enter') {
      addTask(type);
    }
  };

  const renderTaskList = (tasks: TodoItem[], type: 'weekly' | 'project') => (
    <div className="space-y-3">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-3 rounded-md bg-secondary group">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id, type)}
              className="w-5 h-5"
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-1 text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-secondary-foreground'}`}
            >
              {task.text}
            </label>
            <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100" onClick={() => deleteTask(task.id, type)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))
      ) : (
        <p className="text-sm text-center text-muted-foreground py-4">No tasks yet. Add one above!</p>
      )}
    </div>
  );

  return (
    <Card className="shadow-lg">
      <CardContent className="p-0">
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-t-lg rounded-b-none">
            <TabsTrigger value="weekly">This Week's Tasks</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="p-6">
            <div className="flex gap-2 mb-4">
              <Input
                value={newWeeklyTask}
                onChange={(e) => setNewWeeklyTask(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'weekly')}
                placeholder="e.g., Complete Chapter 3 reading"
              />
              <Button onClick={() => addTask("weekly")}><Plus className="w-4 h-4 mr-2" /> Add</Button>
            </div>
            {renderTaskList(weeklyTasks, "weekly")}
          </TabsContent>
          <TabsContent value="projects" className="p-6">
             <div className="flex gap-2 mb-4">
              <Input
                value={newProjectTask}
                onChange={(e) => setNewProjectTask(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'project')}
                placeholder="e.g., Start research for final paper"
              />
              <Button onClick={() => addTask("project")}><Plus className="w-4 h-4 mr-2" /> Add</Button>
            </div>
            {renderTaskList(projectTasks, "project")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
