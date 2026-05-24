import Link from "next/link"
import type React from "react"
import { type JSX, useEffect, useState } from "react"
import {
  CircleCheck,
  CircleDashed,
  ExternalLink,
  ListTodo,
  Logs,
  Loader2,
  CheckCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import Discord from "@/assets/svgs/discord"
import TwitterIcon from "@/assets/svgs/twitter"

import { P } from "@/components/typo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flex } from "@/components/elements"

interface AdditionalTask {
  sectionName: string
  items: {
    title: string
    href: string
    type: TaskType
  }[]
}

const TaskHandler = ({
  tasks,
  completedTasks,
  setCompletedTasks,
  additionalURI,
  className
}: {
  tasks: Task[]
  completedTasks: number[]
  additionalURI: AdditionalTask | undefined
  className?: string
  setCompletedTasks: React.Dispatch<React.SetStateAction<number[]>>
}) => {
  const [loadingTasks, setLoadingTasks] = useState<number[]>([])
  const [activeTask, setActiveTask] = useState<number | null>(null)

  const iconStyle = "h-4 w-4"

  const typeToIcon: Record<TaskType, JSX.Element> = {
    twitter: <TwitterIcon className={cn(iconStyle, "text-white")} />,
    retweet: <TwitterIcon className={cn(iconStyle, "text-white")} />,
    claim: <CheckCircle className={cn(iconStyle, "text-white")} />,
    telegram: <ExternalLink className={cn(iconStyle, "text-white")} />,
    discord: <Discord className={cn(iconStyle, "text-white")} />,
  }

  useEffect(() => {
    if (activeTask !== null) {
      const backupTimer = setTimeout(() => {
        completeTask(activeTask);
        setActiveTask(null);
      }, 6000);

      const handleVisibilityChange = () => {
        if (!document.hidden && activeTask !== null) {
          setTimeout(() => {
            completeTask(activeTask);
            setActiveTask(null);
          }, 5000);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        clearTimeout(backupTimer);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [activeTask]);

  const completeTask = (index: number) => {
    if (!completedTasks.includes(index)) {
      setCompletedTasks(prev => [...prev, index])
      setLoadingTasks(prev => prev.filter(i => i !== index))

      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        const storedTasks = JSON.parse(localStorage.getItem("completedTasks") || "[]")
        localStorage.setItem("completedTasks", JSON.stringify([...storedTasks, index]))
      }
    }
  }

  const handleTaskClick = (index: number, href: string) => {
    if (!completedTasks.includes(index)) {
      setLoadingTasks(prev => [...prev, index])
      setActiveTask(index)
      window.open(href, '_blank')
    }
  }
  
  return (
    <Tabs defaultValue="tasks" className={cn("w-full bg-gradient-to-b from-gray-900/50 to-black/50 border border-purple-900/40 rounded-2xl backdrop-blur-sm p-5", className)}>
      <TabsList className="grid w-full grid-cols-2 gap-2 p-1 bg-gradient-to-b from-gray-900/80 to-black/80 rounded-xl">
        <TabsTrigger 
          value="tasks" 
          className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all"
        >
          <ListTodo size={18} />
          <span className="font-semibold">Tasks</span>
          <span className="ml-auto bg-purple-900/50 text-purple-300 rounded-full px-2 py-0.5 text-sm">
            {tasks.length - completedTasks.length}
          </span>
        </TabsTrigger>
        <TabsTrigger 
          value="additional" 
          className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all"
          disabled={!additionalURI}
        >
          <Logs size={18} />
          <span className="font-semibold">{additionalURI?.sectionName || "Additional"}</span>
          {additionalURI && (
            <span className="ml-auto bg-purple-900/50 text-purple-300 rounded-full px-2 py-0.5 text-sm">
              {additionalURI.items.length}
            </span>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="tasks" className="mt-6 space-y-4">
        {tasks?.map((task, index) => {
          const isCompleted = completedTasks.includes(index)
          const isLoading = loadingTasks.includes(index)

          return (
            <button
              key={index}
              onClick={() => handleTaskClick(index, task.href)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                isCompleted 
                  ? "bg-gradient-to-r from-green-900/20 to-green-800/10 border border-green-700/30" 
                  : isLoading
                  ? "bg-gradient-to-b from-gray-900/80 to-black/80 border border-purple-900/40"
                  : "bg-gradient-to-b from-gray-900/80 to-black/80 border border-purple-900/40 hover:border-purple-500/60 hover:translate-y-[-2px]"
              )}
              disabled={isCompleted}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin text-purple-400" />
              ) : isCompleted ? (
                <CircleCheck size={20} className="text-green-400" />
              ) : (
                <CircleDashed size={20} className="text-purple-400" />
              )}

              <span className={cn(
                "grow text-left font-medium",
                isCompleted ? "text-green-300 line-through" : "text-gray-300"
              )}>
                {task.title}
              </span>
              
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-3 py-1.5 rounded-lg">
                <span className="text-sm text-purple-300">Complete</span>
                {typeToIcon[task.type]}
              </div>
            </button>
          )
        })}
      </TabsContent>
      
      {additionalURI && (
        <TabsContent value="additional" className="mt-6 space-y-4">
          {additionalURI.items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-b from-gray-900/80 to-black/80 border border-purple-900/40 hover:border-purple-500/60 hover:translate-y-[-2px] transition-all duration-300"
            >
              <ExternalLink size={20} className="text-purple-400" />
              
              <span className="grow text-left font-medium text-gray-300">
                {item.title}
              </span>
              
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-3 py-1.5 rounded-lg">
                <span className="text-sm text-purple-300">Visit</span>
                {typeToIcon[item.type]}
              </div>
            </Link>
          ))}
        </TabsContent>
      )}
    </Tabs>
  )
}

export default TaskHandler