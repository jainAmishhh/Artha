import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function BetterTasksDashboard() {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">BetterTasks</h2>

          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">MAIN MENU</p>
            <ul className="space-y-2">
              <li className="hover:font-medium cursor-pointer">To-do</li>
              <li className="hover:font-medium cursor-pointer flex justify-between items-center">
                Share My Impact
                <Switch defaultChecked={false} />
              </li>
              <li className="hover:font-medium cursor-pointer">Analytics</li>
              <li className="hover:font-medium cursor-pointer">Leaderboard</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">LISTS</p>
            <ul className="space-y-2">
              <li>🔥 Odama Website</li>
              <li>🎨 Dribbble</li>
              <li>📌 Personal Project</li>
            </ul>
            <Button variant="ghost" className="text-indigo-600 mt-2">+ Add List</Button>
          </div>

          <div className="mt-8">
            <Card>
              <CardContent className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl">
                <p className="text-sm font-semibold">Upgrade plan</p>
                <p className="text-xs mt-1">Unlock more features and integrations</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="text-xs mb-2">Pristia Candra</div>
          <Button variant="ghost">👤 Nameless Panda #112</Button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col p-6 space-y-6">
        <div className="text-xl font-semibold">Good Morning, Pristia!</div>

        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gray-200 h-12 w-12" />
            <div>
              <div className="font-medium">Nameless Panda #245</div>
              <div className="text-xs text-gray-500">Microsoft</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">Odama Studio ● 1,354</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today Task</h3>
            <div className="flex gap-2">
              <Button variant="outline">Focus Mode</Button>
              <Button variant="default">AI Assist</Button>
            </div>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="accent-indigo-500" />
              <span>Create design system</span>
              <span className="ml-auto text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">High</span>
            </li>
            <li className="flex items-center gap-3">
              <input type="checkbox" className="accent-indigo-500" />
              <span>Create 3 alternative hero section</span>
              <span className="ml-auto text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Medium</span>
            </li>
            <li className="flex items-center gap-3">
              <input type="checkbox" className="accent-indigo-500" />
              <span>Upload dribbble shot</span>
              <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Low</span>
            </li>
          </ul>
          <div className="mt-4 flex gap-2">
            <Button>Finish</Button>
            <Button variant="outline">+ Add Task</Button>
          </div>
        </Card>
      </main>

      {/* AI Assist Panel */}
      <aside className="w-96 bg-white p-6 border-l">
        <h3 className="text-lg font-bold mb-2">AI Assist ✨</h3>
        <p className="text-sm text-gray-500 mb-6">Knowledge, answers, ideas. One click away.</p>

        <div className="space-y-4">
          <Button variant="outline" className="w-full">"Can you help me with my first task?"</Button>
          <Button variant="outline" className="w-full">"Create a template for a product design doc"</Button>
          <Button variant="outline" className="w-full">"What is the SQL query for sorting by date?"</Button>
        </div>

        <div className="mt-6">
          <Textarea placeholder="Write something..." />
          <Button className="mt-2 w-full">Send</Button>
        </div>
      </aside>
    </div>
  );
}
