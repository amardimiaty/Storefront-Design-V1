"use client"

import { useState, useEffect } from "react"
import { useNotifications, type NotificationMessage } from "@/lib/notification-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2, Plus, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function NotificationsAdmin() {
  const { notifications, addNotification, removeNotification, toggleNotification, updateNotification } =
    useNotifications()
  const [newText, setNewText] = useState("")
  const [newHighlight, setNewHighlight] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [editHighlight, setEditHighlight] = useState("")
  const [bannerColor, setBannerColor] = useState("bg-violet-600")
  const [isColorChanged, setIsColorChanged] = useState(false)

  useEffect(() => {
    const savedColor = localStorage.getItem("notification-banner-color")
    if (savedColor) {
      setBannerColor(savedColor)
    }
  }, [])

  const handleAdd = () => {
    if (newText.trim()) {
      addNotification(newText, newHighlight)
      setNewText("")
      setNewHighlight("")
    }
  }

  const startEditing = (notification: NotificationMessage) => {
    setEditingId(notification.id)
    setEditText(notification.text)
    setEditHighlight(notification.highlight)
  }

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      updateNotification(editingId, editText, editHighlight)
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const saveBannerColor = () => {
    localStorage.setItem("notification-banner-color", bannerColor)

    // Dispatch a custom event to notify other components about the color change
    const event = new Event("storage")
    window.dispatchEvent(event)

    setIsColorChanged(true)
    setTimeout(() => setIsColorChanged(false), 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Notification Banner Management</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">Add New Notification</h2>
        <div className="grid gap-4">
          <div>
            <label htmlFor="notification-text" className="block text-sm font-medium mb-1">
              Notification Text
            </label>
            <Input
              id="notification-text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Enter notification text..."
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="notification-highlight" className="block text-sm font-medium mb-1">
              Highlighted Text (optional)
            </label>
            <Input
              id="notification-highlight"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Enter highlighted text..."
              className="w-full"
            />
          </div>
          <Button onClick={handleAdd} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add Notification
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium mb-4">Manage Notifications</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No notifications available</p>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map((notification) => (
              <div key={notification.id} className="py-4">
                {editingId === notification.id ? (
                  <div className="grid gap-4">
                    <div>
                      <label htmlFor={`edit-text-${notification.id}`} className="block text-sm font-medium mb-1">
                        Notification Text
                      </label>
                      <Input
                        id={`edit-text-${notification.id}`}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor={`edit-highlight-${notification.id}`} className="block text-sm font-medium mb-1">
                        Highlighted Text
                      </label>
                      <Input
                        id={`edit-highlight-${notification.id}`}
                        value={editHighlight}
                        onChange={(e) => setEditHighlight(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={saveEdit} variant="default">
                        Save
                      </Button>
                      <Button onClick={cancelEdit} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`h-2 w-2 rounded-full ${notification.active ? "bg-green-500" : "bg-gray-400"}`}
                        ></div>
                        <p className="font-medium">
                          {notification.text}
                          <span className="font-bold">{notification.highlight}</span>
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Status: {notification.active ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={notification.active}
                          onCheckedChange={() => toggleNotification(notification.id)}
                          id={`active-${notification.id}`}
                        />
                        <label htmlFor={`active-${notification.id}`} className="text-sm">
                          {notification.active ? "Active" : "Inactive"}
                        </label>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startEditing(notification)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeNotification(notification.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-lg font-medium mb-4">Notification Appearance</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Banner Background Color</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
              {[
                { name: "Violet", value: "bg-violet-600" },
                { name: "Blue", value: "bg-blue-600" },
                { name: "Green", value: "bg-green-600" },
                { name: "Red", value: "bg-red-600" },
                { name: "Amber", value: "bg-amber-600" },
                { name: "Pink", value: "bg-pink-600" },
              ].map((color) => (
                <button
                  key={color.value}
                  className={`h-10 rounded-md border-2 ${color.value} ${
                    bannerColor === color.value ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                  }`}
                  onClick={() => setBannerColor(color.value)}
                  aria-label={`Select ${color.name} color`}
                >
                  {bannerColor === color.value && <Check className="h-4 w-4 mx-auto text-white" />}
                </button>
              ))}
            </div>

            <Button onClick={saveBannerColor} className="w-full sm:w-auto">
              {isColorChanged ? "Saved!" : "Save Appearance Settings"}
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Preview</label>
            <div className={`${bannerColor} text-white py-2 px-4 text-center rounded-md`}>
              <p className="text-sm font-medium">
                <span className="font-bold">Special offer!</span> This is how your notification will look
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
