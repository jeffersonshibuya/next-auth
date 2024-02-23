'use client'

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";


const SettingsPage = () => {
  const user = useCurrentUser()

  const onClick = async () => {
    logout()
  }

  return (
    <div className="bg-white p-10 rounded-xl">
      <form >
        <Button onClick={onClick}>Sing out</Button>
      </form>
    </div>
  )
}

export default SettingsPage;