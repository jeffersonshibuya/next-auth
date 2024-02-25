'use client'
import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch('api/admin')
      .then(response => {
        if(response.ok) {
          toast.success('Allowed API Route!')
        } else {
          toast.error('Forbidden API Route!')
        }
      })
  }

  const onServerActionClick = () => {
    admin()
      .then(data => {
        if(data.success) {
          toast.success(data.success)
        } 
        if(data.error) {
          toast.error(data.error)
        }
      })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allwedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allwed to see this content!"/>
        </RoleGate>
        <div className="flex flex-row items-center justify-between roudend-lg border p-4 shadow-md">
          <p className="text-sm font-medium">
            Admin-only API route
          </p>
          <Button onClick={onApiRouteClick}>
            Click to test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between roudend-lg border p-4 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>
          <Button onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage;